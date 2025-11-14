import {BaseElement} from '../../../_core/elements/base-element.ts';
import {ListItem} from '../molecules/list-item.ts';


class ExamplesListPanel extends BaseElement {

    state = {
        items: ['buy milk', 'walk the dog', 'do the laundry']
    }

    connectedCallback() {
        super.connectedCallback();
        this.connectActionCallback()
    }

    renderItem(text: string, index: number) {
        return `<list-item text="${text}" id="${index + text}"></list-item>`;
    }

    itemAction({
                   id,
                   actionType
               }: { id: string, actionType: string }) {
        console.log(actionType, id)
    }

    connectActionCallback() {
        const allListItems = this.shadowRoot?.querySelectorAll ('list-item')
        allListItems?.forEach((el    ) => {
            (el as ListItem).actionCallback = ({id, actionType}) => {
                this.itemAction({id, actionType})
            }
        })
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
