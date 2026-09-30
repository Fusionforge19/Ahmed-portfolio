import { useEffect, useRef } from 'react';

export default function CircuitTrackDivider() {
  const carRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;
    const DURATION = 6000; // ms per lap

    const path = pathRef.current;
    const car  = carRef.current;
    if (!path || !car) return;

    const totalLength = path.getTotalLength();

    function frame(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % DURATION;
      const progress = elapsed / DURATION;
      const dist = totalLength * progress;

      if (!path || !car) return;

      const point = path.getPointAtLength(dist);
      const pointAhead = path.getPointAtLength(Math.min(dist + 2, totalLength));
      const angle = (Math.atan2(pointAhead.y - point.y, pointAhead.x - point.x) * 180) / Math.PI;

      car.setAttribute(
        'transform',
        `translate(${point.x}, ${point.y}) rotate(${angle})`
      );

      animationId = requestAnimationFrame(frame);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animationId = requestAnimationFrame(frame);
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4 select-none" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <svg
          viewBox="0 0 1280 290"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto max-h-48 md:max-h-56"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(47,134,179,0.08))' }}
        >
          <defs>
            <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2F86B3" />
              <stop offset="50%"  stopColor="#4C9BC0" />
              <stop offset="100%" stopColor="#2F86B3" />
            </linearGradient>

            {/* Checkered pattern for start/finish line */}
            <pattern id="checkered" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="#12324A" />
              <rect x="4" width="4" height="4" fill="#FFFFFF" />
              <rect y="4" width="4" height="4" fill="#FFFFFF" />
              <rect x="4" y="4" width="4" height="4" fill="#12324A" />
            </pattern>
          </defs>

          {/* Faint wider glacier glow underneath */}
          <path
            d="M 140,140 C 220,140 330,85 450,85 C 530,85 610,65 690,92 C 750,112 770,165 830,175 C 890,185 930,115 980,100 C 1040,85 1100,105 1130,140 C 1155,170 1125,212 1070,222 C 1020,232 960,208 910,192 C 840,172 760,182 690,208 C 620,232 560,228 500,192 C 430,158 360,172 290,202 C 210,232 130,222 90,188 C 65,160 85,140 140,140 Z"
            fill="none"
            stroke="#8EC5DE"
            strokeWidth="9"
            strokeOpacity="0.30"
            strokeLinecap="round"
          />

          {/* Main circuit path (3.2px thick in glacier-deep) */}
          <path
            ref={pathRef}
            id="circuit-track"
            d="M 140,140 C 220,140 330,85 450,85 C 530,85 610,65 690,92 C 750,112 770,165 830,175 C 890,185 930,115 980,100 C 1040,85 1100,105 1130,140 C 1155,170 1125,212 1070,222 C 1020,232 960,208 910,192 C 840,172 760,182 690,208 C 620,232 560,228 500,192 C 430,158 360,172 290,202 C 210,232 130,222 90,188 C 65,160 85,140 140,140 Z"
            fill="none"
            stroke="url(#trackGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Checkered Start/Finish Marker */}
          <g transform="translate(138, 126)">
            <rect x="-3" y="0" width="8" height="28" fill="url(#checkered)" stroke="#2F86B3" strokeWidth="1" rx="1" />
          </g>

          {/* Sector Boundary Dots (1, 2, 3) */}
          {/* Sector 1 Marker */}
          <g transform="translate(690, 92)">
            <circle cx="0" cy="0" r="10" fill="var(--card-bg)" stroke="var(--glacier-deep)" strokeWidth="2" />
            <text x="0" y="4" fontSize="10" fontWeight="700" fill="var(--glacier-deep)" textAnchor="middle">1</text>
          </g>

          {/* Sector 2 Marker */}
          <g transform="translate(1070, 222)">
            <circle cx="0" cy="0" r="10" fill="var(--card-bg)" stroke="var(--glacier-deep)" strokeWidth="2" />
            <text x="0" y="4" fontSize="10" fontWeight="700" fill="var(--glacier-deep)" textAnchor="middle">2</text>
          </g>

          {/* Sector 3 Marker */}
          <g transform="translate(500, 192)">
            <circle cx="0" cy="0" r="10" fill="var(--card-bg)" stroke="var(--glacier-deep)" strokeWidth="2" />
            <text x="0" y="4" fontSize="10" fontWeight="700" fill="var(--glacier-deep)" textAnchor="middle">3</text>
          </g>

          {/* Readability Frosted Pills */}
          {/* 1. START / FINISH */}
          <g transform="translate(140, 95)">
            <rect x="-64" y="-14" width="128" height="26" rx="13" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.4" filter="drop-shadow(0 2px 4px rgba(47,134,179,0.10))" />
            <text x="0" y="4" fontSize="13" fontWeight="600" letterSpacing="1.2" fill="var(--ink)" textAnchor="middle">
              START / FINISH
            </text>
          </g>

          {/* 2. SECTOR 1 */}
          <g transform="translate(690, 42)">
            <rect x="-95" y="-14" width="190" height="26" rx="13" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.4" filter="drop-shadow(0 2px 4px rgba(47,134,179,0.10))" />
            <text x="0" y="4" fontSize="13" fontWeight="600" letterSpacing="1.2" fill="var(--ink)" textAnchor="middle">
              SECTOR 1 • SPEEDWAY
            </text>
          </g>

          {/* 3. SECTOR 2 */}
          <g transform="translate(1060, 266)">
            <rect x="-85" y="-14" width="170" height="26" rx="13" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.4" filter="drop-shadow(0 2px 4px rgba(47,134,179,0.10))" />
            <text x="0" y="4" fontSize="13" fontWeight="600" letterSpacing="1.2" fill="var(--ink)" textAnchor="middle">
              SECTOR 2 • HAIRPIN
            </text>
          </g>

          {/* 4. SECTOR 3 */}
          <g transform="translate(480, 266)">
            <rect x="-85" y="-14" width="170" height="26" rx="13" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.4" filter="drop-shadow(0 2px 4px rgba(47,134,179,0.10))" />
            <text x="0" y="4" fontSize="13" fontWeight="600" letterSpacing="1.2" fill="var(--ink)" textAnchor="middle">
              SECTOR 3 • CHICANE
            </text>
          </g>

          {/* F1 Car Marker */}
          <g ref={carRef}>
            <circle cx="0" cy="0" r="14" fill="#2F86B3" opacity="0.2" />
            <rect x="-14" y="-7" width="3" height="14" rx="1" fill="#12324A" />
            <polygon points="-12,-3 -6,-5 6,-3 14,-1 16,0 14,1 6,3 -6,5 -12,3" fill="#12324A" stroke="#2F86B3" strokeWidth="1.2" />
            <rect x="-4" y="-6" width="7" height="2" rx="1" fill="#2F86B3" />
            <rect x="-4" y="4" width="7" height="2" rx="1" fill="#2F86B3" />
            <ellipse cx="0" cy="0" rx="3.5" ry="1.8" fill="#8EC5DE" />
            <circle cx="15" cy="0" r="2" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    </div>
  );
}
