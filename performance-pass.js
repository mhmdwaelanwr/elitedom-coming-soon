/* Elitedom performance guard. Runs before the main experience scripts. */
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

  if (!lite) return;

  /* Removing the canvas before v3.js runs prevents its RAF particle loop from starting at all. */
  document.getElementById('particles')?.remove();

  /* v3.js attaches a perpetual automatic spotlight loop to #hardwareVault on touch devices.
     Removing only the id keeps the visual/CSS intact while preventing that loop. */
  const vault = document.getElementById('hardwareVault');
  if (vault) {
    vault.dataset.hardwareVault = 'true';
    vault.removeAttribute('id');
  }

  /* Pause remaining decorative motion whenever the document is hidden. */
  const syncVisibility = () => root.classList.toggle('perf-paused', document.hidden);
  document.addEventListener('visibilitychange', syncVisibility, { passive: true });
  syncVisibility();
})();
