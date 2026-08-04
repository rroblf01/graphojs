import { test, expect } from '@playwright/test';

test('loads fixture page', async ({ page }) => {
  await page.goto('/e2e/fixtures/blank.html');
  await expect(page).toHaveTitle('GraphoJS E2E Fixture');
});
