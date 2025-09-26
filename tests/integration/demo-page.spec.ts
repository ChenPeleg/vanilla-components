import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';

test.describe ('Demo page for vanilla components (app-page page)', () => {
    test('See the header of the app-page page', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-page>
                    </app-page> 
                </div>`);
        await expect(page.getByRole('heading', { name: 'Vanilla Elements' })).toBeVisible();
    });

    test('Displays the vanilla logo image', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        const image = page.locator('app-page').locator('img[alt="Vanilla Logo"]');
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('src');
    });

    test('Renders simple-button with initial count of 0', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        const button = page.locator('app-page').locator('simple-button');
        await expect(button).toBeVisible();
        await expect(button).toContainText('Count is');
        await expect(button).toContainText('0');
    });

    test('Click counter functionality works', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        // Find the button inside simple-button component
        const simpleButton = page.locator('app-page').locator('simple-button');
        const button = simpleButton.locator('button');
        
        // Initial state should be 0
        await expect(simpleButton).toContainText('0');
        
        // Click once
        await button.click();
        await page.waitForTimeout(100);
        await expect(simpleButton).toContainText('1');
        
        // Click again
        await button.click();
        await page.waitForTimeout(100);
        await expect(simpleButton).toContainText('2');
        
        // Click multiple times
        await button.click();
        await button.click();
        await button.click();
        await page.waitForTimeout(100);
        await expect(simpleButton).toContainText('5');
    });

    test('Contains all documentation links', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        // Check Custom elements link
        const customElementsLink = page.locator('app-page').locator('a[href*="developer.mozilla.org"]');
        await expect(customElementsLink).toBeVisible();
        await expect(customElementsLink).toContainText('Custom elements');
        
        // Check TailWind link
        const tailwindLink = page.locator('app-page').locator('a[href*="tailwindcss.com"]');
        await expect(tailwindLink).toBeVisible();
        await expect(tailwindLink).toContainText('TailWind');
        
        // Check Vite link
        const viteLink = page.locator('app-page').locator('a[href*="vite.dev"]');
        await expect(viteLink).toBeVisible();
        await expect(viteLink).toContainText('Vite');
        
        // Check TypeScript link
        const typescriptLink = page.locator('app-page').locator('a[href*="typecriptlang.org"]');
        await expect(typescriptLink).toBeVisible();
        await expect(typescriptLink).toContainText('TypeScript');
    });

    test('Has proper CSS classes and structure', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        // Check main container has correct classes
        const mainContainer = page.locator('app-page').locator('div.flex.flex-col.items-center.justify-center');
        await expect(mainContainer).toBeVisible();
        
        // Check header styling
        const header = page.getByRole('heading', { name: 'Vanilla Elements' });
        await expect(header).toHaveClass(/text-6xl/);
        await expect(header).toHaveClass(/font-bold/);
        await expect(header).toHaveClass(/text-gray-800/);
    });

    test('Paragraph text contains expected content', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        const paragraph = page.locator('app-page').locator('p');
        await expect(paragraph).toBeVisible();
        await expect(paragraph).toContainText('Using');
        await expect(paragraph).toContainText('and');
        await expect(paragraph).toContainText('for development');
    });
})

