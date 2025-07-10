import {BaseElement} from '../../_core/elements/base-element.ts';


export class ToggleButton extends BaseElement {

    static get observedAttributes() {
        return ['isActive'];
    }

    actionCallback = (_result: {
        isActive: boolean;
    }) => {
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.$('button').addEventListener('click', () => {
            const isActive = this.getAttribute('isActive') === 'true';
            this.setAttribute('isActive', String(!isActive));
            this.update();
            this.actionCallback({isActive})
        });
    }

    update() {
        const isActive = this.getAttribute('isActive') === 'true';
        this.$<HTMLSpanElement>('#toggle-nob').classList.toggle('translate-x-4', isActive);
    }

    renderTemplate() {
        const isActive = this.getAttribute('isActive') === 'true';
        // language=HTML
        (this.shadowRoot as ShadowRoot).innerHTML = `
            <div class="flex items-center justify-center h-full">
                <button id="toggle-button"
                        class=" w-14 px-2 py-2 relative bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 flex items-start justify-start">
                <span id="toggle-nob"
                      class="w-6 h-6 bg-white rounded-full relative left-0 ${isActive ? 'translate-x-4' : ''} transition-transform"></span>

                </button>
                <lable for="toggle-button" class="text-white">
                    <slot></slot>
                </lable>
            </div>
        `;
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.update();
    }
}

customElements.define('toggle-button', ToggleButton);
