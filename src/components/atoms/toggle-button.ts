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
        this.addEventListener('click', () => {
            const isActive = this.getAttribute('isActive') === 'true';
            this.setAttribute('isActive', String(!isActive));
            this.update()

        });
    }
    update() {
        const isActive = this.getAttribute('isActive') === 'true';
        const toggleButton = this.shadowRoot?.querySelector('button');
        if (toggleButton) {
            const toggleCircle = toggleButton.querySelector('span');
            if (toggleCircle) {
                toggleCircle.classList.toggle('translate-x-4', isActive);
            }
        }

    }
    render() {
        const _class = this.getAttribute('class') || '';
        const isActive = this.getAttribute('isActive') === 'true';
        (this.shadowRoot as ShadowRoot).innerHTML  = `   
        <button class="${_class} px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center justify-center">
            <span class="w-6 h-6 bg-white rounded-full ${isActive ? 'translate-x-4' : ''} transition-transform"></span>
            <slot></slot>
        </button> 
    `;
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.update();
    }



    updateComponent() {
        this.update();
    }


}

customElements.define('toggle-button', ToggleButton);
