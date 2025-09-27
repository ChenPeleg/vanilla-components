import {BaseElement} from '../../../_core/elements/base-element.ts';


export class AppButton extends BaseElement {
    static get observedAttributes() {
        return ['class', 'disabled'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'button');
        this.$<HTMLButtonElement>('button').addEventListener('click', () => {
            if (this.$<HTMLButtonElement>('button').disabled) {
                return;
            }
            this.actionCallback({clicked: true});
        });
        this.update();
    }

    update() {
        const isDisabled = this.getAttribute('disabled') === 'true';

        this.$<HTMLButtonElement>('button').disabled    = isDisabled  ;
        this.$<HTMLButtonElement>('button').setAttribute('aria-disabled', String(isDisabled));
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `   
        <div class=" disabled:bg-blue-500/50 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200"   >
           Click Me!
        </div>
    `;
    }
}

customElements.define('app-button', AppButton);
