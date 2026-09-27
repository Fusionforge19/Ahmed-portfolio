import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/glacier_dawn_theme.dart';
import '../game_embed/game_embed.dart';
import 'maximalist_decorations.dart';

class PlaySection extends StatelessWidget {
  final GlobalKey sectionKey;

  const PlaySection({super.key, required this.sectionKey});

  Future<void> _openFullscreen() async {
    const url = 'assets/assets/game/index.html';
    final uri = Uri.parse(url);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        await launchUrl(uri);
      }
    } catch (_) {
      // Fallback: direct relative launch
      await launchUrl(Uri.parse('assets/game/index.html'));
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
            spacing: 32,
            dotRadius: 1.1,
            color: Color(0x125A87AC),
          ),
        ),
        const Positioned(
          top: -80,
          right: -60,
          child: GlowOrb(
            size: 500,
            color: GlacierColors.accentViolet,
            opacity: 0.13,
          ),
        ),
        const Positioned(
          bottom: -40,
          left: -40,
          child: GlowOrb(
            size: 340,
            color: GlacierColors.accentCyan,
            opacity: 0.10,
          ),
        ),
        // Content
        Container(
          key: sectionKey,
          padding: EdgeInsets.symmetric(horizontal: hPad, vertical: vPad),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Section eyebrow
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                decoration: BoxDecoration(
                  color: GlacierColors.accentViolet.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: GlacierColors.accentViolet.withOpacity(0.35),
                    width: 1,
                  ),
                ),
                child: const Text(
                  '🎮  PLAYABLE DEMO',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: GlacierColors.accentViolet,
                    letterSpacing: 1.8,
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Section heading
              const _GradientSectionHeading(text: 'Play a Game'),
              const SizedBox(height: 12),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 520),
                child: Text(
                  'A small arcade game I built — survive as long as you can.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: GlacierColors.textSecondary,
                        height: 1.6,
                      ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 40),

              // Decorative stats row
              _GameStatsRow(),

              const SizedBox(height: 32),

              // Dark game panel
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 900),
                  child: _GamePanel(onFullscreen: _openFullscreen),
                ),
              ),
              const SizedBox(height: 20),

              // Fullscreen button
              _FullscreenButton(onTap: _openFullscreen),
            ],
          ),
        ),
      ],
    );
  }
}

// ── Game stats row ────────────────────────────────────────────────────────────

class _GameStatsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Wrap(
      spacing: 16,
      runSpacing: 12,
      alignment: WrapAlignment.center,
      children: [
        _StatPill(icon: Icons.timer_outlined, label: 'Survive as long as you can', color: GlacierColors.lightBlue),
        _StatPill(icon: Icons.videogame_asset_rounded, label: 'Built from scratch', color: GlacierColors.mutedBlue),
        _StatPill(icon: Icons.touch_app_rounded, label: 'Keyboard + Mouse', color: GlacierColors.darkBlue),
      ],
    );
  }
}

class _StatPill extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;

  const _StatPill({
    required this.icon,
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: color.withOpacity(0.08),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: color.withOpacity(0.28),
          width: 1.5,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 7),
          Text(
            label,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: GlacierColors.textSecondary,
              letterSpacing: 0.2,
            ),
          ),
        ],
      ),
    );
  }
}

// ── Game panel with glowing border ───────────────────────────────────────────

class _GamePanel extends StatelessWidget {
  final VoidCallback onFullscreen;

  const _GamePanel({required this.onFullscreen});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        gradient: const LinearGradient(
          colors: [GlacierColors.lightBlue, GlacierColors.darkBlue],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: GlacierColors.mutedBlue.withOpacity(0.22),
            blurRadius: 40,
            spreadRadius: 2,
          ),
        ],
      ),
      padding: const EdgeInsets.all(2.5),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(19),
        child: Container(
          color: GlacierColors.darkPanel,
          child: AspectRatio(
            aspectRatio: 16 / 9,
            child: buildGameEmbed(),
          ),
        ),
      ),
    );
  }
}

class _FullscreenButton extends StatefulWidget {
  final VoidCallback onTap;

  const _FullscreenButton({required this.onTap});

  @override
  State<_FullscreenButton> createState() => _FullscreenButtonState();
}

class _FullscreenButtonState extends State<_FullscreenButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
          decoration: BoxDecoration(
            color: _hovered
                ? GlacierColors.mutedBlue.withOpacity(0.10)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: _hovered
                  ? GlacierColors.mutedBlue.withOpacity(0.50)
                  : Colors.transparent,
              width: 1,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.open_in_full_rounded,
                size: 14,
                color: _hovered
                    ? GlacierColors.mutedBlue
                    : GlacierColors.textSecondary,
              ),
              const SizedBox(width: 7),
              Text(
                'Open Fullscreen',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: _hovered
                      ? GlacierColors.mutedBlue
                      : GlacierColors.textSecondary,
                  decoration: _hovered
                      ? TextDecoration.underline
                      : TextDecoration.none,
                  decorationColor: GlacierColors.mutedBlue,
                ),
              ),
            ],
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
