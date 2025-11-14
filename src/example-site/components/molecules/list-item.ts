import { BaseElement } from '../../../_core/elements/base-element.ts';

class ListItme extends BaseElement {
    static get observedAttributes() { return ['text', 'id' ]; }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'region');
        this.renderTemplate();
    }

    renderTemplate() {
        const srcdoc = `<!DOCTYPE html><html><head><base target='_parent'></head><body><script src='${this.getAttribute('gist')}'></script></body></html>`;
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4">
                <iframe
                    class="w-full border rounded"
                    style="min-height:300px; background:white;"
                    width="100%"
                    height="100%"
                    srcdoc='${srcdoc.replace(/'/g, "&#39;")}'>
                </iframe>
            </div>
        `;
    }
}

customElements.define('list-item', ListItme);
