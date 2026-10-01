import { useState } from 'react';
import { Sparkles, Terminal, Flame, Compass } from 'lucide-react';

export default function LiveStatusWidget() {
  const [copied, setCopied] = useState(false);

  const handleCopyStatus = () => {
    navigator.clipboard.writeText('Ahmed | Building UE5.6 C++ Chaos Physics & Weapon Hit Systems | Learning since 2025 to present');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopyStatus}
      title="Click to copy current build status"
      className="inline-flex flex-wrap items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-2xl glass-card border border-white/80 dark:border-white/10 shadow-glacier-sm hover:shadow-glacier-md transition-all cursor-pointer group select-none text-left"
    >
      {/* Pulsing online status indicator */}
      <div className="relative flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10" />
        <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
      </div>

      {/* Main Status Text */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-xs">
        <span className="font-mono font-semibold uppercase tracking-wider text-[var(--glacier-deep)] dark:text-[var(--glacier)] flex items-center gap-1">
          <Terminal size={12} />
          Building UE5.6:
        </span>
        <span className="font-medium text-[var(--ink)]">
          Chaos Physics Breakables & Weapon Hitbox System
        </span>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-3.5 bg-[var(--powder)] dark:bg-white/15" />

      {/* C++ Streak Badge */}
      <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--powder)]/40 dark:bg-white/10 text-[var(--ink-soft)] dark:text-[var(--ink)] text-[11px] font-mono">
        <Flame size={12} className="text-amber-500 fill-amber-500/30" />
        <span>Day 142 C++ Streak</span>
      </div>

      {/* UE 5.6 Badge */}
      <div className="hidden lg:inline-flex items-center gap-1 text-[11px] font-mono text-[var(--glacier-deep)]/90 dark:text-[var(--glacier)]">
        <Compass size={12} />
        <span>Learning UE 5.6 (2025 — Present)</span>
      </div>

      {/* Copied feedback indicator */}
      {copied && (
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1 animate-fade-in">
          <Sparkles size={10} /> Copied!
        </span>
      )}
    </div>
  );
}
