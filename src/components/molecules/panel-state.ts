import {ToggleButton} from '../atoms/toggle-button.ts';
import {BaseElement} from '../../_core/elements/base-element.ts';
import {AppButton} from '../atoms/app-button.ts';
// import type {TextInput} from '../atoms/text-input.ts';

class PanelState extends BaseElement {
    private state = {
        isActive: true,
        clicks : 0
    }
    static get observedAttributes() {
        return ['header', 'text'];
    }

    connectedCallback() {
        super.connectedCallback();
        this.$<ToggleButton>('toggle-button') .actionCallback = (result: { isActive: boolean }) => {
            this.state.isActive = result.isActive;
            this.$<AppButton>('toggle-button').setAttribute('disabled', String(!this.state.isActive));
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
                    <div class="flex flex-col items-center justify-center gap-2">
                        <span>
                            State is <span id="active-state"></span>
                        </span>
                        <span>
                           Count is <span id="count-text"></span>
                        </span>
                    </div>
                    <div>
                        <app-button>Click Me!</app-button>
<!--                        <text-input></text-input>-->
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
        this.$('#active-state').textContent = ` ${this.state.isActive ? 'Active' : 'Not active'}`;
        this.$('#toggle-button-text').textContent = ` ${this.state.isActive ? 'Active' : 'Not active'}`
        this.$('#count-text').textContent = ` ${this.state.clicks }`
        // this.$('#text-from-input').textContent = (this.$<TextInput>('text-input')?.value || 'No input provided');
    }
}

customElements.define('panel-state', PanelState);
