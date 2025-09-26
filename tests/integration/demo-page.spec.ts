import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';

test.describe ('Demo page for vanilla components (app-page page)', () => {
    test('See the header of the app-page page', async ({ page }) => {
        await page.goto('/')
        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-page>
                    </app-page> 
                </div`);
        await expect(page.getByRole('heading', { name: 'Vanilla Elements' })).toBeVisible();
    });
})

