import vanillaLogo from '../../assets/images/vanilla-flower.png';
import {BaseElement} from '../../_core/elements/base-element.ts';

class LogoComponent extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `  
        <div class="flex flex-col items-center justify-center p-4 agbalumo-regular">
        <img src="${vanillaLogo}" alt="Vaniall Logo" class="w-80 h-80  ">
        <h1 class="text-4xl font-bold text-gray-800 mt-4 text-center">Vanilla Custom Elements </h1>
        </div> 
    `;
    }
}

customElements.define('logo-component', LogoComponent);

