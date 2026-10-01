import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS, ALL_TAGS, type Project } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';
import GradientWaves from './backgrounds/GradientWaves';

export default function ProjectsSection() {
  const revealRef = useScrollReveal();
  const { isDark } = useTheme();
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags = ['All', ...ALL_TAGS];

  const filtered: Project[] =
    activeTag === 'All'
      ? [...PROJECTS]
      : PROJECTS.filter((p) => p.tags.includes(activeTag as never));

  return (
    <section
      id="projects"
      className="pt-28 pb-24 scroll-mt-20 relative overflow-hidden bg-[#E0F1FA] dark:bg-[#183244]"
    >
      {/* Living background: slow drifting gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-30 z-0">
        <GradientWaves
          horizonColor={isDark ? '#0B1A24' : '#E6F2F8'}
          waveColor={isDark ? '#163248' : '#B6DCEB'}
          crestColor={isDark ? '#479DC7' : '#8EC5DE'}
          speed={0.4}
          amplitude={0.9}
        />
      </div>

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            Flagship Projects
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Projects
          </h2>
          <p className="text-[var(--ink-soft)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A curated selection of gameplay mechanics, AI agents, and interactive web systems.
          </p>
        </div>

        {/* Tag filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTag === tag
                  ? 'bg-[var(--glacier-deep)] text-white border-[var(--glacier-deep)] shadow-sm'
                  : 'bg-white/80 dark:bg-[rgba(24,50,68,0.7)] border-[var(--powder)] text-[var(--ink)] hover:border-[var(--glacier-deep)] hover:text-[var(--glacier-deep)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const ref = useScrollReveal(0.05);

  const handleCardClick = () => {
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      onClick={handleCardClick}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4 border border-white/80 dark:border-white/10 shadow-glacier-sm transition-all duration-300 group cursor-pointer hover:border-[var(--glacier-deep)]/60 dark:hover:border-[var(--glacier)]/60 hover:-translate-y-1 relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon + status chip */}
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-[var(--bg-alt)] dark:bg-white/10 border border-[var(--powder)]/60 dark:border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          {project.icon}
        </div>
        <span
          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border bg-[var(--bg-alt)] dark:bg-white/10 text-[var(--glacier-deep)] dark:text-[var(--glacier)] border-[var(--powder)]"
        >
          {project.statusChip}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-[var(--ink)] leading-snug group-hover:text-[var(--glacier-deep)] dark:group-hover:text-[var(--glacier)] transition-colors flex items-center justify-between gap-2">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hover:underline flex items-center gap-1.5"
        >
          {project.title}
        </a>
        <ExternalLink size={15} className="text-[var(--glacier-deep)] dark:text-[var(--glacier)] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
      </h3>

      {/* Description */}
      <p className="text-[var(--ink-soft)] text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[var(--powder)]/30 dark:bg-white/10 text-[var(--ink)] border border-[var(--powder)]/60 dark:border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer links: GitHub + Itch.io + External */}
      <div className="flex items-center gap-3 pt-3 border-t border-[var(--powder)]/50 dark:border-white/10">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--glacier-deep)] hover:bg-[#257299] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
          aria-label={`GitHub repo for ${project.title}`}
        >
          <GithubIcon size={14} />
          GitHub
        </a>

        {/* Itch.io link */}
        <a
          href="https://noname0019.itch.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
        >
          🎮 Itch.io
        </a>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] text-xs font-medium hover:text-[var(--glacier-deep)] dark:hover:text-[var(--glacier)] transition-colors ml-auto"
          aria-label={`Open ${project.title}`}
        >
          <ExternalLink size={13} />
          Open
        </a>
      </div>
    </article>
  );
}
