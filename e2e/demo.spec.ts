import { expect, test } from '@playwright/test';

test('demo flowchart renders without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });

  await page.goto('/examples/flowchart.html');
  await page.waitForFunction(() => document.querySelector('canvas'), undefined, { timeout: 15000 });
  // The canvas element exists as soon as the Diagram constructor returns,
  // but the first paint only happens inside a requestAnimationFrame
  // callback scheduled at the end of that constructor — wait for it to
  // actually fire before reading pixel data (otherwise this races with
  // WebKit's slower first-rAF timing in CI and reads a still-blank canvas).
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
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
