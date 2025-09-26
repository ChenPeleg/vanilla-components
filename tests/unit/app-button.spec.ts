import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';

test('has title 2', async ({ page }) => {

    await page.goto('/')
    await setPageHtml (page, `<app-button id="my-app-button"></app-button>`);
    const header = await page.getByRole('heading').innerText();
    expect(header).toBe('Smoke test page');

});

