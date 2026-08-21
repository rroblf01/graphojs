import { expect, test } from '@playwright/test';

// Panel.layout* functions (layoutSpot/layoutStack/layoutTable/layoutPosition/
// layoutViewbox/layoutAuto) drew every child unconditionally, never checking
// `.visible` -- so a Binding("visible", ...) that resolved to false left the
// element flagged invisible but still painted every pixel. Confirmed by
// binding a bright, unmistakable fill color to "visible" and reading actual
// canvas pixels.
test('a Shape with Binding("visible", ...) resolving to false is not drawn', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  const result = await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.id = 'visDiv';
    div.style.width = '200px';
    div.style.height = '200px';
    document.body.appendChild(div);

    const diagram = new go.Diagram(div);
    diagram.nodeTemplate = $(
      go.Node,
      'Spot',
      $(go.Shape, 'Rectangle', { width: 100, height: 100, fill: 'black', stroke: null }),
      $(
        go.Shape,
        'Rectangle',
        { width: 100, height: 100, fill: 'magenta', stroke: null },
        new go.Binding('visible', 'show'),
      ),
    );
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 20, y: 20, show: false }],
    });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const canvas = div.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let hasMagenta = false;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 200 && data[i + 1] < 50 && data[i + 2] > 200) {
        hasMagenta = true;
        break;
      }
    }
    return { hasMagenta };
  });

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(result.hasMagenta).toBe(false);
});

// Shape/Panel.measure() gated real-size measurement behind `this.width > 0`,
// treating an explicitly-bound width of 0 (e.g. a 0%-progress bar) the same
// as "never set", and falling back to the figure's 100x60 default instead.
test('a Shape with Binding("width", ...) resolving to 0 sizes its node to zero width, not the 100px default', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  const result = await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.id = 'zeroDiv';
    div.style.width = '200px';
    div.style.height = '200px';
    document.body.appendChild(div);

    const diagram = new go.Diagram(div);
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(
        go.Shape,
        'RoundedRectangle',
        { name: 'PROGRESS', height: 20, strokeWidth: 0 },
        new go.Binding('width', 'progressWidth'),
      ),
    );
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 20, y: 20, progressWidth: 0 }],
    });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const node = diagram.findNodeForKey(1);
    return { nodeWidth: node.bounds.width };
  });

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(result.nodeWidth).toBe(0);
});
