const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        return {
          requestHotRestart: window.$dartRequestHotRestartDwds ? window.$dartRequestHotRestartDwds.toString() : null,
          hotRestart: window.$dartHotRestartDwds ? window.$dartHotRestartDwds.toString() : null,
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
