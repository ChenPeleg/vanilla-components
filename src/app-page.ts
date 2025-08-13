import {BaseElement} from './_core/elements/base-element.ts';


export class SimpleButton extends BaseElement {
    connectedCallback(): void {
        super.connectedCallback();
        this.$<HTMLButtonElement>('button').addEventListener('click', () => {
            this.actionCallback({clicked: true});
        });
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <button class=" disabled:bg-blue-500/50 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-200">
                <slot></slot>
            </button>
        `;
    }
}
customElements.define('simple-button', SimpleButton);


class AppPage extends BaseElement {
    private state = {
        clicks: 0
    }

    connectedCallback() {
        super.connectedCallback();
        this.$<SimpleButton>('simple-button').actionCallback = () => {
            this.state.clicks++;
            this.update();
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 h-96  ">
                <div class="flex flex-col items-start justify-start bg-amber-50/80 shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
                    <div>
                        <simple-button>
                            Count is <span id="count-text"> 0 </span>
                        </simple-button>
                    </div>
                </div>
            </div>
        `;
    }

    update() {
        this.$('#count-text').textContent = this.state.clicks.toString()
    }
}

customElements.define('app-page', AppPage);



