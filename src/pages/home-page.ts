import {BaseElement} from '../_core/elements/base-element.ts';

class HomePage extends BaseElement {


    renderTemplate() {
        this.shadowRoot!.innerHTML = `  
      <main-content/>
    `;
    }
}

customElements.define('home-page', HomePage);

