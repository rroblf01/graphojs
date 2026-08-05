import { test, expect } from '@playwright/test';

test('@graphojs/react mounts Diagram/Palette/Overview in a real browser', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto('/e2e/fixtures/react-app.html');
  await page.waitForFunction(() => document.querySelector('canvas'), undefined, {
    timeout: 15000,
  });
  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);

  // The React Diagram created a real diagram with the model
  const nodeCount = await page.evaluate(() => window.__diagram?.getModel().getNodeCount() ?? -1);
  expect(nodeCount).toBe(2);

  // Palette rendered its item
  const paletteItems = await page.evaluate(
    () => document.querySelectorAll('[data-template-id]').length,
  );
  expect(paletteItems).toBeGreaterThan(0);

  // Clicking a node fires onSelectionChanged (via __selectionCount)
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  await page.mouse.click(box.x + 60, box.y + 30);
  await page.waitForTimeout(300);
  const selections = await page.evaluate(() => window.__selectionCount());
  expect(selections).toBeGreaterThan(0);
});
