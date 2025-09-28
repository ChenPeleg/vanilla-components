# GitHub Copilot Instructions for Vanilla Components

This document provides GitHub Copilot with specific instructions for working with the Vanilla Components project.

## Project Overview

This is a vanilla web components project built with:
- **TypeScript** for type safety
- **Custom Elements API** for web components
- **Shadow DOM** for encapsulation
- **TailwindCSS** for styling
- **Vite** for building and development
- **Playwright** for testing

## Code Style and Conventions

### TypeScript Configuration
- Use strict TypeScript settings as defined in `tsconfig.json`
- Target ES2022 with DOM support
- Use module resolution: "bundler"
- Always include proper type annotations
- Use `.ts` file extensions explicitly in imports

### Web Component Patterns

#### Base Element Extension
All custom elements MUST extend `BaseElement` from `src/_core/elements/base-element.ts`:

```typescript
import { BaseElement } from '../../../_core/elements/base-element.ts';

export class MyComponent extends BaseElement {
    static get observedAttributes() {
        return ['my-attribute'];
    }
    
    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <!-- Component HTML -->
        `;
    }
}

customElements.define('my-component', MyComponent);
```

#### Required Patterns
1. **Always** call `super.connectedCallback()` first in `connectedCallback()`
2. **Always** implement `renderTemplate()` method
3. Use `this.$<T>('selector')` for type-safe shadow DOM queries
4. Use `this.actionCallback()` for parent-child communication
5. Register custom elements with `customElements.define()` at the end of the file

#### Component Architecture
Follow atomic design principles:
- **Atoms**: `src/example-site/components/atoms/` - Basic UI elements
- **Molecules**: `src/example-site/components/molecules/` - Component combinations  
- **Organisms**: `src/example-site/components/organism/` - Complex UI sections
- **Pages**: `src/example-site/pages/` - Full page components

### Import Management

#### File Organization
- Use absolute paths starting from `src/`
- Include `.ts` extension explicitly in all imports
- Import from `_core` for base functionality
- Components automatically registered in `src/_core/imported-components.ts`

#### Import Examples
```typescript
// Correct imports
import { BaseElement } from '../../../_core/elements/base-element.ts';
import type { CustomElement } from '../../../_core/elements/CustomElement.ts';
import { AppRouter } from '../_core/router/router.ts';

// Avoid relative imports without extensions
import { BaseElement } from '../../../_core/elements/base-element'; // ❌
```

### Styling Guidelines

#### TailwindCSS Integration
- Components use Shadow DOM with TailwindCSS via `globalStyleSheet`
- Style application happens automatically in `BaseElement.connectedCallback()`
- Use utility classes directly in template strings
- Prefer Tailwind utilities over custom CSS

#### Template Structure
```typescript
renderTemplate() {
    this.shadowRoot!.innerHTML = `
        <div class="p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800">
                <slot></slot>
            </h2>
        </div>
    `;
}
```

### Event Handling

#### Action Callbacks
Use the `actionCallback` pattern for parent-child communication:

```typescript
// Child component
this.actionCallback({ type: 'button-clicked', data: someData });

// Parent component sets callback
childElement.actionCallback = (result) => {
    console.log('Child action:', result);
};
```

#### Standard Event Listeners
```typescript
connectedCallback(): void {
    super.connectedCallback();
    
    this.$<HTMLButtonElement>('button').addEventListener('click', () => {
        if (!this.disabled) {
            this.actionCallback({ clicked: true });
        }
    });
}
```

### Attribute Handling

#### Observed Attributes
```typescript
static get observedAttributes() {
    return ['disabled', 'value', 'class'];
}

attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.update();
}

update() {
    const isDisabled = this.getAttribute('disabled') === 'true';
    this.$<HTMLElement>('button').setAttribute('aria-disabled', String(isDisabled));
}
```

### File Naming Conventions

#### Component Files
- Use kebab-case for file names: `my-component.ts`
- Match custom element tag names to file names
- Place in appropriate atomic design directory

#### Class Names
- Use PascalCase: `MyComponent`
- Name should be descriptive and match the custom element purpose

### Testing Patterns

#### Playwright Tests
- Tests located in `tests/` directory
- Use `setPageHtml` helper for component testing
- Test shadow DOM interactions properly
- Focus on user interactions and accessibility

```typescript
test('component interaction', async ({ page }) => {
    await page.goto('/');
    await setPageHtml(page, `<my-component>Test</my-component>`);
    
    const component = page.getByRole('button');
    await expect(component).toBeVisible();
});
```

### Build and Development

#### Scripts Usage
- `npm run dev` for development server
- `npm run build` for production build
- `npm test` for running tests
- `npm run run-on-start` for import management

#### Import Management
The project uses automated import management:
- Files with `customElements.define()` are auto-imported
- Import statements managed by `scripts/run-on-startup.js`
- Don't manually edit `src/_core/imported-components.ts`

### Accessibility

#### Required Practices
- Always set appropriate `role` attributes
- Use `aria-` attributes for state communication
- Support keyboard navigation
- Provide proper semantic structure

```typescript
connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
}
```

### Error Handling

#### Component Errors
- Use descriptive error messages
- Include component name in error context
- Handle missing DOM elements gracefully

```typescript
renderTemplate() {
    if (!this.shadowRoot) {
        throw new Error(`[MyComponent] Shadow root not available`);
    }
    // Template implementation
}
```

## Development Workflow

### Creating New Components
1. Choose appropriate atomic design level directory
2. Create `.ts` file with kebab-case name
3. Extend `BaseElement`
4. Implement required methods (`renderTemplate`, lifecycle callbacks)
5. Register with `customElements.define()`
6. Run `npm run run-on-start` to update imports

### Making Changes
1. Use TypeScript strict mode - fix all type errors
2. Test components in isolation first
3. Run `npm test` to ensure no regressions
4. Use development server for quick iteration

### Code Quality
- Follow existing patterns in the codebase
- Maintain consistent indentation and formatting
- Use meaningful variable and method names
- Add JSDoc comments for public APIs
- Keep components focused and single-purpose

## Common Pitfalls to Avoid

1. **Don't** modify `src/_core/imported-components.ts` manually
2. **Don't** use regular DOM APIs instead of Shadow DOM queries
3. **Don't** forget to call `super.connectedCallback()`
4. **Don't** use relative imports without file extensions
5. **Don't** create components without proper TypeScript types
6. **Don't** forget accessibility attributes and roles
7. **Don't** skip error handling in critical methods

## Examples and References

Refer to existing components in `src/example-site/components/` for patterns and best practices. The `app-button.ts`, `card-component.ts`, and other atoms provide good starting points for new components.