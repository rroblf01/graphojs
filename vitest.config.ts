import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/*/test/**/*.test.{ts,tsx}', 'packages/*/test/**/*.test.ts'],
    exclude: ['**/node_modules/**', 'e2e/**'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
