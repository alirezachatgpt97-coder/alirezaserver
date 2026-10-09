#!/usr/bin/python3
"""One-shot SSH installer. Secrets arrive over stdin and are never persisted."""
import base64, hashlib, io, ipaddress, json, pathlib, re, secrets, socket, sys, time
import paramiko
def main():
    cfg=json.loads(sys.stdin.read(131073));host=str(ipaddress.IPv4Address(cfg['host']))
    if not ipaddress.ip_address(host).is_global:raise RuntimeError('A public destination IPv4 is required')
    port=int(cfg.get('sshPort',22))
    if not 1<=port<=65535:raise RuntimeError('Invalid SSH port')
    sock=socket.create_connection((host,port),20);transport=paramiko.Transport(sock)
    try:
        transport.start_client(timeout=20)
        key=transport.get_remote_server_key();fingerprint='SHA256:'+base64.b64encode(hashlib.sha256(key.asbytes()).digest()).decode().rstrip('=')
        if cfg['action']=='probe':print(json.dumps({'ok':True,'fingerprint':fingerprint,'type':key.get_name()}));return
        if not secrets.compare_digest(fingerprint,cfg.get('fingerprint','')):raise RuntimeError('SSH host fingerprint changed; installation refused')
        if cfg.get('privateKey'):
            parsed=None
            for kind in [paramiko.Ed25519Key,paramiko.ECDSAKey,paramiko.RSAKey]:
                try:parsed=kind.from_private_key(io.StringIO(cfg['privateKey']),password=cfg.get('passphrase') or None);break
                except (paramiko.SSHException,ValueError):pass
            if parsed is None:raise RuntimeError('Private key could not be read')
            transport.auth_publickey(cfg.get('username','root'),parsed)
        else:transport.auth_password(cfg.get('username','root'),cfg.get('password',''))
        session=transport.open_session(timeout=20);session.settimeout(20);session.exec_command('id -u' if cfg.get('username','root')=='root' else 'sudo -n id -u');uid=session.makefile('rb').read(32).strip()
        if uid!=b'0':raise RuntimeError('Root access or passwordless sudo is required')
        session.close()
        sftp=paramiko.SFTPClient.from_transport(transport);temp='/tmp/alirezadns-'+secrets.token_hex(16);sftp.mkdir(temp,0o700)
        try:
            script=pathlib.Path(__file__).with_name('alirezadns-remote.py').read_bytes()
            with sftp.file(temp+'/agent.py','wb') as out:out.write(script)
            sftp.chmod(temp+'/agent.py',0o600)
            session=transport.open_session(timeout=20);session.exec_command(('' if cfg.get('username','root')=='root' else 'sudo -n ')+'python3 '+temp+'/agent.py --'+('preflight' if cfg['action']=='preflight' else 'install'))
            session.sendall(json.dumps({k:cfg.get(k,'') for k in ['host','domain','email']}).encode());session.shutdown_write()
            output=bytearray();pending=bytearray();deadline=time.monotonic()+1800
            while not session.exit_status_ready() or session.recv_ready() or session.recv_stderr_ready():
                if time.monotonic()>deadline:raise RuntimeError('Remote installation timed out; reconnect to resume')
                if session.recv_ready():
                    chunk=session.recv(65536);output.extend(chunk);pending.extend(chunk)
                    while b'\n' in pending:
                        line,_,rest=pending.partition(b'\n');pending=bytearray(rest)
                        try:
                            event=json.loads(line)
                            if event.get('progress'):print(json.dumps({'progress':event['progress']}),flush=True)
                        except (ValueError,UnicodeDecodeError):pass
                if session.recv_stderr_ready():session.recv_stderr(65536) # never expose credentials from upstream logs
                if len(output)>1048576:raise RuntimeError('Unexpected installation output')
                time.sleep(.05)
            code=session.recv_exit_status();result=json.loads(output.decode().strip().splitlines()[-1])
            if code or not result.get('ok'):raise RuntimeError(result.get('error','Remote installation failed'))
            print(json.dumps(result))
        finally:
            with __import__('contextlib').suppress(Exception):sftp.remove(temp+'/agent.py');sftp.rmdir(temp)
            sftp.close()
    finally:transport.close();sock.close()
if __name__=='__main__':
    try:main()
    except paramiko.AuthenticationException:print(json.dumps({'ok':False,'error':'SSH authentication failed'}));sys.exit(1)
    except Exception as e:print(json.dumps({'ok':False,'error':str(e)[:400]}));sys.exit(1)
