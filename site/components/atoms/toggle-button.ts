import {BaseElement} from '../../../src/_core/elements/base-element.ts';


export class ToggleButton extends BaseElement {

    static get observedAttributes() {
        return ['defaultValue' ];
    }

    actionCallback = (_result: {
        isActive: boolean;
    }) => {
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('isActive', this.getAttribute('defaultValue') || 'false');
        this.update();
        this.$('button').addEventListener('click', () => {
            const newValue = this.getAttribute('isActive') !== 'true';
            this.setAttribute('isActive', String(newValue));
            this.update();

        });
    }

    update() {
        const isActive = this.getAttribute('isActive') === 'true';
        this.$('button').setAttribute('data-active', String(isActive));
        this.$<HTMLSpanElement>('#toggle-nob').classList.toggle('translate-x-4' ,isActive);
        this.actionCallback({isActive: isActive})
    }

    renderTemplate() {
        const isActive = this.getAttribute('isActive') === 'true';
        // language=HTML
        (this.shadowRoot as ShadowRoot).innerHTML = `
            <div class="flex items-center justify-center h-full gap-3">
                <button id="toggle-button" data-active="${isActive}"
                        class="w-14 px-2 py-2 relative data-[active=true]:bg-blue-500 shadow  bg-blue-500/30  text-white rounded-full cursor-pointer hover:shadow-lg transition duration-200 flex items-start justify-start">
                <span id="toggle-nob"
                      class="w-6 h-6 bg-white rounded-full relative right-0 ${isActive ? '' : 'translate-x-4'} transition-transform"></span>
                </button>
                <lable for="toggle-button" class=" ">
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
