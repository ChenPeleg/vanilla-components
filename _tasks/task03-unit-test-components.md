# Task 03 - Add Unit Tests for All Components

## Task Overview
Add comprehensive unit tests for all custom web components in the project, following the pattern established by the existing `app-button.spec.ts` test.

## Background
Currently, only the `app-button` component has unit tests. This task aims to create unit tests for all other components to ensure code quality, prevent regressions, and document expected behavior.

## Components Requiring Unit Tests

### Atoms (Basic UI Elements)
1. **card-component** (`src/example-site/components/atoms/card-component.ts`)
2. **header-1** (`src/example-site/components/atoms/header-1.ts`)
3. **header-2** (`src/example-site/components/atoms/header-2.ts`)
4. **text-input** (`src/example-site/components/atoms/text-input.ts`)
5. **toggle-button** (`src/example-site/components/atoms/toggle-button.ts`)

### Molecules (Component Combinations)
6. **card-component-folded** (`src/example-site/components/molecules/card-component-folded.ts`)
7. **code-gist** (`src/example-site/components/molecules/code-gist.ts`)
8. **hero-section** (`src/example-site/components/molecules/hero-section.ts`)
9. **logo-component** (`src/example-site/components/molecules/logo-component.ts`)

### Organisms (Complex UI Sections)
10. **main-content** (`src/example-site/components/organism/main-content.ts`)
11. **nav-bar** (`src/example-site/components/organism/nav-bar.ts`)
12. **state-management-panel** (`src/example-site/components/organism/state-management-panel.ts`)
13. **use-case-panel** (`src/example-site/components/organism/use-case-panel.ts`)

### Additional Components
14. **simple-button** (defined in `src/app-page.ts`)

## Testing Pattern Reference

### Existing Test Example
Refer to `tests/unit/app-button.spec.ts` for the established testing pattern. Key elements include:

```typescript
import { test, expect } from '@playwright/test';
import {setPageHtml} from '../_tools/setPageHtml';

test.describe('component-name', () => {
    test('test description', async ({ page }) => {
        await page.goto('/');
        await setPageHtml(page, `<component-name id="test-id"></component-name>`);
        // Test assertions
    });
});
```

## Test Categories

For each component, consider testing:

### 1. Rendering Tests
- Component renders correctly
- Shadow DOM elements are present
- Slot content is displayed properly
- Default text/content appears as expected

### 2. Attribute Tests
- Component respects `observedAttributes`
- Attribute changes trigger updates
- Boolean attributes (like `disabled`) work correctly
- Custom attributes affect component behavior

### 3. Interaction Tests
- Click events trigger expected behavior
- Input events work correctly
- Keyboard navigation functions properly
- Focus states are handled correctly

### 4. Action Callback Tests
- Components using `actionCallback` communicate properly
- Parent-child communication works as expected
- Event data is passed correctly

### 5. Accessibility Tests
- Proper `role` attributes are set
- ARIA attributes are present and correct
- Keyboard navigation is supported
- Screen reader compatibility

### 6. State Management Tests
- Component internal state updates correctly
- State changes reflect in the DOM
- Multiple instances maintain separate state

## Testing Guidelines

### Using setPageHtml Helper
```typescript
await setPageHtml(page, `<component-name>Content</component-name>`);
```

### Shadow DOM Testing
```typescript
const component = page.locator('component-name');
const shadowElement = component.locator('selector');
await expect(shadowElement).toBeVisible();
```

### Testing Action Callbacks
```typescript
declare global {
    interface Window {
        __componentCallbackResult?: any;
    }
}

await page.evaluate(() => {
    window.__componentCallbackResult = null;
    const component = document.getElementById('test-id') as HTMLElement & { 
        actionCallback?: (data: any) => void 
    };
    if (component) {
        component.actionCallback = (data: any) => { 
            window.__componentCallbackResult = data; 
        };
    }
});
```

### Testing Disabled States
```typescript
await setPageHtml(page, `<component-name disabled="true"></component-name>`);
const element = page.locator('component-name').locator('button');
await expect(element).toBeDisabled();
await expect(element).toHaveAttribute('aria-disabled', 'true');
```

## File Organization

Create test files in `tests/unit/` following this naming convention:
- `component-name.spec.ts` for each component
- Group related tests using `test.describe()`
- Use descriptive test names that explain what is being tested

## Running Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm test tests/unit

# Run specific component test
npm test tests/unit/component-name.spec.ts
```

## Success Criteria

- [ ] Each component has a dedicated test file in `tests/unit/`
- [ ] Each test file has at least 3 meaningful test cases
- [ ] All tests pass successfully
- [ ] Tests cover rendering, attributes, and interactions
- [ ] Tests follow the established pattern from `app-button.spec.ts`
- [ ] Accessibility features are validated
- [ ] Action callbacks are tested where applicable

## Tips

1. **Start Simple**: Begin with rendering tests, then add complexity
2. **Check Component Source**: Review each component's implementation to understand what to test
3. **Look for observedAttributes**: These indicate which attributes need testing
4. **Test User Interactions**: Focus on how users will interact with the component
5. **Use Playwright DevTools**: Debug tests using `await page.pause()` when needed
6. **Follow Existing Patterns**: Consistency with existing tests improves maintainability

## Resources

- Existing test: `tests/unit/app-button.spec.ts`
- Helper utilities: `tests/_tools/setPageHtml.ts`
- Playwright docs: https://playwright.dev/docs/api/class-test
- Component implementations: `src/example-site/components/`

## Notes

- Components use Shadow DOM, so use proper locator strategies
- All components extend `BaseElement` from `src/_core/elements/base-element.ts`
- Components use TailwindCSS for styling
- Some components may have complex internal state requiring multiple test scenarios
