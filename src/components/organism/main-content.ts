import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../base/CustomElement.ts';

class MainContent extends HTMLElement implements CustomElement {
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
       <main class="overflow-hidden bg-slate-200  w-full h-full">
       <div class="flex flex-row   justify-center h-full">
           <div class="flex-1 bg-amber-200 flex flex-col items-center justify-center">
             <card-component header="Card Header" text="This is a card component"></card-component>
           </div>
           <div class="flex-1 bg-green-400"> 
             <logo-component></logo-component>
           </div>
           <div class="flex-1 bg-blue-300">
            
         </div> 
       </div>
      </main>
    `;
    }
}

customElements.define('main-content', MainContent);

