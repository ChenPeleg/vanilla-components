import {BaseElement} from '../../_core/elements/base-element.ts';


export class AppButton extends BaseElement {
    static get observedAttributes() {
        return ['class', 'disabled'];
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.$<HTMLButtonElement>('button').addEventListener('click', () => {
            if (this.getAttribute('disabled') === 'true') {
                return;
            }
            this.actionCallback({clicked: true});
        });
    }
    update () {
        const isDisabled = this.getAttribute('disabled') === 'true';
        this.$<HTMLButtonElement>('button').disabled = isDisabled;
        this.$<HTMLButtonElement>('button').setAttribute('aria-disabled', String(isDisabled));
    }
    renderTemplate() {
        const _class = this.getAttribute('class') || '';
        this.shadowRoot!.innerHTML = `   
        <button class="${_class} disabled:bg-red-300 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200">
            <slot></slot>
        </button>
    `;
    }
}

customElements.define('app-button', AppButton);

