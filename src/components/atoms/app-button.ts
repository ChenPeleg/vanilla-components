import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';



class AppButton extends HTMLElement implements CustomElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get  observedAttributes() {
        return ['class' ];
    }

    connectedCallback(): void {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.render();
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.render();
    }

    render() {
        const _class = this.getAttribute('class') || '';
        this.shadowRoot!.innerHTML = `   
        <button class="${_class} px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200">
            <slot></slot>
        </button>
    `;
    }
}

customElements.define('app-button', AppButton);

