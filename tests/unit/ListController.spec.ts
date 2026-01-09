import { test, expect } from '@playwright/test';
import { setPageHtml } from '../_tools/setPageHtml';

// We need to declare the ListController properties on HTMLElement or similar to satisfy TS in evaluate
declare global {
    interface HTMLElement {
        items?: any[];
        renderer?: (item: any) => HTMLElement;
        keyExtractor?: (item: any) => string;
        updater?: (element: HTMLElement, item: any) => void;
    }
}

test.describe('list-controller', () => {
    test('renders items correctly', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<list-controller id="list"></list-controller>`);
        
        await page.evaluate(() => {
            const list = document.getElementById('list') as any;
            list.items = ['A', 'B', 'C'];
        });

        const list = page.locator('#list');
        // Items are in shadowDOM. We need to look inside.
        // BaseElement attaches shadow: open.
        // Locator for shadow items:
        const firstItem = list.locator('div >> nth=0');
        const secondItem = list.locator('div >> nth=1');

        await expect(firstItem).toHaveText('A');
        await expect(secondItem).toHaveText('B');
    });

    test('updates items reusing nodes', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<list-controller id="list"></list-controller>`);
        
        await page.evaluate(() => {
            const list = document.getElementById('list') as any;
            
            // Setup custom renderer to track IDs
            list.renderer = (item: any) => {
                const div = document.createElement('div');
                div.id = `item-${item.id}`;
                div.textContent = item.text;
                return div;
            };
            list.keyExtractor = (item: any) => item.id;
            
            list.items = [
                { id: '1', text: 'One' },
                { id: '2', text: 'Two' }
            ];
        });

        const item1 = page.locator('#list').locator('#item-1');
        await expect(item1).toHaveText('One');

        // Update item 1
        await page.evaluate(() => {
            const list = document.getElementById('list') as any;
            
            // Mark the element to verify reuse
            const el1 = list.shadowRoot.getElementById('item-1');
            el1.dataset.modified = 'true';

            list.updater = (el: HTMLElement, item: any) => {
                el.textContent = item.text;
            };

            list.items = [
                { id: '1', text: 'One Updated' },
                { id: '3', text: 'Three' }
            ];
        });

        // Check content update
        await expect(item1).toHaveText('One Updated');
        // Check reuse (dataset should persist)
        await expect(item1).toHaveAttribute('data-modified', 'true');
        
        // Element 2 should be gone
        const item2 = page.locator('#list').locator('#item-2');
        await expect(item2).toHaveCount(0);
    });

    test('reorders items', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<list-controller id="list"></list-controller>`);
        
        await page.evaluate(() => {
            const list = document.getElementById('list') as any;
            list.renderer = (item: string) => {
                const div = document.createElement('div');
                div.id = item;
                div.textContent = item;
                return div;
            };
            
            list.items = ['A', 'B', 'C'];
        });

        // Swap B and C
        await page.evaluate(() => {
            const list = document.getElementById('list') as any;
            list.items = ['A', 'C', 'B'];
        });

        // Verify order in DOM
        // We can get all text contents
        const texts = await page.locator('#list div').allTextContents();
        expect(texts).toEqual(['A', 'C', 'B']);
    });
});
