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
  webServer: {
    command: 'node e2e/server.mjs',
    port: 4173,
    reuseExistingServer: true,
  },
  projects: [{ name: 'firefox', use: { browserName: 'firefox' } }],
});
