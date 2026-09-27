// Web-specific implementation for CircuitTrackDivider using anime.js v4.
// ignore_for_file: avoid_web_libraries_in_flutter, deprecated_member_use

import 'dart:html' as html;
// ignore: uri_does_not_exist
import 'dart:ui_web' as ui;

import 'package:flutter/material.dart';

const String _kCircuitTrackViewType = 'circuit-motion-path-view';
bool _circuitTrackRegistered = false;

void _registerCircuitTrackView() {
  if (_circuitTrackRegistered) return;
  _circuitTrackRegistered = true;

  // ignore: undefined_prefixed_name
  ui.platformViewRegistry.registerViewFactory(_kCircuitTrackViewType, (int viewId) {
    final iframe = html.IFrameElement()
      ..src = 'motion_track/index.html'
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%'
      ..style.backgroundColor = 'transparent'
      ..setAttribute('allowtransparency', 'true')
      ..style.pointerEvents = 'none';

    return iframe;
  });
}

class CircuitTrackDivider extends StatelessWidget {
  final double height;
  final GlobalKey? sectionKey;
  final bool showLabels;

  const CircuitTrackDivider({
    super.key,
    this.height = 170.0,
    this.sectionKey,
    this.showLabels = true,
  });

  @override
  Widget build(BuildContext context) {
    _registerCircuitTrackView();

    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 700;
    final effectiveHeight = isMobile ? (height * 0.75).clamp(110.0, 140.0) : height;

    return Container(
      key: sectionKey,
      width: double.infinity,
      height: effectiveHeight,
      margin: const EdgeInsets.symmetric(vertical: 4),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background subtle linear gradient line
          Positioned(
            left: 0,
            right: 0,
            top: effectiveHeight / 2,
            child: Container(
              height: 1,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.transparent,
                    Color(0x205A87AC),
                    Color(0x351C3A5E),
                    Color(0x205A87AC),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),

          // Platform view iframe rendering anime.js v4 SVG motion path
          SizedBox(
            width: double.infinity,
            height: effectiveHeight,
            child: const RepaintBoundary(
              child: HtmlElementView(viewType: _kCircuitTrackViewType),
            ),
          ),
        ],
      ),
    );
  }
}
