import { test, expect } from '@playwright/test';

test.use({
  storageState: 'tests/auth/john-auth.json',
});

test('Company Pages - Form and Navigation', async ({ page }) => {
  await page.goto('http://localhost:3000/company');
  await page.getByRole('checkbox', { name: 'Engineering License' }).check();
  await page.locator('input[name="contacts"]').click();
  await page.locator('input[name="contacts"]').fill('company connector team');
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="overview"]').click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('navigation').click();
  await page.getByRole('link', { name: 'Companies' }).click();
});
