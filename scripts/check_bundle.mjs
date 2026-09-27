async function test() {
  const res = await fetch('http://localhost:63730/main.dart.js');
  console.log('main.dart.js status:', res.status, res.headers.get('content-type'));
  const text = await res.text();
  console.log('main.dart.js length:', text.length);
  console.log('contains hero_reveal?', text.includes('hero_reveal'));
  console.log('contains circuit_track?', text.includes('circuit_track'));
  console.log('contains HeroTextReveal?', text.includes('HeroTextReveal'));
  console.log('contains CircuitTrackDivider?', text.includes('CircuitTrackDivider'));
}
test();
