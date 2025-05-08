import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: process.env.CI ? 'https://campus-careers-app.vercel.app' : 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: true,  // Always run in headless mode in CI
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: true },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'https://campus-careers-app.vercel.app',
    reuseExistingServer: !process.env.CI,
  },
});

