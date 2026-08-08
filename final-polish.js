/* Lightweight cinematic/RTL runtime. Final copy is owned by campaign-v4.js. */
(() => {
  const root = document.documentElement;
  const langButton = document.getElementById('languageToggle');

  /* v3 still touches the temporary favicon during bootstrap; restore the official brand mark. */
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = 'assets/Elitedom_Logomark_White.svg';
    favicon.type = 'image/svg+xml';
  }

  const syncLocaleDetails = () => {
    const ar = root.dir === 'rtl';
    const rights = document.querySelector('[data-i18n="rights"]');
    if (rights) rights.setAttribute('dir', ar ? 'rtl' : 'ltr');
    document.querySelector('.copyright')?.setAttribute('dir', 'ltr');
    document.title = ar ? 'Elitedom — القادم مختلف' : 'Elitedom — Something Is Coming';
  };

  const fixTerminalHeader = () => {
    const wrap = document.querySelector('.terminal__bar>span');
    const brandPart = wrap?.querySelector('.terminal-brand');
    const localePart = wrap?.querySelector('.terminal-locale-title');
    if (wrap) {
      wrap.setAttribute('dir', 'ltr');
      wrap.style.direction = 'ltr';
    }
    brandPart?.setAttribute('dir', 'ltr');
    localePart?.setAttribute('dir', root.dir === 'rtl' ? 'rtl' : 'ltr');
  };

  syncLocaleDetails();
  fixTerminalHeader();
  langButton?.addEventListener('click', () => requestAnimationFrame(() => {
    syncLocaleDetails();
    fixTerminalHeader();
  }));

  /* Auto-hide navigation is a premium desktop detail only.
     Do not register another scroll listener on touch/mobile devices. */
  if (matchMedia('(min-width:821px) and (pointer:fine)').matches) {
    const nav = document.getElementById('nav');
    let lastY = window.scrollY;
    let ticking = false;

    const updateNav = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (nav) {
        if (y < 110 || delta < -6) nav.classList.remove('is-hidden');
        else if (y > 170 && delta > 7) nav.classList.add('is-hidden');
      }
      lastY = y;
      ticking = false;
    };

    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateNav);
      }
    }, {passive:true});
  }
})();
