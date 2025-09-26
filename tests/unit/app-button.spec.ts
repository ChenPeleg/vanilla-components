import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';


test.describe('app-button', () => {
    test('renders with correct text', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<app-button id="my-app-button"></app-button>`);
        const button = await page.locator('app-button').locator('button');
        await expect(button).toHaveText('Click Me!');
    });

    test('can be disabled', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<app-button id="my-app-button" disabled="true"></app-button>`);
        const button = await page.locator('app-button').locator('button');
        await expect(button).toBeDisabled();
        await expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    // Optionally, test click event if observable
    // test('click triggers action', async ({ page }) => {
    //     await page.goto('/');
    //     await setPageHtml(page, `<app-button id=\"my-app-button\"></app-button>`);
    //     const button = await page.locator('app-button').locator('button');
    //     // Add logic to observe actionCallback or side effect if possible
    // });
});
