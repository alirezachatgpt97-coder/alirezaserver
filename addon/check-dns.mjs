// SPDX-License-Identifier: GPL-3.0-or-later
// Verify a temporary, uniquely named AdGuard rewrite over both DNS transports.
// The caller creates/removes that record using the authenticated AdGuard API.
import {randomBytes} from 'node:crypto';
import {createSocket} from 'node:dgram';
import {createConnection} from 'node:net';
export async function checkDNS(domain,port=53){
const header=Buffer.alloc(12);randomBytes(2).copy(header);header.writeUInt16BE(0x0100,2);header.writeUInt16BE(1,4);
const labels=Buffer.from(domain.split('.').flatMap(label=>[label.length,...Buffer.from(label)]).concat([0,0,1,0,1]));
const packet=Buffer.concat([header,labels]);
function validate(b){if(b.length<12||b.readUInt16BE(0)!==packet.readUInt16BE(0)||!(b[2]&128)||(b[3]&15)!==0||!b.readUInt16BE(6)||!b.includes(Buffer.from([192,0,2,53])))throw Error('DNS rewrite did not resolve to the expected test address');return b[3]&15;}
async function udp(){return new Promise((resolve,reject)=>{const s=createSocket('udp4');const timer=setTimeout(()=>{s.close();reject(Error('UDP DNS did not respond'));},15000);s.on('error',e=>{clearTimeout(timer);s.close();reject(e);});s.once('message',b=>{clearTimeout(timer);s.close();try{resolve(validate(b));}catch(e){reject(e);}});s.send(packet,port,'127.0.0.1');});}
async function tcp(){return new Promise((resolve,reject)=>{const s=createConnection({host:'127.0.0.1',port});let bytes=Buffer.alloc(0),done=false;const finish=(err,result)=>{if(done)return;done=true;s.destroy();if(err)reject(err);else resolve(result);};s.setTimeout(15000,()=>finish(Error('TCP DNS did not respond')));s.on('error',e=>finish(e));s.on('end',()=>{if(!done)finish(Error('Incomplete TCP DNS response'));});s.on('connect',()=>{const size=Buffer.alloc(2);size.writeUInt16BE(packet.length);s.write(Buffer.concat([size,packet]));});s.on('data',b=>{bytes=Buffer.concat([bytes,b]);if(bytes.length>=2&&bytes.length>=bytes.readUInt16BE(0)+2){try{finish(null,validate(bytes.subarray(2,bytes.readUInt16BE(0)+2)));}catch(e){finish(e);}}});});}
await Promise.all([udp(),tcp()]);console.log('DNS port '+port+': actual UDP + TCP resolution PASS (local test record, no Internet dependency)');
}
