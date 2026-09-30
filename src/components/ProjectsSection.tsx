import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS, ALL_TAGS, type Project } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ProjectsSection() {
  const revealRef = useScrollReveal();
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags = ['All', ...ALL_TAGS];

  const filtered: Project[] =
    activeTag === 'All'
      ? [...PROJECTS]
      : PROJECTS.filter((p) => p.tags.includes(activeTag as never));

  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{
        background: 'linear-gradient(180deg, #E0F1FA 0%, #EEF8FD 100%)',
      }}
    >
      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
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
                  : 'bg-white/80 border-[var(--powder)] text-[var(--ink)] hover:border-[var(--glacier-deep)] hover:text-[var(--glacier-deep)]'
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

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-white/90 border border-[var(--powder)] rounded-2xl p-6 flex flex-col gap-4 shadow-[0_4px_20px_rgba(47,134,179,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(47,134,179,0.14)] transition-all duration-200"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon + status chip */}
      <div className="flex items-start justify-between">
        <span className="text-3xl select-none">{project.icon}</span>
        <span
          className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border bg-[#EEF8FD] text-[var(--glacier-deep)] border-[var(--powder)]"
        >
          {project.statusChip}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-[var(--ink)] leading-snug">
        {project.title}
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
            className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#EEF8FD] text-[var(--ink)] border border-[var(--powder)]/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-3 pt-3 border-t border-[var(--powder)]/50">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--glacier-deep)] text-xs font-semibold hover:underline"
          aria-label={`GitHub repo for ${project.title}`}
        >
          <GithubIcon size={14} />
          GitHub
        </a>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] text-xs font-medium hover:text-[var(--glacier-deep)] transition-colors ml-auto"
          aria-label={`Open ${project.title}`}
        >
          <ExternalLink size={13} />
          Open
        </a>
      </div>
    </article>
  );
}
