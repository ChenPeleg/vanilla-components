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
export function vnodeToElementLegacy(vnode: VNode | string): Node {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    const el = document.createElement(vnode.tag);
    for (const [key, value] of Object.entries(vnode.attrs)) {
        el.setAttribute(key, value);
    }
    for (const child of vnode.children) {
        el.appendChild(vnodeToElementLegacy(child));
    }
    return el;
}

/**
 * Converts a VNode (or text) to an HTML string.
 */
function vnodeToString(vnode: VNode | string): string {
    if (typeof vnode === 'string') {
        return vnode;
    }

    const attrs = Object.entries(vnode.attrs)
        .map(([key, value]) => ` ${key}="${value}"`)
        .join('');

    const childrenHtml = vnode.children.map(vnodeToString).join('');

    // Self-closing tags
    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];
    if (voidElements.includes(vnode.tag)) {
        return `<${vnode.tag}${attrs} />`;
    }

    return `<${vnode.tag}${attrs}>${childrenHtml}</${vnode.tag}>`;
}

/**
 * Converts an array of VNodes to a div element with class="contents" containing all children.
 */
export function vnodeToHTMLString(vnodes: VNode[]): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'contents';
    div.innerHTML = vnodes.map(vnodeToString).join('');
    return div;
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
