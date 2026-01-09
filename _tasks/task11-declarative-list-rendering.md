# Task 11: Declarative List Rendering & Diffing

## The Goal
You want a declarative syntax like this:
```html
<list-controller>
    {list.map(l => <div key="xyz">...</div>)}
</list-controller>
```

And you want `ListController` to "diff its children like React does".

## The Problem: "The Nuke"
In your current framework, `renderTemplate()` typically does:
```typescript
this.shadowRoot.innerHTML = `...`;
```
**This is destructive.** When you set `innerHTML`, the browser:
1.  Destroys the old `<list-controller>`.
2.  Creates a *new* `<list-controller>`.
3.  Parses the new children string and creates *new* children.

Because the `<list-controller>` instance is destroyed and recreated every render, **internal state is lost**. Even if `ListController` had smart diffing logic inside it, it wouldn't matter because the controller *itself* is being killed by the parent.

To achieve "Persistent State" + "Declarative Syntax", we need to stop destroying the DOM.

---

## Proposed Approaches

Here are 3 ways to achieve this, from "Framework Upgrade" to "Component Solution".

### Approach 1: Global DOM Morphing (Recommended)
Instead of replacing `innerHTML`, we use a lightweight library (like `morphdom` or `idiomorph`) to **patch** the DOM to match the new string.

**How it works:**
1.  Add `morphdom` (or similar) to your project.
2.  Update `BaseElement` to use it.
3.  **Result:** You can write *exactly* the code you wanted.

```typescript
// BaseElement.ts
protected renderTemplate() {
    // Instead of innerHTML = ...
    morph(this.shadowRoot, this.generateTemplateString());
}
```

**Usage (The syntax you wanted):**
```typescript
// AnyComponent.ts
render() {
    return `
        <div class="container">
            <!-- This ListController remains the SAME instance across renders -->
            <list-controller>
                ${this.items.map(item => `
                    <div id="${item.id}" class="item">${item.text}</div>
                `).join('')}
            </list-controller>
        </div>
    `;
}
```
*   **What happens:** The generic "morpher" sees `<list-controller>` is already there. It descends into it. It sees the list of children. It compares regular divs by ID/tag and updates them.
*   **Role of ListController:** In this approach, `ListController` doesn't even need to be smart! The smarts are in the *parent's* render method. `ListController` becomes just a stylable container (or a place for animations), or you might not even need it at all (just use a `<ul>`).

### Approach 2: Smart "Diffing" Component (Strict Isolation)
If you don't want to change `BaseElement`, you can make `ListController` smart. **BUT** the parent must *not* re-render it.

**Requirement:** The parent must render the `<list-controller>` **once** (static HTML).

**Usage:**
```html
<!-- Parent HTML (Static) -->
<list-controller id="my-list"></list-controller>
```

**Controller Implementation:**
The controller accepts a *string* of HTML (the desired state) and diffs it internally.

```typescript
// Parent.ts
update() {
   const listHtml = items.map(i => `<div key="${i.id}">...</div>`).join('');
   this.$('#my-list').reconcile(listHtml); // Custom method
}
```
*   **Pros:** Self-contained.
*   **Cons:** You can't write it "inline" in the parent's template string cleanly.

### Approach 3: Lit-HTML (The "Correct" Solution)
Adopt `lit-html` for rendering. It is essentially "React's Diffing Engine" but for standard HTML template strings.

```typescript
import { html, render } from 'lit-html';

render() {
    render(html`
        <list-controller>
            ${this.items.map(i => html`<div key=${i.id}>${i.text}</div>`)}
        </list-controller>
    `, this.shadowRoot);
}
```
*   **Pros:** Industry standard, extremely fast, declarative, handles arrays/keys automatically.
*   **Cons:** Adds a dependency (approx 3kb).

---

## Recommendation

If you want the syntax `<list-controller>{list.map(...)}</list-controller>` AND you want to keep your "Vanilla" constraint without a full framework like Lit:

**Go with Approach 1 (Global DOM Morphing).**
It upgrades your entire app to be "React-like" without changing how you write strings.

1.  Add a small morph function (can be copied into `_core` or installed).
2.  Change `BaseElement` to use it.
3.  Your lists (and forms!) naturally preserve state.
