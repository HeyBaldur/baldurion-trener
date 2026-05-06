/**
 * Run after placing public/images/brand/baldurion-personaje.png
 * Generates: favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, og-default.png
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';

const src = 'public/images/brand/baldurion-personaje.png';

if (!existsSync(src)) {
  console.error(`Missing source: ${src}`);
  console.error('Place the personaje PNG there and re-run.');
  process.exit(1);
}

mkdirSync('public', { recursive: true });

await sharp(src).resize(16, 16).toFile('public/favicon-16x16.png');
console.log('generated → public/favicon-16x16.png');

await sharp(src).resize(32, 32).toFile('public/favicon-32x32.png');
console.log('generated → public/favicon-32x32.png');

await sharp(src).resize(180, 180).toFile('public/apple-touch-icon.png');
console.log('generated → public/apple-touch-icon.png');

// OG default: 1200×630, dark background, personaje centred, lime bar at bottom
const personajeBuffer = await sharp(src).resize(400, 400).toBuffer();

const ogSvgOverlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect y="606" width="1200" height="24" fill="#D4E84A"/>
  <text
    x="600" y="200"
    font-family="Georgia, serif"
    font-size="120"
    font-weight="900"
    text-anchor="middle"
    fill="#FAFAF7"
    letter-spacing="-2"
  >BALDURION</text>
  <text
    x="600" y="258"
    font-family="Georgia, serif"
    font-size="24"
    text-anchor="middle"
    fill="#9B9B9B"
    letter-spacing="4"
  >FITNESS SIN PSEUDOCIENCIA</text>
</svg>`;

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } },
})
  .composite([
    { input: Buffer.from(ogSvgOverlay), top: 0, left: 0 },
    { input: personajeBuffer, top: 115, left: 400 },
  ])
  .png()
  .toFile('public/og-default.png');

console.log('generated → public/og-default.png');
console.log('Done.');
