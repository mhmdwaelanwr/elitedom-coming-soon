/* Premium mouse interactions for desktop fine pointers only.
   The visual behavior stays cinematic, but animation frames run only while needed. */
(() => {
  const fine = matchMedia('(pointer:fine)').matches;
  const desktop = matchMedia('(min-width:821px)').matches;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!fine || !desktop || reduced) return;

  const body = document.body;
  const root = document.documentElement;
  body.classList.add('has-premium-pointer');

  const dot = document.createElement('div');
  dot.className = 'pointer-dot';
  const ring = document.createElement('div');
  ring.className = 'pointer-ring';
  body.append(dot, ring);

  let tx = innerWidth / 2, ty = innerHeight / 2;
  let rx = tx, ry = ty;
  let visible = false;
  let ringRaf = 0;
  let moveRaf = 0;

  function animateRing(){
    ringRaf = 0;
    if (!visible || document.hidden) return;

    rx += (tx - rx) * .18;
    ry += (ty - ry) * .18;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;

    if (Math.abs(tx-rx) > .16 || Math.abs(ty-ry) > .16) {
      ringRaf = requestAnimationFrame(animateRing);
    }
  }

  function requestRing(){
    if (!ringRaf && visible && !document.hidden) ringRaf = requestAnimationFrame(animateRing);
  }

  function flushPointer(){
    moveRaf = 0;
    if (!visible || document.hidden) return;
    dot.style.transform = `translate3d(${tx}px,${ty}px,0)`;

    const nx = tx / innerWidth - .5;
    const ny = ty / innerHeight - .5;
    root.style.setProperty('--ambient-x', `${(-nx * 10).toFixed(2)}px`);
    root.style.setProperty('--ambient-y', `${(-ny * 8).toFixed(2)}px`);
  }

  function show(){
    if (visible) return;
    visible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    requestRing();
  }

  function hide(){
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    if (ringRaf) cancelAnimationFrame(ringRaf);
    if (moveRaf) cancelAnimationFrame(moveRaf);
    ringRaf = 0;
    moveRaf = 0;
  }

  addEventListener('pointermove', e => {
    tx = e.clientX;
    ty = e.clientY;
    show();
    requestRing();
    if (!moveRaf) moveRaf = requestAnimationFrame(flushPointer);
  }, {passive:true});

  addEventListener('pointerleave', hide, {passive:true});
  addEventListener('blur', hide, {passive:true});

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hide();
  }, {passive:true});

  const hoverSelector = 'a,button,.card,.vault,.terminal,.finale__domain,.finale__brandlockup';
  document.addEventListener('pointerover', e => {
    if (e.target.closest(hoverSelector)) ring.classList.add('is-active');
  }, {passive:true});
  document.addEventListener('pointerout', e => {
    if (e.target.closest(hoverSelector) && !e.relatedTarget?.closest?.(hoverSelector)) ring.classList.remove('is-active');
  }, {passive:true});

  document.addEventListener('pointerdown', e => {
    ring.classList.add('is-pressed');
    const ripple = document.createElement('span');
    ripple.className = 'pointer-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
  document.addEventListener('pointerup', () => ring.classList.remove('is-pressed'));

  /* Surface glows update at most once per animation frame per target. */
  document.querySelectorAll('.card,.terminal,.primary,.lang').forEach(el => {
    let pending = 0;
    let px = 50, py = 50;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      px = Math.max(0, Math.min(100, ((e.clientX-r.left)/r.width)*100));
      py = Math.max(0, Math.min(100, ((e.clientY-r.top)/r.height)*100));
      el.classList.add('pointer-over');
      if (!pending) pending = requestAnimationFrame(() => {
        pending = 0;
        el.style.setProperty('--px', `${px}%`);
        el.style.setProperty('--py', `${py}%`);
      });
    }, {passive:true});
    el.addEventListener('pointerleave', () => {
      el.classList.remove('pointer-over');
      if (pending) cancelAnimationFrame(pending);
      pending = 0;
    }, {passive:true});
  });

  document.querySelectorAll('.tilt-card').forEach(card => {
    let pending = 0;
    let sx = 50, sy = 50;
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      sx = ((e.clientX-r.left)/r.width)*100;
      sy = ((e.clientY-r.top)/r.height)*100;
      if (!pending) pending = requestAnimationFrame(() => {
        pending = 0;
        card.style.setProperty('--shine-x', `${sx}%`);
        card.style.setProperty('--shine-y', `${sy}%`);
      });
    }, {passive:true});
  });

  addEventListener('pagehide', hide, {once:true});
})();