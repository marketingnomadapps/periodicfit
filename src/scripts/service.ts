/**
 * Service page motion — a different vocabulary from the homepage:
 * curtain wipe + zoom-through hero, 3D word flips, deck spread, sticky scrollytelling with
 * self-drawing icons, filling timeline with 3D tilt, card-dealing flips, velocity-skewed marquee,
 * text scramble, cursor glow and pointer tilt. Runs on desktop and mobile; off for reduced motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/* ───────── Scroll progress bar ───────── */
function progressBar() {
  const bar = $('.svc-progress');
  if (!bar) return;
  gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
}

/* ───────── 3D word flip (headings) ───────── */
function flipWords(el: Element, opts: gsap.TweenVars = {}) {
  const split = SplitText.create(el, { type: 'words' });
  gsap.set(split.words, { transformOrigin: '50% 100%', display: 'inline-block' });
  return gsap.from(split.words, { rotateX: -95, yPercent: 40, opacity: 0, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.06, ...opts });
}

/* ───────── Hero: curtain wipe → zoom-through ───────── */
function hero(mobile: boolean) {
  const section = $('#svc-hero');
  const frame = $('.sh-frame');
  const media = $('.sh-media');
  if (!section || !frame || !media) return;

  // Intro (un-hide first so GSAP records real start values)
  gsap.set('.sh-copy', { autoAlpha: 1 });
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.add(flipWords($('.sh-title')!, { stagger: 0.05 }), 0.1)
    .from('.sh-crumbs, .sh-chip', { y: 16, opacity: 0, duration: 0.7, stagger: 0.06 }, 0)
    .from('.sh-promise, .sh-ctas, .sh-trust', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.45)
    .to('.sh-curtain', { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, 0.25)
    .from('.sh-frame-img', { scale: 1.35, duration: 1.6 }, 0.35);

  // Zoom-through: a full-bleed copy of the photo is clipped to the frame's rect, then opened up.
  const statement = $('.sh-statement');
  const clipFor = () => {
    const f = frame.getBoundingClientRect();
    const s = section.getBoundingClientRect();
    const r = 32;
    return `inset(${f.top - s.top}px ${s.right - f.right}px ${s.bottom - f.bottom}px ${f.left - s.left}px round ${r}px)`;
  };
  media.classList.remove('hidden');
  statement?.classList.remove('hidden');
  statement?.classList.add('flex');
  gsap.set(media, { clipPath: clipFor() });
  gsap.set(statement, { opacity: 0 });
  const stWords = statement ? SplitText.create($('p', statement)!, { type: 'words' }).words : [];
  gsap.set(stWords, { display: 'inline-block', transformOrigin: '50% 100%' });

  const zoom = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (mobile ? 0.9 : 1.1)}`,
      pin: '.sh-pin',
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: () => { if (zoom.progress() === 0) gsap.set(media, { clipPath: clipFor() }); },
    },
  });
  zoom
    .set(frame, { opacity: 0 }, 0.001)
    .fromTo(media, { clipPath: () => clipFor() }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', ease: 'power2.inOut', duration: 1 }, 0)
    .fromTo('.sh-media-img', { scale: 1.15 }, { scale: 1, ease: 'none', duration: 1.4 }, 0)
    .to('.sh-copy', { x: mobile ? 0 : -80, y: mobile ? -40 : 0, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0)
    .to('.sh-media-shade', { backgroundColor: 'rgba(14,15,18,0.55)', duration: 0.6 }, 0.5)
    .to(statement, { opacity: 1, duration: 0.01 }, 0.75)
    .from(stWords, { rotateX: -95, yPercent: 40, opacity: 0, stagger: 0.04, duration: 0.5, ease: 'back.out(1.4)' }, 0.75);

  return () => { media.classList.add('hidden'); statement?.classList.add('hidden'); statement?.classList.remove('flex'); gsap.set(frame, { opacity: 1 }); };
}

/* ───────── Section headings ───────── */
function headings() {
  $$('.svc-heading').forEach((h) => {
    const anim = flipWords(h, { paused: true });
    ScrollTrigger.create({ trigger: h, start: 'top 85%', once: true, onEnter: () => anim.play() });
  });
}

/* ───────── Who: deck spreads into a grid ───────── */
function deck() {
  const grid = $('.who-deck');
  if (!grid) return;
  const cards = $$('.who-card', grid);
  const rots = [-14, -5, 5, 14];
  gsap.from(cards, {
    x: (i) => { const g = grid.getBoundingClientRect(); const c = cards[i].getBoundingClientRect(); return g.left + g.width / 2 - (c.left + c.width / 2); },
    y: (i) => { const g = grid.getBoundingClientRect(); const c = cards[i].getBoundingClientRect(); return g.top + g.height / 2 - (c.top + c.height / 2) + 40; },
    rotate: (i) => rots[i % 4],
    scale: 0.82,
    ease: 'power3.out',
    scrollTrigger: { trigger: grid, start: 'top 90%', end: 'top 30%', scrub: 0.6, invalidateOnRefresh: true },
  });
}

/* ───────── Features: sticky frame + self-drawing icons ───────── */
function features(mobile: boolean) {
  const items = $$('.feat-item');
  const imgs = $$('.feat-img');
  const now = $('.feat-now');
  const count = $('.feat-count');
  if (!items.length) return;

  // Prepare icon strokes to draw
  items.forEach((it) => {
    $$('svg path, svg circle, svg rect, svg line, svg polyline, svg ellipse', it).forEach((shape) => {
      shape.setAttribute('pathLength', '1');
      gsap.set(shape, { strokeDasharray: 1, strokeDashoffset: 1 });
    });
  });

  let current = -1;
  const activate = (i: number) => {
    if (i === current) return;
    current = i;
    items.forEach((it, k) => it.classList.toggle('is-active', k === i));
    const imgIndex = i % imgs.length;
    imgs.forEach((img, k) => gsap.to(img, { opacity: k === imgIndex ? 1 : 0, scale: k === imgIndex ? 1 : 1.12, duration: 0.8, ease: 'power3.out', overwrite: 'auto' }));
    if (now) { now.textContent = items[i].dataset.title ?? ''; gsap.fromTo(now, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }); }
    if (count) count.textContent = String(i + 1).padStart(2, '0');
    gsap.to($$('svg *', items[i]), { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', stagger: 0.08, overwrite: 'auto' });
  };

  const line = mobile ? '68%' : '55%';
  items.forEach((it, i) => {
    ScrollTrigger.create({
      trigger: it, start: `top ${line}`, end: `bottom ${line}`,
      onToggle: (self) => { if (self.isActive) activate(i); },
    });
  });
  activate(0);
}

/* ───────── Timeline: fill + 3D tilt-in cards ───────── */
function timeline() {
  const tl = $('.tl');
  if (!tl) return;
  gsap.fromTo('.tl-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 } });
  $$('.tl-step').forEach((step) => {
    const right = step.dataset.side === 'right';
    const narrow = window.matchMedia('(max-width: 767px)').matches;
    const card = $('.tl-card', step);
    const dot = $('.tl-dot', step);
    gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 78%', once: true } })
      .from(dot, { scale: 0, duration: 0.6, ease: 'back.out(2.2)' })
      .from(card, {
        rotateY: narrow ? -28 : right ? -32 : 32,
        x: narrow ? 50 : right ? 70 : -70,
        opacity: 0, transformPerspective: 900, transformOrigin: narrow ? '0% 50%' : right ? '0% 50%' : '100% 50%',
        duration: 1, ease: 'expo.out',
      }, 0.1);
  });
}

/* ───────── Sample plan: cards dealt and flipped ───────── */
function samplePlan() {
  const inners = $$('.sp-inner');
  if (!inners.length) return;
  gsap.set(inners, { rotateY: 180 });
  gsap.from('.sp-card', { y: 60, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06, scrollTrigger: { trigger: '#sample ul', start: 'top 85%', once: true } });
  gsap.to(inners, {
    rotateY: 0, duration: 1, ease: 'power3.inOut', stagger: 0.09, delay: 0.25,
    scrollTrigger: { trigger: '#sample ul', start: 'top 85%', once: true },
  });
}

/* ───────── Testimonials: skew with scroll velocity ───────── */
function velocitySkew() {
  const rows = $$('.ts-skew');
  if (!rows.length) return;
  const setters = rows.map((r) => gsap.quickTo(r, 'skewX', { duration: 0.6, ease: 'power3' }));
  ScrollTrigger.create({
    trigger: '#stories', start: 'top bottom', end: 'bottom top',
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-10, 10, self.getVelocity() / -250);
      setters.forEach((s, i) => s(i % 2 ? -v : v));
    },
    onLeave: () => setters.forEach((s) => s(0)),
    onLeaveBack: () => setters.forEach((s) => s(0)),
  });
}

/* ───────── Contact: text scramble + cursor glow ───────── */
function scramble(el: HTMLElement) {
  const final = el.textContent ?? '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+';
  const obj = { p: 0 };
  el.setAttribute('aria-label', final);
  gsap.to(obj, {
    p: 1, duration: 1.4, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => {
      const reveal = Math.floor(obj.p * final.length);
      el.textContent = final.split('').map((c, i) => (i < reveal || c === ' ' ? c : chars[Math.floor(Math.random() * chars.length)])).join('');
    },
    onComplete: () => { el.textContent = final; },
  });
}

function contact(desktop: boolean) {
  const title = $('[data-scramble]');
  if (title) scramble(title);
  gsap.from('.sc-item', { x: -40, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '#contact', start: 'top 70%', once: true } });
  gsap.from('.sc-form', { y: 80, rotate: 2, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '#contact', start: 'top 70%', once: true } });

  const section = $('#contact');
  const glow = $('.sc-glow');
  if (!section || !glow || !desktop) return;
  const xTo = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3' });
  const yTo = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3' });
  const onMove = (e: PointerEvent) => { const r = section.getBoundingClientRect(); xTo(e.clientX - r.left); yTo(e.clientY - r.top); };
  gsap.set(glow, { x: section.clientWidth * 0.7, y: section.clientHeight * 0.4 });
  section.addEventListener('pointermove', onMove);
  return () => section.removeEventListener('pointermove', onMove);
}

/* ───────── Related: pop-in + pointer tilt ───────── */
function related(desktop: boolean) {
  gsap.from('.rel-card', { rotateX: -40, y: 60, opacity: 0, transformPerspective: 900, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '#related', start: 'top 75%', once: true } });
  gsap.from('.rel-svc', { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.05, scrollTrigger: { trigger: '.rel-svc', start: 'top 90%', once: true } });
  if (!desktop) return;
  const offs = $$('.rel-tilt').map((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3' });
    const move = (e: PointerEvent) => { const r = card.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 14); rx(((e.clientY - r.top) / r.height - 0.5) * -14); };
    const leave = () => { rx(0); ry(0); };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); };
  });
  return () => offs.forEach((f) => f());
}

/* ───────── Init ───────── */
function init() {
  const mm = gsap.matchMedia();
  mm.add({ desktop: `(min-width: 768px) and ${MOTION_OK}`, mobile: `(max-width: 767px) and ${MOTION_OK}` }, (ctx) => {
    const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
    if (!desktop && !mobile) return;
    const offHero = hero(mobile); // the only pinned section, created first
    progressBar();
    headings();
    deck();
    features(mobile);
    timeline();
    samplePlan();
    velocitySkew();
    const offContact = contact(desktop);
    const offRelated = related(desktop);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => { offHero?.(); offContact?.(); offRelated?.(); };
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

init();
