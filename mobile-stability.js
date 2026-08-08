/* Real-device mobile stability fixes: preserve viewport on RTL/LTR swap and avoid horizontal drift. */
(() => {
  const mobile = matchMedia('(max-width: 820px), (pointer: coarse)').matches;
  if (!mobile) return;

  const root = document.documentElement;
  const toggle = document.getElementById('languageToggle');
  const scrolling = () => document.scrollingElement || document.documentElement;
  let snapshot = null;

  /* Warm the Arabic display font before the user taps AR to avoid a late font/layout swap. */
  if (document.fonts?.load) {
    document.fonts.load("700 36px 'Alexandria'", 'القادم مختلف').catch(() => {});
    document.fonts.load("400 16px 'Alexandria'", 'تجربة جديدة للهاردوير والتقنية').catch(() => {});
  }

  function chooseAnchor() {
    const candidates = [...document.querySelectorAll('.hero,.clues,.control,.cut,.finale')];
    const center = innerHeight * .42;
    let best = null;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      const visible = r.bottom > 0 && r.top < innerHeight;
      if (!visible) continue;
      const distance = Math.abs((r.top + Math.min(r.height, innerHeight) / 2) - center);
      if (!best || distance < best.distance) best = { el, top: r.top, distance };
    }
    return best;
  }

  function capture() {
    snapshot = {
      y: window.scrollY,
      anchor: chooseAnchor(),
      progress: scrolling().scrollHeight > innerHeight ? window.scrollY / (scrolling().scrollHeight - innerHeight) : 0
    };
    root.classList.add('locale-swapping');
    root.style.scrollBehavior = 'auto';
  }

  function resetHorizontal() {
    const y = window.scrollY;
    try { window.scrollTo({ left: 0, top: y, behavior: 'auto' }); }
    catch { window.scrollTo(0, y); }
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    scrolling().scrollLeft = 0;
  }

  function restore() {
    if (!snapshot) return;
    resetHorizontal();

    let targetY = snapshot.y;
    if (snapshot.anchor?.el?.isConnected) {
      const nowTop = snapshot.anchor.el.getBoundingClientRect().top;
      targetY = Math.max(0, window.scrollY + (nowTop - snapshot.anchor.top));
    } else {
      const max = Math.max(0, scrolling().scrollHeight - innerHeight);
      targetY = Math.min(max, max * snapshot.progress);
    }

    try { window.scrollTo({ left: 0, top: targetY, behavior: 'auto' }); }
    catch { window.scrollTo(0, targetY); }
    resetHorizontal();

    setTimeout(() => {
      root.classList.remove('locale-swapping');
      root.style.scrollBehavior = '';
      resetHorizontal();
      snapshot = null;
    }, 120);
  }

  toggle?.addEventListener('pointerdown', capture, { capture: true, passive: true });
  toggle?.addEventListener('touchstart', () => { if (!snapshot) capture(); }, { capture: true, passive: true });
  toggle?.addEventListener('click', () => {
    if (!snapshot) capture();
    requestAnimationFrame(() => requestAnimationFrame(restore));
  });

  /* Android browsers can preserve an RTL horizontal scroll origin after dir changes. Keep it pinned. */
  addEventListener('resize', () => requestAnimationFrame(resetHorizontal), { passive: true });
  addEventListener('orientationchange', () => setTimeout(resetHorizontal, 80), { passive: true });
})();
