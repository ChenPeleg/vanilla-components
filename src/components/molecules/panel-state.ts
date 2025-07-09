import {globalStyleSheet} from '../../core/tailwind-style-sheet.ts';
import {ToggleButton} from '../atoms/toggle-button.ts';
import {BaseElement} from '../../base/base-element.ts';

class PanelState extends BaseElement {
    private state = {
        isActive: false,
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['header', 'text'];
    }

    connectedCallback() {

        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.render();
        (this.$('toggle-button') as ToggleButton).actionCallback = (result: { isActive: boolean }) => {
            this.state.isActive = result.isActive;
            this.update();
        }

    }

    attributeChangedCallback() {
        this.update();
    }


    render() {

        this.shadowRoot!.innerHTML = `  
        <div class="flex flex-col items-center justify-center p-4 h-96 bg-amber-100">
        <div class="flex flex-col items-center justify-center bg-amber-50/80   shadow-lg rounded-lg p-6 w-full max-w-md gap-6">
          <div id="active-state"> This is ${this.state.isActive ? 'Active' : 'Not active'} </div>
        
            <toggle-button> a </toggle-button>
        </div>
        </div>
     
    `;
    }

    update() {
        const activeStateDiv = this.shadowRoot?.querySelector('#active-state');
        if (activeStateDiv) {
            activeStateDiv.textContent = `This is ${this.state.isActive ? 'Active' : 'Not active'}`;
        }
    }
}

customElements.define('panel-state', PanelState);

