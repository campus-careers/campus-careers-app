import { test, expect } from '@playwright/test';

test('404 Not Found', async ({ page }) => {
  await page.goto('https://campus-careers-app.vercel.app/nonexistent');
  await expect(page.locator('h2:has-text("Page not found")')).toBeVisible();
});