import {defineConfig, devices} from '@playwright/test';
import {testConstants} from './tests/_tools/testConstants';


export default defineConfig({
    testDir: 'tests',
    outputDir: 'tests/test-results/',
    reporter: [['html', {outputFolder: 'tests/playwright-report'}]],
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    use: {
        baseURL: `http://localhost:${testConstants.port}`,
        trace: 'on-first-retry',
    },

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
        {
          name: 'Mobile Chrome',
          use: { ...devices['iPhone 15'] },
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 7 landscape'] },
        },

    ],

    webServer: [{
        command: 'npm run e2e:test-server',
        url: `http://localhost:${testConstants.port}`,
        reuseExistingServer: !process.env.CI,
    }],
});
