import {BaseElement} from '../../../_core/elements/base-element.ts';
import {SiteColors} from '../../colors/siteColors.ts';


class Header1 extends BaseElement {
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <h1 class="font-agbalumo text-2xl sm:text-3xl font-bold ${SiteColors.headerText} mt-4 text-center">
                <slot></slot>
            </h1>
        `;
        this.update()
    }
}

customElements.define('header-1', Header1);

