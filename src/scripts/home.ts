/**
 * Homepage scroll experience — runs on desktop AND mobile (mobile uses lighter values).
 * Nothing runs under prefers-reduced-motion: content stays static and fully visible.
 * Pinned sections are created first, in page order, so later triggers measure pin spacing correctly.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

const MOTION_OK = '(prefers-reduced-motion: no-preference)';
const DESKTOP = `(min-width: 768px) and ${MOTION_OK}`;
const MOBILE = `(max-width: 767px) and ${MOTION_OK}`;

/* ───────── Hero ───────── */
function heroIntro() {
  const title = $('.hero-title');
  if (!title) return;
  const split = SplitText.create(title, { type: 'lines,chars', mask: 'lines' });
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.hero-bg img', { scale: 1.3, duration: 1.6, ease: 'power3.out' }, 0)
    .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.016 }, 0.05)
    .from('.hero-points li', { y: 16, opacity: 0, duration: 0.7, stagger: 0.06 }, 0.45)
    .from('.hero-sub > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.55)
    .from('.hero-tool > *, .hero-tool-mobile > *', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, 0.5)
    .from('.hero-bar > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7);
}

function heroScroll(intensity: number) {
  const st = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero-bg', { yPercent: 30 * intensity, scale: 1.08, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-ghost', { yPercent: -45 * intensity, xPercent: -10 * intensity, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-copy', { yPercent: -20 * intensity, opacity: 0.1, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-tool', { yPercent: -18 * intensity, ease: 'none', scrollTrigger: st });
}

/* ───────── Pinned: reading statement ───────── */
function statementPinned(mobile: boolean) {
  const words = $$('.st-word');
  if (!words.length) return;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#statement',
      start: 'top top',
      end: () => `+=${window.innerHeight * (mobile ? 1.1 : 1.3)}`,
      pin: '.st-pin',
      scrub: 0.4,
      anticipatePin: 1,
    },
  });
  tl.to(words, { opacity: 1, stagger: 0.1, duration: 0.3, ease: 'none' }, 0)
    .fromTo('.st-progress-bar', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0);
}

/* ───────── Pinned: how it works ───────── */
function howPinned(mobile: boolean) {
  const section = $('#how');
  if (!section) return;
  section.classList.add('pin-mode');
  const steps = $$('.how-step', section);
  const bars = $$('.how-bar', section);
  gsap.set(steps.slice(1), { autoAlpha: 0 });
  gsap.set(bars[0], { scaleX: 1 });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut', duration: 1 },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * steps.length * (mobile ? 0.55 : 0.6)}`,
      pin: '.how-pin',
      scrub: 0.4,
      anticipatePin: 1,
    },
  });
  steps.forEach((step, i) => {
    tl.fromTo($('.how-photo', step), { scale: 1.2 }, { scale: 1.04, ease: 'none', duration: 1.4 }, i * 1.4);
    if (i === 0) return;
    const prev = steps[i - 1];
    const at = i * 1.4 - 0.4;
    tl.to($('.how-text', prev), { y: -40, opacity: 0, duration: 0.45, ease: 'power2.in' }, at)
      .to($('.how-img', prev), { scale: 0.94, opacity: 0, duration: 0.5, ease: 'power2.in' }, at)
      .set(step, { autoAlpha: 1 }, at + 0.45)
      .from($('.how-text', step), { y: 60, opacity: 0, duration: 0.6, ease: 'power3.out' }, at + 0.5)
      .from($('.how-img', step), { yPercent: 12, scale: 1.04, opacity: 0, duration: 0.6, ease: 'power3.out' }, at + 0.45)
      .to(bars[i], { scaleX: 1, ease: 'none', duration: 0.6 }, at);
  });
  return () => section.classList.remove('pin-mode');
}

/* ───────── Pinned: horizontal programs ───────── */
function programsHorizontal() {
  const section = $('#programs');
  const track = $('.prog-track');
  if (!section || !track) return;
  const distance = () => track.scrollWidth - window.innerWidth;
  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, pin: '.prog-pin', scrub: 0.4, invalidateOnRefresh: true, anticipatePin: 1 },
  });
  $$('.prog-photo').forEach((img) => {
    gsap.fromTo(img, { xPercent: 0 }, {
      xPercent: -16, ease: 'none',
      scrollTrigger: { trigger: img.closest('.prog-card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
    });
  });
  gsap.from('.prog-card', { y: 60, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } });
}

/* ───────── Non-pinned effects ───────── */
function splitHeadings() {
  $$('.split-heading').forEach((h) => {
    const split = SplitText.create(h, { type: 'lines,words', mask: 'lines' });
    gsap.from(split.words, {
      yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.035,
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });
}

function servicesStack() {
  const cards = $$('.svc-card');
  cards.forEach((card, i) => {
    const inner = $('.svc-inner', card)!;
    // Photo drifts inside its frame
    gsap.fromTo($('.svc-media', card), { yPercent: -7 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    // Content rises in as the card arrives
    gsap.from($$('.svc-content > *', card), {
      y: 50, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: card, start: 'top 75%', once: true },
    });
    // Covered card scales back and dims while the next one slides over it
    const next = cards[i + 1];
    if (!next) return;
    const st = { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true };
    gsap.to(inner, { scale: 0.9 + i * 0.006, ease: 'none', scrollTrigger: st });
    gsap.to($('.svc-shade', card), { opacity: 0.65, ease: 'none', scrollTrigger: st });
  });
}

function imageParallax() {
  $$('[data-img-parallax]').forEach((frame) => {
    const img = $('img', frame);
    if (!img) return;
    gsap.fromTo(img, { yPercent: -16 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function numbers(mobile: boolean) {
  gsap.fromTo('.num-panel', { scaleX: mobile ? 0.92 : 0.86, scaleY: 0.94 }, {
    scaleX: 1, scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '#numbers', start: 'top bottom', end: 'top 25%', scrub: true },
  });
  gsap.from('.num-item', { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '#numbers dl', start: 'top 85%', once: true } });
  $$('.counter').forEach((el, i) => {
    const target = Number(el.dataset.target);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: target, duration: 2, delay: i * 0.12, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US'); },
      scrollTrigger: { trigger: '#numbers dl', start: 'top 85%', once: true },
    });
  });
}

function nutrition() {
  $$('.macro-bar').forEach((bar) => {
    gsap.fromTo(bar, { scaleX: 0 }, { scaleX: Number(bar.dataset.w), duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: '.nut-badge', start: 'top 90%', once: true } });
  });
}

function finalCta() {
  gsap.fromTo('.cta-marquee', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '#final-cta', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.cta-chip', { y: 24, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: '#final-cta', start: 'top 65%', once: true } });
}

function sectionColors() {
  // Subtle dark-to-dark shifts only; the lime numbers panel is self-contained.
  document.documentElement.classList.add('bg-managed');
  $$('[data-section-bg]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) gsap.to(document.body, { backgroundColor: sec.dataset.sectionBg, duration: 0.6, overwrite: 'auto' }); },
    });
  });
  return () => document.documentElement.classList.remove('bg-managed');
}

/* ───────── Init ───────── */
function init() {
  if (window.matchMedia(MOTION_OK).matches) gsap.set('.hero-intro', { autoAlpha: 1 });

  const mm = gsap.matchMedia();
  mm.add({ desktop: DESKTOP, mobile: MOBILE }, (ctx) => {
    const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
    if (!desktop && !mobile) return;

    heroIntro();
    heroScroll(mobile ? 0.6 : 1);
    // Pins, in page order
    statementPinned(mobile);
    const offHow = howPinned(mobile);
    programsHorizontal();
    // Everything else
    splitHeadings();
    servicesStack();
    imageParallax();
    numbers(mobile);
    nutrition();
    finalCta();
    const offColors = sectionColors();

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => { offHow?.(); offColors?.(); };
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

init();
