import {BaseElement} from '../../_core/elements/base-element.ts';


class CardPanel extends BaseElement {
    private state: {
        isCardOpen: boolean,
    } = {
        isCardOpen: false,
    };

    connectedCallback() {
        super.connectedCallback();
        this.$('card-component')?.addEventListener('click', () => {
            this.click()
        });
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-4 p-8">
                <card-component-folded id="card" header="When to use"  >
                    <p class="text-gray-700 text-base">
                        The most common use case for this when you have a site or some side project, that you want to showcase
                        in a single page. The advantage of this approach is that you have nearly zero dependencies to maintain.
                    </p>
                </card-component-folded>
            </div>
        `;
        this.update();
    }

    click() {
        this.state.isCardOpen = !this.state.isCardOpen;
        this.update()


    }

    update() {
        const card = this.$<HTMLElement>('#card') as HTMLElement;
        card.setAttribute('height', this.state.isCardOpen ? '420px' : '200px');
    }
}

customElements.define('card-panel', CardPanel);
