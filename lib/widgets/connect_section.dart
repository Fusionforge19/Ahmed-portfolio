import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/glacier_dawn_theme.dart';

class ConnectSection extends StatefulWidget {
  final GlobalKey sectionKey;

  const ConnectSection({super.key, required this.sectionKey});

  @override
  State<ConnectSection> createState() => _ConnectSectionState();
}

class _ConnectSectionState extends State<ConnectSection> {
  final _nameController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _nameController.dispose();
    _subjectController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  void _handleSendEmail({bool useGmail = true}) {
    final message = _messageController.text.trim();
    if (message.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter a message before sending.'),
          backgroundColor: Color(0xFFC24127),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    final name = _nameController.text.trim();
    final subject = _subjectController.text.trim().isEmpty
        ? 'Project Inquiry'
        : _subjectController.text.trim();
    final sender = name.isEmpty ? 'Portfolio Visitor' : name;
    final emailBody = '$message\n\n---\nFrom: $sender';

    final gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
        '&to=Mahmed9869@gmail.com'
        '&su=${Uri.encodeComponent(subject)}'
        '&body=${Uri.encodeComponent(emailBody)}';

    final mailtoUrl = 'mailto:Mahmed9869@gmail.com'
        '?subject=${Uri.encodeComponent(subject)}'
        '&body=${Uri.encodeComponent(emailBody)}';

    if (useGmail) {
      // Synchronous launch without awaiting canLaunchUrl to preserve browser user activation
      launchUrl(Uri.parse(gmailUrl), mode: LaunchMode.externalApplication);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Opening Gmail compose with your message...'),
          backgroundColor: GlacierColors.textPrimary,
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 4),
          action: SnackBarAction(
            label: 'Use Mail App',
            textColor: const Color(0xFFC24127),
            onPressed: () {
              launchUrl(
                Uri.parse(mailtoUrl),
                mode: LaunchMode.externalApplication,
              );
            },
          ),
        ),
      );
    } else {
      launchUrl(Uri.parse(mailtoUrl), mode: LaunchMode.externalApplication);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Opening your default mail app...'),
          backgroundColor: GlacierColors.textPrimary,
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 4),
          action: SnackBarAction(
            label: 'Open Gmail',
            textColor: const Color(0xFFC24127),
            onPressed: () {
              launchUrl(
                Uri.parse(gmailUrl),
                mode: LaunchMode.externalApplication,
              );
            },
          ),
        ),
      );
    }
  }

  void _handleCopyMessage() {
    final message = _messageController.text.trim();
    final name = _nameController.text.trim();
    final subject = _subjectController.text.trim().isEmpty
        ? 'Project Inquiry'
        : _subjectController.text.trim();
    final sender = name.isEmpty ? 'Portfolio Visitor' : name;
    final fullText =
        'To: Mahmed9869@gmail.com\nSubject: $subject\n\n$message\n\nFrom: $sender';

    Clipboard.setData(ClipboardData(text: fullText));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Message copied to clipboard! (Mahmed9869@gmail.com)'),
        backgroundColor: GlacierColors.textPrimary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;
    final hPad = isDesktop ? 64.0 : 24.0;
    final vPad = isDesktop ? 96.0 : 64.0;

    return Container(
      key: widget.sectionKey,
      width: double.infinity,
      color: Colors.transparent,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1200),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: hPad, vertical: vPad),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (isDesktop)
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Left Column: Info & Links
                      Expanded(
                        flex: 11,
                        child: _buildInfoColumn(isDesktop: true),
                      ),
                      const SizedBox(width: 72),
                      // Right Column: Contact Form
                      Expanded(
                        flex: 9,
                        child: _buildFormColumn(),
                      ),
                    ],
                  )
                else
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildInfoColumn(isDesktop: false),
                      const SizedBox(height: 56),
                      _buildFormColumn(),
                    ],
                  ),

                const SizedBox(height: 80),

                // Divider and subtle footer
                Container(
                  height: 1,
                  color: const Color(0x288FB8CC),
                ),
                const SizedBox(height: 28),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Ahmed',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: GlacierColors.textPrimary,
                        letterSpacing: -0.2,
                      ),
                    ),
                    Text(
                      '© 2026. Built with Flutter.',
                      style: TextStyle(
                        fontSize: 12,
                        color: GlacierColors.textSecondary.withOpacity(0.7),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInfoColumn({required bool isDesktop}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Main Heading
        Text(
          'Want to talk about a project?',
          style: TextStyle(
            fontFamily: 'Playfair Display',
            fontFamilyFallback: const ['Georgia', 'Cambria', 'serif'],
            fontSize: isDesktop ? 50 : 34,
            fontWeight: FontWeight.w700,
            color: GlacierColors.textPrimary,
            height: 1.15,
            letterSpacing: -0.6,
          ),
        ),
        const SizedBox(height: 18),

        // Subtitle
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: const Text(
            'Email is best. GitHub, LinkedIn, and Itch.io are below too.',
            style: TextStyle(
              fontSize: 16,
              height: 1.6,
              color: GlacierColors.textSecondary,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
        const SizedBox(height: 40),

        // Links List (Minimalist Table Format)
        Container(
          decoration: const BoxDecoration(
            border: Border(
              top: BorderSide(color: Color(0x288FB8CC), width: 1),
            ),
          ),
          child: const Column(
            children: [
              _ContactLinkRow(
                label: 'Email',
                value: 'Mahmed9869@gmail.com',
                url:
                    'https://mail.google.com/mail/?view=cm&fs=1&to=Mahmed9869@gmail.com',
              ),
              _ContactLinkRow(
                label: 'GitHub',
                value: 'Fusionforge19',
                url: 'https://github.com/Fusionforge19',
              ),
              _ContactLinkRow(
                label: 'LinkedIn',
                value: 'Ahmed Shaikh',
                url: 'https://www.linkedin.com/in/ahmed-shaikh-511499316/',
              ),
              _ContactLinkRow(
                label: 'Itch.io',
                value: 'noname0019',
                url: 'https://noname0019.itch.io',
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFormColumn() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _UnderlineField(
            label: 'Name',
            hintText: 'Your name',
            controller: _nameController,
          ),
          const SizedBox(height: 32),
          _UnderlineField(
            label: 'Subject',
            hintText: 'What are you working on?',
            controller: _subjectController,
          ),
          const SizedBox(height: 32),
          _UnderlineField(
            label: 'Message',
            hintText: 'A few plain sentences is perfect.',
            controller: _messageController,
            maxLines: 4,
          ),
          const SizedBox(height: 36),
          Wrap(
            spacing: 12,
            runSpacing: 10,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              _SubmitButton(
                onPressed: () => _handleSendEmail(useGmail: true),
              ),
              _SecondaryActionButton(
                label: 'Mail App (mailto)',
                icon: Icons.mail_outline_rounded,
                onPressed: () => _handleSendEmail(useGmail: false),
              ),
              _SecondaryActionButton(
                label: 'Copy',
                icon: Icons.copy_rounded,
                onPressed: _handleCopyMessage,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ── Contact Link Row ─────────────────────────────────────────────────────────

class _ContactLinkRow extends StatefulWidget {
  final String label;
  final String value;
  final String url;

  const _ContactLinkRow({
    required this.label,
    required this.value,
    required this.url,
  });

  @override
  State<_ContactLinkRow> createState() => _ContactLinkRowState();
}

class _ContactLinkRowState extends State<_ContactLinkRow> {
  bool _isHovered = false;

  void _open() {
    final uri = Uri.parse(widget.url);
    launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Color(0x288FB8CC), width: 1),
        ),
      ),
      padding: const EdgeInsets.symmetric(vertical: 18),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            widget.label,
            style: const TextStyle(
              fontSize: 15,
              color: GlacierColors.textSecondary,
              fontWeight: FontWeight.w500,
            ),
          ),
          MouseRegion(
            cursor: SystemMouseCursors.click,
            onEnter: (_) => setState(() => _isHovered = true),
            onExit: (_) => setState(() => _isHovered = false),
            child: GestureDetector(
              onTap: _open,
              child: AnimatedDefaultTextStyle(
                duration: const Duration(milliseconds: 180),
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                  color: _isHovered
                      ? const Color(0xFFC24127)
                      : GlacierColors.textPrimary,
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(widget.value),
                    const SizedBox(width: 4),
                    AnimatedSlide(
                      duration: const Duration(milliseconds: 180),
                      offset:
                          _isHovered ? const Offset(0.12, -0.12) : Offset.zero,
                      child: const Text('↗'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Underline Form Field ──────────────────────────────────────────────────────

class _UnderlineField extends StatelessWidget {
  final String label;
  final String hintText;
  final TextEditingController controller;
  final int maxLines;

  const _UnderlineField({
    required this.label,
    required this.hintText,
    required this.controller,
    this.maxLines = 1,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: GlacierColors.textSecondary,
          ),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          maxLines: maxLines,
          style: const TextStyle(
            fontSize: 16,
            color: GlacierColors.textPrimary,
            fontWeight: FontWeight.w400,
          ),
          cursorColor: const Color(0xFFC24127),
          decoration: InputDecoration(
            hintText: hintText,
            hintStyle: const TextStyle(
              color: GlacierColors.textMuted,
              fontSize: 16,
              fontWeight: FontWeight.w400,
            ),
            isDense: true,
            contentPadding: const EdgeInsets.symmetric(vertical: 10),
            enabledBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: Color(0x3016324A), width: 1.0),
            ),
            focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: Color(0xFFC24127), width: 1.5),
            ),
            border: const UnderlineInputBorder(
              borderSide: BorderSide(color: Color(0x3016324A), width: 1.0),
            ),
          ),
        ),
      ],
    );
  }
}

// ── Rust Red Rectangular Submit Button ────────────────────────────────────────

class _SubmitButton extends StatefulWidget {
  final VoidCallback onPressed;

  const _SubmitButton({required this.onPressed});

  @override
  State<_SubmitButton> createState() => _SubmitButtonState();
}

class _SubmitButtonState extends State<_SubmitButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 14),
          decoration: BoxDecoration(
            color:
                _isHovered ? const Color(0xFFA9331D) : const Color(0xFFC24127),
            boxShadow: _isHovered
                ? [
                    BoxShadow(
                      color: const Color(0xFFC24127).withOpacity(0.25),
                      blurRadius: 14,
                      offset: const Offset(0, 4),
                    ),
                  ]
                : [],
          ),
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Send email',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.2,
                ),
              ),
              SizedBox(width: 6),
              Text(
                '↗',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Secondary Action Button (Mail App / Copy) ─────────────────────────────────

class _SecondaryActionButton extends StatefulWidget {
  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  const _SecondaryActionButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  @override
  State<_SecondaryActionButton> createState() => _SecondaryActionButtonState();
}

class _SecondaryActionButtonState extends State<_SecondaryActionButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
          decoration: BoxDecoration(
            color: _isHovered
                ? GlacierColors.textPrimary.withOpacity(0.06)
                : Colors.transparent,
            border: Border.all(
              color: _isHovered
                  ? GlacierColors.textPrimary
                  : const Color(0x3016324A),
              width: 1,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                widget.icon,
                size: 15,
                color: _isHovered
                    ? GlacierColors.textPrimary
                    : GlacierColors.textSecondary,
              ),
              const SizedBox(width: 6),
              Text(
                widget.label,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: _isHovered
                      ? GlacierColors.textPrimary
                      : GlacierColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
