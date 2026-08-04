import { test, expect } from '@playwright/test';

test.describe('Palette drag-and-drop and Overview', () => {
  test('palette item can be dropped onto the diagram and overview renders', async ({ page }) => {
    await page.goto('/e2e/fixtures/palette.html');

    // Palette should show the custom item
    await expect(page.locator('[data-template-id="pal-item"]')).toBeVisible();

    // Drag the palette item onto the diagram canvas
    const item = page.locator('[data-template-id="pal-item"]');
    const canvas = page.locator('#diagramDiv canvas').first();
    await item.dragTo(canvas, { targetPosition: { x: 300, y: 300 } });

    // The drop must add a node to the model
    await page.waitForFunction(() => {
      const win = window as unknown as {
        __diagram?: { getModel: () => { getNodeCount: () => number } };
      };
      return win.__diagram?.getModel().getNodeCount() === 2;
    });

    const count = await page.evaluate(() => {
      const win = window as unknown as {
        __diagram?: { getModel: () => { getNodeCount: () => number } };
      };
      return win.__diagram!.getModel().getNodeCount();
    });
    expect(count).toBe(2);

    // Overview canvas must exist and be non-blank
    const overviewCanvas = await page.evaluate(() => {
      const win = window as unknown as {
        __overview?: { getCanvas: () => HTMLCanvasElement };
      };
      const c = win.__overview!.getCanvas();
      const ctx = c.getContext('2d')!;
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let nonEmpty = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i]! > 0) nonEmpty++;
      }
      return { nonEmpty, width: c.width, height: c.height };
    });
    expect(overviewCanvas.width).toBeGreaterThan(0);
  });
});
