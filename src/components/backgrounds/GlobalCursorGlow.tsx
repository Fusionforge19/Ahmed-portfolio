'use client';

import { useEffect, useRef, useState } from 'react';

export default function GlobalCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices and when prefers-reduced-motion is not set
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp follow
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-30 opacity-40 dark:opacity-25 blur-3xl transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle, rgba(142, 197, 222, 0.45) 0%, rgba(182, 220, 235, 0.2) 40%, transparent 70%)',
        willChange: 'transform'
      }}
    />
  );
}
