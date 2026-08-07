const translations = {
  en: {
    status: "Launch sequence active",
    eyebrow: "A new technology destination for Egypt",
    heroLead: "Something powerful",
    heroAccent: "is coming.",
    heroText: "Elitedom is building a faster, clearer way to discover and buy technology — with verified hardware, transparent pricing, dependable delivery, and support that stays after checkout.",
    peek: "See what is loading",
    metricVat: "VAT-inclusive pricing",
    metricDelivery: "Egypt-wide delivery",
    metricSystem: "Platform readiness",
    classified: "PRODUCT FEED CLASSIFIED",
    scroll: "SCROLL TO INTERCEPT SIGNAL",
    signalKicker: "Incoming signal",
    signalTitle: "Built around the setup you actually want.",
    signalText: "A glimpse only. The full catalogue stays behind the curtain until launch.",
    f1Title: "Verified technology",
    f1Text: "Careful product selection with specs, availability and warranty details designed to be clear before you buy.",
    f2Title: "Live inventory",
    f2Text: "Catalog and stock are being connected to the operational core so what you see reflects what can actually move.",
    f3Title: "Checkout built for Egypt",
    f3Text: "VAT-inclusive pricing, Paymob-first payments and delivery across Egyptian governorates are part of the launch plan.",
    f4Title: "Support after checkout",
    f4Text: "Warranty, serials, returns and RMA tracking are being connected into one experience instead of disappearing after payment.",
    terminalKicker: "Under the hood",
    terminalTitle: "Not a placeholder. A platform is booting.",
    terminalText: "The production storefront is being built as a bilingual commerce platform with live ERP synchronization, Paymob payments, account security and connected fulfilment.",
    online: "ONLINE",
    ready: "READY",
    syncing: "SYNCING",
    arming: "ARMING",
    linking: "LINKING",
    finalKicker: "Stay tuned",
    finalLead: "The next setup starts at",
    finalText: "We are testing, syncing and polishing the final pieces. When the doors open, you will know.",
    rights: "All rights reserved."
  },
  ar: {
    status: "تجهيز الإطلاق مستمر",
    eyebrow: "وجهة جديدة للتكنولوجيا في مصر",
    heroLead: "شيء أقوى",
    heroAccent: "قادم قريبًا.",
    heroText: "Elitedom بتبني تجربة أسرع وأوضح لشراء التكنولوجيا — هاردوير موثوق، أسعار واضحة، توصيل يعتمد عليه، ودعم يكمل معاك بعد الشراء.",
    peek: "شوف إيه اللي بيتجهز",
    metricVat: "أسعار شاملة الضريبة",
    metricDelivery: "توصيل داخل مصر",
    metricSystem: "جاهزية المنصة",
    classified: "تفاصيل المنتجات لسه سرية",
    scroll: "انزل واعرف جزء من الإشارة",
    signalKicker: "إشارة وصلت",
    signalTitle: "مبني حوالين الـ setup اللي إنت عايزه فعلًا.",
    signalText: "دي مجرد لمحة. الكتالوج الكامل هيفضل مستخبي لحد الإطلاق.",
    f1Title: "تكنولوجيا موثوقة",
    f1Text: "اختيار منتجات بعناية مع مواصفات وتوافر وضمان بشكل واضح قبل ما تشتري.",
    f2Title: "مخزون مباشر",
    f2Text: "الكتالوج والمخزون بيتربطوا بالنظام التشغيلي عشان اللي تشوفه يكون قريب من الحقيقة الفعلية للتوافر.",
    f3Title: "دفع وتجربة مناسبة لمصر",
    f3Text: "أسعار شاملة الضريبة، Paymob كمسار دفع أساسي، وتوصيل للمحافظات ضمن خطة الإطلاق.",
    f4Title: "الدعم مكمل بعد الشراء",
    f4Text: "الضمان والسيريال والمرتجعات وطلبات RMA بيتجمعوا في تجربة واحدة بدل ما العلاقة تنتهي عند الدفع.",
    terminalKicker: "وراء الكواليس",
    terminalTitle: "مش صفحة مؤقتة. منصة كاملة بتشتغل.",
    terminalText: "المتجر الأساسي بيتجهز كمنصة تجارة إلكترونية عربي وإنجليزي، مع ربط ERP مباشر، Paymob، حماية للحسابات، وربط لعمليات التنفيذ والتوصيل.",
    online: "شغال",
    ready: "جاهز",
    syncing: "مزامنة",
    arming: "تجهيز",
    linking: "ربط",
    finalKicker: "خليك متابع",
    finalLead: "الـ setup الجاي يبدأ من",
    finalText: "بنختبر ونزامن ونظبط آخر التفاصيل. لما الباب يفتح، هتعرف.",
    rights: "جميع الحقوق محفوظة."
  }
};

const root = document.documentElement;
const body = document.body;
const langButton = document.getElementById("languageToggle");
let lang = localStorage.getItem("elitedom-lang") || "en";

function applyLanguage(nextLang) {
  lang = nextLang;
  const arabic = lang === "ar";
  root.lang = lang;
  root.dir = arabic ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[lang][key]) node.textContent = translations[lang][key];
  });
  langButton.textContent = arabic ? "EN" : "AR";
  langButton.setAttribute("aria-label", arabic ? "Switch to English" : "التبديل إلى العربية");
  localStorage.setItem("elitedom-lang", lang);
}

langButton?.addEventListener("click", () => applyLanguage(lang === "en" ? "ar" : "en"));
applyLanguage(lang);

document.getElementById("year").textContent = new Date().getFullYear();

requestAnimationFrame(() => body.classList.add("is-loaded"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(el);
});

const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer:fine)").matches && glow) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const stage = document.getElementById("hardwareStage");
if (stage && window.matchMedia("(pointer:fine)").matches) {
  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const pc = stage.querySelector(".hardware-pc");
    const gpu = stage.querySelector(".hardware-gpu");
    const ws = stage.querySelector(".hardware-workstation");
    pc.style.transform = `translate3d(${x * 15}px, ${y * 10}px, 0) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
    gpu.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0) rotate(-6deg) rotateY(${x * 5}deg)`;
    ws.style.transform = `translate3d(${x * 9}px, ${y * 8}px, 0)`;
  });
  stage.addEventListener("pointerleave", () => {
    stage.querySelector(".hardware-pc").style.transform = "";
    stage.querySelector(".hardware-gpu").style.transform = "rotate(-6deg)";
    stage.querySelector(".hardware-workstation").style.transform = "";
  });
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  if (!window.matchMedia("(pointer:fine)").matches) return;
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * 4;
    const ry = (x - 0.5) * 5;
    card.style.setProperty("--x", `${x * 100}%`);
    card.style.setProperty("--y", `${y * 100}%`);
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
});

const magnetic = document.querySelector(".magnetic");
if (magnetic && window.matchMedia("(pointer:fine)").matches) {
  magnetic.addEventListener("pointermove", (event) => {
    const rect = magnetic.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    magnetic.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-2px)`;
  });
  magnetic.addEventListener("pointerleave", () => { magnetic.style.transform = ""; });
}

(function particles() {
  const canvas = document.getElementById("particles");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let dots = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(70, Math.floor((width * height) / 22000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.25,
      vx: (Math.random() - 0.5) * 0.09,
      vy: Math.random() * -0.09 - 0.025,
      a: Math.random() * 0.28 + 0.06
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.y < -10) dot.y = height + 10;
      if (dot.x < -10) dot.x = width + 10;
      if (dot.x > width + 10) dot.x = -10;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(157,220,255,${dot.a})`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  frame();
})();
