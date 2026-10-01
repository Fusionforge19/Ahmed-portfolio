'use client';

import React, { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobblePhase: number;
  alpha: number;
}

export default function FloatingBubbles({
  bubbleCount = 28,
  className = 'w-full h-full absolute inset-0 pointer-events-none'
}: {
  bubbleCount?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let width = (canvas.width = container.offsetWidth || window.innerWidth);
    let height = (canvas.height = container.offsetHeight || 600);

    const resize = () => {
      width = canvas.width = container.offsetWidth || window.innerWidth;
      height = canvas.height = container.offsetHeight || 600;
    };
    window.addEventListener('resize', resize);

    const bubbles: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 4 + Math.random() * 14,
        speed: 0.3 + Math.random() * 0.7,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 10 + Math.random() * 20,
        wobblePhase: Math.random() * Math.PI * 2,
        alpha: 0.12 + Math.random() * 0.22
      });
    }

    let rafId: number;
    let t = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed;
        b.wobblePhase += b.wobbleSpeed;

        const currentX = b.x + Math.sin(b.wobblePhase) * b.wobbleAmp;

        // Reset if floats off top
        if (b.y < -b.radius * 2) {
          b.y = height + b.radius * 2;
          b.x = Math.random() * width;
        }

        // Draw bubble with soft inner gradient
        const grad = ctx.createRadialGradient(
          currentX - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.1,
          currentX,
          b.y,
          b.radius
        );
        grad.addColorStop(0, `rgba(217, 240, 250, ${b.alpha * 1.5})`);
        grad.addColorStop(0.6, `rgba(182, 220, 235, ${b.alpha})`);
        grad.addColorStop(1, `rgba(142, 197, 222, ${b.alpha * 0.4})`);

        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Delicate bubble outline rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 1.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [bubbleCount]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
