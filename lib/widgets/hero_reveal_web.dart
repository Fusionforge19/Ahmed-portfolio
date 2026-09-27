// Web implementation for HeroTextReveal using anime.js v4 splitText.
// ignore_for_file: avoid_web_libraries_in_flutter, deprecated_member_use

import 'dart:html' as html;
// ignore: uri_does_not_exist
import 'dart:ui_web' as ui;

import 'package:flutter/material.dart';

const String _kHeroRevealViewType = 'hero-text-reveal-view';
bool _heroRevealRegistered = false;

void _registerHeroRevealView() {
  if (_heroRevealRegistered) return;
  _heroRevealRegistered = true;

  // ignore: undefined_prefixed_name
  ui.platformViewRegistry.registerViewFactory(_kHeroRevealViewType, (int viewId) {
    final iframe = html.IFrameElement()
      ..src = 'assets/hero_reveal/index.html'
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%'
      ..style.backgroundColor = 'transparent'
      ..setAttribute('allowtransparency', 'true')
      ..style.pointerEvents = 'none';

    return iframe;
  });
}

class HeroTextReveal extends StatelessWidget {
  final bool isDesktop;

  const HeroTextReveal({super.key, required this.isDesktop});

  @override
  Widget build(BuildContext context) {
    _registerHeroRevealView();

    final height = isDesktop ? 130.0 : 110.0;

    return SizedBox(
      width: double.infinity,
      height: height,
      child: const RepaintBoundary(
        child: HtmlElementView(viewType: _kHeroRevealViewType),
      ),
    );
  }
}
