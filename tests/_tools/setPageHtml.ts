
import  type {Page} from '@playwright/test';

export const setPageHtml = async (page: Page , htmlToReplace : string  ) => {
   return  page.getByTestId('harness-root-div').evaluate((el, html ) => {
        el.innerHTML = html;
    }, htmlToReplace);
}
