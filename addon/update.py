#!/usr/bin/python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Official Nova update transaction. Add-on files and VPN/DNS data are separate.
Run by a systemd service, outside the Nova service's read-only code mount.
"""
import datetime, hashlib, json, os, pathlib, re, shutil, signal, subprocess, sys, tarfile, tempfile, time, urllib.request
ROOT=pathlib.Path('/var/lib/alirezaserver')
APP=pathlib.Path('/opt/alirezaserver')
NOVA=pathlib.Path('/opt/nova-node-agent')
BACKUPS=pathlib.Path('/var/backups/alirezaserver-updates')
DATA=[pathlib.Path(p) for p in ['/var/lib/nova','/etc/nova','/etc/xray','/etc/sing-box']]
JOURNAL=ROOT/'update-pending.json'
SOURCE=ROOT/'nova-source.json'
STATE=ROOT/'update-status.json'
NATIVE=pathlib.Path('/opt/nova-update-status')
class RejectedUpdate(RuntimeError):pass

def write_json(path,value):
    path.parent.mkdir(parents=True,exist_ok=True)
    tmp=path.with_name(path.name+'.new')
    with open(tmp,'w',encoding='utf-8') as f:json.dump(value,f);f.flush();os.fsync(f.fileno())
    os.chmod(tmp,0o600);os.replace(tmp,path)
def read_json(path,default=None):
    try:return json.loads(path.read_text())
    except FileNotFoundError:return default
def status(ok,stage,**extra):
    value={'ok':ok,'stage':stage,'at':int(time.time()*1000),**extra}
    write_json(STATE,value);write_json(NATIVE,value);print(stage,extra.get('message',''),flush=True)
def run(args,timeout=180):
    try:return subprocess.run([str(a) for a in args],check=True,timeout=timeout,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True).stdout
    except subprocess.CalledProcessError as e:raise RuntimeError(str(args[0])+': '+(e.stdout or str(e))[-1800:]) from e
class HTTPSOnly(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,url):
        if not url.startswith('https://'):raise RuntimeError('Non-HTTPS release redirect rejected')
        return super().redirect_request(req,fp,code,msg,headers,url)
def download(url,dest,limit=128*1024*1024):
    if not url.startswith('https://'):raise RuntimeError('HTTPS required')
    req=urllib.request.Request(url,headers={'User-Agent':'alirezaserver-update/0.4','Accept':'application/vnd.github+json' if 'api.github.com' in url else '*/*'})
    with urllib.request.build_opener(HTTPSOnly).open(req,timeout=45) as r,open(dest,'wb') as f:
        total=0
        while True:
            data=r.read(65536)
            if not data:break
            total+=len(data)
            if total>limit:raise RuntimeError('Release exceeds download limit')
            f.write(data)
def safe_extract(archive,dest):
    with tarfile.open(archive,'r:gz') as tar:
        members=tar.getmembers()
        if len(members)>20000 or sum(m.size for m in members)>256*1024*1024:raise RuntimeError('Release exceeds unpacking limits')
        for member in members:
            p=pathlib.PurePosixPath(member.name)
            if p.is_absolute() or '..' in p.parts or '\\' in member.name or not(member.isfile() or member.isdir()):raise RuntimeError('Unsafe archive entry: '+member.name)
        for member in members:
            target=dest.joinpath(*pathlib.PurePosixPath(member.name).parts)
            if member.isdir():target.mkdir(parents=True,exist_ok=True)
            else:
                target.parent.mkdir(parents=True,exist_ok=True)
                with tar.extractfile(member) as src,open(target,'wb') as out:shutil.copyfileobj(src,out)
                os.chmod(target,0o755 if member.mode&0o111 else 0o644)
def tree_size(path):return sum(p.stat().st_size for p in path.rglob('*') if p.is_file() and not p.is_symlink()) if path.exists() else 0
def copy_tree(src,dst):shutil.copytree(src,dst,symlinks=True)
def restore(journal):
    backup=pathlib.Path(journal['backup']).resolve()
    if backup.parent!=BACKUPS.resolve() or not (backup/'nova/package.json').is_file():raise RuntimeError('Invalid rollback snapshot')
    # Only restore fixed, locally owned paths, never pathnames from the network.
    replacement=NOVA.with_name('.alireza-restore')
    if replacement.exists():shutil.rmtree(replacement)
    copy_tree(backup/'nova',replacement)
    failed=NOVA.with_name('.alireza-failed')
    if failed.exists():shutil.rmtree(failed)
    if NOVA.exists():os.replace(NOVA,failed)
    os.replace(replacement,NOVA)
    for index,path in enumerate(DATA):
        snap=backup/('data-'+str(index))
        if path.exists():shutil.rmtree(path)
        if snap.exists():copy_tree(snap,path)
    old_source=read_json(backup/'source.json')
    if old_source is not None:write_json(SOURCE,old_source)
    elif SOURCE.exists():SOURCE.unlink()
    if failed.exists():shutil.rmtree(failed)
    old=NOVA.with_name('.alireza-previous')
    if old.exists():shutil.rmtree(old)
def health():
    run(['systemctl','is-active','--quiet','nova-agent.service'])
    return run(['node',APP/'verify-install.mjs'],timeout=100)
def retry_health():
    error=None
    for _ in range(8):
        try:return health()
        except Exception as e:error=e;time.sleep(3)
    raise RuntimeError('Post-update panel/add-on checks failed') from error
def activate(candidate,meta):
    if any(p.is_symlink() for p in [NOVA,*DATA]):raise RuntimeError('Custom symlink layout requires an explicit backup adapter; live installation retained')
    env=pathlib.Path('/etc/nova/agent.env')
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith('NOVA_DB='):
                db=pathlib.Path(line.split('=',1)[1].strip().strip('\"\''))
                if not db.resolve().is_relative_to(DATA[0].resolve()):raise RuntimeError('Custom Nova database location is outside the rollback snapshot; live installation retained')
    BACKUPS.mkdir(parents=True,exist_ok=True,mode=0o700)
    required=(tree_size(NOVA)+sum(tree_size(p) for p in DATA))*2+tree_size(candidate)+64*1024*1024
    if min(shutil.disk_usage(BACKUPS).free,shutil.disk_usage(NOVA.parent).free)<required:raise RuntimeError('Not enough free space for update and rollback snapshot')
    health() # Do not attribute a pre-existing failure to the new release.
    backup=BACKUPS/datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ')
    backup.mkdir(mode=0o700)
    journal={'backup':str(backup),'candidate':meta,'phase':'prepared'}
    stopped=False;changed=False
    try:
        run(['systemctl','stop','nova-agent.service']);stopped=True
        copy_tree(NOVA,backup/'nova')
        for i,p in enumerate(DATA):
            if p.exists():copy_tree(p,backup/('data-'+str(i)))
        if SOURCE.exists():shutil.copy2(SOURCE,backup/'source.json')
        write_json(JOURNAL,journal)
        old=NOVA.with_name('.alireza-previous')
        if old.exists():raise RuntimeError('Unresolved prior code directory')
        os.replace(NOVA,old);os.replace(candidate,NOVA);changed=True
        journal['phase']='checking';write_json(JOURNAL,journal)
        run(['systemctl','start','nova-agent.service']);stopped=False
        retry_health()
        write_json(SOURCE,meta);JOURNAL.unlink()
        shutil.rmtree(old)
        status(True,'updated',**meta)
        # Keep two complete rollback snapshots, not an ever-growing archive.
        valid=sorted(p for p in BACKUPS.iterdir() if p.is_dir() and (p/'nova/package.json').is_file())
        for p in valid[:-2]:shutil.rmtree(p)
    except Exception as error:
        if JOURNAL.exists():
            run(['systemctl','stop','nova-agent.service']);restore(journal)
            # Keep the journal until the restored installation is healthy.
            run(['systemctl','start','nova-agent.service']);retry_health();JOURNAL.unlink()
        elif stopped:run(['systemctl','start','nova-agent.service'])
        if changed:raise RejectedUpdate(str(error)) from error
        raise
def recover(start=False):
    journal=read_json(JOURNAL)
    if not journal:return
    if start:run(['systemctl','stop','nova-agent.service'])
    restore(journal)
    if start:run(['systemctl','start','nova-agent.service']);retry_health()
    JOURNAL.unlink();status(False,'recovered',code=26,message='An interrupted update was restored from its snapshot')
def main():
    import fcntl
    if os.geteuid()!=0:raise RuntimeError('Run as root')
    ROOT.mkdir(parents=True,exist_ok=True,mode=0o700)
    with open('/run/alirezaserver-update.lock','w') as lock:
        try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
        except BlockingIOError:
            if '--boot-recover' in sys.argv:return
            raise RuntimeError('Another update is running')
        if '--boot-recover' in sys.argv:recover();return
        if '--recover' in sys.argv:recover(start=True);return
        with open('/run/alirezaserver-install.lock','w') as install_lock:
            fcntl.flock(install_lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
            recover(start=True)
            commit=''
            try:
                previous=read_json(STATE,{})
                with tempfile.TemporaryDirectory(prefix='.alireza-stage-',dir=NOVA.parent) as temp:
                    temp=pathlib.Path(temp)
                    download('https://api.github.com/repos/IRNova/Nova-Server/commits/main',temp/'commit.json',2*1024*1024)
                    commit=read_json(temp/'commit.json')['sha']
                    if not re.fullmatch('[a-f0-9]{40}',commit):raise RuntimeError('Invalid release commit')
                    base='https://raw.githubusercontent.com/IRNova/Nova-Server/'+commit+'/'
                    download(base+'nova-node-agent.version',temp/'version',1000)
                    version=(temp/'version').read_text().strip()
                    if not re.fullmatch(r'\d+\.\d+\.\d+',version):raise RuntimeError('Invalid release version')
                    download(base+'nova-node-agent.tar.gz.sha256',temp/'checksum',4096)
                    sha=(temp/'checksum').read_text().split()[0].lower()
                    if not re.fullmatch('[a-f0-9]{64}',sha):raise RuntimeError('Invalid release checksum')
                    meta={'commit':commit,'version':version,'sha256':sha}
                    if read_json(SOURCE,{}).get('sha256')==sha:status(True,'current',**meta);return
                    if previous.get('rejected') and previous.get('commit')==commit and '--retry' not in sys.argv:
                        print('Previously rejected release retained for review; use --retry after resolving the error');return
                    installed=json.loads((NOVA/'package.json').read_text())['version']
                    if tuple(map(int,version.split('.')))<tuple(map(int,installed.split('.'))):raise RuntimeError('Automatic downgrade refused')
                    status(None,'downloading',**meta)
                    download(base+'nova-node-agent.tar.gz',temp/'agent.tar.gz')
                    if hashlib.sha256((temp/'agent.tar.gz').read_bytes()).hexdigest()!=sha:raise RejectedUpdate('Release checksum mismatch')
                    stage=temp/'agent';stage.mkdir();safe_extract(temp/'agent.tar.gz',stage)
                    if json.loads((stage/'package.json').read_text())['version']!=version:raise RuntimeError('Package version mismatch')
                    status(None,'compatibility-check',**meta)
                    try:run(['node',APP/'compat-check.mjs',stage],timeout=180)
                    except Exception as e:raise RejectedUpdate(str(e)) from e
                    activate(stage,meta)
            except Exception as e:
                status(False,'failed',code=26,commit=commit,rejected=isinstance(e,RejectedUpdate),message=str(e)[:1000]);raise
if __name__=='__main__':
    def interrupted(signum,frame):raise RuntimeError('Update interrupted; attempting recovery')
    signal.signal(signal.SIGTERM,interrupted);signal.signal(signal.SIGINT,interrupted)
    try:main()
    except Exception as e:print('Update not completed:',e,file=sys.stderr);sys.exit(1)
