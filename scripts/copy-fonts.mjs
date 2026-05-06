import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const dest = 'public/fonts';
mkdirSync(dest, { recursive: true });

const files = [
  [
    'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2',
    `${dest}/anton-latin-400-normal.woff2`,
  ],
  [
    'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
    `${dest}/manrope-latin-wght-normal.woff2`,
  ],
];

for (const [src, dst] of files) {
  copyFileSync(resolve(src), resolve(dst));
  console.log(`copied → ${dst}`);
}
