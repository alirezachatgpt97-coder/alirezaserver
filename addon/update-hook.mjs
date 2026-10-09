// Keep Nova's own update button/automation on the guarded system service.
import childProcess from 'node:child_process';import{syncBuiltinESMExports}from'node:module';
export function guardedSpawn(spawn){return function(command,args,options){
  if(command==='bash'&&Array.isArray(args)&&args[0]==='-c'&&args[2]==='nova-self-update')return spawn.call(this,'systemctl',['start','--no-block','alireza-update.service'],options);
  return spawn.apply(this,arguments);
};}
if(process.platform==='linux'&&process.env.ALIREZA_NO_HOOK!=='1'){
  const spawn=childProcess.spawn;
  childProcess.spawn=guardedSpawn(spawn);
  syncBuiltinESMExports();
}
