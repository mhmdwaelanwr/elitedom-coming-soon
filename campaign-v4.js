/* Final campaign copy + brand semantics.
   Merge once into the core locale map; the existing language switcher then owns all text updates. */
(() => {
  const COPY = {
    en: {
      access:'ACCESS RESTRICTED', prelaunch:'PRE-LAUNCH SIGNAL', heroA:'SOMETHING', heroB:'IS COMING.',
      heroText:'A new hardware destination for serious builds, original parts, and a cleaner buying experience is almost ready. You found it early.',
      intercept:'FOLLOW THE SIGNAL', core:'CORE SYSTEM', catalog:'PRODUCT FEED', public:'PUBLIC ACCESS', online:'ONLINE', classified:'CLASSIFIED', denied:'DENIED',
      feed:'PRODUCT FEED // CLASSIFIED', move:'MOVE TO REVEAL // LIMITED ACCESS', moveTouch:'TAP TO REVEAL // LIMITED ACCESS', scroll:'SCROLL TO INTERCEPT',
      incoming:'INCOMING SIGNAL', whatA:'WHAT ARE WE', whatB:'BUILDING?', glimpse:'A small glimpse is enough to know something serious is coming. The rest stays locked until launch.',
      card1Title:'ORIGINAL PARTS. BETTER BUILDS.', card1Text:'From a first PC to a serious upgrade, Elitedom is being built to make choosing the right hardware clearer and easier.',
      card2Title:'CLEARER. FASTER. SMARTER.', card2Text:'Sharper discovery, cleaner comparisons, and a storefront designed around how people actually shop for hardware.',
      card3Title:'SUPPORT THAT STAYS.', card3Text:'A strong store should not disappear after checkout. The experience is being designed to stay useful before and after the sale.',
      behind:'BEHIND THE CURTAIN', systemA:'THE STORE', systemB:'IS BOOTING.', systemText:'What you see is only the signal. The full catalogue and Elitedom experience stay locked until launch.',
      calibrating:'CALIBRATING', soon:'SOON', interrupted:'SIGNAL INTERRUPTED', enough:'THE REST IS FOR LAUNCH.', dark:'We have revealed just enough. Everything else goes back into the dark for now.',
      stay:'STAY TUNED', waitA:'THE WAIT WON’T', waitB:'BE LONG.', finalText:'When public access opens, this page disappears and the full Elitedom store begins.', state:'CURRENT STATE', comingSoon:'COMING SOON', rights:'All rights reserved.',
      performance:'ORIGINAL PARTS', hardware:'PC BUILDS', gaming:'GAMING', power:'SUPPORT', catGaming:'GAMING', catBuilds:'PC BUILDS', catComponents:'COMPONENTS', catPeripherals:'PERIPHERALS', catAudio:'AUDIO', catNetwork:'NETWORKING'
    },
    ar: {
      access:'الدخول مقيّد', prelaunch:'إشارة قبل الإطلاق', heroA:'القادم', heroB:'مختلف.',
      heroText:'متجر جديد للهاردوير والتجميعات والقطع الأصلية بيتجهّز للانطلاق. وصلت بدري… قبل ما الأبواب تتفتح.',
      intercept:'شوف الإشارة', core:'النظام الأساسي', catalog:'المنتجات', public:'الدخول العام', online:'جاهز', classified:'محجوب', denied:'مغلق',
      feed:'المنتجات // محجوبة', move:'حرّك الماوس واكشف جزء // وصول محدود', moveTouch:'المس واكشف جزء // وصول محدود', scroll:'كمّل الإشارة',
      incoming:'إشارة وصلت', whatA:'إيه اللي', whatB:'بنجهّزه؟', glimpse:'لمحة صغيرة تكفي تعرف إن في حاجة كبيرة جاية — والباقي هنسيبه ليوم الإطلاق.',
      card1Title:'قطع أصلية. اختيار صح.', card1Text:'من أول تجميعة لحد أقوى ترقية، هدفنا نسهّل عليك تختار الهاردوير المناسب بثقة ومن غير تعقيد.',
      card2Title:'أوضح. أسرع. أريح.', card2Text:'بحث أسرع، مقارنة أوضح، وتجربة شراء معمولة للي فعلًا بيدوّر على هاردوير كويس.',
      card3Title:'بعد الشراء مش بنختفي.', card3Text:'دعم حقيقي قبل الشراء وبعده، لأن المتجر القوي مش بيقف عند شاشة الدفع.',
      behind:'ورا الكواليس', systemA:'المتجر', systemB:'بيتجهّز.', systemText:'اللي قدامك مجرد لمحة. الكتالوج والتجربة الكاملة لسه مقفولين لحد يوم الإطلاق.',
      calibrating:'قيد التجهيز', soon:'قريبًا', interrupted:'الإشارة اتقطعت', enough:'الباقي لوقت الإطلاق.', dark:'كشفنا القدر اللي يخليك تعرف إن في حاجة تستاهل الانتظار. الباقي لسه في الضلمة.',
      stay:'خليك متابع', waitA:'الإطلاق', waitB:'أقرب مما تتوقع.', finalText:'أول ما الأبواب تتفتح، الصفحة دي تختفي وتبدأ تجربة Elitedom الكاملة.', state:'الحالة الحالية', comingSoon:'قريبًا', rights:'جميع الحقوق محفوظة.',
      performance:'قطع أصلية', hardware:'تجميعات', gaming:'جيمينج', power:'دعم', catGaming:'جيمينج', catBuilds:'تجميعات كمبيوتر', catComponents:'مكوّنات', catPeripherals:'ملحقات', catAudio:'صوتيات', catNetwork:'شبكات'
    }
  };

  if (typeof translations !== 'undefined') {
    Object.assign(translations.en, COPY.en);
    Object.assign(translations.ar, COPY.ar);
  }

  const currentLang = () => document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const $ = selector => document.querySelector(selector);

  const syncCampaignChrome = () => {
    const lang = currentLang();
    const map = COPY[lang];

    const vaultHint = $('.vault__hint');
    if (vaultHint) vaultHint.textContent = map[matchMedia('(pointer:fine)').matches ? 'move' : 'moveTouch'];

    const vaultCode = $('.vault__code');
    if (vaultCode) vaultCode.textContent = 'ELITEDOM // VAULT-01';

    const terminalTitle = $('.terminal__bar>span');
    if (terminalTitle) terminalTitle.innerHTML = lang === 'ar'
      ? '<span class="terminal-brand" dir="ltr">ELITEDOM //</span><span class="terminal-locale-title">مركز الإطلاق</span>'
      : '<span class="terminal-brand" dir="ltr">ELITEDOM //</span><span class="terminal-locale-title">LAUNCH CONTROL</span>';

    const encrypted = $('.terminal__bar>b');
    if (encrypted) encrypted.textContent = lang === 'ar' ? 'مشفّر' : 'ENCRYPTED';

    const labels = ['› core.system','› original.parts','› storefront.ui','› public.access','› launch.sequence','› _'];
    document.querySelectorAll('.terminal__log p').forEach((row, i) => {
      const label = row.querySelector('span');
      if (label && labels[i]) label.textContent = labels[i];
    });

    let redacted = $('.vault__redacted');
    if (!redacted) {
      redacted = document.createElement('div');
      redacted.className = 'vault__redacted';
      redacted.innerHTML = '<i></i><span></span>';
      $('.vault')?.appendChild(redacted);
    }
    const redactedText = redacted?.querySelector('span');
    if (redactedText) redactedText.textContent = lang === 'ar' ? 'PREVIEW // محجوب جزئيًا' : 'PREVIEW // PARTIALLY REDACTED';
  };

  /* Re-apply once after merging final copy. This happens in the same deferred script task,
     before the browser presents the finished page. */
  if (typeof applyLanguage === 'function') applyLanguage(currentLang(), false);
  syncCampaignChrome();

  /* Core applyLanguage already updates every [data-i18n] node on click.
     Only the non-data chrome above needs one cheap post-switch sync. */
  document.getElementById('languageToggle')?.addEventListener('click', () => requestAnimationFrame(syncCampaignChrome));
})();
