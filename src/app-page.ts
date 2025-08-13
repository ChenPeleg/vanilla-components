import {BaseElement} from './_core/elements/base-element.ts';
import type {ToggleButton} from './site/components/atoms/toggle-button.ts';
import type {AppButton} from './site/components/atoms/app-button.ts';


class AppPage extends BaseElement {
    private state = {
        isActive: true,
        clicks: 0
    }
    connectedCallback() {
        super.connectedCallback();
        this.$<ToggleButton>('toggle-button').actionCallback = (result: { isActive: boolean }) => {
            this.state.isActive = result.isActive;
            this.$<AppButton>('app-button').setAttribute('disabled', String(!this.state.isActive));
            this.update();
        };
        this.$<AppButton>('app-button').actionCallback = () => {
            if (this.state.isActive) {
                this.state.clicks++;
            }
            this.update();
        }
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
                    <toggle-button defaultValue="${this.state.isActive.toString()}">
                        <span id="toggle-button-text" class="">Toggle</span>
                    </toggle-button>

                </div>
            </div>
        `;
        this.update();
    }

    update() {
        this.$('#active-state').textContent = `${this.state.isActive ? 'Active' : 'Not active'}`;
        this.$('#toggle-button-text').textContent = `${this.state.isActive ? 'Active' : 'Not active'}`
        this.$('#count-text').textContent = this.state.clicks.toString()
    }
}

customElements.define('app-page', AppPage);
