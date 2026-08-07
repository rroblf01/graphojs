import { expect, test } from '@playwright/test';

test.describe('Visual regression: Shape figures', () => {
  test('renders a gallery of shape figures consistently', async ({ page }) => {
    await page.goto('/e2e/fixtures/visual-shapes.html');
    await page.waitForFunction(
      () => (window as unknown as { __ready?: boolean }).__ready === true,
      undefined,
      { timeout: 15000 },
    );

    await expect(page.locator('#diagramDiv canvas')).toHaveScreenshot('shapes-gallery.png');
  });
});

test.describe('Visual regression: Layouts', () => {
  test('renders GridLayout, TreeLayout and ForceDirectedLayout consistently', async ({ page }) => {
    await page.goto('/e2e/fixtures/visual-layouts.html');
    await page.waitForFunction(
      () => (window as unknown as { __ready?: boolean }).__ready === true,
      undefined,
      { timeout: 15000 },
    );

    await expect(page.locator('#gridDiv canvas')).toHaveScreenshot('layout-grid.png');
    await expect(page.locator('#treeDiv canvas')).toHaveScreenshot('layout-tree.png');
    await expect(page.locator('#forceDiv canvas')).toHaveScreenshot('layout-force-directed.png');
  });
});
