import {BaseElement} from '../../base/base-element.ts';


export class ToggleButton extends BaseElement {

    protected _clickHandler: (result: { isActive: boolean }) =>   {
    };

    static get observedAttributes() {
        return ['class', 'isActive'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.$('button').addEventListener('click', () => {
            const isActive = this.getAttribute('isActive') === 'true';
            this.setAttribute('isActive', String(!isActive));
            this.update();

            this.clickHandler({isActive})
        });
    }

    set clickHandler(callBack : typeof this._clickHandler ) {
        if (typeof callBack !== 'function') {
            throw new Error('clickHandler must be a function');
        }
        this._clickHandler = callBack;
    };
    get clickHandler():  (typeof this._clickHandler)   {
        return this._clickHandler ;
    }

    update() {
        const isActive = this.getAttribute('isActive') === 'true';
        this.$<HTMLSpanElement>('#toggle-nob').classList.toggle('translate-x-4', isActive);
    }

    render() {
        const _class = this.getAttribute('class') || '';
        const isActive = this.getAttribute('isActive') === 'true';
        (this.shadowRoot as ShadowRoot).innerHTML = `   
        <button class="${_class} px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center justify-center">
            <span id="toggle-nob" class="w-6 h-6 bg-white rounded-full ${isActive ? 'translate-x-4' : ''} transition-transform"></span>
            <slot></slot>
        </button> 
    `;
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.update();
    }

}

customElements.define('toggle-button', ToggleButton);
