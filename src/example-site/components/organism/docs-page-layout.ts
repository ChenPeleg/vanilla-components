import { BaseElement } from '../../../_core/elements/base-element.ts';
import {SiteColors} from '../../colors/siteColors.ts';

export class DocsPageLayout extends BaseElement {
    static get observedAttributes() {
        return ['title', 'intro', 'bg'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'main');
        this.setAttribute('aria-label', this.getAttribute('title') || 'Documentation');
    }

    protected renderTemplate() {
        const title = this.getAttribute('title') || '';
        const bg = this.getAttribute('bg') || 'bg-white';
        const intro = this.getAttribute('intro') || '';

        this.shadowRoot!.innerHTML = `
            <main class="overflow-y-auto ${bg} w-full h-full px-4 md:px-5   lg:px-8 py-5 flex flex-col items-center">
                <article class="max-w-full md:max-w-3xl">
                    <header-1> ${title} </header-1>
                    ${intro ? `<p class=\"${SiteColors.textMain} text-base sm:text-lg mt-4\">${intro}</p>` : ''}
                    <slot></slot>
                </article>
            </main>
        `;
    }
}

customElements.define('docs-page-layout', DocsPageLayout);

