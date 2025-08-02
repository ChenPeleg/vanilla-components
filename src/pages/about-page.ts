import {BaseElement} from '../_core/elements/base-element.ts';

class AboutPage extends BaseElement {


    renderTemplate() {
        this.shadowRoot!.innerHTML = `  
       <main class="overflow-hidden bg-slate-200  w-full h-full">
       <div class="flex flex-row   justify-center h-full">
      About Page
       </div>
      </main>
    `;
    }
}

customElements.define('about-page', AboutPage);

