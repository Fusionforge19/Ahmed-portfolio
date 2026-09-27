// Stub fallback for HeroTextReveal on non-web platforms.

import 'package:flutter/material.dart';
import '../theme/glacier_dawn_theme.dart';

class HeroTextReveal extends StatelessWidget {
  final bool isDesktop;

  const HeroTextReveal({super.key, required this.isDesktop});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment:
          isDesktop ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        ShaderMask(
          blendMode: BlendMode.srcIn,
          shaderCallback: (bounds) =>
              GlacierColors.accentGradient.createShader(bounds),
          child: Text(
            'Ahmed',
            style: TextStyle(
              fontSize: isDesktop ? 76 : 52,
              fontWeight: FontWeight.w900,
              letterSpacing: -1.5,
              height: 1.05,
              fontFamily: 'Roboto',
            ),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          'Real-Time AI & Gameplay Systems',
          style: TextStyle(
            fontSize: isDesktop ? 22 : 18,
            fontWeight: FontWeight.w600,
            color: GlacierColors.textSecondary,
            letterSpacing: 0.2,
            fontFamily: 'Roboto',
          ),
        ),
      ],
    );
  }
}
