import { test, expect } from '@playwright/test';

test.describe('Company Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin before each test
    await page.goto('/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('https://campus-careers-app.vercel.app/admin', { timeout: 30000 });
  });

  test('Add Company', async ({ page }) => {
    // Navigate using relative path so baseURL is used
    await page.goto('/admin/add-company');

    // Wait for the form to load
    await page.waitForSelector('form button[type="submit"]');

    // Wait for location select to appear (ensures React finished rendering)
    const locationSelect = page.locator('select[name="location"]');
    await locationSelect.waitFor({ state: 'visible', timeout: 10000 });

    // Fill the form
    await page.fill('input[name="name"]', 'NextGen Solutions');
    await locationSelect.selectOption({ value: 'California' });
    await page.fill('input[name="salary"]', '90000');
    await page.fill('textarea[name="overview"]', 'Leading tech solutions.');
    await page.fill('input[name="jobs"]', 'Software Engineer, Data Analyst');
    await page.fill('input[name="contacts"]', 'contact@nextgensolutions.com');
    await page.fill('input[name="category"]', 'Tech');

    // Submit the form
    await page.click('form button[type="submit"]');

    // Optionally, wait for a success confirmation
    await expect(page.locator('text=Company added successfully')).toBeVisible({ timeout: 5000 });
  });
});

