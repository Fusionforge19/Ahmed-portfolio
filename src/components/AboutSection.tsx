import { SKILLS, TECH_MARQUEE } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STAT_CARDS = [
  {
    icon: '🎯',
    title: 'Current Focus',
    subtitle: 'Game development and AI systems, with practical project work in interactive design.',
    badge: 'Active',
  },
  {
    icon: '📚',
    title: 'Computer Science',
    subtitle: 'Bachelor of Engineering in Computer Science, Mumbai University — expected 2028.',
    badge: 'Current',
  },
  {
    icon: '⚡',
    title: 'Project Experience',
    subtitle: 'Built a full-stack marketplace MVP and won a hackathon for a real-time canteen kiosk system.',
    badge: 'Verified',
  },
] as const;

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-[#EEF8FD] dark:bg-[#132737]"
    >
      {/* Soft airy blurred glow */}
      <div
        aria-hidden
        className="absolute top-1/3 right-10 w-[450px] h-[400px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #BFE3F5 0%, #8EC5DE 50%, transparent 70%)' }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            About Me
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
            Who I Am &amp; What I Build
          </h2>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16 items-start">
          {/* Bio + Skills — 3 cols */}
          <div className="lg:col-span-3 space-y-7">
            <p className="text-[var(--ink)] text-base md:text-lg leading-relaxed font-medium">
              I&apos;m a Computer Science engineering student focused on game development and AI systems.
              My work is centered on building interactive projects, implementing gameplay mechanics,
              and applying algorithms to real-time environments.
            </p>
            <p className="text-[var(--ink-soft)] text-sm md:text-base leading-relaxed">
              My coursework includes data structures, algorithms, OOP, computer graphics, AI, and linear
              algebra, which shape how I approach problem solving and product development. I enjoy creating
              practical systems that combine design, logic, and user experience.
            </p>

            {/* IEEE card */}
            <div className="bg-white/85 dark:bg-[rgba(24,50,68,0.85)] border border-[var(--powder)] dark:border-[rgba(94,158,191,0.25)] rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-[0_4px_16px_rgba(47,134,179,0.06)]">
              <span className="text-2xl p-2 rounded-xl bg-[var(--bg-alt)]">⚙️</span>
              <div>
                <p className="font-display font-bold text-[var(--ink)] text-sm md:text-base">IEEE Social Media Joint Head</p>
                <p className="text-[var(--ink-soft)] text-xs mt-0.5">Managing technical community communications &amp; digital content strategy.</p>
              </div>
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[var(--powder)] text-[var(--glacier-deep)] bg-[var(--bg-alt)]">
                Active
              </span>
            </div>

            {/* Clean Skills categories */}
            <div className="space-y-4 pt-2">
              <p className="text-[11px] font-mono font-bold tracking-[1.5px] text-[var(--glacier-deep)] uppercase">
                TECH STACK
              </p>
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category} className="space-y-1.5">
                  <p className="text-xs font-bold text-[var(--ink)]">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/90 dark:bg-[rgba(24,50,68,0.85)] text-[var(--ink)] border border-[var(--powder)] dark:border-[rgba(94,158,191,0.25)] hover:border-[var(--glacier-deep)] transition-colors shadow-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stat cards — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {STAT_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white/90 dark:bg-[rgba(24,50,68,0.85)] border border-[var(--powder)] dark:border-[rgba(94,158,191,0.25)] rounded-2xl p-5 flex gap-4 items-start shadow-[0_4px_16px_rgba(47,134,179,0.06)] hover:-translate-y-0.5 transition-transform"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-[var(--bg-alt)] border border-[var(--powder)]"
                >
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-bold text-[var(--ink)] text-sm truncate">{card.title}</p>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-alt)] text-[var(--glacier-deep)] border border-[var(--powder)]"
                    >
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-[var(--ink-soft)] text-xs leading-relaxed">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Tech marquee strip */}
        <div className="relative overflow-hidden py-3 border-y border-[var(--powder)] bg-white/60 dark:bg-[rgba(24,50,68,0.5)] rounded-xl">
          <div className="marquee-track">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 mx-5 text-xs font-mono font-semibold text-[var(--ink)] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--glacier-deep)] inline-block" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
