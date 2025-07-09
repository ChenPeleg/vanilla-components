import {BaseElement} from '../../base/base-element.ts';


class CardComponent extends BaseElement {


    static get observedAttributes() {
        return ['header', 'text'];
    }


    renderTemplate() {
        const header = this.getAttribute('header') || '';
        const text = this.getAttribute('text') || '';
        this.shadowRoot!.innerHTML = `  
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
        <div class="font-bold text-xl mb-2">${header}</div>
        <p class="text-gray-700 text-base">${text}</p>
      </div>
    `;
    }
}

customElements.define('card-component', CardComponent);

