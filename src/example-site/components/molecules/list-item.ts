import {BaseElement} from '../../../_core/elements/base-element.ts';
import {SiteColors} from '../../colors/siteColors.ts';

export class ListItem extends BaseElement {
    static get observedAttributes() {
        return ['text', 'id'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.renderTemplate();
        const trashButton = this.$('#trash-button');
        if (trashButton) {
            trashButton.addEventListener('click', () => {
                const id = this.getAttribute('id') || '';
                this.actionCallback({id, actionType: 'delete'});
            })
        }
    }

    actionCallback = ({
                          id,
                          actionType
                      }: {
        id: string;
        actionType: string;
    }) => {
        console.log(id, actionType)
    }

    renderTemplate() {
        const text = this.getAttribute('text') || '';
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex w-full  flex-row items-center justify-center px-4">
                <div class=" w-full flex flex-col items-start justify-start ${SiteColors.cardBackgroundBg} shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
                    <div class="flex flex-row items-center justify-between gap-2 w-full">
                        <span>
                            ${text}
                        </span>
                        <div>   
                            <span>
                            <button id="trash-button"
                                    class="h-7 w-7 rounded-full cursor-pointer text-white hover:bg-slate-400 transition"> 
                                🗑️ 
                            </button>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('list-item', ListItem);
