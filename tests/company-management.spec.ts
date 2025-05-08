import { test, expect } from '@playwright/test';

test.describe('Company Management Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin before each test
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('https://campus-careers-app.vercel.app/admin', { timeout: 30000 });
  });

  test('Add Company', async ({ page }) => {
    // Step 1: Go to Add Company page
    await page.goto('https://campus-careers-app.vercel.app/admin/add-company');

    // Step 2: Fill out the form
    await page.fill('input[name="name"]', 'NextGen Solutions');
    await page.selectOption('select[name="location"]', 'California');
    await page.fill('input[name="salary"]', '90000');
    await page.fill('textarea[name="overview"]', 'Leading tech solutions.');
    await page.fill('input[name="jobs"]', 'Software Engineer, Data Analyst');
    await page.fill('input[name="contacts"]', 'contact@nextgensolutions.com');
    await page.click('button[type="submit"]');

  });


});
