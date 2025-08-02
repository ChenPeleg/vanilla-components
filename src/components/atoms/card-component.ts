import {BaseElement} from '../../_core/elements/base-element.ts';


class CardComponent extends BaseElement {

    static get observedAttributes() {
        return ['header', 'height'];
    }

    renderTemplate() {
        const header = this.getAttribute('header') || '';
        const text = this.getAttribute('text') || '';
        this.shadowRoot!.innerHTML = `  
      <div id="card-root" class="transition-all cursor-pointer max-w-sm rounded overflow-hidden shadow-md hover:shadow-2xl bg-white p-6">
        <h1 id="header" class="font-bold text-xl mb-2">${header}</h1>
        <p class="text-gray-700 text-base">${text}</p>
      </div>
    `;
    }
    update() {
        this.$('#header').textContent =  this.getAttribute('header') || '';
        this.$('#card-root').style.height = this.getAttribute('height') || 'auto';
    }
}

customElements.define('card-component', CardComponent);

