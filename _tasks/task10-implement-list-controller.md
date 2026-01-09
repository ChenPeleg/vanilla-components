# Task 10: Implement ListController

## Objective
Create a reusable `ListController` class to genericize the "Manual Reconciliation" strategy for efficient list rendering. This component will allow any part of the application to render lists without destroying and recreating DOM nodes unnecessarily, preserving focus and state.

## Specification

### 1. Class Location
Create the class in `src/_core/ListController.ts`.

### 2. Class Design
The class should use a generic type `T` (the data item).

**Constructor:**
```typescript
constructor(
    container: HTMLElement,
    itemRenderer: (item: T) => HTMLElement,
    keyExtractor: (item: T) => string,
    itemUpdater?: (element: HTMLElement, item: T) => void
)
```

**Public Methods:**
*   `setItems(items: T[]): void` - Updates the DOM to match the new list.

### 3. Implementation Logic (`setItems`)
1.  **Track Instances**: Maintain a `Map<string, HTMLElement>` to map Item IDs to DOM Elements.
2.  **Removal**: Iterate over existing map keys. If a key is not present in the new items list, remove the element from the DOM and the map.
3.  **Creation/Update**: Iterate over the new items list:
    *   **New**: If ID is not in the map, create the element using `itemRenderer` and add it to the map.
    *   **Existing**: If ID is in the map, retrieve the element. Call `itemUpdater` if provided.
4.  **Reordering**: Ensure the DOM order matches the `items` array order.
    *   Iterate through the `items` array by index `i`.
    *   Let `expectedNode` be the element for `items[i]`.
    *   Let `currentDomNode` be `container.children[i]`.
    *   If `currentDomNode` is not `expectedNode`:
        *   If `currentDomNode` exists, insert `expectedNode` before it: `container.insertBefore(expectedNode, currentDomNode)`.
        *   If `currentDomNode` is undefined (end of list), append `expectedNode`: `container.appendChild(expectedNode)`.

## Verification Plan
1.  Create a test file `tests/ListController.test.ts`.
2.  Test cases:
    *   **Initial Render**: `setItems` with 3 items -> Container has 3 children.
    *   **Add**: `setItems` with 4 items -> Container has 4 children.
    *   **Remove**: `setItems` with 2 items -> Container has 2 children.
    *   **Update**: Modify a property of an item, call `setItems` -> Element content/attribute updates.
    *   **Reorder**: Swap items in array, call `setItems` -> DOM elements swapped (verify using IDs or content).
    *   **Preservation**: Verify that the `HTMLElement` reference is strictly equal (`===`) before and after update for unchanged items to ensure the DOM node was reused.
