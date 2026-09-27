import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/glacier_dawn_theme.dart';
import 'maximalist_decorations.dart';
import 'hero_reveal.dart';
import 'border_glow_wrapper.dart';

class HeroSection extends StatelessWidget {
  final GlobalKey sectionKey;
  final void Function(String) scrollTo;

  const HeroSection({
    super.key,
    required this.sectionKey,
    required this.scrollTo,
  });

  Future<void> _openUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width >= 900;

    return Container(
      key: sectionKey,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          // ── Layer 1: Dot Matrix Background Pattern ───────────────────────────
          const Positioned.fill(
            child: DotGridPattern(
              spacing: 32,
              dotRadius: 1.3,
              color: Color(0x185A87AC),
            ),
          ),

          // ── Layer 2: Ambient Glowing Blobs ───────────────────────────────────
          const Positioned(
            top: -60,
            left: -80,
            child: GlowOrb(
              size: 380,
              color: GlacierColors.glacierBlue,
              opacity: 0.28,
            ),
          ),
          const Positioned(
            bottom: 20,
            right: -60,
            child: GlowOrb(
              size: 420,
              color: GlacierColors.lightBlue,
              opacity: 0.22,
            ),
          ),

          // ── Layer 3: Hero Content ───────────────────────────────────────────
          Padding(
            padding: EdgeInsets.fromLTRB(
              isDesktop ? 80 : 24,
              isDesktop ? 120 : 80,
              isDesktop ? 80 : 24,
              isDesktop ? 80 : 50,
            ),
            child: Column(
              children: [
                if (isDesktop)
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(child: _heroText(context, isDesktop: true)),
                      const SizedBox(width: 50),
                      const _ConstellationAvatar(),
                    ],
                  )
                else
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const _ConstellationAvatar(),
                      const SizedBox(height: 36),
                      _heroText(context, isDesktop: false),
                    ],
                  ),
                const SizedBox(height: 50),
                _ScrollDownIndicator(onTap: () => scrollTo('play')),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _heroText(BuildContext context, {required bool isDesktop}) {
    return Column(
      crossAxisAlignment:
          isDesktop ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        // Pill status eyebrow
        BorderGlowWrapper(
          backgroundColor: GlacierColors.cardSurface,
          glowColor: GlacierColors.glacierBlue,
          colors: const [GlacierColors.glacierBlue, GlacierColors.slateBlue, GlacierColors.deepNavy],
          borderRadius: 20,
          glowRadius: 20,
          glowIntensity: 0.8,
          edgeSensitivity: 30,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: GlacierColors.accentGreen,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 8),
                const Text(
                  'Available for opportunities & projects',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: GlacierColors.deepNavy,
                    letterSpacing: 0.3,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Eyebrow greeting
        Text(
          'Hi, I\'m',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: GlacierColors.textSecondary,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.5,
              ),
        ),
        const SizedBox(height: 6),

        // Anime.js v4 hero text reveal (name + subtitle)
        HeroTextReveal(isDesktop: isDesktop),
        const SizedBox(height: 20),

        // Supporting sentence
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 560),
          child: Text(
            'Computer science engineering student focused on game development and AI systems.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: GlacierColors.textSecondary,
                  fontSize: 17,
                  height: 1.65,
                ),
            textAlign: isDesktop ? TextAlign.left : TextAlign.center,
          ),
        ),
        const SizedBox(height: 36),

        // CTA buttons (including Download Resume)
        Wrap(
          spacing: 14,
          runSpacing: 12,
          alignment:
              isDesktop ? WrapAlignment.start : WrapAlignment.center,
          children: [
            _GradientButton(
              label: 'View Projects',
              icon: Icons.grid_view_rounded,
              style: _ButtonStyle.filled,
              onPressed: () => scrollTo('projects'),
            ),
            _GradientButton(
              label: 'Play the Game',
              icon: Icons.sports_esports_rounded,
              style: _ButtonStyle.coral,
              onPressed: () => scrollTo('play'),
            ),
            const _GradientButton(
              label: 'Download Resume',
              icon: Icons.download_rounded,
              style: _ButtonStyle.outline,
              onPressed: openResume,
            ),
          ],
        ),
        const SizedBox(height: 32),

        // Social icons
        Row(
          mainAxisAlignment: isDesktop
              ? MainAxisAlignment.start
              : MainAxisAlignment.center,
          children: [
            _SocialIconButton(
              icon: const Icon(Icons.code_rounded, size: 20),
              tooltip: 'GitHub',
              onTap: () => _openUrl('https://github.com/Fusionforge19'),
            ),
            const SizedBox(width: 14),
            _SocialIconButton(
              icon: const Icon(Icons.work_outline_rounded, size: 20),
              tooltip: 'LinkedIn',
              onTap: () => _openUrl(
                  'https://www.linkedin.com/in/ahmed-shaikh-511499316/'),
            ),
            const SizedBox(width: 14),
            _SocialIconButton(
              icon: const Icon(Icons.email_outlined, size: 20),
              tooltip: 'Email',
              onTap: () => _openUrl('mailto:mahmed9869@gmail.com'),
            ),
          ],
        ),
      ],
    );
  }
}

// ── Scoped rotating subtitle ──────────────────────────────────────────────────

class _RotatingSubtitle extends StatefulWidget {
  final bool isDesktop;

  const _RotatingSubtitle({required this.isDesktop});

  @override
  State<_RotatingSubtitle> createState() => _RotatingSubtitleState();
}

class _RotatingSubtitleState extends State<_RotatingSubtitle>
    with SingleTickerProviderStateMixin {
  static const List<String> _subtitles = [
    'UE5 / C++ Game Developer',
    'CS Engineering Student',
    'Real-Time AI & Gameplay Systems',
  ];
  int _currentSubtitleIndex = 0;
  late final AnimationController _subtitleCtrl;
  late final Animation<double> _subtitleFade;
  late final Animation<Offset> _subtitleSlide;

  @override
  void initState() {
    super.initState();
    _subtitleCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 450),
    );
    _subtitleFade = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _subtitleCtrl, curve: Curves.easeIn),
    );
    _subtitleSlide = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _subtitleCtrl, curve: Curves.easeOut));

    _subtitleCtrl.forward();
    _startRotation();
  }

  void _startRotation() {
    Future.delayed(const Duration(milliseconds: 2500), () {
      if (!mounted) return;
      _subtitleCtrl.reverse().then((_) {
        if (!mounted) return;
        setState(() {
          _currentSubtitleIndex =
              (_currentSubtitleIndex + 1) % _subtitles.length;
        });
        _subtitleCtrl.forward().then((_) => _startRotation());
      });
    });
  }

  @override
  void dispose() {
    _subtitleCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 38,
      child: FadeTransition(
        opacity: _subtitleFade,
        child: SlideTransition(
          position: _subtitleSlide,
          child: Align(
            alignment: widget.isDesktop
                ? Alignment.centerLeft
                : Alignment.center,
            child: Text(
              _subtitles[_currentSubtitleIndex],
              style: TextStyle(
                fontSize: widget.isDesktop ? 26 : 22,
                fontWeight: FontWeight.w700,
                color: GlacierColors.accentViolet,
                height: 1.3,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ── Constellation Avatar System ───────────────────────────────────────────────

class _ConstellationAvatar extends StatelessWidget {
  const _ConstellationAvatar();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 320,
      height: 320,
      child: Stack(
        alignment: Alignment.center,
        clipBehavior: Clip.none,
        children: [
          // Outer Orbit Ring
          const DashedOrbitRing(
            diameter: 280,
            color: Color(0x308FB8CC),
          ),
          // Secondary Orbit Ring
          Container(
            width: 220,
            height: 220,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: GlacierColors.mutedBlue.withOpacity(0.3),
                width: 1.5,
              ),
            ),
          ),
          // Central Avatar Badge
          const _AvatarBadge(),
          // Top Satellite: Unreal Engine
          const Positioned(
            top: 4,
            child: SatelliteBadge(
              label: 'Unreal Engine',
              icon: Icons.sports_esports_rounded,
              accentColor: GlacierColors.deepNavy,
            ),
          ),
          // Right Satellite: C++
          const Positioned(
            right: 2,
            child: SatelliteBadge(
              label: 'C++',
              icon: Icons.code_rounded,
              accentColor: GlacierColors.glacierBlue,
            ),
          ),
          // Bottom Satellite: AI Systems
          const Positioned(
            bottom: 4,
            child: SatelliteBadge(
              label: 'AI Systems',
              icon: Icons.psychology_rounded,
              accentColor: GlacierColors.deepNavy,
            ),
          ),
          // Left Satellite: Gameplay
          const Positioned(
            left: 2,
            child: SatelliteBadge(
              label: 'Gameplay',
              icon: Icons.videogame_asset_rounded,
              accentColor: GlacierColors.glacierBlue,
            ),
          ),
        ],
      ),
    );
  }
}

class _AvatarBadge extends StatelessWidget {
  const _AvatarBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 170,
      height: 170,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: const LinearGradient(
          colors: [GlacierColors.deepNavy, GlacierColors.glacierBlue],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: GlacierColors.glacierBlue.withOpacity(0.35),
            blurRadius: 32,
            spreadRadius: 4,
            offset: const Offset(0, 8),
          ),
          BoxShadow(
            color: GlacierColors.deepNavy.withOpacity(0.18),
            blurRadius: 12,
            spreadRadius: 0,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: const Center(
        child: Text(
          'A',
          style: TextStyle(
            fontSize: 76,
            fontWeight: FontWeight.w800,
            color: GlacierColors.offWhite,
            height: 1,
          ),
        ),
      ),
    );
  }
}

// ── Gradient button ───────────────────────────────────────────────────────────

enum _ButtonStyle { filled, coral, outline }

class _GradientButton extends StatefulWidget {
  final String label;
  final IconData? icon;
  final _ButtonStyle style;
  final VoidCallback onPressed;

  const _GradientButton({
    required this.label,
    this.icon,
    this.style = _ButtonStyle.outline,
    required this.onPressed,
  });

  @override
  State<_GradientButton> createState() => _GradientButtonState();
}

class _GradientButtonState extends State<_GradientButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final Color bgColor;
    final Color fgColor;
    final Color borderColor;
    final List<BoxShadow> shadows;

    switch (widget.style) {
      case _ButtonStyle.filled:
        bgColor = _hovered ? GlacierColors.slateBlue : GlacierColors.deepNavy;
        fgColor = GlacierColors.offWhite;
        borderColor = Colors.transparent;
        shadows = GlacierColors.buttonShadow;
      case _ButtonStyle.coral:
        bgColor = _hovered
            ? GlacierColors.coralAccent.withOpacity(0.88)
            : GlacierColors.coralAccent;
        fgColor = GlacierColors.deepNavy;
        borderColor = Colors.transparent;
        shadows = GlacierColors.coralButtonShadow;
      case _ButtonStyle.outline:
        bgColor = _hovered
            ? GlacierColors.glacierBlue.withOpacity(0.12)
            : GlacierColors.cardSurface;
        fgColor = _hovered ? GlacierColors.deepNavy : GlacierColors.slateBlue;
        borderColor = _hovered
            ? GlacierColors.glacierBlue
            : GlacierColors.glacierBlue.withOpacity(0.5);
        shadows = [
          BoxShadow(
            color: GlacierColors.glacierBlue
                .withOpacity(_hovered ? 0.15 : 0.06),
            blurRadius: _hovered ? 12 : 6,
            offset: const Offset(0, 3),
          ),
        ];
    }

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 13),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: borderColor, width: 1.5),
            boxShadow: shadows,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (widget.icon != null) ...[
                Icon(widget.icon, size: 16, color: fgColor),
                const SizedBox(width: 8),
              ],
              Text(
                widget.label,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: fgColor,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Maximalist Social icon button ─────────────────────────────────────────────

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
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: _hovered
                  ? GlacierColors.deepNavy
                  : GlacierColors.cardSurface,
              border: Border.all(
                color: _hovered
                    ? GlacierColors.deepNavy
                    : GlacierColors.glacierBlue.withOpacity(0.45),
                width: 1.5,
              ),
              boxShadow: [
                BoxShadow(
                  color: _hovered
                      ? const Color(0x2216324A)
                      : const Color(0x0F16324A),
                  blurRadius: _hovered ? 14 : 5,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Center(
              child: IconTheme(
                data: IconThemeData(
                  color: _hovered
                      ? GlacierColors.offWhite
                      : GlacierColors.deepNavy,
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

// ── Scroll Down Indicator ─────────────────────────────────────────────────────

class _ScrollDownIndicator extends StatefulWidget {
  final VoidCallback onTap;

  const _ScrollDownIndicator({required this.onTap});

  @override
  State<_ScrollDownIndicator> createState() => _ScrollDownIndicatorState();
}

class _ScrollDownIndicatorState extends State<_ScrollDownIndicator>
  with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  late final Animation<double> _bounceAnim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1100),
    )..repeat(reverse: true);
    _bounceAnim = Tween<double>(begin: 0, end: 7).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: AnimatedBuilder(
          animation: _bounceAnim,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, _bounceAnim.value),
              child: child,
            );
          },
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'SCROLL TO EXPLORE',
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 2.2,
                  color: GlacierColors.mutedBlue,
                ),
              ),
              const SizedBox(height: 6),
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: GlacierColors.cardSurface,
                  border: Border.all(
                    color: GlacierColors.mutedBlue.withOpacity(0.4),
                    width: 1.5,
                  ),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x141C3A5E),
                      blurRadius: 8,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.keyboard_arrow_down_rounded,
                  color: GlacierColors.deepNavy,
                  size: 20,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
