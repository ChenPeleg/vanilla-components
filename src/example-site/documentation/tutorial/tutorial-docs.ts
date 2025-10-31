import { DocumentationKind, type DocumentationType } from '../../models/documentation.types.ts';
import {SiteColors} from '../../colors/siteColors.ts';

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
        content: `<div class="${SiteColors.tutorialFoldersBg} border-l-4 border-blue-500 p-4 my-4">
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
        type: DocumentationKind.highlightedCode
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
    },
    {
        content: `<notice-box variant="info" title="Tip: Reusable UI">Use <code>&lt;notice-box&gt;</code> to surface important guidance to your users while documenting components or providing context in tutorials.</notice-box>`,
        type: DocumentationKind.html,
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
        type: DocumentationKind.highlightedCode
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
        type: DocumentationKind.highlightedCode
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
        type: DocumentationKind.highlightedCode
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
                    <h3 class="font-bold text-xl mb-2 ${SiteColors.headerText}">
                        Card Title
                    </h3>
                    <p class="${SiteColors.textMain} text-base">
                        Card content goes here with full Tailwind support!
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold ${SiteColors.textMain} mr-2 mb-2">
                        #tag1
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold ${SiteColors.textMain} mr-2 mb-2">
                        #tag2
                    </span>
                </div>
            </div>
        \`;
    }
}`,
        type: DocumentationKind.highlightedCode
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
        type: DocumentationKind.highlightedCode
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
        type: DocumentationKind.highlightedCode
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
        type: DocumentationKind.highlightedCode
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
        type: DocumentationKind.highlightedCode
    }
];

export const tutorialDocs: DocumentationType[] = [
    ...installationDocs,
    ...projectStructureDocs,
    ...firstComponentDocs,
    ...observedAttributesDocs,
    ...actionCallbackDocs,
    ...stylingDocs,
    ...routingDocs,
    ...stateManagementDocs
];
