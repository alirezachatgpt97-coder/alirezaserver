// SPDX-License-Identifier: GPL-3.0-or-later
// Reuse the installed Nova font without changing or copying its original files.
import{readFileSync}from'node:fs';
import{isIP}from'node:net';
let themeCached;
export function themeCSS(){
  if(themeCached)return themeCached;
  const panel=readFileSync(process.env.ALIREZA_NOVA_PANEL||'/opt/nova-node-agent/src/web/panel.html','utf8');
  const blocks=[...panel.matchAll(/(:root|html\[data-theme="light"\])\s*\{([^}]+)\}/g)];
  const declarations=body=>[...body.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)].map(m=>(m[1]+':'+m[2]+';').replace(/--(?!az-)/g,'--az-')).join('');
  const dark=blocks.find(m=>m[1]===':root'),light=blocks.find(m=>m[1].includes('light'));
  if(!dark||!light)throw Error('Nova theme contract changed; update requires compatibility review');
  return themeCached=readFileSync(new URL('theme.css',import.meta.url),'utf8')+'\n:root{'+declarations(dark[2])+'}\nhtml[data-az-theme="light"]{'+declarations(light[2])+'}\n';
}
let cached;
export function fontCSS(){
  if(cached)return cached;
  const panel=readFileSync(process.env.ALIREZA_NOVA_PANEL||'/opt/nova-node-agent/src/web/panel.html','utf8');
  const face=[...panel.matchAll(/@font-face\s*\{[^}]+\}/g)].map(m=>m[0]).find(s=>/Vazirmatn/.test(s)&&/data:font\/woff2;base64,/.test(s));
  if(!face)throw Error('The installed Nova Vazirmatn font was not found');
  return cached=face+'\n';
}
export function dnsStatusForPanel(status,publicHost){
  const result={...status};
  const usable=a=>typeof a==='string'&&a!=='::1'&&!a.startsWith('127.')&&a!=='0.0.0.0'&&a!=='::';
  const addresses=(Array.isArray(status.dns_addresses)?status.dns_addresses:[]).filter(usable);
  // This field is only an advertised address for the UI; listeners remain real.
  // DNS listeners in this integration are IPv4. A panel domain may point to a
  // CDN or IPv6-only proxy, so it must not be advertised as a DNS listener.
  if(isIP(publicHost||'')===4&&usable(publicHost))addresses.unshift(publicHost);
  result.dns_addresses=[...new Set(addresses)];return result;
}
