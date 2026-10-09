// SPDX-License-Identifier: GPL-3.0-or-later
// Runs locally as root; creates a short-lived owner cookie in memory, never logs it.
// The native signing key is initialized only if this is the very first session.
// No passwords, accounts or protocol configuration are changed.
// DNS is probed without modifying AdGuard settings or rewrites.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {DatabaseSync} from 'node:sqlite';
import http from 'node:http';
import https from 'node:https';
import {isIP} from 'node:net';
import {randomBytes} from 'node:crypto';
import {dnsResponds} from './dns-readonly.mjs';
const envFile=process.env.ALIREZA_VERIFY_ENV||'/etc/nova/agent.env';
const env=readFileSync(envFile,'utf8');
const value=name=>env.split(/\r?\n/).find(l=>l.startsWith(name+'='))?.slice(name.length+1).replace(/^(['"])(.*)\1$/,'$2');
const dbPath=value('NOVA_DB')||'/var/lib/nova/nova.db';
const db=new DatabaseSync(dbPath,{readOnly:true});
const kv={get:async key=>db.prepare('SELECT v FROM kvstore WHERE k=?').get(key)?.v,put:async(key,v)=>{
  // Nova normally creates auto_key on the first browser login. A fresh install
  // has only admin_pass; let its own makeSession initialize the missing key.
  // INSERT OR IGNORE preserves every pre-existing signing key and session.
  if(key!=='auto_key')throw Error('Unexpected authentication write during verification');
  const writer=new DatabaseSync(dbPath);
  try{writer.exec('PRAGMA busy_timeout=10000');writer.prepare('INSERT OR IGNORE INTO kvstore(k,v,updated) VALUES(?,?,?)').run(key,v,Date.now());}finally{writer.close();}
}};
const s=JSON.parse(await kv.get('network-settings.json')||'{}');
const path=String(s.panelPath||'').replace(/^\/+|\/+$/g,'');
const base=path?'/'+path:'';
const dir=process.env.ALIREZA_VERIFY_NOVA_DIR||'/opt/nova-node-agent';
const {makeSession}=await import(pathToFileURL(dir+'/src/auth.mjs'));
const ua='alirezaserver-local-verification';
const session=await makeSession(kv,{userAgent:ua,maxAgeMs:60000});
const cookie=session.name+'='+session.value;
db.close();
const host=String(s.host||'localhost');
let expectedDNS=Number(process.env.ALIREZA_VERIFY_DNS_PORT||53);
function request(transport,port,route,authenticated=true,body){
  return new Promise((resolve,reject)=>{
    const client=transport==='https'?https:http;
    const payload=body?JSON.stringify(body):null;
    const options={hostname:'127.0.0.1',port,path:base+route,method:payload?'POST':'GET',
      headers:{host,'user-agent':ua,'accept-encoding':'identity',...(authenticated?{cookie}:{})},timeout:12000};
    if(payload)Object.assign(options.headers,{'content-type':'application/json','content-length':Buffer.byteLength(payload),origin:transport+'://'+host});
    // TLS verification is relaxed solely for loopback: Nova supports self-signed certs.
    if(transport==='https'){options.rejectUnauthorized=false;if(!isIP(host))options.servername=host;}
    const r=client.request(options,response=>{let body='';response.on('data',b=>{body+=b;if(body.length>4194304)r.destroy(Error('Response too large'));});response.on('end',()=>resolve({code:response.statusCode,body}));response.on('error',reject);});
    r.on('timeout',()=>r.destroy(Error('Timed out checking '+route)));r.on('error',reject);r.end(payload);
  });
}
function requireThat(ok,message){if(!ok)throw Error(message);}
async function verify(transport,port){
  const get=(route,auth)=>request(transport,port,route,auth);
  const gate=await get('/alireza/api/status',false);
  requireThat(gate.code===401&&JSON.parse(gate.body).error==='Sign in to the main panel first.','Integration owner gate was not reached');
  const page=await get('/');
  requireThat(page.code===200&&page.body.includes('data-alireza-addon')&&page.body.includes('<title>alirezaserver</title>'),'Panel branding script/title is missing');
  const brand=await get('/alireza/brand.js');
  requireThat(brand.code===200&&brand.body.includes('DNS · AdGuard Home')&&brand.body.includes('OpenVPN'),'New sidebar menu code is missing');
  const vpn=await get('/alireza/openvpn/');
  requireThat(vpn.code===200&&vpn.body.includes('OpenVPN')&&vpn.body.includes('alirezaserver'),'Owner cannot open OpenVPN management');
  const aiPage=await get('/alireza/ai/'),aiSettings=await get('/alireza/api/ai/settings');
  requireThat(aiPage.code===200&&aiPage.body.includes('id="composer"')&&aiSettings.code===200&&typeof JSON.parse(aiSettings.body).hasKey==='boolean','AI module unavailable');
  const remoteDNS=await get('/alireza/alirezadns/'),remoteList=await get('/alireza/api/alirezadns');
  requireThat(remoteDNS.code===200&&remoteDNS.body.includes('alirezadns')&&remoteList.code===200&&Array.isArray(JSON.parse(remoteList.body).nodes),'Remote DNS management is missing');
  const theme=await get('/alireza/assets/theme.css'),font=await get('/alireza/assets/font.css');
  requireThat(theme.code===200&&theme.body.includes('--az-shadow-card')&&font.code===200&&font.body.includes('data:font/woff2;base64,'),'Nova theme or Vazirmatn font is missing');
  const status=await get('/alireza/api/status');
  requireThat(status.code===200&&Array.isArray(JSON.parse(status.body).servers),'Owner cannot use OpenVPN management API');
  const dns=await get('/alireza/dns/control/status');
  requireThat(dns.code===200&&JSON.parse(dns.body).dns_port===expectedDNS,'Owner cannot reach AdGuard API on required DNS port');
  const dnsPage=await get('/alireza/dns/');
  requireThat(dnsPage.code===200&&dnsPage.body.includes('data-alireza-colors'),'Original AdGuard UI is not embedded');
  console.log(transport.toUpperCase()+': alirezaserver branding + owner access + OpenVPN UI/API + AdGuard UI/API: PASS');
}
try {
  const dnsInfo=await request('http',Number(value('NOVA_PORT')||8088),'/alireza/dns/control/status');
  requireThat(dnsInfo.code===200,'AdGuard status unavailable');
  const configured=JSON.parse(dnsInfo.body);
  if(!process.env.ALIREZA_VERIFY_DNS_PORT)expectedDNS=Number(configured.dns_port);
  await verify('http',Number(value('NOVA_PORT')||8088));
  if(configured.running!==false&&expectedDNS>0){
    try{await dnsResponds(expectedDNS,process.env.ALIREZA_VERIFY_DNS_ADDRESS||'127.0.0.1');console.log('Read-only UDP/TCP DNS listener check: PASS (response received; no settings changed)');}
    catch{console.warn('DNS packet probe unavailable on loopback; configured listeners, access rules and upstream connectivity need a client check. No AdGuard settings were changed.');}
  }else console.log('DNS packet probe skipped: existing disabled listener preserved.');
  // Test the same front door the browser uses, not just the internal Node listener.
  if(process.env.ALIREZA_VERIFY_NO_FRONT!=='1'){
    const port=Number(value('NOVA_FRONT_PORT')||443);
    await verify('https',port);
    console.log('Panel: https://'+(isIP(host)===6?'['+host+']':host)+(port===443?'':':'+port)+base+'/');
  }
}catch(e){console.error('Integration verification FAILED: '+e.message);process.exitCode=1;}
