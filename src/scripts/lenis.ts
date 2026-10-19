import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-prefs';

declare global {
  interface Window { __lenis?: Lenis; }
}

/**
 * Smooth scrolling (marketing pages only). Disabled for reduced motion.
 * Lenis is driven by GSAP's ticker so ScrollTrigger stays in sync.
 */
export function initLenis(): Lenis | undefined {
  if (prefersReducedMotion() || window.__lenis) return window.__lenis;
  gsap.registerPlugin(ScrollTrigger);

  // lerp 0.14 = responsive, not "floaty". Touch scrolling stays native (fast on phones).
  const lenis = new Lenis({ lerp: 0.14, smoothWheel: true, wheelMultiplier: 1.05 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth in-page anchor links
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    const target = document.querySelector(a.getAttribute('href')!);
    if (target) { e.preventDefault(); lenis.scrollTo(target as HTMLElement, { offset: -80 }); }
  });

  window.__lenis = lenis;
  return lenis;
}

export function stopScroll() { window.__lenis?.stop(); document.documentElement.classList.add('scroll-locked'); }
export function startScroll() { window.__lenis?.start(); document.documentElement.classList.remove('scroll-locked'); }
