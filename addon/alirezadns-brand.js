// Display branding only; upstream protocol identifiers, user values and notices remain intact.
(()=>{'use strict';const rename=s=>s.replace(/Hyper\s*DNS|Hyper\s*RAIN/gi,'alirezadns');let queued=false;
 const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;apply();});}});
 function apply(){observer.disconnect();document.title=rename(document.title);const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('script,style,textarea,pre,code,[contenteditable],.license,.copyright')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;while((n=walker.nextNode())){const next=rename(n.nodeValue);if(next!==n.nodeValue)n.nodeValue=next;}for(const el of document.querySelectorAll('[title],[aria-label],img[alt]'))for(const a of ['title','aria-label','alt'])if(el.hasAttribute(a))el.setAttribute(a,rename(el.getAttribute(a)));observer.observe(document.body,{childList:true,subtree:true,characterData:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
