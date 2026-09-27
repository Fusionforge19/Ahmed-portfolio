import 'package:flutter/material.dart';
import '../theme/glacier_dawn_theme.dart';
import 'maximalist_decorations.dart';

class TerminalSection extends StatefulWidget {
  final GlobalKey sectionKey;

  const TerminalSection({super.key, required this.sectionKey});

  @override
  State<TerminalSection> createState() => _TerminalSectionState();
}

class _TerminalSectionState extends State<TerminalSection> {
  final TextEditingController _inputCtrl = TextEditingController();
  final ScrollController _scrollCtrl = ScrollController();
  final FocusNode _focusNode = FocusNode();

  final List<_TerminalEntry> _entries = [
    const _TerminalEntry(
      prompt: null,
      output:
          'Welcome to Ahmed\'s portfolio terminal.\nType `help` to get started.',
      isSystem: true,
    ),
  ];

  @override
  void dispose() {
    _inputCtrl.dispose();
    _scrollCtrl.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _handleCommand(String raw) {
    final cmd = raw.trim().toLowerCase();
    if (cmd.isEmpty) return;

    final String output;

    switch (cmd) {
      case 'help':
        output =
            'Available commands:\n  about      — Who I am & background\n  projects   — List flagship projects\n  skills     — Core tech & engine skills\n  contact    — How to reach me\n  play       — Jump to Gate Dive arcade game\n  ls         — List virtual workspace files\n  whoami     — Current shell user\n  clear      — Clear the terminal\n  help       — Show this message';
        break;
      case 'about':
        output =
            'Ahmed — Computer Science Engineering Student & Unreal Engine / C++ Developer.\n'
            'Building interactive experiences, gameplay mechanics, and real-time AI systems.';
        break;
      case 'projects':
        output =
            'Featured Projects:\n  1. Artisan Fabric Marketplace MVP — Full-stack web app\n  2. WebScout — Autonomous AI research agent\n  3. MoodMap — AI mood companion with song matching\n  4. Developer Portfolio — Unreal Engine & C++ showcase\n  5. Gate Dive — WebGL speed-runner game (play above!)\n\n→ Type `contact` or scroll to Projects section for details.';
        break;
      case 'skills':
        output =
            'Tech Stack:\n  • Languages : C++, Python, Dart, JavaScript/TypeScript, SQL\n  • Engines   : Unreal Engine 5 (C++ & Blueprints), WebGL\n  • Systems   : Gameplay mechanics, State Machines, Git, AI Agents';
        break;
      case 'contact':
        output =
            'Get in touch:\n  GitHub   → https://github.com/Fusionforge19\n  LinkedIn → https://www.linkedin.com/in/ahmed-shaikh-511499316/\n  Email    → mahmed9869@gmail.com';
        break;
      case 'play':
      case 'game':
        output = '⚡ Launching Gate Dive... Scroll up to the PLAY section to jump in!';
        break;
      case 'ls':
      case 'dir':
        output = 'about.txt   projects/   skills.json   contact.sh   gate_dive.exe   resume.pdf';
        break;
      case 'pwd':
        output = '/home/ahmed/portfolio';
        break;
      case 'whoami':
        output = 'ahmed (game-developer, cs-engineer, f1-racing-enthusiast)';
        break;
      case 'sudo':
        output = 'ahmed is not in the sudoers file. This incident will be reported to Gabe Newell.';
        break;
      case 'clear':
        setState(() => _entries.clear());
        _inputCtrl.clear();
        _focusNode.requestFocus();
        return;
      default:
        output = 'command not found: $cmd. Type \'help\' for available commands.';
    }

    setState(() {
      _entries.add(_TerminalEntry(prompt: raw, output: output));
    });
    _inputCtrl.clear();
    _focusNode.requestFocus();

    // Scroll to bottom after render
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollCtrl.hasClients) {
        _scrollCtrl.animateTo(
          _scrollCtrl.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;
    final hPad = isDesktop ? 80.0 : 24.0;
    final vPad = isDesktop ? 80.0 : 48.0;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        // Background decoration
        const Positioned.fill(
          child: DotGridPattern(
            spacing: 34,
            dotRadius: 1.0,
            color: Color(0x125A87AC),
          ),
        ),
        const Positioned(
          top: -60,
          left: -60,
          child: GlowOrb(
            size: 450,
            color: GlacierColors.lightBlue,
            opacity: 0.30,
          ),
        ),
        const Positioned(
          bottom: -40,
          right: -60,
          child: GlowOrb(
            size: 380,
            color: GlacierColors.mutedBlue,
            opacity: 0.18,
          ),
        ),
        // Content
        Container(
          key: widget.sectionKey,
          padding: EdgeInsets.symmetric(horizontal: hPad, vertical: vPad),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Eyebrow
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                decoration: BoxDecoration(
                  color: GlacierColors.accentCyan.withOpacity(0.10),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: GlacierColors.accentCyan.withOpacity(0.30),
                    width: 1,
                  ),
                ),
                child: const Text(
                  '💻  INTERACTIVE SHELL',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: GlacierColors.accentCyan,
                    letterSpacing: 1.8,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const _GradientSectionHeading(text: 'Interactive Terminal'),
              const SizedBox(height: 12),
              Text(
                'Explore my portfolio the developer way. Type `help` to get started.',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: GlacierColors.textSecondary,
                      height: 1.6,
                    ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),

              // Terminal panel
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 860),
                  child: _buildTerminalPanel(context),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTerminalPanel(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => _focusNode.requestFocus(),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            colors: [GlacierColors.accentCyan, GlacierColors.accentViolet],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          boxShadow: [
            BoxShadow(
              color: GlacierColors.accentCyan.withOpacity(0.20),
              blurRadius: 40,
              spreadRadius: 2,
            ),
            BoxShadow(
              color: GlacierColors.accentViolet.withOpacity(0.15),
              blurRadius: 60,
            ),
          ],
        ),
        padding: const EdgeInsets.all(2),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(18),
          child: Container(
            color: GlacierColors.darkPanel,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Window chrome
                const _TerminalTitleBar(),
                // Output area
                SizedBox(
                  height: 320,
                  child: ListView.builder(
                    controller: _scrollCtrl,
                    padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
                    itemCount: _entries.length,
                    itemBuilder: (_, i) => _TerminalEntryWidget(
                      entry: _entries[i],
                    ),
                  ),
                ),
                // Quick command shortcut chips bar
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
                  decoration: const BoxDecoration(
                    color: Color(0xFF0C111E),
                    border: Border(
                      top: BorderSide(color: GlacierColors.darkPanelBorder, width: 1),
                      bottom: BorderSide(color: GlacierColors.darkPanelBorder, width: 1),
                    ),
                  ),
                  child: Row(
                    children: [
                      const Text(
                        'QUICK: ',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF64748B),
                          letterSpacing: 1.0,
                        ),
                      ),
                      Expanded(
                        child: SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Row(
                            children: [
                              _quickChip('help'),
                              const SizedBox(width: 6),
                              _quickChip('about'),
                              const SizedBox(width: 6),
                              _quickChip('projects'),
                              const SizedBox(width: 6),
                              _quickChip('skills'),
                              const SizedBox(width: 6),
                              _quickChip('contact'),
                              const SizedBox(width: 6),
                              _quickChip('play'),
                              const SizedBox(width: 6),
                              _quickChip('clear'),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                // Input row
                _buildInputRow(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _quickChip(String cmd) {
    return InkWell(
      onTap: () => _handleCommand(cmd),
      borderRadius: BorderRadius.circular(6),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
        decoration: BoxDecoration(
          color: const Color(0xFF141B2D),
          borderRadius: BorderRadius.circular(6),
          border: Border.all(
            color: GlacierColors.accentCyan.withOpacity(0.35),
            width: 1,
          ),
        ),
        child: Text(
          cmd,
          style: const TextStyle(
            fontFamily: 'monospace',
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: GlacierColors.accentCyan,
          ),
        ),
      ),
    );
  }

  Widget _buildInputRow() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(18, 10, 18, 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ShaderMask(
            blendMode: BlendMode.srcIn,
            shaderCallback: (bounds) =>
                GlacierColors.accentGradient.createShader(bounds),
            child: const Text(
              'ahmed@portfolio:~\$',
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: TextField(
              controller: _inputCtrl,
              focusNode: _focusNode,
              keyboardType: TextInputType.text,
              textInputAction: TextInputAction.send,
              style: const TextStyle(
                fontFamily: 'monospace',
                fontSize: 13,
                color: Color(0xFFE2F0FF),
              ),
              cursorColor: GlacierColors.accentCyan,
              decoration: const InputDecoration(
                border: InputBorder.none,
                isDense: true,
                contentPadding: EdgeInsets.symmetric(vertical: 4),
                hintText: 'type a command (e.g. help, projects, skills)...',
                hintStyle: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: Color(0xFF475569),
                ),
              ),
              onSubmitted: _handleCommand,
            ),
          ),
          const SizedBox(width: 8),
          InkWell(
            onTap: () => _handleCommand(_inputCtrl.text),
            borderRadius: BorderRadius.circular(6),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: GlacierColors.accentCyan.withOpacity(0.18),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: GlacierColors.accentCyan.withOpacity(0.5)),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'RUN',
                    style: TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: GlacierColors.accentCyan,
                      letterSpacing: 1.2,
                    ),
                  ),
                  SizedBox(width: 4),
                  Icon(Icons.keyboard_return_rounded, size: 12, color: GlacierColors.accentCyan),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Terminal title bar ────────────────────────────────────────────────────────

class _TerminalTitleBar extends StatelessWidget {
  const _TerminalTitleBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: const BoxDecoration(
        color: Color(0xFF111827),
        borderRadius: BorderRadius.vertical(top: Radius.circular(18)),
      ),
      child: Row(
        children: [
          _dot(const Color(0xFFFF5F57)),
          const SizedBox(width: 6),
          _dot(const Color(0xFFFFBD2E)),
          const SizedBox(width: 6),
          _dot(const Color(0xFF28CA41)),
          const SizedBox(width: 16),
          const Text(
            'ahmed@portfolio — bash',
            style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 12,
              color: Color(0xFF5A6A85),
            ),
          ),
        ],
      ),
    );
  }

  Widget _dot(Color color) {
    return Container(
      width: 12,
      height: 12,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}

// ── Terminal entry widget ─────────────────────────────────────────────────────

class _TerminalEntry {
  final String? prompt;
  final String output;
  final bool isSystem;

  const _TerminalEntry({
    this.prompt,
    required this.output,
    this.isSystem = false,
  });
}

class _TerminalEntryWidget extends StatelessWidget {
  final _TerminalEntry entry;

  const _TerminalEntryWidget({required this.entry});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (entry.prompt != null)
            Row(
              children: [
                ShaderMask(
                  blendMode: BlendMode.srcIn,
                  shaderCallback: (bounds) =>
                      GlacierColors.accentGradient.createShader(bounds),
                  child: const Text(
                    'ahmed@portfolio:~\$ ',
                    style: TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Text(
                  entry.prompt!,
                  style: const TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 13,
                    color: Color(0xFFE2F0FF),
                  ),
                ),
              ],
            ),
          const SizedBox(height: 2),
          Text(
            entry.output,
            style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 13,
              color: entry.isSystem
                  ? const Color(0xFF7ABFFF)
                  : const Color(0xFFA8C0D8),
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}

// ── Shared gradient heading ───────────────────────────────────────────────────

class _GradientSectionHeading extends StatelessWidget {
  final String text;

  const _GradientSectionHeading({required this.text});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) =>
          GlacierColors.accentGradient.createShader(bounds),
      child: Text(
        text,
        style: Theme.of(context).textTheme.displaySmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
