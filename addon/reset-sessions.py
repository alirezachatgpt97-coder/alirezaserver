#!/usr/bin/python3
import os, re, sqlite3, sys, time
sid=sys.argv[1]
if not re.fullmatch(r'[a-f0-9]{12}',sid):sys.exit(1)
db=sqlite3.connect('/var/lib/alirezaserver/addon.db',timeout=10)
db.execute('UPDATE sessions SET ended=? WHERE sid=?',(int(time.time()),sid))
db.commit();db.close()
for name in ['status.log','management.sock','openvpn.pid']:
    try:os.unlink('/var/lib/alirezaserver/openvpn/'+sid+'/'+name)
    except FileNotFoundError:pass
