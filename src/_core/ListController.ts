import { BaseElement } from './elements/base-element.ts';

export class ListController<T> extends BaseElement {
    public renderer: (item: T) => HTMLElement = (item: any) => {
        const div = document.createElement('div');
        div.textContent = String(item);
        return div;
    };
    public keyExtractor: (item: T) => string = (item: any) => String(item);
    public updater?: (element: HTMLElement, item: T) => void;
    
    private elementMap: Map<string, HTMLElement> = new Map();
    private _items: T[] = [];

    renderTemplate() {
        // No initial template needed.
    }

    set items(items: T[]) {
        this._items = items;
        this.renderList();
    }
    
    get items(): T[] {
        return this._items;
    }

    private renderList() {
        // Ensure shadowRoot exists (BaseElement creates it). 
        // We append directly to shadowRoot to encapsulate items, 
        // matching the "Controller" pattern where it manages its own DOM list.
        if (!this.shadowRoot) return;

        const newIds = new Set(this._items.map(this.keyExtractor));

        // 1. Remove deleted items
        for (const [id, element] of this.elementMap) {
            if (!newIds.has(id)) {
                element.remove();
                this.elementMap.delete(id);
            }
        }

        // 2. Add or Update items
        this._items.forEach((item, index) => {
            const id = this.keyExtractor(item);
            let element = this.elementMap.get(id);

            if (!element) {
                // New: Create
                element = this.renderer(item);
                this.elementMap.set(id, element);
                this.shadowRoot!.appendChild(element);
            } else {
                // Existing: Update
                if (this.updater) {
                    this.updater(element, item);
                }
            }

            // 3. Re-order
            // elementMap elements are our managed children. 
            // We need to ensure they are in the correct order in the shadowRoot.
            // Note: shadowRoot might handle <style> tags from BaseElement/GlobalStyles.
            // But strict list ordering usually implies we want our items in order relative to each other.
            // The simplest way is to ensure `shadowRoot.children[index]` is correct, skipping non-managed nodes?
            // BaseElement adds styles via adoptedStyleSheets, so shadowRoot.children should be clean unless we added something.
            // With empty renderTemplate, shadowRoot.children starts empty.
            
            const currentDomNode = this.shadowRoot!.children[index];
            if (currentDomNode !== element) {
                if (currentDomNode) {
                    this.shadowRoot!.insertBefore(element, currentDomNode);
                } else {
                    this.shadowRoot!.appendChild(element);
                }
            }
        });
    }
}

customElements.define('list-controller', ListController);
