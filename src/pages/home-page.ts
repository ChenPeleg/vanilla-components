import {BaseElement} from '../_core/elements/base-element.ts';
import {servicesProvider} from '../services/ServicesProvider.ts';
import {LocalStorageService} from '../services/LocalStorage.service.ts';

class HomePage extends BaseElement {
    private readonly servicesProvider = servicesProvider


    renderTemplate() {
        const ls = this.servicesProvider.getService(LocalStorageService);
        ls.setItem('test', 'This is a test value');
        this.shadowRoot!.innerHTML = `  
       <main class="overflow-hidden bg-slate-200  w-full h-full">
       <div class="flex flex-row   justify-center h-full">
           <div class="flex-1 bg-amber-200 flex flex-col items-center justify-center">
             <card-component header="Card Header" text="This is a card component"></card-component>
           </div>
           <div class="flex-1 bg-green-400 flex flex-col items-center justify-start"> 
            <hero-section></hero-section>
           </div>
           <div class="flex-1 bg-blue-300">
           <panel-state></panel-state>
          
           </div> 
       </div>
      </main>
    `;
    }
}

customElements.define('main-content', HomePage);

