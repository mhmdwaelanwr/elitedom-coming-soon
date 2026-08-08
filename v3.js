const translations={
  en:{access:"ACCESS RESTRICTED",prelaunch:"PRE-LAUNCH SIGNAL",heroA:"SOMETHING",heroB:"IS COMING.",heroText:"A new standard for hardware shopping is almost online. You found the signal before the doors opened.",intercept:"INTERCEPT SIGNAL",core:"CORE SYSTEM",catalog:"CATALOGUE",public:"PUBLIC ACCESS",online:"ONLINE",classified:"CLASSIFIED",denied:"DENIED",feed:"PRODUCT FEED // CLASSIFIED",move:"MOVE TO REVEAL // LIMITED ACCESS",moveTouch:"TAP TO REVEAL // LIMITED ACCESS",scroll:"SCROLL TO INTERCEPT",incoming:"INCOMING SIGNAL",whatA:"WHAT ARE WE",whatB:"BUILDING?",glimpse:"Just enough to know something serious is coming — not enough to spoil the launch.",card1Title:"BUILT FOR REAL SETUPS",card1Text:"From a first build to a serious upgrade, the experience is being shaped around the hardware people actually want.",card2Title:"FAST. CLEAR. TRUSTED.",card2Text:"Sharper discovery, clearer choices, and a storefront designed to feel as refined as the technology behind it.",card3Title:"MORE THAN A STORE",card3Text:"Launch is only the beginning. Elitedom is being built as a destination for hardware and technology.",behind:"BEHIND THE CURTAIN",systemA:"THE SYSTEM",systemB:"IS BOOTING.",systemText:"This page is only the signal. The full Elitedom experience stays behind the curtain until launch.",calibrating:"CALIBRATING",soon:"SOON",interrupted:"SIGNAL INTERRUPTED",enough:"YOU'VE SEEN ENOUGH.",dark:"The rest goes back into the dark until launch.",stay:"STAY TUNED",waitA:"THE WAIT WON'T",waitB:"BE LONG.",finalText:"When public access opens, this page disappears and Elitedom begins.",state:"CURRENT STATE",comingSoon:"COMING SOON",rights:"All rights reserved.",performance:"PERFORMANCE",hardware:"HARDWARE",gaming:"GAMING",power:"POWER",catGaming:"GAMING",catBuilds:"PC BUILDS",catComponents:"COMPONENTS",catPeripherals:"PERIPHERALS",catAudio:"AUDIO",catNetwork:"NETWORKING",bootSignal:"ESTABLISHING SECURE SIGNAL",launchControl:"LAUNCH CONTROL",encrypted:"ENCRYPTED"},
  ar:{access:"الدخول مقيّد",prelaunch:"إشارة ما قبل الإطلاق",heroA:"القادم",heroB:"مختلف.",heroText:"تجربة جديدة للهاردوير والتقنية تقترب. وصلت مبكرًا… قبل أن تُفتح الأبواب.",intercept:"تتبّع الإشارة",core:"النظام الأساسي",catalog:"الكتالوج",public:"الدخول العام",online:"متصل",classified:"محجوب",denied:"مغلق",feed:"كتالوج المنتجات // محجوب",move:"حرّك المؤشر للكشف // وصول محدود",moveTouch:"المس للكشف // وصول محدود",scroll:"تابع الإشارة",incoming:"تم التقاط إشارة",whatA:"ما الذي",whatB:"نُجهّزه؟",glimpse:"لمحة تكفي لتعرف أن القادم مختلف — والباقي نتركه ليوم الإطلاق.",card1Title:"لتجميعتك القادمة",card1Text:"من أول تجميعة إلى أقوى ترقية، نصمم تجربة تقودك إلى الهاردوير المناسب بثقة ووضوح.",card2Title:"سرعة. وضوح. ثقة.",card2Text:"اختيارات أوضح، بحث أسرع، وتجربة شراء تليق بمستوى التقنية التي نقدّمها.",card3Title:"أكثر من متجر",card3Text:"الإطلاق هو البداية فقط. Elitedom يُبنى ليكون وجهتك للهاردوير والتقنية، اليوم وما بعده.",behind:"خلف الستار",systemA:"المنظومة",systemB:"تستعد.",systemText:"ما تراه الآن مجرد إشارة. التجربة الكاملة ما زالت خلف الستار حتى لحظة الإطلاق.",calibrating:"قيد التجهيز",soon:"قريبًا",interrupted:"انقطعت الإشارة",enough:"هذا يكفي… الآن.",dark:"الباقي سيظل في الظل حتى يوم الإطلاق.",stay:"ترقّب",waitA:"الانطلاق",waitB:"أقرب مما تتوقع.",finalText:"عندما تُفتح الأبواب، تختفي هذه الصفحة وتبدأ تجربة Elitedom.",state:"الحالة الحالية",comingSoon:"قريبًا",rights:"جميع الحقوق محفوظة.",performance:"أداء",hardware:"هاردوير",gaming:"ألعاب",power:"قوة",catGaming:"ألعاب",catBuilds:"تجميعات كمبيوتر",catComponents:"مكوّنات",catPeripherals:"ملحقات",catAudio:"صوتيات",catNetwork:"شبكات",bootSignal:"جارٍ تأمين الإشارة",launchControl:"مركز الإطلاق",encrypted:"مشفّر"}
};

const polish=document.createElement("link");
polish.rel="stylesheet";
polish.href="polish.css?v=2";
document.head.appendChild(polish);

document.querySelectorAll('img[src="assets/logo-mark.png"]').forEach(img=>{img.src="assets/logo-mark.svg"});
const favicon=document.querySelector('link[rel="icon"]');
if(favicon){favicon.href="assets/logo-mark.svg";favicon.type="image/svg+xml"}

const root=document.documentElement;
const body=document.body;
const toggle=document.getElementById("languageToggle");
const bootCopy=document.querySelector(".boot p");
const terminalTitle=document.querySelector(".terminal__bar>span");
const terminalEncrypted=document.querySelector(".terminal__bar>b");
const vaultHint=document.querySelector(".vault__hint");
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine=matchMedia("(pointer:fine)").matches;

function storedLanguage(){
  try{return localStorage.getItem("elitedom-lang")||"en"}catch{return "en"}
}
function saveLanguage(value){
  try{localStorage.setItem("elitedom-lang",value)}catch{}
}
let lang=storedLanguage();

const redacted=document.getElementById("redactedWord");
let redactIndex=0;
const redactStates={
  en:["[REDACTED]","[LOCKED]","[SOON]","[REDACTED]"],
  ar:["[محجوب]","[مغلق]","[قريبًا]","[محجوب]"]
};

function applyLanguage(next,animate=false){
  lang=next;
  const ar=lang==="ar";
  root.lang=lang;
  root.dir=ar?"rtl":"ltr";
  body.dataset.locale=lang;

  document.querySelectorAll("[data-i18n]").forEach(node=>{
    const value=translations[lang]?.[node.dataset.i18n];
    if(value)node.textContent=value;
  });

  if(vaultHint)vaultHint.textContent=translations[lang][fine?"move":"moveTouch"];
  if(redacted){redactIndex=0;redacted.textContent=redactStates[lang][0]}
  if(toggle){
    toggle.textContent=ar?"EN":"AR";
    toggle.setAttribute("aria-label",ar?"Switch to English":"التبديل إلى العربية");
  }
  if(bootCopy)bootCopy.textContent=translations[lang].bootSignal;
  if(terminalTitle){
    terminalTitle.innerHTML=`<span class="terminal-brand" dir="ltr">ELITEDOM //</span><span class="terminal-locale-title">${translations[lang].launchControl}</span>`;
  }
  if(terminalEncrypted)terminalEncrypted.textContent=translations[lang].encrypted;

  saveLanguage(lang);
  if(animate&&!reduced){
    body.classList.remove("language-flash");
    void body.offsetWidth;
    body.classList.add("language-flash");
    setTimeout(()=>body.classList.remove("language-flash"),420);
  }
}

toggle?.addEventListener("click",()=>applyLanguage(lang==="en"?"ar":"en",true));
applyLanguage(lang);
document.getElementById("year").textContent=new Date().getFullYear();

const boot=document.getElementById("boot");
body.classList.add("locked");
const releaseBoot=()=>{boot?.classList.add("done");body.classList.remove("locked")};
window.addEventListener("load",()=>setTimeout(releaseBoot,reduced?60:540));
setTimeout(releaseBoot,1900);

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  }
}),{threshold:.12,rootMargin:"0px 0px -28px"});

document.querySelectorAll(".reveal").forEach((el,i)=>{
  el.style.transitionDelay=`${Math.min(i%4,3)*65}ms`;
  revealObserver.observe(el);
});

const nav=document.getElementById("nav");
const progress=document.getElementById("scrollProgress");
const heroVisual=document.querySelector(".hero__visual");
const cutRing=document.querySelector(".cut__ring");
let scrollTick=false;
function renderScroll(){
  const y=scrollY;
  const max=document.documentElement.scrollHeight-innerHeight;
  nav?.classList.toggle("is-scrolled",y>30);
  if(progress)progress.style.width=`${max>0?Math.min(100,y/max*100):0}%`;
  if(!reduced&&heroVisual){
    heroVisual.style.setProperty("--hero-shift",innerWidth>900?`${Math.min(26,y*.032)}px`:"0px");
  }
  if(!reduced&&cutRing&&innerWidth>720){
    const r=cutRing.parentElement.getBoundingClientRect();
    const delta=(innerHeight/2)-(r.top+r.height/2);
    cutRing.style.setProperty("--ring-shift",`${Math.max(-22,Math.min(22,delta*.032))}px`);
  }
  scrollTick=false;
}
addEventListener("scroll",()=>{
  if(!scrollTick){requestAnimationFrame(renderScroll);scrollTick=true}
},{passive:true});
addEventListener("resize",renderScroll,{passive:true});
renderScroll();

const glow=document.getElementById("cursorGlow");
if(fine&&!reduced&&glow){
  glow.style.opacity="1";
  addEventListener("pointermove",e=>{
    glow.style.left=`${e.clientX}px`;
    glow.style.top=`${e.clientY}px`;
  },{passive:true});
}

const vault=document.getElementById("hardwareVault");
function setSpot(x,y){
  if(!vault)return;
  vault.style.setProperty("--spot-x",`${x}%`);
  vault.style.setProperty("--spot-y",`${y}%`);
}
if(vault){
  if(fine&&!reduced){
    vault.addEventListener("pointermove",e=>{
      const r=vault.getBoundingClientRect();
      const x=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));
      const y=Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100));
      setSpot(x,y);
      vault.style.transform=`perspective(1200px) rotateX(${(.5-y/100)*3.2}deg) rotateY(${(x/100-.5)*4.2}deg)`;
    });
    vault.addEventListener("pointerleave",()=>{setSpot(68,45);vault.style.transform=""});
  }else if(!reduced){
    let t=0;
    (function drift(){
      t+=.009;
      setSpot(52+Math.sin(t)*29,45+Math.cos(t*.8)*18);
      requestAnimationFrame(drift);
    })();
  }
  vault.addEventListener("pointerdown",e=>{
    const r=vault.getBoundingClientRect();
    setSpot((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100);
    vault.classList.add("is-peeking");
    clearTimeout(vault._peekTimer);
    vault._peekTimer=setTimeout(()=>vault.classList.remove("is-peeking"),900);
  },{passive:true});
}

document.querySelectorAll(".tilt-card").forEach(card=>{
  if(!fine||reduced)return;
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;
    card.style.setProperty("--x",`${x*100}%`);
    card.style.setProperty("--y",`${y*100}%`);
    card.style.transform=`perspective(900px) rotateX(${(.5-y)*4}deg) rotateY(${(x-.5)*5}deg) translateY(-3px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

const magnetic=document.querySelector(".magnetic");
if(magnetic&&fine&&!reduced){
  magnetic.addEventListener("pointermove",e=>{
    const r=magnetic.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    magnetic.style.transform=`translate(${x*.07}px,${y*.1}px) translateY(-2px)`;
  });
  magnetic.addEventListener("pointerleave",()=>magnetic.style.transform="");
}

if(redacted&&!reduced){
  setInterval(()=>{
    redactIndex=(redactIndex+1)%redactStates[lang].length;
    redacted.classList.remove("glitch");
    void redacted.offsetWidth;
    redacted.textContent=redactStates[lang][redactIndex];
    redacted.classList.add("glitch");
  },2200);
}

(function particles(){
  const canvas=document.getElementById("particles");
  if(!canvas||reduced)return;
  const ctx=canvas.getContext("2d");
  const dpr=Math.min(devicePixelRatio||1,2);
  let w=0,h=0,dots=[],raf=0,running=true;
  function resize(){
    w=innerWidth;h=innerHeight;
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
    canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=Math.min(74,Math.max(22,Math.floor(w*h/24000)));
    dots=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.1+.2,vx:(Math.random()-.5)*.065,vy:-Math.random()*.07-.015,a:Math.random()*.22+.035}));
  }
  function frame(){
    if(!running)return;
    ctx.clearRect(0,0,w,h);
    for(const d of dots){
      d.x+=d.vx;d.y+=d.vy;
      if(d.y<-8)d.y=h+8;if(d.x<-8)d.x=w+8;if(d.x>w+8)d.x=-8;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(154,220,247,${d.a})`;ctx.fill();
    }
    raf=requestAnimationFrame(frame);
  }
  resize();frame();
  addEventListener("resize",resize,{passive:true});
  document.addEventListener("visibilitychange",()=>{
    running=!document.hidden;
    if(!running)cancelAnimationFrame(raf);else frame();
  });
})();
