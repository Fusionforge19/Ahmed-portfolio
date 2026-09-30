// ── All portfolio content, extracted 1:1 from Flutter source ──────────────

export const PROJECTS = [
  {
    id: 1,
    title: 'Artisan Fabric Marketplace MVP',
    description:
      'Built a web platform that connects handicraft artisans directly with customers and reduces reliance on intermediaries.',
    tags: ['Node.js', 'Express', 'HTML', 'CSS', 'JavaScript'],
    statusChip: 'Full-Stack',
    statusColor: '#1C3A5E',
    link: 'https://github.com/Fusionforge19',
    icon: '🛍️',
  },
  {
    id: 2,
    title: 'WebScout',
    description:
      'Autonomous AI agent that researches and verifies real products across the live web with zero hallucinations, using step-by-step planning, live Tavily search, and grounded multi-source verification.',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Firebase', 'Supabase'],
    statusChip: 'AI Agent',
    statusColor: '#5A87AC',
    link: 'https://github.com/Fusionforge19/websouct',
    icon: '🔍',
  },
  {
    id: 3,
    title: 'MoodMap',
    description:
      'An emotion-driven ambient companion — describe how you feel and get an AI-generated mood reflection, dynamic color palette, and a real matching song, powered by Gemini + iTunes.',
    tags: ['JavaScript', 'Vite', 'Gemini AI', 'Framer Motion', 'Tailwind CSS'],
    statusChip: 'AI',
    statusColor: '#1C3A5E',
    link: 'https://github.com/Fusionforge19/moodmap',
    icon: '🎭',
  },
  {
    id: 4,
    title: 'Developer Portfolio',
    description:
      'Personal developer portfolio showcasing Unreal Engine game development, C++ systems, and web projects.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    statusChip: 'Portfolio',
    statusColor: '#5A87AC',
    link: 'https://github.com/Fusionforge19/portfolio',
    icon: '👤',
  },
  {
    id: 5,
    title: 'Textile',
    description:
      'Web platform connecting Indian handicraft artisans directly with consumers, featuring AI-assisted fabric visualization and smart fabric length estimation to reduce buyer hesitation.',
    tags: ['Node.js', 'Express', 'HTML', 'CSS', 'JavaScript'],
    statusChip: 'Full-Stack',
    statusColor: '#1C3A5E',
    link: 'https://github.com/Fusionforge19/textile-',
    icon: '🧵',
  },
] as const;

export type Project = (typeof PROJECTS)[number];

export const ALL_TAGS = Array.from(
  new Set(PROJECTS.flatMap((p) => [...p.tags]))
).sort();

export const SKILLS = {
  Languages:       ['C++', 'Python'],
  'Engines / Tools': ['Unreal Engine 5', 'Blueprints', 'WebGL', 'Git', 'Blender', 'Perforce'],
  Systems:         ['Gameplay Mechanics', 'State Machines', 'NavMesh AI', 'Chaos Physics', 'Hit Systems'],
  'AI / ML':       ['TensorFlow', 'Gemini AI', 'AI Agents', 'Prompt Engineering'],
} as const;

export const TECH_MARQUEE = [
  'Unreal Engine 5',
  'C++',
  'Blueprints',
  'Python',
  'React',
  'TensorFlow',
  'Git',
  'Blender',
  'Perforce',
  'WebGL',
  'NavMesh AI',
  'Chaos Physics',
];

export const NAV_LINKS = [
  { label: 'Hero',     href: '#hero' },
  { label: 'Play',     href: '#play' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Projects', href: '#projects' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
] as const;

export const SOCIAL_LINKS = {
  github:   'https://github.com/Fusionforge19',
  linkedin: 'https://www.linkedin.com/in/ahmed-shaikh-511499316/',
  email:    'mailto:mahmed9869@gmail.com',
  itchio:   'https://noname0019.itch.io',
} as const;

export const RESUME_URL = '/assets/resume/ahmed_resume.pdf';

export const TERMINAL_COMMANDS: Record<string, string> = {
  help:
    'Available commands:\n  about      — Who I am & background\n  projects   — List flagship projects\n  skills     — Core tech & engine skills\n  contact    — How to reach me\n  play       — Jump to Gate Dive arcade game\n  ls         — List virtual workspace files\n  whoami     — Current shell user\n  clear      — Clear the terminal\n  help       — Show this message',
  about:
    'Ahmed — Computer Science Engineering Student & Unreal Engine / C++ Developer.\nBuilding interactive experiences, gameplay mechanics, and real-time AI systems.',
  projects:
    'Featured Projects:\n  1. Artisan Fabric Marketplace MVP — Full-stack web app\n  2. WebScout — Autonomous AI research agent\n  3. MoodMap — AI mood companion with song matching\n  4. Developer Portfolio — Unreal Engine & C++ showcase\n  5. Gate Dive — WebGL speed-runner game (play above!)\n\n→ Type `contact` or scroll to Projects section for details.',
  skills:
    'Tech Stack:\n  • Languages : C++, Python\n  • Engines   : Unreal Engine 5 (C++ & Blueprints), WebGL\n  • Systems   : Gameplay mechanics, State Machines, Git, AI Agents',
  contact:
    'Get in touch:\n  GitHub   → https://github.com/Fusionforge19\n  LinkedIn → https://www.linkedin.com/in/ahmed-shaikh-511499316/\n  Email    → mahmed9869@gmail.com\n  Itch.io  → https://noname0019.itch.io',
  play:  '⚡ Launching Gate Dive... Scroll up to the PLAY section to jump in!',
  game:  '⚡ Launching Gate Dive... Scroll up to the PLAY section to jump in!',
  ls:    'about.txt   projects/   skills.json   contact.sh   gate_dive.exe   resume.pdf',
  dir:   'about.txt   projects/   skills.json   contact.sh   gate_dive.exe   resume.pdf',
  pwd:   '/home/ahmed/portfolio',
  whoami:'ahmed (game-developer, cs-engineer, f1-racing-enthusiast)',
  sudo:  "ahmed is not in the sudoers file. This incident will be reported to Gabe Newell.",
  easter_egg: '🎮 ↑ ↑ ↓ ↓ ← → ← → B A — You found the Konami Code! Try it on the page...',
};
