// SPDX-License-Identifier: GPL-3.0-or-later
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, rmSync, chmodSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { randomBytes, scrypt } from 'node:crypto';
import { createConnection, createServer } from 'node:net';
import { createSocket } from 'node:dgram';
import { id, fail, validateServer, validateUser, serverConfig, clientConfig, parseStatus } from './model.mjs';
import {seal,unseal,newToken,tokenHash} from './vault.mjs';
const exec=promisify(execFile), hash=promisify(scrypt);
export const ROOT=process.env.ALIREZA_ROOT||'/var/lib/alirezaserver';
let db;
export function database() {
  if(db) return db;
  mkdirSync(ROOT,{recursive:true,mode:0o700});
  db=new DatabaseSync(`${ROOT}/addon.db`); db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=10000;');
  db.exec(`CREATE TABLE IF NOT EXISTS servers(id TEXT PRIMARY KEY,data TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,username TEXT UNIQUE NOT NULL,hash TEXT NOT NULL,salt TEXT NOT NULL,
    serverIds TEXT NOT NULL,enabled INTEGER NOT NULL,expiry INTEGER NOT NULL,quota INTEGER NOT NULL,used INTEGER NOT NULL DEFAULT 0,devices INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions(sid TEXT,name TEXT,peer TEXT,connected INTEGER,rx INTEGER,tx INTEGER,seen INTEGER,ended INTEGER,
    PRIMARY KEY(sid,name,peer));
    CREATE TABLE IF NOT EXISTS shares(uid TEXT PRIMARY KEY,token_hash TEXT UNIQUE,sealed TEXT NOT NULL);`);
  chmodSync(`${ROOT}/addon.db`,0o600); return db;
}
export function servers() { return database().prepare('SELECT data FROM servers ORDER BY id').all().map(r=>JSON.parse(r.data)); }
function server(sid) { const s=servers().find(s=>s.id===id(sid)); if(!s) fail('OpenVPN server not found',404); return s; }
const unit=sid=>`alireza-openvpn@${id(sid)}.service`;
export async function run(cmd,args,options={}) {
  try {return (await exec(cmd,args,{timeout:30000,maxBuffer:1024*1024,env:{...process.env,PATH:'/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'},...options})).stdout;}
  catch(e){throw Object.assign(new Error(`${cmd}: ${String(e.stderr||e.message).slice(0,700)}`),{status:500});}
}
export function atomic(path,text,mode=0o600) { if(existsSync(path)&&readFileSync(path,'utf8')===text)return false;const tmp=path+'.new';writeFileSync(tmp,text,{mode});chmodSync(tmp,mode);renameSync(tmp,path); }
function saveServer(s) { database().prepare('INSERT INTO servers VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data').run(s.id,JSON.stringify(s)); }
function firewallFile() { atomic(`${ROOT}/firewall.json`,JSON.stringify(servers())); }
async function firewall() { firewallFile(); await run('/opt/alirezaserver/firewall.py',[]); }
async function portFree(s) {
  await new Promise((resolve,reject)=>{
    const sock=s.proto==='udp'?createSocket('udp4'):createServer();
    sock.once('error',()=>reject(Object.assign(new Error('This port is already occupied; the existing service was not changed.'),{status:409})));
    if(s.proto==='udp') sock.bind(s.port,'0.0.0.0',()=>sock.close(resolve)); else sock.listen(s.port,'0.0.0.0',()=>sock.close(resolve));
  });
}
function ipv4(v){return v.split('.').reduce((n,p)=>(n*256+Number(p))>>>0,0);}
export function overlap(a,b){const[aa,ap]=a.split('/'),[bb,bp]=b.split('/');if(!aa||!bb||ap===undefined||bp===undefined)return false;const p=Math.min(+ap,+bp);if(!p)return false;const mask=(0xffffffff<<(32-p))>>>0;return (ipv4(aa)&mask)===(ipv4(bb)&mask);}
export function freeSubnet(routes,existing){
  const occupied=[...routes.map(r=>r.dst).filter(Boolean),...existing.map(s=>s.subnet)];
  const candidates=[];for(let n=10;n<250;n++)candidates.push(`10.231.${n}.0/24`,`172.27.${n}.0/24`,`192.168.${n}.0/24`);
  const result=candidates.find(net=>!occupied.some(other=>overlap(net,other)));
  if(!result)fail('No non-overlapping private /24 subnet found. Review the server routes.',409);return result;
}
export async function serverDefaults(){
  const list=servers(),routes=JSON.parse(await run('ip',['-j','-4','route','show','table','all']));
  const subnet=freeSubnet(routes,list);let port=1194;
  for(;port<1300;port++){
    if(list.some(s=>s.port===port&&s.proto==='udp'))continue;
    try{await portFree({port,proto:'udp'});break;}catch{}
  }
  if(port===1300)fail('No free UDP port in the suggested range; choose a free port manually.',409);
  return{subnet,dns:subnet.replace('.0/24','.1'),port};
}
async function subnetFree(s,previous) {
  for(const other of servers()) if(other.id!==s.id&&overlap(s.subnet,other.subnet)) fail('Subnet overlaps another OpenVPN server');
  const routes=JSON.parse(await run('ip',['-j','-4','route','show','table','all']));
  for(const r of routes) if(r.dst?.includes('/')&&r.dst!=='0.0.0.0/0'&&!(previous&&r.dev===`az${s.id.slice(0,8)}`)&&overlap(s.subnet,r.dst)) fail(`Subnet overlaps existing route ${r.dst}; choose another /24`);
}
async function certificates(s) {
  const dir=`${ROOT}/openvpn/${s.id}`; mkdirSync(dir,{recursive:true,mode:0o700});
  if(!existsSync(`${dir}/tls-crypt.key`)) {
    await run('openvpn',['--genkey','secret',`${dir}/tls-crypt.key.new`]);
    chmodSync(`${dir}/tls-crypt.key.new`,0o600);renameSync(`${dir}/tls-crypt.key.new`,`${dir}/tls-crypt.key`);
  }
  if(existsSync(`${dir}/server.crt`)&&existsSync(`${dir}/server.key`)&&existsSync(`${dir}/ca.crt`)) return;
  if(existsSync(`${dir}/ca.key`)!==existsSync(`${dir}/ca.crt`))fail('The existing CA is incomplete. Restore its backup before repairing this server; existing client trust was preserved.',409);
  if(!existsSync(`${dir}/ca.crt`)){
    await run('openssl',['ecparam','-name','prime256v1','-genkey','-noout','-out',`${dir}/ca.key`]);
    await run('openssl',['req','-x509','-new','-sha256','-days','3650','-key',`${dir}/ca.key`,'-subj',`/CN=alirezaserver-${s.id}-CA`,'-addext','basicConstraints=critical,CA:TRUE','-addext','keyUsage=critical,keyCertSign,cRLSign','-out',`${dir}/ca.crt`]);
  }
  await run('openssl',['ecparam','-name','prime256v1','-genkey','-noout','-out',`${dir}/server.key`]);
  await run('openssl',['req','-new','-key',`${dir}/server.key`,'-subj',`/CN=alirezaserver-${s.id}`,'-out',`${dir}/server.csr`]);
  atomic(`${dir}/server.ext`,'basicConstraints=critical,CA:FALSE\nkeyUsage=critical,digitalSignature\nextendedKeyUsage=serverAuth\n');
  await run('openssl',['x509','-req','-in',`${dir}/server.csr`,'-CA',`${dir}/ca.crt`,'-CAkey',`${dir}/ca.key`,'-CAcreateserial','-days','825','-sha256','-extfile',`${dir}/server.ext`,'-out',`${dir}/server.crt`]);
  for(const f of ['ca.key','server.key','tls-crypt.key']) chmodSync(`${dir}/${f}`,0o600);
}
export async function save(input,sid) {
  const previous=sid?server(sid):null;
  const s={...validateServer(input),id:previous?.id||randomBytes(6).toString('hex')};
  if(servers().some(o=>o.id!==s.id&&o.port===s.port&&o.proto===s.proto)) fail('Another OpenVPN server uses this port');
  await subnetFree(s,previous);
  if(!previous||previous.port!==s.port||previous.proto!==s.proto||!previous.enabled) await portFree(s);
  await certificates(s);
  const path=`${ROOT}/openvpn/${s.id}/server.conf`, old=existsSync(path)?readFileSync(path,'utf8'):null;
  try {
    atomic(path,serverConfig(s,ROOT)); saveServer(s); await firewall();
    if(s.enabled) {await run('systemctl',['enable',unit(s.id)]);await run('systemctl',['restart',unit(s.id)]);await ready(s);}
    else await run('systemctl',['disable','--now',unit(s.id)]);
    if(!s.enabled) database().prepare('UPDATE sessions SET ended=? WHERE sid=?').run(Math.floor(Date.now()/1000),s.id);
    return s;
  } catch(error) {
    try {
      if(previous){saveServer(previous);atomic(path,old||serverConfig(previous,ROOT));await firewall();await run('systemctl',[previous.enabled?'enable':'disable',unit(s.id)]);await run('systemctl',[previous.enabled?'restart':'stop',unit(s.id)]);}
      else{await run('systemctl',['disable','--now',unit(s.id)]).catch(()=>{});database().prepare('DELETE FROM servers WHERE id=?').run(s.id);await firewall();}
    }catch(rollback){error.message+='; rollback needs attention: '+rollback.message;}
    throw error;
  }
}
export function refreshConfigs(){
  for(const s of servers()){
    const path=`${ROOT}/openvpn/${id(s.id)}/server.conf`;
    mkdirSync(`${ROOT}/openvpn/${s.id}`,{recursive:true,mode:0o700});
    if(existsSync(path)&&!existsSync(path+'.before-0.3'))atomic(path+'.before-0.3',readFileSync(path,'utf8'));
    atomic(path,serverConfig(s,ROOT));
  }
  firewallFile();
}
export async function ready(s) {
  for(let n=0;n<12;n++) {
    await new Promise(r=>setTimeout(r,500));
    try{const out=await management(s.id,'state');if(out.includes('CONNECTED,SUCCESS'))return;}catch{}
  }
  const logs=await run('journalctl',['-u',unit(s.id),'-n','12','--no-pager']).catch(()=> '');
  fail('OpenVPN did not become ready. '+logs.slice(-1600),500);
}
export async function removeServer(sid) {
  server(sid);statusStamps.delete(sid);
  if(database().prepare('SELECT serverIds FROM users').all().some(r=>JSON.parse(r.serverIds).includes(sid))) fail('Remove this server from its users before deleting it');
  await run('systemctl',['disable','--now',unit(sid)]);database().prepare('DELETE FROM servers WHERE id=?').run(sid);
  database().prepare('DELETE FROM sessions WHERE sid=?').run(sid);await firewall();
  // Retain certificates for recovery; deletion never touches Nova files.
}
export function users() { return database().prepare('SELECT id,username,serverIds,enabled,expiry,quota,used,devices FROM users ORDER BY username').all().map(r=>({...r,serverIds:JSON.parse(r.serverIds)})); }
export async function saveUser(input,uid) {
  const previous=uid?database().prepare('SELECT * FROM users WHERE id=?').get(id(uid)):null;
  if(uid&&!previous) fail('User not found',404);
  const u=validateUser(input,servers());
  if(previous&&previous.username!==u.username) fail('Username is immutable; create a new account to rename it');
  if(!previous&&!u.password) fail('Password is required');
  const salt=u.password?randomBytes(16).toString('hex'):previous.salt;
  const digest=u.password?(await hash(u.password,Buffer.from(salt,'hex'),32,{N:16384,r:8,p:1})).toString('hex'):previous.hash;
  const key=previous?.id||randomBytes(6).toString('hex');
  const d=database();d.exec('BEGIN IMMEDIATE');
  try {d.prepare(`INSERT INTO users(id,username,hash,salt,serverIds,enabled,expiry,quota,used,devices) VALUES(?,?,?,?,?,?,?,?,?,?)
    ON CONFLICT(id) DO UPDATE SET hash=excluded.hash,salt=excluded.salt,serverIds=excluded.serverIds,enabled=excluded.enabled,expiry=excluded.expiry,quota=excluded.quota,devices=excluded.devices`).run(key,u.username,digest,salt,JSON.stringify(u.serverIds),+u.enabled,u.expiry,u.quota,previous?.used||0,u.devices);
    if(u.password){const row=d.prepare('SELECT * FROM shares WHERE uid=?').get(key);const token=row?unseal(row.sealed,key).token:newToken();d.prepare('INSERT INTO shares VALUES(?,?,?) ON CONFLICT(uid) DO UPDATE SET token_hash=excluded.token_hash,sealed=excluded.sealed').run(key,token?tokenHash(token):null,seal({token,password:u.password},key));}
    d.exec('COMMIT');
  }catch(e){d.exec('ROLLBACK');if(String(e).includes('UNIQUE'))fail('Username already exists');throw e;}
  if(previous) await disconnect(u.username);
  return {id:key};
}
export async function removeUser(uid){const u=users().find(u=>u.id===id(uid));if(!u)fail('User not found',404);database().prepare('UPDATE users SET enabled=0 WHERE id=?').run(uid);await disconnect(u.username);database().prepare('DELETE FROM shares WHERE uid=?').run(uid);database().prepare('DELETE FROM users WHERE id=?').run(uid);database().prepare('DELETE FROM sessions WHERE name=?').run(u.username);}
export function shareInfo(uid){id(uid);if(!users().some(u=>u.id===uid))fail('User not found',404);const row=database().prepare('SELECT * FROM shares WHERE uid=?').get(uid);if(!row)return{needsPassword:true};const value=unseal(row.sealed,uid);return{token:value.token,needsPassword:false};}
export function rotateShare(uid,revoke=false){id(uid);const row=database().prepare('SELECT * FROM shares WHERE uid=?').get(uid);if(!row)fail('Set a new password for this existing account before creating its subscription.',409);const value=unseal(row.sealed,uid);value.token=revoke?null:newToken();database().prepare('UPDATE shares SET token_hash=?,sealed=? WHERE uid=?').run(value.token?tokenHash(value.token):null,seal(value,uid),uid);return shareInfo(uid);}
export function subscription(token){
  if(!/^[A-Za-z0-9_-]{43}$/.test(token))fail('Subscription unavailable',404);
  const row=database().prepare('SELECT * FROM shares WHERE token_hash=?').get(tokenHash(token));
  const u=row&&database().prepare('SELECT username,enabled,expiry,quota,used,devices,serverIds,id FROM users WHERE id=?').get(row.uid);
  if(!u||!u.enabled||(u.expiry&&u.expiry<=Date.now()/1000)||(u.quota&&u.used>=u.quota))fail('Subscription unavailable or account inactive',404);
  const value=unseal(row.sealed,u.id),allowed=JSON.parse(u.serverIds);return{username:u.username,password:value.password,used:u.used,quota:u.quota,expiry:u.expiry,devices:u.devices,servers:servers().filter(s=>s.enabled&&allowed.includes(s.id)).map(s=>({id:s.id,name:s.name,host:s.host,port:s.port,proto:s.proto}))};
}
export function subscriptionProfile(token,sid){const data=subscription(token);if(!data.servers.some(s=>s.id===sid))fail('Profile not available to this account',404);return profile(sid);}
export async function resetUsage(uid) {const u=users().find(u=>u.id===id(uid));if(!u)fail('User not found',404);await collect();database().prepare('UPDATE users SET used=0 WHERE id=?').run(uid);}
const managementQueues=new Map();
export function management(sid,command) {
  id(sid);
  const current=(managementQueues.get(sid)||Promise.resolve()).catch(()=>{}).then(()=>managementReply(`${ROOT}/openvpn/${sid}/management.sock`,command));
  managementQueues.set(sid,current);
  const cleanup=()=>{if(managementQueues.get(sid)===current)managementQueues.delete(sid);};
  current.then(cleanup,cleanup);return current;
}
export function managementReply(address,command) {
  if(/[\r\n]/.test(command))return Promise.reject(new Error('Invalid management command'));
  return new Promise((resolve,reject)=>{
    const sock=createConnection(address);let data='',sent=false,done=false;
    const finish=(error)=>{if(done)return;done=true;clearTimeout(timer);sock.destroy();error?reject(error):resolve(data);};
    const timer=setTimeout(()=>finish(new Error('OpenVPN management timeout')),5000);
    sock.on('data',b=>{
      data+=b.toString();if(data.length>1024*1024){finish(new Error('Management reply too large'));return;}
      if(!sent){const line=data.indexOf('\n');if(line<0)return;
        if(!data.slice(0,line).startsWith('>INFO:')){finish(new Error('Unexpected management greeting'));return;}
        sent=true;data=data.slice(line+1);sock.write(command+'\n');
      }
      // Wait for the protocol terminator. Sending quit alongside state could
      // close the management session before its buffered answer was delivered.
      if(/(?:^|\n)ERROR:[^\n]*\n/.test(data)){finish(new Error(data.trim()));return;}
      if(/(?:^|\n)(?:END\r?|SUCCESS:[^\n]*)\n/.test(data))finish();
    });
    sock.on('error',finish);sock.on('end',()=>{if(!done)finish(new Error('Incomplete management response'));});
  });
}
async function disconnect(username) {
  const failures=[];
  for(const s of servers().filter(s=>s.enabled)) {
    if(!existsSync(`${ROOT}/openvpn/${s.id}/management.sock`))continue;
    try{await management(s.id,'kill '+username);}catch(e){failures.push(s.name);}
  }
  if(failures.length)fail('Account updated but disconnect failed on: '+failures.join(', '),503);
}
const statusStamps=new Map();
let collecting=null,collectAt=0;
export function collect() {
  if(collecting)return collecting;
  if(Date.now()-collectAt<1000)return Promise.resolve();
  collecting=collectOnce().finally(()=>{collecting=null;collectAt=Date.now();});return collecting;
}
async function collectOnce() {
  try {
    const d=database(); const now=Math.floor(Date.now()/1000);
    for(const s of servers()) {
      let parsed;
      try {parsed=parseStatus(readFileSync(`${ROOT}/openvpn/${s.id}/status.log`,'utf8'));}catch{continue;}
      if(!parsed.stamp||now-parsed.stamp>30||statusStamps.get(s.id)>=parsed.stamp)continue;
      d.exec('BEGIN IMMEDIATE');
      try {
        for(const c of parsed.clients) {
          const old=d.prepare('SELECT * FROM sessions WHERE sid=? AND name=? AND peer=?').get(s.id,c.name,c.remote);
          if(old?.ended>=parsed.stamp)continue;
          // A newly connected peer may reuse the same address/port while the
          // status file still describes its previous session. Wait for a fresh
          // status timestamp so that session's bytes are never billed twice.
          if(old&&!old.ended&&parsed.stamp<=old.connected)continue;
          const same=old && !old.ended && Math.abs(old.connected-c.connected)<=3;
          const delta=Math.max(0,c.received-(same?old.rx:0))+Math.max(0,c.sent-(same?old.tx:0));
          d.prepare('UPDATE users SET used=used+? WHERE username=?').run(delta,c.name);
          d.prepare('INSERT INTO sessions VALUES(?,?,?,?,?,?,?,0) ON CONFLICT(sid,name,peer) DO UPDATE SET connected=excluded.connected,rx=excluded.rx,tx=excluded.tx,seen=excluded.seen,ended=0').run(s.id,c.name,c.remote,c.connected,c.received,c.sent,parsed.stamp);
        }
        d.prepare('UPDATE sessions SET ended=? WHERE sid=? AND seen<? AND connected<? AND ended=0').run(parsed.stamp,s.id,parsed.stamp,parsed.stamp);
        d.exec('COMMIT');statusStamps.set(s.id,parsed.stamp);
      }catch(e){d.exec('ROLLBACK');throw e;}
    }
    const connected=new Set(d.prepare('SELECT DISTINCT name FROM sessions WHERE ended=0').all().map(r=>r.name));
    for(const u of users())if(connected.has(u.username)&&(!u.enabled||(u.expiry&&u.expiry<=now)||(u.quota&&u.used>=u.quota)))await disconnect(u.username).catch(()=>{});
    d.prepare('DELETE FROM sessions WHERE ended>0 AND ended<?').run(now-86400);
  } finally {}
}
let statusPending;
export function status(){if(statusPending)return statusPending;statusPending=statusOnce().finally(()=>statusPending=null);return statusPending;}
async function statusOnce() {
  await collect();const list=servers();
  // One systemctl process per status request, regardless of server count.
  const units=[...list.map(s=>unit(s.id)),'AdGuardHome.service'];
  let out='';try{out=await run('systemctl',['show','--property=Id,ActiveState',...units]);}catch{}
  const states=new Map(String(out||'').trim().split(/\n\n+/).map(block=>{const values=Object.fromEntries(block.split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return[l.slice(0,i),l.slice(i+1)];}));return[values.Id,values.ActiveState||'unknown'];}));
  return {servers:list.map(s=>({...s,status:states.get(unit(s.id))||'unknown'})),users:users(),sessions:database().prepare('SELECT sid,name,peer,connected FROM sessions WHERE ended=0 AND seen>=?').all(Math.floor(Date.now()/1000)-30),adguard:states.get('AdGuardHome.service')||'unknown'};
}
export function accountCredentials(uid){id(uid);const u=users().find(u=>u.id===uid);if(!u)fail('User not found',404);const row=database().prepare('SELECT sealed FROM shares WHERE uid=?').get(uid);if(!row)return{username:u.username,needsPassword:true};return{username:u.username,password:unseal(row.sealed,uid).password,needsPassword:false};}
export async function toggleUser(uid){id(uid);const u=users().find(u=>u.id===uid);if(!u)fail('User not found',404);database().prepare('UPDATE users SET enabled=? WHERE id=?').run(+!u.enabled,uid);if(u.enabled)await disconnect(u.username);return{ok:true,enabled:!u.enabled};}
export function profile(sid){const s=server(sid),dir=`${ROOT}/openvpn/${s.id}`;return clientConfig(s,readFileSync(`${dir}/ca.crt`,'utf8'),readFileSync(`${dir}/tls-crypt.key`,'utf8'));}
export async function logs(sid){server(sid);return run('journalctl',['-u',unit(sid),'-n','80','--no-pager']);}
export async function toggle(sid){const s=server(sid);return save({...s,enabled:!s.enabled},sid);}
let collector;
export function startCollector(){if(collector)return;collector=setInterval(()=>collect().catch(()=>console.error('alirezaserver accounting: failed')),5000);collector.unref();}
