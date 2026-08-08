import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}'],
  bundle: false,
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: true,
  target: 'es2022',
  external: ['react', 'react-dom', 'vue'],
});
