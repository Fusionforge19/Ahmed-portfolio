async function main() {
  const targetsRes = await fetch('http://localhost:63752/json');
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:63730'));
  if (!pageTarget) {
    console.error('Page target not found:', targets);
    return;
  }
  console.log('Connecting to:', pageTarget.webSocketDebuggerUrl);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((resolve) => ws.onopen = resolve);

  // Enable Runtime and Page
  await send('Runtime.enable');
  await send('Page.enable');

  // Evaluate iframes in DOM
  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const iframes = Array.from(document.querySelectorAll('iframe')).map(f => ({
        src: f.src,
        width: f.offsetWidth,
        height: f.offsetHeight,
        clientWidth: f.clientWidth,
        clientHeight: f.clientHeight,
        rect: f.getBoundingClientRect(),
        style: f.getAttribute('style'),
        outerHTML: f.outerHTML
      }));
      return {
        iframesCount: iframes.length,
        iframes,
        bodyHtml: document.body.innerHTML.substring(0, 500)
      };
    })()`,
    returnByValue: true
  });

  console.log('DOM Evaluation Result:', JSON.stringify(evalRes.result.value, null, 2));

  // Check frames in target
  const frameTree = await send('Page.getFrameTree');
  console.log('Frame Tree:', JSON.stringify(frameTree.result.frameTree, null, 2));

  ws.close();
}

main().catch(console.error);
