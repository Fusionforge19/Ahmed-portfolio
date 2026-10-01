'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  vx: number;
  vy: number;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 142, g: 197, b: 222 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

export default function DotGrid({
  dotSize = 4,
  gap = 24,
  baseColor = '#B6DCEB',
  activeColor = '#4C9BC0',
  proximity = 120,
  shockRadius = 180,
  shockStrength = 8,
  className = 'w-full h-full absolute inset-0 pointer-events-auto',
  style
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastTime: 0,
    lastX: -9999,
    lastY: -9999
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId: number;
    let isVisible = true;

    const wrap = wrapperRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(wrap);

    const proxSq = proximity * proximity;
    const springK = 0.08;
    const damping = 0.86;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!isVisible) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i];

        // Spring physics simulation towards (0, 0)
        const ax = -dot.xOffset * springK;
        const ay = -dot.yOffset * springK;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.xOffset += dot.vx;
        dot.yOffset += dot.vy;

        // Draw position
        const drawX = (dot.cx + dot.xOffset) * dpr;
        const drawY = (dot.cy + dot.yOffset) * dpr;

        // Proximity glow
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let fillStyle = `rgba(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}, 0.35)`;
        let currentSize = dotSize;

        if (dsq <= proxSq && px > 0) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          const alpha = 0.35 + 0.6 * t;
          fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          currentSize = dotSize + 1.5 * t;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, (currentSize * dpr) / 2, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [proximity, baseRgb, activeRgb, dotSize]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window && wrapperRef.current) {
      ro = new ResizeObserver(buildGrid);
      ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    const onPointerMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? Math.max(now - pr.lastTime, 8) : 16;
      const vx = ((x - pr.lastX) / dt) * 10;
      const vy = ((y - pr.lastY) / dt) * 10;

      pr.lastTime = now;
      pr.lastX = x;
      pr.lastY = y;
      pr.vx = vx;
      pr.vy = vy;
      pr.x = x;
      pr.y = y;

      // Displace dots in proximity
      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i];
        const dx = dot.cx - x;
        const dy = dot.cy - y;
        const dist = Math.hypot(dx, dy);

        if (dist < proximity && dist > 0) {
          const force = (1 - dist / proximity) * 3;
          dot.vx += (dx / dist) * force + vx * 0.05;
          dot.vy += (dy / dist) * force + vy * 0.05;
        }
      }
    };

    const onPointerLeave = () => {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    };

    const onClick = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i];
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && dist > 0) {
          const force = (1 - dist / shockRadius) * shockStrength;
          dot.vx += ((dot.cx - cx) / dist) * force * 4;
          dot.vy += ((dot.cy - cy) / dist) * force * 4;
        }
      }
    };

    wrap.addEventListener('mousemove', onPointerMove);
    wrap.addEventListener('mouseleave', onPointerLeave);
    wrap.addEventListener('click', onClick);

    return () => {
      wrap.removeEventListener('mousemove', onPointerMove);
      wrap.removeEventListener('mouseleave', onPointerLeave);
      wrap.removeEventListener('click', onClick);
    };
  }, [proximity, shockRadius, shockStrength]);

  return (
    <div ref={wrapperRef} className={className} style={style}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
