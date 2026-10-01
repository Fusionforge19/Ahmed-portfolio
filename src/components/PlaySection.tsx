import { useState, useEffect, useRef } from 'react';
import { Gamepad2, MousePointerClick, Maximize2, Minimize2, Trophy, RotateCcw } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';
import ShapeGrid from './backgrounds/ShapeGrid';

export default function PlaySection() {
  const revealRef = useScrollReveal();
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('gate_dive_high_score') || '1280');
    } catch {
      return 1280;
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const arcadeFrameRef = useRef<HTMLDivElement>(null);

  // Re-enable scroll overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPlaying(false);
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Listen to message from game iframe if it posts scores
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data.score === 'number') {
        const score = e.data.score;
        setHighScore((prev) => {
          if (score > prev) {
            try {
              localStorage.setItem('gate_dive_high_score', String(score));
            } catch {}
            return score;
          }
          return prev;
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const toggleFullscreen = () => {
    if (!arcadeFrameRef.current) return;
    if (!document.fullscreenElement) {
      arcadeFrameRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <section id="play" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      {/* Living background: subtle Squares grid so it never looks blank */}
      <div className="absolute inset-0 pointer-events-auto opacity-50 dark:opacity-30 z-0">
        <ShapeGrid
          shape="square"
          squareSize={44}
          speed={0.4}
          direction="diagonal"
          borderColor={isDark ? 'rgba(94, 158, 191, 0.2)' : 'rgba(182, 220, 235, 0.35)'}
          hoverFillColor={isDark ? 'rgba(94, 158, 191, 0.25)' : 'rgba(142, 197, 222, 0.25)'}
        />
      </div>

      {/* Subtle clean sky gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] dark:text-[var(--glacier)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
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

        {/* Arcade Enclosure Card with Pixel-art aesthetic frame */}
        <div
          ref={arcadeFrameRef}
          className="relative rounded-2xl p-2.5 md:p-4 glass-card border-2 border-white/80 dark:border-white/10 shadow-glacier-lg transition-all"
        >
          {/* Bezel header: High score + Controls + Fullscreen */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 mb-2 border-b border-[var(--powder)]/50 dark:border-white/10 text-xs font-mono">
            {/* System Status */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="font-bold text-[12px] text-[var(--ink)] tracking-wider">
                GATE_DIVE // V1.0 ARCADE
              </span>
            </div>

            {/* High Score Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs shadow-xs">
              <Trophy size={13} />
              <span>HIGH SCORE: {highScore.toLocaleString()}</span>
            </div>

            {/* Actions: Fullscreen & Status */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--ink-soft)] hidden md:inline">
                {isPlaying ? '🎮 Active (Esc to release)' : '🖱️ Click frame to engage'}
              </span>
              <button
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen Game"
                className="p-1.5 rounded-lg bg-white/70 dark:bg-white/10 text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] border border-[var(--powder)] cursor-pointer hover:scale-105 transition-all"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>
          </div>

          {/* Iframe wrapper */}
          <div
            ref={containerRef}
            onMouseLeave={() => setIsPlaying(false)}
            className="relative rounded-xl overflow-hidden bg-[#0A121A] border border-[var(--powder)]/40 dark:border-white/10"
            style={{
              aspectRatio: '16 / 9',
              maxHeight: isFullscreen ? '90vh' : '520px',
            }}
          >
            <iframe
              src="/game/index.html"
              title="Gate Dive Arcade Game"
              width="100%"
              height="100%"
              className="w-full h-full block border-0"
              loading="lazy"
              allow="autoplay; fullscreen"
            />

            {/* Click-to-play overlay that prevents scroll hijacking until engaged */}
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 bg-[#0A121A]/75 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3.5 cursor-pointer group transition-all z-20 select-none"
                role="button"
                tabIndex={0}
                aria-label="Click to play Gate Dive"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--glacier-deep)] text-white flex items-center justify-center shadow-glacier-md group-hover:scale-110 active:scale-95 transition-transform">
                  <MousePointerClick size={28} />
                </div>
                <div className="text-center">
                  <p className="font-display font-bold text-white text-lg md:text-xl tracking-tight">
                    Click to Play Gate Dive
                  </p>
                  <p className="text-xs font-mono text-[#8EC5DE] mt-1">
                    Press Space / Arrow keys to maneuver · Esc to unlock page scroll
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls hint */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[var(--ink-soft)] mt-4 px-2 gap-2">
          <span>Controls: <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] text-[10px]">A</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] text-[10px]">D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] text-[10px]">→</kbd> to dodge gates</span>
          <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] text-[10px]">Esc</kbd> to unlock scroll</span>
        </div>
      </div>
    </section>
  );
}
