import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';
import vanillaLogo from '../../assets/images/vanilla-logo.png';

class LogoComponent extends HTMLElement implements CustomElement {
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
        <div class="flex flex-col items-center justify-center p-4">
        <img src="${vanillaLogo}" alt="Vaniall Logo" class="w-24 h-24 mb-4">
         
        </div>
     
    `;
    }
}

customElements.define('logo-component', LogoComponent);

