import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/glacier_dawn_theme.dart';
import 'maximalist_decorations.dart';
import 'border_glow_wrapper.dart';

// ── Project data model ────────────────────────────────────────────────────────

class _Project {
  final String title;
  final String description;
  final List<String> tags;
  final String? statusChip;
  final String? statusColor; // hex string
  final String link;
  final IconData icon;
  final Color accentColor;

  const _Project({
    required this.title,
    required this.description,
    required this.tags,
    this.statusChip,
    this.statusColor,
    required this.link,
    required this.icon,
    required this.accentColor,
  });
}

const _kGithubBase = 'https://github.com/Fusionforge19';

const List<_Project> _projects = [
  _Project(
    title: 'Artisan Fabric Marketplace MVP',
    description:
        'Built a web platform that connects handicraft artisans directly with customers and reduces reliance on intermediaries.',
    tags: ['Node.js', 'Express', 'HTML', 'CSS', 'JavaScript'],
    statusChip: 'Full-Stack',
    statusColor: '#1C3A5E',
    link: _kGithubBase,
    icon: Icons.shopping_bag_rounded,
    accentColor: GlacierColors.darkBlue,
  ),
  _Project(
    title: 'WebScout',
    description:
        'Autonomous AI agent that researches and verifies real products across the live web with zero hallucinations, using step-by-step planning, live Tavily search, and grounded multi-source verification.',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Firebase', 'Supabase'],
    statusChip: 'AI Agent',
    statusColor: '#5A87AC',
    link: '$_kGithubBase/websouct',
    icon: Icons.travel_explore_rounded,
    accentColor: GlacierColors.mutedBlue,
  ),
  _Project(
    title: 'MoodMap',
    description:
        'An emotion-driven ambient companion — describe how you feel and get an AI-generated mood reflection, dynamic color palette, and a real matching song, powered by Gemini + iTunes.',
    tags: ['JavaScript', 'Vite', 'Gemini AI', 'Framer Motion', 'Tailwind CSS'],
    statusChip: 'AI',
    statusColor: '#1C3A5E',
    link: '$_kGithubBase/moodmap',
    icon: Icons.mood_rounded,
    accentColor: GlacierColors.darkBlue,
  ),
  _Project(
    title: 'Developer Portfolio',
    description:
        'Personal developer portfolio showcasing Unreal Engine game development, C++ systems, and web projects.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    statusChip: 'Portfolio',
    statusColor: '#5A87AC',
    link: '$_kGithubBase/portfolio',
    icon: Icons.person_rounded,
    accentColor: GlacierColors.mutedBlue,
  ),
  _Project(
    title: 'Textile',
    description:
        'Web platform connecting Indian handicraft artisans directly with consumers, featuring AI-assisted fabric visualization and smart fabric length estimation to reduce buyer hesitation.',
    tags: ['Node.js', 'Express', 'HTML', 'CSS', 'JavaScript'],
    statusChip: 'Full-Stack',
    statusColor: '#1C3A5E',
    link: '$_kGithubBase/textile-',
    icon: Icons.storefront_rounded,
    accentColor: GlacierColors.darkBlue,
  ),
];

// ── Projects Section ──────────────────────────────────────────────────────────

class ProjectsSection extends StatelessWidget {
  final GlobalKey sectionKey;

  const ProjectsSection({super.key, required this.sectionKey});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isDesktop = width >= 1024;
    final isTablet = width >= 640 && width < 1024;
    final hPad = isDesktop ? 80.0 : 24.0;
    final vPad = isDesktop ? 80.0 : 48.0;

    final crossAxisCount = isDesktop ? 3 : (isTablet ? 2 : 1);

    return Stack(
      clipBehavior: Clip.none,
      children: [
        // Background decoration layer
        const Positioned.fill(
          child: DotGridPattern(
            spacing: 36,
            dotRadius: 1.1,
            color: Color(0x155A87AC),
          ),
        ),
        // Glow orbs in background
        const Positioned(
          top: 0,
          right: -100,
          child: GlowOrb(
            size: 500,
            color: GlacierColors.lightBlue,
            opacity: 0.35,
          ),
        ),
        const Positioned(
          bottom: -80,
          left: -80,
          child: GlowOrb(
            size: 400,
            color: Color(0xFFD6E9F5),
            opacity: 0.40,
          ),
        ),
        // Content
        Container(
          key: sectionKey,
          padding: EdgeInsets.symmetric(horizontal: hPad, vertical: vPad),
          child: Column(
            children: [
              // Section label
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                decoration: BoxDecoration(
                  color: GlacierColors.lightBlue.withOpacity(0.35),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: GlacierColors.mutedBlue.withOpacity(0.45),
                    width: 1,
                  ),
                ),
                child: const Text(
                  '⚡  FEATURED WORK',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: GlacierColors.darkBlue,
                    letterSpacing: 1.8,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const _GradientSectionHeading(text: 'Featured Work'),
              const SizedBox(height: 12),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 560),
                child: Text(
                  'A selection of projects spanning game development, AI, and open source.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: GlacierColors.textSecondary,
                        height: 1.6,
                      ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 56),

              // Responsive grid
              _ProjectGrid(
                projects: _projects,
                crossAxisCount: crossAxisCount,
              ),

              const SizedBox(height: 48),

              // GitHub CTA
              _GithubCTA(),
            ],
          ),
        ),
      ],
    );
  }
}

class _GithubCTA extends StatefulWidget {
  @override
  State<_GithubCTA> createState() => _GithubCTAState();
}

class _GithubCTAState extends State<_GithubCTA> {
  bool _hovered = false;

  Future<void> _open() async {
    final uri = Uri.parse(_kGithubBase);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: _open,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 13),
          decoration: BoxDecoration(
            color: _hovered ? GlacierColors.mutedBlue : GlacierColors.darkBlue,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: _hovered ? GlacierColors.mutedBlue : GlacierColors.darkBlue,
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0x241C3A5E),
                blurRadius: _hovered ? 16 : 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.code_rounded,
                size: 16,
                color: GlacierColors.offWhite,
              ),
              SizedBox(width: 8),
              Text(
                'View all on GitHub',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: GlacierColors.offWhite,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProjectGrid extends StatelessWidget {
  final List<_Project> projects;
  final int crossAxisCount;

  const _ProjectGrid({
    required this.projects,
    required this.crossAxisCount,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      const spacing = 22.0;
      final totalSpacing = spacing * (crossAxisCount - 1);
      final cardWidth = (constraints.maxWidth - totalSpacing) / crossAxisCount;

      return Wrap(
        spacing: spacing,
        runSpacing: spacing,
        children: projects
            .map((p) => SizedBox(
                  width: cardWidth,
                  child: _ProjectCard(project: p),
                ))
            .toList(),
      );
    });
  }
}

// ── Project Card ──────────────────────────────────────────────────────────────

class _ProjectCard extends StatefulWidget {
  final _Project project;

  const _ProjectCard({required this.project});

  @override
  State<_ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<_ProjectCard> {
  bool _hovered = false;

  Future<void> _open() async {
    final uri = Uri.parse(widget.project.link);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return BorderGlowWrapper(
      backgroundColor: GlacierColors.cardSurface,
      glowColor: GlacierColors.mutedBlue,
      colors: const [GlacierColors.lightBlue, GlacierColors.mutedBlue, GlacierColors.darkBlue],
      borderRadius: 20,
      glowRadius: 24,
      glowIntensity: 0.8,
      edgeSensitivity: 30,
      child: MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: GestureDetector(
          onTap: _open,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 230),
            transform: Matrix4.translationValues(0, _hovered ? -6 : 0, 0),
            decoration: BoxDecoration(
              color: GlacierColors.cardSurface,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: _hovered
                    ? GlacierColors.mutedBlue.withOpacity(0.5)
                    : const Color(0x185A87AC),
                width: 1.5,
              ),
              boxShadow: [
                BoxShadow(
                  color: _hovered
                      ? const Color(0x181C3A5E)
                      : const Color(0x0C1C3A5E),
                  blurRadius: _hovered ? 20 : 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Stack(
              children: [
                // Subtle gradient header strip
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 230),
                    height: 4,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [GlacierColors.darkBlue, GlacierColors.mutedBlue],
                      ),
                    ),
                  ),
                ),
                // Content
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 28, 22, 22),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Icon + Status chip row
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Project icon badge
                          AnimatedContainer(
                            duration: const Duration(milliseconds: 230),
                            width: 46,
                            height: 46,
                            decoration: BoxDecoration(
                              color: GlacierColors.lightBlue.withOpacity(_hovered ? 0.45 : 0.25),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: GlacierColors.mutedBlue.withOpacity(_hovered ? 0.6 : 0.35),
                                width: 1.5,
                              ),
                            ),
                            child: Center(
                              child: Icon(
                                widget.project.icon,
                                size: 22,
                                color: GlacierColors.darkBlue,
                              ),
                            ),
                          ),
                          const Spacer(),
                          if (widget.project.statusChip != null)
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: GlacierColors.lightBlue.withOpacity(0.35),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(
                                  color: GlacierColors.mutedBlue.withOpacity(0.45),
                                  width: 1,
                                ),
                              ),
                              child: Text(
                                widget.project.statusChip!,
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                  color: GlacierColors.darkBlue,
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Title
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              widget.project.title,
                              style: Theme.of(context)
                                  .textTheme
                                  .headlineMedium
                                  ?.copyWith(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w800,
                                    color: GlacierColors.textPrimary,
                                    height: 1.2,
                                  ),
                            ),
                          ),
                          AnimatedContainer(
                            duration: const Duration(milliseconds: 230),
                            child: Icon(
                              Icons.arrow_outward,
                              size: 16,
                              color: _hovered
                                  ? widget.project.accentColor
                                  : GlacierColors.textSecondary.withOpacity(0.5),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),

                      // Description
                      Text(
                        widget.project.description,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              height: 1.65,
                              color: GlacierColors.textSecondary,
                            ),
                      ),
                      const SizedBox(height: 18),

                      // Tags
                      Wrap(
                        spacing: 7,
                        runSpacing: 7,
                        children: widget.project.tags
                            .map((tag) => _TagChip(
                                  label: tag,
                                  accentColor: widget.project.accentColor,
                                ))
                            .toList(),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TagChip extends StatelessWidget {
  final String label;
  final Color accentColor;

  const _TagChip({required this.label, required this.accentColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: GlacierColors.lightBlue.withOpacity(0.3),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: GlacierColors.mutedBlue.withOpacity(0.4),
          width: 1,
        ),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: GlacierColors.darkBlue,
          letterSpacing: 0.2,
        ),
      ),
    );
  }
}

// ── Shared gradient heading ───────────────────────────────────────────────────

class _GradientSectionHeading extends StatelessWidget {
  final String text;

  const _GradientSectionHeading({required this.text});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) =>
          GlacierColors.accentGradient.createShader(bounds),
      child: Text(
        text,
        style: Theme.of(context).textTheme.displaySmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
