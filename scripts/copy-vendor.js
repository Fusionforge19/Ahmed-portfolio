const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', 'animejs', 'dist', 'bundles', 'anime.esm.min.js');
const targets = [
  path.join(__dirname, '..', 'web', 'vendor', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'assets', 'vendor', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'web', 'motion_track', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'assets', 'motion_track', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'web', 'hero_reveal', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'assets', 'hero_reveal', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'build', 'web', 'motion_track', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'build', 'web', 'hero_reveal', 'anime.esm.min.js'),
  path.join(__dirname, '..', 'build', 'web', 'vendor', 'anime.esm.min.js')
];

for (const dest of targets) {
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('Synchronized anime.esm.min.js to:', dest);
  } catch (err) {
    console.warn('Could not copy to', dest, err.message);
  }
}
