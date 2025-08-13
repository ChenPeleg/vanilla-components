import {BaseElement} from '../../src/_core/elements/base-element.ts';


class Header1 extends BaseElement {
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <h1 class="font-agbalumo text-3xl font-bold text-gray-800 mt-4 text-center">
                <slot></slot>
            </h1>
        `;
        this.update()
    }
}

customElements.define('header-1', Header1);

