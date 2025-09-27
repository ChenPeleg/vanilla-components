import {defineConfig, devices} from '@playwright/test';
import {testConstants} from './tests/_tools/testConstants';


export default defineConfig({
    testDir: 'tests',
    outputDir: 'tests/test-results/',
    reporter: [['html', {outputFolder: 'tests/playwright-report', open: 'never'}]],
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
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },

    ],

    webServer: [{
        command: 'npm run e2e:test-server',
        url: `http://localhost:${testConstants.port}`,
        reuseExistingServer: !process.env.CI,
    }],
});
