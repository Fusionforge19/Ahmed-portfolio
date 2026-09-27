const ws = new WebSocket('ws://localhost:63752/devtools/page/6CEB8A10FEBCCC4EAF9371AA631FAC1D');
ws.onopen = async () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        const fltViews = document.querySelectorAll('flt-platform-view');
        const glassPane = document.querySelector('flt-glass-pane');
        const shadow = glassPane ? glassPane.shadowRoot : null;
        let shadowIframes = [];
        if (shadow) {
          shadowIframes = Array.from(shadow.querySelectorAll('iframe')).map(i => i.src);
        }
        return {
          fltViewsCount: fltViews.length,
          fltViews: Array.from(fltViews).map(v => v.outerHTML.substring(0, 200)),
          hasShadow: !!shadow,
          shadowIframes
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
