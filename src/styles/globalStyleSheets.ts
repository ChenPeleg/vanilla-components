
const res = await fetch(new URL('../style.css', import.meta.url))

const css = await res.text();

const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(css);
console.log(css);
export const globalStyleSheet = cssStyleSheet;
