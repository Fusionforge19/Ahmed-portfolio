import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swaySpeed: number;
  swayDist: number;
  swayOffset: number;
}

export default function SakuraOverlay({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const PETAL_COUNT = 38;
    const petals: Petal[] = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: 9 + Math.random() * 8,
        speedX: 0.8 + Math.random() * 1.4,
        speedY: 1.2 + Math.random() * 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        opacity: 0.45 + Math.random() * 0.4,
        swaySpeed: 0.02 + Math.random() * 0.03,
        swayDist: 15 + Math.random() * 20,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    let time = 0;

    const drawPetal = (x: number, y: number, size: number, rot: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(Math.cos(rot * 0.5), 1);

      ctx.fillStyle = `rgba(255, 180, 195, ${opacity})`;
      ctx.strokeStyle = `rgba(240, 140, 165, ${opacity * 0.8})`;
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.8, size * 0.4, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.4, -size * 0.8, -size * 0.8, 0, -size);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        }

        drawPetal(p.x, p.y, p.size, p.rotation, p.opacity);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[45]"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
