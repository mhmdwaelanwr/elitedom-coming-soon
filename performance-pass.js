/* Elitedom adaptive performance guard. Runs before the main experience scripts. */
(() => {
  const root = document.documentElement;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const coarse = matchMedia('(pointer:coarse)').matches;
  const narrow = matchMedia('(max-width:820px)').matches;
  const saveData = !!connection?.saveData;
  const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
  const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const lite = coarse || narrow || saveData || lowMemory || lowCpu || reduced;

  root.dataset.perf = lite ? 'lite' : 'full';

  /* Every device pauses purely decorative CSS motion when the tab is hidden. */
  const syncVisibility = () => root.classList.toggle('perf-paused', document.hidden);
  document.addEventListener('visibilitychange', syncVisibility, { passive: true });
  syncVisibility();

  /* Pause cinematic loops when their scene is well outside the viewport.
     Nothing is removed visually; motion resumes before the scene reaches the screen. */
  if ('IntersectionObserver' in window) {
    const motionHosts = document.querySelectorAll('.vault,.signal-strip,.cards,.terminal,.cut,.finale');
    const motionObserver = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle('perf-offscreen', !entry.isIntersecting);
    }, { rootMargin: '180px 0px 180px 0px', threshold: 0 });
    motionHosts.forEach(el => motionObserver.observe(el));
  }

  if (!lite) return;

  /* Remove decorative nodes before v3.js can attach continuous work to them. */
  document.getElementById('particles')?.remove();
  document.getElementById('cursorGlow')?.remove();
  document.querySelector('.ambient__noise')?.remove();

  /* The progress bar is a desktop micro-detail; removing it saves a style write on every mobile scroll. */
  document.getElementById('scrollProgress')?.remove();

  /* v3.js attaches an automatic spotlight RAF to #hardwareVault on touch devices.
     Removing only the id keeps the complete vault artwork and CSS while preventing that loop. */
  const vault = document.getElementById('hardwareVault');
  if (vault) {
    vault.dataset.hardwareVault = 'true';
    vault.removeAttribute('id');
  }
})();

/* Social dock safety + links.
   Runs after the page has been built so the campaign-created social chips exist.
   The sizing rules are intentionally injected here as a deployment-safe fallback:
   even if a CSS-only commit is delayed, raw SVGs can never expand to page-sized icons again. */
(() => {
  const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/elitedom.store/',
    facebook: 'https://www.facebook.com/elitedom.store',
    tiktok: 'https://www.tiktok.com/@elitedom.store',
    youtube: 'https://www.youtube.com/@elitedom.store',
    threads: 'https://www.threads.net/@elitedom.store'
  };

  const ensureGuardStyle = () => {
    if (document.getElementById('elitedom-social-size-guard')) return;
    const style = document.createElement('style');
    style.id = 'elitedom-social-size-guard';
    style.textContent = `
      .social-footer{width:min(720px,100%)!important;margin:28px auto 0!important;padding-top:22px!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:15px!important}
      .social-dock{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;gap:8px!important;direction:ltr!important;max-width:100%!important}
      .social-chip{box-sizing:border-box!important;width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;max-width:40px!important;max-height:40px!important;display:grid!important;place-items:center!important;overflow:hidden!important;border-radius:12px!important;flex:0 0 40px!important;text-decoration:none!important}
      .social-chip svg{box-sizing:border-box!important;width:18px!important;height:18px!important;min-width:18px!important;min-height:18px!important;max-width:18px!important;max-height:18px!important;display:block!important;overflow:visible!important}
      .social-chip.is-linked{cursor:pointer!important}
      .social-chip.is-pending{opacity:.42!important;cursor:default!important}
      @media(max-width:820px){.social-dock{gap:7px!important}.social-chip{width:37px!important;height:37px!important;min-width:37px!important;min-height:37px!important;max-width:37px!important;max-height:37px!important;flex-basis:37px!important}.social-chip svg{width:17px!important;height:17px!important;min-width:17px!important;min-height:17px!important;max-width:17px!important;max-height:17px!important}}
      @media(max-width:430px){.social-footer{width:100%!important;margin-top:22px!important}.social-dock{max-width:300px!important;gap:6px!important}.social-chip{width:35px!important;height:35px!important;min-width:35px!important;min-height:35px!important;max-width:35px!important;max-height:35px!important;flex-basis:35px!important}.social-chip svg{width:16px!important;height:16px!important;min-width:16px!important;min-height:16px!important;max-width:16px!important;max-height:16px!important}}
    `;
    document.head.appendChild(style);
  };

  const connectSocials = () => {
    ensureGuardStyle();
    document.querySelectorAll('.social-chip[data-social]').forEach(chip => {
      const key = chip.dataset.social;
      const href = SOCIAL_LINKS[key];

      if (!href) {
        chip.classList.add('is-pending');
        chip.setAttribute('aria-disabled', 'true');
        return;
      }

      if (chip.tagName === 'A') {
        chip.href = href;
        chip.target = '_blank';
        chip.rel = 'noopener noreferrer';
        chip.classList.add('is-linked');
        chip.classList.remove('is-pending');
        chip.removeAttribute('aria-disabled');
        return;
      }

      const link = document.createElement('a');
      for (const attr of chip.attributes) link.setAttribute(attr.name, attr.value);
      link.className = chip.className;
      link.innerHTML = chip.innerHTML;
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.classList.add('is-linked');
      link.classList.remove('is-pending');
      link.removeAttribute('aria-disabled');
      chip.replaceWith(link);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectSocials, { once: true });
  } else {
    connectSocials();
  }
})();
