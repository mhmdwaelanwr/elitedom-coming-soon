/* Final language/cinematic pass based on the recorded production review. */
(() => {
  const LRI='\u2066', PDI='\u2069';
  const brand=`${LRI}Elitedom${PDI}`;

  if(typeof translations!=='undefined' && translations.ar){
    Object.assign(translations.ar,{
      access:'الوصول مقيّد',
      prelaunch:'إشارة قبل الإطلاق',
      heroA:'القادم',
      heroB:'مختلف.',
      heroText:'تجربة جديدة للهاردوير والتقنية تقترب من الانطلاق. وصلت مبكرًا… قبل أن تُفتح الأبواب.',
      intercept:'تتبّع الإشارة',
      core:'النظام الأساسي',
      catalog:'الكتالوج',
      public:'الدخول العام',
      online:'يعمل',
      classified:'محجوب',
      denied:'مغلق',
      feed:'كتالوج المنتجات // محجوب',
      move:'حرّك المؤشر لاكتشاف لمحة // وصول محدود',
      moveTouch:'المس لاكتشاف لمحة // وصول محدود',
      scroll:'تابع الإشارة',
      incoming:'تم التقاط الإشارة',
      whatA:'ماذا',
      whatB:'نُجهّز؟',
      glimpse:'لمحة تكفي لتعرف أن القادم مختلف — والباقي نتركه ليوم الإطلاق.',
      card1Title:'لتجميعتك القادمة',
      card1Text:'من أول تجميعة إلى أقوى ترقية، نصمم تجربة توصلك إلى الهاردوير المناسب بثقة ووضوح.',
      card2Title:'سرعة. وضوح. ثقة.',
      card2Text:'اختيارات أوضح، بحث أسرع، وتجربة شراء تليق بمستوى التقنية التي نقدّمها.',
      card3Title:'أكثر من متجر',
      card3Text:`الإطلاق مجرد البداية. نبني ${brand} ليكون وجهتك للهاردوير والتقنية — اليوم وما بعده.`,
      behind:'خلف الستار',
      systemA:'المنظومة',
      systemB:'تستعد.',
      systemText:`هذه الصفحة مجرد إشارة. تجربة ${brand} الكاملة ستظل خلف الستار حتى لحظة الإطلاق.`,
      calibrating:'قيد التجهيز',
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
      performance:'أداء',
      hardware:'هاردوير',
      gaming:'ألعاب',
      power:'قوة',
      catGaming:'ألعاب',
      catBuilds:'تجميعات كمبيوتر',
      catComponents:'مكوّنات',
      catPeripherals:'ملحقات',
      catAudio:'صوتيات',
      catNetwork:'شبكات',
      bootSignal:'جارٍ تأمين الإشارة',
      launchControl:'مركز الإطلاق',
      encrypted:'مشفّر'
    });
  }

  document.querySelectorAll('link[href*="polish.css?v=2"]').forEach(link=>link.remove());
  const finalSheet=document.querySelector('link[href*="final-polish.css"]');
  if(finalSheet)document.head.appendChild(finalSheet);

  const syncLocaleDetails=()=>{
    const ar=document.documentElement.dir==='rtl';
    const rights=document.querySelector('[data-i18n="rights"]');
    if(rights)rights.setAttribute('dir',ar?'rtl':'ltr');
    const copyright=document.querySelector('.copyright');
    if(copyright)copyright.setAttribute('dir','ltr');
  };

  if(typeof applyLanguage==='function'){
    const current=document.documentElement.lang==='ar'?'ar':'en';
    applyLanguage(current,false);
    syncLocaleDetails();
  }

  const langButton=document.getElementById('languageToggle');
  langButton?.addEventListener('click',()=>requestAnimationFrame(syncLocaleDetails));

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