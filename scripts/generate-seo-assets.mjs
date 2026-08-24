/**
 * Generates every static image the <head> references.
 *
 *   sources: public/images/brand/seo-banner.png       (share card artwork)
 *            public/images/brand/baldurion-personaje.png (icon artwork)
 *
 *   outputs: public/og-default.jpg      1200×630  — Open Graph / Twitter card
 *            public/favicon-16x16.png
 *            public/favicon-32x32.png
 *            public/apple-touch-icon.png 180×180
 *            public/icon-192.png         192×192  — web manifest
 *            public/icon-512.png         512×512  — web manifest
 *
 * Run with: npm run seo-assets
 */
import sharp from 'sharp';
import { existsSync, statSync } from 'node:fs';

const BANNER = 'public/images/brand/seo-banner.png';
const ICON = 'public/images/brand/baldurion-personaje.png';
const DARK = { r: 10, g: 10, b: 10, alpha: 1 };

for (const src of [BANNER, ICON]) {
  if (!existsSync(src)) {
    console.error(`Missing source: ${src}`);
    process.exit(1);
  }
}

const kb = file => `${Math.round(statSync(file).size / 1024)} KB`;

/**
 * Social cards must not carry transparency — every scraper composites them onto
 * an unpredictable background — so flatten onto the brand dark first.
 */
async function shareCard(width, height, out, fit = 'cover') {
  await sharp(BANNER)
    .resize(width, height, { fit, position: 'centre', background: DARK })
    .flatten({ background: DARK })
    .jpeg({ quality: 84, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(out);
  console.log(`generated → ${out} (${width}×${height}, ${kb(out)})`);
}

await shareCard(1200, 630, 'public/og-default.jpg');

const icons = [
  [16, 'public/favicon-16x16.png'],
  [32, 'public/favicon-32x32.png'],
  [180, 'public/apple-touch-icon.png'],
  [192, 'public/icon-192.png'],
  [512, 'public/icon-512.png'],
];

for (const [size, out] of icons) {
  // apple-touch-icon must be opaque; Apple squares off and blackens alpha itself.
  const pipeline = sharp(ICON).resize(size, size, { fit: 'contain', background: DARK });
  if (out.includes('apple-touch-icon')) pipeline.flatten({ background: DARK });
  await pipeline.png({ compressionLevel: 9 }).toFile(out);
  console.log(`generated → ${out} (${size}×${size}, ${kb(out)})`);
}

console.log('Done.');
