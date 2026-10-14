/* SPDX-License-Identifier: GPL-3.0-or-later */
(()=>{'use strict';
 const protocols=['vless','vmess','trojan','shadowsocks','dokodemo-door'];
 const networks=['tcp','ws','grpc','xhttp','httpupgrade'];
 const fail=m=>{throw Error(m);};const list=v=>String(v||'').split(',').map(v=>v.trim()).filter(Boolean);
 function build(v){
  if(!protocols.includes(v.protocol)||!networks.includes(v.network))fail('Unsupported protocol or transport');
  const port=Number(v.port);if(!Number.isInteger(port)||port<1||port>65535)fail('Port must be 1–65535');
  if(!['none','tls','reality'].includes(v.security))fail('Unsupported security');
  if(v.security==='reality'&&!['vless','trojan'].includes(v.protocol))fail('Reality requires VLESS or Trojan');
  if(v.flow&&!(v.protocol==='vless'&&v.network==='tcp'&&['tls','reality'].includes(v.security)))fail('Vision requires VLESS TCP with TLS or Reality');
  const settings=['vless','vmess','trojan','shadowsocks'].includes(v.protocol)?{clients:[]}:['socks','http'].includes(v.protocol)?{auth:'password',accounts:[],udp:!!v.udp}:{};
  if(v.protocol==='vless')settings.decryption='none';
  if(v.protocol==='shadowsocks'){if(v.security!=='none')fail('Use native Shadowsocks security');settings.method='2022-blake3-aes-128-gcm';settings.password=v.ssPassword;if(!/^[A-Za-z0-9+/]{22}==$/.test(v.ssPassword||''))fail('SS2022 requires a 16-byte base64 key');}
  if(v.protocol==='dokodemo-door'){if(!v.target||!Number.isInteger(Number(v.targetPort))||Number(v.targetPort)<1||Number(v.targetPort)>65535)fail('A target host and valid target port are required');Object.assign(settings,{address:v.target,port:Number(v.targetPort),network:v.udp?'tcp,udp':'tcp',followRedirect:false});}
  const streamSettings={network:v.network,security:v.security};
  if(v.network==='tcp')streamSettings.tcpSettings={acceptProxyProtocol:!!v.proxyProtocol,header:{type:'none'}};
  if(v.network==='ws')streamSettings.wsSettings={path:v.path||'/',headers:v.host?{Host:v.host}:{},acceptProxyProtocol:!!v.proxyProtocol};
  if(v.network==='grpc')streamSettings.grpcSettings={serviceName:v.serviceName||'',multiMode:!!v.multiMode};
  if(v.network==='xhttp')streamSettings.xhttpSettings={path:v.path||'/',host:v.host||'',mode:v.xhttpMode||'auto'};
  if(v.network==='httpupgrade')streamSettings.httpupgradeSettings={path:v.path||'/',host:v.host||''};
  let reality=null;
  if(v.security==='tls'){
   if(!v.certFile?.startsWith('/')||!v.keyFile?.startsWith('/'))fail('TLS certificate and key must be absolute server paths');
   streamSettings.tlsSettings={serverName:v.sni||'',alpn:list(v.alpn),minVersion:v.minVersion||'1.2',certificates:[{certificateFile:v.certFile,keyFile:v.keyFile}]};
  }
  if(v.security==='reality'){
   const serverNames=list(v.sni),shortIds=list(v.shortIds);
   if(!serverNames.length||!v.dest||!/^[A-Za-z0-9_-]{43}$/.test(v.privateKey||'')||!/^[A-Za-z0-9_-]{43}$/.test(v.publicKey||''))fail('Reality requires SNI, destination and a valid key pair');
   if(!shortIds.length||shortIds.some(s=>!/^([a-fA-F0-9]{2}){1,8}$/.test(s)))fail('Short IDs must contain 2–16 hexadecimal digits in pairs');
   reality={dest:v.dest,serverNames,privateKey:v.privateKey,publicKey:v.publicKey,shortIds};streamSettings.realitySettings={show:false,dest:v.dest,serverNames,privateKey:v.privateKey,shortIds};
  }
  const raw={listen:v.listen||'0.0.0.0',port,protocol:v.protocol,settings,streamSettings,sniffing:{enabled:!!v.sniffing,destOverride:['http','tls','quic'],routeOnly:!!v.routeOnly}};
  return{protocol:v.protocol,network:v.network,security:v.security,listen:raw.listen,port,remark:v.remark||'',nodeId:v.nodeId||'local',outbound:v.outbound||'',enabled:v.enabled!==false,allUsers:v.allUsers!==false,userIds:v.userIds||[],flow:v.flow||'',path:v.path||'/',host:v.host||'',serviceName:v.serviceName||'',xhttpMode:v.xhttpMode||'auto',sni:v.sni||'',fingerprint:v.fingerprint||'chrome',reality,method:'2022-blake3-aes-128-gcm',ssPassword:v.ssPassword||'',target:v.target||'',targetPort:Number(v.targetPort)||0,sockUdp:!!v.udp,raw};
 }
 window.AlirezaManualCore={protocols,networks,build};
})();
