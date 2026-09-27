// Reusable HeroTextReveal component using anime.js v4 splitText on Web,
// with conditional fallback on other platforms.
export 'hero_reveal_stub.dart'
    if (dart.library.ui_web) 'hero_reveal_web.dart';
