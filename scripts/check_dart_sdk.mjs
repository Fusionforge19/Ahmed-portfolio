const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        return {
          hasDartDevEmbedder: !!window.dartDevEmbedder,
          dartDevEmbedderKeys: window.dartDevEmbedder ? Object.keys(window.dartDevEmbedder) : [],
          hasDartSdk: !!(window.dart_sdk && window.dart_sdk.dart),
          dartSdkKeys: window.dart_sdk && window.dart_sdk.dart ? Object.keys(window.dart_sdk.dart).filter(k => k.includes('restart') || k.includes('Restart') || k.includes('reload')) : [],
        };
      })()`,
      returnByValue: true
    }
  }));
};
ws.onmessage = (e) => {
  console.log(e.data);
  process.exit(0);
};
