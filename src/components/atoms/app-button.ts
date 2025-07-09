import {BaseElement} from '../../core/elements/base-element.ts';


class AppButton extends BaseElement {

    static get observedAttributes() {
        return ['class'];
    }

    connectedCallback(): void {
        super.connectedCallback();
    }


    renderTemplate() {
        const _class = this.getAttribute('class') || '';
        this.shadowRoot!.innerHTML = `   
        <button class="${_class} px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200">
            <slot></slot>
        </button>
    `;
    }
}

customElements.define('app-button', AppButton);

