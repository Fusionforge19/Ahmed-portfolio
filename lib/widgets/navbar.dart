import 'package:flutter/material.dart';
import '../theme/glacier_dawn_theme.dart';
import 'maximalist_decorations.dart';

class PortfolioNavbar extends StatefulWidget {
  final Map<String, GlobalKey> sectionKeys;

  const PortfolioNavbar({super.key, required this.sectionKeys});

  @override
  State<PortfolioNavbar> createState() => _PortfolioNavbarState();
}

class _PortfolioNavbarState extends State<PortfolioNavbar> {
  bool _mobileMenuOpen = false;

  void _scrollTo(String section) {
    final key = widget.sectionKeys[section];
    if (key?.currentContext != null) {
      Scrollable.ensureVisible(
        key!.currentContext!,
        duration: const Duration(milliseconds: 380),
        curve: Curves.easeOutCubic,
        alignment: 0.0,
      );
    }
    if (_mobileMenuOpen) {
      setState(() => _mobileMenuOpen = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    return Stack(
      children: [
        // ── Main navbar bar ──────────────────────────────────────────────────
        Positioned(
          top: 0,
          left: 0,
          right: 0,
          child: Container(
            height: 64,
            decoration: BoxDecoration(
              color: GlacierColors.cardSurface.withOpacity(0.96),
              border: const Border(
                bottom: BorderSide(
                  color: Color(0x1F8FB8CC),
                  width: 1,
                ),
              ),
              boxShadow: const [
                BoxShadow(
                  color: GlacierColors.shadowColor,
                  blurRadius: 16,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Wordmark
                const _GradientText(
                  'Ahmed',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.5,
                  ),
                ),
                if (isDesktop)
                  _DesktopNavLinks(onTap: _scrollTo)
                else
                  IconButton(
                    icon: AnimatedSwitcher(
                      duration: const Duration(milliseconds: 200),
                      child: Icon(
                        _mobileMenuOpen ? Icons.close : Icons.menu,
                        key: ValueKey(_mobileMenuOpen),
                        color: GlacierColors.textPrimary,
                      ),
                    ),
                    onPressed: () =>
                        setState(() => _mobileMenuOpen = !_mobileMenuOpen),
                  ),
              ],
            ),
          ),
        ),

        // ── Mobile full-screen overlay ───────────────────────────────────────
        if (!isDesktop && _mobileMenuOpen)
          Positioned.fill(
            top: 64,
            child: Container(
              color: GlacierColors.cardSurface.withOpacity(0.98),
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 24),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      'Projects',
                      'Play',
                      'Terminal',
                      'About',
                      'Contact',
                      'Resume',
                    ]
                        .map(
                          (label) => _MobileNavItem(
                            label: label,
                            onTap: () {
                              if (label == 'Resume') {
                                openResume();
                              } else {
                                _scrollTo(label.toLowerCase());
                              }
                            },
                          ),
                        )
                        .toList(),
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}

// ── Desktop nav links ─────────────────────────────────────────────────────────

class _DesktopNavLinks extends StatelessWidget {
  final void Function(String) onTap;

  const _DesktopNavLinks({required this.onTap});

  @override
  Widget build(BuildContext context) {
    final links = ['Projects', 'Play', 'Terminal', 'About', 'Contact'];
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ...links.map((label) => _NavLinkButton(
              label: label,
              onTap: () => onTap(label.toLowerCase()),
            )),
        const SizedBox(width: 8),
        const _ResumeNavButton(),
      ],
    );
  }
}

class _ResumeNavButton extends StatefulWidget {
  const _ResumeNavButton();

  @override
  State<_ResumeNavButton> createState() => _ResumeNavButtonState();
}

class _ResumeNavButtonState extends State<_ResumeNavButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: openResume,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: _hovered ? GlacierColors.deepNavy : GlacierColors.glacierBlue.withOpacity(0.28),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: _hovered
                  ? GlacierColors.deepNavy
                  : GlacierColors.slateBlue.withOpacity(0.35),
              width: 1.5,
            ),
            boxShadow: _hovered
                ? const [
                    BoxShadow(
                      color: Color(0x2516324A),
                      blurRadius: 12,
                      offset: Offset(0, 3),
                    )
                  ]
                : [],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.download_rounded,
                size: 14,
                color: _hovered ? GlacierColors.iceWhite : GlacierColors.deepNavy,
              ),
              const SizedBox(width: 5),
              Text(
                'Resume',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: _hovered
                      ? GlacierColors.iceWhite
                      : GlacierColors.deepNavy,
                  letterSpacing: 0.2,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavLinkButton extends StatefulWidget {
  final String label;
  final VoidCallback onTap;

  const _NavLinkButton({required this.label, required this.onTap});

  @override
  State<_NavLinkButton> createState() => _NavLinkButtonState();
}

class _NavLinkButtonState extends State<_NavLinkButton> {
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
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color: _hovered
                    ? GlacierColors.deepNavy
                    : Colors.transparent,
                width: 2,
              ),
            ),
          ),
          child: Text(
            widget.label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: _hovered ? FontWeight.w700 : FontWeight.w500,
              color: _hovered
                  ? GlacierColors.deepNavy
                  : GlacierColors.slateBlue,
              letterSpacing: 0.2,
            ),
          ),
        ),
      ),
    );
  }
}

class _MobileNavItem extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const _MobileNavItem({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 32),
        child: _GradientText(
          label,
          style: const TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
        ),
      ),
    );
  }
}

// ── Gradient text helper ──────────────────────────────────────────────────────

class _GradientText extends StatelessWidget {
  final String text;
  final TextStyle style;

  const _GradientText(this.text, {required this.style});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) =>
          GlacierColors.accentGradient.createShader(bounds),
      child: Text(text, style: style),
    );
  }
}
