import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/glacier_dawn_theme.dart';
import 'maximalist_decorations.dart';
import 'border_glow_wrapper.dart';

class ConnectSection extends StatelessWidget {
  final GlobalKey sectionKey;

  const ConnectSection({super.key, required this.sectionKey});

  Future<void> _openUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

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
            spacing: 30,
            dotRadius: 1.2,
            color: Color(0x125A87AC),
          ),
        ),
        const Positioned(
          top: -40,
          left: 0,
          right: 0,
          child: Center(
            child: GlowOrb(
              size: 600,
              color: GlacierColors.accentCyan,
              opacity: 0.08,
            ),
          ),
        ),
        const Positioned(
          bottom: -60,
          left: -80,
          child: GlowOrb(
            size: 350,
            color: GlacierColors.accentViolet,
            opacity: 0.12,
          ),
        ),
        // Content
        Container(
          key: sectionKey,
          padding: EdgeInsets.fromLTRB(hPad, vPad, hPad, 40),
          child: Column(
            children: [
              // Eyebrow label
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
                  '📬  GET IN TOUCH',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: GlacierColors.accentCyan,
                    letterSpacing: 1.8,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const _GradientSectionHeading(text: "Let's Connect"),
              const SizedBox(height: 16),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 520),
                child: Text(
                  'Interested in game development, AI systems, and practical software projects — feel free to connect.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: GlacierColors.textSecondary,
                        height: 1.7,
                        fontSize: 16,
                      ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 48),

              // Contact cards row
              if (isDesktop)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _ContactCard(
                      icon: Icons.code_rounded,
                      label: 'GitHub',
                      handle: '@Fusionforge19',
                      accentColor: GlacierColors.lightBlue,
                      onTap: () => _openUrl('https://github.com/Fusionforge19'),
                    ),
                    const SizedBox(width: 20),
                    _ContactCard(
                      icon: Icons.work_outline_rounded,
                      label: 'LinkedIn',
                      handle: 'ahmed-shaikh',
                      accentColor: GlacierColors.mutedBlue,
                      onTap: () => _openUrl(
                          'https://www.linkedin.com/in/ahmed-shaikh-511499316/'),
                    ),
                    const SizedBox(width: 20),
                    _ContactCard(
                      icon: Icons.email_outlined,
                      label: 'Email',
                      handle: 'mahmed9869@gmail.com',
                      accentColor: GlacierColors.darkBlue,
                      onTap: () => _openUrl('mailto:mahmed9869@gmail.com'),
                    ),
                  ],
                )
              else
                Column(
                  children: [
                    _ContactCard(
                      icon: Icons.code_rounded,
                      label: 'GitHub',
                      handle: '@Fusionforge19',
                      accentColor: GlacierColors.lightBlue,
                      onTap: () => _openUrl('https://github.com/Fusionforge19'),
                    ),
                    const SizedBox(height: 16),
                    _ContactCard(
                      icon: Icons.work_outline_rounded,
                      label: 'LinkedIn',
                      handle: 'ahmed-shaikh',
                      accentColor: GlacierColors.mutedBlue,
                      onTap: () => _openUrl(
                          'https://www.linkedin.com/in/ahmed-shaikh-511499316/'),
                    ),
                    const SizedBox(height: 16),
                    _ContactCard(
                      icon: Icons.email_outlined,
                      label: 'Email',
                      handle: 'mahmed9869@gmail.com',
                      accentColor: GlacierColors.darkBlue,
                      onTap: () => _openUrl('mailto:mahmed9869@gmail.com'),
                    ),
                  ],
                ),

              const SizedBox(height: 48),

              // Primary CTA buttons
              Wrap(
                spacing: 16,
                runSpacing: 14,
                alignment: WrapAlignment.center,
                children: [
                  _CTAButton(
                    label: 'Connect on LinkedIn',
                    icon: Icons.open_in_new,
                    filled: true,
                    onTap: () => _openUrl(
                        'https://www.linkedin.com/in/ahmed-shaikh-511499316/'),
                  ),
                  const _CTAButton(
                    label: 'Download Resume',
                    icon: Icons.download_rounded,
                    filled: false,
                    onTap: openResume,
                  ),
                ],
              ),

              const SizedBox(height: 72),

              // Footer
              Container(
                height: 1,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.transparent,
                      Color(0x305A87AC),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ShaderMask(
                    blendMode: BlendMode.srcIn,
                    shaderCallback: (b) =>
                        GlacierColors.accentGradient.createShader(b),
                    child: const Text(
                      'Ahmed',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                        letterSpacing: -0.3,
                      ),
                    ),
                  ),
                  Text(
                    '  ·  © 2026. Built with Flutter.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: GlacierColors.textSecondary.withOpacity(0.7),
                          fontSize: 12,
                        ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ],
    );
  }
}

// ── Contact card ──────────────────────────────────────────────────────────────

class _ContactCard extends StatefulWidget {
  final IconData icon;
  final String label;
  final String handle;
  final Color accentColor;
  final VoidCallback onTap;

  const _ContactCard({
    required this.icon,
    required this.label,
    required this.handle,
    required this.accentColor,
    required this.onTap,
  });

  @override
  State<_ContactCard> createState() => _ContactCardState();
}

class _ContactCardState extends State<_ContactCard> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return BorderGlowWrapper(
      backgroundColor: GlacierColors.cardSurface,
      glowColor: widget.accentColor,
      colors: [widget.accentColor, GlacierColors.mutedBlue, GlacierColors.lightBlue],
      borderRadius: 18,
      glowRadius: 30,
      glowIntensity: 1.0,
      edgeSensitivity: 30,
      child: MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: GestureDetector(
          onTap: widget.onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            transform: Matrix4.translationValues(0, _hovered ? -5 : 0, 0),
            constraints: const BoxConstraints(minWidth: 180),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: widget.accentColor.withOpacity(_hovered ? 0.18 : 0.10),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: widget.accentColor.withOpacity(_hovered ? 0.50 : 0.25),
                      width: 1.5,
                    ),
                  ),
                  child: Icon(
                    widget.icon,
                    size: 22,
                    color: widget.accentColor,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  widget.label,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: _hovered ? widget.accentColor : GlacierColors.textPrimary,
                    letterSpacing: 0.3,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  widget.handle,
                  style: TextStyle(
                    fontSize: 11,
                    color: GlacierColors.textSecondary.withOpacity(0.8),
                    fontWeight: FontWeight.w500,
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

// ── CTA Button ────────────────────────────────────────────────────────────────

class _CTAButton extends StatefulWidget {
  final String label;
  final IconData icon;
  final bool filled;
  final VoidCallback onTap;

  const _CTAButton({
    required this.label,
    required this.icon,
    required this.filled,
    required this.onTap,
  });

  @override
  State<_CTAButton> createState() => _CTAButtonState();
}

class _CTAButtonState extends State<_CTAButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 15),
          decoration: BoxDecoration(
            gradient: widget.filled ? GlacierColors.accentGradient : null,
            color: widget.filled
                ? null
                : GlacierColors.cardSurface.withOpacity(0.88),
            borderRadius: BorderRadius.circular(12),
            border: widget.filled
                ? null
                : Border.all(
                    color: _hovered
                        ? GlacierColors.mutedBlue
                        : GlacierColors.mutedBlue.withOpacity(0.35),
                    width: 1.5,
                  ),
            boxShadow: [
              BoxShadow(
                color: GlacierColors.mutedBlue
                    .withOpacity(_hovered ? 0.25 : 0.08),
                blurRadius: _hovered ? 20 : 8,
                spreadRadius: _hovered ? 1 : 0,
              ),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                widget.icon,
                size: 17,
                color: widget.filled
                    ? Colors.white
                    : (_hovered
                        ? GlacierColors.mutedBlue
                        : GlacierColors.textPrimary),
              ),
              const SizedBox(width: 9),
              Text(
                widget.label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: widget.filled
                      ? Colors.white
                      : (_hovered
                          ? GlacierColors.mutedBlue
                          : GlacierColors.textPrimary),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Social icon button ────────────────────────────────────────────────────────

class _SocialIconButton extends StatefulWidget {
  final Widget icon;
  final String tooltip;
  final VoidCallback onTap;

  const _SocialIconButton({
    required this.icon,
    required this.tooltip,
    required this.onTap,
  });

  @override
  State<_SocialIconButton> createState() => _SocialIconButtonState();
}

class _SocialIconButtonState extends State<_SocialIconButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: Tooltip(
        message: widget.tooltip,
        child: GestureDetector(
          onTap: widget.onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: _hovered
                  ? GlacierColors.mutedBlue.withOpacity(0.12)
                  : Colors.transparent,
              border: Border.all(
                color: _hovered
                    ? GlacierColors.mutedBlue
                    : GlacierColors.textSecondary.withOpacity(0.3),
                width: 1.5,
              ),
              boxShadow: _hovered
                  ? [
                      BoxShadow(
                        color: GlacierColors.mutedBlue.withOpacity(0.20),
                        blurRadius: 14,
                      )
                    ]
                  : [],
            ),
            child: Center(
              child: IconTheme(
                data: IconThemeData(
                  color: _hovered
                      ? GlacierColors.mutedBlue
                      : GlacierColors.textPrimary,
                  size: 20,
                ),
                child: widget.icon,
              ),
            ),
          ),
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
