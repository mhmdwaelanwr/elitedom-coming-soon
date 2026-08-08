/* Final campaign loader + premium mouse interactions for desktop fine pointers only. */
(() => {
  if (!document.querySelector('link[data-elitedom-campaign]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'campaign-v4.css?v=1';
    css.dataset.elitedomCampaign = '1';
    document.head.appendChild(css);
  }
  if (!document.querySelector('script[data-elitedom-campaign]')) {
    const script = document.createElement('script');
    script.src = 'campaign-v4.js?v=1';
    script.dataset.elitedomCampaign = '1';
    document.head.appendChild(script);
  }

  const fine = matchMedia('(pointer:fine)').matches;
  const desktop = matchMedia('(min-width:821px)').matches;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!fine || !desktop || reduced) return;

  const body = document.body;
  body.classList.add('has-premium-pointer');

  const dot = document.createElement('div');
  dot.className = 'pointer-dot';
  const ring = document.createElement('div');
  ring.className = 'pointer-ring';
  body.append(dot, ring);

  let tx = innerWidth / 2, ty = innerHeight / 2;
  let rx = tx, ry = ty;
  let visible = false;
  let raf = 0;

  function loop(){
    rx += (tx - rx) * .18;
    ry += (ty - ry) * .18;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  function show(){
    if (visible) return;
    visible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  }
  function hide(){
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  }

  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    show();

    const nx = (e.clientX / innerWidth - .5);
    const ny = (e.clientY / innerHeight - .5);
    document.documentElement.style.setProperty('--ambient-x', `${(-nx * 10).toFixed(2)}px`);
    document.documentElement.style.setProperty('--ambient-y', `${(-ny * 8).toFixed(2)}px`);
  }, {passive:true});

  addEventListener('pointerleave', hide, {passive:true});
  addEventListener('blur', hide, {passive:true});

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

  const glowTargets = document.querySelectorAll('.card,.terminal,.primary,.lang');
  glowTargets.forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX-r.left)/r.width)*100;
      const y = ((e.clientY-r.top)/r.height)*100;
      el.style.setProperty('--px', `${Math.max(0,Math.min(100,x))}%`);
      el.style.setProperty('--py', `${Math.max(0,Math.min(100,y))}%`);
      el.classList.add('pointer-over');
    });
    el.addEventListener('pointerleave', () => el.classList.remove('pointer-over'));
  });

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width;
      const y = (e.clientY-r.top)/r.height;
      card.style.setProperty('--shine-x', `${x*100}%`);
      card.style.setProperty('--shine-y', `${y*100}%`);
    }, {passive:true});
  });

  addEventListener('pagehide', () => cancelAnimationFrame(raf), {once:true});
})();