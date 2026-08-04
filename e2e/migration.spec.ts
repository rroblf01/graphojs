import { test, expect } from '@playwright/test';

test('runs the GoJS Getting Started tutorial with graphojs in a real browser', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto('/e2e/fixtures/migration.html');

  const result = await page.waitForFunction(
    () => {
      const el = document.getElementById('result');
      if (!el || !el.textContent) return null;
      return JSON.parse(el.textContent);
    },
    undefined,
    { timeout: 15000 },
  );

  const data = await result.jsonValue();
  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);

  // Nodes and links created from the model
  expect(data.nodeCount).toBe(2);
  expect(data.linkCount).toBe(1);

  // Element-level binding applied (text "name" → TextBlock)
  expect(data.label).toBe('Alpha');

  // part.data references the model data object
  expect(data.partData).toBe('Alpha');

  // Canvas actually rendered something (non-blank)
  const canvasPixelCount = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let nonTransparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] !== 0) nonTransparent++;
    }
    return nonTransparent;
  });
  expect(canvasPixelCount).toBeGreaterThan(100);
});
