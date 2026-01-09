import { test, expect } from '@playwright/test';
import { ListController } from '../../src/_core/ListController';

// Mock implementation of HTMLElement for testing logic without JSDOM
class MockElement {
    children: MockElement[] = [];
    id: string;
    text: string = '';
    parentNode: MockElement | null = null; // Needed for remove() logic

    constructor(id: string = '') {
        this.id = id;
    }

    appendChild(child: MockElement) {
        if (child.parentNode) {
            child.remove();
        }
        this.children.push(child);
        child.parentNode = this;
        return child;
    }

    insertBefore(newNode: MockElement, referenceNode: MockElement) {
        if (newNode.parentNode) {
            newNode.remove();
        }
        const index = this.children.indexOf(referenceNode);
        if (index === -1) {
             // In real DOM, this works if referenceNode is null, but we usually pass strict node.
             // Our ListController logic handles "appendChild" if ref is null/undefined.
             // But here we emulate exact insertBefore behavior for valid ref.
             throw new Error('Reference node not found in mock container');
        }
        this.children.splice(index, 0, newNode);
        newNode.parentNode = this;
        return newNode;
    }

    remove() {
        if (this.parentNode) {
            const index = this.parentNode.children.indexOf(this);
            if (index > -1) {
                this.parentNode.children.splice(index, 1);
            }
            this.parentNode = null;
        }
    }
}

interface TestItem {
    id: string;
    text: string;
}

test.describe('ListController', () => {
    let container: MockElement;
    let controller: ListController<TestItem>;

    // Helpers
    const createItem = (item: TestItem) => {
        const el = new MockElement(item.id);
        el.text = item.text;
        return el as unknown as HTMLElement;
    };
    
    const keyExtractor = (item: TestItem) => item.id;
    
    // Using a cast to force our MockElement to be treated as HTMLElement
    // We also need to cast container.children to access it like an array in the Controller
    // The Controller does `container.children[index]`. 
    // In real DOM `children` is HTMLCollection which supports indexed access.
    // Our MockElement `children` is an array, so it supports it naturally.

    test.beforeEach(() => {
        container = new MockElement('container');
        controller = new ListController<TestItem>(
            container as unknown as HTMLElement,
            createItem,
            keyExtractor,
            (el, item) => {
                (el as unknown as MockElement).text = item.text;
            }
        );
    });

    test('initial render creates elements', () => {
        const items = [
            { id: '1', text: 'One' },
            { id: '2', text: 'Two' }
        ];
        controller.setItems(items);

        expect(container.children).toHaveLength(2);
        expect(container.children[0].id).toBe('1');
        expect(container.children[0].text).toBe('One');
        expect(container.children[1].id).toBe('2');
        expect(container.children[1].text).toBe('Two');
    });

    test('add item appends it', () => {
        controller.setItems([{ id: '1', text: 'One' }]);
        
        expect(container.children).toHaveLength(1);

        controller.setItems([
            { id: '1', text: 'One' },
            { id: '2', text: 'Two' }
        ]);

        expect(container.children).toHaveLength(2);
        expect(container.children[1].id).toBe('2');
    });

    test('remove item deletes it', () => {
        controller.setItems([
            { id: '1', text: 'One' },
            { id: '2', text: 'Two' },
            { id: '3', text: 'Three' }
        ]);
        
        const node1 = container.children[0];
        const node2 = container.children[1];
        const node3 = container.children[2];

        controller.setItems([
            { id: '1', text: 'One' },
            { id: '3', text: 'Three' }
        ]);

        expect(container.children).toHaveLength(2);
        expect(container.children[0]).toBe(node1); // Preserved
        expect(container.children[1]).toBe(node3); // Preserved and moved/kept
        // Node 2 should be effectively removed (no parent, though JS obj exists)
        expect(node2.parentNode).toBeNull();
    });

    test('update item modifies existing element without replacing it', () => {
        controller.setItems([{ id: '1', text: 'One' }]);
        const originalNode = container.children[0];

        controller.setItems([{ id: '1', text: 'One Updated' }]);

        expect(container.children).toHaveLength(1);
        expect(container.children[0]).toBe(originalNode); // Same instance (Strict Equality)
        expect(container.children[0].text).toBe('One Updated'); // Content updated
    });

    test('reorder items moves elements correctly', () => {
        controller.setItems([
            { id: 'A', text: 'A' },
            { id: 'B', text: 'B' },
            { id: 'C', text: 'C' }
        ]);

        const nodeA = container.children[0];
        const nodeB = container.children[1];
        const nodeC = container.children[2];

        // Swap B and C, keep A
        controller.setItems([
            { id: 'A', text: 'A' },
            { id: 'C', text: 'C' },
            { id: 'B', text: 'B' }
        ]);

        expect(container.children).toHaveLength(3);
        expect(container.children[0]).toBe(nodeA);
        expect(container.children[1]).toBe(nodeC);
        expect(container.children[2]).toBe(nodeB);
    });

    test('complex update: insert middle, remove first, update last', () => {
        // Initial: [A, B, C]
        controller.setItems([
            { id: 'A', text: 'A' },
            { id: 'B', text: 'B' },
            { id: 'C', text: 'C' }
        ]);

        const nodeB = container.children[1];
        const nodeC = container.children[2];

        // Target: [B, D, C_updated] (Remove A, Keep B, Add D, Update C)
        controller.setItems([
            { id: 'B', text: 'B' },
            { id: 'D', text: 'D' }, // New
            { id: 'C', text: 'C Updated' } // Update
        ]);

        expect(container.children).toHaveLength(3);
        expect(container.children[0]).toBe(nodeB); // B moved to front
        expect(container.children[1].id).toBe('D'); // D New
        expect(container.children[2]).toBe(nodeC); // C Kept
        expect(container.children[2].text).toBe('C Updated'); // C Updated
    });
});
