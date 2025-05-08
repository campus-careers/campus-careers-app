import { test, expect } from '@playwright/test';

test.describe('Student Dashboard Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Step 1: Navigate to Sign-In Page
    await page.goto('https://campus-careers-app.vercel.app/auth/signin');

    // Step 2: Log in as the student
    await page.fill('input[name="email"]', 'john@foo.com');
    await page.fill('input[name="password"]', 'changeme');
    await page.click('button[type="submit"]');

    // Step 3: Wait for the student dashboard to load
    await page.waitForURL('https://campus-careers-app.vercel.app/student', { timeout: 60000 });
  });

  test('Update Profile Information (without photo)', async ({ page }) => {
    // Step 4: Navigate to Student Profile
    await page.goto('https://campus-careers-app.vercel.app/student');
    await page.click('text=Edit Profile');
  });
    
  test('View Student Profile', async ({ page }) => {
    // Step 10: Navigate to the Student Dashboard
    await page.goto('https://campus-careers-app.vercel.app/student', { waitUntil: 'networkidle' });

    // Step 11: Verify the Student Home Page heading
    const heading = page.locator('h2');
    await heading.waitFor({ state: 'visible', timeout: 30000 });
    await expect(heading).toHaveText('Student Home Page');
  });

});

