import {BaseElement} from '../../_core/elements/base-element.ts';

class HomePage extends BaseElement {


    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <main class="overflow-hidden bg-slate-200  w-full h-full">
                <div class="flex flex-row   justify-center h-full">
                    <div class="flex-1 bg-amber-200 flex flex-col items-center justify-start">
                      <use-case-panel></use-case-panel>
                    </div>
                    <div class="flex-1 bg-green-400 flex flex-col items-center justify-start">
                        <hero-section></hero-section>
                    </div>
                    <div class="flex-1 bg-blue-300">
                        <state-management-panel></state-management-panel>
                    </div>
                </div>
            </main>
        `;
    }
}

customElements.define('home-page', HomePage);

