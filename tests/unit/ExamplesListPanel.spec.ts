import { test, expect } from '@playwright/test';
import { setPageHtml } from '../_tools/setPageHtml';

test.describe('examples-lists-panel', () => {
    test('renders initial items using list-controller', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<examples-lists-panel></examples-lists-panel>`);
        
        const panel = page.locator('examples-lists-panel');
        const listController = panel.locator('list-controller');
        
        await expect(listController).toBeVisible(); // Should be there

        // Check if items are rendered inside list-controller's shadow root (or however ListController renders)
        // ListController renders into its own shadowRoot.
        // We can inspect the text content of the list items.
        
        // Wait for hydration/rendering
        await page.waitForTimeout(100);

        const listItems = listController.locator('list-item');
        await expect(listItems).toHaveCount(3);
        
        await expect(listItems.nth(0)).toHaveAttribute('text', 'buy milk');
        await expect(listItems.nth(1)).toHaveAttribute('text', 'walk the dog');
        await expect(listItems.nth(2)).toHaveAttribute('text', 'do the laundry');
    });

    test('deletes an item when trash button is clicked', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<examples-lists-panel></examples-lists-panel>`);
        
        const panel = page.locator('examples-lists-panel');
        const listController = panel.locator('list-controller');
        
        // Wait for rendering
        await page.waitForTimeout(100);

        const firstItem = listController.locator('list-item').first();
        await expect(firstItem).toHaveAttribute('text', 'buy milk');

        // Click the trash button inside the first item. 
        // ListItem has a shadow root, so we need to go inside.
        // The button has id="trash-button"
        const trashBtn = firstItem.locator('#trash-button'); // This might need to look into shadow DOM if locator doesn't automatically
        
        // Playwright locator chaining for shadow DOM usually works if configured, 
        // but explicit shadow locator might be safer if standardized.
        // Let's rely on Playwright's ability to pierce shadow DOM if simple selectors don't work, 
        // but here we are chaining locators. `firstItem` points to the custom element.
        // Inside it is shadow DOM. `locator('#trash-button')` should find it if piercing is on or we use >>
        
        // Try strict shadow selection
        await firstItem.locator('button#trash-button').click();

        // Expect item to be gone
        await expect(listController.locator('list-item')).toHaveCount(2);
        await expect(firstItem).toBeHidden();
        
        // Check remaining items
        const newFirstItem = listController.locator('list-item').first();
        await expect(newFirstItem).toHaveAttribute('text', 'walk the dog');
    });
});
