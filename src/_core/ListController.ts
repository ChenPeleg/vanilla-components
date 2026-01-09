export class ListController<T> {
    private container: HTMLElement;
    private itemRenderer: (item: T) => HTMLElement;
    private keyExtractor: (item: T) => string;
    private itemUpdater?: (element: HTMLElement, item: T) => void;
    private elementMap: Map<string, HTMLElement> = new Map();

    constructor(
        container: HTMLElement,
        itemRenderer: (item: T) => HTMLElement,
        keyExtractor: (item: T) => string,
        itemUpdater?: (element: HTMLElement, item: T) => void
    ) {
        this.container = container;
        this.itemRenderer = itemRenderer;
        this.keyExtractor = keyExtractor;
        this.itemUpdater = itemUpdater;
    }

    setItems(items: T[]): void {
        const newIds = new Set(items.map(this.keyExtractor));

        // 1. Remove deleted items
        for (const [id, element] of this.elementMap) {
            if (!newIds.has(id)) {
                element.remove();
                this.elementMap.delete(id);
            }
        }

        // 2. Add or Update items
        items.forEach((item, index) => {
            const id = this.keyExtractor(item);
            let element = this.elementMap.get(id);

            if (!element) {
                // New: Create
                element = this.itemRenderer(item);
                this.elementMap.set(id, element);
                // Append initially, will be re-ordered if needed
                this.container.appendChild(element);
            } else {
                // Existing: Update
                if (this.itemUpdater) {
                    this.itemUpdater(element, item);
                }
            }

            // 3. Re-order: Ensure element is at the correct index
            const currentDomNode = this.container.children[index];
            
            // If the element at this index in DOM isn't this one, move it.
            if (currentDomNode !== element) {
                if (currentDomNode) {
                    this.container.insertBefore(element, currentDomNode);
                } else {
                    this.container.appendChild(element);
                }
            }
        });
    }
}
