
import markdownString from '../style.css?inline'

const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(markdownString);
export const globalStyleSheet = cssStyleSheet;
