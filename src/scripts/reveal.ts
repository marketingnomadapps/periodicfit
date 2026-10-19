import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-prefs';

/**
 * Subtle fade-up for any [data-reveal] element. Safe for every page (blog included).
 * Optional: data-reveal-delay="0.1"
 */
export function initReveals() {
  if (prefersReducedMotion()) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      delay: Number(el.dataset.revealDelay ?? 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}
