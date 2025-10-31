import {BaseElement} from '../../_core/elements/base-element.ts';
import {SiteColors} from '../colors/siteColors.ts';

class HomePage extends BaseElement {


    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-y-auto    w-full h-full">
                <div class="flex flex-col lg:flex-row justify-center lg:h-full">
                    <div class="flex-1 ${SiteColors.howToUseBgColor} flex flex-col items-center justify-start">
                        <use-case-panel></use-case-panel>
                    </div>
                    <div class="flex-1  ${SiteColors.mainVanillaBgColor} flex flex-col items-center justify-start">
                        <hero-section></hero-section>
                    </div>
                    <div class="flex-1 ${SiteColors.stateManagementBgColor} ">
                        <state-management-panel></state-management-panel>
                    </div>
                </div>
            </main>
        `;
    }
}

customElements.define('home-page', HomePage);

