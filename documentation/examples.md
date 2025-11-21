# Practical Examples

Explore real-world examples demonstrating key patterns and features of Vanilla Components. Each example includes complete, working code that you can use as a starting point for your own components.

## Interactive Button Component

💡 **Try the Live Example:**
This interactive button example below demonstrates click handling, disabled states, and how parent components can listen to the `actionCallback`.

A complete button component demonstrating click handling, disabled states, and custom styling.

```typescript
class InteractiveButton extends BaseElement {
    static get observedAttributes() {
        return ['label', 'disabled'];
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

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) {
            return;
        }
        this.update();
    }

    update() {
        const button = this.$<HTMLButtonElement>('button');
        if (!button) return;
        
        const label = this.getAttribute('label') || 'Click me';
        const disabled = this.getAttribute('disabled') === 'true';
        
        button.textContent = label;
        button.disabled = disabled;
    }

    renderTemplate() {
        const label = this.getAttribute('label') || 'Click me';
        const disabled = this.getAttribute('disabled') === 'true';
        
        this.shadowRoot!.innerHTML = `
            <button 
                class="px-6 py-3 text-white rounded-lg font-semibold 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       bg-blue-500 hover:bg-blue-600"
                ${disabled ? 'disabled' : ''}>
                ${label}
            </button>
        `;
    }
}

customElements.define('interactive-button', InteractiveButton);
```

### Usage Example

```html
<!-- Primary button -->
<interactive-button label="Save"></interactive-button>

<!-- Disabled button -->
<interactive-button label="Delete" disabled="true"></interactive-button>

<!-- With event handler -->
<script>
    const btn = document.querySelector('interactive-button');
    btn.actionCallback = (result) => {
        console.log('Button clicked at:', result.timestamp);
    };
</script>
```

## Form Input with Validation

A text input component with real-time validation and error messages.

```typescript
class ValidatedInput extends BaseElement {
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
        
        this.shadowRoot!.innerHTML = `
            <div class="mb-4">
                <label class="block ${SiteColors.textMain} font-semibold mb-2">
                    ${label} ${required ? '<span class="text-red-500">*</span>' : ''}
                </label>
                <input 
                    type="text"
                    placeholder="${placeholder}"
                    class="w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} 
                           rounded-lg focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}"
                />
                ${error ? `<p class="text-red-500 text-sm mt-1">${error}</p>` : ''}
            </div>
        `;
    }
}

customElements.define('validated-input', ValidatedInput);
```

## Expandable Card Component

A card component with expand/collapse functionality and different states.

```typescript
class ExpandableCard extends BaseElement {
    private expanded = false;

    static get observedAttributes() {
        return ['title', 'subtitle'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        
        const header = this.$<HTMLElement>('.card-header');
        header.addEventListener('click', () => {
            this.expanded = !this.expanded;
            this.update();
        });
    }

    update() {
        const content = this.$<HTMLElement>('.card-content');
        const icon = this.$<HTMLElement>('.toggle-icon');
        
        if (this.expanded) {
            content.classList.remove('hidden');
            icon.textContent = '▼';
        } else {
            content.classList.add('hidden');
            icon.textContent = '▶';
        }
    }

    renderTemplate() {
        const title = this.getAttribute('title') || 'Card Title';
        const subtitle = this.getAttribute('subtitle') || '';
        
        this.shadowRoot!.innerHTML = `
            <div class="${SiteColors.cardBackgroundBg} rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div class="card-header p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer flex justify-between items-center">
                    <div>
                        <h3 class="text-xl font-bold">${title}</h3>
                        ${subtitle ? `<p class="text-sm opacity-90">${subtitle}</p>` : ''}
                    </div>
                    <span class="toggle-icon text-2xl">▶</span>
                </div>
                <div class="card-content hidden p-4">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('expandable-card', ExpandableCard);
```

## Global Counter with Store

A practical example showing how to connect components to the global store for state management.

```typescript
// Counter actions
export const CounterActions = {
    INCREMENT: 'COUNTER_INCREMENT',
    DECREMENT: 'COUNTER_DECREMENT',
    RESET: 'COUNTER_RESET'
} as const;

// Counter component
class GlobalCounterDisplay extends BaseElement {
    private subscription?: Subscription;
    private count = 0;

    connectedCallback(): void {
        super.connectedCallback();
        
        const store = _ServicesProvider.getService(Store);
        
        // Subscribe to state changes
        this.subscription = store.subscribe((state) => {
            this.count = state.counter || 0;
            this.updateDisplay();
        });
        
        // Setup button listeners
        this.$<HTMLButtonElement>('.increment').addEventListener('click', () => {
            store.dispatch({ type: CounterActions.INCREMENT });
        });
        
        this.$<HTMLButtonElement>('.decrement').addEventListener('click', () => {
            store.dispatch({ type: CounterActions.DECREMENT });
        });
        
        this.$<HTMLButtonElement>('.reset').addEventListener('click', () => {
            store.dispatch({ type: CounterActions.RESET });
        });
    }

    disconnectedCallback(): void {
        this.subscription?.unsubscribe();
    }

    updateDisplay() {
        this.$<HTMLSpanElement>('.count').textContent = String(this.count);
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 class="text-2xl font-bold mb-4">Global Counter</h2>
                <div class="text-6xl font-bold text-blue-600 mb-6">
                    <span class="count">0</span>
                </div>
                <div class="flex gap-2 justify-center">
                    <button class="decrement px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        -
                    </button>
                    <button class="reset px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Reset
                    </button>
                    <button class="increment px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        +
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('global-counter-display', GlobalCounterDisplay);
```

## Navigation with Router

Example showing how to implement navigation between pages using the hash router.

```typescript
// Navigation component
class AppNavigation extends BaseElement {
    connectedCallback(): void {
        super.connectedCallback();
        
        // Listen for route changes
        window.addEventListener('hashchange', () => {
            this.updateActiveLink();
        });
        
        this.updateActiveLink();
    }

    updateActiveLink() {
        const currentPath = window.location.hash.slice(1) || '/';
        const links = this.shadowRoot!.querySelectorAll('a');
        
        links.forEach(link => {
            const href = link.getAttribute('href')?.slice(1) || '';
            if (href === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <nav class="bg-gray-800 p-4">
                <ul class="flex gap-4">
                    <li>
                        <a href="#/" 
                           class="px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#/about" 
                           class="px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#/products" 
                           class="px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors">
                            Products
                        </a>
                    </li>
                </ul>
                <style>
                    a.active {
                        background-color: #3b82f6;
                    }
                </style>
            </nav>
        `;
    }
}

customElements.define('app-navigation', AppNavigation);
```
