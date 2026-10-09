/* SPDX-License-Identifier: GPL-3.0-or-later */
(()=>{
  const root=document.documentElement;
  root.dataset.alirezaSurface=document.currentScript?.dataset.surface||'dns';
  function sync(){
    try{
      if(parent===window){const light=root.dataset.theme==='light'||(root.dataset.theme!=='dark'&&matchMedia('(prefers-color-scheme: light)').matches);root.style.colorScheme=light?'light':'dark';root.dataset.azTheme=light?'light':'dark';return;}
      const host=parent.document.documentElement,css=parent.getComputedStyle(host);
      for(const token of ['bg','panel','card','card2','bd','bd2','tx','tx2','mu','ac','ac2','ac-ink','ac-hover','grad','ok','wn','dg','surface-1','surface-2','surface-3','input-bg','ring','shadow-pop','shadow-card','shadow-card-hover','r-xs','r-sm','r-md','r-lg']){
        const value=css.getPropertyValue('--'+token).trim();if(value)root.style.setProperty('--az-'+token,value);
      }
      const light=host.dataset.theme==='light'||(host.dataset.theme!=='dark'&&parent.matchMedia('(prefers-color-scheme: light)').matches);
      root.style.colorScheme=light?'light':'dark';root.dataset.azTheme=light?'light':'dark';
    }catch{}
  }
  sync();
  try{if(parent!==window)new MutationObserver(sync).observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme','class','style']});}catch{}
  matchMedia('(prefers-color-scheme: light)').addEventListener('change',sync);
  document.addEventListener('alireza-theme',sync);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});
})();
