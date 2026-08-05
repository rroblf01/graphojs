import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    go: 'src/go.ts',
    templates: 'src/templates.ts',
  },
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: false,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: true,
  target: 'es2022',
});
