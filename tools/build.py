#!/usr/bin/env python3
"""Synchronize maintainable addon sources into the standalone ONLINE installer."""
import hashlib,pathlib,re
root=pathlib.Path(__file__).resolve().parents[1]
p=root/'install.sh';s=p.read_text();seen=set()
def replace(m):
    name=m[1];seen.add(name);return f'cat > "$APP/{name}" <<\'{m[2]}\'\n'+(root/'addon'/name).read_text().rstrip('\n')+'\n'+m[2]+'\n'
s=re.sub(r'cat > "\$APP/([^"\n]+)" <<\x27([^\x27]+)\x27\n(.*?)\n\2\n',replace,s,flags=re.S)
extra=''
for file in sorted((root/'addon').iterdir()):
    if not file.is_file() or file.name in seen:continue
    marker='ALIREZA_'+hashlib.sha256(file.name.encode()).hexdigest()[:24].upper()
    extra+=f'cat > "$APP/{file.name}" <<\'{marker}\'\n'+file.read_text().rstrip('\n')+'\n'+marker+'\n\n'
s=s.replace('export ALIREZA_ROOT="$ROOT"',extra+'export ALIREZA_ROOT="$ROOT"')
p.write_text(s)
bootstrap=root/'setup.sh';b=bootstrap.read_text();b=re.sub(r'^SHA256=.*$', 'SHA256='+hashlib.sha256(p.read_bytes()).hexdigest(),b,flags=re.M);bootstrap.write_text(b)
print('Installer synchronized; bootstrap hash updated.')
