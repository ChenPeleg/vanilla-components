# Task 05 - Documentation Content Templates

## Overview
This document provides ready-to-use content templates for the documentation expansion. Copy these sections into `documentation.ts` and customize as needed.

## Template Structure

Each documentation entry follows this format:
```typescript
{
    content: 'Your content here',
    type: DocumentationKind.Text | DocumentationKind.header | DocumentationKind.gist | DocumentationKind.html
}
```

## Ready-to-Use Content Sections

### Section 1: Installation & Setup

```typescript
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
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>npx vanilla-components my-project-name
cd my-project-name
npm install
npm run dev</code></pre>`,
        type: DocumentationKind.html
    },
    {
        content: 'Cloning from GitHub',
        type: DocumentationKind.header,
    },
    {
        content: `Alternatively, you can clone the repository directly:`
    },
    {
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>git clone https://github.com/ChenPeleg/vanilla-components.git
cd vanilla-components
npm install
npm run dev</code></pre>`,
        type: DocumentationKind.html
    }
];
```

### Section 2: Project Structure

```typescript
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
```

### Section 3: Creating Your First Component

```typescript
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
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>import { BaseElement } from '../_core/elements/base-element.ts';

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

customElements.define('my-button', MyButton);</code></pre>`,
        type: DocumentationKind.html
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
```

### Section 4: Observed Attributes

```typescript
const observedAttributesDocs: DocumentationType[] = [
    {
        content: 'Working with Observed Attributes',
        type: DocumentationKind.header,
    },
    {
        content: `Observed attributes allow your component to react to attribute changes. This is essential for creating dynamic, reactive components.`
    },
    {
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>class DynamicCard extends BaseElement {
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
}</code></pre>`,
        type: DocumentationKind.html
    }
];
```

### Section 5: Action Callbacks

```typescript
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
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>class ClickCounter extends BaseElement {
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
}</code></pre>`,
        type: DocumentationKind.html
    },
    {
        content: 'Parent Component',
        type: DocumentationKind.header,
    },
    {
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>class ParentContainer extends BaseElement {
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
}</code></pre>`,
        type: DocumentationKind.html
    }
];
```

### Section 6: Styling with TailwindCSS

```typescript
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
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>class StyledCard extends BaseElement {
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
}</code></pre>`,
        type: DocumentationKind.html
    }
];
```

### Section 7: Routing

```typescript
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
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>import type { RouteObject } from '../../_core/router/router.ts';

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
];</code></pre>`,
        type: DocumentationKind.html
    },
    {
        content: 'Navigation',
        type: DocumentationKind.header,
    },
    {
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>// Using hash navigation
<a href="#/about">About</a>
<a href="#/products/123">Product 123</a>

// Programmatic navigation
import { HashRouterService } from './services/HashRouter.service.ts';

const router = _ServicesProvider.getService(HashRouterService);
router.navigate('/about');</code></pre>`,
        type: DocumentationKind.html
    }
];
```

### Section 8: State Management

```typescript
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
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>// Define action types
export const AppActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET_VALUE: 'SET_VALUE'
} as const;

// Dispatch actions
import { Store } from './services/Store.service.ts';

const store = _ServicesProvider.getService(Store);
store.dispatch({ type: AppActionType.INCREMENT });
store.dispatch({ type: AppActionType.SET_VALUE, payload: 10 });</code></pre>`,
        type: DocumentationKind.html
    },
    {
        content: 'Subscribing to State Changes',
        type: DocumentationKind.header,
    },
    {
        content: `<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>class CounterDisplay extends BaseElement {
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
}</code></pre>`,
        type: DocumentationKind.html
    }
];
```

## Usage Instructions

### Step 1: Add to documentation.ts

```typescript
// In src/example-site/documentation/documentation.ts

const howToUse: DocumentationType[] = [
    ...installationDocs,
    ...projectStructureDocs,
    ...firstComponentDocs,
    ...observedAttributesDocs,
    ...actionCallbackDocs,
    ...stylingDocs,
    ...routingDocs,
    ...stateManagementDocs
];

export const documentation: DocumentationType[] = [...howToUse].map((doc, index) => ({
    id: doc.id || `doc-${index + 1}`,
    type: doc.type || DocumentationKind.Text,
    ...doc,
}));
```

### Step 2: Update Component Rendering

Make sure `how-to-use-page.ts` handles the HTML type:

```typescript
buildDocUnit(doc: DocumentationType) {
    switch (doc.type) {
        case DocumentationKind.header:
            return `<header-2> ${doc.content} </header-2>`;
        case DocumentationKind.gist:
            return `<code-gist gist="${doc.content}"></code-gist>`;
        case DocumentationKind.html:
            return doc.content; // Already supports this
        case DocumentationKind.Text:
        default:
            return `<p class="text-gray-700 text-lg mt-4"> ${doc.content} </p>`;
    }
}
```

### Step 3: Test

Run the development server and navigate to the "How to use" page to see the documentation.

## Additional Example Templates

### API Reference Template

```typescript
const apiReferenceDocs: DocumentationType[] = [
    {
        content: 'API Reference',
        type: DocumentationKind.header,
    },
    {
        content: 'BaseElement Class',
        type: DocumentationKind.header,
    },
    {
        content: `<table class="min-w-full bg-white border border-gray-300 my-4">
            <thead>
                <tr class="bg-gray-100">
                    <th class="py-2 px-4 border-b text-left">Method/Property</th>
                    <th class="py-2 px-4 border-b text-left">Type</th>
                    <th class="py-2 px-4 border-b text-left">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-2 px-4 border-b"><code>renderTemplate()</code></td>
                    <td class="py-2 px-4 border-b">void</td>
                    <td class="py-2 px-4 border-b">Override this method to define your component's HTML structure</td>
                </tr>
                <tr>
                    <td class="py-2 px-4 border-b"><code>$&lt;T&gt;(selector)</code></td>
                    <td class="py-2 px-4 border-b">T</td>
                    <td class="py-2 px-4 border-b">Type-safe query selector for shadow DOM elements</td>
                </tr>
                <tr>
                    <td class="py-2 px-4 border-b"><code>actionCallback</code></td>
                    <td class="py-2 px-4 border-b">Function</td>
                    <td class="py-2 px-4 border-b">Callback for parent-child communication</td>
                </tr>
                <tr>
                    <td class="py-2 px-4 border-b"><code>abortSignal</code></td>
                    <td class="py-2 px-4 border-b">AbortController</td>
                    <td class="py-2 px-4 border-b">Signal for cleanup of event listeners</td>
                </tr>
            </tbody>
        </table>`,
        type: DocumentationKind.html
    }
];
```

### Best Practices Template

```typescript
const bestPracticesDocs: DocumentationType[] = [
    {
        content: 'Best Practices',
        type: DocumentationKind.header,
    },
    {
        content: `<div class="space-y-4">
            <div class="bg-green-50 border-l-4 border-green-500 p-4">
                <p class="font-bold mb-2">✅ Do</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Always call <code>super.connectedCallback()</code> first</li>
                    <li>Use <code>this.$&lt;T&gt;()</code> for type-safe element queries</li>
                    <li>Clean up event listeners with <code>abortSignal</code></li>
                    <li>Keep components focused and single-purpose</li>
                    <li>Use TailwindCSS utility classes for styling</li>
                </ul>
            </div>
            <div class="bg-red-50 border-l-4 border-red-500 p-4">
                <p class="font-bold mb-2">❌ Don't</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Don't manually edit <code>imported-components.ts</code></li>
                    <li>Don't use regular DOM APIs instead of Shadow DOM queries</li>
                    <li>Don't forget file extensions in imports</li>
                    <li>Don't skip type annotations</li>
                    <li>Don't create components without proper cleanup</li>
                </ul>
            </div>
        </div>`,
        type: DocumentationKind.html
    }
];
```

## Notes

- All HTML content is sanitized by the browser
- Use TailwindCSS classes for consistent styling
- Test all code examples before adding them
- Keep code snippets concise and focused
- Include both simple and advanced examples
- Add visual callouts for important information
