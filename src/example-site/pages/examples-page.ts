import {BaseElement} from '../../_core/elements/base-element.ts';
import {examples  } from '../documentation/documentation.ts';
import {SiteColors} from '../colors/siteColors.ts';

class ExamplesPage extends BaseElement {
    private examplesDocs = examples;

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <docs-page-layout title="Practical Examples" bg="${SiteColors.examplesBgColor}" intro="Explore real-world examples demonstrating key patterns and features of Vanilla Components. Each example includes complete, working code that you can use as a starting point for your own components.">
                <documentation-renderer></documentation-renderer>
            </docs-page-layout>
        `;
        const renderer = this.$<any>('documentation-renderer');
        if (renderer) {
            renderer.docs = this.examplesDocs;
        }
    }
}

customElements.define('examples-page', ExamplesPage);
