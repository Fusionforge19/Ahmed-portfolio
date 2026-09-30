import { useState, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';
import { NAV_LINKS, RESUME_URL } from '../data/content';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [active, setActive]      = useState('hero');

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracker without modifying URL hash
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -64, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  const linkCls = (href: string) =>
    `text-sm font-semibold transition-colors duration-150 px-2 py-1 rounded-md ${
      active === href.slice(1)
        ? 'text-[var(--glacier-deep)] bg-white/70 shadow-xs'
        : 'text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] hover:bg-white/40'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#EEF8FD]/90 dark:bg-[#132737]/90 border-b border-[var(--powder)]/60 backdrop-blur-[8px] shadow-[0_2px_12px_rgba(47,134,179,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-display font-bold text-xl text-[var(--ink)] tracking-tight hover:opacity-85 transition-opacity"
        >
          Ahmed<span className="text-[var(--glacier-deep)]">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={linkCls(l.href)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] hover:bg-white/60 transition-colors cursor-pointer"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Resume */}
          <a
            href={RESUME_URL}
            download
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[var(--glacier-deep)] text-white text-xs font-semibold hover:bg-[#257299] active:scale-95 transition-all shadow-glacier-sm"
          >
            <Download size={13} />
            Resume
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-[var(--ink-soft)] hover:bg-white/60 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#EEF8FD]/98 dark:bg-[#132737]/98 border-t border-[var(--powder)] px-6 py-4 flex flex-col gap-3 shadow-lg">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="text-[var(--ink-soft)] font-semibold text-sm hover:text-[var(--glacier-deep)] transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--glacier-deep)] text-white text-xs font-semibold w-fit mt-2"
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
