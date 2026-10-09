"""Exercise SSH installer decisions with fake sockets/Paramiko; no network."""
import base64,contextlib,hashlib,importlib.util,io,json,pathlib,sys,types,unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Key:
    def asbytes(self):return b'fake-host-key'
    def get_name(self):return 'ssh-ed25519'
class Channel:
    def __init__(self):self.ready=True
    def settimeout(self,n):pass
    def exec_command(self,cmd):calls.append(('command',cmd))
    def makefile(self,*args):return io.BytesIO(b'0\n')
    def close(self):pass
    def sendall(self,data):calls.append(('payload',json.loads(data)))
    def shutdown_write(self):pass
    def exit_status_ready(self):return True
    def recv_ready(self):return self.ready
    def recv_stderr_ready(self):return False
    def recv(self,n):self.ready=False;return b'{"ok":true,"checks":{"ports":"available"}}\n'
    def recv_exit_status(self):return 0
class SFTP:
    def mkdir(self,*a):pass
    def file(self,*a):return io.BytesIO()
    def chmod(self,*a):pass
    def remove(self,*a):pass
    def rmdir(self,*a):pass
    def close(self):pass
class Transport:
    def __init__(self,*a):pass
    def start_client(self,**k):pass
    def get_remote_server_key(self):return Key()
    def auth_password(self,user,password):calls.append(('password',user))
    def auth_publickey(self,user,key):calls.append(('key',user))
    def open_session(self,**k):return Channel()
    def close(self):pass
class AuthError(Exception):pass
fake=types.SimpleNamespace(Transport=Transport,AuthenticationException=AuthError,SSHException=AuthError,SFTPClient=types.SimpleNamespace(from_transport=lambda t:SFTP()))
for name in ['Ed25519Key','ECDSAKey','RSAKey']:setattr(fake,name,types.SimpleNamespace(from_private_key=lambda *a,**k:Key()))
previous=sys.modules.get('paramiko');sys.modules['paramiko']=fake
spec=importlib.util.spec_from_file_location('ssh_installer',ROOT/'addon/alirezadns-ssh.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
if previous:sys.modules['paramiko']=previous
else:sys.modules.pop('paramiko',None)
calls=[];module.socket=types.SimpleNamespace(create_connection=lambda *a,**k:types.SimpleNamespace(close=lambda:None));module.time.sleep=lambda n:None
fingerprint='SHA256:'+base64.b64encode(hashlib.sha256(Key().asbytes()).digest()).decode().rstrip('=')
class Tests(unittest.TestCase):
    def invoke(self,**cfg):
        calls.clear();old=sys.stdin;sys.stdin=io.StringIO(json.dumps({'host':'8.8.4.4','sshPort':22,'domain':'dns.example.com',**cfg}))
        try:
            with contextlib.redirect_stdout(io.StringIO()) as output:module.main()
            return json.loads(output.getvalue().strip().splitlines()[-1])
        finally:sys.stdin=old
    def test_probe_never_authenticates_or_runs_commands(self):
        self.assertEqual(self.invoke(action='probe')['fingerprint'],fingerprint);self.assertEqual(calls,[])
    def test_changed_host_key_refuses_before_secret_authentication(self):
        with self.assertRaisesRegex(RuntimeError,'fingerprint changed'):self.invoke(action='install',fingerprint='wrong',password='secret')
        self.assertEqual(calls,[])
    def test_preflight_supports_selected_user_and_passwordless_sudo(self):
        self.assertTrue(self.invoke(action='preflight',fingerprint=fingerprint,username='operator',privateKey='KEY')['ok']);self.assertIn(('key','operator'),calls);self.assertIn(('command','sudo -n id -u'),calls);self.assertTrue(any(c[0]=='command' and c[1].startswith('sudo -n python3') and c[1].endswith('--preflight') for c in calls));self.assertTrue(all(c[0]!='payload' or 'privateKey' not in c[1] for c in calls))
    def test_private_destination_refused(self):
        with self.assertRaisesRegex(RuntimeError,'public'):self.invoke(action='probe',host='10.0.0.1')
if __name__=='__main__':unittest.main()
