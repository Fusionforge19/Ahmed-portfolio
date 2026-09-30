import { ArrowUp } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 border-t border-[var(--powder)] overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Japanese motto */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-[var(--ink)]">Ahmed<span className="text-[var(--glacier-deep)]">.</span></span>
            <span className="text-xs font-mono font-semibold text-[var(--glacier-deep)] px-2 py-0.5 rounded-md bg-white dark:bg-[var(--bg-alt)] border border-[var(--powder)]">
              ゲーム開発者を目指して
            </span>
          </div>
          <p className="text-xs text-[var(--ink-soft)] font-medium">
            CS/AIML Student · UE5 / C++ Game Developer · Mumbai University
          </p>
        </div>

        {/* Center: Social links quick access */}
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
            © 2026. Built with React &amp; Tailwind.
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
    </footer>
  );
}
