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

        this.shadowRoot!.innerHTML = `  
      <div class="  overflow-hidden   bg-teal-200 p-6 w-full h-full">
       <logo-component  ></logo-component>
      </div>
    `;
    }
}

customElements.define('main-content', MainContent);

