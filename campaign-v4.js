/* Final campaign voice + brand story.
   One source of truth for EN/AR. Egyptian Arabic stays natural and premium,
   while English stays concise and global. Easter eggs are event-driven only. */
(() => {
  /* Story progression is intentionally explicit rather than date-driven.
     Advancing the campaign later is one safe config change instead of a redesign. */
  const STORY_PHASES = {
    1: { vault:'VAULT-01', state:'LOCKED' },
    2: { vault:'VAULT-02', state:'STANDBY' },
    3: { vault:'VAULT-03', state:'READY' }
  };
  const ACTIVE_PHASE = 1;
  const STORY = STORY_PHASES[ACTIVE_PHASE];
  document.documentElement.dataset.storyPhase = String(ACTIVE_PHASE);

  const COPY = {
    en: {
      access:'ACCESS RESTRICTED', prelaunch:'PRE-LAUNCH SIGNAL', heroA:'SOMETHING', heroB:'IS COMING.',
      heroText:'Hardware, PC builds, and original parts — the way PC people always wanted to shop. Clear choices, less noise. You found us early.',
      intercept:'SEE WHAT’S COMING', core:'CORE SYSTEM', catalog:'PRODUCT FEED', public:'PUBLIC ACCESS', online:'ONLINE', classified:'CLASSIFIED', denied:'LOCKED',
      feed:'PRODUCT FEED // CLASSIFIED', move:'MOVE TO REVEAL // LIMITED ACCESS', moveTouch:'TAP TO REVEAL // LIMITED ACCESS', scroll:'KEEP GOING',
      incoming:'SIGNAL RECEIVED', whatA:'WHAT’S', whatB:'COMING?', glimpse:'Just a glimpse. Not everything needs to be revealed early.',
      card1Title:'THE RIGHT PART. LESS GUESSWORK.', card1Text:'First build or an upgrade you’ve been planning for weeks? You should know what you’re buying and why — without the runaround.',
      card2Title:'SEARCH LESS. CHOOSE FASTER.', card2Text:'We know one PC part can turn into 17 open tabs. Search and comparisons should make the decision clearer, not harder.',
      card3Title:'AFTER CHECKOUT? WE’RE STILL HERE.', card3Text:'A question after you pay is still a question. Support is part of the experience, not something that disappears after the order.',
      behind:'BEHIND THE SCENES', systemA:'THE STORE', systemB:'IS GETTING READY.', systemText:'This is only the signal. The real store is still behind the door — until launch.',
      calibrating:'GETTING READY', soon:'SOON', interrupted:'SIGNAL CUT', enough:'THAT’S ENOUGH FOR NOW.', dark:'The rest isn’t for today.',
      stay:'STAY CLOSE', waitA:'LAUNCH IS', waitB:'GETTING CLOSER.', finalText:'When the doors open, this page disappears. Then the real thing starts.', state:'RIGHT NOW', comingSoon:'COMING SOON', rights:'All rights reserved.',
      performance:'ORIGINAL PARTS', hardware:'PC BUILDS', gaming:'GAMING', power:'SUPPORT', catGaming:'GAMING', catBuilds:'PC BUILDS', catComponents:'COMPONENTS', catPeripherals:'PERIPHERALS', catAudio:'AUDIO', catNetwork:'NETWORKING',
      finaleOrigin:'BUILT HERE. AIMED HIGHER.'
    },
    ar: {
      access:'الدخول لسه مقفول', prelaunch:'إشارة قبل الإطلاق', heroA:'القادم', heroB:'مختلف.',
      heroText:'هاردوير، تجميعات، وقطع أصلية… بالطريقة اللي كنا نفسنا نشتري بيها من زمان. اختيار أوضح، ومن غير لف كتير. وإنت وصلت بدري.',
      intercept:'شوف اللي جاي', core:'النظام', catalog:'المنتجات', public:'الدخول العام', online:'شغّال', classified:'محجوب', denied:'مقفول',
      feed:'المنتجات // لسه محجوبة', move:'حرّك الماوس واكشف لمحة // وصول محدود', moveTouch:'المس واكشف لمحة // وصول محدود', scroll:'كمّل تحت',
      incoming:'الإشارة وصلت', whatA:'إيه اللي', whatB:'جاي؟', glimpse:'هنوريك لمحة بس. مش كل حاجة تتقال قبل وقتها.',
      card1Title:'القطعة الصح. من غير لف كتير.', card1Text:'أول تجميعة ولا Upgrade بقالك فترة بتفكر فيه؟ عاوزينك تعرف إنت بتشتري إيه وليه — ببساطة.',
      card2Title:'دوّر أقل. اختار أسرع.', card2Text:'إحنا عارفين إن اختيار قطعة واحدة ممكن يفتح 17 تاب. عشان كده البحث والمقارنة لازم يسهّلوا القرار، مش يعقّدوه.',
      card3Title:'بعد ما تشتري؟ إحنا لسه موجودين.', card3Text:'السؤال بعد الدفع لسه سؤال. الدعم جزء من التجربة، مش حاجة تختفي بعد الأوردر.',
      behind:'ورا الكواليس', systemA:'المتجر', systemB:'بيتجهّز.', systemText:'اللي قدامك مجرد إشارة. المتجر الحقيقي لسه ورا الباب — وهيفتح في وقته.',
      calibrating:'بيتجهّز', soon:'قريبًا', interrupted:'الإشارة اتقطعت', enough:'كفاية لحد كده.', dark:'الباقي مش وقته لسه.',
      stay:'خليك قريب', waitA:'الإطلاق', waitB:'أقرب مما تتوقع.', finalText:'أول ما نفتح، الصفحة دي هتختفي… وساعتها يبدأ الجد.', state:'دلوقتي', comingSoon:'قريبًا', rights:'جميع الحقوق محفوظة.',
      performance:'قطع أصلية', hardware:'تجميعات', gaming:'جيمينج', power:'دعم', catGaming:'جيمينج', catBuilds:'تجميعات كمبيوتر', catComponents:'مكوّنات', catPeripherals:'إكسسوارات', catAudio:'صوتيات', catNetwork:'شبكات',
      finaleOrigin:'من هنا… لحاجة أكبر.'
    }
  };

  if (typeof translations !== 'undefined') {
    Object.assign(translations.en, COPY.en);
    Object.assign(translations.ar, COPY.ar);
  }

  /* Keep the existing redacted animation, but hide one Cairo signature inside it.
     No extra timer is created; this only changes the states used by the existing desktop loop. */
  if (typeof redactStates !== 'undefined') {
    redactStates.en.splice(0, redactStates.en.length,
      '[REDACTED]','[LOCKED]','[SOON]','[REDACTED]','[CAIRO]','[LOCKED]');
    redactStates.ar.splice(0, redactStates.ar.length,
      '[محجوب]','[مقفول]','[قريبًا]','[محجوب]','[القاهرة]','[مقفول]');
  }

  const currentLang = () => document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const $ = selector => document.querySelector(selector);

  const syncCampaignChrome = () => {
    const lang = currentLang();
    const map = COPY[lang];
    const vault = $('.vault');

    const vaultHint = $('.vault__hint');
    if (vaultHint) vaultHint.textContent = map[matchMedia('(pointer:fine)').matches ? 'move' : 'moveTouch'];

    const vaultCode = $('.vault__code');
    if (vaultCode) vaultCode.textContent = `ELITEDOM // ${STORY.vault}`;

    let origin = $('.vault__origin');
    if (!origin && vault) {
      origin = document.createElement('div');
      origin.className = 'vault__origin';
      origin.setAttribute('dir','ltr');
      origin.textContent = 'SIGNAL ORIGIN // CAIRO, EG';
      vault.appendChild(origin);
    }

    let easter = $('.vault__easter');
    if (!easter && vault) {
      easter = document.createElement('div');
      easter.className = 'vault__easter';
      easter.setAttribute('aria-hidden','true');
      vault.appendChild(easter);
    }

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
    if (!redacted && vault) {
      redacted = document.createElement('div');
      redacted.className = 'vault__redacted';
      redacted.innerHTML = '<i></i><span></span>';
      vault.appendChild(redacted);
    }
    const redactedText = redacted?.querySelector('span');
    if (redactedText) redactedText.textContent = lang === 'ar' ? 'معاينة // محجوبة جزئيًا' : 'PREVIEW // PARTIALLY REDACTED';

    let finaleOrigin = $('.finale__origin');
    const finaleState = $('.finale__state');
    if (!finaleOrigin && finaleState) {
      finaleOrigin = document.createElement('div');
      finaleOrigin.className = 'finale__origin';
      finaleState.insertAdjacentElement('afterend', finaleOrigin);
    }
    if (finaleOrigin) {
      finaleOrigin.innerHTML = `<span dir="ltr">CAIRO, EG //</span><strong>${map.finaleOrigin}</strong>`;
      finaleOrigin.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }
  };

  if (typeof applyLanguage === 'function') applyLanguage(currentLang(), false);
  syncCampaignChrome();

  document.getElementById('languageToggle')?.addEventListener('click', () => requestAnimationFrame(syncCampaignChrome));

  /* Lightweight vault easter egg: no animation loop, no polling.
     Desktop reveals it after a deliberate hover; touch reveals it after a deliberate long press. */
  const vault = $('.vault');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let revealTimer = 0;
  let hideTimer = 0;

  const showEarlyMessage = () => {
    const easter = $('.vault__easter');
    if (!easter) return;
    clearTimeout(hideTimer);
    easter.textContent = currentLang() === 'ar' ? 'FILE 01 // إنت وصلت بدري.' : 'FILE 01 // YOU’RE EARLY.';
    easter.classList.add('is-visible');
    hideTimer = window.setTimeout(() => easter.classList.remove('is-visible'), reduced ? 900 : 1800);
  };

  if (vault) {
    if (matchMedia('(pointer:fine) and (min-width:821px)').matches) {
      vault.addEventListener('pointerenter', () => {
        clearTimeout(revealTimer);
        revealTimer = window.setTimeout(showEarlyMessage, 2600);
      }, {passive:true});
      vault.addEventListener('pointerleave', () => {
        clearTimeout(revealTimer);
        revealTimer = 0;
      }, {passive:true});
    } else {
      vault.addEventListener('pointerdown', () => {
        clearTimeout(revealTimer);
        revealTimer = window.setTimeout(showEarlyMessage, 850);
      }, {passive:true});
      const cancelLongPress = () => { clearTimeout(revealTimer); revealTimer = 0; };
      vault.addEventListener('pointerup', cancelLongPress, {passive:true});
      vault.addEventListener('pointercancel', cancelLongPress, {passive:true});
      vault.addEventListener('pointerleave', cancelLongPress, {passive:true});
    }
  }

  /* Third easter egg: the terminal prompt can briefly trace the signal back to Cairo.
     Click/tap only; no observers or continuous work. */
  const cursorRow = $('.terminal__cursor');
  const cursorLabel = cursorRow?.querySelector('span');
  const cursorStatus = cursorRow?.querySelector('b');
  let traceTimer = 0;
  cursorRow?.addEventListener('click', () => {
    clearTimeout(traceTimer);
    if (cursorLabel) cursorLabel.textContent = '› origin.trace';
    if (cursorStatus) cursorStatus.textContent = 'CAIRO, EG';
    cursorRow.classList.add('is-tracing');
    traceTimer = window.setTimeout(() => {
      if (cursorLabel) cursorLabel.textContent = '› _';
      if (cursorStatus) cursorStatus.textContent = '';
      cursorRow.classList.remove('is-tracing');
    }, 1800);
  });
})();
