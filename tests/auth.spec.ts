import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

  test('Sign In - Valid Admin Credentials', async ({ page }) => {
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('https://campus-careers-app.vercel.app/admin');
    expect(page.url()).toBe('https://campus-careers-app.vercel.app/admin');
  });

  test('Sign In - Invalid Credentials', async ({ page }) => {
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'invalid@foo.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('Sign Out', async ({ page }) => {
    // Step 1: Sign in
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('https://campus-careers-app.vercel.app/admin');

    // Step 2: Sign out
    await page.goto('https://campus-careers-app.vercel.app/auth/signout');
    await page.waitForLoadState('networkidle');

    // Wait for redirect to the home page
    await page.waitForURL('https://campus-careers-app.vercel.app/', { timeout: 900000 });

    // Validate that the URL is the home page after sign-out
    expect(page.url()).toBe('https://campus-careers-app.vercel.app/');

    // Verify that the login button is visible on the home page
    await expect(page.locator('text=Login')).toBeVisible({ timeout: 900000 });
  });

});