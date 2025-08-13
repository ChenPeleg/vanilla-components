import {BaseElement} from './_core/elements/base-element.ts';

class AppRoot extends BaseElement {

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="h-screen w-screen overflow-hidden ">
                <router-outlet></router-outlet>
            </div>
        `;
    }
}

customElements.define('app-root', AppRoot);

