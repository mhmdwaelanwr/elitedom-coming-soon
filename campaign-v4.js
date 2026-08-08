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
      finaleOrigin:'BUILT HERE. AIMED HIGHER.', socialFollow:'FOLLOW ELITEDOM'
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
      finaleOrigin:'من هنا… لحاجة أكبر.', socialFollow:'تابع Elitedom'
    }
  };

  const SOCIALS = [
    {name:'Instagram',icon:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none"/>'},
    {name:'Facebook',icon:'<path d="M14.2 8.1h3V4.3h-3.2c-3.3 0-5.2 2-5.2 5.3v2.3H6v4h2.8V22h4.1v-6.1h3.3l.6-4h-3.9V9.8c0-1.1.4-1.7 1.3-1.7z" fill="currentColor" stroke="none"/>'},
    {name:'TikTok',icon:'<path d="M14 4c.6 2.7 2.1 4.2 5 4.4v3.4c-1.8 0-3.4-.6-4.8-1.6v6.2a5.7 5.7 0 1 1-4.9-5.6v3.5a2.4 2.4 0 1 0 1.5 2.2V4H14z" fill="currentColor" stroke="none"/>'},
    {name:'YouTube',icon:'<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>'},
    {name:'X',icon:'<path d="M5 4h3.8l3.8 5 4.3-5H19l-5.4 6.4L19.5 20h-3.8l-4.2-5.6L6.8 20H4.5l5.9-7L5 4z" fill="currentColor" stroke="none"/>'},
    {name:'Threads',icon:'<path d="M12 3.5c-4.8 0-8 3.1-8 8.4 0 5.4 3.2 8.6 8.2 8.6 4.4 0 7.3-2.3 7.3-5.9 0-2.7-1.5-4.4-4.1-5.2-.6-2-2-3.1-4.2-3.1-2 0-3.5.8-4.4 2.3l2.4 1.4c.5-.8 1.1-1.2 2-1.2.8 0 1.4.3 1.8.9-3.8.1-5.7 1.4-5.7 3.9 0 2.1 1.7 3.6 4.3 3.6 2.5 0 4.3-1.3 4.6-3.5.6.5.8 1.1.8 1.9 0 2-1.7 3.1-4.8 3.1-3.5 0-5.6-2.3-5.6-6.8 0-4.2 2.1-6.6 5.5-6.6 2.6 0 4.5 1.2 5.5 3.6l2.3-1.1C18.4 5 15.8 3.5 12 3.5zm-.3 11.2c-1 0-1.7-.5-1.7-1.2 0-.9 1-1.4 3.2-1.4h.4c0 1.7-.7 2.6-1.9 2.6z" fill="currentColor" stroke="none"/>'},
    {name:'Discord',icon:'<path d="M8.2 7.2c1.2-.5 2.5-.8 3.8-.8s2.6.3 3.8.8l.6-1.1c1.7.5 3 1.2 4 2.1.8 3.1.8 6.2-.1 9.3-1.4 1-2.8 1.7-4.3 2.1l-1.1-1.5c.7-.3 1.3-.7 1.9-1.1-3.1 1.4-6.5 1.4-9.6 0 .6.4 1.2.8 1.9 1.1L8 19.6c-1.5-.4-2.9-1.1-4.3-2.1-.9-3.1-.9-6.2-.1-9.3 1-.9 2.3-1.6 4-2.1l.6 1.1zm1.1 4.1c-.9 0-1.6.8-1.6 1.9 0 1 .7 1.9 1.6 1.9.9 0 1.6-.8 1.6-1.9s-.7-1.9-1.6-1.9zm5.4 0c-.9 0-1.6.8-1.6 1.9 0 1 .7 1.9 1.6 1.9.9 0 1.6-.8 1.6-1.9s-.7-1.9-1.6-1.9z" fill="currentColor" stroke="none"/>'},
    {name:'LinkedIn',icon:'<rect x="3" y="9" width="4" height="12" rx=".8" fill="currentColor" stroke="none"/><circle cx="5" cy="5.5" r="2" fill="currentColor" stroke="none"/><path d="M10 9h3.8v1.7c.9-1.3 2.1-2 3.7-2 3 0 4.5 1.8 4.5 5.2V21h-4v-6.2c0-1.8-.6-2.7-2-2.7-1.5 0-2 1-2 3V21h-4V9z" fill="currentColor" stroke="none"/>'},
    {name:'Telegram',icon:'<path d="M21 4.5 17.8 20c-.2 1-1 1.2-1.8.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.8-8c.4-.4-.1-.6-.6-.3L5.6 13.7 1 12.2c-1-.3-1-1 .2-1.5L19.4 3.7c.9-.3 1.8.2 1.6.8z" fill="currentColor" stroke="none"/>'},
    {name:'WhatsApp',icon:'<path d="M12 3a8.5 8.5 0 0 0-7.3 12.8L3.5 21l5.4-1.4A8.5 8.5 0 1 0 12 3z"/><path d="M9 8.2c.3-.5.6-.5.9-.5h.5c.2 0 .4.1.5.5l.8 2c.1.3 0 .6-.2.8l-.6.7c-.2.2-.2.4 0 .7.6 1 1.5 1.9 2.5 2.5.3.2.5.2.7-.1l.8-1c.2-.3.5-.3.8-.2l1.9.9c.3.2.5.3.5.6 0 .4-.2 1.5-1 2.1-.7.6-1.6 1-2.8.7-1.2-.3-2.8-1-4.5-2.5-2-1.7-3.3-3.9-3.7-5.3-.4-1.4.4-2.9.9-3.5z" fill="currentColor" stroke="none"/>'}
  ];

  const SOCIAL_STYLE = `
    .social-footer{width:min(720px,100%);margin:28px auto 0;padding-top:22px;border-top:1px solid rgba(255,255,255,.065);display:flex;flex-direction:column;align-items:center;gap:15px}
    .social-footer__label{color:#607181;font-size:.58rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
    .social-dock{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;direction:ltr}
    .social-chip{width:40px;height:40px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.085);border-radius:12px;background:linear-gradient(145deg,rgba(255,255,255,.032),rgba(255,255,255,.012));color:#798896;box-shadow:inset 0 1px 0 rgba(255,255,255,.025);transition:transform .24s cubic-bezier(.2,.75,.25,1),border-color .24s ease,color .24s ease,background .24s ease,box-shadow .24s ease;cursor:default}
    .social-chip svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;overflow:visible}
    @media(pointer:fine) and (min-width:821px){.social-chip:hover{transform:translateY(-3px);color:#eaf8ff;border-color:rgba(119,216,255,.26);background:rgba(119,216,255,.055);box-shadow:0 12px 34px rgba(0,0,0,.24),0 0 24px rgba(119,216,255,.07)}}
    html[dir=rtl] .social-footer__label{font-family:'Alexandria',Tahoma,Arial,sans-serif;letter-spacing:0;text-transform:none;font-weight:650}
    @media(max-width:820px){.social-footer{width:min(560px,94%);margin-top:24px;padding-top:18px;gap:13px}.social-dock{gap:7px}.social-chip{width:37px;height:37px;border-radius:11px}.social-chip svg{width:17px;height:17px}}
    @media(max-width:430px){.social-footer{width:100%;margin-top:22px}.social-dock{max-width:300px;gap:6px}.social-chip{width:35px;height:35px;border-radius:10px}.social-chip svg{width:16px;height:16px}}
    @media(prefers-reduced-motion:reduce){.social-chip{transition:none!important}}
  `;

  if (!document.getElementById('elitedom-social-style')) {
    const style = document.createElement('style');
    style.id = 'elitedom-social-style';
    style.textContent = SOCIAL_STYLE;
    document.head.appendChild(style);
  }

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

    let socialFooter = $('.social-footer');
    const copyright = $('.copyright');
    if (!socialFooter && copyright) {
      socialFooter = document.createElement('div');
      socialFooter.className = 'social-footer';
      socialFooter.innerHTML = `
        <span class="social-footer__label"></span>
        <div class="social-dock" role="list" aria-label="Elitedom social channels">
          ${SOCIALS.map(s => `<span class="social-chip" role="listitem" aria-label="${s.name}" title="${s.name}" data-social="${s.name.toLowerCase()}"><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg></span>`).join('')}
        </div>`;
      copyright.insertAdjacentElement('beforebegin', socialFooter);
    }
    const socialLabel = socialFooter?.querySelector('.social-footer__label');
    if (socialLabel) socialLabel.textContent = map.socialFollow;
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
