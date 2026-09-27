// Flutter port of the React Bits BorderGlow component.
//
// Faithfully reproduces the three visual layers from the original CSS:
//   1. Outer edge-light - directional glow ring beyond the card border.
//   2. Mesh-gradient border - colored border masked to a conic cone toward cursor.
//   3. Soft fill - subtle mesh glow bleeding inward from the nearest edge.
//
// All proximity / angle math is ported 1-to-1 from the original JS helpers.

import 'dart:math' as math;
import 'package:flutter/material.dart';

// -- Public widget -------------------------------------------------------------

class BorderGlowWrapper extends StatefulWidget {
  final Widget child;

  /// Background color of the card (matches `backgroundColor` prop).
  final Color backgroundColor;

  /// Primary glow color for the outer ring (matches `glowColor` prop).
  final Color glowColor;

  /// Three-stop gradient colors for the mesh border (matches `colors` prop).
  final List<Color> colors;

  /// Corner radius in logical pixels (matches `borderRadius` prop).
  final double borderRadius;

  /// How far the outer glow extends beyond the card in logical pixels (matches `glowRadius`).
  final double glowRadius;

  /// Multiplier for glow opacity 0.1-3.0 (matches `glowIntensity` prop).
  final double glowIntensity;

  /// Threshold [0-100] for when glow begins to appear (matches `edgeSensitivity` prop).
  final double edgeSensitivity;

  /// Width of the directional cone, 5-45 (matches `coneSpread` prop).
  final double coneSpread;

  const BorderGlowWrapper({
    super.key,
    required this.child,
    this.backgroundColor = const Color(0xFFFFFFFF),
    this.glowColor = const Color(0xFF5A87AC),
    this.colors = const [Color(0xFFAED4E8), Color(0xFF5A87AC), Color(0xFF1C3A5E)],
    this.borderRadius = 16,
    this.glowRadius = 24,
    this.glowIntensity = 0.8,
    this.edgeSensitivity = 30,
    this.coneSpread = 25,
  });

  @override
  State<BorderGlowWrapper> createState() => _BorderGlowWrapperState();
}

class _BorderGlowWrapperState extends State<BorderGlowWrapper>
    with SingleTickerProviderStateMixin {
  late final AnimationController _fadeCtrl;
  late final Animation<double> _fade;

  double _edgeProx = 0.0;
  double _angleDeg = 45.0;

  @override
  void initState() {
    super.initState();
    _fadeCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 250),
      reverseDuration: const Duration(milliseconds: 750),
    );
    _fade = CurvedAnimation(
      parent: _fadeCtrl,
      curve: Curves.easeOut,
      reverseCurve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _fadeCtrl.dispose();
    super.dispose();
  }

  double _getEdgeProximity(Size size, Offset local) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final dx = local.dx - cx;
    final dy = local.dy - cy;
    final kx = dx != 0 ? cx / dx.abs() : double.infinity;
    final ky = dy != 0 ? cy / dy.abs() : double.infinity;
    return (1 / math.min(kx, ky)).clamp(0.0, 1.0);
  }

  double _getCursorAngle(Size size, Offset local) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final dx = local.dx - cx;
    final dy = local.dy - cy;
    if (dx == 0 && dy == 0) return 0;
    double deg = math.atan2(dy, dx) * (180 / math.pi) + 90;
    if (deg < 0) deg += 360;
    return deg;
  }

  void _onPointerMove(PointerEvent event) {
    final box = context.findRenderObject() as RenderBox?;
    if (box == null) return;
    final local = box.globalToLocal(event.position);
    final size = box.size;
    setState(() {
      _edgeProx = _getEdgeProximity(size, local);
      _angleDeg = _getCursorAngle(size, local);
    });
  }

  void _onEnter(PointerEvent _) => _fadeCtrl.forward();
  void _onExit(PointerEvent _) {
    setState(() => _edgeProx = 0);
    _fadeCtrl.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerMove: _onPointerMove,
      child: MouseRegion(
        onEnter: _onEnter,
        onExit: _onExit,
        child: AnimatedBuilder(
          animation: _fade,
          builder: (context, child) => CustomPaint(
            painter: _BorderGlowPainter(
              edgeProx: _edgeProx,
              angleDeg: _angleDeg,
              fadeT: _fade.value,
              glowColor: widget.glowColor,
              colors: widget.colors,
              borderRadius: widget.borderRadius,
              glowRadius: widget.glowRadius,
              glowIntensity: widget.glowIntensity,
              edgeSensitivity: widget.edgeSensitivity / 100.0,
              coneHalfDeg: widget.coneSpread,
            ),
            child: child,
          ),
          child: Container(
            decoration: BoxDecoration(
              color: widget.backgroundColor,
              borderRadius: BorderRadius.circular(widget.borderRadius),
              border: Border.all(
                color: Colors.white.withOpacity(0.10),
                width: 1,
              ),
              boxShadow: const [
                BoxShadow(color: Color(0x19000000), blurRadius: 8, offset: Offset(0, 2)),
                BoxShadow(color: Color(0x19000000), blurRadius: 32, offset: Offset(0, 8)),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(math.max(0, widget.borderRadius - 1)),
              child: widget.child,
            ),
          ),
        ),
      ),
    );
  }
}

// -- Painter -------------------------------------------------------------------

class _BorderGlowPainter extends CustomPainter {
  final double edgeProx;
  final double angleDeg;
  final double fadeT;
  final Color glowColor;
  final List<Color> colors;
  final double borderRadius;
  final double glowRadius;
  final double glowIntensity;
  final double edgeSensitivity;
  final double coneHalfDeg;

  const _BorderGlowPainter({
    required this.edgeProx,
    required this.angleDeg,
    required this.fadeT,
    required this.glowColor,
    required this.colors,
    required this.borderRadius,
    required this.glowRadius,
    required this.glowIntensity,
    required this.edgeSensitivity,
    required this.coneHalfDeg,
  });

  Color get _c0 => colors.isNotEmpty ? colors[0] : glowColor;
  Color get _c1 => colors.length > 1 ? colors[1] : glowColor;
  Color get _c2 => colors.length > 2 ? colors[2] : glowColor;

  double _edgeOpacity(double sensitivity) {
    if (edgeProx <= sensitivity) return 0;
    return ((edgeProx - sensitivity) / math.max(0.001, 1 - sensitivity))
        .clamp(0.0, 1.0) *
        fadeT;
  }

  @override
  void paint(Canvas canvas, Size size) {
    if (fadeT == 0) return;

    final rect = Offset.zero & size;
    final rRect = RRect.fromRectAndRadius(rect, Radius.circular(borderRadius));
    // Standard math angle: 0 == right, CCW positive. CSS atan2+90 matches this convention.
    final angleRad = (angleDeg - 90) * math.pi / 180;

    _paintOuterGlow(canvas, size, rRect, angleRad);
    _paintGradientBorder(canvas, size, rect, rRect, angleRad);
    _paintFillBleed(canvas, size, rRect, angleRad);
  }

  void _paintOuterGlow(Canvas canvas, Size size, RRect rRect, double angleRad) {
    final t = _edgeOpacity(edgeSensitivity);
    if (t <= 0) return;

    final eff = (glowIntensity * t).clamp(0.0, 1.0);
    final coneRad = coneHalfDeg * math.pi / 180;
    final rect = Offset.zero & size;

    // Multi-pass blur to replicate the 7-layer box-shadow in CSS
    final blurPasses = [
      (0.85, 1.5),
      (0.55, 3.0),
      (0.40, 7.0),
      (0.25, 14.0),
      (0.15, 22.0),
      (0.08, 36.0),
    ];

    for (final (opF, blur) in blurPasses) {
      final p = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = blur < 5 ? 1.5 : 2.0
        ..maskFilter = MaskFilter.blur(BlurStyle.normal, blur)
        ..shader = SweepGradient(
          center: Alignment.center,
          startAngle: angleRad - coneRad,
          endAngle: angleRad + coneRad,
          colors: [
            Colors.transparent,
            glowColor.withOpacity(eff * opF),
            glowColor.withOpacity(eff * opF),
            Colors.transparent,
          ],
          stops: const [0.0, 0.1, 0.9, 1.0],
          tileMode: TileMode.clamp,
        ).createShader(rect);
      canvas.drawRRect(rRect, p);
    }

    // Crisp bright edge line
    final edgePaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2
      ..shader = SweepGradient(
        center: Alignment.center,
        startAngle: angleRad - coneRad * 1.3,
        endAngle: angleRad + coneRad * 1.3,
        colors: [
          Colors.transparent,
          glowColor.withOpacity(eff * 0.90),
          glowColor.withOpacity(eff),
          glowColor.withOpacity(eff * 0.90),
          Colors.transparent,
        ],
        stops: const [0.0, 0.15, 0.5, 0.85, 1.0],
        tileMode: TileMode.clamp,
      ).createShader(rect);
    canvas.drawRRect(rRect, edgePaint);
  }

  void _paintGradientBorder(
      Canvas canvas, Size size, Rect rect, RRect rRect, double angleRad) {
    final colorSens = (edgeSensitivity + 0.20).clamp(0.0, 0.95);
    final t = _edgeOpacity(colorSens);
    if (t <= 0) return;

    final coneRad = coneHalfDeg * math.pi / 180;

    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5
      ..shader = SweepGradient(
        center: Alignment.center,
        startAngle: angleRad - coneRad * 1.6,
        endAngle: angleRad + coneRad * 1.6,
        colors: [
          Colors.transparent,
          _c0.withOpacity(t * 0.85),
          _c1.withOpacity(t),
          _c2.withOpacity(t * 0.85),
          Colors.transparent,
        ],
        stops: const [0.0, 0.2, 0.5, 0.8, 1.0],
        tileMode: TileMode.clamp,
      ).createShader(rect);

    canvas.drawRRect(rRect, paint);
  }

  void _paintFillBleed(Canvas canvas, Size size, RRect rRect, double angleRad) {
    final colorSens = (edgeSensitivity + 0.20).clamp(0.0, 0.95);
    final t = _edgeOpacity(colorSens) * 0.20;
    if (t <= 0) return;

    final alignX = (math.cos(angleRad)).clamp(-0.9, 0.9);
    final alignY = (math.sin(angleRad)).clamp(-0.9, 0.9);

    final fillPaint = Paint()
      ..blendMode = BlendMode.srcOver
      ..shader = RadialGradient(
        center: Alignment(alignX, alignY),
        radius: 0.9,
        colors: [_c1.withOpacity(t), Colors.transparent],
      ).createShader(Offset.zero & size);

    canvas.save();
    canvas.clipRRect(rRect);
    canvas.drawRect(Offset.zero & size, fillPaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(_BorderGlowPainter old) =>
      old.edgeProx != edgeProx ||
      old.angleDeg != angleDeg ||
      old.fadeT != fadeT;
}
