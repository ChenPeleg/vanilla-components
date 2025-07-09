import {globalStyleSheet} from '../core/tailwind-style-sheet.ts';
import type {CustomElement} from './CustomElement.ts';


export class BaseElement extends HTMLElement implements CustomElement {
    static get formAssociated  () {
       return  true
    };
    protected internals: ElementInternals;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.internals = this.attachInternals();

    }

    $<T extends HTMLElement>(selector: string): T {
        return this.shadowRoot?.querySelector(selector) as T
    }

    connectedCallback(): void {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.renderTemplate();
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        this.update()
    }

    protected actionCallback = (_result: any) => {
    };

    protected update() {
    }

    protected renderTemplate() {
        throw `[BaseElement] ${this.constructor.name} render method must be implemented in the derived class.`
    }
}


