import {BaseElement} from '../../../_core/elements/base-element.ts';



class ExamplesListPanel extends BaseElement {

    state = {
        items: ['buy milk', 'walk the dog', 'do the laundry']
    }

    connectedCallback() {
        super.connectedCallback();
    }
    renderItem(text: string, index: number) {
        return `<list-item text="${text}" id="${index + text}"></list-item>`;
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="  w-full flex flex-col items-center justify-center p-4 h-96 gap-3 ">
                ${this.state.items.map((item, index) => this.renderItem(item, index)).join('')}
            </div>
        `;
        this.update();
    }
}

customElements.define('examples-lists-panel', ExamplesListPanel);
