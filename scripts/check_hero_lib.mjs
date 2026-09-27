async function checkHero() {
  const res = await fetch('http://localhost:63730/packages/portfolio/widgets/hero_section.dart.lib.js');
  const text = await res.text();
  console.log('hero_section.dart.lib.js length:', text.length);
  console.log('has hero_reveal?', text.includes('hero_reveal'));
  console.log('has HeroTextReveal?', text.includes('HeroTextReveal'));
  console.log('has HeroReveal?', text.includes('HeroReveal'));
  const match = text.match(/.{0,50}HeroTextReveal.{0,50}/g);
  console.log('matches:', match);
}
checkHero();
