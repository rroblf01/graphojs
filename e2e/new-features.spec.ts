import { expect, test } from '@playwright/test';

test('exercises every 1.2.0 API addition in a real browser', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto('/e2e/fixtures/new-features.html');

  const result = await page.waitForFunction(
    () => {
      const el = document.getElementById('result');
      if (!el?.textContent) return null;
      return JSON.parse(el.textContent);
    },
    undefined,
    { timeout: 15000 },
  );

  const data = await result.jsonValue();
  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(data.errors, `check() failures: ${data.errors.join('\n')}`).toEqual([]);

  for (const [name, value] of Object.entries(data.out)) {
    expect(value, `check "${name}" returned falsy`).toBeTruthy();
  }

  // Canvas actually rendered something (non-blank) after all the new-feature
  // wiring (gradient Brush fill, theme switch) ran.
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

test('ActionTool actually fires on a real mouse click (dispatch wiring)', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.id = 'actionDiv';
    div.style.width = '400px';
    div.style.height = '300px';
    document.body.appendChild(div);

    const diagram = new go.Diagram('actionDiv');
    const w = window as unknown as { __actionCalls: string[] };
    w.__actionCalls = [];
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(go.Shape, 'RoundedRectangle', {
        name: 'btn',
        width: 60,
        height: 30,
        fill: 'white',
        isActionable: true,
        actionDown: () => w.__actionCalls.push('down'),
        actionUp: () => w.__actionCalls.push('up'),
      }),
    );
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 50, y: 50, width: 60, height: 30 }],
    });
    (window as unknown as { __diagram: unknown }).__diagram = diagram;
  });

  // First paint happens inside a requestAnimationFrame scheduled at the end
  // of the Diagram constructor — wait for it before computing click coords
  // or interacting (matches e2e/interaction.spec.ts's pattern).
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );

  const box = await page.evaluate(() => {
    interface MinimalDiagram {
      findNodeForKey(key: number): {
        bounds: { x: number; y: number; width: number; height: number };
      };
      getViewport(): { x: number; y: number; scale: number };
    }
    const d = (window as unknown as { __diagram: MinimalDiagram }).__diagram;
    const node = d.findNodeForKey(1);
    const v = d.getViewport();
    const rect = document.querySelector('#actionDiv canvas')!.getBoundingClientRect();
    return {
      x: (node.bounds.x + node.bounds.width / 2 - v.x) * v.scale + rect.left,
      y: (node.bounds.y + node.bounds.height / 2 - v.y) * v.scale + rect.top,
    };
  });

  await page.mouse.move(box.x, box.y);
  await page.mouse.down();
  await page.mouse.up();

  const calls = await page.evaluate(
    () => (window as unknown as { __actionCalls: string[] }).__actionCalls,
  );
  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(calls).toEqual(['down', 'up']);
});
