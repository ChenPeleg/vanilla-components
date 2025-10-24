import {BaseElement} from '../../_core/elements/base-element.ts';


export class HighlightedCode extends BaseElement {


    static get observedAttributes() {
        return ['class', 'code'];
    }

    connectedCallback(): void {
        this.update();
    }

    update() {
        this.renderTemplate()
    }

    legacyRender() {
        return `<pre class="bg-gray-800 text-white p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm break-words whitespace-pre-wrap"><code class="break-words">${this.getAttribute('code')}</code></pre>`;

    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `   
        <div class="  bg-gray-800"   >
        abc123
       ${this.legacyRender()}
        </div>
    `;
    }

}

customElements.define('highlighted-code', HighlightedCode);
