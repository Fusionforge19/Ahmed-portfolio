import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CircuitTrackDivider from './components/CircuitTrackDivider';
import PlaySection from './components/PlaySection';
import TerminalSection from './components/TerminalSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BootLoadingScreen from './components/BootLoadingScreen';
import GameOver404 from './components/GameOver404';

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Show boot screen once per session
    return !sessionStorage.getItem('boot_completed');
  });

  const [is404, setIs404] = useState(() => {
    const path = window.location.pathname;
    return path !== '/' && path !== '/index.html';
  });

  // 1. Lenis smooth scroll initialization
  useEffect(() => {
    // Disable smooth scroll if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
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
          // Trigger confetti burst!
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#4C9BC0', '#8EC5DE', '#B6DCEB', '#FFB4A2', '#FFFFFF'],
          });
          alert('🎮 KONAMI CODE ACTIVATED! You found the hidden Easter Egg! +30 Lives granted.');
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('boot_completed', 'true');
    setLoading(false);
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
      {/* Boot Loading Screen */}
      {loading && <BootLoadingScreen onComplete={handleBootComplete} />}

      {/* Main Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        <HeroSection />
        <CircuitTrackDivider />
        <PlaySection />
        <TerminalSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
