import { test, expect } from '@playwright/test';

test.describe('Company Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/admin/, { timeout: 30000 });
  });

  test('Add Company', async ({ page }) => {
    await page.goto('https://campus-careers-app.vercel.app/admin/add-company');

    // Wait for location select to appear and be ready
    const locationSelect = page.locator('select[name="location"]');
    await locationSelect.waitFor({ state: 'visible', timeout: 10000 });

    // Fill form
    await page.fill('input[name="name"]', 'NextGen Solutions');
    await locationSelect.selectOption({ value: 'California' });
    await page.fill('input[name="salary"]', '90000');
    await page.fill('textarea[name="overview"]', 'Leading tech solutions.');
    await page.fill('input[name="jobs"]', 'Software Engineer, Data Analyst');
    await page.fill('input[name="contacts"]', 'contact@nextgensolutions.com');
    await page.fill('input[name="category"]', 'Tech');

    await page.click('button[type="submit"]');

    // Optional: wait for confirmation (e.g. alert, toast)
    await page.waitForTimeout(1000);
  });
});
