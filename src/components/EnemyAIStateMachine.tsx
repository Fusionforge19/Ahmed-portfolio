import { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Swords, Skull, Play, RotateCcw, Activity } from 'lucide-react';

export type AIState = 'PATROL' | 'CHASE' | 'ATTACK' | 'DEAD';

interface StateInfo {
  id: AIState;
  label: string;
  sublabel: string;
  icon: typeof Eye;
  color: string;
  accentBg: string;
  rules: string[];
}

const STATES: StateInfo[] = [
  {
    id: 'PATROL',
    label: 'Patrolling',
    sublabel: 'NavMesh Wander',
    icon: Eye,
    color: '#2F86B3',
    accentBg: 'rgba(47, 134, 179, 0.12)',
    rules: ['UNavigationSystemV1::GetRandomReachablePointInRadius', 'FOV 90° · Perception Sight Sense', 'Speed: 220 cm/s'],
  },
  {
    id: 'CHASE',
    label: 'Chasing',
    sublabel: 'Target Acquired',
    icon: ShieldAlert,
    color: '#E59866',
    accentBg: 'rgba(229, 152, 102, 0.15)',
    rules: ['TargetDistance < 800 units', 'UPathFollowingComponent::MoveToActor', 'Sprint Speed: 480 cm/s'],
  },
  {
    id: 'ATTACK',
    label: 'Attacking',
    sublabel: 'Melee Strike',
    icon: Swords,
    color: '#E74C3C',
    accentBg: 'rgba(231, 76, 60, 0.15)',
    rules: ['AttackRange <= 140 units', 'PlayAnimMontage(AttackCombo_A)', 'Hitbox SweepSphere Collision Trace'],
  },
  {
    id: 'DEAD',
    label: 'Ragdoll',
    sublabel: 'Chaos Physics',
    icon: Skull,
    color: '#8E44AD',
    accentBg: 'rgba(142, 68, 173, 0.15)',
    rules: ['Health <= 0', 'SkeletalMesh->SetSimulatePhysics(true)', 'DetachFromControllerPendingDestroy()'],
  },
];

export default function EnemyAIStateMachine() {
  const [currentState, setCurrentState] = useState<AIState>('PATROL');
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [log, setLog] = useState<string>('System initialized. Enemy AI running on NavMeshBoundsVolume.');

  // Auto-cycle through states when autoPlay is active
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentState((prev) => {
        switch (prev) {
          case 'PATROL':
            setLog('Perception: BP_PlayerCharacter detected within 650 units -> Transition to CHASE');
            return 'CHASE';
          case 'CHASE':
            setLog('Combat: Distance <= 120 units -> Executing Melee Sweep Montage -> ATTACK');
            return 'ATTACK';
          case 'ATTACK':
            setLog('Damage Event: Took 100 DMG -> Simulating Chaos Physics Ragdoll -> DEAD');
            return 'DEAD';
          case 'DEAD':
            setLog('NavMesh Spawn: Respawning enemy agent at Patrol Waypoint A');
            return 'PATROL';
        }
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleSelectState = (state: AIState) => {
    setAutoPlay(false);
    setCurrentState(state);
    switch (state) {
      case 'PATROL':
        setLog('Manual Override: Enemy ordered to resume NavMesh wander.');
        break;
      case 'CHASE':
        setLog('Manual Override: Simulated target detected. Chasing player.');
        break;
      case 'ATTACK':
        setLog('Manual Override: Melee hitbox trace activated.');
        break;
      case 'DEAD':
        setLog('Manual Override: Health reduced to 0. Chaos Physics activated.');
        break;
    }
  };

  const activeIndex = STATES.findIndex((s) => s.id === currentState);
  const currentInfo = STATES[activeIndex];

  return (
    <div className="w-full glass-card rounded-2xl p-5 md:p-6 border border-white/70 dark:border-white/10 shadow-glacier-md flex flex-col gap-5">
      {/* Header with Title & Auto-play toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--powder)]/40 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[var(--glacier-deep)]/10 text-[var(--glacier-deep)] dark:text-[var(--glacier)] flex items-center justify-center">
            <Activity size={18} />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-[var(--ink)] flex items-center gap-2">
              Enemy AI State Machine
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--powder)]/50 dark:bg-white/10 text-[var(--glacier-deep)] dark:text-[var(--glacier)]">
                UE5.6 C++
              </span>
            </h4>
            <p className="text-xs text-[var(--ink-soft)]">
              Interactive gameplay finite state machine with NavMesh queries & hitbox traces
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay((p) => !p)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              autoPlay
                ? 'bg-[var(--glacier-deep)] text-white shadow-glacier-sm'
                : 'bg-white/80 dark:bg-white/10 text-[var(--ink-soft)] border border-[var(--powder)]'
            }`}
          >
            <Play size={12} className={autoPlay ? 'fill-white' : ''} />
            {autoPlay ? 'Auto-Simulating' : 'Play Simulation'}
          </button>
          <button
            onClick={() => {
              setCurrentState('PATROL');
              setLog('Reset to PATROL state.');
            }}
            title="Reset to Patrol"
            className="p-1.5 rounded-xl bg-white/70 dark:bg-white/10 text-[var(--ink-soft)] hover:text-[var(--glacier-deep)] border border-[var(--powder)] cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* State Flow Visual Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
        {STATES.map((state, idx) => {
          const isActive = state.id === currentState;
          const Icon = state.icon;

          return (
            <button
              key={state.id}
              onClick={() => handleSelectState(state.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col gap-2 cursor-pointer ${
                isActive
                  ? 'border-[var(--glacier-deep)] dark:border-[var(--glacier)] bg-white/90 dark:bg-white/15 shadow-glacier-md scale-[1.02]'
                  : 'border-[var(--powder)]/60 dark:border-white/10 bg-white/50 dark:bg-white/5 opacity-75 hover:opacity-100 hover:border-[var(--glacier-deep)]/50'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--ink-soft)]">
                  0{idx + 1}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>

              {/* Icon & Label */}
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isActive ? state.accentBg : 'transparent',
                    color: state.color,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <div className="font-display font-bold text-xs text-[var(--ink)]">
                    {state.label}
                  </div>
                  <div className="text-[10px] text-[var(--ink-soft)]">
                    {state.sublabel}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active State Details & Logic Rules */}
      <div className="rounded-xl bg-white/60 dark:bg-black/20 p-4 border border-[var(--powder)]/50 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--glacier-deep)] dark:text-[var(--glacier)] font-semibold flex items-center gap-1.5">
            <span>Active Logic:</span>
            <span className="text-[var(--ink)] font-bold">{currentInfo.label} State</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {currentInfo.rules.map((rule, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--powder)]/30 dark:bg-white/10 text-[var(--ink)] border border-[var(--powder)]/60"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>

        {/* Telemetry Log */}
        <div className="md:w-72 font-mono text-[11px] p-2.5 rounded-lg bg-[var(--ink)]/5 dark:bg-black/40 text-[var(--ink-soft)] dark:text-[var(--ink-soft)] border border-[var(--powder)]/40 dark:border-white/5">
          <span className="text-[var(--glacier-deep)] dark:text-[var(--glacier)] font-bold">log: </span>
          {log}
        </div>
      </div>
    </div>
  );
}
