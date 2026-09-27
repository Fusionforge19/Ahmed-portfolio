const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        // Look up all loaded script tags
        const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src);
        // Look up dartdevc modules if present
        let ddcModules = [];
        if (window.$dartLoader && window.$dartLoader.moduleParents) {
          ddcModules = Object.keys(window.$dartLoader.moduleParents);
        }
        return {
          scripts,
          ddcModulesCount: ddcModules.length,
          ddcModules: ddcModules.filter(m => m.includes('lib') || m.includes('portfolio') || m.includes('hero'))
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
