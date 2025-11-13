import {BaseElement} from '../../_core/elements/base-element.ts';
import {Highlighter, type ColorTheme} from './syntax-highlighter.ts';


export class HighlightedCode extends BaseElement {
    syntaxHighlighter: Highlighter;

    constructor() {
        super();
        this.syntaxHighlighter = new Highlighter('faded');
    }

    static get observedAttributes() {
        return ['class', 'code', 'theme'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.updateTheme();
        this.update();
    }

    updateTheme() {
        const theme = this.getAttribute('theme') as ColorTheme | null;
        if (theme === 'bold' || theme === 'calm' || theme === 'faded') {
            this.syntaxHighlighter = new Highlighter(theme);
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        if (name === 'theme') {
            this.updateTheme();
        }
        this.update();
    }

    update() {
        this.renderTemplate();
    }

    legacyRender() {
        const rawCode = this.getAttribute('code') || '';
        const styledCode = this.syntaxHighlighter.highlightCode(rawCode);
        return `<pre class="bg-gray-800 text-white p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm break-words whitespace-pre-wrap"><code class="break-words">${styledCode}</code></pre>`;

    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `   
        <div class="  bg-gray-800"   > 
       ${this.legacyRender()}
        </div>
    `;
    }

}

customElements.define('highlighted-code', HighlightedCode);
