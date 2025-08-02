import {BaseElement} from '../../_core/elements/base-element.ts';


class CardPanel extends BaseElement {
    connectedCallback() {
        super.connectedCallback();

    }
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <card-component header="Card Header" text="This is a card component"></card-component>
        `;
        this.update();
    }

    update() {

    }
}

customElements.define('card-panel', CardPanel);
