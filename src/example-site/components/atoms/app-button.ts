import {BaseElement} from '../../../_core/elements/base-element.ts';


export class AppButton extends BaseElement {
    static get observedAttributes() {
        return ['class', 'disabled'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.shadowRoot?.addEventListener('click', () => {
            if (this.getAttribute('disabled') === 'true') {
                return;
            }
            this.actionCallback({clicked: true});
        }, {
            signal : this.abortSignal.signal
        });
        this.update();
    }

    update() {
        const isDisabled = this.getAttribute('disabled') === 'true';
        const buttonDiv = this.shadowRoot?.querySelector('[role="button"]');
        if (buttonDiv) {
            buttonDiv.setAttribute('aria-disabled', String(isDisabled));
        }
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `   
        <div role="button" tabindex="0" class=" disabled:bg-blue-500/50 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200"   >
           Click Me!
        </div>
    `;
    }
}

customElements.define('app-button', AppButton);
