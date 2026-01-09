import {FiberElement} from '../../../_core/elements/FiberElement.ts';
import {ListItem} from '../molecules/list-item.ts';


class ExamplesListPanel extends FiberElement {

    state = {
        items: ['buy milk', 'walk the dog', 'do the laundry']
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

    onCommit() {
        const allListItems = this.shadowRoot?.querySelectorAll ('list-item')
        allListItems?.forEach((el    ) => {
            (el as ListItem).actionCallback = ({id, actionType}) => {
                this.itemAction({id, actionType})
            }
        })
    }

    template() {
        // language=HTML
        return `
            <div class="  w-full flex flex-col items-center justify-center p-4 h-96 gap-3 ">
                ${this.state.items.map((item, index) => this.renderItem(item, index)).join('')}
            </div>
        `;
    }
}

customElements.define('examples-lists-panel', ExamplesListPanel);
