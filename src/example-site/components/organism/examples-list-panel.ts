import {BaseElement} from '../../../_core/elements/base-element.ts';
import {ListItem} from '../molecules/list-item.ts';
import {ListController} from '../../../_core/ListController.ts';


class ExamplesListPanel extends BaseElement {
    
    state = {
        items: ['buy milk', 'walk the dog', 'do the laundry']
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderTemplate()
        this.initController();
    }

    initController() {
        const listController = this.$<ListController<string>>('list-controller');
        if (!listController) return;

        listController.renderer = (text: string) => {
            const item = document.createElement('list-item') as ListItem;
            item.setAttribute('id', text);
            item.setAttribute('text', text);
            item.actionCallback = (event) => this.itemAction(event);
            return item;
        };

        listController.keyExtractor = (item: string) => item;
        listController.items = this.state.items;
    }

    itemAction({id, actionType}: { id: string, actionType: string }) {
        if (actionType === 'delete') {
            this.state.items = this.state.items.filter(item => item !== id);
            
            const listController = this.$<ListController<string>>('list-controller');
            if (listController) {
                listController.items = this.state.items;
            }
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="w-full flex flex-col items-center justify-center p-4 h-96 gap-3">
                <list-controller id="list-controller"></list-controller>
            </div>
        `;
    }
}

customElements.define('examples-lists-panel', ExamplesListPanel);
