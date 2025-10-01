import { BaseElement } from '../../../_core/elements/base-element.ts';

class CodeGist extends BaseElement {
    static get observedAttributes() {
        return ['width'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'region');
        this.renderTemplate();
    }

    renderTemplate() {
        // Use an iframe with srcdoc to embed the gist
        const gistId = '6bf78a90f12203ed2228f5f214e75f61';
        const gistUser = 'ChenPeleg';
        const srcdoc = `\n<!DOCTYPE html>\n<html>\n<head>\n  <base target='_parent'>\n</head>\n<body>\n  <script src='https://gist.github.com/${gistUser}/${gistId}.js'></script>\n</body>\n</html>\n`;
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4">
                <iframe
                    class="w-full border rounded"
                    style="min-height:300px; background:white;"
                    width="100%"
                    height="400"
                    srcdoc='${srcdoc.replace(/'/g, "&#39;")}'
                    title="GitHub Gist"
                    frameborder="0"
                    loading="lazy"
                ></iframe>
            </div>
        `;
    }
}

customElements.define('code-gist', CodeGist);
