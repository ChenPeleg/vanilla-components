# Task 10: Implement ListController as Custom Element

## Objective
Create a reusable `<list-controller>` Custom Element to genericize the "Manual Reconciliation" strategy for efficient list rendering. This component will allow any part of the application to render lists via a declarative HTML element, managing DOM updates efficiently.

## Specification

### 1. Element Details
*   **Tag Name**: `list-controller`
*   **Location**: `src/_core/ListController.ts`
*   **Inheritance**: Extends `BaseElement` (or `HTMLElement` if BaseElement is not suitable, but likely BaseElement for consistency).

### 2. Public API (Properties)
The element should expose properties to configure the rendering logic. Since these are functions, they must be set via JavaScript, not HTML attributes.

*   `renderer`: `(item: T) => HTMLElement`
    *   Function that creates a *new* DOM element for a given data item.
*   `keyExtractor`: `(item: T) => string`
    *   Function that returns a unique ID for a data item.
*   `updater`: `(element: HTMLElement, item: T) => void` (Optional)
    *   Function that updates an *existing* DOM element with new data.
*   `items`: `T[]`
    *   Array of data items. Setting this triggers the reconciliation/render process.

### 3. Implementation Logic (`set items`)
When `items` is set:
1.  **Track Instances**: Maintain a `Map<string, HTMLElement>` to map Item IDs to DOM Elements.
2.  **Removal**: Iterate over existing map keys. If a key is not present in the new items list, remove the element from the DOM and the map.
3.  **Creation/Update**: Iterate over the new items list:
    *   **New**: If ID is not in the map, create the element using `renderer` and add it to the map.
    *   **Existing**: If ID is in the map, retrieve the element. Call `updater` if provided.
4.  **Reordering**: Ensure the DOM order matches the `items` array order.
    *   Access `this.shadowRoot` (or `this` if not using shadow DOM - recommended to use Light DOM or a specific container in Shadow DOM). *Decision: Use Light DOM for flexibility so global styles apply easily, OR provide a slot. Actually, the ListController IS the container.*
    *   **Decision**: `ListController` *is* the list container. It manages its own direct children.
    *   Iterate through the `items` array by index `i`.
    *   Let `expectedNode` be the element for `items[i]`.
    *   Let `currentDomNode` be `this.children[i]`.
    *   If `currentDomNode` is not `expectedNode`:
        *   If `currentDomNode` exists, insert `expectedNode` before it: `this.insertBefore(expectedNode, currentDomNode)`.
        *   If `currentDomNode` is undefined (end of list), append `expectedNode`: `this.appendChild(expectedNode)`.

## Verification Plan
1.  Update test file `tests/unit/ListController.spec.ts`.
2.  Test cases (using Test Mocks or DOM):
    *   **Element Creation**: Verify `document.createElement('list-controller')` works.
    *   **Properties**: Verify properties can be set.
    *   **Rendering**: Verify setting `items` populates the element.
    *   **Updates**: Verify updates reuse nodes.
