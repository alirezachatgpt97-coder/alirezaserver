// DNS listener probe only; never adds rewrites or changes AdGuard settings.
import {randomBytes} from 'node:crypto';import {createSocket} from 'node:dgram';import {createConnection} from 'node:net';
export async function dnsResponds(port=53,address='127.0.0.1'){
 const ident=randomBytes(2),question=Buffer.concat([ident,Buffer.from('01000001000000000000','hex'),Buffer.from([7]),Buffer.from('invalid'),Buffer.from('0000010001','hex')]);
 const valid=b=>{if(b.length<12||!b.subarray(0,2).equals(ident)||!(b[2]&128))throw Error('Invalid DNS packet');return{rcode:b[3]&15};};
 const udp=()=>new Promise((resolve,reject)=>{const s=createSocket('udp4');let done=false;const finish=(e,b)=>{if(done)return;done=true;clearTimeout(timer);s.close();if(e)reject(e);else try{resolve(valid(b));}catch(e){reject(e);}};const timer=setTimeout(()=>finish(Error('UDP DNS timeout')),5000);s.on('error',e=>finish(e));s.once('message',b=>finish(null,b));s.send(question,port,address);});
 const tcp=()=>new Promise((resolve,reject)=>{const s=createConnection({host:address,port});let bytes=Buffer.alloc(0),done=false;const finish=(e,b)=>{if(done)return;done=true;s.destroy();if(e)reject(e);else try{resolve(valid(b));}catch(e){reject(e);}};s.setTimeout(5000,()=>finish(Error('TCP DNS timeout')));s.on('error',e=>finish(e));s.on('end',()=>{if(!done)finish(Error('Incomplete DNS reply'));});s.on('connect',()=>{const size=Buffer.alloc(2);size.writeUInt16BE(question.length);s.write(Buffer.concat([size,question]));});s.on('data',b=>{bytes=Buffer.concat([bytes,b]);if(bytes.length>65537)finish(Error('DNS packet too large'));else if(bytes.length>=2&&bytes.length>=bytes.readUInt16BE(0)+2)finish(null,bytes.subarray(2,bytes.readUInt16BE(0)+2));});});
 return{udp:await udp(),tcp:await tcp()};
}
