import { useState } from 'react';
import { Mail, Send, Copy, ExternalLink, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactSection() {
  const revealRef = useScrollReveal();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSend = (useGmail: boolean) => {
    const trimmedMsg = message.trim();
    if (!trimmedMsg) {
      showToast('⚠️ Please enter a message before sending.');
      return;
    }

    const trimmedName = name.trim() || 'Portfolio Visitor';
    const sub = subject.trim() || 'Project Inquiry';
    const body = `${trimmedMsg}\n\n---\nFrom: ${trimmedName}`;

    if (useGmail) {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Mahmed9869@gmail.com&su=${encodeURIComponent(
        sub
      )}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank');
      showToast('🚀 Opening Gmail compose with your message...');
    } else {
      const mailtoUrl = `mailto:Mahmed9869@gmail.com?subject=${encodeURIComponent(
        sub
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showToast('📬 Opening default mail app...');
    }
  };

  const handleCopy = () => {
    const trimmedMsg = message.trim();
    const trimmedName = name.trim() || 'Portfolio Visitor';
    const sub = subject.trim() || 'Project Inquiry';
    const fullText = `To: Mahmed9869@gmail.com\nSubject: ${sub}\n\n${trimmedMsg || '[No message]'}\n\nFrom: ${trimmedName}`;

    navigator.clipboard.writeText(fullText).then(() => {
      showToast('📋 Message copied to clipboard! (Mahmed9869@gmail.com)');
    });
  };

  const tableLinks = [
    {
      label: 'Email',
      value: 'Mahmed9869@gmail.com',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=Mahmed9869@gmail.com',
      icon: <Mail size={16} />,
    },
    {
      label: 'GitHub',
      value: 'Fusionforge19',
      url: 'https://github.com/Fusionforge19',
      icon: <GithubIcon size={16} />,
    },
    {
      label: 'LinkedIn',
      value: 'Ahmed Shaikh',
      url: 'https://www.linkedin.com/in/ahmed-shaikh-511499316/',
      icon: <LinkedinIcon size={16} />,
    },
    {
      label: 'Itch.io',
      value: 'noname0019',
      url: undefined,
      comingSoon: true,
      icon: <span className="text-sm font-bold">🎮</span>,
    },
  ];

  /* Shared input styles */
  const inputCls =
    'w-full bg-[#F8FCFE] dark:bg-[rgba(20,40,56,0.85)] border border-[var(--powder)] dark:border-[rgba(94,158,191,0.25)] rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--ink-soft)]/50 focus:border-[var(--glacier-deep)] focus:ring-1 focus:ring-[var(--glacier-deep)] outline-none transition-all';

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-[#EEF8FD] dark:bg-[#132737]"
    >
      {/* Soft blurred glow */}
      <div
        aria-hidden
        className="absolute bottom-10 left-1/4 w-[500px] h-[350px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #BFE3F5 0%, #8EC5DE 50%, transparent 70%)' }}
      />

      <div
        ref={revealRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Info & Minimalist Table */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full border border-[var(--powder)] bg-white/80 dark:bg-[rgba(24,50,68,0.8)] text-[var(--glacier-deep)] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-xs">
                Get In Touch
              </span>
              <h2
                className="font-display font-bold leading-tight mb-4 text-[var(--ink)]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
              >
                Want to talk about a project?
              </h2>
              <p className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed max-w-md">
                Email is best. GitHub, LinkedIn, and Itch.io are below too. Whether it&apos;s gameplay systems, UE5, C++, or modern web projects — let&apos;s build something great.
              </p>
            </div>

            {/* Table links */}
            <div className="border-t border-[var(--powder)] divide-y divide-[var(--powder)]">
              {tableLinks.map((item) => item.comingSoon ? (
                <div
                  key={item.label}
                  className="py-4 flex items-center justify-between opacity-70 cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--glacier-deep)]">
                      {item.icon}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--ink)]">
                      {item.value}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-alt)] border border-[var(--powder)] text-[var(--glacier-deep)] font-semibold">
                      Coming soon
                    </span>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 flex items-center justify-between group hover:pl-2 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--glacier-deep)] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--glacier-deep)] transition-colors">
                      {item.value}
                    </span>
                    <ExternalLink size={14} className="text-[var(--glacier-deep)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-white/90 dark:bg-[rgba(24,50,68,0.85)] border border-[var(--powder)] dark:border-[rgba(94,158,191,0.25)] rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(47,134,179,0.10)]">
              <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-6">
                Send a Message
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-semibold tracking-wider text-[var(--ink-soft)] uppercase mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-semibold tracking-wider text-[var(--ink-soft)] uppercase mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="What are you working on?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono font-semibold tracking-wider text-[var(--ink-soft)] uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="A few plain sentences is perfect."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSend(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--glacier-deep)] text-white text-sm font-semibold shadow-glacier-sm hover:bg-[#257299] active:scale-95 transition-all cursor-pointer"
                  >
                    <Send size={15} />
                    Open Gmail
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSend(false)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[var(--glacier-deep)] bg-white dark:bg-transparent text-[var(--glacier-deep)] text-sm font-semibold hover:bg-[#BFE3F5]/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <Mail size={15} />
                    Mail App
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--powder)] bg-white dark:bg-transparent text-[var(--ink)] text-sm font-semibold hover:border-[var(--glacier-deep)] hover:text-[var(--glacier-deep)] active:scale-95 transition-all ml-auto cursor-pointer"
                    title="Copy full drafted email to clipboard"
                  >
                    <Copy size={15} />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-[rgba(24,50,68,0.95)] border border-[var(--glacier-deep)] px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-[var(--ink)] flex items-center gap-3"
        >
          <Check size={16} className="text-[var(--glacier-deep)]" />
          <span>{toast}</span>
        </div>
      )}
    </section>
  );
}
