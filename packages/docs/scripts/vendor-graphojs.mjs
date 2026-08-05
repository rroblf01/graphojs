/**
 * Copy the built GraphoJS core dist into public/vendor/graphojs so the
 * playgrounds can load the library via import maps.
 *
 * Requires `pnpm -C packages/core build` to have run first.
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const coreDist = resolve(docsRoot, '..', 'core', 'dist');
const vendorDir = join(docsRoot, 'public', 'vendor', 'graphojs');

if (!existsSync(coreDist)) {
  console.error('[docs] packages/core/dist not found. Run `pnpm -C packages/core build` first.');
  process.exit(1);
}

mkdirSync(vendorDir, { recursive: true });
cpSync(coreDist, vendorDir, { recursive: true });
console.log('[docs] vendored graphojs core dist -> public/vendor/graphojs');
