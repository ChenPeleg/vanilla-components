# Task 03: Simple Component Fiber Architecture

## Overview

This task explores creating a simplified "Fiber-like" architecture for each component. While not as sophisticated as React Fiber, it borrows key concepts to enable:

1. **Incremental updates** - Don't block the main thread
2. **Update batching** - Coalesce multiple state changes
3. **Interruptible work** - Yield to browser for high-priority tasks

## React Fiber vs Our Approach

### What React Fiber Does
React Fiber restructures reconciliation as a **linked list** of work units:

```
FiberNode {
    type: 'div',
    stateNode: <actual DOM>,
    child: FiberNode,      // First child
    sibling: FiberNode,    // Next sibling  
    return: FiberNode,     // Parent
    alternate: FiberNode,  // Previous version (for diffing)
    pendingProps: {...},
    memoizedState: {...},
    effectTag: 'UPDATE',   // What DOM operation needed
}
```

This allows React to:
- Pause work after processing N nodes
- Resume from the exact node it left off
- Prioritize user interactions over data fetching

### What We Can Simplify

For web components, we don't need the full complexity. Each component is **self-contained**, so we can implement a "micro-fiber" per component:

```typescript
interface ComponentFiber {
    current: VNode[] | null;       // Current rendered tree
    pending: VNode[] | null;       // Next tree to render
    effects: PatchOperation[];     // DOM operations to apply
    isWorking: boolean;            // Currently processing?
    priority: 'high' | 'low';      // Update priority
}
```

## Implementation

### File: `src/_core/elements/component-fiber.ts`

```typescript
import { VNode, htmlToVNodes } from '../utils/vdom.ts';

export interface PatchOperation {
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE';
    node?: VNode;
    target?: Element;
    key?: string;
    attrs?: Record<string, string>;
}

export class ComponentFiber {
    private current: VNode[] | null = null;
    private pending: VNode[] | null = null;
    private effects: PatchOperation[] = [];
    private isWorking = false;
    private frameId: number | null = null;

    constructor(private root: ShadowRoot) {}

    /**
     * Schedule an update with new HTML content.
     * Multiple calls are batched into single render.
     */
    scheduleUpdate(html: string): void {
        this.pending = htmlToVNodes(html);
        
        // Batch updates using requestAnimationFrame
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(() => {
                this.frameId = null;
                this.performWork();
            });
        }
    }

    /**
     * Perform reconciliation work.
     * Uses requestIdleCallback for non-blocking updates.
     */
    private performWork(): void {
        if (this.isWorking || !this.pending) return;
        this.isWorking = true;

        // Use idle callback for low-priority work
        if ('requestIdleCallback' in window) {
            requestIdleCallback((deadline) => {
                this.reconcileWithDeadline(deadline);
            });
        } else {
            // Fallback: do all work synchronously
            this.reconcileSync();
        }
    }

    /**
     * Incremental reconciliation - yields when time runs out.
     */
    private reconcileWithDeadline(deadline: IdleDeadline): void {
        const pending = this.pending!;
        const current = this.current || [];

        // Simple approach: diff top-level children
        // More advanced: maintain a work queue of nodes to process
        
        let i = 0;
        while (i < pending.length && deadline.timeRemaining() > 1) {
            const newNode = pending[i];
            const oldNode = current[i];
            
            if (!oldNode) {
                this.effects.push({ type: 'CREATE', node: newNode });
            } else if (this.needsUpdate(oldNode, newNode)) {
                this.effects.push({ 
                    type: 'UPDATE', 
                    node: newNode, 
                    key: newNode.key 
                });
            }
            i++;
        }

        // Check for deletions
        for (let j = pending.length; j < current.length; j++) {
            this.effects.push({ type: 'DELETE', key: current[j].key });
        }

        // If we didn't finish, schedule more work
        if (i < pending.length) {
            requestIdleCallback((d) => this.reconcileWithDeadline(d));
        } else {
            this.commitEffects();
        }
    }

    /**
     * Synchronous reconciliation fallback.
     */
    private reconcileSync(): void {
        const pending = this.pending!;
        const current = this.current || [];

        // Generate all effects
        for (let i = 0; i < Math.max(pending.length, current.length); i++) {
            const newNode = pending[i];
            const oldNode = current[i];

            if (!oldNode && newNode) {
                this.effects.push({ type: 'CREATE', node: newNode });
            } else if (oldNode && !newNode) {
                this.effects.push({ type: 'DELETE', key: oldNode.key });
            } else if (this.needsUpdate(oldNode, newNode)) {
                this.effects.push({ type: 'UPDATE', node: newNode, key: newNode.key });
            }
        }

        this.commitEffects();
    }

    /**
     * Apply all pending DOM operations.
     */
    private commitEffects(): void {
        for (const effect of this.effects) {
            this.applyEffect(effect);
        }

        // Swap trees
        this.current = this.pending;
        this.pending = null;
        this.effects = [];
        this.isWorking = false;
    }

    /**
     * Apply a single DOM operation.
     */
    private applyEffect(effect: PatchOperation): void {
        switch (effect.type) {
            case 'CREATE':
                // Create and append new element
                const newEl = this.vnodeToElement(effect.node!);
                this.root.appendChild(newEl);
                break;

            case 'UPDATE':
                // Find and update existing element
                if (effect.key) {
                    const existing = this.root.querySelector(`[id="${effect.key}"], [data-key="${effect.key}"]`);
                    if (existing && effect.node) {
                        this.patchElement(existing, effect.node);
                    }
                }
                break;

            case 'DELETE':
                // Remove element
                if (effect.key) {
                    const toRemove = this.root.querySelector(`[id="${effect.key}"], [data-key="${effect.key}"]`);
                    toRemove?.remove();
                }
                break;
        }
    }

    /**
     * Check if a node needs updating.
     */
    private needsUpdate(oldNode: VNode, newNode: VNode): boolean {
        if (!oldNode || !newNode) return true;
        if (oldNode.tag !== newNode.tag) return true;
        
        // Compare attributes
        const oldAttrs = Object.entries(oldNode.attrs).sort().toString();
        const newAttrs = Object.entries(newNode.attrs).sort().toString();
        if (oldAttrs !== newAttrs) return true;

        // Compare text children
        const oldText = oldNode.children.filter(c => typeof c === 'string').join('');
        const newText = newNode.children.filter(c => typeof c === 'string').join('');
        if (oldText !== newText) return true;

        return false;
    }

    /**
     * Patch an existing element with new VNode data.
     */
    private patchElement(element: Element, vnode: VNode): void {
        // Update attributes
        for (const [key, value] of Object.entries(vnode.attrs)) {
            if (element.getAttribute(key) !== value) {
                element.setAttribute(key, value);
            }
        }

        // Remove old attributes
        for (const attr of Array.from(element.attributes)) {
            if (!(attr.name in vnode.attrs)) {
                element.removeAttribute(attr.name);
            }
        }

        // Update text content if it's a leaf node
        const textChildren = vnode.children.filter(c => typeof c === 'string');
        if (textChildren.length && !vnode.children.some(c => typeof c !== 'string')) {
            element.textContent = textChildren.join('');
        }
    }

    /**
     * Convert VNode to real DOM element.
     */
    private vnodeToElement(vnode: VNode): Element {
        const el = document.createElement(vnode.tag);
        for (const [key, value] of Object.entries(vnode.attrs)) {
            el.setAttribute(key, value);
        }
        for (const child of vnode.children) {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else {
                el.appendChild(this.vnodeToElement(child));
            }
        }
        return el;
    }
}
```

## Integration with BaseElement

```typescript
// In base-element.ts
import { ComponentFiber } from './component-fiber.ts';

export class BaseElement extends HTMLElement {
    private fiber?: ComponentFiber;

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' });
        this.fiber = new ComponentFiber(this.shadowRoot!);
        this.render();
    }

    /**
     * Call this instead of setting innerHTML directly.
     * Updates are batched and applied incrementally.
     */
    protected render(): void {
        const html = this.template();
        this.fiber?.scheduleUpdate(html);
    }

    /**
     * Override in subclass to return component HTML.
     */
    protected template(): string {
        return '';
    }
}
```

## Key Concepts Borrowed from React Fiber

### 1. Work Scheduling
```typescript
// Batch multiple updates into one frame
scheduleUpdate(html: string): void {
    this.pending = htmlToVNodes(html);
    if (!this.frameId) {
        this.frameId = requestAnimationFrame(() => this.performWork());
    }
}
```

### 2. Interruptible Work
```typescript
// Yield to browser when time runs out
while (i < pending.length && deadline.timeRemaining() > 1) {
    // Process one node
    i++;
}
if (i < pending.length) {
    requestIdleCallback((d) => this.reconcileWithDeadline(d));
}
```

### 3. Two-Phase Commit
```typescript
// Phase 1: Reconcile (can be interrupted)
reconcileWithDeadline(deadline) { ... }

// Phase 2: Commit (synchronous, cannot be interrupted)
commitEffects() { ... }
```

### 4. Effect List
```typescript
// Collect operations during reconciliation
this.effects.push({ type: 'UPDATE', node: newNode });

// Apply all at once during commit
for (const effect of this.effects) {
    this.applyEffect(effect);
}
```

## What This Doesn't Have (vs Full React Fiber)

| Feature | React Fiber | Our Approach |
|---------|-------------|--------------|
| Priority lanes | Multiple priority queues | Single queue |
| Suspense | Async boundaries | Not supported |
| Concurrent mode | True concurrency | Batching only |
| Context | Provider/Consumer tree | Not needed (web components) |
| Hooks | useState, useEffect, etc. | Use class properties |
| Portals | Render outside tree | Not supported |

## Trade-offs

### Pros
- ✅ Non-blocking updates for large components
- ✅ Automatic update batching
- ✅ Simple ~150 line implementation
- ✅ Works with existing HTML template strings
- ✅ Each component is independent (no global scheduler)

### Cons
- ❌ No cross-component scheduling
- ❌ Key-based matching required for best performance
- ❌ Deep tree updates still need full subtree diff
- ❌ No built-in state management

## Usage Example

```typescript
class TodoList extends BaseElement {
    private items: string[] = [];

    addItem(text: string) {
        this.items.push(text);
        this.render(); // Batched, non-blocking
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
        this.render(); // Batched with other updates
    }

    protected template(): string {
        return `
            <ul>
                ${this.items.map((item, i) => `
                    <li data-key="item-${i}">${item}</li>
                `).join('')}
            </ul>
        `;
    }
}
```

## Next Steps

1. **Task 04**: Implement the actual `vdom.ts` file
2. **Task 05**: Implement `component-fiber.ts`  
3. **Task 06**: Integrate with `BaseElement`
4. **Task 07**: Add tests and benchmarks

