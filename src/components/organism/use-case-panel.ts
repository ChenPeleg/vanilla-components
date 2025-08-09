import {BaseElement} from '../../_core/elements/base-element.ts';


class UseCasePanel extends BaseElement {
    private state: {
        openCard: false | 'when' | 'how'
    } = {
        openCard: false,
    };

    connectedCallback() {
        super.connectedCallback();
        // this.$('#card-when')?.addEventListener('click', () => {
        //     this.clickCard('when')
        // });
        // this.$('#card-how')?.addEventListener('click', () => {
        //     this.clickCard('how')
        // });
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-4 p-8">
                <card-component id="card-when" header="When to use">
                    <p class="text-gray-700 text-base block overflow-ellipsis">
                        The most common use case for this when you have a site or some side project, that you want to showcase
                        in a single page. The advantage of this approach is that you have nearly zero dependencies to maintain.
                        in a single page. The advantage of this approach is that you have nearly zero dependencies to maintain.
                    </p>
                </card-component>
                <card-component id="card-how" header="How to use">
                    <p class="text-gray-700 text-base text-ellipsis block overflow-hidden">
                        The basic use of html custom elements is to create a new element, that can be used in your HTML.
                        This get be tiresome. So this stack is actually a way to reduce the amount of boiler plate code you have to write.
                    </p>
                </card-component>
            </div>
        `;
        this.update();
    }

    // clickCard(card : 'how' | 'when'  ) {
    //     this.state.openCard = card;
    //     this.update()
    // }

    update() {
        const cardHow = this.$<HTMLElement>('#card-how') as HTMLElement;
        const cardWhen= this.$<HTMLElement>('#card-when') as HTMLElement;
        cardHow.setAttribute('max-height', this.state.openCard  === 'how' ? '420px' : '200px');
        cardHow.setAttribute('height', this.state.openCard  === 'how' ? '420px' : '200px');
        cardHow.classList.toggle('line-clamp-3', this.state.openCard !== 'how');
        cardWhen.setAttribute('max-height', this.state.openCard  === 'when' ? '420px' : '200px');
        cardWhen.setAttribute('height', this.state.openCard  === 'when' ? '420px' : '200px');
        cardWhen.classList.toggle('line-clamp-3', this.state.openCard !== 'when');
    }
}

customElements.define('use-case-panel', UseCasePanel);
