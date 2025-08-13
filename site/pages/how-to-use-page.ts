import {BaseElement} from '../../src/_core/elements/base-element.ts';

class HowToUsePage extends BaseElement {

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-hidden bg-amber-200  w-full h-full p-5">
                <article>
                    <header-1> How to use? - The base element </header-1>
                    <p class="text-gray-700 text-lg mt-4">
                        The base element is a custom web component that extends the functionality of the native HTML element.
                        It provides a foundation for creating reusable components with encapsulated styles and behavior.
                    </p>
                    <code-gist></code-gist>
                </article>
            </main>
        `;
    }
}

customElements.define('about-page', HowToUsePage);

