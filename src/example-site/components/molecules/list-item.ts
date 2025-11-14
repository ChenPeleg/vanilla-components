import { BaseElement } from '../../../_core/elements/base-element.ts';

class ListItem extends BaseElement {
    static get observedAttributes() { return ['text', 'id' ]; }

    connectedCallback(): void {
        super.connectedCallback();
        this.renderTemplate();
    }

    renderTemplate() {
         this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4">
               
            </div>
        `;
    }
}

customElements.define('list-item', ListItem);
