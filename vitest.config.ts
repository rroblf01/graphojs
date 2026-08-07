import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/*/test/**/*.test.{ts,tsx}', 'packages/*/test/**/*.test.ts'],
    exclude: ['**/node_modules/**', 'e2e/**'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', 'packages/docs/**'],
      // Floor, not a target: current coverage runs ~77-78%/63%/80%/80%
      // (statements/branches/functions/lines) with a few points of natural
      // run-to-run variance. These thresholds sit a few points below the
      // observed range so CI fails on a real regression (e.g. a large
      // untested feature landing) without flaking on normal noise.
      thresholds: {
        statements: 74,
        branches: 58,
        functions: 76,
        lines: 76,
      },
    },
  },
});
