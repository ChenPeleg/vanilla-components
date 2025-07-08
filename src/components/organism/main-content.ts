import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';

class MainContent extends HTMLElement implements CustomElement {
    static get observedAttributes() {
        return ['header', 'text'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const header = this.getAttribute('header') || '';
        const text = this.getAttribute('text') || '';
        this.shadowRoot!.innerHTML = `  
      <div class="  overflow-hidden   bg-teal-200 p-6 w-full h-full">
        <div class="font-bold text-xl mb-2">${header}</div>
        <p class="text-gray-700 text-base">${text}</p>
      </div>
    `;
    }
}

customElements.define('main-content', MainContent);

