import {BaseElement} from '../../_core/elements/base-element.ts';
import {examples  } from '../documentation/documentation.ts';
import {DocumentationKind, type DocumentationType} from '../models/documentation.types.ts';

class ExamplesPage extends BaseElement {
    private examplesDocs = examples;

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
                case DocumentationKind.highlightedCode:
                return `<highlighted-code code="${doc.content}">${doc.content}</highlighted-code>`;
            case DocumentationKind.Text:
            default:
                return `<p class="text-gray-700 text-base sm:text-lg mt-4"> ${doc.content} </p>`;
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-y-auto bg-fuchsia-100 w-full h-full px-4 md:px-5 lg:px-8 py-5 flex flex-col items-center">
                <article class="max-w-full md:max-w-3xl">
                    <header-1> Practical Examples </header-1>
                    <p class="text-gray-700 text-base sm:text-lg mt-4">
                        Explore real-world examples demonstrating key patterns and features of Vanilla Components.
                        Each example includes complete, working code that you can use as a starting point for your own components.
                    </p>
                    ${this.examplesDocs.map(doc => this.buildDocUnit(doc)).join('')}
                </article>
            </main>
        `;
    }
}

customElements.define('examples-page', ExamplesPage);

