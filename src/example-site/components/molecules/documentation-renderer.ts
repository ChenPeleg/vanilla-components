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

    private buildDocUnit(doc: DocumentationType): string {
        switch (doc.type) {
            case DocumentationKind.header:
                return `<div class="mt-3"><header-2> ${doc.content} </header-2></div>`;
            case DocumentationKind.gist:
                return `<code-gist gist="${doc.content}"></code-gist>`;
            case DocumentationKind.code:
                return `<pre class="bg-gray-800 text-white p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm break-words whitespace-pre-wrap"><code class="break-words">${doc.content}</code></pre>`;
            case DocumentationKind.html:
                return doc.content;
            case DocumentationKind.highlightedCode:
                return `<div class="mb-4"><highlighted-code code="${doc.content}"></highlighted-code></div>`;
            case DocumentationKind.Text:
            default:
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

