import {BaseElement} from '../../../_core/elements/base-element.ts';


class ExamplesListPanel extends BaseElement {

    state = {
        items: ['buy milk', 'walk the dog', 'do the laundry']
    }

    connectedCallback() {
        super.connectedCallback();
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="  w-full flex flex-row items-center justify-center p-4 h-96  ">
                <list-item  text="${'but milk'}"></list-item>
            </div>
        `;
        this.update();
    }


}

customElements.define('examples-lists-panel', ExamplesListPanel);
