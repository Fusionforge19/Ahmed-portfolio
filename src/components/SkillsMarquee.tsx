import { useState } from 'react';
import { Cpu, Gamepad2, Layers, Code2, Terminal } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'Game Engine' | 'Language' | 'Systems' | 'AI / Web';
  highlight?: boolean;
}

const TECH_LIST_A: TechItem[] = [
  { name: 'Unreal Engine 5.6', category: 'Game Engine', highlight: true },
  { name: 'C++', category: 'Language', highlight: true },
  { name: 'State Machines', category: 'Systems', highlight: true },
  { name: 'Chaos Physics', category: 'Systems' },
  { name: 'Blueprints', category: 'Game Engine' },
  { name: 'NavMesh AI', category: 'Systems', highlight: true },
  { name: 'Weapon Hitbox Systems', category: 'Systems' },
  { name: 'Blender 3D', category: 'Game Engine' },
];

const TECH_LIST_B: TechItem[] = [
  { name: 'Python', category: 'Language' },
  { name: 'AI Agents / LLMs', category: 'AI / Web', highlight: true },
  { name: 'Gemini AI', category: 'AI / Web', highlight: true },
  { name: 'WebGL & GLSL', category: 'Systems', highlight: true },
  { name: 'Perforce & Git', category: 'Systems' },
  { name: 'TensorFlow / PyTorch', category: 'AI / Web' },
  { name: 'Data Structures', category: 'Systems' },
];

export default function SkillsMarquee() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (category: TechItem['category']) => {
    switch (category) {
      case 'Game Engine':
        return <Gamepad2 size={13} className="text-[var(--glacier-deep)] dark:text-[var(--glacier)]" />;
      case 'Language':
        return <Code2 size={13} className="text-amber-500" />;
      case 'Systems':
        return <Cpu size={13} className="text-emerald-500" />;
      case 'AI / Web':
        return <Layers size={13} className="text-violet-500" />;
    }
  };

  const renderBadge = (item: TechItem, index: number, prefix: string) => {
    const isHovered = hoveredSkill === item.name;
    const isSpecial = item.highlight;

    return (
      <div
        key={`${prefix}-${item.name}-${index}`}
        onMouseEnter={() => setHoveredSkill(item.name)}
        onMouseLeave={() => setHoveredSkill(null)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-200 cursor-default select-none ${
          isSpecial
            ? 'glass-card border-[var(--glacier-deep)]/40 dark:border-[var(--glacier)]/30 text-[var(--ink)] shadow-xs'
            : 'bg-white/60 dark:bg-white/5 border-[var(--powder)]/50 dark:border-white/10 text-[var(--ink-soft)]'
        } ${
          isHovered
            ? 'scale-105 border-[var(--glacier-deep)] dark:border-[var(--glacier)] bg-white/95 dark:bg-white/20 shadow-glacier-md text-[var(--glacier-deep)] dark:text-[var(--glacier)]'
            : ''
        }`}
      >
        {getCategoryIcon(item.category)}
        <span className="font-display font-semibold text-xs whitespace-nowrap">
          {item.name}
        </span>
        <span className="text-[10px] font-mono text-[var(--ink-soft)]/70 px-1.5 py-0.2 rounded-md bg-[var(--powder)]/30 dark:bg-white/10">
          {item.category}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full py-8 overflow-hidden relative border-y border-[var(--powder)]/40 dark:border-white/5 bg-[var(--bg-alt)]/40 dark:bg-[#183244]/40 backdrop-blur-xs">
      {/* Side Fade Gradient Masks */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

      {/* Header bar */}
      <div className="max-w-6xl mx-auto px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[var(--glacier-deep)] dark:text-[var(--glacier)]" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--glacier-deep)] dark:text-[var(--glacier)]">
            Core Technical Arsenal
          </span>
        </div>
        <span className="text-[11px] font-mono text-[var(--ink-soft)] hidden sm:inline">
          Hover to inspect stack & frameworks
        </span>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="flex gap-4 marquee-track mb-3">
        {TECH_LIST_A.map((t, i) => renderBadge(t, i, 'row1-a'))}
        {TECH_LIST_A.map((t, i) => renderBadge(t, i, 'row1-b'))}
      </div>

      {/* Row 2: Reverse Marquee */}
      <div
        className="flex gap-4 marquee-track"
        style={{ animationDirection: 'reverse', animationDuration: '40s' }}
      >
        {TECH_LIST_B.map((t, i) => renderBadge(t, i, 'row2-a'))}
        {TECH_LIST_B.map((t, i) => renderBadge(t, i, 'row2-b'))}
      </div>
    </div>
  );
}
