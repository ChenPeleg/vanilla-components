import { DocumentationKind, type DocumentationType } from '../models/documentation.types.ts';

// Installation & Setup
const installationDocs: DocumentationType[] = [
    {
        content: 'Installation & Setup',
        type: DocumentationKind.header,
    },
    {
        content: `There are two ways to get started with Vanilla Components: use it as an NPM package starter kit, or clone the repository directly.`
    },
    {
        content: 'Using NPM Package',
        type: DocumentationKind.header,
    },
    {
        content: `To create a new project using Vanilla Components, run the following command in your terminal:`
    },
    {
        content: `npx vanilla-components my-project-name
cd my-project-name
npm install
npm run dev`,
        type: DocumentationKind.code
    },
    {
        content: 'Cloning from GitHub',
        type: DocumentationKind.header,
    },
    {
        content: `Alternatively, you can clone the repository directly:`
    },
    {
        content: `git clone https://github.com/ChenPeleg/vanilla-components.git
cd vanilla-components
npm install
npm run dev`,
        type: DocumentationKind.code
    }
];

// Project Structure
const projectStructureDocs: DocumentationType[] = [
    {
        content: 'Understanding Project Structure',
        type: DocumentationKind.header,
    },
    {
        content: `The project follows a clear, organized structure based on atomic design principles:`
    },
    {
        content: `<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <p class="font-bold mb-2">📁 Key Directories</p>
            <ul class="list-disc pl-5 space-y-1">
                <li><strong>src/_core/</strong> - Core functionality (BaseElement, router, services)</li>
                <li><strong>src/example-site/components/atoms/</strong> - Basic UI elements (buttons, inputs)</li>
                <li><strong>src/example-site/components/molecules/</strong> - Component combinations</li>
                <li><strong>src/example-site/components/organism/</strong> - Complex UI sections</li>
                <li><strong>src/example-site/pages/</strong> - Full page components</li>
                <li><strong>tests/</strong> - Playwright test files</li>
            </ul>
        </div>`,
        type: DocumentationKind.html
    }
];

// Creating Your First Component
const firstComponentDocs: DocumentationType[] = [
    {
        content: 'Creating Your First Component',
        type: DocumentationKind.header,
    },
    {
        content: `Every component in Vanilla Components extends the <code>BaseElement</code> class. This provides Shadow DOM encapsulation, TailwindCSS integration, and useful utilities.`
    },
    {
        content: 'Basic Component Structure',
        type: DocumentationKind.header,
    },
    {
        content: `Here's a complete example of a simple button component:`
    },
    {
        content: `import { BaseElement } from '../_core/elements/base-element.ts';

class MyButton extends BaseElement {
    static get observedAttributes() {
        return ['label', 'disabled'];
    }

    connectedCallback(): void {
        super.connectedCallback(); // Always call first!
        this.setAttribute('role', 'button');
        this.renderTemplate();
    }

    renderTemplate() {
        const label = this.getAttribute('label') || 'Click me';
        const isDisabled = this.getAttribute('disabled') === 'true';
        
        this.shadowRoot!.innerHTML = \`
            <button 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                \${isDisabled ? 'disabled' : ''}>
                \${label}
            </button>
        \`;
    }
}

customElements.define('my-button', MyButton);`,
        type: DocumentationKind.code
    },
    {
        content: 'Key Points',
        type: DocumentationKind.header,
    },
    {
        content: `<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <p class="font-bold mb-2">⚡ Important</p>
            <ul class="list-disc pl-5 space-y-1">
                <li>Always extend <code>BaseElement</code></li>
                <li>Call <code>super.connectedCallback()</code> first in your connectedCallback</li>
                <li>Implement <code>renderTemplate()</code> method for your component's HTML</li>
                <li>Use <code>customElements.define()</code> to register your component</li>
                <li>Include <code>.ts</code> extension in imports</li>
            </ul>
        </div>`,
        type: DocumentationKind.html
    }
];

// Observed Attributes
const observedAttributesDocs: DocumentationType[] = [
    {
        content: 'Working with Observed Attributes',
        type: DocumentationKind.header,
    },
    {
        content: `Observed attributes allow your component to react to attribute changes. This is essential for creating dynamic, reactive components.`
    },
    {
        content: `class DynamicCard extends BaseElement {
    static get observedAttributes() {
        return ['title', 'color', 'visible'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        this.update();
    }

    update() {
        const title = this.getAttribute('title') || 'Default Title';
        const color = this.getAttribute('color') || 'blue';
        const visible = this.getAttribute('visible') !== 'false';
        
        if (!visible) {
            this.shadowRoot!.innerHTML = '';
            return;
        }
        
        this.shadowRoot!.innerHTML = \`
            <div class="p-4 bg-\${color}-100 rounded-lg">
                <h3 class="text-xl font-bold">\${title}</h3>
            </div>
        \`;
    }

    renderTemplate() {
        this.update();
    }
}`,
        type: DocumentationKind.code
    }
];

// Action Callbacks
const actionCallbackDocs: DocumentationType[] = [
    {
        content: 'Parent-Child Communication with Action Callbacks',
        type: DocumentationKind.header,
    },
    {
        content: `Action callbacks provide a clean way for child components to communicate with their parents without tight coupling.`
    },
    {
        content: 'Child Component',
        type: DocumentationKind.header,
    },
    {
        content: `class ClickCounter extends BaseElement {
    private count = 0;

    connectedCallback(): void {
        super.connectedCallback();
        
        this.$<HTMLButtonElement>('button').addEventListener('click', () => {
            this.count++;
            this.update();
            
            // Notify parent of the click
            this.actionCallback({ 
                type: 'count-changed', 
                count: this.count 
            });
        });
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = \`
            <button class="px-4 py-2 bg-green-500 text-white rounded">
                Clicked: \${this.count} times
            </button>
        \`;
    }
}`,
        type: DocumentationKind.code
    },
    {
        content: 'Parent Component',
        type: DocumentationKind.header,
    },
    {
        content: `class ParentContainer extends BaseElement {
    connectedCallback(): void {
        super.connectedCallback();
        
        const counter = this.$<ClickCounter>('click-counter');
        counter.actionCallback = (result) => {
            console.log('Child clicked:', result.count);
            // Handle the callback
        };
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = \`
            <div class="p-4">
                <h2>Parent Container</h2>
                <click-counter></click-counter>
            </div>
        \`;
    }
}`,
        type: DocumentationKind.code
    }
];

// Styling with TailwindCSS
const stylingDocs: DocumentationType[] = [
    {
        content: 'Styling Components with TailwindCSS',
        type: DocumentationKind.header,
    },
    {
        content: `Vanilla Components automatically integrates TailwindCSS with Shadow DOM, so you can use utility classes directly in your templates.`
    },
    {
        content: `<div class="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
            <p class="font-bold mb-2">💡 Tip</p>
            <p>The <code>globalStyleSheet</code> is automatically applied to all components extending BaseElement in the <code>connectedCallback()</code> method.</p>
        </div>`,
        type: DocumentationKind.html
    },
    {
        content: `class StyledCard extends BaseElement {
    renderTemplate() {
        this.shadowRoot!.innerHTML = \`
            <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <div class="px-6 py-4">
                    <h3 class="font-bold text-xl mb-2 text-gray-800">
                        Card Title
                    </h3>
                    <p class="text-gray-700 text-base">
                        Card content goes here with full Tailwind support!
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #tag1
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #tag2
                    </span>
                </div>
            </div>
        \`;
    }
}`,
        type: DocumentationKind.code
    }
];

// Routing
const routingDocs: DocumentationType[] = [
    {
        content: 'Client-Side Routing',
        type: DocumentationKind.header,
    },
    {
        content: `The project includes a built-in hash-based router for creating single-page applications without external dependencies.`
    },
    {
        content: 'Defining Routes',
        type: DocumentationKind.header,
    },
    {
        content: `import type { RouteObject } from '../../_core/router/router.ts';

const routes: RouteObject[] = [
    {
        path: '/',
        index: true,
        element: () => \`<home-page></home-page>\`
    },
    {
        path: '/about',
        element: () => \`<about-page></about-page>\`
    },
    {
        path: '/products/:id',
        element: () => \`<product-page></product-page>\`
    },
    {
        path: '*',
        element: () => \`<not-found-page></not-found-page>\`
    }
];`,
        type: DocumentationKind.code
    },
    {
        content: 'Navigation',
        type: DocumentationKind.header,
    },
    {
        content: `// Using hash navigation
<a href="#/about">About</a>
<a href="#/products/123">Product 123</a>

// Programmatic navigation
import { HashRouterService } from './services/HashRouter.service.ts';

const router = _ServicesProvider.getService(HashRouterService);
router.navigate('/about');`,
        type: DocumentationKind.code
    }
];

// State Management
const stateManagementDocs: DocumentationType[] = [
    {
        content: 'State Management with Store',
        type: DocumentationKind.header,
    },
    {
        content: `The project includes a Redux-like store for managing global application state.`
    },
    {
        content: 'Creating Actions',
        type: DocumentationKind.header,
    },
    {
        content: `// Define action types
export const AppActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET_VALUE: 'SET_VALUE'
} as const;

// Dispatch actions
import { Store } from './services/Store.service.ts';

const store = _ServicesProvider.getService(Store);
store.dispatch({ type: AppActionType.INCREMENT });
store.dispatch({ type: AppActionType.SET_VALUE, payload: 10 });`,
        type: DocumentationKind.code
    },
    {
        content: 'Subscribing to State Changes',
        type: DocumentationKind.header,
    },
    {
        content: `class CounterDisplay extends BaseElement {
    private subscription?: Subscription;

    connectedCallback(): void {
        super.connectedCallback();
        
        const store = _ServicesProvider.getService(Store);
        this.subscription = store.subscribe((state) => {
            this.updateDisplay(state.counter);
        });
    }

    disconnectedCallback(): void {
        this.subscription?.unsubscribe();
    }

    updateDisplay(count: number) {
        this.$<HTMLSpanElement>('span').textContent = String(count);
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = \`
            <div class="text-2xl font-bold">
                Count: <span>0</span>
            </div>
        \`;
    }
}`,
        type: DocumentationKind.code
    }
];

const howToUse: DocumentationType[] = [
    ...installationDocs,
    ...projectStructureDocs,
    ...firstComponentDocs,
    ...observedAttributesDocs,
    ...actionCallbackDocs,
    ...stylingDocs,
    ...routingDocs,
    ...stateManagementDocs
]

// Examples Documentation
const buttonExampleDocs: DocumentationType[] = [
    {
        content: 'Interactive Button Component',
        type: DocumentationKind.header,
    },
    {
        content: `A complete button component demonstrating click handling, disabled states, and custom styling.`
    },
    {
        content: `class InteractiveButton extends BaseElement {
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
        
        this.shadowRoot!.innerHTML = \`
            <button 
                class="px-6 py-3 \${variants[variant]} text-white rounded-lg font-semibold 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                \${disabled ? 'disabled' : ''}>
                \${label}
            </button>
        \`;
    }
}

customElements.define('interactive-button', InteractiveButton);`,
        type: DocumentationKind.code
    },
    {
        content: 'Usage Example',
        type: DocumentationKind.header,
    },
    {
        content: `<!-- Primary button -->
<interactive-button label="Save" variant="primary"></interactive-button>

<!-- Disabled button -->
<interactive-button label="Delete" variant="danger" disabled="true"></interactive-button>

<!-- With event handler -->
<script>
    const btn = document.querySelector('interactive-button');
    btn.actionCallback = (result) => {
        console.log('Button clicked at:', result.timestamp);
    };
</script>`,
        type: DocumentationKind.code
    }
];

const formInputExampleDocs: DocumentationType[] = [
    {
        content: 'Form Input with Validation',
        type: DocumentationKind.header,
    },
    {
        content: `A text input component with real-time validation and error messages.`
    },
    {
        content: `class ValidatedInput extends BaseElement {
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
        
        this.shadowRoot!.innerHTML = \`
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">
                    \${label} \${required ? '<span class="text-red-500">*</span>' : ''}
                </label>
                <input 
                    type="text"
                    placeholder="\${placeholder}"
                    class="w-full px-4 py-2 border \${error ? 'border-red-500' : 'border-gray-300'} 
                           rounded-lg focus:outline-none focus:ring-2 \${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}"
                />
                \${error ? \`<p class="text-red-500 text-sm mt-1">\${error}</p>\` : ''}
            </div>
        \`;
    }
}

customElements.define('validated-input', ValidatedInput);`,
        type: DocumentationKind.code
    }
];

const cardExampleDocs: DocumentationType[] = [
    {
        content: 'Expandable Card Component',
        type: DocumentationKind.header,
    },
    {
        content: `A card component with expand/collapse functionality and different states.`
    },
    {
        content: `class ExpandableCard extends BaseElement {
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
        
        this.shadowRoot!.innerHTML = \`
            <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div class="card-header p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer flex justify-between items-center">
                    <div>
                        <h3 class="text-xl font-bold">\${title}</h3>
                        \${subtitle ? \`<p class="text-sm opacity-90">\${subtitle}</p>\` : ''}
                    </div>
                    <span class="toggle-icon text-2xl">▶</span>
                </div>
                <div class="card-content hidden p-4">
                    <slot></slot>
                </div>
            </div>
        \`;
    }
}

customElements.define('expandable-card', ExpandableCard);`,
        type: DocumentationKind.code
    }
];

const stateManagementExampleDocs: DocumentationType[] = [
    {
        content: 'Global Counter with Store',
        type: DocumentationKind.header,
    },
    {
        content: `A practical example showing how to connect components to the global store for state management.`
    },
    {
        content: `// Counter actions
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
        this.shadowRoot!.innerHTML = \`
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
        \`;
    }
}

customElements.define('global-counter-display', GlobalCounterDisplay);`,
        type: DocumentationKind.code
    }
];

const routingExampleDocs: DocumentationType[] = [
    {
        content: 'Navigation with Router',
        type: DocumentationKind.header,
    },
    {
        content: `Example showing how to implement navigation between pages using the hash router.`
    },
    {
        content: `// Navigation component
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
        this.shadowRoot!.innerHTML = \`
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
        \`;
    }
}

customElements.define('app-navigation', AppNavigation);`,
        type: DocumentationKind.code
    }
];

const examplesDocumentation: DocumentationType[] = [
    ...buttonExampleDocs,
    ...formInputExampleDocs,
    ...cardExampleDocs,
    ...stateManagementExampleDocs,
    ...routingExampleDocs
];

export const documentation: DocumentationType[] = [...howToUse].map((doc, index) => ({
    id: doc.id || `doc-${index + 1}`,
    type: doc.type || DocumentationKind.Text, ...doc,
}));

export const examples: DocumentationType[] = [...examplesDocumentation].map((doc, index) => ({
    id: doc.id || `example-${index + 1}`,
    type: doc.type || DocumentationKind.Text, ...doc,
}));
