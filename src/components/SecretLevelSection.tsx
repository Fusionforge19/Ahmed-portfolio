import { useState } from 'react';
import { Sparkles, Terminal, Code2, Shield, X, Heart, Volume2 } from 'lucide-react';
import { playSuccessSound } from '../utils/sound';

interface SecretLevelProps {
  onClose: () => void;
}

export default function SecretLevelSection({ onClose }: SecretLevelProps) {
  const [cheatApplied, setCheatApplied] = useState(false);

  const applyGodMode = () => {
    try {
      localStorage.setItem('gate_dive_cheat', 'god_mode_active');
      localStorage.setItem('gate_dive_high_score', '99999');
    } catch {}
    playSuccessSound();
    setCheatApplied(true);
  };

  return (
    <section
      id="secret-level"
      className="py-16 relative overflow-hidden bg-gradient-to-b from-[#0F2A3A] via-[#12324A] to-[#0B1A24] text-white border-y-2 border-emerald-400/50 shadow-[0_0_40px_rgba(16,185,129,0.25)] animate-fade-in z-20"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Banner Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500 text-black font-bold">
              <Sparkles size={20} />
            </span>
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                SECRET ROOM // LEVEL 99
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                Developer Debug Chamber Unlocked!
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-300/80 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40">
              CHEAT: KONAMI
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Close Secret Room"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Box 1: Gameplay AI C++ Architecture */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
              <Code2 size={16} />
              <span>UE5 C++ Enemy Perception Trace</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-mono">
              Direct implementation snippet from Ahmed&apos;s Enemy AI Controller handling multi-threaded perception sensing:
            </p>
            <pre className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-tight">
{`void AEnemyAIController::OnTargetPerceptionUpdated(
    AActor* Actor, FAIStimulus Stimulus)
{
    if (Stimulus.WasSuccessfullySensed())
    {
        Blackboard->SetValueAsObject(BBKey_TargetActor, Actor);
        SetCombatState(EEnemyAIState::Chasing);
        // Dispatch high-frequency NavMesh query
        MoveToActor(Actor, AcceptanceRadius = 120.f);
    }
}`}
            </pre>
          </div>

          {/* Box 2: Chaos Physics Breakables */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
              <Shield size={16} />
              <span>Chaos Physics Strain Mechanics</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              How breakables are engineered with geometry collections in Unreal Engine 5.6:
            </p>
            <ul className="text-xs font-mono text-white/80 space-y-2 list-disc list-inside">
              <li>Voronoi fracture clustering (128 uniform shards)</li>
              <li>Damage threshold: 450.0 N/m² impulse propagation</li>
              <li>Sleep threshold optimization for 60+ FPS stability</li>
              <li>Hitbox sweep trace transfers weapon momentum vector</li>
            </ul>

            {/* Secret Cheat Button */}
            <div className="pt-2 mt-auto">
              <button
                onClick={applyGodMode}
                disabled={cheatApplied}
                className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  cheatApplied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg hover:scale-[1.02] active:scale-95'
                }`}
              >
                <Heart size={14} className={cheatApplied ? 'fill-emerald-400' : ''} />
                {cheatApplied ? '✓ 99,999 SCORE INJECTED IN GATE DIVE' : 'ACTIVATE ARCADE CHEAT (+30 LIVES & 99k SCORE)'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center font-mono text-xs text-white/50 flex items-center justify-center gap-2">
          <Terminal size={13} />
          <span>Tip: You can re-trigger this chamber anytime by typing the Konami Code or &apos;easter_egg&apos; in the terminal.</span>
        </div>
      </div>
    </section>
  );
}
