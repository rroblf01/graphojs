import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.tsx' },
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: false,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: true,
  target: 'es2022',
  external: ['react', 'react-dom'],
});
