import { BaseElement } from '../../../_core/elements/base-element.ts';
import { DocumentationKind, type DocumentationType } from '../../models/documentation.types.ts';
import {SiteColors} from '../../colors/siteColors.ts';

export class DocumentationRenderer extends BaseElement {
    private _docs: DocumentationType[] = [];

    static get observedAttributes() {
        return ['class'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'group');
    }

    get docs(): DocumentationType[] {
        return this._docs;
    }

    set docs(value: DocumentationType[]) {
        this._docs = Array.isArray(value) ? value : [];
        this.renderTemplate()
    }

    /**
     * Encodes special HTML characters to prevent attribute value truncation
     * This is essential when passing code strings as HTML attribute values
     */
    private encodeHtmlAttribute(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    /**
     * Encodes HTML special characters for safe insertion as text content
     * This prevents XSS vulnerabilities when rendering user-provided content
     */
    private encodeHtmlContent(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    private buildDocUnit(doc: DocumentationType): string {
        switch (doc.type) {
            case DocumentationKind.header:
                // Headers are plain text and should be encoded to prevent XSS
                return `<div class="mt-3"><header-2> ${this.encodeHtmlContent(doc.content)} </header-2></div>`;
            case DocumentationKind.gist:
                return `<code-gist gist="${this.encodeHtmlAttribute(doc.content)}"></code-gist>`;
            case DocumentationKind.code:
                // Code content should be displayed as-is, not executed, so encode it
                return `<pre class="bg-gray-800 text-white p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm break-words whitespace-pre-wrap"><code class="break-words">${this.encodeHtmlContent(doc.content)}</code></pre>`;
            case DocumentationKind.html:
                // Intentionally allows raw HTML - content should be trusted
                return doc.content;
            case DocumentationKind.highlightedCode:
                return `<div class="mb-4"><highlighted-code code="${this.encodeHtmlAttribute(doc.content)}"></highlighted-code></div>`;
            case DocumentationKind.Text:
            default:
                // Note: Text content may contain intentional inline HTML tags (e.g., <code>)
                // All content is currently developer-controlled and hardcoded in TypeScript files
                // If user-provided content is ever added, consider creating a separate type
                // that explicitly allows HTML or sanitize the content
                return `<p class="${SiteColors.textMain} text-base sm:text-lg"> ${doc.content} </p>`;
        }
    }

    protected renderTemplate() {
        const content = (this._docs || []).map(doc => this.buildDocUnit(doc)).join('');
        this.shadowRoot!.innerHTML = `
            <div class="w-full flex flex-col gap-3">${content}</div>
        `;
    }
}

customElements.define('documentation-renderer', DocumentationRenderer);

