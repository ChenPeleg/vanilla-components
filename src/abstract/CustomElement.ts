  export class CustomElement extends HTMLElement {

    /**
     * Returns the list of attribute names to observe for changes. When one of these attributes changes, attributeChangedCallback will be invoked.
     * This must be implemented as a static getter in subclasses.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#observedattributes
     */
    static get observedAttributes(): string[]{return []};

    /**
     * Called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
     */
      connectedCallback(): void{};

    /**
     * Called each time the element is removed from the document.
     */
      disconnectedCallback(): void{};

    /**
     * When defined, this is called instead of connectedCallback() and disconnectedCallback() each time the element is moved to a different place in the DOM via Element.moveBefore(). Use this to avoid running initialization/cleanup code in the connectedCallback() and disconnectedCallback() callbacks when the element is not actually being added to or removed from the DOM. See Lifecycle callbacks and state-preserving moves for more details.
     */
      connectedMoveCallback(): void{};

    /**
     * Called each time when the element is moved to a new document.
     */
      adoptedCallback(): void{};

    /**
     * Called when attributes are changed, added, removed, or replaced. See Responding to attribute changes for more details about this callback.
     */
      attributeChangedCallback(_name: string, _oldValue: string, _newValue: string): void{};

}
