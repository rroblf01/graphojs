import { test, expect } from '@playwright/test';

test('large graph (5000 nodes) performance in a real browser', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto('/e2e/fixtures/perf-app.html');

  // Wait for the perf app to finish measuring and publish results.
  await page.waitForFunction(
    () => {
      const w = window as unknown as { __perf?: object };
      return w.__perf !== undefined;
    },
    undefined,
    { timeout: 60000 },
  );

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);

  const perf = await page.evaluate(() => {
    const w = window as unknown as { __perf?: Record<string, number> };
    return w.__perf ?? {};
  });

  console.log('[perf] large graph (5000 nodes):', JSON.stringify(perf));

  // Generous thresholds: only fail on severe regressions.
  expect(perf.modelSyncMs ?? -1).toBeGreaterThanOrEqual(0);
  expect(perf.modelSyncMs ?? Infinity).toBeLessThan(20000);
  expect(perf.firstRenderMs ?? Infinity).toBeLessThan(2000);
  expect(perf.fps ?? 0).toBeGreaterThan(5);
  expect(perf.contentBoundsMs ?? Infinity).toBeLessThan(100);
});
