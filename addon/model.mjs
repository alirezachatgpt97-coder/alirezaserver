// SPDX-License-Identifier: GPL-3.0-or-later
// OpenVPN profile/configuration conventions adapted from Sir-MmD/vpn-ui,
// web/service/openvpn.go (8044e0ad45c60149439546ea0fd99371a4d3c03d).
// This adapter does not copy or install the other vpn-ui protocol backends.
import { isIP } from 'node:net';
export const CIPHERS = ['AES-256-GCM', 'AES-128-GCM', 'CHACHA20-POLY1305', 'AES-256-CBC', 'AES-128-CBC'];
export function fail(message, status = 400) { throw Object.assign(new Error(message), { status }); }
export function id(value) { if (!/^[a-f0-9]{12}$/.test(String(value))) fail('Invalid ID'); return value; }
export function host(value) {
  const s = String(value || '').trim().replace(/^\[|\]$/g, '');
  if (!isIP(s) && !/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(s)) fail('Enter a valid server hostname or IP');
  return s;
}
export function integer(v, min, max, name) { const n=Number(v); if (!Number.isSafeInteger(n)||n<min||n>max) fail('Invalid '+name); return n; }
export function subnet(value) {
  const s=String(value||''); const m=s.match(/^(10|172|192)\.(\d+)\.(\d+)\.0\/24$/);
  if (!m || !isIP(s.split('/')[0]) || (m[1]==='172' && (+m[2]<16||+m[2]>31)) || (m[1]==='192' && +m[2]!==168)) fail('Use a private IPv4 /24 subnet, e.g. 10.231.10.0/24');
  return s;
}
export function validateServer(input) {
  const name=String(input.name||'').trim(); if (!name || name.length>80 || /[\r\n\x00-\x1f]/.test(name)) fail('Invalid name');
  const proto=String(input.proto||'udp'); if (!['udp','tcp'].includes(proto)) fail('Invalid transport');
  const dns=String(input.dns||'').trim(); if (isIP(dns)!==4) fail('DNS must be an IPv4 address');
  const ciphers=Array.isArray(input.ciphers)?[...new Set(input.ciphers)]:CIPHERS.slice(0,3);
  if (!ciphers.length || ciphers.some(c=>!CIPHERS.includes(c))) fail('Unsupported cipher');
  return { name, proto, port:integer(input.port,1024,65535,'port'), host:host(input.host), subnet:subnet(input.subnet), dns,
    mtu:integer(input.mtu??1500,1280,1500,'MTU'), maxClients:integer(input.maxClients??100,1,1000,'maximum clients'),
    ciphers, tlsCrypt:input.tlsCrypt!==false, clientToClient:input.clientToClient===true, enabled:input.enabled!==false };
}
export function validateUser(input, servers) {
  const username=String(input.username||'').trim(); if (!/^[a-zA-Z0-9_.@-]{1,64}$/.test(username)) fail('Username: use 1–64 letters, digits, _, ., @ or -');
  const password=String(input.password||''); if (password && (password.length<12 || password.length>128 || /[\r\n\0]/.test(password))) fail('Password must contain 12–128 characters');
  if (!Array.isArray(input.serverIds)||!input.serverIds.length||input.serverIds.some(v=>!servers.some(s=>s.id===v))) fail('Select at least one OpenVPN server');
  const expiry=input.expiry?Date.parse(input.expiry):0; if (!Number.isFinite(expiry)) fail('Invalid expiry');
  const quotaGB=Number(input.quotaGB||0); if (!Number.isFinite(quotaGB)||quotaGB<0||quotaGB>1000000) fail('Invalid traffic quota');
  return { username,password,serverIds:[...new Set(input.serverIds)], enabled:input.enabled!==false,
    expiry:Math.floor(expiry/1000), quota:Math.floor(quotaGB*1e9), devices:integer(input.devices??1,1,64,'device limit') };
}
export function serverConfig(s, root='/var/lib/alirezaserver') {
  id(s.id); const dir=`${root}/openvpn/${s.id}`; const cbc=s.ciphers.find(c=>c.endsWith('-CBC'));
  return [
    `port ${s.port}`,`proto ${s.proto==='tcp'?'tcp-server':'udp'}`,`dev az${s.id.slice(0,8)}`,'dev-type tun','topology subnet',
    `server ${s.subnet.split('/')[0]} 255.255.255.0`,
    // Block IPv6 on the client without requiring IPv6 on the VPS tunnel device.
    // OpenVPN's documented IPv4-only recipe works when host IPv6 is disabled.
    'push "ifconfig-ipv6 fd15:53b6:dead::2/64 fd15:53b6:dead::1"',
    'push "redirect-gateway def1 ipv6"','push "block-ipv6"','block-ipv6',`push "dhcp-option DNS ${s.dns}"`,
    `tun-mtu ${s.mtu}`,`mssfix ${Math.min(1400,s.mtu)}`,`max-clients ${s.maxClients}`,
    `ca ${dir}/ca.crt`,`cert ${dir}/server.crt`,`key ${dir}/server.key`,s.tlsCrypt?`tls-crypt ${dir}/tls-crypt.key`:'',
    'dh none','tls-version-min 1.2',`data-ciphers ${s.ciphers.join(':')}`,cbc?`data-ciphers-fallback ${cbc}`:'',
    'auth SHA256','verify-client-cert none','username-as-common-name','duplicate-cn','script-security 2',
    `auth-user-pass-verify "/opt/alirezaserver/auth.py auth ${s.id}" via-file`,
    `client-connect "/opt/alirezaserver/auth.py connect ${s.id}"`,
    `client-disconnect "/opt/alirezaserver/auth.py disconnect ${s.id}"`,
    'keepalive 10 120','persist-key','persist-tun',`status ${dir}/status.log 5`,'status-version 3',
    `management ${dir}/management.sock unix`,`writepid ${dir}/openvpn.pid`,'verb 3',
    s.proto==='udp'?'explicit-exit-notify 1':'',s.clientToClient?'client-to-client':''
  ].filter(Boolean).join('\n')+'\n';
}
export function clientConfig(s, ca, tlsCrypt) {
  const cbc=s.ciphers.find(c=>c.endsWith('-CBC'));
  return ['client','dev tun',`proto ${s.proto==='tcp'?'tcp-client':'udp'}`,`remote ${host(s.host)} ${s.port}`,
    'resolv-retry infinite','nobind','persist-key','persist-tun','remote-cert-tls server','tls-version-min 1.2',
    'auth-user-pass','auth-nocache','setenv CLIENT_CERT 0',`setenv FRIENDLY_NAME ${JSON.stringify(s.name)}`,
    `data-ciphers ${s.ciphers.join(':')}`,`cipher ${cbc||s.ciphers[0]}`,'auth SHA256','verb 3',
    s.proto==='udp'?'explicit-exit-notify 3':'',`<ca>\n${ca.trim()}\n</ca>`,
    s.tlsCrypt?`<tls-crypt>\n${tlsCrypt.trim()}\n</tls-crypt>`:''
  ].filter(Boolean).join('\n')+'\n';
}
export function parseStatus(text) {
  let fields=[],stamp=0; const clients=[];
  for (const line of text.split(/\r?\n/)) {
    const a=line.split('\t');
    if(a[0]==='TIME') stamp=Number(a.at(-1))||0;
    if(a[0]==='HEADER'&&a[1]==='CLIENT_LIST') fields=a.slice(2);
    if(a[0]==='CLIENT_LIST'&&fields.length) {
      const row=Object.fromEntries(fields.map((k,i)=>[k,a[i+1]]));
      const name=row['Common Name'], remote=row['Real Address'];
      if (!/^[a-zA-Z0-9_.@-]{1,64}$/.test(name||'')||!remote) continue;
      clients.push({name,remote,received:Number(row['Bytes Received'])||0,sent:Number(row['Bytes Sent'])||0,connected:Number(row['Connected Since (time_t)'])||0});
    }
  }
  return {stamp,clients};
}
