import { test, expect } from '@playwright/test';

test.describe('Browsing and Filtering Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Step 1: Navigate to the login page
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');

    // Step 2: Log in as Admin
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');

    // Step 3: Wait for the admin dashboard to load
    await page.waitForURL('**/admin', { timeout: 60000 });

    // Step 4: Verify successful login
    await expect(page.locator('h1:has-text("Admin Portal")')).toBeVisible({ timeout: 30000 });
  });

  test('Filter by Skill', async ({ page }) => {
    // Step 5: Go to the filter page
    await page.goto('https://campus-careers-app.vercel.app/filter');

    // Step 6: Wait for the page to load completely
    await page.waitForLoadState('networkidle');

  });

});