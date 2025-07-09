import {ToggleButton} from '../atoms/toggle-button.ts';
import {BaseElement} from '../../base/base-element.ts';
import type {TextInput} from '../atoms/text-input.ts';

class PanelState extends BaseElement {
    private state = {
        isActive: false,
    }


    static get observedAttributes() {
        return ['header', 'text'];
    }

    connectedCallback() {
        super.connectedCallback();
        (this.$('toggle-button') as ToggleButton).actionCallback = (result: { isActive: boolean }) => {
            this.state.isActive = result.isActive;
            this.update();
        }
        this.$<TextInput>('text-input').inputCallback = (result: { value: string }) => {
            console.log('Input value:', result.value);
            this.update();
        };

    }


    render() {
        this.shadowRoot!.innerHTML = `  
            <div class="flex flex-col items-center justify-center p-4 h-96 bg-amber-100">
                <div class="flex flex-col items-center justify-center bg-amber-50/80 shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
                    <div>
                        <span>
                            State is <span id="active-state"></span>
                        </span>
                        <span>Panel State</span>
                    </div>  
                    <div>
                        <text-input></text-input>
                    </div>
                    <toggle-button></toggle-button>
                    <span class="text-blue-300">Toggle</span>
                </div>
            </div> 
        `;
        this.update();
    }

    update() {
        const activeStateDiv = this.$('#active-state');
        activeStateDiv.textContent = ` ${this.state.isActive ? 'Active' : 'Not active'}`;
    }
}

customElements.define('panel-state', PanelState);
