import {BaseElement} from '../../../_core/elements/base-element.ts';


class ExamplesPanel extends BaseElement {


    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="  "> 
                <examples-buttons-panel></examples-buttons-panel>
            </div>
        `;
        this.update();
    }


}

customElements.define('examples-panel', ExamplesPanel);
