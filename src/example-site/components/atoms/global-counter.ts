import {BaseElement} from '../../../_core/elements/base-element.ts';
import {StoreService} from '../../../services/Store.service.ts';
import type {Subscription} from '../../../models/Subscription.ts';


export class GlobalCounter extends BaseElement {
    private storeSubscription: Subscription | undefined = undefined;

    static get observedAttributes() {
        return ['class', 'disabled'];
    }

    connectedCallback(): void {

        super.connectedCallback();
        this.storeSubscription = this.servicesProvider.getService(StoreService).subscribe(() => {
            this.update()
        })

        this.update();
    }

    update() {
        const state = this.servicesProvider.getService(StoreService).store.getState();
        const span = this.$<HTMLSpanElement>('#global-count');
        if (span) {
            span.textContent = state.count.toString();
        }
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `   
        <div class=" disabled:bg-blue-500/50 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200"   >
          Global Count: <span id="global-count">0</span>
        </div>
    `;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.storeSubscription) {
            this.storeSubscription.unsubscribe()
        }
    }
}

customElements.define('global-counter', GlobalCounter);
