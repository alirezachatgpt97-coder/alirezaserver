#!/usr/bin/python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""OpenVPN hooks. No credentials are passed in command-line arguments or logs."""
import hashlib, hmac, json, os, re, sqlite3, sys, time

def main():
    action, sid = sys.argv[1:3]
    if not re.fullmatch(r'[a-f0-9]{12}', sid): return 1
    db = sqlite3.connect(os.environ.get('ALIREZA_DB', '/var/lib/alirezaserver/addon.db'), timeout=10)
    db.row_factory = sqlite3.Row
    db.execute('PRAGMA busy_timeout=10000')
    name = os.environ.get('common_name', '')
    now = int(time.time())
    if action == 'auth':
        with open(sys.argv[3], 'r', encoding='utf-8') as f:
            raw = f.read(1024)
        lines = raw.splitlines()
        if len(lines) != 2: return 1
        name, password = lines
    if not re.fullmatch(r'[a-zA-Z0-9_.@-]{1,64}', name): return 1
    peer = os.environ.get('trusted_ip', '') + ':' + os.environ.get('trusted_port', '')
    if action == 'disconnect':
        db.execute('BEGIN IMMEDIATE')
        old = db.execute('SELECT * FROM sessions WHERE sid=? AND name=? AND peer=?', (sid,name,peer)).fetchone()
        if old and not old['ended']:
            rx, tx = max(0,int(os.environ.get('bytes_received','0'))), max(0,int(os.environ.get('bytes_sent','0')))
            delta = max(0,rx-old['rx']) + max(0,tx-old['tx'])
            db.execute('UPDATE users SET used=used+? WHERE username=?', (delta,name))
            db.execute('UPDATE sessions SET rx=?,tx=?,ended=?,seen=? WHERE sid=? AND name=? AND peer=?', (rx,tx,now,now,sid,name,peer))
        db.commit()
        return 0
    row = db.execute('SELECT * FROM users WHERE username=?', (name,)).fetchone()
    server = db.execute('SELECT data FROM servers WHERE id=?', (sid,)).fetchone()
    if not row or not server or not json.loads(server['data'])['enabled']: return 1
    if not row['enabled'] or sid not in json.loads(row['serverIds']): return 1
    if row['expiry'] and row['expiry'] <= now: return 1
    if row['quota'] and row['used'] >= row['quota']: return 1
    if action == 'auth':
        if len(password) > 128: return 1
        actual = hashlib.scrypt(password.encode('utf-8'), salt=bytes.fromhex(row['salt']), n=16384, r=8, p=1, dklen=32)
        return 0 if hmac.compare_digest(actual.hex(), row['hash']) else 1
    if action != 'connect': return 1
    # Serialize the final device-limit decision: parallel handshakes cannot overbook.
    db.execute('BEGIN IMMEDIATE')
    row = db.execute('SELECT * FROM users WHERE username=?', (name,)).fetchone()
    if not row or not row['enabled'] or (row['expiry'] and row['expiry']<=now) or (row['quota'] and row['used']>=row['quota']):
        db.rollback(); return 1
    count = db.execute('SELECT count(*) FROM sessions WHERE name=? AND ended=0 AND NOT (sid=? AND peer=?)', (name,sid,peer)).fetchone()[0]
    if count >= row['devices']: db.rollback(); return 1
    db.execute('INSERT INTO sessions(sid,name,peer,connected,rx,tx,seen,ended) VALUES(?,?,?,?,0,0,?,0) ON CONFLICT(sid,name,peer) DO UPDATE SET connected=excluded.connected,rx=0,tx=0,seen=excluded.seen,ended=0', (sid,name,peer,now,now))
    db.commit()
    return 0

if __name__ == '__main__':
    try: sys.exit(main())
    except Exception: sys.exit(1)
