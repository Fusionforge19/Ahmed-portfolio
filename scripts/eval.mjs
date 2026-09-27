const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        function walkAllShadowRoots(root, depth) {
          const results = [];
          const all = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
          for (const el of all) {
            if (el.tagName && el.tagName.toLowerCase() === 'iframe') {
              results.push('IFRAME src=' + el.src + ' w=' + el.offsetWidth + ' h=' + el.offsetHeight);
            }
            if (el.shadowRoot) {
              results.push('SHADOW_ROOT on ' + el.tagName + ':');
              results.push(...walkAllShadowRoots(el.shadowRoot, depth + 1));
            }
          }
          return results;
        }
        return walkAllShadowRoots(document, 0);
      })()`,
      returnByValue: true
    }
  }));
};
ws.onmessage = (e) => {
  const parsed = JSON.parse(e.data);
  const val = parsed.result?.result?.value;
  if (Array.isArray(val)) val.forEach(v => console.log(v));
  else console.log(e.data);
  process.exit(0);
};
