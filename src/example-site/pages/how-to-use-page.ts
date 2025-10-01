import {BaseElement} from '../../_core/elements/base-element.ts';
import {documentation, DocumentationKind, type DocumentationType} from '../documentation/documentation.ts';

class HowToUsePage extends BaseElement {
    private howTouseDocs = documentation
    constructor() {
        super();

    }
    buildDocUnit(doc: DocumentationType) {
        switch (doc.type) {
            case DocumentationKind.header:
                return `<header-2> ${doc.content} </header-2>`;
            case DocumentationKind.code:
                return `<code-gist> ${doc.content} </code-gist>`;
            case DocumentationKind.html:
                return doc.content;
            case DocumentationKind.text:
            default:
                return `<p class="text-gray-700 text-lg mt-4"> ${doc.content} </p>`;


        }

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-hidden bg-amber-200  w-full h-full p-5 flex flex-col items-center">
                <article class="max-w-3xl">
                    <header-1> How to use  </header-1>
                     ${this.howTouseDocs.map(doc => this.buildDocUnit(doc)).join('')}
                </article>
            </main>
        `;
    }
}

customElements.define('how-to-use-page', HowToUsePage);

