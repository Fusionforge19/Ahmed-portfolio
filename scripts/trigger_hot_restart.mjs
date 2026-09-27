const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        try {
          if (window.$dartHotRestartDwds) {
            return window.$dartHotRestartDwds();
          } else if (window.$dartRequestHotRestartDwds) {
            return window.$dartRequestHotRestartDwds();
          }
        } catch (e) {
          return e.toString();
        }
      })()`,
      returnByValue: true,
      awaitPromise: true
    }
  }));
};
ws.onmessage = (e) => {
  console.log('Result:', e.data);
  process.exit(0);
};
