import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

  test('Sign In - Valid Admin Credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/admin');
    expect(page.url()).toBe('http://localhost:3000/admin');
  });

  test('Sign In - Invalid Credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signin');
    await page.fill('input[name="email"]', 'invalid@foo.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('Sign Out', async ({ page }) => {
    // Step 1: Sign in
    await page.goto('http://localhost:3000/auth/signin');
    await page.fill('input[name="email"]', 'admin@foo.com');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/admin');

    // Step 2: Sign out
    await page.goto('http://localhost:3000/auth/signout');
    await page.waitForLoadState('networkidle');

    // Wait for redirect to the home page
    await page.waitForURL('http://localhost:3000/', { timeout: 900000 });

    // Validate that the URL is the home page after sign-out
    expect(page.url()).toBe('http://localhost:3000/');

    // Verify that the login button is visible on the home page
    await expect(page.locator('text=Login')).toBeVisible({ timeout: 900000 });
  });

});