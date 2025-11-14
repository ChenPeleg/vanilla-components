import {BaseElement} from '../../../_core/elements/base-element.ts';


class ExamplesListPanel extends BaseElement {

    connectedCallback() {
        super.connectedCallback();

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="  w-full flex flex-row items-center justify-center p-4 h-96  ">
 
            </div>
        `;
        this.update();
    }


}

customElements.define('examples-lists-panel', ExamplesListPanel);
