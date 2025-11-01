export const TUTORIAL_SNIPPETS = {
    NPM_INSTALL: `npx vanilla-components my-project-name
cd my-project-name
npm install
npm run dev`,

    GIT_CLONE: `git clone https://github.com/ChenPeleg/vanilla-components.git
cd vanilla-components
npm install
npm run dev`,

    MY_BUTTON: `import { BaseElement } from '../_core/elements/base-element.ts';

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
        
        this.shadowRoot!.innerHTML = \\\`
            <button 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                \\\${isDisabled ? 'disabled' : ''}>
                \\\${label}
            </button>
        \\\`;
    }
}

customElements.define('my-button', MyButton);`,

    DYNAMIC_CARD: `class DynamicCard extends BaseElement {
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
        
        this.shadowRoot!.innerHTML = \\\`
            <div class="p-4 bg-\\\${color}-100 rounded-lg">
                <h3 class="text-xl font-bold">\\\${title}</h3>
            </div>
        \\\`;
    }

    renderTemplate() {
        this.update();
    }
}`,

    CLICK_COUNTER: `class ClickCounter extends BaseElement {
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
        this.shadowRoot!.innerHTML = \\\`
            <button class="px-4 py-2 bg-green-500 text-white rounded">
                Clicked: \\\${this.count} times
            </button>
        \\\`;
    }
}`,

    PARENT_CONTAINER: `class ParentContainer extends BaseElement {
    connectedCallback(): void {
        super.connectedCallback();
        
        const counter = this.$<ClickCounter>('click-counter');
        counter.actionCallback = (result) => {
            console.log('Child clicked:', result.count);
            // Handle the callback
        };
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = \\\`
            <div class="p-4">
                <h2>Parent Container</h2>
                <click-counter></click-counter>
            </div>
        \\\`;
    }
}`,

    STYLED_CARD: `class StyledCard extends BaseElement {
    renderTemplate() {
        this.shadowRoot!.innerHTML = \\\`
            <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <div class="px-6 py-4">
                    <h3 class="font-bold text-xl mb-2 \${SiteColors.headerText}">
                        Card Title
                    </h3>
                    <p class="\${SiteColors.textMain} text-base">
                        Card content goes here with full Tailwind support!
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold \${SiteColors.textMain} mr-2 mb-2">
                        #tag1
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold \${SiteColors.textMain} mr-2 mb-2">
                        #tag2
                    </span>
                </div>
            </div>
        \\\`;
    }
}`,

    ROUTES_DEFINITION: `import type { RouteObject } from '../../_core/router/router.ts';

const routes: RouteObject[] = [
    {
        path: '/',
        index: true,
        element: () => \\\`<home-page></home-page>\\\`
    },
    {
        path: '/about',
        element: () => \\\`<about-page></about-page>\\\`
    },
    {
        path: '/products/:id',
        element: () => \\\`<product-page></product-page>\\\`
    },
    {
        path: '*',
        element: () => \\\`<not-found-page></not-found-page>\\\`
    }
];`,

    NAVIGATION_USAGE: `// Using hash navigation
<a href="#/about">About</a>
<a href="#/products/123">Product 123</a>

// Programmatic navigation
import { HashRouterService } from './services/HashRouter.service.ts';

const router = _ServicesProvider.getService(HashRouterService);
router.navigate('/about');`,

    ACTION_TYPES: `// Define action types
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

    COUNTER_DISPLAY: `class CounterDisplay extends BaseElement {
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
        this.shadowRoot!.innerHTML = \\\`
            <div class="text-2xl font-bold">
                Count: <span>0</span>
            </div>
        \\\`;
    }
}`
};
