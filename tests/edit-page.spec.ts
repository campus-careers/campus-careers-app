// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/edit/1');
  await page.locator('div').filter({ hasText: 'Edit' }).nth(1).click();
  await page.locator('div').filter({ hasText: 'NameSalaryLocationOverviewJobsContactSubmitReset' }).nth(4).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('75000');
  await page.getByRole('button', { name: 'Reset' }).click();
});
