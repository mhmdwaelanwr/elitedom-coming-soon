/* Final campaign copy + brand semantics.
   Merge once into the core locale map; the existing language switcher then owns all text updates. */
(() => {
  const COPY = {
    en: {
      access:'ACCESS RESTRICTED', prelaunch:'PRE-LAUNCH SIGNAL', heroA:'SOMETHING', heroB:'IS COMING.',
      heroText:'A hardware store built for real PC people is almost ready. Original parts, clearer choices, and a better way to shop. You found it early.',
      intercept:'SEE WHAT’S COMING', core:'CORE SYSTEM', catalog:'PRODUCT FEED', public:'PUBLIC ACCESS', online:'ONLINE', classified:'CLASSIFIED', denied:'LOCKED',
      feed:'PRODUCT FEED // CLASSIFIED', move:'MOVE TO REVEAL // LIMITED ACCESS', moveTouch:'TAP TO REVEAL // LIMITED ACCESS', scroll:'KEEP GOING',
      incoming:'SIGNAL RECEIVED', whatA:'WHAT’S', whatB:'COMING?', glimpse:'We’ll show you just enough. The rest stays locked until launch day.',
      card1Title:'ORIGINAL PARTS. LESS GUESSWORK.', card1Text:'Whether it’s your first build or your next upgrade, finding the right hardware should feel simple — not confusing.',
      card2Title:'FIND IT FASTER.', card2Text:'Cleaner search, easier comparisons, and a store built around the way people actually shop for hardware.',
      card3Title:'MORE THAN CHECKOUT.', card3Text:'Good support should not disappear after you pay. Elitedom is being built to stay useful before and after the sale.',
      behind:'BEHIND THE SCENES', systemA:'THE STORE', systemB:'IS GETTING READY.', systemText:'What you see now is only a preview. The full catalogue and the complete Elitedom experience stay locked until launch.',
      calibrating:'GETTING READY', soon:'SOON', interrupted:'SIGNAL CUT', enough:'THAT’S ALL FOR NOW.', dark:'You’ve seen enough to know something worth waiting for is coming. The rest is for launch day.',
      stay:'STAY CLOSE', waitA:'LAUNCH IS', waitB:'GETTING CLOSER.', finalText:'When the doors open, this page disappears and the full Elitedom store goes live.', state:'RIGHT NOW', comingSoon:'COMING SOON', rights:'All rights reserved.',
      performance:'ORIGINAL PARTS', hardware:'PC BUILDS', gaming:'GAMING', power:'SUPPORT', catGaming:'GAMING', catBuilds:'PC BUILDS', catComponents:'COMPONENTS', catPeripherals:'PERIPHERALS', catAudio:'AUDIO', catNetwork:'NETWORKING'
    },
    ar: {
      access:'الدخول لسه مقفول', prelaunch:'إشارة قبل الإطلاق', heroA:'القادم', heroB:'مختلف.',
      heroText:'متجر هاردوير وتجميعات بيتجهّز بشكل مختلف. قطع أصلية، اختيار أوضح، وتجربة شراء أريح. وصلت بدري… قبل ما نفتح.',
      intercept:'شوف اللي جاي', core:'النظام', catalog:'المنتجات', public:'الدخول العام', online:'شغّال', classified:'محجوب', denied:'مقفول',
      feed:'المنتجات // لسه محجوبة', move:'حرّك الماوس واكشف لمحة // وصول محدود', moveTouch:'المس واكشف لمحة // وصول محدود', scroll:'كمّل تحت',
      incoming:'الإشارة وصلت', whatA:'إيه اللي', whatB:'جاي؟', glimpse:'هنوريك لمحة بس. كفاية تعرف إن في حاجة تستاهل الاستنى… والباقي يوم الإطلاق.',
      card1Title:'قطع أصلية. اختيار أسهل.', card1Text:'من أول تجميعة لحد أقوى ترقية، اختيار الهاردوير الصح المفروض يبقى سهل وواضح — مش وجع دماغ.',
      card2Title:'دوّر أقل. اختار أسرع.', card2Text:'بحث أنضف، مقارنة أوضح، وتجربة معمولة للي فعلًا بيدوّر على هاردوير كويس.',
      card3Title:'مش بس لحد الدفع.', card3Text:'الدعم الصح ما يختفيش بعد ما تدفع. بنبني Elitedom عشان يفضل معاك قبل الشراء وبعده.',
      behind:'ورا الكواليس', systemA:'المتجر', systemB:'بيتجهّز.', systemText:'اللي شايفه دلوقتي مجرد لمحة. الكتالوج الكامل وتجربة Elitedom كلها لسه مقفولة لحد يوم الإطلاق.',
      calibrating:'بيتجهّز', soon:'قريبًا', interrupted:'الإشارة اتقطعت', enough:'كفاية لحد كده.', dark:'ورّيناك كفاية يخليك تعرف إن في حاجة تستاهل الانتظار. الباقي هنسيبه ليوم الإطلاق.',
      stay:'خليك قريب', waitA:'الإطلاق', waitB:'أقرب مما تتوقع.', finalText:'أول ما نفتح، الصفحة دي هتختفي وتبدأ تجربة Elitedom كاملة.', state:'دلوقتي', comingSoon:'قريبًا', rights:'جميع الحقوق محفوظة.',
      performance:'قطع أصلية', hardware:'تجميعات', gaming:'جيمينج', power:'دعم', catGaming:'جيمينج', catBuilds:'تجميعات كمبيوتر', catComponents:'مكوّنات', catPeripherals:'إكسسوارات', catAudio:'صوتيات', catNetwork:'شبكات'
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
    if (redactedText) redactedText.textContent = lang === 'ar' ? 'معاينة // محجوبة جزئيًا' : 'PREVIEW // PARTIALLY REDACTED';
  };

  /* Re-apply once after merging final copy. This happens in the same deferred script task,
     before the browser presents the finished page. */
  if (typeof applyLanguage === 'function') applyLanguage(currentLang(), false);
  syncCampaignChrome();

  /* Core applyLanguage already updates every [data-i18n] node on click.
     Only the non-data chrome above needs one cheap post-switch sync. */
  document.getElementById('languageToggle')?.addEventListener('click', () => requestAnimationFrame(syncCampaignChrome));
})();
