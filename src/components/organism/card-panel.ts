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
                <card-component id="card" header="Card Header" height="420px">
                    <p class="text-gray-700 text-base">
                        This is a simple card component that can be used to display content.
                    </p>
                </card-component>
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
