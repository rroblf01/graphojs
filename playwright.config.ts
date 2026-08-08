import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4173',
  },
  // A small tolerance for toHaveScreenshot() — CI's Firefox runs on a
  // different OS/font stack than whatever machine captured the committed
  // baselines, so anti-aliasing produces tiny (~0.01%) pixel diffs with no
  // functional regression. 2% comfortably covers that noise while still
  // catching real rendering regressions, which are far larger in practice.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  webServer: {
    command: 'node e2e/build-fixtures.mjs && node e2e/server.mjs',
    port: 4173,
    reuseExistingServer: true,
  },
  projects: [
    // Firefox runs everything, including visual regression baselines
    // (visual.spec.ts's snapshots were captured against Firefox's renderer).
    { name: 'firefox', use: { browserName: 'firefox' } },
    // Chromium/WebKit add cross-browser functional coverage in CI only —
    // not run locally by default. They skip visual.spec.ts: per-engine
    // rendering differences (fonts, anti-aliasing) would need their own
    // baselines, and visual regression is deliberately single-browser here.
    ...(process.env.CI
      ? [
          {
            name: 'chromium',
            use: { browserName: 'chromium' as const },
            testIgnore: /visual\.spec\.ts/,
          },
          {
            name: 'webkit',
            use: { browserName: 'webkit' as const },
            testIgnore: /visual\.spec\.ts/,
          },
        ]
      : []),
  ],
});
