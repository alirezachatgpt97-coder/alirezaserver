// Optional browser QA against an explicitly selected test installation.
// Never opens a production server by default. Does not create VPN users or install DNS.
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
const origin=process.env.TEST_PANEL_URL;if(!origin)throw Error('Set TEST_PANEL_URL to a disposable test panel URL (including hidden path)');
const module=process.env.PLAYWRIGHT_MODULE;const{chromium}=module?await import(pathToFileURL(path.resolve(module))):await import('playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const out=path.resolve(process.env.BROWSER_OUTPUT||'test-output/browser');fs.mkdirSync(out,{recursive:true});
try{for(const[device,viewport]of[['desktop',{width:1366,height:900}],['mobile',{width:390,height:844}]])for(const lang of ['fa','en']){
const ctx=await browser.newContext({viewport,locale:lang,ignoreHTTPSErrors:true,...(process.env.TEST_STORAGE_STATE?{storageState:process.env.TEST_STORAGE_STATE}:{})});
await ctx.addInitScript(lang=>localStorage.setItem('alireza-lang',lang),lang);const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const[section,suffix]of[['native','/'],['openvpn','/alireza/openvpn/'],['alirezadns','/alireza/alirezadns/'],['ai','/alireza/ai/']]){await page.goto(origin.replace(/\/$/,'')+suffix,{waitUntil:'networkidle'});if(section!=='native')assert.equal(await page.locator('html').getAttribute('dir'),lang==='fa'?'rtl':'ltr');await page.screenshot({path:path.join(out,`${section}-${device}-${lang}.png`),fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Page overflow: '+section);}
assert.deepEqual(errors,[]);await ctx.close();}}
finally{await browser.close();}
console.log('Browser viewport checks and screenshots PASS');
