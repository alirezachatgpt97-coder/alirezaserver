#!/usr/bin/env python3
"""Build a deterministic source ZIP from an explicit release allowlist."""
import hashlib,pathlib,sys,zipfile
root=pathlib.Path(__file__).resolve().parents[1]
root_names=['.gitignore','README.md','install.sh','setup.sh','CHANGELOG.md','SOURCES.md','LICENSE']
files=[root/name for name in root_names]
for folder in ['addon','docs','tests','tools']:
    files.extend(p for p in (root/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts and not p.name.endswith('.pyc'))
for p in files:
    if p.suffix in ['.db','.key','.pem','.crt','.ovpn'] or p.name.endswith(('-wal','-shm')):raise SystemExit('Private/runtime artifact is not allowed in source package: '+str(p))
files.sort(key=lambda p:p.relative_to(root).as_posix())
(root/'SHA256SUMS').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.relative_to(root).as_posix()+'\n' for p in files))
files.append(root/'SHA256SUMS')
target=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else root.parent/'alirezaserver-0.7.0-release.zip')
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in sorted(files,key=lambda p:p.relative_to(root).as_posix()):
        info=zipfile.ZipInfo(p.relative_to(root).as_posix(),(2026,10,14,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=(0o100755 if p.name in ['install.sh','setup.sh'] else 0o100644)<<16;z.writestr(info,p.read_bytes())
with zipfile.ZipFile(target) as z:
    assert z.testzip() is None
    for line in z.read('SHA256SUMS').decode().splitlines():
        digest,name=line.split('  ',1);assert hashlib.sha256(z.read(name)).hexdigest()==digest,name
    assert all('/' not in n or n.split('/')[0] in ['addon','docs','tests','tools'] for n in z.namelist())
    print('Files:',len(z.namelist()),'Bytes:',target.stat().st_size,'SHA256:',hashlib.sha256(target.read_bytes()).hexdigest())
