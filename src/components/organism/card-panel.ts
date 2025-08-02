import {BaseElement} from '../../_core/elements/base-element.ts';


class CardPanel extends BaseElement {
    connectedCallback() {
        super.connectedCallback();

    }
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <card-component  header="Card Header" height="420px">
                <p class="text-gray-700 text-base">
                    This is a simple card component that can be used to display content.
                </p>
            </card-component>
        `;
        this.update();
    }

    update() {

    }
}

customElements.define('card-panel', CardPanel);
