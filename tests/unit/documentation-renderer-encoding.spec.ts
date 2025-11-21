import { test, expect } from '@playwright/test';
import { setPageHtml } from '../_tools/setPageHtml';

test.describe('DocumentationRenderer HTML Attribute Encoding', () => {
    test('should properly encode special characters in code attributes', async ({ page }) => {
        await page.goto('/');
        
        // Create a documentation renderer with code containing special characters
        await setPageHtml(page, `
            <documentation-renderer id="test-renderer"></documentation-renderer>
        `);
        
        // Set the docs using evaluate instead of inline script
        await page.evaluate(() => {
            const renderer = document.getElementById('test-renderer') as any;
            const docs = [
                {
                    content: "class DynamicCard extends BaseElement { static get observedAttributes() { return ['title', 'color', 'visible']; } }",
                    type: 'highlightedCode'
                }
            ];
            renderer.docs = docs;
        });
        
        // Wait for the component to render
        await page.waitForTimeout(500);
        
        // Get the highlighted-code element from shadow DOM
        const highlightedCodeElement = await page.locator('#test-renderer').evaluate((el) => {
            const highlightedCode = el.shadowRoot?.querySelector('highlighted-code');
            return highlightedCode?.getAttribute('code') || '';
        });
        
        // Verify the decoded attribute value contains the full array syntax
        expect(highlightedCodeElement).toContain("['title', 'color', 'visible']");
        expect(highlightedCodeElement).toContain('return');
        expect(highlightedCodeElement).toContain('observedAttributes');
    });

    test('should handle code with brackets and quotes without truncation', async ({ page }) => {
        await page.goto('/');
        
        await setPageHtml(page, `
            <documentation-renderer id="test-renderer"></documentation-renderer>
        `);
        
        await page.evaluate(() => {
            const renderer = document.getElementById('test-renderer') as any;
            const docs = [
                {
                    content: "const array = ['one', 'two', 'three'];",
                    type: 'highlightedCode'
                }
            ];
            renderer.docs = docs;
        });
        
        await page.waitForTimeout(500);
        
        // Get the code attribute value from the highlighted-code element
        const codeAttributeValue = await page.locator('#test-renderer').evaluate((el) => {
            const highlightedCode = el.shadowRoot?.querySelector('highlighted-code');
            return highlightedCode?.getAttribute('code') || '';
        });
        
        // Verify the full code is preserved
        expect(codeAttributeValue).toBe("const array = ['one', 'two', 'three'];");
        expect(codeAttributeValue).toContain("['one', 'two', 'three']");
    });

    test('should handle code with less-than and greater-than signs', async ({ page }) => {
        await page.goto('/');
        
        await setPageHtml(page, `
            <documentation-renderer id="test-renderer"></documentation-renderer>
        `);
        
        await page.evaluate(() => {
            const renderer = document.getElementById('test-renderer') as any;
            const docs = [
                {
                    content: "if (x < 5 && y > 10) { return true; }",
                    type: 'highlightedCode'
                }
            ];
            renderer.docs = docs;
        });
        
        await page.waitForTimeout(500);
        
        // Get the decoded attribute value
        const codeAttributeValue = await page.locator('#test-renderer').evaluate((el) => {
            const highlightedCode = el.shadowRoot?.querySelector('highlighted-code');
            return highlightedCode?.getAttribute('code') || '';
        });
        
        // Verify the decoded value has the original characters
        expect(codeAttributeValue).toBe("if (x < 5 && y > 10) { return true; }");
    });

    test('should handle code with double quotes', async ({ page }) => {
        await page.goto('/');
        
        await setPageHtml(page, `
            <documentation-renderer id="test-renderer"></documentation-renderer>
        `);
        
        await page.evaluate(() => {
            const renderer = document.getElementById('test-renderer') as any;
            const docs = [
                {
                    content: 'const message = "Hello World";',
                    type: 'highlightedCode'
                }
            ];
            renderer.docs = docs;
        });
        
        await page.waitForTimeout(500);
        
        // Get the decoded attribute value
        const codeAttributeValue = await page.locator('#test-renderer').evaluate((el) => {
            const highlightedCode = el.shadowRoot?.querySelector('highlighted-code');
            return highlightedCode?.getAttribute('code') || '';
        });
        
        // Verify the decoded value has the original double quotes
        expect(codeAttributeValue).toBe('const message = "Hello World";');
    });

    test('should handle code with ampersands', async ({ page }) => {
        await page.goto('/');
        
        await setPageHtml(page, `
            <documentation-renderer id="test-renderer"></documentation-renderer>
        `);
        
        await page.evaluate(() => {
            const renderer = document.getElementById('test-renderer') as any;
            const docs = [
                {
                    content: 'if (a && b) { return a & b; }',
                    type: 'highlightedCode'
                }
            ];
            renderer.docs = docs;
        });
        
        await page.waitForTimeout(500);
        
        // Get the decoded attribute value
        const codeAttributeValue = await page.locator('#test-renderer').evaluate((el) => {
            const highlightedCode = el.shadowRoot?.querySelector('highlighted-code');
            return highlightedCode?.getAttribute('code') || '';
        });
        
        // Verify the decoded value has the original ampersands
        expect(codeAttributeValue).toBe('if (a && b) { return a & b; }');
    });

    test('should render the DynamicCard example correctly', async ({ page }) => {
        await page.goto('/');
        
        // Test the actual DynamicCard code snippet from the tutorial
        const dynamicCardCode = `class DynamicCard extends BaseElement {
    static get observedAttributes() {
        return ['title', 'color', 'visible'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        this.update();
    }

    update() {
        const title = this.getAttribute('title') || 'Default Title';
        const color = this.getAttribute('color') || 'blue';
        const visible = this.getAttribute('visible') !== 'false';
        
        if (!visible) {
            this.shadowRoot!.innerHTML = '';
            return;
        }
        
        this.shadowRoot!.innerHTML = \\\`
            <div class="p-4 bg-\\\${color}-100 rounded-lg">
                <h3 class="text-xl font-bold">\\\${title}</h3>
            </div>
        \\\`;
    }

    renderTemplate() {
        this.update();
    }
}`;

        await setPageHtml(page, `
            <documentation-renderer id="test-renderer"></documentation-renderer>
        `);
        
        await page.evaluate((code) => {
            const renderer = document.getElementById('test-renderer') as any;
            const docs = [
                {
                    content: code,
                    type: 'highlightedCode'
                }
            ];
            renderer.docs = docs;
        }, dynamicCardCode);
        
        await page.waitForTimeout(500);
        
        // Get the code attribute value
        const codeAttributeValue = await page.locator('#test-renderer').evaluate((el) => {
            const highlightedCode = el.shadowRoot?.querySelector('highlighted-code');
            return highlightedCode?.getAttribute('code') || '';
        });
        
        // Verify key parts of the code are present and not truncated
        expect(codeAttributeValue).toContain("return ['title', 'color', 'visible'];");
        expect(codeAttributeValue).toContain('observedAttributes()');
        expect(codeAttributeValue).toContain('attributeChangedCallback');
        expect(codeAttributeValue).toContain('renderTemplate()');
        
        // Verify the array is complete with closing bracket and semicolon
        expect(codeAttributeValue).toMatch(/\['title',\s*'color',\s*'visible'\];/);
    });
});
