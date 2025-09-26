import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';

test('has title 2', async ({ page }) => {
  await page.goto('https://playwright.dev/');
    await page.goto('/')
    await setPageHtml (page, ``);
    const header = await page.getByRole('heading').innerText();
    expect(header).toBe('Smoke test page');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

