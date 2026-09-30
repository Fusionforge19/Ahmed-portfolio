import { useState, useEffect } from 'react';

interface BootLoadingScreenProps {
  onComplete: () => void;
}

export default function BootLoadingScreen({ onComplete }: BootLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('SYSTEM BOOT [UE5_ENGINE_CORE]');

  useEffect(() => {
    const steps = [
      { at: 20, text: 'LOADING ASSETS & SHADERS...' },
      { at: 45, text: 'COMPILING GLACIER DAWN PALETTE...' },
      { at: 75, text: 'INITIALIZING NAVMESH & PHYSICS...' },
      { at: 95, text: 'SYNCING PORTFOLIO BUFFER...' },
      { at: 100, text: 'SYSTEM READY.' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
      setProgress(current);
      const match = steps.find((s) => s.at <= current && current < s.at + 25);
      if (match) setStatus(match.text);
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono select-none transition-opacity duration-300"
      style={{ background: '#EEF8FD', color: '#12324A' }}
    >
      <div className="w-80 max-w-[90vw] space-y-4 p-6 rounded-2xl border border-[#B6DCEB] bg-white/80 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-widest text-[#2F86B3]">
          <span>AHMED_OS // v2.0</span>
          <span>{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full bg-[#E0F1FA] rounded-full overflow-hidden border border-[#B6DCEB]/50">
          <div
            className="h-full bg-gradient-to-r from-[#2F86B3] to-[#8EC5DE] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Substatus */}
        <p className="text-[11px] text-[#456A82] tracking-wide h-4 truncate">
          &gt; {status}
        </p>

        {/* Skip button */}
        <div className="pt-2 text-center">
          <button
            onClick={onComplete}
            className="text-[10px] uppercase font-bold tracking-widest text-[#2F86B3] hover:text-[#12324A] underline transition-colors cursor-pointer"
          >
            [ Skip Boot ]
          </button>
        </div>
      </div>
    </div>
  );
}
