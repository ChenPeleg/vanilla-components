import {BaseElement} from '../../_core/elements/base-element.ts';


class CardComponent extends BaseElement {


    static get observedAttributes() {
        return ['header', 'text'];
    }


    renderTemplate() {
        const header = this.getAttribute('header') || '';
        const text = this.getAttribute('text') || '';
        this.shadowRoot!.innerHTML = `  
      <div class="transition-all cursor-pointer max-w-sm rounded overflow-hidden shadow-md hover:shadow-2xl bg-white p-6">
        <div class="font-bold text-xl mb-2">${header}</div>
        <p class="text-gray-700 text-base">${text}</p>
      </div>
    `;
    }
}

customElements.define('card-component', CardComponent);

