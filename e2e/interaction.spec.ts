import { test, expect } from '@playwright/test';

test('supports interaction: click-select, drag-move, double-click text editing', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto('/e2e/fixtures/interaction.html');
  await page.waitForFunction(() => document.querySelector('canvas'), undefined, {
    timeout: 15000,
  });
  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);

  // The canvas must have rendered (non-blank)
  const pixelCount = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let n = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] !== 0) n++;
    return n;
  });
  expect(pixelCount).toBeGreaterThan(100);

  // Click on node 1 (near its top-left corner at diagram coords ~60,30)
  // and verify selection event fired
  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  await page.mouse.click(box.x + 60, box.y + 30);
  await page.waitForTimeout(300);
  const selectionLog = await page.evaluate(() =>
    (document.getElementById('log').textContent || '').split('\n').filter((l) => l.startsWith('selection:')),
  );
  expect(selectionLog.length).toBeGreaterThan(0);
  expect(selectionLog.at(-1)).toBe('selection:1');

  // Drag node 1 from its center to the right; expect a PartMoved log
  await page.mouse.move(box.x + 60, box.y + 30);
  await page.mouse.down();
  await page.mouse.move(box.x + 160, box.y + 100, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  const movedLog = await page.evaluate(() =>
    (document.getElementById('log').textContent || '').includes('partMoved'),
  );
  expect(movedLog).toBe(true);

  // Double-click node 1's label → an input overlay appears (text editing)
  const nodeCenter = await page.evaluate(() => {
    const d = window.__diagram;
    const node = d.findNodeForKey(1);
    const v = d.getViewport();
    const rect = document.querySelector('canvas').getBoundingClientRect();
    return {
      x: (node.bounds.x + node.bounds.width / 2 - v.x) * v.scale + rect.left,
      y: (node.bounds.y + node.bounds.height / 2 - v.y) * v.scale + rect.top,
    };
  });
  await page.mouse.dblclick(nodeCenter.x, nodeCenter.y);
  await page.waitForTimeout(300);
  const inputVisible = await page.evaluate(
    () => !!document.querySelector('input.graphojs-text-editing'),
  );
  expect(inputVisible).toBe(true);
});
