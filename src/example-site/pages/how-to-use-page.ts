import {BaseElement} from '../../_core/elements/base-element.ts';

class HowToUsePage extends BaseElement {

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-hidden bg-amber-200  w-full h-full p-5 flex flex-col items-center">
                <article class="max-w-3xl">
                    <header-1> How to use  </header-1>
                    <header-2>  The base element </header-2>
                    <p class="text-gray-700 text-lg mt-4">
                        The base element is a custom web component that extends the functionality of the native HTML element.
                        It provides a foundation for creating reusable components with encapsulated styles and behavior.
                    </p>
                    <code-gist> 
                    </code-gist>
                </article>
            </main>
        `;
    }
}

customElements.define('how-to-use-page', HowToUsePage);

