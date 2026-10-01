import { useState, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';
import { NAV_LINKS, RESUME_URL } from '../data/content';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  // Track scroll position for subtle elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver to highlight active section in dock
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
      { rootMargin: '-25% 0px -55% 0px' }
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
      // If Lenis instance exists on window, use it; otherwise native smooth scroll
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -70 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Floating Brand Pill */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="pointer-events-auto glass-card px-4 py-2 rounded-full border border-white/80 dark:border-white/10 shadow-glacier-sm hover:shadow-glacier-md transition-all flex items-center gap-1.5 group select-none"
        >
          <span className="font-display font-bold text-base text-[var(--ink)] tracking-tight">
            Ahmed
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--glacier-deep)] dark:bg-[var(--glacier)] group-hover:scale-150 transition-transform" />
        </a>

        {/* Central Sticky Dock Pill (Desktop) */}
        <nav
          aria-label="Main Navigation Dock"
          className={`hidden md:flex pointer-events-auto items-center gap-1 px-3 py-1.5 rounded-full glass-card border border-white/80 dark:border-white/10 transition-all duration-200 ${
            scrolled ? 'shadow-glacier-md scale-[0.98]' : 'shadow-glacier-sm'
          }`}
        >
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
                  isActive
                    ? 'text-[var(--glacier-deep)] dark:text-[var(--glacier)] bg-white/95 dark:bg-white/15 shadow-xs font-bold scale-105'
                    : 'text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] hover:bg-white/50 dark:hover:bg-white/10'
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-[var(--glacier-deep)] dark:bg-[var(--glacier)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls Pill */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="glass-card p-2 rounded-full border border-white/80 dark:border-white/10 text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] shadow-glacier-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Resume Download */}
          <a
            href={RESUME_URL}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--glacier-deep)] text-white text-xs font-semibold hover:bg-[#257299] active:scale-95 transition-all shadow-glacier-sm"
          >
            <Download size={13} />
            Resume
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden glass-card p-2 rounded-full border border-white/80 dark:border-white/10 text-[var(--ink-soft)] shadow-glacier-sm"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {menuOpen && (
        <div className="md:hidden pointer-events-auto mt-2 max-w-sm mx-auto glass-card rounded-2xl p-4 border border-white/80 dark:border-white/10 shadow-glacier-lg flex flex-col gap-2 animate-fade-in">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                active === l.href.slice(1)
                  ? 'bg-[var(--glacier-deep)] text-white shadow-xs'
                  : 'text-[var(--ink-soft)] hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--glacier-deep)] text-white text-xs font-semibold mt-2"
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
