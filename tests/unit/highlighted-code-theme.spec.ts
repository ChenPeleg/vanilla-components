import { test, expect } from '@playwright/test';
import { setPageHtml } from '../_tools/setPageHtml';

test.describe('HighlightedCode Component Theme Support', () => {
    test('highlighted-code component accepts theme attribute', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `
            <highlighted-code theme="faded" code="const x = 5;"></highlighted-code>
        `);
        
        // Get the component and wait for it to be attached
        const component = page.locator('highlighted-code');
        await component.waitFor({ state: 'attached' });
        
        // Verify the theme attribute is set
        const theme = await component.getAttribute('theme');
        expect(theme).toBe('faded');
    });

    test('highlighted-code with faded theme renders with faded colors', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `
            <highlighted-code theme="faded" code="const x = 5;"></highlighted-code>
        `);
        
        // Wait for the component to be attached
        const component = page.locator('highlighted-code');
        await component.waitFor({ state: 'attached' });
        
        // Check shadow DOM content for faded colors
        const shadowContent = await component.evaluate((el) => {
            return el.shadowRoot?.innerHTML || '';
        });
        
        // Should contain text-blue-300 (faded keyword color) instead of text-blue-500
        expect(shadowContent).toContain('text-blue-300');
    });

    test('highlighted-code with bold theme renders with bold colors', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `
            <highlighted-code theme="bold" code="const x = 5;"></highlighted-code>
        `);
        
        const component = page.locator('highlighted-code');
        await component.waitFor({ state: 'attached' });
        
        const shadowContent = await component.evaluate((el) => {
            return el.shadowRoot?.innerHTML || '';
        });

        expect(shadowContent).toContain('text-blue-500');
    });

    test('highlighted-code defaults to faded theme when no theme specified', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `
            <highlighted-code code="const x = 5;"></highlighted-code>
        `);
        
        const component = page.locator('highlighted-code');
        await component.waitFor({ state: 'attached' });
        
        const shadowContent = await component.evaluate((el) => {
            return el.shadowRoot?.innerHTML || '';
        });
        
        // Should contain text-blue-300 (faded keyword color) instead of text-blue-500
        expect(shadowContent).toContain('text-blue-300');
    });

    test('highlighted-code theme can be changed dynamically', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `
            <highlighted-code id="test-code" theme="bold" code="const x = 5;"></highlighted-code>
        `);
        
        const component = page.locator('#test-code');
        await component.waitFor({ state: 'attached' });
        
        // Get initial shadow content
        let shadowContent = await component.evaluate((el) => {
            return el.shadowRoot?.innerHTML || '';
        });
        expect(shadowContent).toContain('text-blue-500');

        // Change theme to faded
        await component.evaluate((el) => {
            el.setAttribute('theme', 'faded');
        });
        
        // Wait a bit for the update
        await page.waitForTimeout(100);
        
        // Get updated shadow content
        shadowContent = await component.evaluate((el) => {
            return el.shadowRoot?.innerHTML || '';
        });
        expect(shadowContent).toContain('text-blue-300');
    });
});
