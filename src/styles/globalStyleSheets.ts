import styleUrl from '../style.css?url';

const res = await fetch(styleUrl, {
    headers : {
        'Content-Type': 'text/css'
    }
});
const css = await res.text();

const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(css);
console.log(css);
export const globalStyleSheet = cssStyleSheet;
