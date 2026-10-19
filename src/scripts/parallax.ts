import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, isMobile } from './motion-prefs';

/**
 * Generic layered parallax for marketing pages.
 * Usage: <div data-parallax="0.3"> — positive = moves slower than scroll (drifts down),
 * negative = moves faster (drifts up). Intensity is halved on mobile.
 * Only transform is animated. Phase 2 adds section-specific effects on top of this.
 */
export function initParallax() {
  if (prefersReducedMotion()) return;
  gsap.registerPlugin(ScrollTrigger);
  const factor = isMobile() ? 0.5 : 1;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax ?? 0.2) * factor;
    const trigger = el.closest<HTMLElement>('[data-parallax-root]') ?? el;
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}
