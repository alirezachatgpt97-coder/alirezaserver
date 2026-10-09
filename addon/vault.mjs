// SPDX-License-Identifier: GPL-3.0-or-later
import{readFileSync,writeFileSync,mkdirSync}from'node:fs';
import{randomBytes,createCipheriv,createDecipheriv,createHash}from'node:crypto';
const root=process.env.ALIREZA_ROOT||'/var/lib/alirezaserver';
function key(){mkdirSync(root,{recursive:true,mode:0o700});const path=root+'/subscription.key';try{return readFileSync(path);}catch(e){if(e.code!=='ENOENT')throw e;try{writeFileSync(path,randomBytes(32),{flag:'wx',mode:0o600});}catch(e){if(e.code!=='EEXIST')throw e;}return readFileSync(path);}}
export function seal(value,uid){const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',key(),iv);c.setAAD(Buffer.from(uid));const data=Buffer.concat([c.update(JSON.stringify(value),'utf8'),c.final()]);return Buffer.concat([iv,c.getAuthTag(),data]).toString('base64');}
export function unseal(value,uid){const data=Buffer.from(value,'base64'),c=createDecipheriv('aes-256-gcm',key(),data.subarray(0,12));c.setAAD(Buffer.from(uid));c.setAuthTag(data.subarray(12,28));return JSON.parse(Buffer.concat([c.update(data.subarray(28)),c.final()]).toString('utf8'));}
export const newToken=()=>randomBytes(32).toString('base64url');
export const tokenHash=token=>createHash('sha256').update(token).digest('hex');
