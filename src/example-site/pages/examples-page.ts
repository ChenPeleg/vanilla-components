import {BaseElement} from '../../_core/elements/base-element.ts';
import {examples, DocumentationKind, type DocumentationType} from '../documentation/documentation.ts';

class ExamplesPage extends BaseElement {
    private examplesDocs = examples;

    buildDocUnit(doc: DocumentationType) {
        switch (doc.type) {
            case DocumentationKind.header:
                return `<header-2> ${doc.content} </header-2>`;
            case DocumentationKind.gist:
                return `<code-gist gist="${doc.content}"></code-gist>`;
            case DocumentationKind.html:
                return doc.content;
            case DocumentationKind.Text:
            default:
                return `<p class="text-gray-700 text-lg mt-4"> ${doc.content} </p>`;
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-y-auto bg-fuchsia-100 w-full h-full p-5 flex flex-col items-center">
                <article class="max-w-3xl">
                    <header-1> Practical Examples </header-1>
                    <p class="text-gray-700 text-lg mt-4">
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

