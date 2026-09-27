import 'dart:math' as math;
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'package:flutter/material.dart';
import '../theme/glacier_dawn_theme.dart';

// ── Shared Resume Launcher ───────────────────────────────────────────────────
// On Flutter Web, pubspec assets are served at: assets/<path>
// e.g. assets/resume/ahmed_resume.pdf
// We use a dart:html anchor click to force the browser download dialog.

void openResume() {
  const assetPath = 'assets/resume/ahmed_resume.pdf';
  (html.AnchorElement(href: assetPath)
    ..setAttribute('download', 'Shaikh_Mohammed_Ahmed_Resume.pdf'))
  .click();
}

// ── Dot Grid Pattern Painter ──────────────────────────────────────────────────

class DotGridPattern extends StatelessWidget {
  final double spacing;
  final double dotRadius;
  final Color color;

  const DotGridPattern({
    super.key,
    this.spacing = 28.0,
    this.dotRadius = 1.2,
    this.color = const Color(0x185A87AC),
  });

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _DotGridPainter(
        spacing: spacing,
        dotRadius: dotRadius,
        color: color,
      ),
      child: const SizedBox.expand(),
    );
  }
}

class _DotGridPainter extends CustomPainter {
  final double spacing;
  final double dotRadius;
  final Color color;

  _DotGridPainter({
    required this.spacing,
    required this.dotRadius,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    for (double x = spacing / 2; x < size.width; x += spacing) {
      for (double y = spacing / 2; y < size.height; y += spacing) {
        canvas.drawCircle(Offset(x, y), dotRadius, paint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _DotGridPainter oldDelegate) =>
      oldDelegate.spacing != spacing ||
      oldDelegate.dotRadius != dotRadius ||
      oldDelegate.color != color;
}

// ── Glow Orb (Ambient gradient light blob) ────────────────────────────────────

class GlowOrb extends StatelessWidget {
  final double size;
  final Color color;
  final double opacity;

  const GlowOrb({
    super.key,
    required this.size,
    required this.color,
    this.opacity = 0.25,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors: [
            color.withOpacity(opacity),
            color.withOpacity(opacity * 0.4),
            Colors.transparent,
          ],
          stops: const [0.0, 0.5, 1.0],
        ),
      ),
    );
  }
}

// ── Constellation Orbit Badge ─────────────────────────────────────────────────

class SatelliteBadge extends StatelessWidget {
  final String label;
  final IconData icon;
  final Color accentColor;

  const SatelliteBadge({
    super.key,
    required this.label,
    required this.icon,
    required this.accentColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: GlacierColors.cardSurface.withOpacity(0.95),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: accentColor.withOpacity(0.4),
          width: 1.5,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x121C3A5E),
            blurRadius: 10,
            spreadRadius: 0,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: accentColor),
          const SizedBox(width: 5),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: GlacierColors.textPrimary,
              letterSpacing: 0.3,
            ),
          ),
        ],
      ),
    );
  }
}

// ── Dashed Orbit Ring Painter ─────────────────────────────────────────────────

class DashedOrbitRing extends StatelessWidget {
  final double diameter;
  final Color color;

  const DashedOrbitRing({
    super.key,
    required this.diameter,
    this.color = const Color(0x305A87AC),
  });

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(diameter, diameter),
      painter: _DashedCirclePainter(color: color),
    );
  }
}

class _DashedCirclePainter extends CustomPainter {
  final Color color;

  _DashedCirclePainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;

    final radius = size.width / 2;
    final center = Offset(radius, radius);
    const dashCount = 36;
    const sweep = (math.pi * 2) / dashCount;

    for (int i = 0; i < dashCount; i += 2) {
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        i * sweep,
        sweep,
        false,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _DashedCirclePainter oldDelegate) =>
      oldDelegate.color != color;
}
