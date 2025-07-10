import {BaseElement} from '../../_core/elements/base-element.ts';

class HeroSection extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `  
        <div class="flex flex-col items-center justify-center p-4 agbalumo-regular">
       <logo-component></logo-component>
             <div class="w-3/4 flex flex-row justify-center items-center text-gray-700 text-lg font-semibold"> 
               Tools and practices to build a custom elements website in ${new Date().getFullYear()}
             </div>
             
        </div> 
    `;
    }
}

customElements.define('hero-section', HeroSection);

