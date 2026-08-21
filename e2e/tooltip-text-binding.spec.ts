import { expect, test } from '@playwright/test';

// showPartToolTip/showPartContextMenu rendered the floating panel without
// ever calling template.applyBindings(part.data) first -- so a Binding
// inside the toolTip/contextMenu template (the standard GoJS idiom, e.g.
// $(go.TextBlock, {}, new go.Binding("text", "tip"))) never resolved: the
// box was drawn, but bound text stayed empty. Confirmed by inspecting the
// floating tooltip's own canvas pixels for actual glyph ink.
test('a toolTip template with a text Binding renders the bound text, not a blank box', async ({
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
      {
        toolTip: $(
          'ToolTip',
          $(
            go.TextBlock,
            { margin: 8, font: '16px sans-serif', color: 'black' },
            new go.Binding('text', 'tip'),
          ),
        ),
      },
      $(go.Shape, 'RoundedRectangle', { width: 60, height: 30 }),
    );
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 20, y: 20, width: 60, height: 30, tip: 'Design task' }],
    });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });

  const canvas = page.locator('#ttDiv canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('canvas has no bounding box');
  await page.mouse.move(box.x + 5, box.y + 5);
  await page.mouse.move(box.x + 30, box.y + 30);
  await page.waitForTimeout(200);

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);

  const hasBlackTextInk = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    const tooltipCanvas = canvases[canvases.length - 1];
    const ctx = tooltipCanvas.getContext('2d');
    if (!ctx) return false;
    const { data } = ctx.getImageData(0, 0, tooltipCanvas.width, tooltipCanvas.height);
    for (let i = 0; i < data.length; i += 4) {
      // The tooltip chrome is a pale-yellow fill (#ffffe0) with a mid-gray
      // border (#767676, ~118) -- neither has a channel this dark. Only the
      // black (color: 'black') TextBlock glyphs do, so this pixel can only
      // come from the bound text actually being drawn.
      if (data[i + 3] > 0 && data[i] < 60 && data[i + 1] < 60 && data[i + 2] < 60) {
        return true;
      }
    }
    return false;
  });

  expect(hasBlackTextInk).toBe(true);
});
