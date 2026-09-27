import 'package:flutter/material.dart';
import '../theme/glacier_dawn_theme.dart';
import 'maximalist_decorations.dart';
import 'border_glow_wrapper.dart';

class AboutSection extends StatelessWidget {
  final GlobalKey sectionKey;

  const AboutSection({super.key, required this.sectionKey});

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;
    final hPad = isDesktop ? 80.0 : 24.0;
    final vPad = isDesktop ? 80.0 : 48.0;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        // Background decoration
        const Positioned.fill(
          child: DotGridPattern(
            spacing: 40,
            dotRadius: 1.0,
            color: Color(0x125A87AC),
          ),
        ),
        const Positioned(
          top: -60,
          left: -120,
          child: GlowOrb(
            size: 480,
            color: GlacierColors.accentCyan,
            opacity: 0.09,
          ),
        ),
        const Positioned(
          bottom: 0,
          right: -60,
          child: GlowOrb(
            size: 360,
            color: GlacierColors.accentViolet,
            opacity: 0.12,
          ),
        ),
        // Content
        Container(
          key: sectionKey,
          padding: EdgeInsets.symmetric(horizontal: hPad, vertical: vPad),
          child: Column(
            children: [
              // Section eyebrow
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                decoration: BoxDecoration(
                  color: GlacierColors.accentCyan.withOpacity(0.10),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: GlacierColors.accentCyan.withOpacity(0.30),
                    width: 1,
                  ),
                ),
                child: const Text(
                  '👋  WHO I AM',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: GlacierColors.accentCyan,
                    letterSpacing: 1.8,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const _GradientSectionHeading(text: 'About Me'),
              const SizedBox(height: 48),
              if (isDesktop)
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 3, child: _AboutText()),
                    SizedBox(width: 60),
                    Expanded(flex: 2, child: _AboutSidePanel()),
                  ],
                )
              else
                const Column(
                  children: [
                    _AboutText(),
                    SizedBox(height: 40),
                    _AboutSidePanel(),
                  ],
                ),
            ],
          ),
        ),
      ],
    );
  }
}

// ── About body copy ───────────────────────────────────────────────────────────

class _AboutText extends StatelessWidget {
  const _AboutText();

  final _paragraphs = const [
    "I’m a Computer Science engineering student focused on game development and AI systems. My work is centered on building interactive projects, implementing gameplay mechanics, and applying algorithms to real-time environments.",
    "My coursework includes data structures, algorithms, OOP, computer graphics, AI, and linear algebra, which shape how I approach problem solving and product development. I enjoy creating practical systems that combine design, logic, and user experience.",
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ..._paragraphs.asMap().entries.map((entry) {
          final isLast = entry.key == _paragraphs.length - 1;
          return Padding(
            padding: EdgeInsets.only(bottom: isLast ? 0 : 24),
            child: Text(
              entry.value,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: GlacierColors.textPrimary,
                    height: 1.8,
                    fontSize: 16,
                  ),
            ),
          );
        }),
        const SizedBox(height: 36),
        // Skills chips row
        const _SkillsRow(),
      ],
    );
  }
}

class _SkillsRow extends StatelessWidget {
  const _SkillsRow();

  static const _skills = [
    ('C++', GlacierColors.darkBlue),
    ('Unreal Engine', GlacierColors.mutedBlue),
    ('Blueprints', GlacierColors.darkBlue),
    ('Gameplay Systems', GlacierColors.mutedBlue),
    ('Git', GlacierColors.darkBlue),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'TECH STACK',
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w700,
            letterSpacing: 2,
            color: GlacierColors.textSecondary.withOpacity(0.7),
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: _skills.map((skill) {
            return BorderGlowWrapper(
              backgroundColor: GlacierColors.cardSurface,
              glowColor: skill.$2,
              colors: const [GlacierColors.lightBlue, GlacierColors.mutedBlue, GlacierColors.darkBlue],
              borderRadius: 24,
              glowRadius: 20,
              glowIntensity: 0.8,
              edgeSensitivity: 30,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                child: Text(
                  skill.$1,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: skill.$2,
                    letterSpacing: 0.3,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}

// ── Stat side panel ───────────────────────────────────────────────────────────

class _AboutSidePanel extends StatelessWidget {
  const _AboutSidePanel();

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        // Focus card
        _StatCard(
          icon: Icons.auto_awesome_rounded,
          iconGradient: LinearGradient(
            colors: [GlacierColors.mutedBlue, GlacierColors.darkBlue],
          ),
          title: 'Current Focus',
          subtitle:
              'Game development and AI systems, with practical project work in interactive design.',
          badge: '🎯 Active',
          badgeColor: GlacierColors.mutedBlue,
        ),
        SizedBox(height: 20),
        // Education card
        _StatCard(
          icon: Icons.school_rounded,
          iconGradient: GlacierColors.accentGradient,
          title: 'Computer Science',
          subtitle:
              'Bachelor of Engineering in Computer Science, Mumbai University — expected 2028.',
          badge: '📚 Current',
          badgeColor: GlacierColors.darkBlue,
        ),
        SizedBox(height: 20),
        // Projects card
        _StatCard(
          icon: Icons.folder_special_rounded,
          iconGradient: LinearGradient(
            colors: [GlacierColors.lightBlue, GlacierColors.mutedBlue],
          ),
          title: 'Project Experience',
          subtitle:
              'Built a full-stack marketplace MVP and won a hackathon for a real-time canteen kiosk system.',
          badge: '⚡ Verified',
          badgeColor: GlacierColors.mutedBlue,
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final IconData icon;
  final Gradient iconGradient;
  final String title;
  final String subtitle;
  final String badge;
  final Color badgeColor;

  const _StatCard({
    required this.icon,
    required this.iconGradient,
    required this.title,
    required this.subtitle,
    required this.badge,
    required this.badgeColor,
  });

  @override
  Widget build(BuildContext context) {
    return BorderGlowWrapper(
      backgroundColor: GlacierColors.cardSurface,
      glowColor: badgeColor,
      colors: const [GlacierColors.lightBlue, GlacierColors.mutedBlue, GlacierColors.darkBlue],
      borderRadius: 18,
      glowRadius: 30,
      glowIntensity: 1.0,
      edgeSensitivity: 30,
      child: Padding(
        padding: const EdgeInsets.all(22),
        child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Icon badge
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              gradient: iconGradient,
              borderRadius: BorderRadius.circular(13),
              boxShadow: [
                BoxShadow(
                  color: badgeColor.withOpacity(0.30),
                  blurRadius: 14,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Icon(icon, color: Colors.white, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: ShaderMask(
                        blendMode: BlendMode.srcIn,
                        shaderCallback: (b) =>
                            GlacierColors.accentGradient.createShader(b),
                        child: Text(
                          title,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            height: 1.2,
                          ),
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: badgeColor.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: badgeColor.withOpacity(0.35),
                          width: 1,
                        ),
                      ),
                      child: Text(
                        badge,
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: badgeColor,
                          letterSpacing: 0.3,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: GlacierColors.textSecondary,
                        height: 1.6,
                        fontSize: 13,
                      ),
                ),
              ],
            ),
          ),
        ],
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
