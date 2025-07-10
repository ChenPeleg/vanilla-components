import {BaseElement} from '../../_core/elements/base-element.ts';

class HeroSection extends BaseElement {
    content = [{
        header: 'The Challenge',
        text: 'Build a front end web site with zero dependencies (dev-dependencies are allowed)'
    }, {
        header: 'The Solution',
        text: 'Use Vanilla Custom Elements (with Vite Typescript and TailwindCSS) to build a front end web site with zero dependencies'
    }, {
        header: 'The Result',
        text: 'A front end web site that is fast, lightweight and easy to maintain'
    }]

    renderTemplate() {
        //language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 agbalumo-regular">
                <logo-component></logo-component>
                <div class="w-3/4 flex flex-row justify-center items-center text-gray-700 text-lg font-semibold">
                    Tools and practices to build a custom elements website in ${new Date().getFullYear()}
                </div>
                <div class="flex flex-col">
                    ${this.content.map(item => `
                        <div class="flex flex-col  bg-white/10   shadow-lg rounded-lg p-6 m-4 w-full max-w-md">
                            <h2 class="font-agbalumo text-2xl font-bold text-gray-800 mb-2">${item.header}</h2>
                            <p class="text-gray-600">${item.text}</p>
                        </div>
                    `).join('')}
                </div>
                 
            </div>
        `;
    }
}

customElements.define('hero-section', HeroSection);

