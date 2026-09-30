import 'package:flutter/material.dart';

/// A scroll-triggered entrance animation widget.
/// 
/// As sections or cards enter the viewport, it triggers:
/// 1. Fade in (opacity: 0.0 -> 1.0)
/// 2. Slide up (translateY: 40px -> 0px)
/// 3. Subtle scale (0.95 -> 1.0)
/// 4. Staggered timing (configurable delayMs)
class ScrollReveal extends StatefulWidget {
  final Widget child;
  final ScrollController? controller;
  final int delayMs;
  final double slideOffset;
  final double initialScale;
  final Duration duration;

  const ScrollReveal({
    super.key,
    required this.child,
    this.controller,
    this.delayMs = 0,
    this.slideOffset = 40.0,
    this.initialScale = 0.95,
    this.duration = const Duration(milliseconds: 600),
  });

  @override
  State<ScrollReveal> createState() => _ScrollRevealState();
}

class _ScrollRevealState extends State<ScrollReveal>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _opacityAnim;
  late final Animation<Offset> _slideAnim;
  late final Animation<double> _scaleAnim;

  bool _hasRevealed = false;

  @override
  void initState() {
    super.initState();

    _animController = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    final curved = CurvedAnimation(
      parent: _animController,
      curve: Curves.easeOutCubic,
    );

    _opacityAnim = Tween<double>(begin: 0.0, end: 1.0).animate(curved);
    _slideAnim = Tween<Offset>(
      begin: Offset(0, widget.slideOffset),
      end: Offset.zero,
    ).animate(curved);
    _scaleAnim = Tween<double>(
      begin: widget.initialScale,
      end: 1.0,
    ).animate(curved);

    widget.controller?.addListener(_onScroll);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _checkVisibility();
    });
  }

  void _onScroll() {
    if (!_hasRevealed) {
      _checkVisibility();
    }
  }

  void _checkVisibility() {
    if (!mounted || _hasRevealed) return;

    final renderBox = context.findRenderObject() as RenderBox?;
    if (renderBox != null && renderBox.hasSize) {
      final position = renderBox.localToGlobal(Offset.zero);
      final screenHeight = MediaQuery.of(context).size.height;

      if (position.dy < screenHeight - 30) {
        _hasRevealed = true;
        widget.controller?.removeListener(_onScroll);
        if (widget.delayMs > 0) {
          Future.delayed(Duration(milliseconds: widget.delayMs), () {
            if (mounted) _animController.forward();
          });
        } else {
          _animController.forward();
        }
      }
    }
  }

  @override
  void dispose() {
    widget.controller?.removeListener(_onScroll);
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animController,
      builder: (context, child) {
        return Opacity(
          opacity: _opacityAnim.value,
          child: Transform.translate(
            offset: _slideAnim.value,
            child: Transform.scale(
              scale: _scaleAnim.value,
              child: child,
            ),
          ),
        );
      },
      child: widget.child,
    );
  }
}
