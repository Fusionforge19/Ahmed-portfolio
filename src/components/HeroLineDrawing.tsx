import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function HeroLineDrawing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement | SVGCircleElement | SVGRectElement>('.drawable-path');

    // Setup initial stroke dasharray & dashoffset for line-drawing
    paths.forEach((path) => {
      const length = 'getTotalLength' in path ? (path as SVGGeometryElement).getTotalLength() : 300;
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    // 1. Line drawing animation sequence
    paths.forEach((path, i) => {
      const length = 'getTotalLength' in path ? (path as SVGGeometryElement).getTotalLength() : 300;
      animate(path, {
        strokeDashoffset: [length, 0],
        duration: 2200,
        delay: 300 + i * 120,
        ease: 'outQuart',
      });
    });

    const container = containerRef.current;
    if (!container) return;

    // 2. Continuous gentle floating idle animation on container
    const floatAnim = animate(container, {
      translateY: [-6, 6],
      rotate: [-1.5, 1.5],
      duration: 3500,
      ease: 'inOutQuad',
      alternate: true,
      loop: true,
    });

    return () => {
      floatAnim.pause();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-square flex items-center justify-center pointer-events-none select-none"
    >
      {/* Soft radial backdrop aura */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[var(--powder)]/30 via-[var(--glacier)]/20 to-transparent blur-2xl" />

      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_24px_rgba(76,155,192,0.25)]"
      >
        <defs>
          <linearGradient id="controllerStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F86B3" />
            <stop offset="50%" stopColor="#8EC5DE" />
            <stop offset="100%" stopColor="#FFB4A2" />
          </linearGradient>
          <radialGradient id="thumbstickGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8EC5DE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2F86B3" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Outer Controller Body Contour */}
        <path
          className="drawable-path"
          d="M 140 100 C 180 80, 320 80, 360 100 C 410 125, 450 240, 420 320 C 400 370, 340 370, 320 300 C 300 240, 200 240, 180 300 C 160 370, 100 370, 80 320 C 50 240, 90 125, 140 100 Z"
          stroke="url(#controllerStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top Grip Accents */}
        <path
          className="drawable-path"
          d="M 120 160 C 100 220, 105 280, 130 320"
          stroke="#8EC5DE"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          className="drawable-path"
          d="M 380 160 C 400 220, 395 280, 370 320"
          stroke="#8EC5DE"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Central Touchpad / Display */}
        <path
          className="drawable-path"
          d="M 210 120 L 290 120 C 298 120, 305 127, 305 135 L 300 185 C 300 192, 294 198, 286 198 L 214 198 C 206 198, 200 192, 200 185 L 195 135 C 195 127, 202 120, 210 120 Z"
          stroke="#2F86B3"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Circuit lines on touchpad */}
        <path
          className="drawable-path"
          d="M 225 155 L 250 155 L 260 170 L 275 170"
          stroke="#FFB4A2"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="278" cy="170" r="2.5" fill="#FFB4A2" />

        {/* Left D-Pad */}
        <path
          className="drawable-path"
          d="M 155 170 L 170 170 L 170 155 L 185 155 L 185 170 L 200 170 L 200 185 L 185 185 L 185 200 L 170 200 L 170 185 L 155 185 Z"
          stroke="#2F86B3"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Right Action Buttons */}
        {/* Top (Y / Triangle) */}
        <circle className="drawable-path" cx="335" cy="155" r="10" stroke="#8EC5DE" strokeWidth="2" />
        <path className="drawable-path" d="M 335 150 L 339 158 L 331 158 Z" stroke="#FFB4A2" strokeWidth="1.5" />

        {/* Right (B / Circle) */}
        <circle className="drawable-path" cx="355" cy="175" r="10" stroke="#8EC5DE" strokeWidth="2" />
        <circle className="drawable-path" cx="355" cy="175" r="4.5" stroke="#2F86B3" strokeWidth="1.5" />

        {/* Bottom (A / Cross) */}
        <circle className="drawable-path" cx="335" cy="195" r="10" stroke="#8EC5DE" strokeWidth="2" />
        <path className="drawable-path" d="M 332 192 L 338 198 M 338 192 L 332 198" stroke="#2F86B3" strokeWidth="1.5" strokeLinecap="round" />

        {/* Left (X / Square) */}
        <circle className="drawable-path" cx="315" cy="175" r="10" stroke="#8EC5DE" strokeWidth="2" />
        <rect className="drawable-path" x="312" y="172" width="6" height="6" stroke="#2F86B3" strokeWidth="1.5" />

        {/* Left Thumbstick */}
        <circle className="drawable-path" cx="195" cy="235" r="28" stroke="#2F86B3" strokeWidth="2" fill="url(#thumbstickGrad)" />
        <circle className="drawable-path" cx="195" cy="235" r="18" stroke="#8EC5DE" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle className="drawable-path" cx="195" cy="235" r="6" fill="#2F86B3" />

        {/* Right Thumbstick */}
        <circle className="drawable-path" cx="305" cy="235" r="28" stroke="#2F86B3" strokeWidth="2" fill="url(#thumbstickGrad)" />
        <circle className="drawable-path" cx="305" cy="235" r="18" stroke="#8EC5DE" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle className="drawable-path" cx="305" cy="235" r="6" fill="#2F86B3" />

        {/* Left & Right Bumpers (L1/R1) */}
        <path
          className="drawable-path"
          d="M 125 90 C 145 75, 175 75, 190 85"
          stroke="#2F86B3"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          className="drawable-path"
          d="M 310 85 C 325 75, 355 75, 375 90"
          stroke="#2F86B3"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Center Gameplay AI Badge */}
        <text
          x="250"
          y="275"
          textAnchor="middle"
          fill="#479DC7"
          fontSize="12"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="bold"
          letterSpacing="2"
          opacity="0.85"
        >
          UE5.6 // GAMEPLAY AI
        </text>
      </svg>
    </div>
  );
}
