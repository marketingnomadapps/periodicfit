/**
 * Tool page motion on top of fx.ts (tunnel hero, label, speeds):
 * rising tool panels, a floating background orb field, guide headings with giant
 * parallax index numbers and a sweeping underline, reading progress and the CTA image.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const has = (s: string) => !!document.querySelector(s);

gsap.matchMedia().add({ desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)' }, (ctx) => {
  const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
  if (!desktop && !mobile) return;
  const k = mobile ? 0.6 : 1;

  if (has('.tool-rise')) {
    $$('.tool-rise').forEach((el, i) => gsap.from(el, { y: 90, rotateX: -12, transformPerspective: 1000, opacity: 0, duration: 1.1, ease: 'expo.out', delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
  }

  // Guide: progress bar, giant parallax numbers behind each h2, sweeping underline
  if (has('.guide-progress') && has('.guide-body')) {
    gsap.fromTo('.guide-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.guide-body', start: 'top 60%', end: 'bottom 60%', scrub: true } });
  }
  $$('.guide-body h2').forEach((h, i) => {
    h.style.position = 'relative';
    // Giant index number in its OWN line above the heading; drifts sideways only, so it never covers text
    const num = document.createElement('div');
    num.setAttribute('aria-hidden', 'true');
    num.textContent = String(i + 1).padStart(2, '0');
    num.style.cssText = 'display:block;margin:2.2em 0 0.25em;font-size:clamp(3rem,7vw,5.5rem);line-height:0.9;font-weight:700;font-family:var(--font-display);color:transparent;-webkit-text-stroke:1px rgb(198 255 61 / 0.4);pointer-events:none;';
    h.before(num);
    h.style.marginTop = '0';
    const bar = document.createElement('span');
    bar.setAttribute('aria-hidden', 'true');
    bar.style.cssText = 'position:absolute;left:0;bottom:-10px;height:3px;width:64px;background:var(--color-primary);border-radius:3px;transform-origin:left;';
    h.append(bar);
    gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 85%', once: true } })
      .from(h, { x: -30, opacity: 0, duration: 0.8, ease: 'expo.out' })
      .from(bar, { scaleX: 0, duration: 0.8, ease: 'expo.out' }, 0.2);
    gsap.fromTo(num, { x: 80 * k }, { x: -20 * k, ease: 'none', scrollTrigger: { trigger: num, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('.guide-body > p, .guide-body > ul, .guide-body > ol, .guide-body > table').forEach((el) => {
    gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  // Floating orbs behind the guide and related sections (pure decoration, transform only)
  $$('[data-orb]').forEach((o) => {
    const s = Number(o.dataset.orb || 1);
    gsap.fromTo(o, { y: 160 * s * k }, { y: -160 * s * k, ease: 'none', scrollTrigger: { trigger: o.parentElement ?? o, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  if (has('.cta-media')) gsap.fromTo('.cta-media', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.tool-cta', start: 'top bottom', end: 'bottom top', scrub: true } });
});
