import { useState, useRef, useCallback } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';
import { PROJECTS, SKILLS, RESUME_URL } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── Types ───────────────────────────────────────────────────────────────── */
interface TerminalEntry {
  id: number;
  prompt: string | null;           // null = system message (no prompt shown)
  output: React.ReactNode;
  isSystem?: boolean;
}

/* ── Suggestion chip sets ────────────────────────────────────────────────── */
const BASE_CHIPS = ['projects', 'about', 'skills', 'contact', 'game', 'resume', 'help', 'clear'] as const;

const NEXT_CHIPS: Record<string, string[]> = {
  projects:   ['about', 'skills', 'contact'],
  project:    ['projects', 'skills', 'contact'],
  about:      ['skills', 'projects', 'contact'],
  skills:     ['projects', 'about', 'contact'],
  skill:      ['skills', 'projects', 'contact'],
  contact:    ['projects', 'about', 'resume'],
  game:       ['projects', 'about', 'skills'],
  play:       ['projects', 'about', 'skills'],
  resume:     ['projects', 'contact', 'about'],
  help:       ['projects', 'skills', 'contact'],
  clear:      ['projects', 'about', 'help'],
  whoami:     ['about', 'skills', 'projects'],
  ls:         ['projects', 'skills', 'about'],
  dir:        ['projects', 'skills', 'about'],
  pwd:        ['about', 'projects', 'skills'],
  sudo:       ['help', 'about', 'clear'],
  easter_egg: ['game', 'projects', 'skills'],
};

/* ── Scroll helper for game command only (uses native smooth scroll) ─────── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Autocomplete keys ─────────────────────────────────────────────────── */
const ALL_CMD_KEYS = [
  'help', 'about', 'projects', 'project', 'skills', 'skill',
  'contact', 'game', 'play', 'resume', 'clear', 'easter_egg',
  'whoami', 'ls', 'dir', 'pwd', 'sudo',
] as const;

/* ── ID counter (module-level) ───────────────────────────────────────────── */
let _id = 0;
const nextId = () => ++_id;

function makeEntry(prompt: string | null, output: React.ReactNode, isSystem = false): TerminalEntry {
  return { id: nextId(), prompt, output, isSystem };
}

/* ── Shared styles ───────────────────────────────────────────────────────── */
const LINK_CLS =
  'text-[var(--glacier-deep)] underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer';

const CHIP_CLS =
  'px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border border-[var(--powder)] ' +
  'bg-white/80 dark:bg-[rgba(24,50,68,0.7)] text-[var(--ink)] ' +
  'hover:border-[var(--glacier-deep)] hover:text-[var(--glacier-deep)] hover:bg-[var(--bg-alt)] ' +
  'active:scale-95 active:bg-[var(--sky)]/30 transition-all cursor-pointer select-none';

/* ── Interactive output builders ────────────────────────────────────────── */
function buildProjectsOutput(onRunCmd: (cmd: string) => void) {
  return (
    <div className="space-y-1.5">
      <p className="text-[var(--glacier-deep)] font-semibold mb-2">Featured Projects:</p>
      {PROJECTS.map((p, i) => (
        <div key={p.id} className="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline">
          <span className="text-[var(--ink-soft)] font-mono text-xs">{i + 1}.</span>
          <button
            type="button"
            onClick={() => onRunCmd(`project ${p.title}`)}
            className={`${LINK_CLS} font-semibold text-left`}
          >
            {p.title}
          </button>
          <span className="text-[var(--ink-soft)] text-[11px]">— {p.description.slice(0, 55)}…</span>
          <span className="flex gap-1 flex-wrap">
            {p.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--powder)]/60">{t}</span>
            ))}
          </span>
        </div>
      ))}
      <p className="text-[var(--ink-soft)] text-xs mt-2">↑ Click a project name for details</p>
    </div>
  );
}

function buildProjectDetail(title: string) {
  const p = PROJECTS.find(pr =>
    pr.title.toLowerCase() === title.toLowerCase() ||
    pr.title.toLowerCase().includes(title.toLowerCase())
  );
  if (!p) {
    return (
      <span className="text-[var(--ink-soft)]">
        Project &quot;{title}&quot; not found. Try <code className="text-[var(--ink)] font-semibold">projects</code> to list all.
      </span>
    );
  }
  return (
    <div className="space-y-1.5 p-3 rounded-xl bg-white/50 dark:bg-[rgba(24,50,68,0.5)] border border-[var(--powder)]/50">
      <p className="font-semibold text-[var(--ink)] flex items-center gap-2">
        <span>{p.icon}</span> <span>{p.title}</span>
      </p>
      <p className="text-[var(--ink-soft)] text-xs md:text-sm leading-relaxed">{p.description}</p>
      <div className="flex gap-1.5 flex-wrap my-1">
        {p.tags.map(t => (
          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--powder)]/60">{t}</span>
        ))}
      </div>
      <p className="text-[var(--ink-soft)] text-xs">Status: <span className="font-semibold text-[var(--glacier-deep)]">{p.statusChip}</span></p>
      <div className="flex gap-4 pt-1">
        <a href={p.link} target="_blank" rel="noopener noreferrer" className={LINK_CLS + ' text-xs font-semibold'}>[GitHub]</a>
        <a href={p.link} target="_blank" rel="noopener noreferrer" className={LINK_CLS + ' text-xs font-semibold'}>[Open]</a>
      </div>
    </div>
  );
}

function buildSkillsOutput(onRunCmd: (cmd: string) => void) {
  return (
    <div className="space-y-2">
      <p className="text-[var(--glacier-deep)] font-semibold mb-1">Tech Stack:</p>
      {Object.entries(SKILLS).map(([cat, items]) => (
        <div key={cat} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRunCmd(`skill ${cat}`)}
            className={`${LINK_CLS} text-xs font-bold`}
          >
            ▶ {cat}
          </button>
          <span className="text-[var(--ink-soft)] text-xs font-mono">({items.length} items)</span>
        </div>
      ))}
      <p className="text-[var(--ink-soft)] text-xs mt-1">↑ Click a category to expand</p>
    </div>
  );
}

function buildSkillCategory(cat: string) {
  const key = Object.keys(SKILLS).find(k => k.toLowerCase() === cat.toLowerCase()) as keyof typeof SKILLS | undefined;
  if (!key) return <span className="text-[var(--ink-soft)]">Category not found. Try <code className="text-[var(--ink)] font-semibold">skills</code> to list categories.</span>;
  return (
    <div className="space-y-1 p-2.5 rounded-xl bg-white/50 dark:bg-[rgba(24,50,68,0.5)] border border-[var(--powder)]/50">
      <p className="font-semibold text-[var(--glacier-deep)] text-xs">{key}</p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {(SKILLS[key] as readonly string[]).map(s => (
          <span key={s} className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--powder)]/70">{s}</span>
        ))}
      </div>
    </div>
  );
}

function buildContactOutput() {
  return (
    <div className="space-y-1.5">
      <p className="text-[var(--glacier-deep)] font-semibold mb-1">Get in touch:</p>
      {[
        { label: 'Email',    href: 'mailto:mahmed9869@gmail.com',                         display: 'mahmed9869@gmail.com' },
        { label: 'GitHub',   href: 'https://github.com/Fusionforge19',                    display: 'github.com/Fusionforge19' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-shaikh-511499316/', display: 'linkedin.com/in/ahmed-shaikh' },
        { label: 'Itch.io',  href: 'https://noname0019.itch.io',                          display: 'noname0019 (Coming soon)' },
      ].map(({ label, href, display }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-[var(--ink-soft)] w-16 text-xs font-mono">{label}</span>
          <a
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={LINK_CLS + ' text-xs'}
          >
            {display}
          </a>
        </div>
      ))}
    </div>
  );
}

/* ── All commands ────────────────────────────────────────────────────────── */
function resolveCmd(
  raw: string,
  onRunCmd: (cmd: string) => void,
): { output: React.ReactNode; sideEffect?: () => void } {
  const cmd   = raw.trim().toLowerCase();
  const parts = cmd.split(/\s+/);
  const base  = parts[0];
  const arg   = parts.slice(1).join(' ');

  switch (base) {
    case 'help':
      return {
        output: (
          <span className="whitespace-pre-wrap text-[var(--ink-soft)]">
            {`Available commands:
  projects          — list flagship projects (interactive)
  project <name>    — show project details
  about             — who I am & background
  skills            — tech stack (interactive)
  skill <category>  — expand a skill category
  contact           — how to reach me (clickable links)
  game              — jump to Gate Dive arcade game
  resume            — download resume PDF
  help              — show this message
  clear             — clear the terminal
  easter_egg        — 🤫
  whoami / ls / pwd — shell flavour`}
          </span>
        ),
      };

    case 'about':
      return {
        output: (
          <span className="whitespace-pre-wrap text-[var(--ink-soft)]">
            {`Ahmed — Computer Science Engineering student at Mumbai University.
Focused on game development (UE5/C++) and AI systems.
Committee member, IEEE student chapter.
Building gameplay mechanics, real-time AI, and interactive web experiences.
Open to game dev and software engineering opportunities.`}
          </span>
        ),
      };

    case 'projects':
      return { output: buildProjectsOutput(onRunCmd) };

    case 'project':
      return { output: buildProjectDetail(arg) };

    case 'skills':
      return { output: buildSkillsOutput(onRunCmd) };

    case 'skill':
      return { output: buildSkillCategory(arg) };

    case 'contact':
      return { output: buildContactOutput() };

    case 'game':
    case 'play':
      return {
        output: <span className="text-[var(--glacier-deep)]">⚡ Jumping to Gate Dive…</span>,
        sideEffect: () => scrollToSection('play'),
      };

    case 'resume':
      return {
        output: <span className="text-[var(--glacier-deep)]">📄 Downloading resume…</span>,
        sideEffect: () => {
          const a = document.createElement('a');
          a.href = RESUME_URL;
          a.download = 'ahmed_resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
      };

    case 'clear':
      return { output: '' };

    case 'easter_egg':
      return { output: <span>🎮 ↑ ↑ ↓ ↓ ← → ← → B A — You found the Konami Code! Try it on the page…</span> };

    case 'whoami':
      return { output: <span className="text-[var(--ink-soft)]">ahmed (game-developer, cs-engineer)</span> };

    case 'ls':
    case 'dir':
      return { output: <span className="text-[var(--ink-soft)] font-mono">about.txt   projects/   skills.json   contact.sh   gate_dive.exe   resume.pdf</span> };

    case 'pwd':
      return { output: <span className="text-[var(--ink-soft)] font-mono">/home/ahmed/portfolio</span> };

    case 'sudo':
      return { output: <span className="text-[var(--ink-soft)]">ahmed is not in the sudoers file. This incident will be reported to Gabe Newell.</span> };

    default:
      return {
        output: (
          <div className="space-y-2">
            <p className="text-[var(--ink-soft)]">
              command not found: <span className="font-mono font-semibold text-[var(--ink)]">{raw}</span>
            </p>
            <p className="text-[var(--ink-soft)] text-xs">
              Try one of these suggestions:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {BASE_CHIPS.map(chip => (
                <button
                  key={chip}
                  type="button"
                  className={CHIP_CLS}
                  onClick={() => onRunCmd(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ),
      };
  }
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function TerminalSection() {
  const revealRef = useScrollReveal();

  const runCmdRef = useRef<(cmd: string) => void>(() => {});

  const [entries, setEntries] = useState<TerminalEntry[]>(() => [
    makeEntry(null, (
      <div className="space-y-2.5">
        <p className="text-[var(--glacier-deep)] font-semibold">
          Welcome to Ahmed&apos;s portfolio terminal.
        </p>
        <p className="text-[var(--ink-soft)] text-xs">
          Type a command or tap a suggestion below:
        </p>
        <div className="flex flex-wrap gap-1.5 pt-0.5" aria-label="Welcome command suggestions">
          {BASE_CHIPS.map(chip => (
            <button
              key={chip}
              type="button"
              className={CHIP_CLS}
              onClick={() => runCmdRef.current(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    ), true),
  ]);

  const [input, setInput]           = useState('');
  const [history, setHistory]       = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const [lastCmd, setLastCmd]       = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSuggestion = useCallback((val: string) => {
    if (!val) { setSuggestion(''); return; }
    const match = ALL_CMD_KEYS.find(k => k.startsWith(val.toLowerCase()) && k !== val.toLowerCase());
    setSuggestion(match ?? '');
  }, []);

  /* ── Core command runner ─────────────────────────────────────────────────── */
  const runCmd = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setEntries([]);
      setHistory(h => [trimmed, ...h]);
      setHistIdx(-1);
      setInput('');
      setSuggestion('');
      setLastCmd('clear');
      return;
    }

    const { output, sideEffect } = resolveCmd(trimmed, (cmd) => runCmd(cmd));

    setEntries(prev => {
      const next = [...prev, makeEntry(trimmed, output)];
      // Keep max 25 blocks
      return next.length > 25 ? next.slice(next.length - 25) : next;
    });

    setHistory(h => [trimmed, ...h]);
    setHistIdx(-1);
    setInput('');
    setSuggestion('');
    setLastCmd(trimmed.toLowerCase().split(' ')[0]);

    if (sideEffect) sideEffect();
  }, []);

  runCmdRef.current = runCmd;

  /* ── Input handlers ──────────────────────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) { setInput(suggestion); setSuggestion(''); }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput('');
        return;
      }
      const idx = histIdx - 1;
      setHistIdx(idx);
      setInput(history[idx]);
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    updateSuggestion(val.toLowerCase().trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCmd(input);
  };

  /* Contextual next chips (always 3) */
  const nextChips = NEXT_CHIPS[lastCmd] ?? ['projects', 'skills', 'contact'];

  return (
    <section
      id="terminal"
      className="py-24 relative"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle radial glow — light background wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(191,227,245,0.35), transparent 75%)',
        }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Terminal size={12} />
            Interactive Shell
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
            Terminal
          </h2>
        </div>

        {/* ── Terminal window — NO overflow-y, NO fixed height, grows with content ── */}
        <div
          className="rounded-2xl border border-[var(--powder)] dark:border-[rgba(94,158,191,0.2)] shadow-sm"
          style={{ background: 'var(--card-bg)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-t-2xl border-b border-[var(--powder)] dark:border-[rgba(94,158,191,0.15)]"
            style={{ background: 'var(--bg-alt)' }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
            </div>
            <span className="flex-1 text-center font-mono text-xs font-medium text-[var(--ink-soft)] select-none">
              ahmed@portfolio:~
            </span>
            <span className="w-10" />
          </div>

          {/* Output body — NO overflow-y: auto/scroll, NO fixed height, min-height 320px, page scrolls */}
          <div
            className="px-6 py-5 font-mono text-sm leading-relaxed space-y-4"
            style={{ minHeight: '320px' }}
          >
            {entries.map((entry) => (
              <div key={entry.id}>
                {entry.prompt !== null && (
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-[var(--glacier-deep)] font-semibold">ahmed@portfolio</span>
                    <span className="text-[var(--ink-soft)]">:~$</span>
                    <span className="text-[var(--ink)] font-semibold">{entry.prompt}</span>
                  </div>
                )}
                <div className="text-[var(--ink-soft)] text-xs md:text-sm">
                  {entry.output}
                </div>
              </div>
            ))}

            {/* Contextual next chips (3 suggestions) shown after command */}
            {lastCmd && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[10px] font-mono text-[var(--ink-soft)] mr-1 select-none">next:</span>
                {nextChips.map(chip => (
                  <button
                    key={chip}
                    type="button"
                    className={CHIP_CLS}
                    onClick={() => runCmd(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Suggestion chips row above the input ────────────────────────── */}
          <div
            className="flex flex-wrap items-center gap-1.5 px-6 py-2.5 border-t border-[var(--powder)]/70 dark:border-[rgba(94,158,191,0.15)] bg-white/40 dark:bg-[rgba(24,50,68,0.4)]"
            aria-label="Available command chips"
          >
            <span className="text-[10px] font-mono text-[var(--ink-soft)] mr-1 select-none">suggested:</span>
            {BASE_CHIPS.map(chip => (
              <button
                key={chip}
                type="button"
                className={CHIP_CLS}
                onClick={() => runCmd(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 rounded-b-2xl border-t border-[var(--powder)] dark:border-[rgba(94,158,191,0.15)]"
            style={{ background: 'var(--bg-alt)' }}
          >
            <span className="font-mono text-sm font-semibold flex-shrink-0 text-[var(--glacier-deep)]">
              ahmed@portfolio:~$
            </span>
            <div className="relative flex-1">
              {/* Ghost autocomplete */}
              {suggestion && input && (
                <span className="absolute left-0 top-0 font-mono text-sm pointer-events-none select-none text-[var(--powder)] opacity-60">
                  {input}<span>{suggestion.slice(input.length)}</span>
                </span>
              )}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
                placeholder="type a command or tap a suggestion above"
                className="w-full bg-transparent font-mono text-sm outline-none text-[var(--ink)] caret-[var(--glacier-deep)] placeholder-[var(--ink-soft)]/40"
                aria-label="Terminal input"
              />
            </div>
            <button
              type="submit"
              className="p-1.5 rounded-lg text-[var(--glacier-deep)] hover:bg-[var(--powder)]/30 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Run command"
            >
              <ChevronRight size={16} />
            </button>
          </form>
        </div>

        {/* Key hints */}
        <p className="text-center text-xs font-mono text-[var(--ink-soft)] opacity-75 mt-3">
          <kbd className="bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] px-1.5 py-0.5 rounded text-[10px]">Tab</kbd> to complete ·&nbsp;
          <kbd className="bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--ink)] px-1.5 py-0.5 rounded text-[10px]">↑ ↓</kbd> for history
        </p>
      </div>
    </section>
  );
}
