import {expect, test} from '@playwright/test';
import  {readFileSync} from 'fs';
import {resolve} from 'path';
import {setPageHtml} from '../_tools/setPageHtml';


const htmlSnippets = `  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center">
    <header class="w-full py-6 bg-white shadow-md flex justify-center">
      <h1 class="text-3xl font-bold text-indigo-700">Smoke test page</h1>
    </header>
    <main class="flex flex-col items-center mt-12">
      <p class="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Creative Space</p>
      <p class="text-gray-600 mb-8 max-w-xl text-center">
        Discover, sketch, and paint with inspiration. Explore our gallery and start your artistic journey today.
      </p>
      <a href="#" class="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Get Started</a>
    </main>
    <footer class="mt-16 text-gray-500 text-sm">&copy; 2025 Painter & Figure</footer>
  </div>`
test.describe('Html smoke test', () => {

    test('Loading Html and getting title', async ({page}) => {
        const __dirname =  resolve();
        const htmlPath = resolve(__dirname, 'tests/html/index.html');
        const html =  readFileSync(htmlPath, 'utf-8');
        await page.setContent(html);
        const title = await page.title();
        expect(title).toBe('Test Application');
    })
    test('Loading Html and setting inner html', async ({page}) => {
        await page.goto('/')
        await setPageHtml (page, htmlSnippets);
        const header = await page.getByRole('heading').innerText();
        expect(header).toBe('Smoke test page');
    })
    test('Test can pierce shadow dom', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, //language=HTML
            `
                <div>
                    <button id="light-dom-button"> Light Button </button> 
                    <simple-button id="shadow-dom-button"> Shadow Button </simple-button>
                </div>`);
        const lightDomButton = page.getByRole('button', { name: 'Light Button' });
        const shadowDomButtonInner = page.getByRole('button' , { name: 'Shadow Button' });

        await expect(lightDomButton).toBeVisible();
        await expect(shadowDomButtonInner).toBeVisible();
        expect((await shadowDomButtonInner.allInnerTexts()).join('')).toBe('Shadow Button');

    });
})
