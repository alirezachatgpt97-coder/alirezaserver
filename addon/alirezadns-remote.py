#!/usr/bin/python3
"""Remote-node installer/updater. Original HyperDNS binary and data stay separate."""
import base64, contextlib, fcntl, hashlib, http.client, ipaddress, json, os, pathlib, platform, re, secrets, shutil, socket, struct, subprocess, sys, tempfile, time, urllib.request
APP=pathlib.Path('/opt/hyperdns')
AGENT=pathlib.Path('/opt/alirezadns-agent')
BACKUPS=pathlib.Path('/var/backups/alirezadns')
META=AGENT/'node.json'
PENDING=AGENT/'pending.json'
VERSION='v2.2.0-beta.1'
PIN={'amd64':'17d9015200115878a375f74c56cff2c6b9e22e682a7ceab61104f55d54c7f6bf','arm64':'ca19bfb5b144838ef3d28b5d29074534084ee54713594d297a076e23cc551e98'}
PORTS=[53,80,443,8080,853,8443,5222,5223,2099,8393]
def run(args,timeout=180):
    return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,timeout=timeout).stdout
def save(path,data):
    path.parent.mkdir(parents=True,exist_ok=True,mode=0o700)
    temp=path.with_suffix('.new')
    with open(temp,'w') as stream:
        os.chmod(temp,0o600);json.dump(data,stream);stream.flush();os.fsync(stream.fileno())
    os.replace(temp,path)
    if os.name=='posix':
        fd=os.open(path.parent,os.O_RDONLY)
        try:os.fsync(fd)
        finally:os.close(fd)
def read(path):return json.loads(path.read_text())
class HTTPSOnly(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,url):
        if not url.startswith('https://'):raise RuntimeError('Unencrypted release redirect refused')
        return super().redirect_request(req,fp,code,msg,headers,url)
def fetch(url,limit=96*1024*1024):
    if not url.startswith('https://'):raise RuntimeError('HTTPS required')
    with urllib.request.build_opener(HTTPSOnly).open(urllib.request.Request(url,headers={'User-Agent':'alirezadns/0.5'}),timeout=45) as r:
        data=r.read(limit+1)
        if len(data)>limit:raise RuntimeError('Download too large')
        return data
def binary(version,arch,expected=None):
    if not re.fullmatch(r'v\d+\.\d+\.\d+(?:-[A-Za-z0-9.]+)?',version):raise RuntimeError('Invalid version')
    base='https://github.com/IzumiRain/HyperDNS/releases/download/'+version+'/'
    name='hyperdns-linux-'+arch
    if expected is None:
        lines=fetch(base+'checksums.txt',65536).decode().splitlines()
        hashes=[x.split()[0] for x in lines if len(x.split())==2 and x.split()[1].lstrip('*')==name]
        if len(hashes)!=1:raise RuntimeError('Missing unique release checksum')
        expected=hashes[0]
    data=fetch(base+name)
    if hashlib.sha256(data).hexdigest()!=expected:raise RuntimeError('Binary checksum mismatch')
    # Stop incompatible releases before replacing the daemon: these are the UI
    # contracts used by the integration, not a claim about future compatibility.
    for marker in [b'const ADMIN_BASE = (function () {',b'hyperdns_token',b'/api/auth/login',b'/api/config']:
        if marker not in data:raise RuntimeError('Upstream UI changed; current version retained')
    return data
def dns_probe(host):
    ident=secrets.token_bytes(2);question=ident+b'\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00'+b'\x07invalid\x00\x00\x01\x00\x01'
    with socket.socket(socket.AF_INET,socket.SOCK_DGRAM) as s:
        s.settimeout(8);s.sendto(question,(host,53));reply=s.recv(4096)
        if reply[:2]!=ident or len(reply)<12 or not(reply[2]&128):raise RuntimeError('UDP DNS check failed')
    with socket.create_connection((host,53),8) as s:
        s.sendall(struct.pack('!H',len(question))+question);f=s.makefile('rb');size=f.read(2)
        if len(size)!=2:raise RuntimeError('TCP DNS header missing')
        reply=f.read(struct.unpack('!H',size)[0])
        if reply[:2]!=ident or len(reply)<12 or not(reply[2]&128):raise RuntimeError('TCP DNS check failed')
def health(meta):
    run(['systemctl','is-active','--quiet','hyperdns.service'])
    # Read the daemon's root-only control socket; path/port rotation must not
    # turn an otherwise healthy update into a false failure.
    conn=http.client.HTTPConnection('localhost',timeout=10)
    conn.sock=socket.socket(socket.AF_UNIX,socket.SOCK_STREAM);conn.sock.settimeout(10);conn.sock.connect('/run/hyperdns/control.sock')
    try:
        conn.request('GET','/v1/settings',headers={'X-HyperDNS-Control-Version':'v1'});response=conn.getresponse()
        if response.status!=200:raise RuntimeError('Control settings unavailable')
        settings=json.loads(response.read(131072))
    finally:conn.close()
    meta['adminPath']=settings['admin_path'];meta['port']=settings['web_port']
    base='https://'+meta['domain']+':'+str(meta['port'])+'/'+meta['adminPath']
    for path,marker in [('/dash/login',b'/api/auth/login'),('/js/app.js',b'const ADMIN_BASE = (function () {')]:
        if marker not in fetch(base+path,8*1024*1024):raise RuntimeError('Remote panel contract check failed')
    dns_probe(meta['bindIP'])
def wait_health(meta,attempts=20):
    for _ in range(attempts):
        try:health(meta);return
        except Exception:time.sleep(3)
    raise RuntimeError('Panel HTTPS or DNS health check failed; inspect journalctl -u hyperdns')
def recover():
    if not PENDING.exists():return
    journal=read(PENDING);backup=pathlib.Path(journal['backup']).resolve()
    if backup.parent!=BACKUPS.resolve() or not (backup/'hyperdns').is_file():raise RuntimeError('Invalid recovery snapshot')
    stage=APP.with_name('alirezadns-restored')
    if stage.exists():shutil.rmtree(stage)
    shutil.copytree(backup,stage,symlinks=True)
    if APP.exists():shutil.rmtree(APP)
    os.replace(stage,APP);save(META,journal['previous']);PENDING.unlink()
def update():
    if PENDING.exists():
        run(['systemctl','stop','hyperdns.service']);recover();run(['systemctl','start','hyperdns.service']);wait_health(read(META))
    meta=read(META)
    release=json.loads(fetch('https://api.github.com/repos/IzumiRain/HyperDNS/releases/latest',2*1024*1024));version=release['tag_name']
    if version==meta['version']:return
    if not re.fullmatch(r'v2\.\d+\.\d+(?:-[A-Za-z0-9.]+)?',version):raise RuntimeError('New major version requires integration review')
    if tuple(map(int,re.findall(r'\d+',version)[:3]))<tuple(map(int,re.findall(r'\d+',meta['version'])[:3])):raise RuntimeError('Downgrade refused')
    status=AGENT/'update-status.json'
    if status.exists() and read(status).get('rejected')==version:return
    data=binary(version,meta['arch']);health(meta)
    if APP.is_symlink():raise RuntimeError('Custom installation path refused')
    size=sum(p.stat().st_size for p in APP.rglob('*') if p.is_file())
    if shutil.disk_usage(APP).free<size*3+len(data)+64*1024*1024:raise RuntimeError('Not enough space for backup')
    BACKUPS.mkdir(parents=True,exist_ok=True,mode=0o700)
    backup=BACKUPS/str(time.time_ns());stopped=False
    try:
        run(['systemctl','stop','hyperdns.service']);stopped=True
        shutil.copytree(APP,backup,symlinks=True)
        save(PENDING,{'backup':str(backup),'previous':meta})
        target=APP/'hyperdns.new';target.write_bytes(data);os.chmod(target,0o755);os.replace(target,APP/'hyperdns')
        run(['systemctl','start','hyperdns.service']);stopped=False
        wait_health(meta);meta['version']=version;save(META,meta);PENDING.unlink()
        save(status,{'ok':True,'version':version,'at':int(time.time())})
        for old in sorted(BACKUPS.iterdir())[:-2]:
            if old.is_dir():shutil.rmtree(old)
    except Exception:
        if PENDING.exists():
            run(['systemctl','stop','hyperdns.service']);recover();run(['systemctl','start','hyperdns.service']);wait_health(read(META))
        elif stopped:run(['systemctl','start','hyperdns.service'])
        save(status,{'ok':False,'rejected':version,'at':int(time.time())});raise
def progress(stage):print(json.dumps({'progress':stage}),flush=True)
def preflight(cfg):
    if pathlib.Path('/opt/nova-node-agent').exists() or pathlib.Path('/var/lib/alirezaserver').exists():raise RuntimeError('Main panel server is not a valid destination')
    if not pathlib.Path('/run/systemd/system').is_dir():raise RuntimeError('systemd required')
    if not re.search(r'^ID=(?:"?)(?:ubuntu|debian)(?:"?)$',pathlib.Path('/etc/os-release').read_text(),re.M):raise RuntimeError('Ubuntu/Debian required')
    if platform.machine() not in ['x86_64','aarch64']:raise RuntimeError('amd64/arm64 required')
    if cfg['host'] not in socket.gethostbyname_ex(cfg['domain'])[2]:raise RuntimeError('Domain A record must point directly to destination')
    if META.exists():
        meta=read(META)
        if meta['domain']!=cfg['domain']:raise RuntimeError('Existing node has a different domain')
        return {'managed':True,'version':meta['version'],'ports':'managed installation; settings retained'}
    if APP.exists() or pathlib.Path('/etc/systemd/system/hyperdns.service').exists():raise RuntimeError('Independent HyperDNS installation will not be overwritten')
    for port in PORTS:
        for kind in ([socket.SOCK_STREAM,socket.SOCK_DGRAM] if port==53 else [socket.SOCK_STREAM]):
            with socket.socket(socket.AF_INET,kind) as sock:
                try:sock.bind(('0.0.0.0',port))
                except OSError:raise RuntimeError('Destination port '+str(port)+' is occupied; no service was stopped')
    if shutil.disk_usage('/opt').free<512*1024*1024:raise RuntimeError('At least 512 MiB free disk is required')
    return {'managed':False,'ports':'available','architecture':platform.machine()}
def install(cfg):
    progress('preflight')
    preflight(cfg)
    if pathlib.Path('/opt/nova-node-agent').exists() or pathlib.Path('/var/lib/alirezaserver').exists():raise RuntimeError('Refusing to install on the main panel server')
    if META.exists():
        meta=read(META)
        if cfg['domain']!=meta['domain']:raise RuntimeError('Existing managed node has a different domain')
        progress('existing-installation');run(['systemctl','start','hyperdns.service']);wait_health(meta,120);save(META,meta)
        run(['systemctl','enable','--now','alirezadns-update.timer']);return meta
    if APP.exists() or pathlib.Path('/etc/systemd/system/hyperdns.service').exists():raise RuntimeError('Existing independent HyperDNS installation was not overwritten')
    if not pathlib.Path('/run/systemd/system').is_dir():raise RuntimeError('systemd required')
    osinfo=pathlib.Path('/etc/os-release').read_text()
    if not re.search(r'^ID=(?:"?)(?:ubuntu|debian)(?:"?)$',osinfo,re.M):raise RuntimeError('Remote installation supports Ubuntu/Debian')
    ip=str(ipaddress.IPv4Address(cfg['host']));domain=cfg['domain']
    if not re.fullmatch(r'(?=.{1,253}$)[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?',domain) or '.' not in domain:raise RuntimeError('Invalid domain')
    if ip not in socket.gethostbyname_ex(domain)[2]:raise RuntimeError('Domain A record must point directly to the destination IP')
    bind=socket.socket(socket.AF_INET,socket.SOCK_DGRAM);bind.connect(('1.1.1.1',53));bindIP=bind.getsockname()[0];bind.close()
    for port in PORTS:
        for kind in ([socket.SOCK_STREAM,socket.SOCK_DGRAM] if port==53 else [socket.SOCK_STREAM]):
            with socket.socket(socket.AF_INET,kind) as s:
                try:s.bind((bindIP,port))
                except OSError:raise RuntimeError('Destination port '+str(port)+' is occupied; no service was stopped')
    arch={'x86_64':'amd64','aarch64':'arm64'}.get(platform.machine())
    if not arch:raise RuntimeError('amd64/arm64 required')
    progress('download');data=binary(VERSION,arch,PIN[arch])
    progress('packages');run(['apt-get','-o','DPkg::Lock::Timeout=300','update'],600)
    run(['apt-get','-o','DPkg::Lock::Timeout=300','install','-y','ca-certificates','iptables'],600)
    progress('configuration');APP.mkdir(mode=0o700);(APP/'certs').mkdir(mode=0o700)
    (APP/'hyperdns').write_bytes(data);os.chmod(APP/'hyperdns',0o755)
    password=secrets.token_urlsafe(24)
    save(APP/'config.json',{'server':{'public_ip':ip,'bind_host':bindIP,'web_port':8080,'admin_username':'admin','admin_password':password,'api_key':'hdns_live_'+secrets.token_hex(24)},'dns':{'enabled':True,'port':53,'dot_port':853,'doh_port':8443},'tls':{'domain':domain,'email':cfg.get('email',''),'auto_cert':True,'cert_file':str(APP/'certs/cert.pem'),'key_file':str(APP/'certs/key.pem')},'access':{'allow_all':False}})
    AGENT.mkdir(parents=True,exist_ok=True,mode=0o700)
    shutil.copy2(__file__,AGENT/'agent.py')
    unit='''[Unit]
Description=alirezadns remote DNS engine
After=network-online.target alirezadns-firewall.service
Wants=network-online.target
Requires=alirezadns-firewall.service
[Service]
Type=simple
WorkingDirectory=/opt/hyperdns
RuntimeDirectory=hyperdns
RuntimeDirectoryMode=0700
ExecStartPre=/usr/bin/python3 /opt/alirezadns-agent/agent.py --recover
ExecStart=/opt/hyperdns/hyperdns -daemon -db /opt/hyperdns/data.db -key /opt/hyperdns/master.key -config /opt/hyperdns/config.json
Restart=on-failure
RestartSec=5
UMask=0077
[Install]
WantedBy=multi-user.target
'''
    pathlib.Path('/etc/systemd/system/hyperdns.service').write_text(unit)
    firewall='''#!/bin/sh
set -eu
iptables -N ALIREZADNS 2>/dev/null || true
iptables -F ALIREZADNS
iptables -A ALIREZADNS -p tcp -m multiport --dports 53,80,443,8080,853,8443,5222,5223,2099,8393 -j ACCEPT
iptables -A ALIREZADNS -p udp --dport 53 -j ACCEPT
iptables -C INPUT -j ALIREZADNS 2>/dev/null || iptables -I INPUT 1 -j ALIREZADNS
'''
    (AGENT/'firewall.sh').write_text(firewall);os.chmod(AGENT/'firewall.sh',0o700)
    pathlib.Path('/etc/systemd/system/alirezadns-firewall.service').write_text('[Unit]\nDescription=alirezadns remote ports\nAfter=network-online.target ufw.service\n[Service]\nType=oneshot\nRemainAfterExit=yes\nExecStart=/bin/sh /opt/alirezadns-agent/firewall.sh\n')
    pathlib.Path('/etc/systemd/system/alirezadns-update.service').write_text('[Unit]\nDescription=alirezadns verified update\nAfter=network-online.target\n[Service]\nType=oneshot\nExecStart=/usr/bin/python3 /opt/alirezadns-agent/agent.py --update\nExecStopPost=/usr/bin/python3 /opt/alirezadns-agent/agent.py --recover-start\nTimeoutStartSec=20min\nUMask=0077\n')
    pathlib.Path('/etc/systemd/system/alirezadns-update.timer').write_text('[Unit]\nDescription=Check alirezadns engine releases\n[Timer]\nOnCalendar=*-*-* 01,07,13,19:00:00\nRandomizedDelaySec=20min\nPersistent=true\n[Install]\nWantedBy=timers.target\n')
    meta={'host':ip,'bindIP':bindIP,'domain':domain,'adminPath':'','arch':arch,'version':VERSION,'username':'admin','password':password,'port':8080}
    save(META,meta)
    progress('service-start');run(['systemctl','daemon-reload']);run(['systemctl','enable','--now','hyperdns.service'])
    progress('https-dns-health');wait_health(meta,120);save(META,meta)
    run(['systemctl','enable','--now','alirezadns-update.timer']);return meta
def main():
    if os.geteuid()!=0:raise RuntimeError('Root required')
    with open('/run/alirezadns.lock','w') as lock:
        try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
        except BlockingIOError:
            if '--recover' in sys.argv:return
            raise RuntimeError('Another remote operation is running')
        if '--recover-start' in sys.argv:
            if PENDING.exists():run(['systemctl','stop','hyperdns.service']);recover();run(['systemctl','start','hyperdns.service']);wait_health(read(META))
        elif '--recover' in sys.argv:recover()
        elif '--update' in sys.argv:update()
        elif '--preflight' in sys.argv:print(json.dumps({'ok':True,'checks':preflight(json.load(sys.stdin))}))
        elif '--install' in sys.argv:print(json.dumps({'ok':True,'node':install(json.load(sys.stdin))}))
        else:raise RuntimeError('Unknown operation')
if __name__=='__main__':
    try:main()
    except Exception as e:print(json.dumps({'ok':False,'error':str(e)[:400]}));sys.exit(1)
