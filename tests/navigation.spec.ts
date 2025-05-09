import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Sign in as admin before each navigation test
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('https://campus-careers-app.vercel.app/admin');
  });

  test('Home Page Navigation', async ({ page }) => {
    await page.goto('https://campus-careers-app.vercel.app/');
    await page.waitForSelector('text=Explore Company Profiles', { timeout: 900000 });
    await page.click('text=Explore Company Profiles');
    await expect(page).toHaveURL('https://campus-careers-app.vercel.app/', { timeout: 900000 });
  });

});