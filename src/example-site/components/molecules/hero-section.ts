import {BaseElement} from '../../../_core/elements/base-element.ts';
import {SiteColors} from '../../colors/siteColors.ts';

class HeroSection extends BaseElement {
    content = [{
        header: 'The Challenge',
        text: 'Build a front end web site with zero dependencies (dev-dependencies are allowed)'
    }, {
        header: 'The Solution',
        text: 'Use Vanilla Custom Elements (with Vite Typescript and TailwindCSS) to build a front end web site with zero dependencies'
    }, {
        header: 'The Result',
        text: 'Tools and practices to build a custom elements website in 2025'
    }]

    renderTemplate() {
        //language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 agbalumo-regular">
                <logo-component></logo-component> 
                <div class="flex flex-col gap-4">
                    ${this.content.map(item => `
                        <div class="  bg-white/10   shadow-lg rounded-lg p-6  w-full max-w-md">
                            <h2 class="inline font-agbalumo text-xl font-bold ${SiteColors.headerText} mb-2">${item.header}</h2> -
                            <p class="inline text-gray-600">${item.text}</p>
                        </div>
                    `).join('')}
                </div>
                 
            </div>
        `;
    }
}

customElements.define('hero-section', HeroSection);

