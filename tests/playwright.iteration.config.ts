import {defineConfig, devices} from '@playwright/test';
import baseConfig from '../playwright.config';

export default defineConfig({
    ...baseConfig,
    testDir: './',
    outputDir: './test-results/',
    reporter: [['html', {outputFolder: './playwright-report'}]],
    projects: [{
        name: 'chromium',
        use: {...devices['Desktop Chrome']},
    },],

});
