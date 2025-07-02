
import markdownString from '../generated/generated-tailwind.css?raw'

const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(markdownString);
export const globalStyleSheet = cssStyleSheet;
