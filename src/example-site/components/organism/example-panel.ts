import {BaseElement} from '../../../_core/elements/base-element.ts';


class ExamplePanel extends BaseElement {


    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="  ">
                <examples-buttons-panel></examples-buttons-panel>
            </div>
            <div class="  ">
                <examples-lists-panel></examples-lists-panel>
            </div>
        `;
        this.update();
    }


}

customElements.define('examples-panel', ExamplePanel);
