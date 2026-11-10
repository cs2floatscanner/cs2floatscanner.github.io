(()=>{
 const root=document.getElementById('demo');if(!root)return;
 let mode='market',filtered=false;const known=new Set();
 const examples={first:{name:'Prisma 2 Case',price:1.15,net:1.12},second:{name:'Prisma Case',price:2.30,net:2.25}};
 const words=()=>translations[document.documentElement.lang==='ru'?'ru':'en'];
 const money=value=>new Intl.NumberFormat(document.documentElement.lang==='ru'?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format(value);
 function render(){
  const text=words();
  for(const button of root.querySelectorAll('[data-demo-mode]'))button.setAttribute('aria-pressed',String(button.dataset.demoMode===mode));
  for(const panel of root.querySelectorAll('[data-demo-panel]'))panel.hidden=panel.dataset.demoPanel!==mode;
  for(const node of root.querySelectorAll('[data-demo-aria]'))node.setAttribute('aria-label',text[node.dataset.demoAria]);
  document.getElementById('demo-filter').setAttribute('aria-pressed',String(filtered));
  let count=0;for(const row of root.querySelectorAll('[data-example-float]')){row.hidden=filtered&&Number(row.dataset.exampleFloat)>.07;if(!row.hidden)count++;}
  document.getElementById('demo-found').textContent=text.demoFound.replace('{n}',count);
  for(const button of root.querySelectorAll('[data-demo-price]')){
   const item=examples[button.dataset.demoPrice];button.textContent=known.has(button.dataset.demoPrice)?money(item.price):text.demoLoad;
   button.setAttribute('aria-label',item.name+': '+button.textContent);
  }
  const chosen=[...known].map(key=>examples[key]);
  document.getElementById('demo-gross').textContent=known.size?money(chosen.reduce((sum,item)=>sum+Math.round(item.price*100)*100,0)/100):'—';
  document.getElementById('demo-net').textContent=known.size?'≈ '+money(chosen.reduce((sum,item)=>sum+item.net*100,0)):'—';
  document.getElementById('demo-coverage').textContent=text.demoCoverage.replace('{n}',known.size*100);
  document.getElementById('demo-reset').disabled=!known.size;
 }
 for(const button of root.querySelectorAll('[data-demo-mode]'))button.addEventListener('click',()=>{mode=button.dataset.demoMode;render();});
 document.getElementById('demo-filter').addEventListener('click',()=>{filtered=!filtered;render();});
 for(const button of root.querySelectorAll('[data-demo-price]'))button.addEventListener('click',()=>{known.add(button.dataset.demoPrice);render();});
 document.getElementById('demo-reset').addEventListener('click',()=>{known.clear();render();});
 window.addEventListener('scanner-site-language',render);
 const openHash=()=>{const node=document.getElementById(location.hash.slice(1));if(node?.tagName==='DETAILS')node.open=true;};
 window.addEventListener('hashchange',openHash);openHash();render();
})();
