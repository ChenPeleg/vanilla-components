import {BaseElement} from '../../src/_core/elements/base-element.ts';


class CardComponent extends BaseElement {

    static get observedAttributes() {
        return ['header', 'height'];
    }

    renderTemplate() {
        const header = this.getAttribute('header') || '';
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div id="card-root" 
                 class="transition-all cursor-pointer w-full rounded overflow-hidden shadow-md hover:shadow-2xl bg-white p-6">
                <h1 id="header" class="font-bold text-xl mb-2">${header}</h1>
                <slot></slot>
            </div>
        `;
        this.update()
    }


    update() {
        if (this.$('#card-root')) {
            this.$('#card-root').style.height = this.getAttribute('height') || 'auto';
        }
    }
}

customElements.define('card-component', CardComponent);

