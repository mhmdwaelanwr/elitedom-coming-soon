/* Final language/cinematic pass. Copy is authored separately for English and Arabic. */
(() => {
  const LRI='\u2066', PDI='\u2069';
  const brand=`${LRI}Elitedom${PDI}`;

  if(typeof translations!=='undefined' && translations.en){
    Object.assign(translations.en,{
      access:'ACCESS RESTRICTED',
      prelaunch:'PRE-LAUNCH SIGNAL',
      heroA:'SOMETHING',
      heroB:'IS COMING.',
      heroText:'A new standard for hardware and technology shopping is almost here. You found the signal before the doors opened.',
      intercept:'INTERCEPT SIGNAL',
      core:'CORE SYSTEM',
      catalog:'CATALOGUE',
      public:'PUBLIC ACCESS',
      online:'ONLINE',
      classified:'CLASSIFIED',
      denied:'DENIED',
      feed:'PRODUCT FEED // CLASSIFIED',
      move:'MOVE TO REVEAL // LIMITED ACCESS',
      moveTouch:'TAP TO REVEAL // LIMITED ACCESS',
      scroll:'SCROLL TO INTERCEPT',
      incoming:'INCOMING SIGNAL',
      whatA:'WHAT ARE WE',
      whatB:'BUILDING?',
      glimpse:'Enough to know something serious is coming — not enough to spoil the launch.',
      card1Title:'BUILT FOR REAL SETUPS',
      card1Text:'From a first build to a serious upgrade, we are shaping the experience around the hardware people actually want.',
      card2Title:'FAST. CLEAR. TRUSTED.',
      card2Text:'Faster discovery, clearer choices, and a storefront designed to feel as refined as the technology it carries.',
      card3Title:'MORE THAN A STORE',
      card3Text:'Launch is only the beginning. Elitedom is being built as a destination for hardware, setups, and technology.',
      behind:'BEHIND THE CURTAIN',
      systemA:'THE SYSTEM',
      systemB:'IS BOOTING.',
      systemText:'This page is only the signal. The full Elitedom experience stays behind the curtain until launch.',
      calibrating:'CALIBRATING',
      soon:'SOON',
      interrupted:'SIGNAL INTERRUPTED',
      enough:"YOU'VE SEEN ENOUGH.",
      dark:'The rest stays in the dark until launch.',
      stay:'STAY TUNED',
      waitA:"THE WAIT WON'T",
      waitB:'BE LONG.',
      finalText:'When public access opens, this page disappears and the Elitedom experience begins.',
      state:'CURRENT STATE',
      comingSoon:'COMING SOON',
      rights:'All rights reserved.',
      performance:'PERFORMANCE',hardware:'HARDWARE',gaming:'GAMING',power:'POWER',
      catGaming:'GAMING',catBuilds:'PC BUILDS',catComponents:'COMPONENTS',catPeripherals:'PERIPHERALS',catAudio:'AUDIO',catNetwork:'NETWORKING',
      bootSignal:'ESTABLISHING SECURE SIGNAL',launchControl:'LAUNCH CONTROL',encrypted:'ENCRYPTED'
    });
  }

  if(typeof translations!=='undefined' && translations.ar){
    Object.assign(translations.ar,{
      access:'الوصول مقيّد',
      prelaunch:'إشارة قبل الإطلاق',
      heroA:'القادم',
      heroB:'مختلف.',
      heroText:'تجربة جديدة لشراء الهاردوير والتقنية تقترب من الانطلاق. وصلت مبكرًا… قبل أن تُفتح الأبواب.',
      intercept:'تتبّع الإشارة',
      core:'النظام الأساسي',
      catalog:'الكتالوج',
      public:'الدخول العام',
      online:'جاهز',
      classified:'محجوب',
      denied:'مغلق',
      feed:'كتالوج المنتجات // محجوب',
      move:'حرّك المؤشر لكشف لمحة // وصول محدود',
      moveTouch:'المس لكشف لمحة // وصول محدود',
      scroll:'تابع الإشارة',
      incoming:'تم التقاط الإشارة',
      whatA:'ماذا',
      whatB:'نُجهّز؟',
      glimpse:'لمحة تكفي لتدرك أن القادم مختلف — أما الباقي فليوم الإطلاق.',
      card1Title:'لتجميعتك القادمة',
      card1Text:'من أول تجميعة إلى أقوى ترقية، نصمم تجربة تساعدك على الوصول إلى الهاردوير المناسب بثقة ووضوح.',
      card2Title:'سرعة. وضوح. ثقة.',
      card2Text:'اختيارات أوضح، بحث أسرع، وتجربة شراء تليق بالتقنية التي تبحث عنها.',
      card3Title:'أكثر من متجر',
      card3Text:`الإطلاق مجرد البداية. نبني ${brand} ليكون وجهتك للهاردوير والتقنية — اليوم وما بعده.`,
      behind:'خلف الستار',
      systemA:'المنظومة',
      systemB:'تستعد.',
      systemText:`هذه الصفحة مجرد إشارة. تجربة ${brand} الكاملة ستظل خلف الستار حتى لحظة الإطلاق.`,
      calibrating:'قيد الضبط',
      soon:'قريبًا',
      interrupted:'انقطعت الإشارة',
      enough:'هذا كل ما سنكشفه… الآن.',
      dark:'أما الباقي، فسيظل في الظل حتى يوم الإطلاق.',
      stay:'ترقّب',
      waitA:'الانطلاق',
      waitB:'أقرب مما تتوقع.',
      finalText:`عندما تُفتح الأبواب، تختفي هذه الصفحة وتبدأ تجربة ${brand}.`,
      state:'الحالة الحالية',
      comingSoon:'قريبًا',
      rights:'جميع الحقوق محفوظة.',
      performance:'أداء',hardware:'هاردوير',gaming:'ألعاب',power:'قوة',
      catGaming:'ألعاب',catBuilds:'تجميعات كمبيوتر',catComponents:'مكوّنات',catPeripherals:'ملحقات',catAudio:'صوتيات',catNetwork:'شبكات',
      bootSignal:'جارٍ تأمين الإشارة',launchControl:'مركز الإطلاق',encrypted:'مشفّر'
    });
  }

  /* v3 injects a legacy polish stylesheet. Keep only the current head-loaded version. */
  document.querySelectorAll('link[href*="polish.css?v=2"]').forEach(link=>link.remove());
  const finalSheet=document.querySelector('link[href*="final-polish.css"]');
  if(finalSheet)document.head.appendChild(finalSheet);

  /* v3 previously forced the temporary hand-made mark. Always restore the official brand asset. */
  const favicon=document.querySelector('link[rel="icon"]');
  if(favicon){
    favicon.href='assets/Elitedom_Logomark_White.svg';
    favicon.type='image/svg+xml';
  }

  const syncLocaleDetails=()=>{
    const ar=document.documentElement.dir==='rtl';
    const rights=document.querySelector('[data-i18n="rights"]');
    if(rights)rights.setAttribute('dir',ar?'rtl':'ltr');
    const copyright=document.querySelector('.copyright');
    if(copyright)copyright.setAttribute('dir','ltr');
    document.title=ar?'Elitedom — القادم مختلف':'Elitedom — Something Is Coming';
  };

  if(typeof applyLanguage==='function'){
    const current=document.documentElement.lang==='ar'?'ar':'en';
    applyLanguage(current,false);
    syncLocaleDetails();
  }

  const langButton=document.getElementById('languageToggle');
  langButton?.addEventListener('click',()=>requestAnimationFrame(syncLocaleDetails));

  /* Cinematic auto-hiding navigation is desktop-only; mobile-stability.css keeps it static. */
  const nav=document.getElementById('nav');
  let lastY=window.scrollY;
  let ticking=false;
  const updateNav=()=>{
    const y=window.scrollY;
    const delta=y-lastY;
    if(nav){
      if(y<110 || delta<-6)nav.classList.remove('is-hidden');
      else if(y>170 && delta>7)nav.classList.add('is-hidden');
    }
    lastY=y;
    ticking=false;
  };
  addEventListener('scroll',()=>{
    if(!ticking){requestAnimationFrame(updateNav);ticking=true;}
  },{passive:true});

  /* Mixed Arabic/Latin terminal title stays deterministic across language changes. */
  const fixTerminalHeader=()=>{
    const wrap=document.querySelector('.terminal__bar>span');
    const brandPart=wrap?.querySelector('.terminal-brand');
    const localePart=wrap?.querySelector('.terminal-locale-title');
    if(wrap){wrap.setAttribute('dir','ltr');wrap.style.direction='ltr';}
    if(brandPart)brandPart.setAttribute('dir','ltr');
    if(localePart)localePart.setAttribute('dir',document.documentElement.dir==='rtl'?'rtl':'ltr');
  };
  fixTerminalHeader();
  langButton?.addEventListener('click',()=>requestAnimationFrame(fixTerminalHeader));
})();