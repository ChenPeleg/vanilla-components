export const CODE_SNIPPETS = {
    INTERACTIVE_BUTTON: `class InteractiveButton extends BaseElement {
    static get observedAttributes() {
        return ['label', 'disabled', 'variant'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'button');
        
        this.$<HTMLButtonElement>('button').addEventListener('click', () => {
            if (this.getAttribute('disabled') !== 'true') {
                this.actionCallback({ type: 'clicked', timestamp: Date.now() });
            }
        });
    }

    renderTemplate() {
        const label = this.getAttribute('label') || 'Click me';
        const disabled = this.getAttribute('disabled') === 'true';
        const variant = this.getAttribute('variant') || 'primary';
        
        const variants = {
            primary: 'bg-blue-500 hover:bg-blue-600',
            secondary: 'bg-gray-500 hover:bg-gray-600',
            danger: 'bg-red-500 hover:bg-red-600'
        };
        //
        this.shadowRoot!.innerHTML =      &#60; button class='px-6 py-3 text-white rounded-lg font-semibold 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                \${disabled ? 'disabled' : ''} &rt;
                \${label} &rt;
             &#60; button &rt;
        ';
    }
}

customElements.define('interactive-button', InteractiveButton);`,

    VALIDATED_INPUT: `class ValidatedInput extends BaseElement {
    static get observedAttributes() {
        return ['label', 'placeholder', 'required', 'pattern', 'error'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        
        const input = this.$<HTMLInputElement>('input');
        input.addEventListener('input', () => {
            this.validate();
        });
        
        input.addEventListener('blur', () => {
            this.validate();
        });
    }

    validate() {
        const input = this.$<HTMLInputElement>('input');
        const value = input.value;
        const required = this.getAttribute('required') === 'true';
        const pattern = this.getAttribute('pattern');
        
        let error = '';
        
        if (required && !value) {
            error = 'This field is required';
        } else if (pattern && value && !new RegExp(pattern).test(value)) {
            error = 'Invalid format';
        }
        
        this.setAttribute('error', error);
        this.actionCallback({ valid: !error, value });
    }

    renderTemplate() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const error = this.getAttribute('error') || '';
        const required = this.getAttribute('required') === 'true';
        
        this.shadowRoot!.innerHTML = \\\`
            <div class="mb-4">
                <label class="block \${SiteColors.textMain} font-semibold mb-2">
                    \\\${label} \\\${required ? '<span class="text-red-500">*</span>' : ''}
                </label>
                <input 
                    type="text"
                    placeholder="\\\${placeholder}"
                    class="w-full px-4 py-2 border \\\${error ? 'border-red-500' : 'border-gray-300'} 
                           rounded-lg focus:outline-none focus:ring-2 \\\${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}"
                />
                \\\${error ? \\\`<p class="text-red-500 text-sm mt-1">\\\${error}</p>\\\` : ''}
            </div>
        \\\`;
    }
}

customElements.define('validated-input', ValidatedInput);`
};
