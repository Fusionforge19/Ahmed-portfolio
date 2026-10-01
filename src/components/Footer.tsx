import { ArrowUp } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/content';
import { useTheme } from '../hooks/useTheme';
import Aurora from './backgrounds/Aurora';
import FloatingBubbles from './backgrounds/FloatingBubbles';

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-[var(--powder)] overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      {/* Living background: Aurora with faint floating bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30 z-0">
        <Aurora
          colorStops={isDark ? ['#163248', '#0B1A24', '#479DC7'] : ['#D9F0FA', '#B6DCEB', '#8EC5DE']}
          amplitude={0.7}
          blend={0.8}
          speed={0.35}
        />
      </div>
      <FloatingBubbles bubbleCount={15} className="absolute inset-0 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-[var(--ink)]">Ahmed<span className="text-[var(--glacier-deep)]">.</span></span>
            </div>
            <p className="text-xs text-[var(--ink-soft)] font-medium">
              CS/AIML Student · UE5.6 / C++ Game Developer · Mumbai University
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-5 text-xs font-mono font-semibold text-[var(--ink-soft)]">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--glacier-deep)] transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--glacier-deep)] transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href={SOCIAL_LINKS.itchio} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--glacier-deep)] transition-colors">
              Itch.io
            </a>
            <span>•</span>
            <a href={SOCIAL_LINKS.email} className="hover:text-[var(--glacier-deep)] transition-colors">
              Email
            </a>
          </div>

          {/* Right: Copyright & Back to Top */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--ink-soft)] font-medium">
              © 2026 Ahmed. All rights reserved.
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--powder)] bg-white dark:bg-[var(--bg-alt)] text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] hover:border-[var(--glacier-deep)] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

