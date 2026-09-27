// This is the stub implementation for non-web platforms.
// It is used when dart:ui_web is not available.

import 'package:flutter/material.dart';

Widget buildGameEmbed() {
  return Container(
    height: 400,
    alignment: Alignment.center,
    child: const Text(
      'Play on the web version to experience the game.',
      style: TextStyle(
        color: Colors.white60,
        fontFamily: 'monospace',
        fontSize: 14,
      ),
      textAlign: TextAlign.center,
    ),
  );
}

void registerGameView() {
  // No-op on non-web platforms.
}

void setGameScrollHandler(void Function(double deltaY) handler) {
  // No-op on non-web platforms.
}
