import { useState, useRef } from 'react';
import { animate } from 'animejs';
import { Gamepad2, GraduationCap, Cpu, Award } from 'lucide-react';

interface StickerData {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Gamepad2;
  initialRotate: number;
  badge: string;
  accentColor: string;
}

const STICKERS: StickerData[] = [
  {
    id: 'ue5',
    title: 'UE5.6 + C++',
    tagline: 'Learning Since 2025',
    icon: Gamepad2,
    initialRotate: -3.5,
    badge: '2025 — PRESENT',
    accentColor: '#2F86B3',
  },
  {
    id: 'grad',
    title: 'Graduating 2028',
    tagline: 'CS & AIML · 2023–2028',
    icon: GraduationCap,
    initialRotate: 4,
    badge: 'DEGREE',
    accentColor: '#8E44AD',
  },
  {
    id: 'fsm',
    title: 'NavMesh AI',
    tagline: 'Patrol · Chase · Hit',
    icon: Cpu,
    initialRotate: -2,
    badge: 'GAMEPLAY AI',
    accentColor: '#27AE60',
  },
  {
    id: 'ieee',
    title: 'IEEE Joint Head',
    tagline: '2025 — Present',
    icon: Award,
    initialRotate: 3,
    badge: 'LEADERSHIP',
    accentColor: '#F39C12',
  },
];

export default function DraggableStickers() {
  return (
    <div className="w-full pt-4 pb-2">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--glacier-deep)] dark:text-[var(--glacier)] font-semibold flex items-center gap-1.5">
          <span>Interactive Stickers</span>
          <span className="text-[var(--ink-soft)] font-normal">(Drag &amp; throw them — they spring back!)</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STICKERS.map((s) => (
          <StickerCard key={s.id} sticker={s} />
        ))}
      </div>
    </div>
  );
}

function StickerCard({ sticker }: { sticker: StickerData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - currentPos.current.x,
      y: e.clientY - currentPos.current.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !cardRef.current) return;
    const x = e.clientX - dragStart.current.x;
    const y = e.clientY - dragStart.current.y;
    currentPos.current = { x, y };

    const rotate = sticker.initialRotate + x * 0.08;
    cardRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1.06)`;
    cardRef.current.style.zIndex = '50';
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !cardRef.current) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // Spring physics back to resting position using Anime.js
    animate(cardRef.current, {
      translateX: 0,
      translateY: 0,
      rotate: sticker.initialRotate,
      scale: 1,
      duration: 850,
      ease: 'outElastic(1, 0.45)',
      complete: () => {
        if (cardRef.current) {
          cardRef.current.style.zIndex = '1';
          currentPos.current = { x: 0, y: 0 };
        }
      },
    });
  };

  const Icon = sticker.icon;

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        transform: `rotate(${sticker.initialRotate}deg)`,
      }}
      className={`relative glass-card p-4 rounded-2xl border-2 border-white/90 dark:border-white/10 shadow-glacier-md cursor-grab active:cursor-grabbing select-none transition-shadow ${
        isDragging ? 'shadow-glacier-lg ring-2 ring-[var(--glacier-deep)]/40' : ''
      }`}
    >
      {/* Tape decoration at top */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-white/70 dark:bg-white/15 backdrop-blur-xs border border-white/60 dark:border-white/10 rounded-xs -rotate-2 opacity-85 pointer-events-none" />

      {/* Top Badge */}
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md text-white shadow-xs"
          style={{ backgroundColor: sticker.accentColor }}
        >
          {sticker.badge}
        </span>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: sticker.accentColor }}
        />
      </div>

      {/* Icon & Title */}
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs"
          style={{ backgroundColor: sticker.accentColor }}
        >
          <Icon size={14} />
        </div>
        <h5 className="font-display font-bold text-xs text-[var(--ink)] leading-tight">
          {sticker.title}
        </h5>
      </div>

      {/* Tagline / Subtitle */}
      <p className="text-[11px] font-mono text-[var(--ink-soft)] leading-snug">
        {sticker.tagline}
      </p>
    </div>
  );
}
