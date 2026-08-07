/**
 * tsup's unbundled mode (`bundle: false`) transpiles each source file
 * 1:1 but does not rewrite relative import/export specifiers from their
 * source `.ts`/`.tsx` extension to the actual output extension — so the
 * published dist would contain runtime-broken specifiers like
 * `from './diagram/Diagram.ts'` (Node/browsers can't load a `.ts` file).
 * This rewrites them in place, after tsup runs: `.ts(x)` -> `.js` in ESM
 * output, `.ts(x)` -> `.cjs` in CJS output. Only touches relative
 * specifiers (`./...`/`../...`) inside quotes — bare package imports
 * (`'react'`, `'vue'`) have no extension and are untouched.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const distDir = join(import.meta.dirname, '..', 'dist');

function walk(dir, onFile) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path, onFile);
    } else {
      onFile(path);
    }
  }
}

let filesChanged = 0;
walk(distDir, (path) => {
  const ext = extname(path);
  if (ext !== '.js' && ext !== '.cjs') return;

  const outExt = ext === '.cjs' ? '.cjs' : '.js';
  const source = readFileSync(path, 'utf8');
  const rewritten = source.replace(
    /(['"])(\.\.?\/[^'"]*?)\.tsx?\1/g,
    (_match, quote, specifier) => `${quote}${specifier}${outExt}${quote}`,
  );

  if (rewritten !== source) {
    writeFileSync(path, rewritten);
    filesChanged++;
  }
});

console.log(`[fix-dist-extensions] rewrote import specifiers in ${filesChanged} file(s)`);
