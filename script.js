const root=document.documentElement;
const ACCENTS={gold:'#d4a24c',blue:'#3b82f6',green:'#1fa36a',red:'#e5484d',purple:'#8b5cf6',orange:'#f97316'};
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const defaultMode=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
function applyTheme(mode,accent){
  root.dataset.mode=mode;root.dataset.accent=accent;
  store.set('mode',mode);store.set('accent',accent);
  document.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===mode));
  document.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('on',b.dataset.a===accent));
}
const panel=document.getElementById('themePanel');
panel.innerHTML='<h4>Mode</h4><div class="modes"><button data-m="light">Light</button><button data-m="dark">Dark</button></div><h4>Color</h4><div class="swatches">'+
Object.entries(ACCENTS).map(([n,c])=>`<button data-a="${n}" style="background:${c}" aria-label="${n}"></button>`).join('')+'</div>';
panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  applyTheme(b.dataset.m||root.dataset.mode,b.dataset.a||root.dataset.accent);
});
document.getElementById('themeBtn').onclick=()=>{panel.hidden=!panel.hidden};
document.addEventListener('click',e=>{if(!e.target.closest('#themePanel,#themeBtn'))panel.hidden=true});
const nav=document.getElementById('nav');
document.getElementById('menuBtn').onclick=()=>nav.classList.toggle('open');
nav.addEventListener('click',()=>nav.classList.remove('open'));
applyTheme(store.get('mode')||defaultMode,store.get('accent')||root.dataset.accent||'gold');
document.getElementById('year').textContent=new Date().getFullYear();

/* ===== EDIT THESE ===== */
const PHONE='2348066453930'; // international format, no + or spaces
const SERVICES=[
 ['Classic haircut','Scissor and clipper cut with a clean neckline.',3000],
 ['Skin fade','Zero-to-low blend with a sharp edge-up.',4000],
 ['Beard trim and shape','Lined up, trimmed and finished with oil.',2000],
 ['Haircut and beard','The full reset in one sitting.',5500],
 ['Kids cut','Patient barbers, ages 3 to 12.',2500],
 ['Hot towel shave','Slow razor shave with a hot towel finish.',3000],
 ['Hair dye','Black or colour, applied evenly.',3500]
];
/* ====================== */
const naira=n=>'₦'+n.toLocaleString();
const wa=t=>`https://wa.me/${PHONE}${t?'?text='+encodeURIComponent(t):''}`;
document.getElementById('svcList').innerHTML=SERVICES.map(s=>`<article class="card"><div class="svc"><h3>${s[0]}</h3><span class="price">${naira(s[2])}</span></div><p>${s[1]}</p></article>`).join('');
const sel=document.getElementById('service');
sel.innerHTML='<option value="">Pick a service</option>'+SERVICES.map(s=>`<option>${s[0]} (${naira(s[2])})</option>`).join('');
document.getElementById('date').min=new Date().toISOString().split('T')[0];
document.getElementById('bookForm').onsubmit=e=>{
  e.preventDefault();
  const g=id=>document.getElementById(id).value;
  window.open(wa(`Hello, I want to book.\nName: ${g('name')}\nService: ${g('service')}\nDate: ${g('date')}\nTime: ${g('time')}`),'_blank');
};
['waBtn','waFloat'].forEach(id=>document.getElementById(id).href=wa('Hello, I want to book a cut.'));
document.getElementById('callBtn').href='tel:+'+PHONE;
