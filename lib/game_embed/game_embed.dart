// Conditional export: picks the web implementation when compiled for web,
// and the stub otherwise.
export 'game_embed_stub.dart'
    if (dart.library.ui_web) 'game_embed_web.dart';
