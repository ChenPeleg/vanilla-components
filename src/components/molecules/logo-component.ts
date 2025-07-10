import vanillaLogo from '../../assets/images/vanilla-flower.png';
import {BaseElement} from '../../_core/elements/base-element.ts';

class LogoComponent extends BaseElement {
    content = [{
        header: 'The Challenge',
        text: 'Build a front end web site with zero dependencies (dev-dependencies are allowed)'
    }, {
        header: 'The Solution',
        text: 'Use Vanilla Custom Elements to build a front end web site with zero dependencies'
    }, {
        header: 'The Result',
        text: 'A front end web site that is fast, lightweight and easy to maintain'
    }]

    static get observedAttributes() {
        return ['width'];
    }

    renderTemplate() {
        //language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 agbalumo-regular">
                <img src="${vanillaLogo}" alt="Vaniall Logo" class="w-80 h-80  ">
                <h1 class="text-4xl font-bold text-gray-800 mt-4 text-center">Vanilla Custom Elements </h1>
                <div>

                </div>
            </div>
        `;
    }
}

customElements.define('logo-component', LogoComponent);

