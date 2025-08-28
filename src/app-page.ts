import {BaseElement} from './_core/elements/base-element.ts';

import vanillaLogo from './assets/images/vanilla-flower.png';

export class SimpleButton extends BaseElement {
    connectedCallback(): void {
        super.connectedCallback();
        this.$<HTMLButtonElement>('button').addEventListener('click', () => this.actionCallback({clicked: true}));
    }
    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <button class="   px-4 py-2  text-black bg-slate-200 hover:border-[#646cff] border-2 border-transparent rounded cursor-pointer focus:border-black     transition duration-200">
                <slot></slot>
            </button>
        `;
    }
}

customElements.define('simple-button', SimpleButton);


class AppPage extends BaseElement {
    private state = {
        clicks: 0
    }

    connectedCallback() {
        super.connectedCallback();
        this.$<SimpleButton>('simple-button').actionCallback = () => {
            this.state.clicks++;
            this.update();
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full  w-full ">
                <div class="flex flex-col items-center justify-center gap-12 w-full h-full  lg:max-w-3/4 p-4">
                    <img class="h-32" src="${vanillaLogo}" alt="Vanilla Logo">
                    <h1 class="text-6xl font-bold text-gray-800 w-full text-center">
                        Vanilla Elements
                    </h1>
                    <simple-button>
                        Count is <span id="count-text"> 0 </span>
                    </simple-button>
                    <p>
                        Using  <a class="underline text-blue-500" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements">Custom elements</a> and
                        <a class="underline text-blue-500" href="https://tailwindcss.com/">TailWind</a>. <a class="underline text-blue-500" href="https://vite.dev/">Vite</a> and 
                        <a class="underline text-blue-500" href="typecriptlang.org/">TypeScript</a> for development.
                    </p>
                </div>
            </div>

        `;
    }

    update() {
        this.$<HTMLSpanElement>('#count-text').textContent = this.state.clicks.toString()
    }
}

customElements.define('app-page', AppPage);



