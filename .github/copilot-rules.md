# Copilot Quick Rules - Vanilla Components

## Essential Patterns

### Web Component Structure
```typescript
import { BaseElement } from '../../../_core/elements/base-element.ts';

export class ComponentName extends BaseElement {
    static get observedAttributes() {
        return ['attribute-name'];
    }
    
    connectedCallback(): void {
        super.connectedCallback(); // Always first!
        this.setAttribute('role', 'appropriate-role');
        // Setup event listeners here
    }
    
    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="tailwind-classes">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('component-name', ComponentName);
```

### Key Rules
1. **Always** extend `BaseElement`
2. **Always** call `super.connectedCallback()` first
3. **Always** include `.ts` extensions in imports
4. **Always** use `this.$<T>('selector')` for shadow DOM queries
5. **Always** register components with `customElements.define()`
6. Use `this.actionCallback()` for parent-child communication
7. Place components in appropriate atomic design directories
8. Use TailwindCSS utility classes in templates
9. Set proper accessibility attributes (`role`, `aria-*`)
10. Don't manually edit `src/_core/imported-components.ts`

### File Organization
- Atoms: `src/example-site/components/atoms/`
- Molecules: `src/example-site/components/molecules/`
- Organisms: `src/example-site/components/organism/`
- Pages: `src/example-site/pages/`

### Import Pattern
```typescript
// Correct
import { BaseElement } from '../../../_core/elements/base-element.ts';

// Wrong
import { BaseElement } from '../../../_core/elements/base-element';
```

### Event Handling
```typescript
// Use actionCallback for parent communication
this.actionCallback({ type: 'action-name', data: value });

// Standard event listeners
this.$<HTMLElement>('button').addEventListener('click', () => {
    // Handle click
});
```