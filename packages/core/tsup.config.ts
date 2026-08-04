import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts', go: 'src/go.ts' },
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  target: 'es2022',
});
