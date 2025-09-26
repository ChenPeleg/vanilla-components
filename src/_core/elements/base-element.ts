import {globalStyleSheet} from '../tailwind-style-sheet.ts';
import type {CustomElement} from './CustomElement.ts';


export class BaseElement extends HTMLElement implements CustomElement {
    protected internals: ElementInternals;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.internals = this.attachInternals();

    }

    static get formAssociated() {
        return true
    };

    $<T extends HTMLElement>(selector: string): T {
        return this.shadowRoot?.querySelector(selector) as T
    }

    connectedCallback(): void {
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
        this.renderTemplate();
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        if (_newValue === _oldValue) {
            return;
        }
        this.update()
    }

    /**
     * This is used by the parent element to subscribe to changes in the child element.
     * The parent element can override it.
     * @param _result
     */
    public actionCallback = (_result: any) => {
    };

    protected update() {
    }

    protected renderTemplate() {
        throw `[BaseElement] ${this.constructor.name} render method must be implemented in the derived class.`
    }
}


