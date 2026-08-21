import { expect, test } from '@playwright/test';

// Real-browser regression for a migration report: a left-aligned TextBlock
// label, sibling to a data-bound-width bar Shape inside a Panel "Spot" (the
// exact structure GoJS Gantt charts use), lost its leading character(s) —
// "Design" rendered as "esign", "QA & launch" as "& launch" — because the
// label's measured width got permanently stuck at a ~10px floor from an
// early pass (before its text Binding applied), then never re-measured.
test('a Gantt-bar-style left-aligned label keeps its full text (no leading-character loss)', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto('/e2e/fixtures/gantt-label.html');
  await page.waitForFunction(() => document.getElementById('result')?.textContent === 'ready');
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  expect(errors, `page errors: ${errors.join('\n')}`).toEqual([]);

  const result = await page.evaluate(() => {
    const w = window as unknown as { __diagram: any };
    const d = w.__diagram;

    const canvas = document.querySelector('#ganttDiv canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    function realWidth(text: string, font: string): number {
      ctx.save();
      ctx.font = font;
      const w = ctx.measureText(text).width;
      ctx.restore();
      return w;
    }

    const font = '600 12px ui-sans-serif, system-ui, sans-serif';
    const designNode = d.findNodeForKey(1);
    const designLabel = designNode.findObject('label');
    const launchNode = d.findNodeForKey(2);
    const launchLabel = launchNode.findObject('label');

    return {
      designMeasured: designLabel.measure().width,
      designReal: realWidth('Design', font),
      launchMeasured: launchLabel.measure().width,
      launchReal: realWidth('QA & launch', font),
    };
  });

  // The label's own measured width must track the real, current text --
  // not be stuck at the ~10px floor a stale, locked-in actualSize produced.
  expect(result.designMeasured).toBeGreaterThan(result.designReal * 0.8);
  expect(result.launchMeasured).toBeGreaterThan(result.launchReal * 0.8);

  // Direct visual confirmation: sample the pixel row through the middle of
  // each bar and confirm there is no gap of pure-white pixels between the
  // bar's own left edge and the first non-background pixel further right --
  // i.e. nothing is rendered (invisibly, white-on-white) before the bar
  // starts, which is what "esign"/"& launch" looked like on screen.
  const rowsAreSolidFromBarStart = await page.evaluate(() => {
    const canvas = document.querySelector('#ganttDiv canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    function barSpan(y: number, maxX: number): { start: number; end: number } {
      const row = ctx.getImageData(0, y, maxX, 1).data;
      let start = -1;
      let end = -1;
      for (let x = 0; x < maxX; x++) {
        const i = x * 4;
        const isWhite = row[i] === 255 && row[i + 1] === 255 && row[i + 2] === 255;
        if (!isWhite && start === -1) start = x;
        if (!isWhite) end = x;
      }
      return { start, end };
    }
    // Design bar: y 20..46, sample near the top edge (above the label's own
    // vertical center) where only the bar's own fill can be present --
    // this isolates the bar's true left edge from the label overlapping it.
    const designBarTop = barSpan(21, 700);
    const launchBarTop = barSpan(71, 700);
    return { designBarTop, launchBarTop };
  });

  // Both bars must actually render (non-empty span) close to their intended
  // start (x=20); a bar whose Shape got mis-centered because the panel
  // widened past barWidth to fit an unmeasured label would start later.
  expect(rowsAreSolidFromBarStart.designBarTop.start).toBeLessThanOrEqual(22);
  expect(rowsAreSolidFromBarStart.launchBarTop.start).toBeLessThanOrEqual(22);
});
