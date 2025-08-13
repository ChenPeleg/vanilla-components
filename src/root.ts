
import {BaseElement} from './_core/elements/base-element.ts';
import {appConfig} from './configuration/appConfig.ts';

class AppRoot extends BaseElement   {

    renderTemplate() {
        console.log(appConfig.environment);
        this.shadowRoot!.innerHTML = `  
      <div class="h-screen w-screen overflow-hidden ">  
         <router-outlet></router-outlet> 
      </div>
    `;
    }
}

customElements.define('app-root', AppRoot);

