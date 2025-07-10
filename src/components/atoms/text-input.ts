import {BaseElement} from '../../_core/elements/base-element.ts';

export class TextInput extends BaseElement {
    static get observedAttributes() {
        return ['class', 'defaultValue'];
    }
    public get value() {
        return this.$<HTMLInputElement>('input').value;
    }
    public set value(newValue: string) {
        this.$<HTMLInputElement>('input').value = newValue;
        this.setAttribute('value', newValue);

    }


    inputCallback = (_result: { value: string }) => {
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.$('input').addEventListener('input', (e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            this.setAttribute('value', value);
            this.update();
            this.inputCallback({value});
        });
    }

    renderTemplate() {
        (this.shadowRoot as ShadowRoot).innerHTML = `
        <input type="text" class="${this.getAttribute('class') || ''} px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
        value="${this.getAttribute('defaultValue') || ''}" />
        `
    }

    update() {
        const value = this.$<HTMLInputElement>('input').value;
        this.setAttribute('value', value);
        this.inputCallback({value})
    }


}

customElements.define('text-input', TextInput);

