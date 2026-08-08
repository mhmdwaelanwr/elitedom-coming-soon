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
