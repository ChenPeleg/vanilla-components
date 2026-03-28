# How to use

## Installation & Setup

There are two ways to get started with Vanilla Components: use it as an NPM package starter kit, or clone the repository directly.

### Using NPM Package

**Create a new project scaffold** - Similar to `create-vite`, the `npx vanilla-components` command creates a basic project structure with core files and essential services. This gives you a ready-to-use starting point for your application.

The scaffold includes:
- **Core components**: BaseElement, routing service, and store management
- **Build configuration**: Vite, TypeScript, and TailwindCSS setup
- **Project structure**: Organized directories following atomic design principles
- **Example components**: Sample atoms, molecules, and organisms to get started
- **Development tools**: Scripts for dev server, building, and testing

To create a new project using Vanilla Components, run the following command in your terminal:

```bash
npx vanilla-components my-project-name
cd my-project-name
npm install
npm run dev
```

### Cloning from GitHub

Alternatively, you can clone the repository directly:

```bash
git clone https://github.com/ChenPeleg/vanilla-components.git
cd vanilla-components
npm install
npm run dev
```

## Understanding Project Structure

The project follows a clear, organized structure based on atomic design principles:

📁 **Key Directories:**
- **src/** - Application entry point and source code
- **src/_core/** - Core functionality (BaseElement, router, services)
- **tests/** - Playwright test files

## Creating Your First Component

Every component in Vanilla Components extends the `BaseElement` class. This provides Shadow DOM encapsulation, TailwindCSS integration, and useful utilities.

### Basic Component Structure

Here are three examples showing different levels of component complexity:

#### Example 1: Simple Text Container

A minimal component that just renders content with styling. This example demonstrates the fundamental building blocks of a web component:

```typescript
import { BaseElement } from '../_core/elements/base-element.ts';

class TextContainer extends BaseElement {
    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="p-4 bg-gray-100 rounded-lg">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('text-container', TextContainer);
```

**Key concepts explained:**

- **`renderTemplate()`**: This method defines the HTML structure of your component. It's called automatically by BaseElement when the component is initialized. Inside this method, you set the `innerHTML` of the shadow DOM to create your component's structure.

- **`<slot></slot>`**: The slot element is a placeholder that displays content passed between the component's opening and closing tags. For example, when you write `<text-container>Hello World</text-container>`, "Hello World" will be rendered where the `<slot>` is placed in the template.

- **Shadow DOM**: By using `this.shadowRoot`, the component's styles and structure are encapsulated, preventing conflicts with the rest of your page's CSS.

#### Example 2: Interactive Collapsible Panel with Attribute Handling

A collapsible panel component that opens and closes when clicked. This example introduces reactive attributes, component lifecycle methods, and action callbacks for parent-child communication:

```typescript
import { BaseElement } from '../_core/elements/base-element.ts';

class CollapsiblePanel extends BaseElement {
    static get observedAttributes() {
        return ['open'];
    }

    actionCallback = (_result: { open: boolean }) => {};

    connectedCallback(): void {
        super.connectedCallback();
        this.update();
        
        // Add click event listener to toggle panel
        this.$<HTMLDivElement>('.panel-header').addEventListener('click', () => {
            const isOpen = this.getAttribute('open') === 'true';
            this.setAttribute('open', String(!isOpen));
            this.update();
            
            // Notify parent via action callback
            this.actionCallback({ open: !isOpen });
        });
    }

    // Called automatically when observed attributes change
    update() {
        const isOpen = this.getAttribute('open') === 'true';
        const content = this.$<HTMLDivElement>('.panel-content');
        if (content) {
            content.style.display = isOpen ? 'block' : 'none';
        }
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="border rounded-lg overflow-hidden">
                <div class="panel-header px-4 py-3 bg-blue-500 text-white cursor-pointer hover:bg-blue-600">
                    <slot name="header">Click to toggle</slot>
                </div>
                <div class="panel-content p-4 bg-white" style="display: none;">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('collapsible-panel', CollapsiblePanel);
```

**New concepts introduced:**

- **`observedAttributes`**: This static getter returns an array of attribute names that the component should watch for changes. When these attributes change, the component can react accordingly.

- **`connectedCallback()`**: A lifecycle method that runs when the component is added to the DOM. Always call `super.connectedCallback()` first to ensure BaseElement's setup is complete.

- **`this.$<T>(selector)`**: A type-safe helper method provided by BaseElement for querying elements within the shadow DOM. The `<T>` allows you to specify the element type for better TypeScript support.

- **Reactive updates**: The `update()` method reads the current attribute values and updates the component's internal state. This allows the component to respond dynamically when attributes change.

- **Action callbacks**: The `actionCallback` property allows the component to notify its parent when the panel state changes. The parent can set this callback to respond to panel open/close events.

- **Event listeners**: The click event listener toggles the panel state and triggers the action callback, demonstrating how to handle user interactions and communicate with parent components.

- **Named slots**: The `<slot name="header">` allows specific content to be placed in the header, while the default `<slot>` is for the panel content.

#### Example 3: Full-Featured Component

A complete example with attributes, styling, and dynamic content. This example shows reading a label attribute during initial render (non-reactive) and observing the disabled attribute for dynamic updates:

```typescript
import { BaseElement } from '../_core/elements/base-element.ts';

class MyButton extends BaseElement {
    static get observedAttributes() {
        return ['disabled'];
    }

    connectedCallback(): void {
        super.connectedCallback(); // Always call first!
        this.update();
    }

    // Called automatically when observed attributes change
    update() {
        const isDisabled = this.getAttribute('disabled') === 'true';
        const button = this.$<HTMLButtonElement>('button');
        if (button) {
            button.disabled = isDisabled;
        }
    }

    renderTemplate() {
        // Label is read once during render (not reactive)
        const label = this.getAttribute('label') || 'Click me';
        this.shadowRoot!.innerHTML = `
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
                ${label}
            </button>
        `;
    }
}

customElements.define('my-button', MyButton);
```

### Key Points

⚡ **Important:**
- Always extend `BaseElement`
- Call `super.connectedCallback()` first in your connectedCallback
- Implement `renderTemplate()` method for your component's HTML
- Use `customElements.define()` to register your component
- Include `.ts` extension in imports

💡 **Tip:**
Use `<notice-box>` to surface important guidance to your users while documenting components or providing context in tutorials.

## Working with Observed Attributes

Observed attributes allow your component to react to attribute changes. This is essential for creating dynamic, reactive components.

```typescript
class DynamicCard extends BaseElement {
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
        
        this.shadowRoot!.innerHTML = `
            <div class="p-4 bg-${color}-100 rounded-lg">
                <h3 class="text-xl font-bold">${title}</h3>
            </div>
        `;
    }

    renderTemplate() {
        this.update();
    }
}
```

## Parent-Child Communication with Action Callbacks

Action callbacks provide a clean way for child components to communicate with their parents without tight coupling.

### Child Component

```typescript
class ClickCounter extends BaseElement {
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
        this.shadowRoot!.innerHTML = `
            <button class="px-4 py-2 bg-green-500 text-white rounded">
                Clicked: ${this.count} times
            </button>
        `;
    }
}
```

### Parent Component

```typescript
class ParentContainer extends BaseElement {
    connectedCallback(): void {
        super.connectedCallback();
        
        const counter = this.$<ClickCounter>('click-counter');
        counter.actionCallback = (result) => {
            console.log('Child clicked:', result.count);
            // Handle the callback
        };
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="p-4">
                <h2>Parent Container</h2>
                <click-counter></click-counter>
            </div>
        `;
    }
}
```

## Styling Components with TailwindCSS

Vanilla Components automatically integrates TailwindCSS with Shadow DOM, so you can use utility classes directly in your templates.

💡 **Tip:**
The `globalStyleSheet` is automatically applied to all components extending BaseElement in the `connectedCallback()` method.

```typescript
class StyledCard extends BaseElement {
    renderTemplate() {
        this.shadowRoot!.innerHTML = `
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
        `;
    }
}
```

## Client-Side Routing

The project includes a built-in hash-based router for creating single-page applications without external dependencies.

### Defining Routes

```typescript
import type { RouteObject } from '../../_core/router/router.ts';

const routes: RouteObject[] = [
    {
        path: '/',
        index: true,
        element: () => `<home-page></home-page>`
    },
    {
        path: '/about',
        element: () => `<about-page></about-page>`
    },
    {
        path: '/products/:id',
        element: () => `<product-page></product-page>`
    },
    {
        path: '*',
        element: () => `<not-found-page></not-found-page>`
    }
];
```

### Navigation

```typescript
// Using hash navigation
<a href="#/about">About</a>
<a href="#/products/123">Product 123</a>

// Programmatic navigation
import { HashRouterService } from './services/HashRouter.service.ts';

const router = _ServicesProvider.getService(HashRouterService);
router.navigate('/about');
```

## State Management with Store

The project includes a Redux-like store for managing global application state.

### Creating Actions

```typescript
// Define action types
export const AppActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET_VALUE: 'SET_VALUE'
} as const;

// Dispatch actions
import { Store } from './services/Store.service.ts';

const store = _ServicesProvider.getService(Store);
store.dispatch({ type: AppActionType.INCREMENT });
store.dispatch({ type: AppActionType.SET_VALUE, payload: 10 });
```

### Subscribing to State Changes

```typescript
class CounterDisplay extends BaseElement {
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
        this.shadowRoot!.innerHTML = `
            <div class="text-2xl font-bold">
                Count: <span>0</span>
            </div>
        `;
    }
}
```
