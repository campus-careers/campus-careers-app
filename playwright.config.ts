import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if test.only is left in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Use HTML reporter for better visualization */
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  /* Shared settings for all projects */
  use: {
    /* Base URL for easier navigation in tests */
    baseURL: process.env.CI ? 'http://127.0.0.1:3000' : 'http://localhost:3000',

    /* Trace for failed tests */
    trace: 'on-first-retry',
    /* Take screenshots only on failure */
    screenshot: 'only-on-failure',
    /* Record video only when a retry is attempted */
    video: 'retry-with-video',
  },

  /* Projects for different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Enable Firefox and WebKit only for local development, not CI
    ...(process.env.CI ? [] : [
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ]),
  ],

  /* Start local server before tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
