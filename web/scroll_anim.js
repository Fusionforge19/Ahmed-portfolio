/**
 * Anime.js v4 Scroll-Linked Animation Module
 * 
 * Smoothly reveals sections and cards as they enter the viewport.
 * Uses native page scroll without hijacking native scrolling.
 */

import { animate, onScroll, stagger } from 'animejs';

// Toggle for visual trigger boundaries during testing. Set to false for production.
const DEBUG = false;

export function initScrollAnimations() {
  // 1. Respect prefers-reduced-motion:
  // If the user has motion sensitivity enabled, do not animate; leave elements in their final state.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  // 2. Select target elements (existing sections and cards across the portfolio)
  const targetSelectors = [
    '.section',
    '.card',
    '.project-card',
    '.track-wrapper',
    '.contact-section-v2',
    '[data-animate="scroll"]'
  ].join(', ');

  const elements = document.querySelectorAll(targetSelectors);
  if (!elements || elements.length === 0) {
    return;
  }

  // 3. Responsive sync adjustment:
  // Under 768px (mobile devices), touch scrolling moves quickly.
  // Using a higher sync (0.6) tracks the thumb scroll tighter, while 0.25 on desktop offers cinematic fluidity.
  const isMobile = window.innerWidth < 768;
  const syncValue = isMobile ? 0.6 : 0.25;

  // 4. Animate ONLY transform and opacity (GPU-accelerated, zero layout reflows)
  animate(elements, {
    opacity: [0, 1],
    translateY: [40, 0],  // Slide up 40px
    scale: [0.95, 1],      // Subtle scale up from 0.95 to 1
    delay: stagger(100),   // Stagger consecutive elements by 100ms
    ease: 'outQuad',
    autoplay: onScroll({
      // Native window/page scroll — no custom container specified to prevent scroll hijacking

      // 'enter': Defines the trigger point when the animation starts.
      // 'bottom-=50 top' means: when the bottom of the element is 50px below the top of the viewport.
      enter: 'bottom-=50 top',

      // 'leave': Defines the trigger point when the animation ends.
      // 'top+=60 bottom' means: when the top of the element moves 60px past the bottom of the viewport.
      leave: 'top+=60 bottom',

      // 'sync': Progress easing towards the current scroll position instead of snapping.
      // Lower values (0.25) smooth/lag gracefully; higher values (0.6) follow scroll tightly.
      sync: syncValue,

      debug: DEBUG,
    })
  });
}

// Progressive Enhancement: Only attach when DOM is ready; never hide content in static CSS
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
