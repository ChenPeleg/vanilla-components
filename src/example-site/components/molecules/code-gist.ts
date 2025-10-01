//
import {BaseElement} from '../../../_core/elements/base-element.ts';

class CodeGist extends BaseElement {
    static get observedAttributes() {
        return ['width'];
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 ">
            <script src="gist.github.com/ChenPeleg/6bf78a90f12203ed2228f5f214e75f61.js"></script>
   </div>
        `;
    }
}

customElements.define('code-gist', CodeGist);

