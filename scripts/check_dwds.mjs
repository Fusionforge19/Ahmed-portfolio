const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        // Check window objects for dwds / dart / vmservice
        return {
          keys: Object.keys(window).filter(k => k.includes('dart') || k.includes('dwds') || k.includes('flutter')),
          dwds: window.$dwdsVersion,
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
