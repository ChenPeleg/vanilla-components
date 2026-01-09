/**
 * FiberElement - A web component base class with fiber-like reconciliation.
 *
 * Features:
 * - Batched updates via requestAnimationFrame
 * - Incremental reconciliation via requestIdleCallback
 * - Two-phase commit (reconcile → commit)
 * - Key-based node matching for efficient updates
 */

import { globalStyleSheet } from '../tailwind-style-sheet.ts';
import type { CustomElement } from './CustomElement.ts';
import { _ServicesProvider } from '../../services/_ServicesProvider.ts';
import { type VNode, htmlToVNodes, vnodeToElementLegacy } from './vdom.ts';

export interface PatchOperation {
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'REPLACE';
    node?: VNode;
    key?: string;
    index?: number;
}

export class FiberElement extends HTMLElement implements CustomElement {
    protected internals: ElementInternals;
    protected abortSignal: AbortController;
    protected readonly servicesProvider = _ServicesProvider;

    // Fiber state
    private currentTree: VNode[] | null = null;
    private pendingTree: VNode[] | null = null;
    private effects: PatchOperation[] = [];
    private isReconciling = false;
    private frameId: number | null = null;
    private workIndex = 0;

    constructor() {
        super();
        this.abortSignal = new AbortController();
        this.attachShadow({ mode: 'open' });
        this.internals = this.attachInternals();
    }

    static get formAssociated() {
        return true;
    }

    $<T extends HTMLElement>(selector: string): T {
        return this.shadowRoot?.querySelector(selector) as T;
    }

    connectedCallback(): void {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.scheduleRender();
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        if (_newValue === _oldValue) {
            return;
        }
        this.scheduleRender();
    }

    /**
     * Callback for parent-child communication.
     */
    public actionCallback = (_result: unknown) => {};

    public disconnectedCallback() {
        this.abortSignal.abort();
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }

    // ========================================
    // Template Methods (override in subclass)
    // ========================================

    /**
     * Override to return the component's HTML template.
     */
    protected template(): string {
        throw new Error(`[FiberElement] ${this.constructor.name}.template() must be implemented.`);
    }

    /**
     * Called after DOM updates are committed.
     */
    protected onCommit(): void {}

    // ========================================
    // Fiber Scheduling
    // ========================================

    /**
     * Schedule a render. Multiple calls are batched into one frame.
     */
    protected scheduleRender(): void {
        this.pendingTree = htmlToVNodes(this.template());
        console.log(this)

        if (!this.frameId) {
            this.frameId = requestAnimationFrame(() => {
                this.frameId = null;
                this.performWork();
            });
        }
    }

    /**
     * Start reconciliation work.
     */
    private performWork(): void {
        if (this.isReconciling || !this.pendingTree) return;
        this.isReconciling = true;
        this.workIndex = 0;
        this.effects = [];

        if ('requestIdleCallback' in window) {
            requestIdleCallback((deadline) => this.reconcileWithDeadline(deadline));
        } else {
            this.reconcileSync();
        }
    }

    // ========================================
    // Reconciliation Phase (interruptible)
    // ========================================

    /**
     * Incremental reconciliation - yields when time runs out.
     */
    private reconcileWithDeadline(deadline: IdleDeadline): void {
        const pending = this.pendingTree!;
        const current = this.currentTree || [];
        const maxLen = Math.max(pending.length, current.length);

        // Process nodes while we have time
        while (this.workIndex < maxLen && deadline.timeRemaining() > 1) {
            this.diffNode(this.workIndex, current[this.workIndex], pending[this.workIndex]);
            this.workIndex++;
        }

        // If not done, schedule more work
        if (this.workIndex < maxLen) {
            requestIdleCallback((d) => this.reconcileWithDeadline(d));
        } else {
            this.commitEffects();
        }
    }

    /**
     * Synchronous reconciliation fallback.
     */
    private reconcileSync(): void {
        const pending = this.pendingTree!;
        const current = this.currentTree || [];
        const maxLen = Math.max(pending.length, current.length);

        for (let i = 0; i < maxLen; i++) {
            this.diffNode(i, current[i], pending[i]);
        }

        this.commitEffects();
    }

    /**
     * Diff a single node and generate effects.
     */
    private diffNode(index: number, oldNode: VNode | undefined, newNode: VNode | undefined): void {
        if (!oldNode && newNode) {
            // Create new node
            this.effects.push({ type: 'CREATE', node: newNode, index });
        } else if (oldNode && !newNode) {
            // Delete old node
            this.effects.push({ type: 'DELETE', key: oldNode.key, index });
        } else if (oldNode && newNode) {
            // Check if update needed
            if (this.needsUpdate(oldNode, newNode)) {
                if (oldNode.tag !== newNode.tag) {
                    // Tag changed - replace entirely
                    this.effects.push({ type: 'REPLACE', node: newNode, index });
                } else {
                    // Same tag - update in place
                    this.effects.push({ type: 'UPDATE', node: newNode, key: newNode.key, index });
                }
            }
            // Recursively diff children
            this.diffChildren(oldNode, newNode, index);
        }
    }

    /**
     * Diff children of two nodes.
     */
    private diffChildren(oldNode: VNode, newNode: VNode, _parentIndex: number): void {
        // For now, if children changed, we mark the parent for update
        // A more sophisticated approach would track child effects separately
        const oldChildren = oldNode.children.filter((c): c is VNode => typeof c !== 'string');
        const newChildren = newNode.children.filter((c): c is VNode => typeof c !== 'string');

        // Use keys for matching if available
        const oldByKey = new Map(oldChildren.filter(c => c.key).map(c => [c.key!, c]));
        const newByKey = new Map(newChildren.filter(c => c.key).map(c => [c.key!, c]));

        // Check for deleted keyed nodes
        for (const [key] of oldByKey) {
            if (!newByKey.has(key)) {
                this.effects.push({ type: 'DELETE', key });
            }
        }
    }

    /**
     * Check if a node needs updating.
     */
    private needsUpdate(oldNode: VNode, newNode: VNode): boolean {
        if (oldNode.tag !== newNode.tag) return true;

        // Compare attributes
        const oldKeys = Object.keys(oldNode.attrs).sort();
        const newKeys = Object.keys(newNode.attrs).sort();
        if (oldKeys.length !== newKeys.length) return true;

        for (const key of oldKeys) {
            if (oldNode.attrs[key] !== newNode.attrs[key]) return true;
        }

        // Compare text children
        const oldText = oldNode.children.filter((c): c is string => typeof c === 'string').join('');
        const newText = newNode.children.filter((c): c is string => typeof c === 'string').join('');
        if (oldText !== newText) return true;

        // Compare child count
        if (oldNode.children.length !== newNode.children.length) return true;

        return false;
    }

    // ========================================
    // Commit Phase (synchronous)
    // ========================================

    /**
     * Apply all pending DOM operations.
     */
    private commitEffects(): void {
        const root = this.shadowRoot!;
        const children = Array.from(root.children);

        for (const effect of this.effects) {
            this.applyEffect(effect, root, children);
        }

        // Swap trees
        this.currentTree = this.pendingTree;
        this.pendingTree = null;
        this.effects = [];
        this.isReconciling = false;

        // Notify subclass
        this.onCommit();
    }

    /**
     * Apply a single DOM operation.
     */
    private applyEffect(effect: PatchOperation, root: ShadowRoot, children: Element[]): void {
        switch (effect.type) {
            case 'CREATE': {
                const newEl = vnodeToElementLegacy(effect.node!) as Element;
                if (effect.index !== undefined && effect.index < children.length) {
                    root.insertBefore(newEl, children[effect.index]);
                } else {
                    root.appendChild(newEl);
                }
                break;
            }

            case 'UPDATE': {
                let target: Element | null = null;
                if (effect.key) {
                    target = root.querySelector(`[id="${effect.key}"], [data-key="${effect.key}"]`);
                } else if (effect.index !== undefined && children[effect.index]) {
                    target = children[effect.index];
                }
                if (target && effect.node) {
                    this.patchElement(target, effect.node);
                }
                break;
            }

            case 'REPLACE': {
                const target = effect.index !== undefined ? children[effect.index] : null;
                if (target && effect.node) {
                    const newEl = vnodeToElementLegacy(effect.node) as Element;
                    root.replaceChild(newEl, target);
                }
                break;
            }

            case 'DELETE': {
                let target: Element | null = null;
                if (effect.key) {
                    target = root.querySelector(`[id="${effect.key}"], [data-key="${effect.key}"]`);
                } else if (effect.index !== undefined && children[effect.index]) {
                    target = children[effect.index];
                }
                target?.remove();
                break;
            }
        }
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

        // Remove old attributes not in new vnode
        for (const attr of Array.from(element.attributes)) {
            if (!(attr.name in vnode.attrs)) {
                element.removeAttribute(attr.name);
            }
        }

        // Update text content for leaf nodes
        const textChildren = vnode.children.filter((c): c is string => typeof c === 'string');
        const elementChildren = vnode.children.filter((c): c is VNode => typeof c !== 'string');

        if (textChildren.length > 0 && elementChildren.length === 0) {
            // Leaf node with only text
            element.textContent = textChildren.join('');
        } else if (elementChildren.length > 0) {
            // Has element children - recursively patch
            const existingChildren = Array.from(element.children);

            for (let i = 0; i < elementChildren.length; i++) {
                const childVNode = elementChildren[i];
                const existingChild = existingChildren[i];

                if (!existingChild) {
                    // Append new child
                    element.appendChild(vnodeToElementLegacy(childVNode));
                } else if (existingChild.tagName.toLowerCase() === childVNode.tag) {
                    // Patch existing child
                    this.patchElement(existingChild, childVNode);
                } else {
                    // Replace with different tag
                    element.replaceChild(vnodeToElementLegacy(childVNode), existingChild);
                }
            }

            // Remove extra children
            for (let i = elementChildren.length; i < existingChildren.length; i++) {
                existingChildren[i].remove();
            }
        }
    }

    // ========================================
    // Utility Methods
    // ========================================

    /**
     * Force an immediate synchronous render (bypasses batching).
     */
    protected forceRender(): void {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
        this.pendingTree = htmlToVNodes(this.template());
        this.isReconciling = true;
        this.effects = [];
        this.reconcileSync();
    }
}

