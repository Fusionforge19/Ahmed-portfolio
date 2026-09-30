/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:           '#F3F9FC',
        'bg-alt':     '#E6F2F8',
        powder:       '#B6DCEB',
        glacier:      '#8EC5DE',
        'glacier-deep':'#4C9BC0',
        'ice-glow':   '#D9F0FA',
        ink:          '#0F2A3A',
        'ink-soft':   '#3E5F73',
        'accent-pop': '#FFB4A2',
        // dark mode surfaces
        'dark-bg':    '#0B1A24',
        'dark-surface':'#0F2333',
        'dark-card':  '#152D3E',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'glacier-gradient': 'linear-gradient(135deg, #D9F0FA, #B6DCEB 45%, #8EC5DE)',
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(214,240,250,0.3))',
      },
      boxShadow: {
        'glacier-sm':  '0 4px 16px rgba(76,155,192,0.12)',
        'glacier-md':  '0 8px 32px rgba(76,155,192,0.18)',
        'glacier-lg':  '0 16px 48px rgba(76,155,192,0.22)',
        'glass':       '0 4px 24px rgba(76,155,192,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        'float-slow':  'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite',
        'marquee':     'marquee 25s linear infinite',
        'spin-slow':   'spin 8s linear infinite',
        'fade-up':     'fadeUp 0.6s ease-out forwards',
        'blob':        'blob 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0)   scale(1)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
    },
  },
  plugins: [],
};
