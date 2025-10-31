import {BaseElement} from '../../../_core/elements/base-element.ts';


class Header2 extends BaseElement {
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <h2 class="font-bold text-lg sm:text-xl mb-0">
                <slot></slot>
            </h2>
        `;
        this.update()
    }

}

customElements.define('header-2', Header2);

