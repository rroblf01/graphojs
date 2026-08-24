import { expect, test } from '@playwright/test';

// Diagram's own model-sync path routed orthogonal links through a second,
// much simpler `computeOrthogonalPath(from, to)` -- separate from (and
// bypassing) the renderer's real router -- that only compared raw port
// coordinates. Since a Gantt "finish-to-start" dependency typically has its
// two ports land at the same x (the next task starts exactly where the
// previous one ends), this collapsed to a dead-straight line, ignoring
// `fromSpot: RightSide`/`toSpot: LeftSide` entirely. Confirmed against a
// real GoJS-vs-graphojs Gantt screenshot comparison, where GoJS's
// dependency arrows visibly exit right/enter left with a bend and
// graphojs's were flat vertical lines.
test('a finish-to-start Gantt dependency link (x-aligned ports) renders with a real bend, not a straight line', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto('/e2e/fixtures/blank.html');

  const result = await page.evaluate(async () => {
    const go = await import('/packages/core/dist/go.js');
    const $ = go.GraphObject.make;
    const div = document.createElement('div');
    div.style.width = '400px';
    div.style.height = '300px';
    document.body.appendChild(div);

    const diagram = new go.Diagram(div);
    diagram.nodeTemplate = $(go.Node, 'Auto', $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }));
    diagram.linkTemplate = $(go.Link, {
      routing: go.Link.Orthogonal,
      corner: 6,
      fromSpot: go.Spot.RightSide,
      toSpot: go.Spot.LeftSide,
    });
    diagram.model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 26 },
        { key: 2, x: 100, y: 60, width: 100, height: 26 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const link = [...diagram.links.values()][0];
    return { pathPoints: link.pathPoints, fromPortX: link.fromPort.x, toPortX: link.toPort.x };
  });

  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);
  expect(result.fromPortX).toBe(100);
  expect(result.toPortX).toBe(100); // same x as fromPort -- the degenerate case
  expect(result.pathPoints.length).toBeGreaterThan(2);
  expect(result.pathPoints.some((p) => p.x > 100)).toBe(true);
  expect(result.pathPoints.some((p) => p.x < 100)).toBe(true);
});
