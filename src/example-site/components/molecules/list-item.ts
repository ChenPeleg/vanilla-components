import { BaseElement } from '../../../_core/elements/base-element.ts';
import {SiteColors} from '../../colors/siteColors.ts';

class ListItem extends BaseElement {
    static get observedAttributes() { return ['text', 'id' ]; }

    connectedCallback(): void {
        super.connectedCallback();
        this.renderTemplate();
    }

    renderTemplate() {
         this.shadowRoot!.innerHTML = `
            <div class="flex w-full  flex-row items-center justify-center p-4">
                  <div class="flex flex-col items-start justify-start ${SiteColors.cardBackgroundBg} shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
                    <div class="flex flex-col items-start justify-start gap-2">
                        <span>
                            The Counter <span id="active-state"></span>
                        </span>
                        <span>
                           Count is <span id="count-text"></span>
                        </span>
                    </div>
                  

                </div>
            </div>
        `;
    }
}

customElements.define('list-item', ListItem);
