import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';

declare global {
    interface Window {
        __appButtonCallbackResult?: any;
    }
}

test.describe('app-button', () => {
    test('renders with correct text', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<app-button id="my-app-button"></app-button>`);
        const button = page.getByRole('button')
        await expect(button).toHaveText('Click Me!');
    });

    test('can be disabled', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<app-button id="my-app-button" disabled="true"></app-button>`);
        const button = page.getByRole('button')
        await expect(button).toBeDisabled();
        await expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('calls actionCallback on click', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<app-button id="my-app-button"></app-button>`);
        await page.evaluate(() => {
            window.__appButtonCallbackResult = null;
            const btn = document.getElementById('my-app-button') as HTMLElement & { actionCallback?: (data: any) => void };
            if (btn) {
                btn.actionCallback = (data: any) => { window.__appButtonCallbackResult = data; };
            }
        });
        const button =page.getByRole('button')
        await button.click();
        await page.waitForTimeout(100);
        const result = await page.evaluate(() => window.__appButtonCallbackResult);
        expect(result).toEqual({clicked: true});
    });
});
