import { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      setProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--glacier-deep)] via-[var(--glacier)] to-[#FFB4A2] origin-left shadow-[0_0_8px_rgba(76,155,192,0.6)] transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}
