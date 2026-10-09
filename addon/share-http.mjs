// SPDX-License-Identifier: GPL-3.0-or-later
import{readFileSync}from'node:fs';import{subscription,subscriptionProfile}from'./backend.mjs';import{fontCSS,themeCSS}from'./theme.mjs';
const limits=new Map();
export function shareHTTP(req,res){
  if(!req.url?.startsWith('/alireza-sub/'))return false;
  const headers={'cache-control':'no-store, private','referrer-policy':'no-referrer','x-content-type-options':'nosniff','x-frame-options':'DENY','content-security-policy':"default-src 'self'; font-src 'self' data:; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'x-robots-tag':'noindex, nofollow, noarchive'};
  const send=(code,body,type='text/plain; charset=utf-8')=>{res.writeHead(code,{...headers,'content-type':type});res.end(req.method==='HEAD'?'':body);};
  try{
    if(!['GET','HEAD'].includes(req.method)){send(405,'Method not allowed');return true;}
    const partToken=req.url.split('/')[2]||'',ip=(req.socket.remoteAddress||'unknown')+'|'+(/^[A-Za-z0-9_-]{43}$/.test(partToken)?partToken:'invalid'),now=Date.now(),bucket=limits.get(ip);
    if(!bucket||now-bucket.at>60000){if(limits.size>=1024)limits.delete(limits.keys().next().value);limits.set(ip,{at:now,n:1});}else if(++bucket.n>180){send(429,'Please retry later');return true;}
    const m=req.url.split('?')[0].match(/^\/alireza-sub\/([A-Za-z0-9_-]{43})(?:\/(.*))?$/);
    if(!m){send(404,'Not found');return true;}
    const data=subscription(m[1]),part=m[2];
    if(part===undefined){res.writeHead(302,{...headers,location:'/alireza-sub/'+m[1]+'/'});res.end();return true;}
    const file=(name,type)=>send(200,readFileSync(new URL(name,import.meta.url)),type);
    if(part==='')file('share.html','text/html; charset=utf-8');
    else if(part==='data')send(200,JSON.stringify(data),'application/json; charset=utf-8');
    else if(part==='font.css')send(200,fontCSS(),'text/css; charset=utf-8');
    else if(part==='theme.css')send(200,themeCSS(),'text/css; charset=utf-8');
    else if(part==='share.css')file(part,'text/css; charset=utf-8');
    else if(['theme.js','share.js'].includes(part))file(part,'text/javascript; charset=utf-8');
    else if(/^profile\/[a-f0-9]{12}\.ovpn$/.test(part)){const sid=part.slice(8,-5);headers['content-disposition']='attachment; filename="alirezaserver-'+sid+'.ovpn"';send(200,subscriptionProfile(m[1],sid),'application/x-openvpn-profile');}
    else send(404,'Not found');
  }catch(e){send(e.status||503,e.status===404?'Subscription unavailable':'Subscription temporarily unavailable');}
  return true;
}
