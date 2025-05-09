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
  await page.goto('http://localhost:3000/admin/add-company');

  await page.waitForSelector('form button[type="submit"]');

  const locationSelect = page.locator('select[name="location"]');
  await locationSelect.waitFor({ state: 'visible', timeout: 10000 });

  await page.fill('input[name="name"]', 'NextGen Solutions');
  await page.selectOption('select[name="location"]', 'California');
  await page.fill('input[name="salary"]', '90000');
  await page.fill('textarea[name="overview"]', 'Leading tech solutions.');
  await page.fill('input[name="jobs"]', 'Software Engineer, Data Analyst');
  await page.fill('input[name="contacts"]', 'contact@nextgensolutions.com');
  await page.fill('input[name="category"]', 'Tech');

  // Submit the form
  await page.click('button[type="submit"]');
});

});
