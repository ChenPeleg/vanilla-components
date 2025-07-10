import vanillaLogo from '../../assets/images/vanilla-flower.png';
import {BaseElement} from '../../_core/elements/base-element.ts';

class LogoComponent extends BaseElement {
    static get observedAttributes() {
        return ['width'];
    }

    renderTemplate() {
        const width = this.getAttribute('width') || '220';
        //language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 ">
                <img style="width: ${width}px" src="${vanillaLogo}" alt="Vanilla Logo">
                <h1 class="font-agbalumo text-4xl font-bold text-gray-800 mt-4 text-center">Vanilla Custom Elements </h1
            </div>
        `;
    }
}

customElements.define('logo-component', LogoComponent);

