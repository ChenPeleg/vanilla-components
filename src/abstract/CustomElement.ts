
interface CustomElementMethods  {
    /**
     * The `Element.observedAttributes` A static value (or a static getter) that returns an array of attribute names to observe for changes.These attributes will trigger the `attributeChangedCallback` method when they are changed, added, removed, or replaced.
     * @static
     * @return {string[]}
     * @see  {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes|MDN - observedAttributes}
     * @example
     * static observedAttributes() {
     *   return ['value', 'disabled'];
     * }
     */
    observedAttributes?(): string[];


    /**
     * The `Element.attributeChangedCallback()` is Called when attributes are changed, added, removed, or replaced.
     * The attributes that are observed are defined in the `observedAttributes` value.
     * Inside this method, you can check the name of the attribute that changed, and take appropriate action based on the new value.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes
     * @example
     * attributeChangedCallback(name :string, oldValue, newValue) {
     *   if (name === 'value' && oldValue !== newValue) {
     *     this.render();
     *   }
     * }
     */
    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;

    /**
     * Called each time the element is added to the document.
     * The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
     * @example
     * connectedCallback() {
     *   this.render();
     * }
     */
    connectedCallback?(): void

    /**
     * Called each time the element is removed from the document.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
     * @example
     * disconnectedCallback() {
     *   // Handle Cleanup logic
     * }
     */
    disconnectedCallback?(): void

    /**
     * When defined, this is called instead of connectedCallback() and disconnectedCallback() each time the element is moved to a different place in the DOM via Element.moveBefore().
     * Use this to avoid running initialization/cleanup code in the connectedCallback() and disconnectedCallback() callbacks when the element is not actually being added to or removed from the DOM.
     * See Lifecycle callbacks and state-preserving moves for more details.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
     * @example
     * connectedMoveCallback() {
     *   // Handle move logic here
     * }
     */
    connectedMoveCallback?(): void

    /**
     * Called each time the element is moved to a new document.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
     * @example
     * adoptedCallback() {
     *   // Handle adoption logic here
     * }
     */
    adoptedCallback?(): void ;


}
export type CustomElement = Partial<CustomElementMethods>
