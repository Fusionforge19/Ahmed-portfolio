// Reusable CircuitTrackDivider component using anime.js v4 on Web,
// with conditional fallback on other platforms.
export 'circuit_track_stub.dart'
    if (dart.library.ui_web) 'circuit_track_web.dart';
