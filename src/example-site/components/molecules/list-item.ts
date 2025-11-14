import { BaseElement } from '../../../_core/elements/base-element.ts';
import {SiteColors} from '../../colors/siteColors.ts';

class ListItem extends BaseElement {
    static get observedAttributes() { return ['text', 'id' ]; }

    connectedCallback(): void {
        super.connectedCallback();
        this.renderTemplate();
    }

    renderTemplate() {
        const text = this.getAttribute('text') || '';
         this.shadowRoot!.innerHTML = `
            <div class="flex w-full  flex-row items-center justify-center px-4">
                  <div class=" w-full flex flex-col items-start justify-start ${SiteColors.cardBackgroundBg} shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
                    <div class="flex flex-col items-start justify-start gap-2">
                        <span >
                            ${text}
                        </span> 
                    </div> 
                </div>
            </div>
        `;
    }
}

customElements.define('list-item', ListItem);
