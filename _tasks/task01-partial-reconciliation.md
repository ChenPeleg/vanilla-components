# Task 01: Partial / Selective Reconciliation

## The Goal
The user wants to keep the `BaseElement` simple but add an **option** (possibly default) to reconcile **some** elements inside the template.

Instead of a "Global Morph" (which treats the entire Shadow DOM as a target for diffing) or a "Manual Controller" (which requires a specific custom element to manage children), this approach introduces **Smart Zones** or a **Smart Render** strategy within `BaseElement`.

## The Idea: "Smart Render" in BaseElement

We can modify `BaseElement` to have a `partialRender` or `smartRender` mode.

### Strategy 1: "Soft" Diffing (The `data-key` or `id` matching)
When `renderTemplate()` is called, instead of nuking `innerHTML`, we parse the new string into a `template` element and compare specific parts.

**How it works:**
1.  Parse the new HTML string.
2.  Look for "Protected Elements" or "List Containers" marked with a specific attribute (e.g., `data-reconcile` or just existing `id`s).
3.  If found, **swap the children** carefully or diff them, instead of replacing the container.
4.  For everything else, maybe just replace? (Mixing strategies is hard).

**Better Variation:** "Top-Level Diff".
We only reconcile the *direct children* of Shadow Root, or specific marked containers.

### Strategy 2: The `reconcile` Helper Method
The `BaseElement` provides a method to update *parts* of the DOM.

```typescript
// Component Code
protected renderTemplate() {
    this.renderPartial('#list-container', `
        ${this.items.map(item => `
            <div id="${item.id}">${item.text}</div>
        `).join('')}
    `);
}
```

**Implementation of `renderPartial(selector, newHtml)`:**
1.  Target = `this.shadowRoot.querySelector(selector)`.
2.  If target is missing, error or ignore (or full render).
3.  Parse `newHtml` (which is a list of items).
4.  **Reconcile** the children of Target with the new Nodes.
    *   Match by ID.
    *   Update attributes/text.
    *   Reorder.

### Strategy 3: Automatic Partial Reconciliation (The User's "Option")
We add a flag to `BaseElement`:

```typescript
class BaseElement {
    protected enablePartialReconciliation = true; // Default?

    protected renderTemplate() {
        const newHtml = this.generateHtml();
        
        if (this.enablePartialReconciliation) {
            // Use a lightweight diffing strategy
            this.diffAndApply(this.shadowRoot, newHtml);
        } else {
            this.shadowRoot.innerHTML = newHtml;
        }
    }
}
```

**What does `diffAndApply` do?**
It doesn't need to be React. It can be a simple "Key-based" matcher.
*   It walks the current DOM.
*   It walks the new parsed Virtual DOM (from string).
*   It matches elements by `id` or `key`.
*   If matched -> update attributes, preserve instance (state kept!).
*   If not matched -> replace.

## Why this fits "The User's Request"
The user wants: `<list-controller>{list.map(...)}</list-controller>`.

If `BaseElement` has **Strategy 3** (Auto Reconciliation), then:
1.  You write:
    ```typescript
    render() {
        return `
            <list-controller>
                ${items.map(i => `<div id="${i.id}">...</div>`).join('')}
            </list-controller>
        `;
    }
    ```
2.  `BaseElement` generates the new string.
3.  `BaseElement` sees `<list-controller>` exists in both old and new.
4.  `BaseElement` **recurses** into it.
5.  It sees the list of divs.
6.  It matches them by `id`.
7.  It updates them in place.
8.  **Result:** State preserved. No complex "ListController" logic needed—the **BaseElement** does the heavy lifting.

## Trade-offs
*   **Performance:** Parsing HTML strings to DOM nodes (for diffing) is slower than `innerHTML` for initial render, but *much* faster/better for updates if it saves checking 1000s of listeners or recreating heavyweight components.
*   **Complexity:** You have to implement a `diff` function in `BaseElement` (or import one).

## Recommended Plan (for Task 12)
Implement **Strategy 3**: Add a `reconcile` method (or mode) to `BaseElement` that uses a simple diffing algorithm (like `morphdom` or a custom 50-line key-matcher).

1.  Create `src/_core/utils/reconcile.ts`.
2.  Add `reconcile(newHtml)` to `BaseElement`.
3.  Allow components to call `this.reconcile(html)` instead of setting `innerHTML`.
