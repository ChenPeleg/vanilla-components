import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';

class PanelState extends HTMLElement implements CustomElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['header', 'text'];
    }

    connectedCallback() {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {

        this.shadowRoot!.innerHTML = `  
        <div class="flex flex-col items-center justify-center p-4 h-96 bg-amber-100">
         <app-button> Click me !</app-button>
        </div>
     
    `;
    }
}

customElements.define('panel-state', PanelState);

