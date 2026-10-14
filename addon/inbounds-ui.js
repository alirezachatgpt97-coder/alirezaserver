/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Native-form bridge: no cloned Nova configuration generator or credential store. */
(()=>{'use strict';
 const base=window.__NOVA_BASE__||'',fa=()=>document.documentElement.lang==='fa'||document.documentElement.dir==='rtl';
 const text=(f,e)=>fa()?f:e;
 if(typeof viewInbounds!=='function'||typeof openInboundModal!=='function'||typeof openModal!=='function'||typeof INB_PRESETS==='undefined')return;
 const style=document.createElement('style');style.dataset.azInbounds='';style.textContent=`.az-inbounds-head{flex-wrap:wrap;align-items:center}.az-inbounds-head .htxt{flex:1 1 220px}.az-inbounds-head [data-az-manual]{white-space:normal}.az-manual-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin:16px 0}.az-manual-grid .inb-preset{text-align:start;min-height:88px}.az-manual-grid .inb-preset[aria-checked=true]{border-color:var(--ac);box-shadow:0 0 0 2px var(--ring)}.az-manual-note{color:var(--mu);font-size:13px;line-height:1.8}.az-openvpn-inline{margin:18px 0}.az-openvpn-inline summary{cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px;list-style:none}.az-openvpn-inline summary::-webkit-details-marker{display:none}.az-openvpn-inline iframe{width:100%;height:760px;border:0;display:block;background:transparent}.az-openvpn-inline .az-summary-note{color:var(--mu);font-size:12px;margin-top:6px}.az-manual-actions{display:flex;gap:8px;flex-wrap:wrap}.az-openvpn-inline[open]{box-shadow:var(--shadow-card-hover)}@media(max-width:640px){.az-manual-grid{grid-template-columns:1fr 1fr}.az-openvpn-inline iframe{height:840px}}`;document.head.append(style);
 function allowed(){return typeof isOwner==='function'&&isOwner();}
 function frameFor(section,create=false){
  const details=section.querySelector('[data-az-openvpn]');if(!details)return;details.open=true;
  let iframe=details.querySelector('iframe');if(!iframe){iframe=document.createElement('iframe');iframe.title=text('مدیریت اینباندهای OpenVPN','OpenVPN inbound management');iframe.src=base+'/alireza/openvpn/?embedded=1';iframe.addEventListener('load',()=>{iframe.dataset.ready='1';});details.append(iframe);}
  if(create){const send=()=>iframe.contentWindow?.postMessage({type:'az-openvpn-create'},location.origin);if(iframe.dataset.ready)send();else iframe.addEventListener('load',()=>{iframe.dataset.ready='1';send();},{once:true});}
  details.scrollIntoView?.({behavior:'smooth',block:'start'});
 }
 function singleton(section,kind){
  const selectors={mtproto:'#mtg-on',mieru:'#mieru-on',awg:'#awg-body'};let target=section.querySelector(selectors[kind]);
  if(!target&&kind==='awg'&&typeof awgSection==='function'&&!(typeof isPaas==='function'&&isPaas())){const wrap=document.createElement('section');wrap.dataset.azAwg='';wrap.append(awgSection());section.append(wrap);target=wrap;}
  (target?.closest('.card')||target)?.scrollIntoView?.({behavior:'smooth',block:'center'});target?.focus?.();
 }
 function manual(section){
  if(!allowed())return;
  const presets=INB_PRESETS.filter(p=>!(typeof isPaas==='function'&&isPaas())||p.placement==='front');
  const protocols=[...new Set(presets.map(p=>p.base.protocol))];const cloud=typeof isPaas==='function'&&isPaas();if(!cloud)protocols.push('openvpn','awg','mieru','mtproto');
  let selected=protocols.includes('vless')?'vless':protocols[0];let preset='';
  const modal=openModal({title:text('ساخت دستی اینباند','Create inbound manually'),body:'<div class="az-manual-root"></div>',okLabel:text('ادامه به تنظیمات کامل','Continue to full settings'),onOk:close=>{
   if(!allowed())return;close();
   if(selected==='openvpn'){frameFor(section,true);return;}
   if(['awg','mieru','mtproto'].includes(selected)){singleton(section,selected);return;}
   if(!cloud&&window.AlirezaManualCore?.protocols.includes(selected)&&typeof window.alirezaManualEditor==='function'){const p=presets.find(p=>p.id===preset);window.alirezaManualEditor(selected,{...p?.base,port:p?.defPort});return;}
   openInboundModal(null);
   const button=document.querySelector('.scrim:last-child [data-p="'+preset+'"]');button?.click();
  }});
  const root=modal.querySelector('.az-manual-root');
  const label=document.createElement('label');label.className='field';label.textContent=text('پروتکل','Protocol');const select=document.createElement('select');select.className='input';select.dir='ltr';
  const names={vless:'VLESS',vmess:'VMess',trojan:'Trojan',shadowsocks:'Shadowsocks',wireguard:'WireGuard',hysteria2:'Hysteria2',tuic:'TUIC',naive:'Naive',socks:'SOCKS',http:'HTTP', 'dokodemo-door':'Port forward',openvpn:'OpenVPN',awg:'AmneziaWG',mieru:'Mieru',mtproto:'MTProto'};
  for(const p of protocols){const option=document.createElement('option');option.value=p;option.textContent=names[p]||p;select.append(option);}select.value=selected;label.append(select);root.append(label);
  const catalog=document.createElement('div');catalog.className='az-manual-grid';catalog.setAttribute('role','radiogroup');catalog.setAttribute('aria-label',text('پروتکل‌های موجود','Available protocols'));for(const p of protocols){const b=document.createElement('button');b.type='button';b.className='inb-preset';b.dataset.azProtocol=p;b.setAttribute('role','radio');const title=document.createElement('span');title.className='pn';title.textContent=names[p]||p;const engine=document.createElement('span');engine.className='pd mono';engine.textContent=['hysteria2','tuic','naive'].includes(p)?'sing-box':p==='openvpn'?'OpenVPN':['awg','mieru','mtproto'].includes(p)?text('سرویس نوا','Nova service'):'Xray';b.append(title,engine);b.onclick=()=>{select.value=p;variants();};catalog.append(b);}root.append(catalog);
  const grid=document.createElement('div');grid.className='az-manual-grid';grid.setAttribute('role','radiogroup');grid.setAttribute('aria-label',text('نوع اتصال و امنیت','Transport and security'));root.append(grid);
  const note=document.createElement('p');note.className='az-manual-note';root.append(note);
  function variants(){selected=select.value;for(const card of catalog.children)card.setAttribute('aria-checked',String(card.dataset.azProtocol===selected));grid.replaceChildren();const list=presets.filter(p=>p.base.protocol===selected);preset=list[0]?.id||'';
   for(const p of list){const b=document.createElement('button');b.type='button';b.className='inb-preset';b.dataset.azPreset=p.id;b.setAttribute('role','radio');b.setAttribute('aria-checked',String(p.id===preset));const title=document.createElement('span');title.className='pn';title.textContent=typeof t==='function'&&typeof INB_PRESET_NAME!=='undefined'?t(INB_PRESET_NAME[p.id]):p.id;const sub=document.createElement('span');sub.className='pd mono';sub.dir='ltr';sub.textContent=(p.base.network||(['naive'].includes(selected)?'tcp':'udp'))+' / '+p.sec;b.append(title,sub);b.onclick=()=>{preset=p.id;for(const item of grid.children)item.setAttribute('aria-checked',String(item===b));};grid.append(b);}
   note.textContent=selected==='openvpn'?text('سرورها، حساب‌ها، رمزها، گواهی‌ها و لینک‌های موجود حفظ می‌شوند. ساخت و مدیریت همین‌جا در اینباندها انجام می‌شود. حساب‌های OpenVPN همچنان مستقل از کاربران نوا هستند.','Existing servers, accounts, certificates and links are retained. Manage OpenVPN here in Inbounds. OpenVPN accounts remain separate from Nova users.'):['awg','mieru','mtproto'].includes(selected)?text('این پروتکل سرویس مستقل نوا دارد؛ ادامه، تنظیمات واقعی همان سرویس را باز می‌کند و نمونهٔ تکراری ایجاد نمی‌کند.','This protocol uses a native standalone service. Continue opens its real settings without creating a duplicate instance.'):text('در مرحلهٔ بعد تنظیمات کامل فرم اصلی نوا، انتخاب نود، پورت، امنیت و گزینه‌های پیشرفته در دسترس است.','Next opens the complete native Nova form with node, port, security and advanced settings.');
  }
  select.onchange=variants;variants();select.focus();
 }
 function decorate(section){
  if(!allowed()||section.querySelector('[data-az-manual]'))return section;
  const header=section.querySelector('.view-head');if(!header)return section;header.classList.add('az-inbounds-head');
  const button=document.createElement('button');button.type='button';button.className='btn primary';button.dataset.azManual='';button.textContent=text('＋ ساخت دستی اینباند','＋ Create inbound manually');button.onclick=()=>manual(section);header.append(button);
  if(!(typeof isPaas==='function'&&isPaas())){
   const details=document.createElement('details');details.className='card az-openvpn-inline';details.dataset.azOpenvpn='';const summary=document.createElement('summary');const title=document.createElement('div');const strong=document.createElement('strong');strong.textContent='OpenVPN';const note=document.createElement('div');note.className='az-summary-note';note.textContent=text('اینباندها، حساب‌ها، گواهی‌ها و کانفیگ اتصال','Inbounds, accounts, certificates and connection profiles');title.append(strong,note);const badge=document.createElement('span');badge.className='badge';badge.textContent=text('مدیریت','Manage');summary.append(title,badge);details.append(summary);
   details.addEventListener('toggle',()=>{if(details.open)frameFor(section);else details.querySelector('iframe')?.remove();});section.insertBefore(details,section.querySelector('.inb-grid')||header.nextSibling);
  }
  return section;
 }
 const original=viewInbounds;viewInbounds=function(...args){return decorate(original.apply(this,args));};
 const existing=document.querySelector('#inb-add')?.closest('section.view');if(existing)decorate(existing);
})();
