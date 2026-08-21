import { expect, test } from '@playwright/test';

// A Part.toolTip built via $("ToolTip", ...) is positioned exactly at the
// cursor; without `pointer-events: none` on the floating element, it
// becomes "the element under the pointer" the instant it appears, and the
// browser fires a real mouseleave on the canvas underneath -- which
// immediately hid the tooltip it had just shown. This confirms both that
// $("ToolTip", ...) works as Part.toolTip, and that the tooltip persists.
test('a hovered Part.toolTip built via $("ToolTip", ...) shows and stays visible', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.id = 'ttDiv';
    div.style.width = '300px';
    div.style.height = '200px';
    document.body.appendChild(div);

    const diagram = new go.Diagram(div);
    diagram.toolTipDelay = 0;
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      { toolTip: $('ToolTip', $(go.TextBlock, 'Hello tooltip')) },
      $(go.Shape, 'RoundedRectangle', { width: 60, height: 30 }),
    );
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 20, y: 20, width: 60, height: 30 }],
    });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });

  const canvas = page.locator('#ttDiv canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('canvas has no bounding box');
  // Move across the background first so the node hover is a real transition,
  // not the pointer's initial position.
  await page.mouse.move(box.x + 5, box.y + 5);
  await page.mouse.move(box.x + 30, box.y + 30);
  await page.waitForTimeout(200);

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  const canvasCount = await page.evaluate(() => document.querySelectorAll('canvas').length);
  expect(canvasCount).toBe(2); // the diagram's own canvas + the floating tooltip's
});
