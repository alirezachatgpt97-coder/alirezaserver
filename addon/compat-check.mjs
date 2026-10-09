// Fail closed when an upstream release removes the integration contracts.
import{readFileSync,existsSync,readdirSync}from'node:fs';import{resolve,join}from'node:path';import{pathToFileURL}from'node:url';import{spawnSync}from'node:child_process';
const dir=resolve(process.argv[2]||'/opt/nova-node-agent'),pkg=JSON.parse(readFileSync(join(dir,'package.json'),'utf8'));
if(pkg.name!=='nova-node-agent'||!/^\d+\.\d+\.\d+$/.test(pkg.version))throw Error('Unrecognized Nova package');
const engine=String(pkg.engines?.node||''),minimum=engine.match(/^>=\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?$/);
const current=process.versions.node.split('.').map(Number),required=minimum?.slice(1).map(v=>Number(v||0));
const firstDifference=required?.findIndex((v,i)=>v!==current[i]);
if(!minimum||(firstDifference>=0&&required[firstDifference]>current[firstDifference]))throw Error('This release needs a different Node runtime; current panel retained');
for(const file of ['bin/nova-agent.mjs','src/server.mjs','src/auth.mjs','src/kv/sqlite.mjs','src/web/panel.html'])if(!existsSync(join(dir,file)))throw Error('Missing integration file: '+file);
const panel=readFileSync(join(dir,'src/web/panel.html'),'utf8');
for(const token of ['side-nav','social','__NOVA_BASE__','Vazirmatn','data-theme="light"','--bg:','--shadow-card:'])if(!panel.includes(token))throw Error('Panel contract changed: '+token);
const auth=await import(pathToFileURL(join(dir,'src/auth.mjs'))),server=await import(pathToFileURL(join(dir,'src/server.mjs')));
for(const name of ['makeSession','resolveSession','readAuthCookie'])if(typeof auth[name]!=='function')throw Error('Authentication contract changed: '+name);
if(typeof server.createServer!=='function')throw Error('HTTP server contract changed');
process.env.ALIREZA_NOVA_PANEL=join(dir,'src/web/panel.html');const theme=await import('./theme.mjs');theme.fontCSS();theme.themeCSS();
function syntax(path){for(const entry of readdirSync(path,{withFileTypes:true})){if(entry.name==='node_modules')continue;const file=join(path,entry.name);if(entry.isDirectory())syntax(file);else if(file.endsWith('.mjs')){const r=spawnSync(process.execPath,['--check',file],{timeout:15000,encoding:'utf8'});if(r.status!==0)throw Error('Syntax check failed: '+file);}}}
syntax(join(dir,'src'));syntax(join(dir,'bin'));console.log('Nova '+pkg.version+': integration contracts, themes and JavaScript syntax PASS');
// Exercise the identity contract with ephemeral in-memory KV and loopback HTTP.
// No account/database/service on the installed panel is modified.
const {openKv}=await import(pathToFileURL(join(dir,'src/kv/sqlite.mjs'))),kv=openKv(':memory:');
try{
 await kv.put('network-settings.json',JSON.stringify({panelPath:'compat',host:'localhost'}));
 await auth.setPassword(kv,'compatibility-test-in-memory-only');
 const session=await auth.makeSession(kv,{userAgent:'alireza-compat'}),http=await import('node:http'),native=server.createServer(kv);
 await new Promise(r=>native.listen(0,'127.0.0.1',r));
 try{const result=await new Promise((resolve,reject)=>{const req=http.get({hostname:'127.0.0.1',port:native.address().port,path:'/compat/admin/whoami',headers:{host:'localhost','user-agent':'alireza-compat',cookie:session.name+'='+session.value},timeout:5000},res=>{let s='';res.on('data',b=>s+=b);res.on('end',()=>resolve({status:res.statusCode,body:s}));});req.on('timeout',()=>req.destroy(Error('Identity contract timeout')));req.on('error',reject);});const identity=JSON.parse(result.body);if(result.status!==200||identity.role!=='owner'||!identity.id)throw Error('Native identity contract changed');}
 finally{await new Promise(r=>native.close(r));}
}finally{kv.close();}
console.log('Native owner identity contract: PASS');
