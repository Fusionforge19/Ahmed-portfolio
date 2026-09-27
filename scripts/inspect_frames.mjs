async function main() {
  const targetsRes = await fetch('http://localhost:63752/json');
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:63730'));
  if (!pageTarget) return;

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

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Log.enable');

  const evalFrames = await send('Runtime.evaluate', {
    expression: `(() => {
      const frames = Array.from(document.querySelectorAll('iframe'));
      return frames.map(f => {
        let content = '';
        try {
          content = f.contentDocument ? f.contentDocument.documentElement.outerHTML : 'cannot access contentDocument';
        } catch (e) {
          content = 'Error: ' + e.message;
        }
        return {
          src: f.src,
          style: f.getAttribute('style'),
          width: f.offsetWidth,
          height: f.offsetHeight,
          content: content.substring(0, 300)
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('Frames in DOM:', JSON.stringify(evalFrames.result.value, null, 2));

  ws.close();
}

main().catch(console.error);
