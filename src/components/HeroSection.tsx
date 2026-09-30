import { Mail, Gamepad2, FolderOpen, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SOCIAL_LINKS, RESUME_URL } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HeroSection() {
  const revealRef = useScrollReveal(0.05);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -64, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#F5FBFE] dark:bg-[#162F43]"
      style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--sky) 30%, var(--bg-alt) 60%, var(--bg) 100%)',
      }}
    >
      {/* Soft airy blurred radial glow - replaces heavy flat blobs */}
      <div
        aria-hidden
        className="absolute top-1/4 right-1/6 w-[550px] h-[450px] rounded-full pointer-events-none opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #BFE3F5 0%, #8EC5DE 40%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-10 left-10 w-[400px] h-[350px] rounded-full pointer-events-none opacity-30 blur-2xl"
        style={{
          background: 'radial-gradient(circle, #B6DCEB 0%, transparent 70%)',
        }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6 py-12"
      >
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-6 shadow-xs">
          <Gamepad2 size={13} />
          Game Dev &amp; Software Engineer
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold leading-[1.08] text-[var(--ink)] mb-6"
          style={{ fontSize: 'clamp(2.75rem, 7.5vw, 5.25rem)' }}
        >
          Ahmed<span className="text-[var(--glacier-deep)]">.</span>
          <br />
          <span className="text-[var(--ink-soft)] text-[0.52em] font-semibold tracking-normal block mt-2">
            UE5 &amp; C++ · CS/AIML · IEEE
          </span>
        </h1>

        {/* Bio */}
        <p className="text-[var(--ink-soft)] text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
          CS engineering student at Mumbai University, building enemy AI state machines,
          Chaos Physics breakables, and weapon/hit systems in Unreal Engine 5. Also building
          web apps, AI agents, and interactive experiences.{' '}
          <span className="text-[var(--glacier-deep)] font-semibold">Goal: game studio in Japan. 🇯🇵</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
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
        <div className="flex items-center gap-4">
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
            <SocialLink href={SOCIAL_LINKS.itchio}  label="Itch.io">
              <span className="text-sm font-bold">🎮</span>
            </SocialLink>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pt-16 flex items-center gap-2 text-[var(--ink-soft)] opacity-70">
          <span className="text-xs font-mono font-medium">Scroll down to explore</span>
          <div className="w-8 h-px bg-[var(--glacier-deep)] opacity-40" />
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
