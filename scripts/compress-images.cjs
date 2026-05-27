#!/usr/bin/env node
'use strict';

const sharp = require('sharp');
const { readdirSync, renameSync, statSync, unlinkSync, existsSync } = require('fs');
const { join, extname, basename } = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const dir = join(process.cwd(), 'public/project-images/32-bit-tiny-gpu');

if (!existsSync(dir)) {
  process.stderr.write(`Directory not found: ${dir}\n`);
  process.exit(1);
}

async function main() {
  const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  const before = files.reduce((sum, f) => sum + statSync(join(dir, f)).size, 0);

  if (DRY_RUN) {
    console.log('[dry-run] Would process:', files.join(', '));
    return;
  }

  for (const file of files) {
    const input = join(dir, file);
    const tmp = input + '.tmp';
    const ext = extname(file).toLowerCase();
    const isHero = file.includes('hero') || file.includes('architecture') ||
                   file.includes('instruction') || file.includes('software');
    const maxWidth = isHero ? 1600 : 900;

    try {
      await sharp(input)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(tmp);

      if (ext === '.png') {
        const newPath = input.replace(/\.png$/i, '.jpg');
        renameSync(tmp, newPath);
        unlinkSync(input);
        console.log(`✓ ${file} → ${basename(newPath)} (${(statSync(newPath).size / 1024).toFixed(0)} KB)`);
      } else {
        renameSync(tmp, input);
        console.log(`✓ ${file} (${(statSync(input).size / 1024).toFixed(0)} KB)`);
      }
    } catch (e) {
      try { unlinkSync(tmp); } catch {}
      process.stderr.write(`✗ ${file}: ${e.message}\n`);
    }
  }

  const files2 = readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  const after = files2.reduce((sum, f) => sum + statSync(join(dir, f)).size, 0);
  console.log(`\n${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(1)} MB`);
}

main().catch(e => { process.stderr.write(e.message + '\n'); process.exit(1); });
