import { test, expect } from '@playwright/test';

test.describe('Admin Portal Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin before each test
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('https://campus-careers-app.vercel.app/admin', { timeout: 90000 });
  });

  test('Admin Dashboard - View Students', async ({ page }) => {
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('https://campus-careers-app.vercel.app/admin', { timeout: 30000 });
    await expect(page).toHaveURL('https://campus-careers-app.vercel.app/admin');
    await page.waitForSelector('text=Alex Chang', { timeout: 30000 });
    await expect(page.locator('text=Alex Chang')).toBeVisible();
  });

});
