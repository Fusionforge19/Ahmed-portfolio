const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        // Let's check text on the page
        return {
          title: document.title,
          textSnippet: document.body.innerText.substring(0, 500),
          allIframes: Array.from(document.querySelectorAll('iframe')).map(i => i.src)
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
