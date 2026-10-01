import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsMarquee from './components/SkillsMarquee';
import CircuitTrackDivider from './components/CircuitTrackDivider';
import ProjectsSection from './components/ProjectsSection';
import PlaySection from './components/PlaySection';
import TerminalSection from './components/TerminalSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BootLoadingScreen from './components/BootLoadingScreen';
import GameOver404 from './components/GameOver404';
import GlobalCursorGlow from './components/backgrounds/GlobalCursorGlow';
import ScrollProgressBar from './components/ScrollProgressBar';
import SecretLevelSection from './components/SecretLevelSection';
import SakuraOverlay from './components/backgrounds/SakuraOverlay';

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Show boot screen once per session
    return !sessionStorage.getItem('boot_completed');
  });

  const [is404, setIs404] = useState(() => {
    const path = window.location.pathname;
    return path !== '/' && path !== '/index.html';
  });

  // Easter egg state
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [sakuraActive, setSakuraActive] = useState(false);

  // 1. Lenis Smooth Scroll Initialization (respects prefers-reduced-motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as unknown as { lenis: typeof lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: typeof lenis }).lenis;
    };
  }, []);

  // 2. Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
  useEffect(() => {
    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let index = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = sequence[index].toLowerCase();

      if (key === expected) {
        index++;
        if (index === sequence.length) {
          index = 0;
          // Trigger confetti burst + secret level!
          confetti({
            particleCount: 140,
            spread: 85,
            origin: { y: 0.55 },
            colors: ['#4C9BC0', '#8EC5DE', '#B6DCEB', '#FFB4A2', '#FFFFFF', '#34D399'],
          });
          setSecretUnlocked(true);
          setSakuraActive(true);
          // Auto-scroll to secret level
          setTimeout(() => {
            const el = document.getElementById('secret-level');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Listen for terminal easter_egg command
  useEffect(() => {
    const handler = () => {
      setSecretUnlocked(true);
      setSakuraActive(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#4C9BC0', '#8EC5DE', '#B6DCEB', '#FFB4A2'],
      });
      setTimeout(() => {
        const el = document.getElementById('secret-level');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    };
    window.addEventListener('unlock-secret-level', handler);
    return () => window.removeEventListener('unlock-secret-level', handler);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('boot_completed', 'true');
    setLoading(false);
  };

  const handleCloseSecret = () => {
    setSecretUnlocked(false);
    setSakuraActive(false);
  };

  if (is404) {
    return (
      <GameOver404
        onReset={() => {
          window.history.pushState({}, '', '/');
          setIs404(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col noise-overlay">
      {/* Top viewport reading progress bar */}
      <ScrollProgressBar />

      {/* Global cursor glow — desktop only, pauses on reduced-motion */}
      <GlobalCursorGlow />

      {/* Sakura petal overlay — active only after Konami / easter egg */}
      <SakuraOverlay active={sakuraActive} />

      {/* Boot Loading Screen */}
      {loading && <BootLoadingScreen onComplete={handleBootComplete} />}

      {/* Main Navigation Dock */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsMarquee />
        <CircuitTrackDivider />
        <ProjectsSection />
        <PlaySection />
        <TerminalSection />
        <ExperienceTimeline />

        {/* Secret Level — rendered in-flow when unlocked (Konami / terminal easter_egg) */}
        {secretUnlocked && <SecretLevelSection onClose={handleCloseSecret} />}

        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
