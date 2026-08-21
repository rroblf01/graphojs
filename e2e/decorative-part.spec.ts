import { expect, test } from '@playwright/test';

// GoJS-compatible: `new go.Part()` is directly instantiable (a decorative
// frame/watermark outside the model), added via `diagram.add()`.
test('a bare decorative Part renders alongside regular nodes, without entering the model', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  const result = await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.id = 'decoDiv';
    div.style.width = '300px';
    div.style.height = '200px';
    document.body.appendChild(div);

    const diagram = new go.Diagram(div);
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 20, y: 20, width: 60, height: 30 }],
    });

    const frame = new go.Part();
    frame.bounds = new go.Rect(150, 20, 100, 60);
    frame.panel = $(go.Panel, 'Auto', $(go.Shape, 'Rectangle', { fill: 'orange' }));
    diagram.add(frame);

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const nodeCount = diagram.model.nodeDataArray.length;
    const foundBack = diagram.getPart(frame.key) === frame;

    const canvas = document.querySelector('#decoDiv canvas');
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(180, 40, 1, 1).data;

    return { nodeCount, foundBack, pixel: [pixel[0], pixel[1], pixel[2]] };
  });

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(result.nodeCount).toBe(1); // the decorative Part never entered the model
  expect(result.foundBack).toBe(true);
  // orange = rgb(255,165,0) -- confirms the frame's panel actually drew.
  expect(result.pixel).toEqual([255, 165, 0]);
});
