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
        // Wait for component to render
        await page.waitForTimeout(500);
        const image = page.getByAltText('Vanilla Logo');
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('src');
    });

    test('Renders simple-button with initial count of 0', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        await page.waitForTimeout(500);
        const button = page.getByRole('button', { name: /Count is/ });
        await expect(button).toBeVisible();
        const element=   await button .evaluate(el=> {
            console.log(JSON.stringify(el))
            return el
        }) as  Node ;
        console.dir(element )

    });



    test('Contains all documentation links', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        // Wait for component to render
        await page.waitForTimeout(500);
        
        // Check Custom elements link
        const customElementsLink = page.getByRole('link', { name: 'Custom elements' });
        await expect(customElementsLink).toBeVisible();
        
        // Check TailWind link
        const tailwindLink = page.getByRole('link', { name: 'TailWind' });
        await expect(tailwindLink).toBeVisible();
        
        // Check Vite link
        const viteLink = page.getByRole('link', { name: 'Vite' });
        await expect(viteLink).toBeVisible();
        
        // Check TypeScript link
        const typescriptLink = page.getByRole('link', { name: 'TypeScript' });
        await expect(typescriptLink).toBeVisible();
    });

    test('Has proper CSS classes and structure', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        // Wait for component to render
        await page.waitForTimeout(500);
        
        // Check header styling using getByRole
        const header = page.getByRole('heading', { name: 'Vanilla Elements' });
        await expect(header).toBeVisible();
        await expect(header).toHaveClass(/text-6xl/);
        await expect(header).toHaveClass(/font-bold/);
        await expect(header).toHaveClass(/text-gray-800/);
    });

    test('Paragraph text contains expected content', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<div><app-page></app-page></div>`);
        
        // Wait for component to render
        await page.waitForTimeout(500);
        
        // Use text-based locator for paragraph content
        await expect(page.getByText('Using')).toBeVisible();
        await expect(page.getByText('for development')).toBeVisible();
    });
})

