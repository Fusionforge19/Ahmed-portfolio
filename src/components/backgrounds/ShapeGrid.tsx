'use client';

import React, { useRef, useEffect } from 'react';

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

export interface ShapeGridProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  shape?: 'square' | 'circle';
  hoverTrailAmount?: number;
  className?: string;
}

export default function ShapeGrid({
  direction = 'diagonal',
  speed = 0.5,
  borderColor = 'rgba(182, 220, 235, 0.25)',
  squareSize = 48,
  hoverFillColor = 'rgba(142, 197, 222, 0.18)',
  shape = 'square',
  hoverTrailAmount = 3,
  className = 'w-full h-full absolute inset-0 pointer-events-auto'
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const trailCells = useRef<GridOffset[]>([]);
  const cellOpacities = useRef<Map<string, number>>(new Map());

  useEffect(() => {
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

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (container.offsetWidth || window.innerWidth) * dpr;
      canvas.height = (container.offsetHeight || window.innerHeight) * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = container.offsetWidth || window.innerWidth;
      const height = container.offsetHeight || window.innerHeight;

      const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const cols = Math.ceil(width / squareSize) + 3;
      const rows = Math.ceil(height / squareSize) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const sx = col * squareSize + offsetX;
          const sy = row * squareSize + offsetY;

          const cellKey = `${col},${row}`;
          const alpha = cellOpacities.current.get(cellKey);
          if (alpha && alpha > 0.01) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = hoverFillColor;
            if (shape === 'circle') {
              ctx.beginPath();
              ctx.arc(sx + squareSize / 2, sy + squareSize / 2, squareSize / 2 - 2, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(sx + 1, sy + 1, squareSize - 2, squareSize - 2);
            }
            ctx.globalAlpha = 1;
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(sx + squareSize / 2, sy + squareSize / 2, squareSize / 2 - 2, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.strokeRect(sx, sy, squareSize, squareSize);
          }
        }
      }
    };

    const updateAnimation = () => {
      if (isVisible) {
        switch (direction) {
          case 'right':
            gridOffset.current.x -= speed;
            break;
          case 'left':
            gridOffset.current.x += speed;
            break;
          case 'up':
            gridOffset.current.y += speed;
            break;
          case 'down':
            gridOffset.current.y -= speed;
            break;
          case 'diagonal':
            gridOffset.current.x -= speed * 0.7;
            gridOffset.current.y -= speed * 0.7;
            break;
          default:
            break;
        }

        cellOpacities.current.forEach((opacity, key) => {
          const newOpacity = opacity * 0.94;
          if (newOpacity < 0.01) {
            cellOpacities.current.delete(key);
          } else {
            cellOpacities.current.set(key, newOpacity);
          }
        });

        drawGrid();
      }
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const col = Math.floor((x - offsetX) / squareSize);
      const row = Math.floor((y - offsetY) / squareSize);

      const cellKey = `${col},${row}`;
      cellOpacities.current.set(cellKey, 1);

      if (hoverTrailAmount > 0) {
        trailCells.current.push({ x: col, y: row });
        if (trailCells.current.length > hoverTrailAmount) {
          trailCells.current.shift();
        }
        trailCells.current.forEach((cell, idx) => {
          const trailKey = `${cell.x},${cell.y}`;
          const targetAlpha = (idx + 1) / (trailCells.current.length + 1);
          const current = cellOpacities.current.get(trailKey) || 0;
          cellOpacities.current.set(trailKey, Math.max(current, targetAlpha));
        });
      }

      hoveredSquareRef.current = { x: col, y: row };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
      trailCells.current = [];
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, hoverTrailAmount, squareSize, shape]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
