import {defineConfig, devices} from '@playwright/test';
import {testConstants} from './tests/_tools/testConstants';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// @ts-ignore
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    outputDir: './tests/test-results/',


    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', {outputFolder: 'tests/playwright-report'}]],
    use: {
        baseURL: `http://localhost:${testConstants.port}`,
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [{
        name: 'chromium',
        use: {...devices['Desktop Chrome']},
    },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },

        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },

        /* Test against mobile viewports. */
        {
          name: 'Mobile Chrome',
          use: { ...devices['iPhone 15'] },
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 7 landscape'] },
        },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    webServer: [{
        command: 'npm run e2e:test-server',
        url: `http://localhost:${testConstants.port}`,
        reuseExistingServer: !process.env.CI,
    }],
});
