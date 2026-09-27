// Web-specific implementation using dart:ui_web and dart:html.
// This file is only compiled on web targets.

// ignore: avoid_web_libraries_in_flutter, deprecated_member_use
import 'dart:html' as html;
// ignore: uri_does_not_exist
import 'dart:ui_web' as ui;

import 'package:flutter/material.dart';

const String _kViewType = 'game-iframe-view';
bool _registered = false;
void Function(double deltaY)? _scrollHandler;

void setGameScrollHandler(void Function(double deltaY) handler) {
  _scrollHandler = handler;
}

void registerGameView() {
  if (_registered) return;
  _registered = true;

  // Listen to wheel/scroll messages from the game iframe
  html.window.onMessage.listen((event) {
    if (event.data is Map) {
      final data = event.data as Map;
      if (data['type'] == 'PORTFOLIO_SCROLL') {
        final deltaY = (data['deltaY'] as num?)?.toDouble() ?? 0.0;
        if (_scrollHandler != null && deltaY != 0.0) {
          _scrollHandler!(deltaY);
        }
      }
    }
  });

  // Register the platform view factory once.
  // ignore: undefined_prefixed_name
  ui.platformViewRegistry.registerViewFactory(_kViewType, (int viewId) {
    final iframe = html.IFrameElement()
      ..src = 'assets/assets/game/index.html'
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%'
      ..allow = 'autoplay'
      ..setAttribute('allowfullscreen', '');
    return iframe;
  });
}

Widget buildGameEmbed() {
  registerGameView();
  return const RepaintBoundary(
    child: HtmlElementView(viewType: _kViewType),
  );
}
