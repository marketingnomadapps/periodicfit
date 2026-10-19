/**
 * PeriodicFit FX library — reusable scroll/pointer effects activated by data attributes.
 * Used by Tools, About and Contact pages (home and service pages have their own vocabulary).
 *
 *  data-fx="explode"      children [data-fx-item] fly outward from the centre as you scroll past
 *  data-fx="stack"        layered images [data-depth] unfold on load, drift with scroll + pointer
 *  data-fx="carousel"     pinned 3D carousel: [data-fx-card] items rotate around the Y axis on scroll
 *  data-fx="ribbons"      crossing marquee ribbons [data-fx-ribbon] driven by scroll (+ velocity skew)
 *  data-fx="columns"      image columns [data-fx-col] move at different speeds / directions
 *  data-fx="clip"         image reveals from a small inset window to full frame
 *  data-fx="rise"         children [data-fx-item] rise from depth (rotateX + z) in a stagger
 *  data-fx="tilt"         3D tilt toward the pointer (desktop)
 *  data-fx="magnetic"     element is pulled toward the pointer (desktop)
 *  data-fx="stickers"     emoji stickers [data-fx-item] burst out and float
 *  data-fx="words"        heading words slide up from a mask
 *  data-fx="count"        number counts up from 0 to data-to
 *  data-fx="tunnel"       pinned 3D fly-through: [data-fx-layer data-z] planes rush past the camera on scroll
 *  data-fx="label"        giant outlined label slides sideways against the scroll
 *  data-speed="n"         element drifts vertically at its own speed (multi-layer parallax)
 *
 * Everything is skipped under prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const fx = (name: string) => $$(`[data-fx~="${name}"]`);

type Ctx = { desktop: boolean; mobile: boolean; k: number };
const cleanups: (() => void)[] = [];

function explode({ k }: Ctx) {
  fx('explode').forEach((root) => {
    const items = $$('[data-fx-item]', root);
    // Intro: tiles pop in from the centre
    gsap.from(items, {
      x: (i, el) => { const r = el.getBoundingClientRect(), c = root.getBoundingClientRect(); return (c.left + c.width / 2) - (r.left + r.width / 2); },
      y: (i, el) => { const r = el.getBoundingClientRect(), c = root.getBoundingClientRect(); return (c.top + c.height / 2) - (r.top + r.height / 2); },
      scale: 0.2, opacity: 0, rotate: () => gsap.utils.random(-30, 30), duration: 1.4, ease: 'expo.out', stagger: { each: 0.05, from: 'random' }, delay: 0.15,
    });
    // Scroll: tiles fly outward and grow, as if you're moving through them
    items.forEach((el) => {
      const d = Number(el.dataset.depth || 1);
      gsap.to(el, {
        x: () => { const r = el.getBoundingClientRect(), c = root.getBoundingClientRect(); return ((r.left + r.width / 2) - (c.left + c.width / 2)) * 0.9 * d * k; },
        y: () => { const r = el.getBoundingClientRect(), c = root.getBoundingClientRect(); return ((r.top + r.height / 2) - (c.top + c.height / 2)) * 0.9 * d * k - 120 * d; },
        scale: 1 + 0.35 * d, rotate: `+=${(d - 1) * 14}`, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
      });
    });
  });
}

function stack({ desktop, k }: Ctx) {
  fx('stack').forEach((root) => {
    const layers = $$<HTMLElement>('[data-depth]', root);
    gsap.from(layers, { rotate: 0, x: 0, y: 60, scale: 0.85, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12, delay: 0.2, clearProps: 'opacity' });
    layers.forEach((l) => {
      const d = Number(l.dataset.depth || 1);
      gsap.to(l, { yPercent: -18 * d * k, ease: 'none', scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom top', scrub: true } });
    });
    if (!desktop) return;
    const movers = layers.map((l) => ({ d: Number(l.dataset.depth || 1), x: gsap.quickTo(l, 'x', { duration: 1, ease: 'power3' }), r: gsap.quickTo(l, 'rotateY', { duration: 1, ease: 'power3' }) }));
    const onMove = (e: PointerEvent) => { const nx = e.clientX / innerWidth - 0.5; movers.forEach((m) => { m.x(nx * 30 * m.d); m.r(nx * 8 * m.d); }); };
    addEventListener('pointermove', onMove);
    cleanups.push(() => removeEventListener('pointermove', onMove));
  });
}

function carousel({ mobile }: Ctx) {
  fx('carousel').forEach((root) => {
    const ring = root.querySelector<HTMLElement>('[data-fx-ring]');
    const cards = $$('[data-fx-card]', root);
    const dots = $$('[data-fx-dot]', root);
    if (!ring || !cards.length) return;
    root.classList.add('is-3d');
    // Coverflow: the active card faces you; neighbours slide aside, turn inward and sink back.
    const state = { p: 0 };
    const update = () => {
      const w = ring.offsetWidth;
      const gap = mobile ? 0.62 : 0.78;
      cards.forEach((c, i) => {
        const rel = i - state.p;                       // 0 = front, ±1 = neighbours
        const a = Math.abs(rel);
        gsap.set(c, {
          x: rel * w * gap,
          z: -a * (mobile ? 160 : 240),
          rotateY: gsap.utils.clamp(-55, 55, -rel * 38),
          scale: 1 - Math.min(a, 2) * 0.06,
          opacity: a > 2.2 ? 0 : 1 - Math.min(a, 2) * 0.3,
          zIndex: 100 - Math.round(a * 10),
        });
        c.classList.toggle('is-front', a < 0.5);
        c.style.setProperty('--side', String(Math.min(1, a)));
      });
      const active = Math.round(state.p);
      dots.forEach((d, i) => d.classList.toggle('is-active', i === active));
    };
    update();
    gsap.to(state, {
      p: cards.length - 1, ease: 'none', onUpdate: update,
      scrollTrigger: {
        trigger: root, start: 'top top', end: () => `+=${innerHeight * cards.length * 0.7}`, pin: root.querySelector('[data-fx-pin]') ?? root, scrub: 0.6,
        snap: { snapTo: 1 / (cards.length - 1), duration: 0.45, ease: 'power2.inOut' }, invalidateOnRefresh: true, anticipatePin: 1,
        onRefresh: update,
      },
    });
    addEventListener('resize', update);
    cleanups.push(() => removeEventListener('resize', update));
  });
}

function ribbons() {
  fx('ribbons').forEach((root) => {
    const rows = $$('[data-fx-ribbon]', root);
    rows.forEach((row, i) => {
      const dir = i % 2 ? 1 : -1;
      gsap.fromTo(row, { xPercent: dir > 0 ? -30 : 0 }, { xPercent: dir > 0 ? 0 : -30, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
    });
    const skew = rows.map((r) => gsap.quickTo(r, 'skewX', { duration: 0.5, ease: 'power3' }));
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { const v = gsap.utils.clamp(-12, 12, s.getVelocity() / -200); skew.forEach((q, i) => q(i % 2 ? -v : v)); } });
  });
}

function columns({ k }: Ctx) {
  fx('columns').forEach((root) => {
    $$('[data-fx-col]', root).forEach((col) => {
      const speed = Number(col.dataset.fxCol || 1);
      gsap.fromTo(col, { yPercent: speed * 12 * k }, { yPercent: -speed * 12 * k, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
}

function clip() {
  fx('clip').forEach((el) => {
    const img = el.querySelector('img');
    gsap.fromTo(el, { clipPath: 'inset(18% 22% 18% 22% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 30%', scrub: 0.6 } });
    if (img) gsap.fromTo(img, { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function rise() {
  fx('rise').forEach((root) => {
    const items = $$('[data-fx-item]', root);
    gsap.from(items, {
      y: 90, rotateX: -35, z: -120, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%',
      duration: 1.1, ease: 'expo.out', stagger: { each: 0.07, grid: 'auto', from: 'start' },
      scrollTrigger: { trigger: root, start: 'top 85%', once: true },
    });
  });
}

function tilt({ desktop }: Ctx) {
  if (!desktop) return;
  fx('tilt').forEach((el) => {
    const rx = gsap.quickTo(el, 'rotateX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotateY', { duration: 0.6, ease: 'power3' });
    gsap.set(el, { transformPerspective: 900 });
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 12); rx(((e.clientY - r.top) / r.height - 0.5) * -12); };
    const leave = () => { rx(0); ry(0); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
  });
}

function magnetic({ desktop }: Ctx) {
  if (!desktop) return;
  fx('magnetic').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.3); y((e.clientY - (r.top + r.height / 2)) * 0.3); };
    const leave = () => { x(0); y(0); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
  });
}

function stickers() {
  fx('stickers').forEach((root) => {
    const items = $$('[data-fx-item]', root);
    gsap.from(items, {
      scale: 0, rotate: () => gsap.utils.random(-90, 90), x: () => gsap.utils.random(-60, 60), y: 40, opacity: 0,
      duration: 0.9, ease: 'back.out(2)', stagger: { each: 0.08, from: 'random' },
      scrollTrigger: { trigger: root, start: 'top 75%', once: true },
    });
    items.forEach((el, i) => gsap.to(el, { y: i % 2 ? -14 : 14, rotate: `+=${i % 2 ? 6 : -6}`, duration: 2.4 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 }));
    items.forEach((el) => gsap.to(el, { yPercent: -60 * Number(el.dataset.depth || 1), ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } }));
  });
}

function words() {
  fx('words').forEach((h) => {
    const split = SplitText.create(h, { type: 'lines,words', mask: 'lines' });
    gsap.from(split.words, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.04, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
  });
}

function count() {
  fx('count').forEach((el) => {
    const to = Number(el.dataset.to || 0), dec = Number(el.dataset.dec || 0), obj = { v: 0 };
    gsap.to(obj, { v: to, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = obj.v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); } });
  });
}

function tunnel({ desktop, mobile }: Ctx) {
  fx('tunnel').forEach((root) => {
    const world = root.querySelector<HTMLElement>('[data-fx-world]');
    const front = root.querySelector<HTMLElement>('[data-fx-front]');
    const layers = $$('[data-fx-layer]', root);
    if (!world) return;
    const travel = mobile ? 1500 : 1900;
    const zs = layers.map((l) => Number(l.dataset.z || -600));
    const state = { z: 0 };
    const render = () => {
      layers.forEach((l, i) => {
        const z = zs[i] + state.z;                          // distance from the camera plane
        const op = z > 380 ? Math.max(0, 1 - (z - 380) / 320) : z < -1500 ? 0.35 : 1;
        l.style.transform = `translate(-50%, -50%) translate3d(0, 0, ${z}px)`;
        l.style.opacity = String(op);
      });
    };
    render();
    // Intro: everything flies in from deep space
    gsap.from(state, { z: -500, duration: 1.8, ease: 'expo.out', onUpdate: render });
    if (front) gsap.from(front.children, { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.3 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${innerHeight * (mobile ? 0.7 : 0.8)}`, pin: root.querySelector('[data-fx-pin]') ?? root, scrub: 0.6, anticipatePin: 1 },
    });
    tl.to(state, { z: travel, ease: 'power1.in', duration: 1, onUpdate: render }, 0);
    if (front) tl.to(front, { scale: 1.1, yPercent: -10, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0.55);
    const hint = root.querySelector('[data-fx-hint]');
    if (hint) tl.to(hint, { opacity: 0, duration: 0.2 }, 0);

    if (!desktop) return;
    const rx = gsap.quickTo(world, 'rotateX', { duration: 1.2, ease: 'power3' });
    const ry = gsap.quickTo(world, 'rotateY', { duration: 1.2, ease: 'power3' });
    const onMove = (e: PointerEvent) => { ry((e.clientX / innerWidth - 0.5) * 10); rx((e.clientY / innerHeight - 0.5) * -6); };
    root.addEventListener('pointermove', onMove);
    cleanups.push(() => root.removeEventListener('pointermove', onMove));
  });
}

function label({ k }: Ctx) {
  fx('label').forEach((el) => {
    const dir = el.dataset.dir === 'right' ? 1 : -1;
    gsap.fromTo(el, { xPercent: dir > 0 ? -25 * k : 5 }, { xPercent: dir > 0 ? 5 : -25 * k, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function speed({ k }: Ctx) {
  $$('[data-speed]').forEach((el) => {
    const s = Number(el.dataset.speed || 0) * k;
    gsap.fromTo(el, { y: 90 * s }, { y: -90 * s, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/** Call once per page. Pinned effects are created first so later triggers measure correctly. */
export function initFx() {
  const mm = gsap.matchMedia();
  mm.add({ desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)' }, (c) => {
    const { desktop, mobile } = c.conditions as { desktop: boolean; mobile: boolean };
    if (!desktop && !mobile) return;
    const ctx: Ctx = { desktop, mobile, k: mobile ? 0.6 : 1 };
    tunnel(ctx);
    carousel(ctx);
    explode(ctx); stack(ctx); ribbons(); columns(ctx); clip(); rise(); tilt(ctx); magnetic(ctx); stickers(); words(); count(); label(ctx); speed(ctx);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => { cleanups.splice(0).forEach((f) => f()); fx('carousel').forEach((r) => r.classList.remove('is-3d')); };
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
