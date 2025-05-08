import { test, expect } from '@playwright/test';

test('404 Not Found', async ({ page }) => {
  await page.goto('http://localhost:3000/nonexistent');
  await expect(page.locator('h2:has-text("Page not found")')).toBeVisible();
});
