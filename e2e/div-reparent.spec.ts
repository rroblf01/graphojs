import { expect, test } from '@playwright/test';

// GoJS-compatible: `Diagram.div` is read/write so a diagram can be moved
// between containers (or detached, div = null) without destroying it --
// the pattern the project's Vue-GoJS integration relies on for remounts.
test('Diagram.div reparents the same live diagram between containers, and null detaches it', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  const result = await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const divA = document.createElement('div');
    divA.id = 'divA';
    divA.style.width = '300px';
    divA.style.height = '200px';
    const divB = document.createElement('div');
    divB.id = 'divB';
    divB.style.width = '300px';
    divB.style.height = '200px';
    document.body.append(divA, divB);

    const diagram = new go.Diagram(divA);
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 10, y: 10, width: 60, height: 30 }],
    });
    const node = diagram.findNodeForKey(1);
    diagram.select(node);

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const canvasInA = !!divA.querySelector('canvas');

    diagram.div = divB;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const canvasInB = !!divB.querySelector('canvas');
    const canvasGoneFromA = !divA.querySelector('canvas');
    const sameNodeAfterMove = diagram.findNodeForKey(1) === node;
    const stillSelected = node.isSelected;

    diagram.div = null;
    const detachedNoCanvasAnywhere = !divA.querySelector('canvas') && !divB.querySelector('canvas');
    const notDestroyed = !diagram.isDestroyed();

    diagram.div = divA;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const reattachedToA = !!divA.querySelector('canvas');

    return {
      canvasInA,
      canvasInB,
      canvasGoneFromA,
      sameNodeAfterMove,
      stillSelected,
      detachedNoCanvasAnywhere,
      notDestroyed,
      reattachedToA,
    };
  });

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(result).toEqual({
    canvasInA: true,
    canvasInB: true,
    canvasGoneFromA: true,
    sameNodeAfterMove: true,
    stillSelected: true,
    detachedNoCanvasAnywhere: true,
    notDestroyed: true,
    reattachedToA: true,
  });
});
