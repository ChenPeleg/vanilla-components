import {BaseElement} from '../_core/elements/base-element.ts';

class HowToUsePage extends BaseElement {

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-hidden bg-amber-200  w-full h-full p-5">
                <article>
                    <header-1> How to use? - The base element </header-1>
                </article>
            </main>
        `;
    }
}

customElements.define('about-page', HowToUsePage);

