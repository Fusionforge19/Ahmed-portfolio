import { SKILLS, TECH_MARQUEE } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';
import DotGrid from './backgrounds/DotGrid';
import EnemyAIStateMachine from './EnemyAIStateMachine';
import DraggableStickers from './DraggableStickers';
import { Award, Gamepad2, Sparkles, GraduationCap } from 'lucide-react';

const STAT_CARDS = [
  {
    icon: '🎯',
    title: 'Current Focus',
    subtitle: 'Unreal Engine 5.6 + C++ gameplay mechanics, enemy AI state machines & Chaos Physics (learning since 2025 to present).',
    badge: 'Active',
  },
  {
    icon: '📚',
    title: 'Computer Science & AIML',
    subtitle: 'Bachelor of Engineering in CS (AIML), Mumbai University — graduating 2028 (2023–2028).',
    badge: 'Degree',
  },
  {
    icon: '⚡',
    title: 'Engineering Experience',
    subtitle: 'Built full-stack applications, WebScout AI agent, and real-time interactive game systems.',
    badge: 'Verified',
  },
] as const;

export default function AboutSection() {
  const revealRef = useScrollReveal();
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-[#EEF8FD] dark:bg-[#132737]"
    >
      {/* Living background: cursor-reactive DotGrid */}
      <div className="absolute inset-0 pointer-events-auto opacity-70 dark:opacity-40 z-0">
        <DotGrid
          dotSize={4}
          gap={28}
          baseColor={isDark ? '#375F7D' : '#B6DCEB'}
          activeColor={isDark ? '#5E9EBF' : '#2F86B3'}
          proximity={140}
        />
      </div>

      {/* Soft airy blurred glow */}
      <div
        aria-hidden
        className="absolute top-1/3 right-10 w-[450px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #BFE3F5 0%, #8EC5DE 50%, transparent 70%)' }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] dark:text-[var(--glacier)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            About Me
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
            Who I Am &amp; What I Build
          </h2>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-start">
          {/* Bio + Skills — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/70 dark:border-white/10 space-y-4">
              <p className="text-[var(--ink)] text-base md:text-lg leading-relaxed font-medium">
                I&apos;m a Computer Science engineering student at Mumbai University specializing in AI &amp; Machine Learning, with a deep focus on <span className="text-[var(--glacier-deep)] dark:text-[var(--glacier)] font-bold">Unreal Engine 5.6 and C++ game development</span>.
              </p>
              <p className="text-[var(--ink-soft)] text-sm md:text-base leading-relaxed">
                My projects include building autonomous enemy AI finite state machines (patrol, chase, attack routines backed by NavMesh), Chaos Physics breakables, and modular weapon hit-detection systems.
              </p>

              {/* Badges / Stickers strip */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 dark:bg-white/10 border border-[var(--powder)] text-xs font-mono font-medium text-[var(--ink)] shadow-xs">
                  <Gamepad2 size={13} className="text-[var(--glacier-deep)]" /> UE5.6 &amp; C++
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 dark:bg-white/10 border border-[var(--powder)] text-xs font-mono font-medium text-[var(--ink)] shadow-xs">
                  <GraduationCap size={13} className="text-[var(--glacier-deep)]" /> Graduating 2028
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 dark:bg-white/10 border border-[var(--powder)] text-xs font-mono font-medium text-[var(--ink)] shadow-xs">
                  <Sparkles size={13} className="text-amber-500" /> Gameplay AI
                </span>
              </div>
            </div>

            {/* IEEE Executive Leadership card */}
            <div className="glass-card glass-card-hover rounded-2xl p-4 md:p-5 flex items-center gap-4 border border-white/80 dark:border-white/10 shadow-glacier-sm">
              <div className="w-12 h-12 rounded-xl bg-[var(--glacier-deep)]/10 text-[var(--glacier-deep)] dark:text-[var(--glacier)] flex items-center justify-center flex-shrink-0">
                <Award size={24} />
              </div>
              <div>
                <p className="font-display font-bold text-[var(--ink)] text-sm md:text-base">
                  IEEE Social Media Joint Head
                </p>
                <p className="text-[var(--ink-soft)] text-xs mt-0.5">
                  Directing student outreach, media creatives, and 15k+ impressions across hackathons and technical symposiums.
                </p>
              </div>
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[var(--powder)] text-[var(--glacier-deep)] dark:text-[var(--glacier)] bg-[var(--bg-alt)] dark:bg-white/10 whitespace-nowrap">
                Active
              </span>
            </div>

            {/* Clean Skills categories */}
            <div className="glass-card rounded-2xl p-6 border border-white/70 dark:border-white/10 space-y-4">
              <p className="text-[11px] font-mono font-bold tracking-[1.5px] text-[var(--glacier-deep)] dark:text-[var(--glacier)] uppercase">
                TECH DOMAINS &amp; COMPETENCIES
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
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/90 dark:bg-white/10 text-[var(--ink)] border border-[var(--powder)]/70 dark:border-white/10 hover:border-[var(--glacier-deep)] dark:hover:border-[var(--glacier)] transition-all shadow-xs"
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
                className="glass-card glass-card-hover rounded-2xl p-5 flex gap-4 items-start border border-white/80 dark:border-white/10 shadow-glacier-sm"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-[var(--bg-alt)] dark:bg-white/10 border border-[var(--powder)]/50"
                >
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-bold text-[var(--ink)] text-sm truncate">{card.title}</p>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-alt)] dark:bg-white/10 text-[var(--glacier-deep)] dark:text-[var(--glacier)] border border-[var(--powder)]"
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

        {/* Draggable Polaroid Stickers */}
        <div className="mb-12">
          <DraggableStickers />
        </div>

        {/* Interactive Enemy AI State Machine Showcase */}
        <div className="mb-14">
          <EnemyAIStateMachine />
        </div>

        {/* Clean Tech marquee strip */}
        <div className="relative overflow-hidden py-3 border-y border-[var(--powder)]/50 dark:border-white/10 bg-white/60 dark:bg-[rgba(24,50,68,0.5)] rounded-2xl backdrop-blur-xs">
          <div className="marquee-track">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 mx-5 text-xs font-mono font-semibold text-[var(--ink)] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--glacier-deep)] dark:bg-[var(--glacier)] inline-block" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
