import { test, expect } from '@playwright/test';

test.use({
  storageState: 'tests/auth/john-auth.json',
});

test('Student Page - Access and Interaction', async ({ page }) => {
  await page.goto('http://localhost:3000/student');
  await expect(page.getByRole('heading', { name: 'Student Home Page' })).toBeVisible();
  await page.getByText('Student Home PageFull').click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
});
