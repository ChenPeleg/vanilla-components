import {BaseElement} from '../elements/base-element.ts';
import {servicesProvider} from '../../services/ServicesProvider.ts';
import {HashRouterService} from '../../services/HashRouter.service.ts';
import type {Subscription} from '../../models/Subscription.ts';


export class RouterOutlet extends BaseElement {
    private readonly servicesProvider = servicesProvider;
    private subscription: Subscription | null = null;

    connectedCallback(): void {
        super.connectedCallback();
        this.subscription = this.servicesProvider.getService(HashRouterService).subscribe((routerState => {
            const outlet = this.$<HTMLDivElement>('#router-outlet');
            if (!outlet) {
                throw new Error('Router outlet not found');
            }
            const html = routerState.route?.element();
            outlet.innerText = html || '';
        }))
        this.update();
    }

    update() {
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `<div class="contents" id="router-outlet"></div>`;
    }

    disconnectedCallback() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

customElements.define('router-outlet', RouterOutlet);
