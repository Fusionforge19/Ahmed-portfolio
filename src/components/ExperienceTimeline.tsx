import { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, GraduationCap, Share2, TrendingUp, Users, Sparkles } from 'lucide-react';
import { animate } from 'animejs';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'leadership' | 'gamedev' | 'education';
  badge: string;
  description: string[];
  skills: string[];
}

const TIMELINE: TimelineItem[] = [
  {
    id: 'ieee',
    role: 'Social Media Joint Head',
    organization: 'IEEE Student Branch',
    period: '2025 — Present',
    location: 'Mumbai, IN',
    type: 'leadership',
    badge: 'Executive Leadership',
    description: [
      'Spearheading digital engagement, technical event campaigns, and creative media production for IEEE events.',
      'Designed branding kits, motion graphics, and outreach strategy generating 15K+ impressions for collegiate hackathons.',
      'Mentored junior team members in cross-platform content production and brand voice consistency.',
    ],
    skills: ['Social Media Strategy', 'Campaign Outreach', 'Digital Media', 'Team Leadership'],
  },
  {
    id: 'gamedev',
    role: 'Unreal Engine 5.6 & C++ Systems Developer',
    organization: 'Independent Game Dev',
    period: '2025 — Present',
    location: 'Remote',
    type: 'gamedev',
    badge: 'Learning UE 5.6 (2025 — Present)',
    description: [
      'Engineered C++ Finite State Machines (FSM) controlling enemy patrol, target acquisition, and melee combat.',
      'Implementing Chaos Physics destructible meshes and modular weapon hit traces using sweep spheres.',
      'Actively learning Unreal Engine 5.6 (learning since 2025 to present), modern gameplay frameworks, and procedural anim systems.',
    ],
    skills: ['Unreal Engine 5.6', 'C++', 'Chaos Physics', 'State Machines', 'NavMesh AI'],
  },
  {
    id: 'education',
    role: 'B.E. in Computer Science & Engineering (AIML)',
    organization: 'Mumbai University',
    period: '2023 — 2028',
    location: 'Mumbai, IN',
    type: 'education',
    badge: 'Graduating 2028',
    description: [
      'Pursuing specialized coursework in Artificial Intelligence, Machine Learning, Data Structures, and Computer Architecture.',
      'Active contributor to collegiate open-source hackathons and technical game development circles.',
    ],
    skills: ['Data Structures & Algorithms', 'AI / ML', 'Linear Algebra', 'Systems Programming'],
  },
];

export default function ExperienceTimeline() {
  const revealRef = useScrollReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const [counts, setCounts] = useState({
    reach: 0,
    promos: 0,
    community: 0,
    streak: 0,
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounts({ reach: 15000, promos: 40, community: 500, streak: 142 });
      return;
    }

    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const target = { reach: 0, promos: 0, community: 0, streak: 0 };
          animate(target, {
            reach: 15000,
            promos: 40,
            community: 500,
            streak: 142,
            duration: 1800,
            ease: 'outExpo',
            onUpdate: () => {
              setCounts({
                reach: Math.round(target.reach),
                promos: Math.round(target.promos),
                community: Math.round(target.community),
                streak: Math.round(target.streak),
              });
            },
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Social Reach Impressions', value: `${counts.reach.toLocaleString()}+`, icon: Share2 },
    { label: 'Technical Promos & Campaigns', value: `${counts.promos}+`, icon: TrendingUp },
    { label: 'Collegiate Student Community', value: `${counts.community}+`, icon: Users },
    { label: 'Daily C++ Code Streak', value: `${counts.streak} Days`, icon: Sparkles },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[var(--bg)]">
      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] dark:text-[var(--glacier)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            Leadership &amp; Journey
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Experience &amp; IEEE
          </h2>
          <p className="text-[var(--ink-soft)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            From leading community outreach for IEEE to crafting hardcore C++ gameplay mechanics and pursuing CS/AIML.
          </p>
        </div>

        {/* IEEE Stats Strip with Animated Number Counters */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="glass-card rounded-2xl p-4 md:p-5 border border-white/70 dark:border-white/10 text-center flex flex-col items-center justify-center gap-2 group hover:scale-[1.02] transition-transform shadow-glacier-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--glacier-deep)]/10 text-[var(--glacier-deep)] dark:text-[var(--glacier)] flex items-center justify-center group-hover:bg-[var(--glacier-deep)] group-hover:text-white transition-colors">
                  <Icon size={18} />
                </div>
                <div className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)] font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-[var(--ink-soft)] leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Track */}
        <div className="relative border-l-2 border-[var(--powder)] dark:border-white/15 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {TIMELINE.map((item) => {
            return (
              <div key={item.id} className="relative group">
                {/* Node on vertical line */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-[#132737] border-4 border-[var(--glacier-deep)] dark:border-[var(--glacier)] shadow-sm group-hover:scale-125 transition-transform" />

                {/* Card Container */}
                <div className="glass-card rounded-2xl p-6 border border-white/80 dark:border-white/10 shadow-glacier-sm hover:shadow-glacier-md transition-all">
                  {/* Top Bar: Period & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold text-[var(--glacier-deep)] dark:text-[var(--glacier)] px-2.5 py-0.5 rounded-full bg-[var(--powder)]/40 dark:bg-white/10">
                      {item.period} · {item.location}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg-alt)] dark:bg-white/10 text-[var(--ink-soft)] border border-[var(--powder)]/60 dark:border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-1 flex items-center gap-2">
                    {item.type === 'leadership' && <Award size={18} className="text-amber-500" />}
                    {item.type === 'gamedev' && <Briefcase size={18} className="text-[var(--glacier-deep)]" />}
                    {item.type === 'education' && <GraduationCap size={18} className="text-emerald-500" />}
                    {item.role}
                  </h3>
                  <div className="text-sm font-semibold text-[var(--glacier-deep)] dark:text-[var(--glacier)] mb-4">
                    {item.organization}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-4 text-xs md:text-sm text-[var(--ink-soft)]">
                    {item.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[var(--glacier-deep)] dark:text-[var(--glacier)] mt-0.5">▹</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--powder)]/40 dark:border-white/10">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--powder)]/30 dark:bg-white/10 text-[var(--ink)] border border-[var(--powder)]/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
