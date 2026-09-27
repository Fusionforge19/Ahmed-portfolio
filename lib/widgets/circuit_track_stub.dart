// Stub implementation for non-web platforms when dart:ui_web is not available.

import 'package:flutter/material.dart';
import '../theme/glacier_dawn_theme.dart';

class CircuitTrackDivider extends StatefulWidget {
  final double height;
  final GlobalKey? sectionKey;
  final bool showLabels;

  const CircuitTrackDivider({
    super.key,
    this.height = 160.0,
    this.sectionKey,
    this.showLabels = true,
  });

  @override
  State<CircuitTrackDivider> createState() => _CircuitTrackDividerState();
}

class _CircuitTrackDividerState extends State<CircuitTrackDivider>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 5),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      key: widget.sectionKey,
      height: widget.height,
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Center(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return CustomPaint(
              size: Size(double.infinity, widget.height - 24),
              painter: _CircuitTrackPainter(progress: _controller.value),
            );
          },
        ),
      ),
    );
  }
}

class _CircuitTrackPainter extends CustomPainter {
  final double progress;

  _CircuitTrackPainter({required this.progress});

  Path _createCircuitPath(Size size) {
    final w = size.width;
    final h = size.height;
    final path = Path();

    // Responsive Bezier track approximation
    path.moveTo(w * 0.1, h * 0.54);
    path.cubicTo(w * 0.16, h * 0.54, w * 0.26, h * 0.29, w * 0.36, h * 0.29);
    path.cubicTo(w * 0.43, h * 0.29, w * 0.5, h * 0.21, w * 0.56, h * 0.33);
    path.cubicTo(w * 0.61, h * 0.41, w * 0.63, h * 0.64, w * 0.68, h * 0.68);
    path.cubicTo(w * 0.73, h * 0.72, w * 0.76, h * 0.43, w * 0.8, h * 0.37);
    path.cubicTo(w * 0.85, h * 0.31, w * 0.9, h * 0.39, w * 0.93, h * 0.54);
    path.cubicTo(w * 0.95, h * 0.66, w * 0.92, h * 0.85, w * 0.88, h * 0.89);
    path.cubicTo(w * 0.84, h * 0.93, w * 0.79, h * 0.83, w * 0.75, h * 0.77);
    path.cubicTo(w * 0.69, h * 0.68, w * 0.62, h * 0.72, w * 0.56, h * 0.83);
    path.cubicTo(w * 0.5, h * 0.93, w * 0.45, h * 0.91, w * 0.4, h * 0.77);
    path.cubicTo(w * 0.35, h * 0.62, w * 0.29, h * 0.68, w * 0.23, h * 0.81);
    path.cubicTo(w * 0.16, h * 0.93, w * 0.1, h * 0.89, w * 0.06, h * 0.75);
    path.cubicTo(w * 0.04, h * 0.62, w * 0.05, h * 0.54, w * 0.1, h * 0.54);
    path.close();

    return path;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final trackPath = _createCircuitPath(size);

    // Guide line
    final guidePaint = Paint()
      ..color = GlacierColors.accentCyan.withOpacity(0.15)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.5
      ..strokeCap = StrokeCap.round;
    canvas.drawPath(trackPath, guidePaint);

    // Animated drawing line
    final pms = trackPath.computeMetrics().toList();
    if (pms.isNotEmpty) {
      final metric = pms.first;
      final drawnLength = metric.length * progress;
      final drawnPath = metric.extractPath(0, drawnLength);

      final trackShader = const LinearGradient(
        colors: [GlacierColors.accentCyan, GlacierColors.accentViolet],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

      final activePaint = Paint()
        ..shader = trackShader
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5
        ..strokeCap = StrokeCap.round;
      canvas.drawPath(drawnPath, activePaint);

      // Car position along metric
      final tangent = metric.getTangentForOffset(drawnLength);
      if (tangent != null) {
        final pos = tangent.position;
        // Car glow
        canvas.drawCircle(
          pos,
          8,
          Paint()
            ..color = GlacierColors.accentCyan.withOpacity(0.35)
            ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6),
        );
        // Car dot
        canvas.drawCircle(
          pos,
          4,
          Paint()..color = GlacierColors.accentCyan,
        );
        canvas.drawCircle(
          pos,
          2,
          Paint()..color = Colors.white,
        );
      }
    }
  }

  @override
  bool shouldRepaint(covariant _CircuitTrackPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
