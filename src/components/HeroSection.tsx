import { useEffect } from 'react';
import { Mail, Gamepad2, FolderOpen, Download } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SOCIAL_LINKS, RESUME_URL } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';
import Aurora from './backgrounds/Aurora';
import Particles from './backgrounds/Particles';
import LiveStatusWidget from './LiveStatusWidget';
import HeroLineDrawing from './HeroLineDrawing';

export default function HeroSection() {
  const revealRef = useScrollReveal(0.05);
  const { isDark } = useTheme();

  // Anime.js v4 entrance animation sequence
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    animate('.hero-stagger-item', {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 1100,
      delay: stagger(130, { start: 200 }),
      ease: 'outQuart',
    });
  }, []);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, opts: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -64 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#F5FBFE] dark:bg-[#162F43]"
      style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--sky) 30%, var(--bg-alt) 60%, var(--bg) 100%)',
      }}
    >
      {/* Living background: Aurora + light Particles layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75 dark:opacity-60 z-0">
        <Aurora
          colorStops={isDark ? ['#0B1A24', '#163248', '#479DC7'] : ['#D9F0FA', '#B6DCEB', '#8EC5DE']}
          amplitude={1.05}
          blend={0.65}
          speed={0.6}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-35 z-0">
        <Particles
          particleCount={70}
          particleSpread={12}
          speed={0.08}
          particleColors={isDark ? ['#479DC7', '#5E9EBF', '#B8D9EC'] : ['#8EC5DE', '#B6DCEB', '#D9F0FA']}
          particleBaseSize={60}
          moveParticlesOnHover={true}
        />
      </div>

      {/* Soft airy blurred radial glow */}
      <div
        aria-hidden
        className="absolute top-1/4 right-1/6 w-[550px] h-[450px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #BFE3F5 0%, #8EC5DE 40%, transparent 70%)',
        }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow badge + Live Status Widget */}
            <div className="hero-stagger-item flex flex-wrap items-center gap-3 mb-6 opacity-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase shadow-xs">
                <Gamepad2 size={13} />
                Game Dev &amp; Software Engineer
              </div>
              <LiveStatusWidget />
            </div>

            {/* Headline */}
            <h1
              className="hero-stagger-item font-display font-bold leading-[1.08] text-[var(--ink)] mb-6 opacity-0"
              style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)' }}
            >
              Ahmed<span className="text-[var(--glacier-deep)]">.</span>
              <br />
              <span className="text-[var(--ink-soft)] text-[0.52em] font-semibold tracking-normal block mt-2">
                UE5.6 &amp; C++ · CS/AIML · IEEE
              </span>
            </h1>

            {/* Bio */}
            <p className="hero-stagger-item text-[var(--ink-soft)] text-lg md:text-xl leading-relaxed max-w-2xl mb-10 opacity-0">
              CS engineering student at Mumbai University, building enemy AI state machines,
              Chaos Physics breakables, and weapon/hit systems in Unreal Engine 5.6. Also building
              web apps, AI agents, and interactive experiences.
            </p>

            {/* CTAs */}
            <div className="hero-stagger-item flex flex-wrap items-center gap-4 mb-12 opacity-0">
              <button
                onClick={() => handleScrollTo('play')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--glacier-deep)] text-white font-semibold text-sm hover:bg-[#257299] active:scale-95 transition-all shadow-[0_4px_16px_rgba(47,134,179,0.25)] cursor-pointer"
              >
                <Gamepad2 size={17} />
                Play Gate Dive
              </button>
              <button
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--glacier-deep)] text-[var(--glacier-deep)] font-semibold text-sm bg-white/70 hover:bg-[#BFE3F5]/30 active:scale-95 transition-all cursor-pointer"
              >
                <FolderOpen size={17} />
                View Projects
              </button>
              <a
                href={RESUME_URL}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.7)] text-[var(--ink)] font-semibold text-sm hover:border-[var(--glacier-deep)] hover:text-[var(--glacier-deep)] active:scale-95 transition-all shadow-xs"
              >
                <Download size={16} />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="hero-stagger-item flex items-center gap-4 opacity-0">
              <span className="text-xs font-mono font-semibold text-[var(--ink-soft)] uppercase tracking-wider">FIND ME ON</span>
              <div className="flex gap-2.5">
                <SocialLink href={SOCIAL_LINKS.github}   label="GitHub">
                  <GithubIcon size={18} />
                </SocialLink>
                <SocialLink href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                  <LinkedinIcon size={18} />
                </SocialLink>
                <SocialLink href={SOCIAL_LINKS.email}    label="Email">
                  <Mail size={18} />
                </SocialLink>
                <SocialLink href={SOCIAL_LINKS.itchio} label="Itch.io">
                  <Gamepad2 size={18} />
                </SocialLink>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="hero-stagger-item pt-14 flex items-center gap-2 text-[var(--ink-soft)] opacity-0">
              <span className="text-xs font-mono font-medium">Scroll down to explore</span>
              <div className="w-8 h-px bg-[var(--glacier-deep)] opacity-40" />
            </div>
          </div>

          {/* Right Column: Animated Controller Line Drawing (5 cols) */}
          <div className="hero-stagger-item lg:col-span-5 flex justify-center items-center opacity-0">
            <HeroLineDrawing />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/90 dark:bg-[rgba(24,50,68,0.85)] border border-[var(--powder)] dark:border-[rgba(94,158,191,0.25)] text-[var(--ink)] hover:border-[var(--glacier-deep)] hover:text-[var(--glacier-deep)] hover:scale-105 active:scale-95 transition-all shadow-xs"
    >
      {children}
    </a>
  );
}
