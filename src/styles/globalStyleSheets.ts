
import markdownString from '../generated/tailwind-input.css?raw'
const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(markdownString);
export const globalStyleSheet = cssStyleSheet;
