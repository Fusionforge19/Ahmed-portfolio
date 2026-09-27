async function findVmService() {
  const ports = [53723, 54347, 60388, 60389, 60401, 61584, 62705, 62706, 62711, 62712];
  for (const port of ports) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1000);
      const res = await fetch(`http://127.0.0.1:${port}/`, { signal: controller.signal });
      clearTimeout(id);
      const text = await res.text();
      console.log(`Port ${port}:`, res.status, text.substring(0, 100));
    } catch (e) {
      // ignore
    }
  }
}
findVmService();
