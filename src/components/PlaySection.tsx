import { useState, useEffect, useRef } from 'react';
import { Gamepad2, MousePointerClick } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PlaySection() {
  const revealRef = useScrollReveal();
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-enable scroll overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="play" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      {/* Subtle clean sky gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(191, 227, 245, 0.45), transparent 70%)',
        }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Gamepad2 size={13} />
            Playable Game
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Gate Dive Arcade
          </h2>
          <p className="text-[var(--ink-soft)] max-w-xl text-sm md:text-base leading-relaxed">
            A WebGL speed-runner built from scratch in vanilla JavaScript &amp; HTML5 Canvas.
            Dodge the gates, rack up speed, and beat your high score.
          </p>
        </div>

        {/* Light arcade enclosure frame */}
        <div
          ref={containerRef}
          onMouseLeave={() => setIsPlaying(false)}
          className="relative rounded-2xl p-2.5 md:p-3 bg-white/90 border border-[var(--powder)] shadow-[0_8px_30px_rgba(47,134,179,0.12)] transition-all"
        >
          {/* Bezel header */}
          <div className="flex items-center justify-between px-3 py-1.5 mb-1.5 border-b border-[var(--powder)]/50 text-xs font-mono text-[var(--ink-soft)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="font-semibold text-[11px] text-[var(--ink)]">GATE_DIVE // V1.0</span>
            </div>
            <span className="text-[10px] text-[var(--ink-soft)] hidden sm:inline">
              {isPlaying ? '🎮 Game active (Press Esc to release)' : '🖱️ Hover & click to play'}
            </span>
          </div>

          {/* Iframe wrapper */}
          <div
            className="relative rounded-xl overflow-hidden bg-[#0A121A]"
            style={{
              aspectRatio: '16 / 9',
              maxHeight: '520px',
            }}
          >
            <iframe
              src="/game/index.html"
              title="Gate Dive Arcade Game"
              width="100%"
              height="100%"
              className="w-full h-full block border-0"
              loading="lazy"
              allow="autoplay"
            />

            {/* Click-to-play overlay that prevents scroll hijacking until engaged */}
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 bg-[#0A121A]/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all z-20"
                role="button"
                tabIndex={0}
                aria-label="Click to play Gate Dive"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--glacier-deep)] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MousePointerClick size={26} />
                </div>
                <div className="text-center">
                  <p className="font-display font-bold text-white text-base md:text-lg">
                    Click to Play
                  </p>
                  <p className="text-xs font-mono text-[#8EC5DE] mt-0.5">
                    Wheel scrolling continues smoothly outside
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls hint */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-soft)] mt-4 px-2">
          <span>Controls: <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--powder)] text-[var(--ink)] text-[10px]">A</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--powder)] text-[var(--ink)] text-[10px]">D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--powder)] text-[var(--ink)] text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--powder)] text-[var(--ink)] text-[10px]">→</kbd> to dodge</span>
          <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--powder)] text-[var(--ink)] text-[10px]">Esc</kbd> to unlock scroll</span>
        </div>
      </div>
    </section>
  );
}
