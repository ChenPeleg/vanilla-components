# Task 02: Naive Virtual DOM for BaseElement

## Overview
This task implements a lightweight Virtual DOM (VNode) system that enables the partial reconciliation described in Task 01. The VDOM provides a cheap, in-memory representation of DOM nodes that can be compared and diffed efficiently.

## Goals
1. Create a simple `VNode` interface to represent DOM elements
2. Parse HTML strings into VNode trees
3. Convert VNodes back to real DOM nodes
4. Support `id` or `data-key` attributes for reconciliation matching

## VNode Interface

```typescript
interface VNode {
    tag: string;                        // Element tag name (e.g., 'div', 'span')
    attrs: Record<string, string>;      // Element attributes
    children: (VNode | string)[];       // Child nodes (elements or text)
    key?: string;                       // Unique key for reconciliation matching
}
```

## Implementation

### File: `src/_core/utils/vdom.ts`

```typescript
/**
 * Naive Virtual DOM implementation for partial reconciliation.
 * Provides lightweight DOM representation for efficient diffing.
 */

export interface VNode {
    tag: string;
    attrs: Record<string, string>;
    children: (VNode | string)[];
    key?: string;
}

/**
 * Parses a real DOM Element into a VNode tree.
 */
export function parseToVNode(element: Element): VNode {
    const attrs: Record<string, string> = {};
    for (const attr of element.attributes) {
        attrs[attr.name] = attr.value;
    }

    const children: (VNode | string)[] = [];
    for (const child of element.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent?.trim();
            if (text) children.push(text);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            children.push(parseToVNode(child as Element));
        }
    }

    return {
        tag: element.tagName.toLowerCase(),
        attrs,
        children,
        key: attrs['data-key'] || attrs['id'],
    };
}

/**
 * Parses an HTML string into an array of VNode trees.
 */
export function htmlToVNodes(html: string): VNode[] {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return Array.from(template.content.children).map(parseToVNode);
}

/**
 * Converts a VNode (or text) back into a real DOM Node.
 */
export function vnodeToElement(vnode: VNode | string): Node {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    const el = document.createElement(vnode.tag);
    for (const [key, value] of Object.entries(vnode.attrs)) {
        el.setAttribute(key, value);
    }
    for (const child of vnode.children) {
        el.appendChild(vnodeToElement(child));
    }
    return el;
}

/**
 * Extracts all keyed VNodes from a tree (flat map).
 * Useful for quick lookups during reconciliation.
 */
export function collectKeyedNodes(vnodes: VNode[]): Map<string, VNode> {
    const map = new Map<string, VNode>();

    function walk(node: VNode) {
        if (node.key) {
            map.set(node.key, node);
        }
        for (const child of node.children) {
            if (typeof child !== 'string') {
                walk(child);
            }
        }
    }

    vnodes.forEach(walk);
    return map;
}
```

## Usage Example

```typescript
import { htmlToVNodes, vnodeToElement, VNode } from '../_core/utils/vdom.ts';

// Parse HTML string to VNodes
const vnodes = htmlToVNodes(`
    <div id="item-1" class="card">Hello</div>
    <div id="item-2" class="card">World</div>
`);

// Convert back to real DOM
vnodes.forEach(vnode => {
    container.appendChild(vnodeToElement(vnode));
});
```

## Key Features

### 1. Key-Based Matching
VNodes automatically extract `id` or `data-key` attributes as their `key` property. This enables efficient matching during reconciliation:

```html
<!-- These elements can be matched by key -->
<div id="user-123">John</div>
<div data-key="item-456">Item</div>
```

### 2. Lightweight Representation
VNodes are plain JavaScript objects—no prototype chain, no methods. This makes them:
- Fast to create (~10x faster than real DOM nodes)
- Easy to compare (simple object equality)
- Serializable (can be JSON.stringify'd if needed)

### 3. Text Node Handling
Text nodes are represented as plain strings in the `children` array. Empty/whitespace-only text nodes are ignored to avoid noise.

## Next Steps (Task 03)

With the VNode system in place, the next task is to implement the **reconciliation algorithm** that:

1. Compares old VNode tree with new VNode tree
2. Matches nodes by `key`
3. Generates a minimal set of DOM operations (patches)
4. Applies patches to the real DOM

## Trade-offs

| Aspect | Benefit | Cost |
|--------|---------|------|
| Parsing | Clean VNode structure | Extra parse step for HTML strings |
| Memory | VNodes are lightweight | Holding two trees during diff |
| Simplicity | ~60 lines of code | Not as optimized as React/Preact |
| Flexibility | Works with any HTML | Requires `key` for best results |

## Testing

```typescript
// tests/unit/vdom.spec.ts
import { htmlToVNodes, vnodeToElement } from '../../src/_core/utils/vdom.ts';

test('parses HTML to VNodes', () => {
    const vnodes = htmlToVNodes('<div id="test">Hello</div>');
    expect(vnodes).toHaveLength(1);
    expect(vnodes[0].tag).toBe('div');
    expect(vnodes[0].key).toBe('test');
    expect(vnodes[0].children).toEqual(['Hello']);
});

test('converts VNode back to DOM', () => {
    const vnodes = htmlToVNodes('<span class="bold">Text</span>');
    const el = vnodeToElement(vnodes[0]) as HTMLElement;
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toBe('bold');
    expect(el.textContent).toBe('Text');
});
```

