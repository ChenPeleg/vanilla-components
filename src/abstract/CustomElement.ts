export interface CustomElement  {

    /**
     * Returns the list of attribute names to observe for changes. When one of these attributes changes, attributeChangedCallback will be invoked.
     * This must be implemented as a static getter in subclasses.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#observedattributes
     * @example
     * static get observedAttributes() { return ['value', 'checked']; }
     */
      get observedAttributes(): string[]  ;

    /**
     * Called each time the element is added to the document.
     * The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElement/connectedCallback
     * @example
     * connectedCallback() {
     *   this.render();
     * }
     */
    connectedCallback(): void

    /**
     * Called each time the element is removed from the document.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElement/disconnectedCallback
     * @example
     * disconnectedCallback() {
     *   // Cleanup logic here
     * }
     */
    disconnectedCallback(): void

    /**
     * When defined, this is called instead of connectedCallback() and disconnectedCallback() each time the element is moved to a different place in the DOM via Element.moveBefore().
     * Use this to avoid running initialization/cleanup code in the connectedCallback() and disconnectedCallback() callbacks when the element is not actually being added to or removed from the DOM.
     * See Lifecycle callbacks and state-preserving moves for more details.
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#lifecycle-callbacks-and-state-preserving-moves
     * @example
     * connectedMoveCallback() {
     *   // Handle move logic here
     * }
     */
    connectedMoveCallback(): void

    /**
     * Called each time the element is moved to a new document.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElement/adoptedCallback
     * @example
     * adoptedCallback() {
     *   // Handle adoption logic here
     * }
     */
    adoptedCallback(): void ;

    /**
     * Called when attributes are changed, added, removed, or replaced.
     * See Responding to attribute changes for more details about this callback.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElement/attributeChangedCallback
     * @example
     * attributeChangedCallback(name, oldValue, newValue) {
     *   if (name === 'value') {
     *     this.render();
     *   }
     * }
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void ;

}
