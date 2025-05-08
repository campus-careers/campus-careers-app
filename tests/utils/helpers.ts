import { Page, Locator } from '@playwright/test';

/**
 * Logs in to the application using provided credentials.
 * @param page - Playwright Page object
 * @param email - User email
 * @param password - User password
 */
export async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/'); // Wait for redirection after login
}

/**
 * Fills a text input field with the given value.
 * @param locator - Playwright Locator object
 * @param value - Text to fill
 */
export async function fillInput(locator: Locator, value: string): Promise<void> {
  await locator.click();
  await locator.fill(value);
}

/**
 * Selects an option from a dropdown menu.
 * @param locator - Playwright Locator object
 * @param option - Option to select
 */
export async function selectDropdownOption(locator: Locator, option: string): Promise<void> {
  await locator.selectOption({ label: option });
}

/**
 * Checks a checkbox if not already checked.
 * @param locator - Playwright Locator object
 */
export async function checkCheckbox(locator: Locator): Promise<void> {
  if (!(await locator.isChecked())) {
    await locator.check();
  }
}

/**
 * Unchecks a checkbox if it is checked.
 * @param locator - Playwright Locator object
 */
export async function uncheckCheckbox(locator: Locator): Promise<void> {
  if (await locator.isChecked()) {
    await locator.uncheck();
  }
}

/**
 * Clicks a button by its label.
 * @param page - Playwright Page object
 * @param label - Button text or aria-label
 */
export async function clickButton(page: Page, label: string): Promise<void> {
  await page.click(`button:has-text("${label}")`);
}

/**
 * Waits for a page to load completely by URL.
 * @param page - Playwright Page object
 * @param url - Expected URL after navigation
 */
export async function waitForPageLoad(page: Page, url: string): Promise<void> {
  await page.waitForURL(url);
}

/**
 * Navigate to a specific page.
 * @param page - Playwright Page object
 * @param path - Path to navigate to
 */
export async function navigateTo(page: Page, path: string): Promise<void> {
  await page.goto(path);
}

/**
 * Assert that an element is visible on the page.
 * @param locator - Playwright Locator object
 * @param message - Message to display if assertion fails
 */
export async function assertVisible(locator: Locator, message: string): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  if (!(await locator.isVisible())) {
    throw new Error(`Visibility Assertion Failed: ${message}`);
  }
}
