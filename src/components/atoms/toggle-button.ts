import {BaseElement} from '../../base/base-element.ts';


export class ToggleButton extends BaseElement {

    static get observedAttributes() {
        return ['class', 'isActive'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.$('button').addEventListener('click', () => {
            const isActive = this.getAttribute('isActive') === 'true';
            this.setAttribute('isActive', String(!isActive));
            this.update()
            this.clickHandler({isActive})
        });
    }

    clickHandler(_result: { isActive: boolean }): void {
    };

    update() {
        const isActive = this.getAttribute('isActive') === 'true';
        this.$('#toggle-nob').classList.toggle('translate-x-4', isActive);
    }

    render() {
        const _class = this.getAttribute('class') || '';
        const isActive = this.getAttribute('isActive') === 'true';
        (this.shadowRoot as ShadowRoot).innerHTML = `   
        <button class="${_class} px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center justify-center">
            <span id="toggle-nob" class="w-6 h-6 bg-white rounded-full ${isActive ? 'translate-x-4' : ''} transition-transform"></span>
            <slot></slot>
        </button> 
    `;
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.update();
    }

}

customElements.define('toggle-button', ToggleButton);
