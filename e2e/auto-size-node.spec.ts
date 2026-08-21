import { expect, test } from '@playwright/test';

// A Node never auto-sized to its template's own content -- it always
// defaulted to 100x50 unless the model data had explicit width/height
// fields. Real GoJS has no such reserved data properties: an "Auto" panel
// whose main Shape binds its own `width` to per-node data (the standard
// Gantt-bar idiom, and the same pattern behind any node meant to hug its
// label) is how a node's size is supposed to come from its content.
// Confirmed against a real GoJS-vs-graphojs Gantt screenshot comparison:
// every bar rendered at the same ~100px width regardless of its actual
// duration, instead of scaling proportionally like GoJS's did.
test('two nodes with different Shape.width bindings render at proportionally different widths', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  const result = await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.id = 'sizeDiv';
    div.style.width = '400px';
    div.style.height = '200px';
    document.body.appendChild(div);

    const diagram = new go.Diagram(div);
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(
        go.Shape,
        'RoundedRectangle',
        { name: 'BAR', height: 26, strokeWidth: 0 },
        new go.Binding('width', 'barWidth'),
        new go.Binding('fill', 'color'),
      ),
    );
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 10, y: 10, barWidth: 40, color: '#2f5fd6' }, // "5 days"
        { key: 2, x: 10, y: 60, barWidth: 80, color: '#17825a' }, // "10 days"
      ],
    });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const n1 = diagram.findNodeForKey(1);
    const n2 = diagram.findNodeForKey(2);
    return {
      node1Width: n1.bounds.width,
      node2Width: n2.bounds.width,
      bar1ActualWidth: n1.findObject('BAR').actualSize.width,
      bar2ActualWidth: n2.findObject('BAR').actualSize.width,
    };
  });

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(result).toEqual({
    node1Width: 40,
    node2Width: 80,
    bar1ActualWidth: 40,
    bar2ActualWidth: 80,
  });
});
