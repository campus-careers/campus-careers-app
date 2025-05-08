import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  timeout: 60000, // Global timeout set to 60 seconds
  expect: {
    timeout: 10000, // Expect timeout for slower responses
  },
  use: {
    baseURL: process.env.CI ? 'https://campus-careers-app.vercel.app' : 'https://campus-careers-app.vercel.app', // Corrected baseURL
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
    headless: true,  // Enforce headless mode globally
    storageState: process.env.CI ? 'tests/auth/john-auth.json' : 'tests/auth/john-auth.json',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'https://campus-careers-app.vercel.app',
    reuseExistingServer: true,
  },
});
