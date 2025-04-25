// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/company');
  await page.getByRole('checkbox', { name: 'Engineering License' }).check();
  await page.locator('input[name="contacts"]').click();
  await page.locator('input[name="contacts"]').fill('company connector team');
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="overview"]').click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('main').click();
  await page.getByRole('navigation').click();
  await page.getByRole('link', { name: 'Companies' }).click();
});
