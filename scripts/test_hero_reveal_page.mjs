async function main() {
  // Create a new target (tab) in Chrome to test hero_reveal directly
  const createRes = await fetch('http://localhost:63752/json/new?http://localhost:63730/hero_reveal/index.html', { method: 'PUT' });
  const target = await createRes.json();
  console.log('Created tab target:', target);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('CONSOLE [', msg.params.type, ']:', msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      console.error('EXCEPTION:', msg.params.exceptionDetails);
    }
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

  // Wait 2 seconds for animation script to run
  await new Promise(r => setTimeout(r, 2000));

  // Check DOM state
  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const heading = document.querySelector('.hero-heading');
      const subheading = document.querySelector('.hero-subheading');
      return {
        headingText: heading ? heading.innerText : null,
        headingChildren: heading ? heading.children.length : 0,
        subheadingChildren: subheading ? subheading.children.length : 0,
        headingHTML: heading ? heading.innerHTML : null
      };
    })()`,
    returnByValue: true
  });

  console.log('Hero Reveal DOM Evaluation in standalone tab:', JSON.stringify(evalRes.result.value, null, 2));

  // Capture screenshot of the hero reveal animation!
  const screenshotRes = await send('Page.captureScreenshot', { format: 'png' });
  const fs = await import('fs');
  fs.writeFileSync('scripts/hero_reveal_tab.png', Buffer.from(screenshotRes.result.data, 'base64'));
  console.log('Screenshot saved to scripts/hero_reveal_tab.png');

  // Close the test tab
  await fetch(`http://localhost:63752/json/close/${target.id}`);
  ws.close();
}

main().catch(console.error);
