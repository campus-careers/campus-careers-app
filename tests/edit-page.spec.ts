import { test, expect } from '@playwright/test';

test.use({
  storageState: 'tests/auth/john-auth.json',
});

test('Edit Page - Update Salary', async ({ page }) => {
  await page.goto('http://localhost:3000/edit/1');
  await page.locator('div').filter({ hasText: 'Edit' }).nth(1).click();
  await page.locator('div').filter({ hasText: 'NameSalaryLocationOverviewJobsContactSubmitReset' }).nth(4).click();
  await page.getByRole('spinbutton').fill('75000');
  await page.getByRole('button', { name: 'Reset' }).click();
});
