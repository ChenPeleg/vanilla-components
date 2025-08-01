import {BaseElement} from '../elements/base-element.ts';
import {servicesProvider} from '../../services/ServicesProvider.ts';
import {HashRouterService} from '../../services/HashRouter.service.ts';
import type {Subscription} from '../../models/Subscription.ts';


export class RouterOutlet extends BaseElement {
    private  readonly  servicesProvider = servicesProvider;
    private subscription: Subscription;

    connectedCallback(): void {
        super.connectedCallback();
        this.subscription = this.servicesProvider.getService(HashRouterService).sub
        this.update();
    }

    update() {
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `<div class="contents" id="router-outlet"></div>`;
    }
    disconnectedCallback(){
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

customElements.define('router-outlet', RouterOutlet);
