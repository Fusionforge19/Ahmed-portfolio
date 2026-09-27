import 'package:flutter/material.dart';

// ─── Glacier Blue Palette ──────────────────────────────────────────────────────
//
// Primary palette:
// - Glacier Blue  #8FB8CC  — buttons, gradients, headings, icons
// - Deep Navy     #16324A  — strong text, high-contrast elements
// - Ice White     #EEF4F7  — page background (slightly cool-tinted, not pure white)
// - Slate Blue    #5D7A8C  — secondary text, borders, muted UI
// - Coral Accent  #E8A87C  — one warm CTA highlight (used sparingly)

class GlacierColors {
  GlacierColors._();

  // ── Core palette tokens ────────────────────────────────────────────────────
  static const Color glacierBlue = Color(0xFF8FB8CC);   // primary
  static const Color deepNavy    = Color(0xFF16324A);   // strong text / dark accents
  static const Color iceWhite    = Color(0xFFEEF4F7);   // page background
  static const Color slateBlue   = Color(0xFF5D7A8C);   // secondary text / borders
  static const Color coralAccent = Color(0xFFE8A87C);   // warm CTA accent (sparingly)

  // ── Aliases used across widgets ────────────────────────────────────────────
  static const Color lightBlue   = Color(0xFFB8D4E3);   // lightest surface highlight
  static const Color mutedBlue   = slateBlue;
  static const Color darkBlue    = deepNavy;
  static const Color offWhite    = Color(0xFFF5F9FB);

  // ── Backgrounds ────────────────────────────────────────────────────────────
  static const Color bgTop       = iceWhite;
  static const Color bgBottom    = Color(0xFFE3EDF3);

  // ── Surfaces & Cards ──────────────────────────────────────────────────────
  static const Color cardSurface      = Color(0xFFFFFFFF);
  static const Color cardSurfaceHover = Color(0xFFF0F6FA);
  static const Color shadowColor      = Color(0x1A16324A);

  // ── Typography ─────────────────────────────────────────────────────────────
  static const Color textPrimary   = deepNavy;            // #16324A — ~13:1 on iceWhite
  static const Color textSecondary = slateBlue;           // #5D7A8C — ~4.5:1 on iceWhite
  static const Color textMuted     = Color(0xFF7D98A8);

  // ── Terminal (intentional dark contrast panel) ──────────────────────────────
  static const Color darkPanel       = Color(0xFF0D1E2B);
  static const Color darkPanelBorder = Color(0xFF1E3B51);

  // ── Semantic aliases (legacy compat) ──────────────────────────────────────
  static const Color accentCyan   = glacierBlue;
  static const Color accentViolet = slateBlue;
  static const Color accentGreen  = Color(0xFF2E9E68);

  // ── Gradients ──────────────────────────────────────────────────────────────
  /// Primary heading / button gradient: deep navy → glacier blue
  static const LinearGradient accentGradient = LinearGradient(
    colors: [deepNavy, glacierBlue],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  /// Hero "Ahmed" heading gradient: deep navy → mid → glacier blue
  static const LinearGradient heroGradient = LinearGradient(
    colors: [deepNavy, Color(0xFF3D6E8A), glacierBlue],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Vertical variant for avatar / card accents
  static const LinearGradient accentGradientVertical = LinearGradient(
    colors: [deepNavy, glacierBlue],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  /// Page background gradient
  static const LinearGradient bgGradient = LinearGradient(
    colors: [iceWhite, Color(0xFFE3EDF3)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  // ── Shadows ─────────────────────────────────────────────────────────────────
  static List<BoxShadow> get cardShadow => const [
    BoxShadow(color: Color(0x1216324A), blurRadius: 16, offset: Offset(0, 4)),
    BoxShadow(color: Color(0x0A16324A), blurRadius: 2, offset: Offset(0, 1)),
  ];

  static List<BoxShadow> get buttonShadow => const [
    BoxShadow(color: Color(0x288FB8CC), blurRadius: 14, offset: Offset(0, 4)),
  ];

  static List<BoxShadow> get coralButtonShadow => const [
    BoxShadow(color: Color(0x30E8A87C), blurRadius: 14, offset: Offset(0, 4)),
  ];
}

// ─── ThemeData ────────────────────────────────────────────────────────────────

ThemeData buildGlacierDawnTheme() {
  return ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: const ColorScheme.light(
      primary: GlacierColors.glacierBlue,
      secondary: GlacierColors.slateBlue,
      surface: GlacierColors.cardSurface,
      onPrimary: GlacierColors.offWhite,
      onSurface: GlacierColors.textPrimary,
    ),
    scaffoldBackgroundColor: GlacierColors.bgTop,
    textTheme: const TextTheme(
      displayLarge: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 56,
        fontWeight: FontWeight.w700,
        color: GlacierColors.textPrimary,
        height: 1.15,
      ),
      displayMedium: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 40,
        fontWeight: FontWeight.w700,
        color: GlacierColors.textPrimary,
        height: 1.2,
      ),
      displaySmall: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 28,
        fontWeight: FontWeight.w600,
        color: GlacierColors.textPrimary,
        height: 1.3,
      ),
      headlineMedium: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: GlacierColors.textPrimary,
        height: 1.4,
      ),
      bodyLarge: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: GlacierColors.textPrimary,
        height: 1.6,
      ),
      bodyMedium: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: GlacierColors.textSecondary,
        height: 1.6,
      ),
      labelMedium: TextStyle(
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: GlacierColors.textSecondary,
        letterSpacing: 0.6,
      ),
    ),
    cardTheme: const CardThemeData(
      color: GlacierColors.cardSurface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(16)),
        side: BorderSide(color: Color(0x1A8FB8CC), width: 1),
      ),
      shadowColor: GlacierColors.shadowColor,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: GlacierColors.deepNavy,
        foregroundColor: GlacierColors.offWhite,
        padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(12)),
        ),
        elevation: 0,
      ),
    ),
  );
}
