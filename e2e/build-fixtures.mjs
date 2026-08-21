import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const esbuild = (
  await import(join(root, 'node_modules/.pnpm/esbuild@0.28.1/node_modules/esbuild/lib/main.js'))
).default;
const fixturesSrc = join(root, 'e2e', 'fixtures-src');
const outDir = join(root, 'e2e', 'fixtures');

const alias = {
  graphojs: resolve(root, 'packages/core/dist/index.js'),
  'graphojs/react': resolve(root, 'packages/core/dist/react/index.js'),
  'graphojs/vue': resolve(root, 'packages/core/dist/vue/index.js'),
};

const targets = [
  { entry: join(fixturesSrc, 'react-app.tsx'), outfile: join(outDir, 'react-app.js') },
  { entry: join(fixturesSrc, 'vue-app.ts'), outfile: join(outDir, 'vue-app.js') },
  { entry: join(fixturesSrc, 'perf-app.ts'), outfile: join(outDir, 'perf-app.js') },
];

for (const t of targets) {
  await esbuild.build({
    entryPoints: [t.entry],
    outfile: t.outfile,
    bundle: true,
    format: 'esm',
    platform: 'browser',
    minify: true,
    target: 'es2022',
    alias,
    logLevel: 'warning',
  });
  console.log(`[e2e] built ${t.outfile}`);
}
