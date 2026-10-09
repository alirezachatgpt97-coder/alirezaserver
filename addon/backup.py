#!/usr/bin/python3
# Consistent SQLite snapshot plus add-on configuration, certificates and data.
# Run alongside Nova's own backup; this archive deliberately does not replace it.
import datetime, os, pathlib, sqlite3, tarfile, tempfile
if os.geteuid()!=0:raise SystemExit('Run as root.')
out=pathlib.Path('/var/backups/alirezaserver');out.mkdir(parents=True,exist_ok=True,mode=0o700)
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ')
target=out/('alirezaserver-'+stamp+'.tar.gz')
with tempfile.TemporaryDirectory(prefix='alirezaserver-backup-') as temp:
    snapshots=[]
    snap=pathlib.Path(temp)/'addon.db'
    with sqlite3.connect('/var/lib/alirezaserver/addon.db',timeout=30) as source:
        with sqlite3.connect(snap) as dest:source.backup(dest)
    ai=pathlib.Path('/var/lib/alirezaserver/ai.db')
    if ai.exists():
        ai_snapshot=pathlib.Path(temp)/'ai.db'
        with sqlite3.connect(ai,timeout=30) as src:
            with sqlite3.connect(ai_snapshot) as dst:src.backup(dst)
        snapshots.append(ai_snapshot)
    def filter_entry(entry):
        if any(entry.name=='var/lib/alirezaserver/'+n+s for n in ['addon.db','ai.db'] for s in ['', '-wal','-shm']):return None
        if entry.name.endswith('/management.sock') or entry.name.endswith('/openvpn.pid'):return None
        return entry
    with tarfile.open(target,'w:gz') as tar:
        for name in ['opt/alirezaserver','var/lib/alirezaserver','etc/systemd/system/AdGuardHome.service','etc/systemd/system/alireza-firewall.service','etc/systemd/system/alireza-openvpn@.service','etc/systemd/system/nova-agent.service.d/alirezaserver.conf','etc/systemd/system/nova-agent.service.d/zz-alirezaserver.conf']:
            if pathlib.Path('/'+name).exists():tar.add('/'+name,arcname=name,filter=filter_entry)
        for name in ['alireza-update.service','alireza-update.timer','alireza-update-recover.service']:
            path=pathlib.Path('/etc/systemd/system')/name
            if path.exists():tar.add(path,arcname='etc/systemd/system/'+name)
        tar.add(snap,arcname='var/lib/alirezaserver/addon.db')
        for snapshot in snapshots:tar.add(snapshot,arcname='var/lib/alirezaserver/'+snapshot.name)
os.chmod(target,0o600)
print(target)
