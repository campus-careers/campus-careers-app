// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/student');
  await page.getByRole('heading', { name: 'Student Home Page' }).click();
  await page.getByText('Student Home PageFull').click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
});
