import {BaseElement} from '../../_core/elements/base-element.ts';
import {documentation, } from '../documentation/documentation.ts';
import {SiteColors} from '../colors/siteColors.ts';

class HowToUsePage extends BaseElement {
    private howTouseDocs = documentation
    constructor() {
        super();

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <docs-page-layout title="How to use" bg="${SiteColors.textMain}">
                <documentation-renderer></documentation-renderer>
            </docs-page-layout>
        `;
        // pass docs via property to renderer
        const renderer = this.$<any>('documentation-renderer');
        if (renderer) {
            renderer.docs = this.howTouseDocs;
        }
    }
}

customElements.define('how-to-use-page', HowToUsePage);
