import {globalStyleSheet} from '../../common/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';

class AppRoot extends HTMLElement implements CustomElement {
    static get observedAttributes() {
        return [ ];
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
      <div class="h-screen w-screen">
         <nav-bar></nav-bar>
         <main-content></main-content>
      </div>
    `;
    }
}

customElements.define('app-root', AppRoot);

