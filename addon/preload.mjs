// SPDX-License-Identifier: GPL-3.0-or-later
// Loaded only into Nova's existing Node process. Original Nova files are unmodified.
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as backend from './backend.mjs';
import {fontCSS,themeCSS,dnsStatusForPanel} from './theme.mjs';
import {shareHTTP} from './share-http.mjs';
import './update-hook.mjs';
import * as alirezadns from './alirezadns.mjs';
import * as ai from './ai.mjs';
const HERE=dirname(fileURLToPath(import.meta.url));
const previous=http.Server.prototype.emit;
let readonly;
function settings() {
  try {
    readonly ||= new DatabaseSync(process.env.NOVA_DB||'/var/lib/nova/nova.db',{readOnly:true});
    const row=readonly.prepare('SELECT v FROM kvstore WHERE k=?').get('network-settings.json');
    return JSON.parse(row?.v||'{}');
  }catch{return null;}
}
function basePath() {const s=settings();if(!s)return null;const p=String(s.panelPath||'').replace(/^\/+|\/+$/g,'');return p?'/'+p:'';}
export function injectHTML(html,base) {
  if(!html.includes('id="app"')&&!html.includes('id="root"')&&!html.includes('const IC=')) return html;
  if(html.includes('data-alireza-addon'))return html;
  return html.replace(/<title>Nova Server<\/title>/,'<title>alirezaserver</title>').replace('</body>',
    `<script data-alireza-addon src="${base}/alireza/brand.js"></script><script src="${base}/alireza/inbounds/ui.js"></script></body>`);
}
let panelCache;
function panelBuffer(text,base){
  if(panelCache?.base===base&&panelCache.text===text)return panelCache.buffer;
  const result=injectHTML(text,base);const buffer=Buffer.from(result);
  if(text.length<2097152&&text.includes('Vazirmatn')&&text.includes('side-nav'))panelCache={base,text,buffer};
  return buffer;
}
function wrapHTML(req,res) {
  const end=res.end, write=res.write, writeHead=res.writeHead; let wrote=false,pendingHead=null;
  res.writeHead=function(status,reason,headers) {
    const h=(typeof reason==='object'?reason:headers)||{};
    const type=Object.entries(h).find(([k])=>k.toLowerCase()==='content-type')?.[1]||this.getHeader('content-type');
    if(String(type).includes('text/html')) {
      this.statusCode=status;if(typeof reason==='string')this.statusMessage=reason;
      for(const[k,v]of Object.entries(h))this.setHeader(k,v);
      pendingHead=true;return this;
    }
    return writeHead.apply(this,arguments);
  };
  function flushHead(){res.writeHead=writeHead;if(pendingHead){pendingHead=null;writeHead.call(res,res.statusCode);}}
  const flushHeaders=res.flushHeaders;
  res.flushHeaders=function(){wrote=true;flushHead();return flushHeaders.call(this);};
  res.write=function(...args){wrote=true;flushHead();return write.apply(this,args);};
  res.end=function(chunk,...args) {
    try {
      const type=String(this.getHeader('content-type')||'');
      const base=basePath();
      if(base!==null&&!wrote&&!this.headersSent&&!this.getHeader('content-encoding')&&type.includes('text/html')&&chunk) {
        const text=Buffer.isBuffer(chunk)?chunk.toString('utf8'):String(chunk);
        const result=panelBuffer(text,base);
        if(result.length!==Buffer.byteLength(text)){chunk=result;this.removeHeader('etag');this.setHeader('content-length',chunk.length);this.setHeader('cache-control','no-store');}
      }
    }catch(e){console.error('alirezaserver branding:',e.message);}
    flushHead();return end.call(this,chunk,...args);
  };
}
function json(res,status,value) {res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(value));}
function file(res,name,type) {const b=readFileSync(join(HERE,name));res.writeHead(200,{'content-type':type,'cache-control':'no-store','x-content-type-options':'nosniff','x-frame-options':'SAMEORIGIN'});res.end(b);}
async function whoami(req,base) {
  return new Promise((resolve,reject)=>{
    const local=http.request({hostname:'127.0.0.1',port:req.socket.localPort,path:base+'/admin/whoami',method:'GET',
      headers:{host:req.headers.host||'localhost',cookie:req.headers.cookie||'','user-agent':req.headers['user-agent']||'','accept':'application/json'},timeout:5000},response=>{
      let s='';response.on('data',b=>{s+=b;if(s.length>128000)local.destroy(new Error('Invalid auth response'));});
      response.on('end',()=>{try{if(response.statusCode!==200)resolve(null);else resolve(JSON.parse(s));}catch{resolve(null);}});
    });local.on('timeout',()=>local.destroy(new Error('Authentication timed out')));local.on('error',reject);local.end();
  });
}
export function sameOrigin(req) {
  try{const origin=new URL(req.headers.origin);return ['https:','http:'].includes(origin.protocol)&&origin.host===req.headers.host;}catch{return false;}
}
async function body(req) {
  let text='';for await(const part of req){text+=part;if(Buffer.byteLength(text)>131072)throw Object.assign(new Error('Request too large'),{status:413});}
  try{return JSON.parse(text||'{}');}catch{throw Object.assign(new Error('Invalid JSON'),{status:400});}
}
export function redirectLocation(value,prefix) {
  if(value?.startsWith('/')&&!value.startsWith('//'))return prefix+value.slice(1);
  try{const u=new URL(value,'http://127.0.0.1:18085');if(['127.0.0.1','localhost','0.0.0.0','[::1]'].includes(u.hostname))return prefix+u.pathname.replace(/^\//,'')+u.search+u.hash;}catch{}
  return value;
}
function adguard(req,res,path,prefix) {
  // Never forward the Nova session or arbitrary upstream Host/Authorization headers.
  const headers={host:'127.0.0.1:18085','accept-encoding':'identity'};
  for(const key of ['content-type','content-length','accept','user-agent','if-none-match'])if(req.headers[key])headers[key]=req.headers[key];
  const remote=http.request({host:'127.0.0.1',port:18085,path:'/'+path,method:req.method,headers,timeout:120000},response=>{
    const out={...response.headers,'x-frame-options':'SAMEORIGIN','cache-control':'no-store'};
    if(out.location)out.location=redirectLocation(out.location,prefix);
    if(out['set-cookie'])out['set-cookie']=out['set-cookie'].map(c=>c.replace(/Path=\//i,'Path='+prefix));
    if(path.split('?')[0]==='control/status'&&response.statusCode===200){
      let body='';response.on('data',b=>{body+=b;if(body.length>131072)remote.destroy(new Error('Upstream status too large'));});
      response.on('end',()=>{if(res.destroyed||res.writableEnded)return;try{
        const status=JSON.parse(body);const publicHost=String(settings()?.host||new URL('http://'+req.headers.host).hostname);
        const result=JSON.stringify(dnsStatusForPanel(status,publicHost));delete out['content-length'];delete out.etag;res.writeHead(200,out);res.end(result);
      }catch{json(res,502,{error:'Invalid AdGuard status response'});}});
    }else if(String(out['content-type']).includes('text/html')) {
      let chunks=[],size=0;response.on('data',b=>{size+=b.length;if(size>4194304)remote.destroy(new Error('Upstream page too large'));else chunks.push(b);});
      response.on('end',()=>{if(res.destroyed||res.writableEnded)return;let content=Buffer.concat(chunks).toString('utf8');
        const assets=prefix.replace(/dns\/$/,'')+'assets/';
        content=content.replace('</head>',`<link data-alireza-colors rel="stylesheet" href="${assets}font.css"><link rel="stylesheet" href="${assets}theme.css"><script src="${assets}theme.js" data-surface="dns"></script></head>`);
        delete out['content-length'];delete out.etag;res.writeHead(response.statusCode||502,out);res.end(content);
      });
    }else {res.writeHead(response.statusCode||502,out);response.pipe(res);}
    response.on('error',()=>res.destroy());
  });
  remote.on('timeout',()=>remote.destroy(new Error('AdGuard request timed out')));
  remote.on('error',e=>{if(!res.headersSent)json(res,502,{error:'AdGuard is unavailable: '+e.message});else res.destroy();});
  req.on('aborted',()=>remote.destroy());res.on('close',()=>remote.destroy());req.pipe(remote);
}
let queue=Promise.resolve(),pending=0;
function serialized(action) {
  if(pending>=10)throw Object.assign(new Error('Another operation is running; retry shortly'),{status:429});
  pending++;const result=queue.then(action);queue=result.catch(()=>{}).finally(()=>pending--);return result;
}
async function handle(req,res,base,tail) {
  // Public static UI code only; all account/service APIs still require native owner auth.
  if(tail==='inbounds/ui.js'&&req.method==='GET'){file(res,'inbounds-ui.js','text/javascript; charset=utf-8');return;}
  if(tail==='brand.js'&&req.method==='GET'){file(res,'brand.js','text/javascript; charset=utf-8');return;}
  const auth=await whoami(req,base);
  if(!auth){json(res,401,{error:'Sign in to the main panel first.'});return;}
  const aiRoute=tail==='ai/'||tail==='ai/ui.js'||tail.startsWith('api/ai/');
  if(aiRoute){
    ai.identity(auth);
    if(!['GET','HEAD'].includes(req.method)&&!sameOrigin(req)){json(res,403,{error:'Same-origin request required'});return;}
    if(tail==='ai/'&&req.method==='GET'){file(res,'ai.html','text/html; charset=utf-8');return;}
    if(tail==='ai/ui.js'&&req.method==='GET'){file(res,'ai-ui.js','text/javascript; charset=utf-8');return;}
    const path=tail.slice(7);
    if(path==='settings'&&req.method==='GET'){json(res,200,ai.settings(auth));return;}
    if(path==='settings'&&req.method==='PUT'){json(res,200,ai.configure(auth,await body(req)));return;}
    if(path==='models'&&req.method==='GET'){json(res,200,await ai.models(auth));return;}
    if(path==='chats'&&req.method==='GET'){json(res,200,ai.chats(auth));return;}
    const chat=path.match(/^chats\/([a-f0-9]{24})(?:\/before\/(\d{1,9}))?$/);
    if(chat&&req.method==='GET'){json(res,200,ai.chat(auth,chat[1],chat[2]));return;}
    if(chat&&!chat[2]&&req.method==='DELETE'){json(res,200,ai.remove(auth,chat[1]));return;}
    if(path==='stop'&&req.method==='POST'){json(res,200,ai.stop(auth));return;}
    if(path==='generate'&&req.method==='POST'){await ai.generate(auth,await body(req),res);return;}
    if(path==='summary'&&req.method==='GET'&&auth.role==='owner'){json(res,200,ai.sanitizedSummary(await backend.status()));return;}
    json(res,404,{error:'Not found'});return;
  }
  // Shared extension assets contain no account data and are available to signed-in AI users.
  if(['assets/font.css','assets/theme.css','assets/theme.js','assets/extension.css'].includes(tail)&&req.method==='GET'){
    if(tail==='assets/font.css'){res.writeHead(200,{'content-type':'text/css; charset=utf-8','cache-control':'private, max-age=86400'});res.end(fontCSS());}
    else if(tail==='assets/theme.css'){res.writeHead(200,{'content-type':'text/css; charset=utf-8','cache-control':'private, max-age=300'});res.end(themeCSS());}
    else file(res,tail.endsWith('extension.css')?'extension.css':'theme.js',tail.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8');return;
  }
  if(auth.role!=='owner'){json(res,403,{error:'These services are available to the panel owner.'});return;}
  if(!['GET','HEAD'].includes(req.method)&&!sameOrigin(req)){json(res,403,{error:'Same-origin request required'});return;}
  if(tail==='alirezadns/'&&req.method==='GET'){file(res,'alirezadns.html','text/html; charset=utf-8');return;}
  if(tail==='alirezadns/ui.js'&&req.method==='GET'){file(res,'alirezadns-ui.js','text/javascript; charset=utf-8');return;}
  if(tail==='api/alirezadns'&&req.method==='GET'){json(res,200,alirezadns.list());return;}
  if(tail==='api/alirezadns/probe'&&req.method==='POST'){json(res,200,await alirezadns.probe(await body(req)));return;}
  if(tail==='api/alirezadns/preflight'&&req.method==='POST'){json(res,200,await alirezadns.preflight(await body(req)));return;}
  if(tail==='api/alirezadns/install'&&req.method==='POST'){json(res,202,alirezadns.install(await body(req)));return;}
  const dnsNode=tail.match(/^api\/alirezadns\/([a-f0-9]{12})\/(credentials|connection|health)$/);
  if(dnsNode){if(dnsNode[2]==='health'&&req.method==='GET'){json(res,200,await alirezadns.health(dnsNode[1]));return;}if(dnsNode[2]==='credentials'&&req.method==='GET'){json(res,200,alirezadns.credentials(dnsNode[1]));return;}if(dnsNode[2]==='connection'&&req.method==='PUT'){json(res,200,alirezadns.reconnect(dnsNode[1],await body(req)));return;}}
  const dnsProxy=tail.match(/^alirezadns\/node\/([a-f0-9]{12})\/(.*)$/);
  if(dnsProxy){alirezadns.proxy(req,res,alirezadns.node(dnsProxy[1]),dnsProxy[2],base+'/alireza/alirezadns/node/'+dnsProxy[1]);return;}
  if(tail==='assets/font.css'&&req.method==='GET'){res.writeHead(200,{'content-type':'text/css; charset=utf-8','cache-control':'private, max-age=86400'});res.end(fontCSS());return;}
  if(tail==='assets/theme.css'&&req.method==='GET'){res.writeHead(200,{'content-type':'text/css; charset=utf-8','cache-control':'no-store'});res.end(themeCSS());return;}
  if(tail==='assets/theme.js'&&req.method==='GET'){file(res,'theme.js','text/javascript; charset=utf-8');return;}
  if(tail==='api/server-defaults'&&req.method==='GET'){json(res,200,await backend.serverDefaults());return;}
  const account=tail.match(/^api\/users\/([a-f0-9]{12})\/(credentials|toggle)$/);
  if(account&&req.method==='GET'&&account[2]==='credentials'){json(res,200,backend.accountCredentials(account[1]));return;}
  if(account&&req.method==='POST'&&account[2]==='toggle'){json(res,200,await serialized(()=>backend.toggleUser(account[1])));return;}
  const share=tail.match(/^api\/users\/([a-f0-9]{12})\/share(?:\/(rotate|revoke))?$/);
  if(share){
    if(req.method==='GET'&&!share[2]){json(res,200,backend.shareInfo(share[1]));return;}
    if(req.method==='POST'&&share[2]){json(res,200,await serialized(()=>backend.rotateShare(share[1],share[2]==='revoke')));return;}
    json(res,405,{error:'Method not allowed'});return;
  }
  if(tail==='openvpn/ui.js'&&req.method==='GET'){file(res,'openvpn-ui.js','text/javascript; charset=utf-8');return;}
  if(tail==='openvpn/'&&req.method==='GET'){file(res,'openvpn.html','text/html; charset=utf-8');return;}
  if(tail.startsWith('dns/')){adguard(req,res,tail.slice(4),base+'/alireza/dns/');return;}
  if(tail==='api/status'&&req.method==='GET'){json(res,200,await backend.status());return;}
  const match=tail.match(/^api\/(servers|users)(?:\/([a-f0-9]{12}))?(?:\/(profile|logs|toggle|reset))?$/);
  if(!match){json(res,404,{error:'Not found'});return;}
  const[,kind,key,operation]=match;
  if(kind==='servers'&&key&&operation==='profile'&&req.method==='GET') {
    res.writeHead(200,{'content-type':'application/x-openvpn-profile','content-disposition':`attachment; filename="alirezaserver-${key}.ovpn"`,'cache-control':'no-store'});res.end(backend.profile(key));return;
  }
  if(kind==='servers'&&key&&operation==='logs'&&req.method==='GET'){json(res,200,{logs:await backend.logs(key)});return;}
  if(!['POST','PUT','DELETE'].includes(req.method)){json(res,405,{error:'Method not allowed'});return;}
  const data=await body(req);
  const result=await serialized(async()=>{
    if(req.method==='DELETE'&&key&&!operation)return kind==='servers'?backend.removeServer(key):backend.removeUser(key);
    if(req.method==='POST'&&operation==='toggle'&&key&&kind==='servers')return backend.toggle(key);
    if(req.method==='POST'&&operation==='reset'&&key&&kind==='users')return backend.resetUsage(key);
    if(!operation&&((req.method==='POST'&&!key)||(req.method==='PUT'&&key)))return kind==='servers'?backend.save(data,key):backend.saveUser(data,key);
    throw Object.assign(new Error('Invalid operation'),{status:400});
  });json(res,200,{ok:true,result});
}
if(process.env.ALIREZA_NO_HOOK!=='1') {
  http.Server.prototype.emit=function(event,...args) {
    if(event!=='request')return previous.call(this,event,...args);
    const[req,res]=args;if(shareHTTP(req,res))return true;const base=basePath();
    if(base!==null&&req.url?.startsWith(base+'/alireza/')) {
      // Reject ambiguous URL spellings instead of passing them to another handler.
      const tail=req.url.slice((base+'/alireza/').length);
      if(/[\\\x00-\x20]/.test(tail)||/%2f|%5c|%2e/i.test(tail)||tail.split('?')[0].split('/').includes('..')){json(res,400,{error:'Invalid path'});return true;}
      handle(req,res,base,tail.split('?')[0]).catch(e=>{console.error('alirezaserver:',e.message);if(!res.headersSent)json(res,e.status||500,{error:e.code||e.message,code:e.code});else res.destroy();});return true;
    }
    wrapHTML(req,res);return previous.call(this,event,...args);
  };
  backend.startCollector();
}
