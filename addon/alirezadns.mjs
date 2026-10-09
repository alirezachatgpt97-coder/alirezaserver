// SPDX-License-Identifier: GPL-3.0-or-later
import{readFileSync,writeFileSync,mkdirSync,renameSync}from'node:fs';
import{randomBytes}from'node:crypto';import{spawn}from'node:child_process';import{isIP}from'node:net';import https from'node:https';import{fileURLToPath}from'node:url';
import{resolve4}from'node:dns/promises';
import{seal,unseal}from'./vault.mjs';
const root=process.env.ALIREZA_ROOT||'/var/lib/alirezaserver',file=root+'/alirezadns.json',jobs=new Map();
const journal=root+'/alirezadns-jobs.json';
function persistJobs(){mkdirSync(root,{recursive:true,mode:0o700});writeFileSync(journal+'.new',JSON.stringify([...jobs.values()].slice(-100)),{mode:0o600});renameSync(journal+'.new',journal);}
try{for(const j of JSON.parse(readFileSync(journal,'utf8'))){if(j.status==='installing'){j.status='interrupted';j.error='Panel restarted; check destination health or reconnect to resume.';}jobs.set(j.id,j);}}catch(e){if(e.code!=='ENOENT')throw e;}
const fail=(s,status=400)=>{throw Object.assign(Error(s),{status});};
function records(){try{return JSON.parse(readFileSync(file,'utf8'));}catch(e){if(e.code==='ENOENT')return [];throw e;}}
function save(rows){mkdirSync(root,{recursive:true,mode:0o700});writeFileSync(file+'.new',JSON.stringify(rows),{mode:0o600});renameSync(file+'.new',file);}
export function validate(input){
 const host=String(input.host||'').trim(),domain=String(input.domain||'').trim().toLowerCase(),sshPort=Number(input.sshPort||22);
 if((isIP(host)!==4&&!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i.test(host))||/^(127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host))fail('IP عمومی سرور مقصد را وارد کنید.');
 if(!Number.isInteger(sshPort)||sshPort<1||sshPort>65535)fail('پورت SSH نامعتبر است.');
 if(input.action!=='probe'&&(!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)))fail('دامنه معتبر متصل به سرور مقصد لازم است.');
 if(String(input.password||'').length>4096||String(input.privateKey||'').length>32768||String(input.email||'').length>254)fail('اطلاعات بیش از حد طولانی است.');
 const username=String(input.username||'root');if(!/^[a-z_][a-z0-9_-]{0,31}$/.test(username))fail('Invalid SSH username');
 if(String(input.passphrase||'').length>4096)fail('Passphrase too long');
 return {...input,host,domain,sshPort,username};
}
let activeWorkers=0;
export function worker(cfg,onProgress=()=>{}){if(activeWorkers>=3)return Promise.reject(Object.assign(Error("SSH operations are busy; retry shortly."),{status:429}));activeWorkers++;return new Promise((resolve,reject)=>{
 const p=spawn(process.env.ALIREZA_PYTHON||'python3',[fileURLToPath(new URL('alirezadns-ssh.py',import.meta.url))],{stdio:['pipe','pipe','pipe'],windowsHide:true});let out='';
 const timer=setTimeout(()=>{p.kill();reject(Error('زمان عملیات تمام شد؛ دوباره برای ادامه نصب متصل شوید.'));},1900000);timer.unref();
 let pending='';p.stdout.on('data',b=>{out+=b;pending+=b;let i;while((i=pending.indexOf('\n'))>=0){const line=pending.slice(0,i);pending=pending.slice(i+1);try{const event=JSON.parse(line);if(event.progress)onProgress(event.progress);}catch{}}if(out.length>1048576)p.kill();});p.stderr.on('data',()=>{});
 p.on('error',e=>{clearTimeout(timer);reject(e);});p.on('close',code=>{clearTimeout(timer);try{const r=JSON.parse(out.trim().split(/\r?\n/).at(-1));if(code||!r.ok)reject(Error(r.error||'نصب مقصد ناموفق بود.'));else resolve(r);}catch{reject(Error('پاسخ معتبر از نصب‌کننده SSH دریافت نشد؛ پیش‌نیاز python3-paramiko را بررسی کنید.'));}});
 p.stdin.on('error',()=>{});p.stdin.end(JSON.stringify(cfg));
}).finally(()=>activeWorkers--);}
const probes=new Map();
export async function probe(input){
 if([...jobs.values()].filter(j=>j.status==='installing').length>=3)fail('Finish current installations first',429);
 const cfg=validate({...input,action:'probe'}),sourceHost=cfg.host;
 if(isIP(cfg.host)!==4){const ips=await resolve4(cfg.host);cfg.host=ips[0];validate({...cfg,action:'probe'});}
 const r=await worker(cfg),token=randomBytes(24).toString('hex');if(probes.size>32)probes.delete(probes.keys().next().value);
 probes.set(token,{host:cfg.host,sourceHost,sshPort:cfg.sshPort,username:cfg.username,fingerprint:r.fingerprint,at:Date.now()});return{...r,host:cfg.host,token};
}
function verified(input,action){const cfg=validate({...input,action}),proof=probes.get(cfg.probeToken);if(!proof||Date.now()-proof.at>300000||proof.sourceHost!==cfg.host||proof.sshPort!==cfg.sshPort||proof.username!==cfg.username)fail('Review and confirm the SSH fingerprint again.');cfg.host=proof.host;cfg.fingerprint=proof.fingerprint;return{cfg,proof};}
export async function preflight(input){const{cfg,proof}=verified(input,'preflight');const result=await worker(cfg);proof.preflight=cfg.domain;return result;}
export function install(input){
 const{cfg,proof}=verified(input,'install');if(proof.preflight!==cfg.domain)fail('Check authentication and prerequisites before installation.');
 if(!cfg.password&&!cfg.privateKey)fail('رمز root یا کلید خصوصی SSH لازم است.');
 if([...jobs.values()].filter(j=>j.status==='installing').length>=3||[...jobs.values()].some(j=>j.host===cfg.host&&j.status==='installing'))fail('نصب دیگری در حال اجراست.',409);
 probes.delete(cfg.probeToken);cfg.fingerprint=proof.fingerprint;
 const existing=records().find(r=>r.host===cfg.host),id=existing?.id||randomBytes(6).toString('hex');
 const job={id,host:cfg.host,domain:cfg.domain,status:'installing',started:Date.now()};jobs.set(id,job);persistJobs();
 worker(cfg,stage=>{if(/^[a-z-]{1,40}$/.test(stage)){job.stage=stage;persistJobs();}}).then(result=>{const data=result.node;if(data.host!==cfg.host||data.domain!==cfg.domain||!/^[a-f0-9]{16}$/.test(data.adminPath)||!Number.isInteger(data.port)||data.port<1||data.port>65535)throw Error('اطلاعات مقصد معتبر نیست.');const rows=records().filter(r=>r.id!==id);rows.push({id,host:cfg.host,domain:cfg.domain,adminPath:data.adminPath,port:data.port,version:data.version,sshPort:cfg.sshPort,username:cfg.username,sealed:seal({username:data.username,password:data.password},'alirezadns:'+id)});save(rows);job.status='ready';}).catch(e=>{job.status='failed';job.error=e.message;}).finally(()=>{job.finished=Date.now();persistJobs();if(jobs.size>100){for(const [key,j]of jobs){if(j.status!=='installing'&&key!==id){jobs.delete(key);break;}}persistJobs();}});return job;
}
export function list(){return {nodes:records().map(({sealed,...r})=>r),jobs:[...jobs.values()]};}
export function node(id){if(!/^[a-f0-9]{12}$/.test(id))fail('Invalid node');const n=records().find(r=>r.id===id);if(!n)fail('Node not found',404);return n;}
export function credentials(id){const n=node(id);return unseal(n.sealed,'alirezadns:'+id);}
export function reconnect(id,input){const n=node(id),v=validate({...input,host:n.host});if(!/^[a-f0-9]{16}$/.test(input.adminPath))fail('مسیر مدیریت باید ۱۶ حرف hexadecimal باشد.');const port=Number(input.port||8080);if(!Number.isInteger(port)||port<1||port>65535)fail('پورت نامعتبر');save(records().map(r=>r.id===id?{...r,domain:v.domain,port,adminPath:input.adminPath}:r));return {ok:true};}
const healthPending=new Map();
export function health(id){if(healthPending.has(id))return healthPending.get(id);const n=node(id);const task=new Promise(resolve=>{
 const r=https.get({hostname:n.domain,servername:n.domain,port:n.port,path:'/'+n.adminPath+'/dash/login',lookup:(_h,o,cb)=>cb(null,o?.all?[{address:n.host,family:4}]:n.host,4),timeout:10000},response=>{let size=0,text='';response.on('data',b=>{size+=b.length;if(size>8*1024*1024)r.destroy();else text+=b;});response.on('end',()=>resolve({ok:response.statusCode===200&&text.includes('/api/auth/login'),checked:Date.now(),version:n.version,versionSource:'last enrollment',panelURL:'https://'+n.domain+':'+n.port+'/'+n.adminPath+'/dash/login'}));});r.on('timeout',()=>r.destroy());r.on('error',()=>resolve({ok:false,checked:Date.now(),error:'HTTPS unavailable; check network, certificate and destination port.'}));
 }).finally(()=>healthPending.delete(id));healthPending.set(id,task);return task;}
export function rewrite(text,type,mount,n){
 const admin='/'+n.adminPath,origin='https://'+n.domain+':'+n.port;
 if(type.includes('text/html')){
  text=text.replace(/\b(src|href|action)=(['"])\/(?!\/)([^'"]*)\2/g,(_,a,q,p)=>a+'='+q+mount+'/'+p+q);
  text=text.replace(new RegExp('([\'\"])'+admin+'(?=[/\'\"])','g'),(_,q)=>q+mount+admin);
  text=text.replace('</head>',`<script src="${mount}/__brand.js"></script></head>`);
 }
 if(type.includes('javascript')||type.includes('text/html')){
  text=text.replaceAll('hyperdns_token','alirezadns_token_'+n.id);
  text=text.replace(/const ADMIN_BASE = \(function \(\) \{[\s\S]*?\}\)\(\);/,`const ADMIN_BASE = ${JSON.stringify(mount)} + '/' + window.location.pathname.slice(${mount.length+1}).split('/')[0];`);
  text=text.replace("var BASE = m ? '/' + m[1] : ADMIN_BASE;",'var BASE = ADMIN_BASE;');
  text=text.replace('`${window.location.origin}/${newPath}/dash/login`','`${window.location.origin}'+mount+'/${newPath}/dash/login`');
  text=text.replaceAll('currentConfig?.subscription_origin || window.location.origin','currentConfig?.subscription_origin || '+JSON.stringify(origin));
 }
 return text;
}
export function proxy(req,res,n,path,mount){
 if(path==='__brand.js'){res.writeHead(200,{'content-type':'text/javascript; charset=utf-8','cache-control':'no-store'});res.end(readFileSync(new URL('alirezadns-brand.js',import.meta.url)));return;}
 if(!path){res.writeHead(302,{location:mount+'/'+n.adminPath+'/dash/login','cache-control':'no-store'});res.end();return;}
 const headers={host:n.domain+':'+n.port,'accept-encoding':'identity'};
 for(const key of ['content-type','content-length','accept','authorization','x-api-key','user-agent','last-event-id'])if(req.headers[key])headers[key]=req.headers[key];
 if(req.headers.origin)headers.origin='https://'+headers.host;
 const remote=https.request({hostname:n.domain,servername:n.domain,port:n.port,lookup:(_host,options,cb)=>cb(null,options?.all?[{address:n.host,family:4}]:n.host,4),path:'/'+path,method:req.method,headers,timeout:120000},response=>{
  const out={...response.headers,'cache-control':'no-store','x-frame-options':'SAMEORIGIN','referrer-policy':'no-referrer'};
  delete out['set-cookie'];delete out['strict-transport-security'];delete out.etag;delete out['content-length'];
  if(out['content-security-policy'])out['content-security-policy']=out['content-security-policy'].replace(/frame-ancestors[^;]*/g,"frame-ancestors 'self'");
  if(out.location){try{const u=new URL(out.location,'https://'+n.domain+':'+n.port);if(u.hostname===n.domain)out.location=mount+u.pathname+u.search+u.hash;else throw Error();}catch{res.writeHead(502);res.end('Unexpected redirect');response.resume();return;}}
  const type=String(out['content-type']||'');
  if(req.method==='POST'&&path.split('?')[0]===n.adminPath+'/api/settings/regenerate-admin-path'&&response.statusCode===200){
   let chunks=[],size=0;response.on('data',b=>{size+=b.length;if(size>131072)remote.destroy(Error('Unexpected settings response'));else chunks.push(b);});
   response.on('end',()=>{if(res.writableEnded||res.destroyed)return;try{const data=Buffer.concat(chunks);const value=JSON.parse(data);if(!/^[a-f0-9]{16}$/.test(value.admin_path))throw Error('Invalid admin path');save(records().map(r=>r.id===n.id?{...r,adminPath:value.admin_path}:r));res.writeHead(200,out);res.end(data);}catch{res.writeHead(502);res.end('Reconnect using the new admin path');}});
  }else
  if(/text\/html|javascript/.test(type)){
   let chunks=[],size=0;response.on('data',b=>{size+=b.length;if(size>10*1024*1024)remote.destroy(Error('Page too large'));else chunks.push(b);});
   response.on('end',()=>{if(res.writableEnded||res.destroyed)return;try{const result=rewrite(Buffer.concat(chunks).toString('utf8'),type,mount,n);res.writeHead(response.statusCode||502,out);res.end(result);}catch{res.writeHead(502);res.end('Incompatible remote panel');}});
  }else{res.writeHead(response.statusCode||502,out);response.pipe(res);}
  response.on('error',()=>res.destroy());
 });
 remote.on('timeout',()=>remote.destroy(Error('Remote timeout')));remote.on('error',()=>{if(!res.headersSent){res.writeHead(502,{'content-type':'text/plain; charset=utf-8'});res.end('اتصال امن به alirezadns برقرار نشد؛ دامنه، گواهی و پورت مقصد را بررسی کنید.');}else res.destroy();});
 req.on('aborted',()=>remote.destroy());res.on('close',()=>remote.destroy());req.pipe(remote);
}
