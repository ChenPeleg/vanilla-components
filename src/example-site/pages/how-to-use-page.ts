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
            case DocumentationKind.gist:
                return `<code-gist gist="${doc.content}"></code-gist>`;
            case DocumentationKind.code:
                return `<pre class="bg-gray-800 text-white p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm break-words whitespace-pre-wrap"><code class="break-words">${doc.content}</code></pre>`;
            case DocumentationKind.html:
                return doc.content;
            case DocumentationKind.Text:
            default:
                return `<p class="text-gray-700 text-base sm:text-lg mt-4"> ${doc.content} </p>`;
        }

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-y-auto bg-amber-200  w-full h-full px-4 md:px-5 lg:px-8 py-5 flex flex-col items-center">
                <article class="max-w-full md:max-w-3xl">
                    <header-1> How to use  </header-1>
                     ${this.howTouseDocs.map(doc => this.buildDocUnit(doc)).join('')}
                </article>
            </main>
        `;
    }
}

customElements.define('how-to-use-page', HowToUsePage);

