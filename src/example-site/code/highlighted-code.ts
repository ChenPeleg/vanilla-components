import {BaseElement} from '../../_core/elements/base-element.ts';
import {SyntaxtHighlihter} from './syntaxt-highlihter.ts';


export class HighlightedCode extends BaseElement {
    syntaxtHighlighter = new SyntaxtHighlihter()


    static get observedAttributes() {
        return ['class', 'code'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.update();
    }

    update() {
        this.renderTemplate()
    }

    legacyRender() {
        const rawCode = this.getAttribute('code') || '';
        const styledCode = this.syntaxtHighlighter.applyStylesToHighlightedCode (rawCode)
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
