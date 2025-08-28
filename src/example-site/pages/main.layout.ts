import {BaseElement} from '../../_core/elements/base-element.ts';
import {overrideRoutes} from '../router/site-routes.ts';


class MainLayout extends BaseElement {
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="h-screen w-screen overflow-hidden ">
                <nav-bar></nav-bar>
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('main-layout', MainLayout);

overrideRoutes()
