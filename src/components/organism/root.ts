import {globalStyleSheet} from '../../_core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../_core/elements/CustomElement.ts';

class AppRoot extends HTMLElement implements CustomElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return [];
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
      <div class="h-screen w-screen overflow-hidden "> 
         <nav-bar></nav-bar>
         <main-content></main-content>
      </div>
    `;
    }
}

customElements.define('app-root', AppRoot);

