import {BaseElement} from '../../_core/elements/base-element.ts';


class CardPanel extends BaseElement {

    connectedCallback() {
        super.connectedCallback();

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 h-96 bg-amber-100 ">
                <div class="flex flex-col items-start justify-start bg-amber-50/80 shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
                    <div class="flex flex-col items-start justify-start gap-2">
                        <span>
                            The Counter <span id="active-state"></span>
                        </span>
                        <span>
                           Count is <span id="count-text"></span>
                        </span>
                    </div>
                    <div>
                        <app-button>Click Me!</app-button>
                    </div>


                </div>
            </div>
        `;
        this.update();
    }

    update() {

    }
}

customElements.define('card-panel', CardPanel);
