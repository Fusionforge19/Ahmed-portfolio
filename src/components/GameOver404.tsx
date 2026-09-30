import { RotateCcw, Home } from 'lucide-react';

interface GameOver404Props {
  onReset: () => void;
}

export default function GameOver404({ onReset }: GameOver404Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-mono relative overflow-hidden"
      style={{ background: '#0B1A24', color: '#D9F0FA' }}
    >
      {/* Scanline CRT overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 4px',
        }}
      />

      <div className="relative z-10 max-w-md space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs tracking-widest uppercase">
          ERROR 404 • OUT OF BOUNDS
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-200 to-[#8EC5DE]">
          GAME OVER
        </h1>

        <p className="text-[#8EC5DE] text-sm leading-relaxed">
          The requested coordinate does not exist in this map sector. You have fallen off the NavMesh.
        </p>

        <div className="p-4 rounded-xl bg-[#0F2333] border border-[#3E7EA0]/40 text-xs text-left space-y-1 text-[#B6DCEB]">
          <p>&gt; LAST_KNOWN_LOCATION: [UNKNOWN_ROUTE]</p>
          <p>&gt; STATUS: RESPAWN_REQUIRED</p>
          <p>&gt; LIVES_REMAINING: ∞</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4C9BC0] text-white font-semibold text-sm hover:bg-[#8EC5DE] hover:scale-105 transition-all shadow-glacier-md"
          >
            <RotateCcw size={16} />
            Respawn to Home
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#3E7EA0] text-[#D9F0FA] font-semibold text-sm hover:bg-[#152D3E] hover:scale-105 transition-all"
          >
            <Home size={16} />
            Reset Map
          </a>
        </div>
      </div>
    </div>
  );
}
