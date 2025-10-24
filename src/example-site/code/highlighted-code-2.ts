import {BaseElement} from '../../_core/elements/base-element.ts';


export class HighlightedCode2 extends BaseElement {
    renderTemplate() {
        this.shadowRoot!.innerHTML = `   
        <div class="  bg-gray-800 border-e-yellow-300 w-24 h-10"   >
        abc123
      
        </div>
    `;
    }
}

customElements.define('highlighted-code2', HighlightedCode2);
