import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import type {CustomElement} from '../../core/elements/CustomElement.ts';

class NavigationBar extends HTMLElement implements CustomElement {
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
        this.shadowRoot!.innerHTML = `  
       <nav class="bg-teal-900 p-4 shadow-2xl">
            <div class="container mx-auto flex justify-between items-center">
                <div class="text-white
                    font-bold text-xl">${header}</div>
                <div class="text-gray-300">
                    <a href="#" class="hover:text-white px-3 py-2">Home</a>
                    <a href="#" class="hover:text-white px-3 py-2">About</a>
                    <a href="#" class="hover:text-white px-3 py-2">Contact</a>
                </div>
            </div>
        </nav>
        
    `;
    }
}

customElements.define('nav-bar', NavigationBar);

