import 'package:flutter/material.dart';
import 'theme/glacier_dawn_theme.dart';
import 'widgets/navbar.dart';
import 'widgets/hero_section.dart';
import 'widgets/play_section.dart';
import 'widgets/terminal_section.dart';
import 'widgets/projects_section.dart';
import 'widgets/about_section.dart';
import 'widgets/connect_section.dart';
import 'widgets/circuit_track_divider.dart';
import 'widgets/scroll_reveal.dart';
import 'game_embed/game_embed.dart';

void main() {
  runApp(const PortfolioApp());
}

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ahmed — Computer Science Student',
      debugShowCheckedModeBanner: false,
      theme: buildGlacierDawnTheme(),
      home: const PortfolioHome(),
    );
  }
}

// ── Main scrollable page ──────────────────────────────────────────────────────

class PortfolioHome extends StatefulWidget {
  const PortfolioHome({super.key});

  @override
  State<PortfolioHome> createState() => _PortfolioHomeState();
}

class _PortfolioHomeState extends State<PortfolioHome> {
  final ScrollController _scrollController = ScrollController();

  // Section keys for anchor scrolling
  final Map<String, GlobalKey> _sectionKeys = {
    'hero': GlobalKey(),
    'play': GlobalKey(),
    'terminal': GlobalKey(),
    'projects': GlobalKey(),
    'about': GlobalKey(),
    'contact': GlobalKey(),
  };

  @override
  void initState() {
    super.initState();
    // Connect iframe scroll events directly to page scroll controller
    setGameScrollHandler((deltaY) {
      if (_scrollController.hasClients) {
        final target = (_scrollController.offset + deltaY).clamp(
          0.0,
          _scrollController.position.maxScrollExtent,
        );
        _scrollController.jumpTo(target);
      }
    });
  }

  void _scrollTo(String section) {
    final key = _sectionKeys[section];
    if (key?.currentContext != null) {
      Scrollable.ensureVisible(
        key!.currentContext!,
        duration: const Duration(milliseconds: 380),
        curve: Curves.easeOutCubic,
        alignment: 0.0,
      );
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlacierColors.bgTop,
      body: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: () {
          // Unfocus any active inputs (like terminal textfield) on page tap
          FocusScope.of(context).unfocus();
        },
        child: Stack(
          children: [
            // ── Background gradient — Calm Blue site-wide ──────────────────
            Positioned.fill(
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      GlacierColors.iceWhite,
                      Color(0xFFE8F1F6),
                      Color(0xFFDEEBF2),
                      Color(0xFFD6E5EE),
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    stops: [0.0, 0.25, 0.6, 1.0],
                  ),
                ),
              ),
            ),

            // ── Scrollable content ─────────────────────────────────────────────
            SingleChildScrollView(
              controller: _scrollController,
              physics: const ClampingScrollPhysics(),
              child: Column(
                children: [
                  // Spacer for navbar height
                  const SizedBox(height: 64),

                  // 1 — Hero (isolated RepaintBoundary)
                  RepaintBoundary(
                    child: HeroSection(
                      sectionKey: _sectionKeys['hero']!,
                      scrollTo: _scrollTo,
                    ),
                  ),

                  // F1 Circuit Motion Path Divider (anime.js v4)
                  const CircuitTrackDivider(),

                  // 2 — Play (isolated RepaintBoundary for embedded game)
                  ScrollReveal(
                    controller: _scrollController,
                    child: RepaintBoundary(
                      child: PlaySection(
                        sectionKey: _sectionKeys['play']!,
                      ),
                    ),
                  ),

                  const _SectionDivider(),

                  // 3 — Terminal (isolated RepaintBoundary)
                  ScrollReveal(
                    controller: _scrollController,
                    child: RepaintBoundary(
                      child: TerminalSection(
                        sectionKey: _sectionKeys['terminal']!,
                      ),
                    ),
                  ),

                  const _SectionDivider(),

                  // 4 — Projects (isolated RepaintBoundary)
                  ScrollReveal(
                    controller: _scrollController,
                    child: RepaintBoundary(
                      child: ProjectsSection(
                        sectionKey: _sectionKeys['projects']!,
                      ),
                    ),
                  ),

                  const _SectionDivider(),

                  // 5 — About (isolated RepaintBoundary)
                  ScrollReveal(
                    controller: _scrollController,
                    child: RepaintBoundary(
                      child: AboutSection(
                        sectionKey: _sectionKeys['about']!,
                      ),
                    ),
                  ),

                  const _SectionDivider(),

                  // 6 — Connect / Footer (isolated RepaintBoundary)
                  ScrollReveal(
                    controller: _scrollController,
                    child: RepaintBoundary(
                      child: ConnectSection(
                        sectionKey: _sectionKeys['contact']!,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // ── Sticky navbar overlay ──────────────────────────────────────────
            PortfolioNavbar(sectionKeys: _sectionKeys),
          ],
        ),
      ),
    );
  }
}

// ── Subtle section divider ────────────────────────────────────────────────────

class _SectionDivider extends StatelessWidget {
  const _SectionDivider();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.transparent,
            Color(0x088FB8CC),
            Color(0x128FB8CC),
            Color(0x088FB8CC),
            Colors.transparent,
          ],
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
        ),
      ),
      child: Center(
        child: Container(
          height: 1,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Colors.transparent,
                Color(0x228FB8CC),
                Color(0x3016324A),
                Color(0x228FB8CC),
                Colors.transparent,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
