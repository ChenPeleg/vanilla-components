import {BaseElement} from '../../_core/elements/base-element.ts';

class MainContent extends BaseElement {


    renderTemplate() {
        this.shadowRoot!.innerHTML = `  
       <main class="overflow-hidden bg-slate-200  w-full h-full">
       <div class="flex flex-row   justify-center h-full">
           <div class="flex-1 bg-amber-200 flex flex-col items-center justify-center">
             <card-component header="Card Header" text="This is a card component"></card-component>
           </div>
           <div class="flex-1 bg-green-400 flex flex-col items-center justify-start"> 
             <logo-component></logo-component>
             <div class="w-3/4 flex flex-row justify-center items-center text-gray-700 text-lg font-semibold"> 
               Tools and practices to build a custom elements website in ${new Date().getFullYear()}
             </div>
           </div>
           <div class="flex-1 bg-blue-300">
           <panel-state></panel-state>
          
           </div> 
       </div>
      </main>
    `;
    }
}

customElements.define('main-content', MainContent);

