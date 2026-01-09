# Task 09: How to Rerender a Lists with vanilla components

## The Challenge: Rendering Lists Efficiently

In your current "vanilla components" framework, rendering typically happens by setting `this.shadowRoot.innerHTML`. For example, in `DocumentationRenderer`, the `renderTemplate` method acts like this:

```typescript
// Current approach
this.shadowRoot!.innerHTML = `
    <div class="list">
        ${items.map(item => `<div>${item}</div>`).join('')}
    </div>
`;
```

### The Problem
When you set `innerHTML`, the browser:
1.  **Destroys** all existing DOM nodes inside the shadow root.
2.  **Parses** the new HTML string.
3.  **Creates** completely new DOM nodes.

This causes several issues:
*   **Loss of State**: If an item had an input with text typed in it, or if the user had scrolled a specific area, that state is lost instantly because the old element is gone.
*   **Focus Loss**: If the user was focused on an input within the list, focus is lost (the element they were focused on no longer exists).
*   **Performance**: Destroying and re-creating thousands of DOM nodes is expensive compared to updating a few text nodes or attributes.
*   **Event Listeners**: Any manual event listeners attached to specific nodes (via `addEventListener` in code, not inline) are lost.

---

## How React Solved It

React solves this using a **Virtual DOM** and a process called **Reconciliation**.

1.  **Virtual DOM**: React keeps a lightweight JavaScript representation of the DOM (a tree of objects).
2.  **Diffing**: When data changes, React creates a *new* Virtual DOM tree. It compares this new tree with the *previous* one to find exactly what changed.
3.  **Keys**: For lists, React requires a `key` prop.
    *   Without keys, if you render `[A, B, C]` and then `[A, B]`, React might not know if C was removed or if B was changed to C.
    *   *With* keys (e.g., IDs), React matches the new item `ID:1` with the old item `ID:1`.
        *   If it finds a match, it updates the existing attributes/text (keeping the DOM node alive).
        *   If a key is new, it creates a DOM node.
        *   If a key is missing, it removes the DOM node.
        *   If keys are in a different order, it just re-orders the existing DOM nodes.

This means React **reuses** the actual DOM nodes as much as possible, preserving focus, selection, and scroll state.

---

## Suggestions for Your Framework

Since you want to keep it "nano" and "vanilla", you probably don't want to implement a full Virtual DOM. Here are three strategies, ordered from simplest to most "seamless".

### Strategy 1: The "Smart Replace" (simplest)
Only re-render if the HTML string actually changed.
```typescript
protected renderTemplate() {
    const newHtml = this.generateHtml();
    if (this.shadowRoot!.innerHTML !== newHtml) {
        this.shadowRoot!.innerHTML = newHtml;
    }
}
```
*   **Pros**: Trivial to add.
*   **Cons**: Still destroys state when anything changes.

### Strategy 2: Manual Reconciliation (Recommended for "Seamless" feel)
Add a helper method to handle list updates specifically. Instead of just returning a string, your list component should track its rendered children.

**Concept:**
Manage a `Map<string, HTMLElement>` where part of your data is a unique ID.

**Algorithm:**
1.  Get the container (e.g., `this.$('#list-container')`).
2.  Iterate through your **new** data list.
3.  For each item (with `id`):
    *   Check if you already have an element for this `id`.
    *   **If Yes**: Call an `update(item)` method on that existing element. (This implies your child items should be Custom Elements too!). Move it to the correct position if needed.
    *   **If No**: Create the element (e.g. `document.createElement('list-item')`), set its data, and append it.
4.  Remove any elements from the DOM whose `id`s are not in the new list.

**Example Implementation Plan:**

You can add a utility method to `BaseElement` or a new `ListController` class:

```typescript
// Pseudo-code helper
function updateList<T extends {id: string}>(
    container: HTMLElement, 
    items: T[], 
    tagName: string, 
    // Map of existing elements by ID
    existingElements: Map<string, HTMLElement> 
) {
    const newIds = new Set(items.map(i => i.id));
    
    // 1. Remove deleted items
    for (const [id, element] of existingElements) {
        if (!newIds.has(id)) {
            element.remove();
            existingElements.delete(id);
        }
    }

    // 2. Add or Update items
    items.forEach((item, index) => {
        let element = existingElements.get(item.id);
        
        if (!element) {
            // New: Create
            element = document.createElement(tagName);
            existingElements.set(item.id, element);
            container.appendChild(element); // Append initially
        }
        
        // Update data (assuming the element has a setter or setAttribute)
        (element as any).data = item; 
        
        // Re-order: Ensure element is at the correct index
        // If the element at this index in DOM isn't this one, move it.
        if (container.children[index] !== element) {
            container.insertBefore(element, container.children[index]);
        }
    });
}
```

### Strategy 3: Use a Micro-Library
If writing reconciliation logic feels too heavy, consider using `lit-html` just for the rendering part. It is very fast, very small, and does exactly this "efficient DOM update" without a full framework.

```typescript
import { html, render } from 'lit-html';

class MyList extends BaseElement {
    renderTemplate() {
        const template = html`
            <ul>
                ${this.items.map(item => html`<li id="${item.id}">${item.text}</li>`)}
            </ul>
        `;
        render(template, this.shadowRoot!);
    }
}
```
*   **Pros**: Production-grade, handles all edge cases, very fast.
*   **Cons**: Adds a dependency (though a small one).

### Recommendation
For a true "Vanilla" feel that is educational and performant enough for most cases, **Strategy 2 (Manual Reconciliation)** is the way to go. It forces you to structure your list items as proper Custom Elements (which they should be!) and gives you full control.
