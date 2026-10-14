/* SPDX-License-Identifier: GPL-3.0-or-later */
(()=>{'use strict';
  const base=window.__NOVA_BASE__||'', prefix=base+'/alireza/';
  const logo='<svg viewBox="0 0 64 64" aria-label="alirezaserver"><defs><linearGradient id="alireza-gradient" x2="1" y2="1"><stop stop-color="#a78bfa"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><path fill="url(#alireza-gradient)" d="M25 6h14l22 52H45l-4-11H23l-4 11H3L25 6zm3 29h9l-4.5-13L28 35z"/></svg>';
  const style=document.createElement('style');style.textContent='.az-overlay{position:fixed;inset:0;z-index:1500;background:var(--bg,#080a10);display:flex;flex-direction:column}.az-toolbar{display:flex;align-items:center;gap:16px;padding:12px 20px;background:var(--panel,#141720);color:var(--text,#fff);border-bottom:1px solid var(--border,#333)}.az-toolbar button{font:inherit;border:1px solid var(--border,#555);border-radius:10px;background:transparent;color:inherit;padding:8px 15px;cursor:pointer}.az-overlay iframe{flex:1;width:100%;border:0;background:var(--bg,#fff)}.az-overlay[hidden]{display:none}.az-toolbar strong{flex:1}.az-nav svg{color:#a78bfa}.mark[data-az-mark] svg{width:100%;height:100%}';document.head.append(style);
  const fa=()=>document.documentElement.lang==='fa'||document.documentElement.dir==='rtl';
  let overlay;
  function open(kind){
    if(!overlay){overlay=document.createElement('section');overlay.className='az-overlay';overlay.innerHTML='<div class="az-toolbar"><button type="button"></button><strong></strong><span>alirezaserver</span></div><iframe title="Service"></iframe>';document.body.append(overlay);overlay.querySelector('button').onclick=()=>{overlay.hidden=true;overlay.querySelector('iframe').src='about:blank';};}
    overlay.querySelector('button').textContent=fa()?'← بازگشت به پنل':'← Back to panel';overlay.querySelector('strong').textContent=kind==='dns'?'AdGuard Home · DNS':kind==='alirezadns'?'alirezadns':kind==='ai'?'AI':'OpenVPN';
    overlay.querySelector('iframe').src=prefix+kind+'/';overlay.hidden=false;overlay.querySelector('button').focus();
  }
  let owner=false,aiAllowed=false,authPending=false;
  async function checkOwner(){if(authPending)return;authPending=true;try{const r=await fetch(base+'/admin/whoami',{credentials:'same-origin',cache:'no-store'});const auth=r.ok?await r.json():null;owner=auth?.role==='owner';aiAllowed=['owner','admin','reseller'].includes(auth?.role);}catch{owner=false;aiAllowed=false;}finally{authPending=false;}schedule();}
  function apply(){
    observer.disconnect();
    document.title=document.title.replace(/Nova\s*Server|\bNova\b|نوا\s*سرور|نوا/gi,'alirezaserver');
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('script,style,textarea,pre,code,[contenteditable],.az-overlay')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
    let node;while((node=walker.nextNode())){const text=node.nodeValue.replace(/Nova\s*Server|\bNova\b|نوا\s*سرور|نوا/gi,'alirezaserver');if(text!==node.nodeValue)node.nodeValue=text;}
    document.querySelectorAll('.brand .mark:not([data-az-mark]),.gate .mark:not([data-az-mark]),.gate-mark:not([data-az-mark])').forEach(el=>{el.innerHTML=logo;el.dataset.azMark='1';});
    document.querySelectorAll('svg[viewBox="0 0 1254 1254"]').forEach(el=>{if(!el.closest('pre,code')){const span=document.createElement('span');span.style.cssText='display:inline-flex;width:100%;height:100%';span.innerHTML=logo;el.replaceWith(span);}});
    const icon=document.querySelector('link[rel="icon"]');if(icon&&!icon.dataset.azMark){icon.href='data:image/svg+xml,'+encodeURIComponent(logo);icon.dataset.azMark='1';}
    document.querySelectorAll('.social a').forEach(a=>{a.removeAttribute('href');a.removeAttribute('target');a.removeAttribute('onclick');a.setAttribute('aria-disabled','true');a.tabIndex=-1;});
    const nav=document.querySelector('.side-nav');
    if(nav&&(owner||aiAllowed)){for(const [kind,label]of [...(owner?[['dns','DNS · AdGuard Home'],['alirezadns','alirezadns']]:[]),...(aiAllowed?[['ai','AI']]:[])]){if(nav.querySelector('[data-az-kind="'+kind+'"]'))continue;const b=document.createElement('button');b.dataset.azKind=kind;b.type='button';b.className='nav-item az-nav';b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6h.01M7 17h.01"/></svg><span></span>';b.querySelector('span').textContent=label;b.onclick=()=>open(kind);nav.append(b);}}
    document.querySelectorAll('.az-nav').forEach(b=>{if(b.dataset.azKind==='ai'?!aiAllowed:!owner)b.remove();});
    if(!nav){document.querySelectorAll('.az-nav').forEach(el=>el.remove());if(overlay&&!overlay.hidden){overlay.hidden=true;overlay.querySelector('iframe').src='about:blank';}}
    observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['href']});
  }
  let queued=false;
  function schedule(){if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;apply();});}}
  const observer=new MutationObserver(schedule);apply();checkOwner();
  document.addEventListener('click',event=>{if(event.target.closest('.social a')){event.preventDefault();event.stopImmediatePropagation();}},true);
  // Recheck after login/logout; no background network polling.
  document.addEventListener('submit',()=>setTimeout(checkOwner,1000),true);
  document.addEventListener('click',event=>{if(event.target.closest('button[type="submit"],#gate-submit,#logout,[data-action="logout"]'))setTimeout(checkOwner,1000);},true);
  let hadNav=!!document.querySelector('.side-nav');new MutationObserver(()=>{const has=!!document.querySelector('.side-nav');if(has!==hadNav){hadNav=has;checkOwner();}}).observe(document.body,{childList:true,subtree:true});
})();
