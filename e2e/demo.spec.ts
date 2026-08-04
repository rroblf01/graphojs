import { test, expect } from '@playwright/test';

test('demo flowchart renders without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });

  await page.goto('/examples/flowchart.html');
  await page.waitForFunction(() => document.querySelector('canvas'), undefined, { timeout: 15000 });
  expect(errors, `errors: ${errors.join('\n')}`).toEqual([]);

  const pixelCount = await page.evaluate(() => {
    const canvas = document.querySelector('#diagramDiv canvas');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let n = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] !== 0) n++;
    return n;
  });
  expect(pixelCount).toBeGreaterThan(100);
});
