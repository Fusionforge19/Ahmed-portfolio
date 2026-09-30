import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, ChevronRight, X, Minus, Square } from 'lucide-react';
import { TERMINAL_COMMANDS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TerminalEntry {
  id: number;
  prompt: string | null;
  output: string;
  isSystem?: boolean;
}

const BOOT_MSG = "Welcome to Ahmed's portfolio terminal.\nType `help` to get started.";

let entryId = 0;

export default function TerminalSection() {
  const revealRef = useScrollReveal();
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { id: entryId++, prompt: null, output: BOOT_MSG, isSystem: true },
  ]);
  const [input, setInput]     = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState('');

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new entry
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  // Tab-completion
  const updateSuggestion = useCallback((val: string) => {
    if (!val) { setSuggestion(''); return; }
    const match = Object.keys(TERMINAL_COMMANDS).find((k) => k.startsWith(val) && k !== val);
    setSuggestion(match ?? '');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) setInput(suggestion);
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
      if (histIdx <= 0) { setHistIdx(-1); setInput(''); return; }
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
    const raw = input.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();

    if (cmd === 'clear') {
      setEntries([]);
      setInput('');
      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);
      setSuggestion('');
      return;
    }

    const output =
      TERMINAL_COMMANDS[cmd] ?? `command not found: ${cmd}. Type 'help' for available commands.`;

    setEntries((prev) => [
      ...prev,
      { id: entryId++, prompt: raw, output },
    ]);
    setHistory((h) => [raw, ...h]);
    setHistIdx(-1);
    setInput('');
    setSuggestion('');
  };

  return (
    <section id="terminal" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Light sky glow background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(191, 227, 245, 0.4), transparent 75%)',
        }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Terminal size={12} />
            Interactive Shell
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
            Terminal
          </h2>
        </div>

        {/* Frosted Light Terminal Window */}
        <div className="rounded-2xl overflow-hidden bg-white/95 border border-[var(--powder)] shadow-[0_8px_30px_rgba(47,134,179,0.12)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--powder)] bg-[#EEF8FD]/80">
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

          {/* Output area with data-lenis-prevent to avoid page scroll hijack */}
          <div
            data-lenis-prevent
            className="px-6 py-5 overflow-y-auto font-mono text-sm leading-relaxed space-y-4"
            style={{
              height: '320px',
              scrollBehavior: 'smooth',
            }}
            onClick={() => inputRef.current?.focus()}
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
                <pre
                  className="whitespace-pre-wrap break-words text-xs md:text-sm"
                  style={{
                    color: entry.isSystem ? 'var(--glacier-deep)' : 'var(--ink-soft)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {entry.output}
                </pre>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 border-t border-[var(--powder)] bg-[#F8FCFE]"
          >
            <span className="font-mono text-sm font-semibold flex-shrink-0 text-[var(--glacier-deep)]">
              ahmed@portfolio:~$
            </span>
            <div className="relative flex-1">
              {/* Ghost suggestion */}
              {suggestion && input && (
                <span
                  className="absolute left-0 top-0 font-mono text-sm pointer-events-none select-none text-[var(--powder)] opacity-60"
                >
                  {input}
                  <span>{suggestion.slice(input.length)}</span>
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
                className="w-full bg-transparent font-mono text-sm outline-none text-[var(--ink)] caret-[var(--glacier-deep)]"
                aria-label="Terminal input"
              />
            </div>
            <button
              type="submit"
              className="p-1.5 rounded-lg text-[var(--glacier-deep)] hover:bg-[var(--powder)]/30 transition-colors cursor-pointer"
              aria-label="Run command"
            >
              <ChevronRight size={16} />
            </button>
          </form>
        </div>

        <p className="text-center text-xs font-mono text-[var(--ink-soft)] opacity-75 mt-3">
          Press <kbd className="bg-white border border-[var(--powder)] text-[var(--ink)] px-1.5 py-0.5 rounded text-[10px]">Tab</kbd> to complete ·&nbsp;
          <kbd className="bg-white border border-[var(--powder)] text-[var(--ink)] px-1.5 py-0.5 rounded text-[10px]">↑ ↓</kbd> for history · Try <span className="text-[var(--glacier-deep)] font-semibold">projects</span>, <span className="text-[var(--glacier-deep)] font-semibold">skills</span>, <span className="text-[var(--glacier-deep)] font-semibold">about</span>
        </p>
      </div>
    </section>
  );
}
