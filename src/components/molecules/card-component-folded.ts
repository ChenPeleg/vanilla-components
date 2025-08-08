import {BaseElement} from '../../_core/elements/base-element.ts';


class CardComponentFolded extends BaseElement {

    static get observedAttributes() {
        return ['header', 'folded-height' ];
    }

    renderTemplate() {
        const header = this.getAttribute('header') || '';
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <card-component id="card-component-root" header="${this.getAttribute('header')}"  >
                <slot></slot>
            </card-component>
        `;
        this.update()
    }


    update() {
        if (this.$('#card-component-root')) {
            this.$('#card-component-root').style.height = this.getAttribute('height') || 'auto';
        }
    }
}

customElements.define('card-component-folded', CardComponentFolded);

