/**
 * Naive Virtual DOM implementation for fiber-based reconciliation.
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

    // Extract only the tag name (first word, no attributes or whitespace)
    const tagName = vnode.tag.split(/[\s>]/)[0].toLowerCase();

    if (!tagName || !/^[a-z][a-z0-9-]*$/i.test(tagName)) {
        throw new Error(`[vnodeToElement] Invalid tag name: "${vnode.tag}"`);
    }

    const el = document.createElement(tagName);
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

