import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';



class ToggleButton extends HTMLElement implements CustomElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get  observedAttributes() {
        return ['class', 'isActive' ];
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
        const isActive = this.getAttribute('isActive') === 'true';
        // make a tiggle button that toggles between two states (right and left) as a circle
        this.shadowRoot!.innerHTML = `   
        <button class="${_class} px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center justify-center">
            <span class="w-6 h-6 bg-white rounded-full ${isActive ? 'translate-x-4' : ''} transition-transform"></span>
            <slot></slot>
        </button> 
    `;
    }
}

customElements.define('toggle-button', ToggleButton);

