
import markdownString from '../css/generated-tailwind.css?raw'

const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(markdownString);
export const globalStyleSheet = cssStyleSheet;
