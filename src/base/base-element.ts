import {globalStyleSheet} from '../core/tailwind-style-sheet.ts';
import type {CustomElement} from './CustomElement.ts';


export class BaseElement extends HTMLElement implements CustomElement {
    protected actionCallback =  (_result: any) =>   {
    };
    protected update  ()   {

    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    $<T extends HTMLElement>(selector: string): T {
        return this.shadowRoot?.querySelector(selector) as T
    }



    connectedCallback(): void {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.render();
    }
    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.update()
    }

    render() {
        throw `[BaseElement] ${this.constructor.name} render method must be implemented in the derived class.`
    }


}

// customElements.define('base-element', BaseElement);

