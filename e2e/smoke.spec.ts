import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const fixture = fileURLToPath(new URL('./fixtures/blank.html', import.meta.url));

test('loads fixture page', async ({ page }) => {
  await page.goto(`file://${fixture}`);
  await expect(page).toHaveTitle('GraphoJS E2E Fixture');
});
