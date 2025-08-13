import {BaseElement} from '../../../src/_core/elements/base-element.ts';


class UseCasePanel extends BaseElement {

    connectedCallback() {
        super.connectedCallback();

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-4 p-8">
                <card-component id="card-when" header="When to use">
                    <p class="text-gray-700 text-base block overflow-ellipsis">
                        The most common use case for this when you have a site or some side project, that you want to showcase
                        in a single page. The advantage of this approach is that you have nearly zero dependencies to maintain.
                    </p>
                </card-component>
                <card-component id="card-how" header="How to use">
                    <article>

                        <p class="text-gray-700 text-base text-ellipsis block overflow-hidden">
                            The basic use of html custom elements is to create a new element, that can be used in your HTML.
                            This get be tiresome. So this stack is actually a way to reduce the amount of boilerplate code you have to
                            write.
                        </p>
                        <p class="text-gray-700 text-base text-ellipsis block overflow-hidden">
                            Check out:
                        <ul class=" list-disc list-inside flex flex-col gap-2 mt-3">
                            <li class="list-item">
                                <a> The development (front-end) stack </a>
                            </li>
                            <li class="list-item">
                                <a> Base element </a>

                            </li>

                        </ul>
                        </p>
                    </article>
                </card-component>
            </div>
        `;

    }
}

customElements.define('use-case-panel', UseCasePanel);
