# Task 03 - Expand Example Site Documentation

## Task Overview
This task outlines a comprehensive plan to expand and improve the documentation for the example site. The goal is to provide clear, thorough documentation that helps developers understand and use the vanilla components project effectively.

## Current State Analysis

### Existing Documentation Structure
- **Home Page** (`/home`): Landing page with three panels (use-case, hero, state-management)
- **How to Use Page** (`/how-to-use`): Basic documentation with a single gist example
- **Examples Page** (`/examples`): Currently minimal with placeholder content
- **Documentation System**: Uses `documentation.ts` with support for text, headers, gists, html, and code

### Existing Components
- **Atoms**: app-button, card-component, global-counter, header-1, header-2, text-input, toggle-button
- **Molecules**: card-component-folded, code-gist, hero-section, logo-component
- **Organisms**: code-snippet, docs-article, main-content, nav-bar, state-management-panel, use-case-panel
- **Pages**: home-page, how-to-use-page, examples-page, main.layout

## Documentation Expansion Plan

### Phase 1: Core Concepts Documentation

#### 1.1 Getting Started Guide
Add to `how-to-use-page`:
- **Installation & Setup**
  - NPM package installation
  - Project structure overview
  - Initial configuration
  - Development server startup
  
- **Understanding BaseElement**
  - What is BaseElement and why use it
  - Key features (Shadow DOM, TailwindCSS integration, type-safe queries)
  - Lifecycle methods
  - Action callback system
  
- **Your First Component**
  - Step-by-step component creation
  - Component structure breakdown
  - Registering custom elements
  - Using slots for content projection

#### 1.2 Component Architecture
- **Atomic Design Principles**
  - Atoms: Basic building blocks
  - Molecules: Simple component combinations
  - Organisms: Complex UI sections
  - Pages: Full page layouts
  - When to use each level
  
- **Shadow DOM Encapsulation**
  - Benefits of Shadow DOM
  - Styling with TailwindCSS in Shadow DOM
  - Accessing shadow DOM elements

#### 1.3 Styling System
- **TailwindCSS Integration**
  - How TailwindCSS works with Shadow DOM
  - Using utility classes in templates
  - Customizing Tailwind configuration
  - Best practices for component styling

### Phase 2: Advanced Features Documentation

#### 2.1 Routing System
- **Hash Router Overview**
  - How the router works
  - Defining routes
  - Route parameters
  - Navigation between pages
  - Router outlet component
  
#### 2.2 State Management
- **Store System**
  - Understanding the store pattern
  - Creating stores
  - Actions and reducers
  - Subscribing to state changes
  - Example: Global counter component
  
#### 2.3 Services Architecture
- **Service Provider Pattern**
  - What are services
  - Creating custom services
  - Service lifecycle
  - Dependency injection pattern
  - Available services (HashRouter, Store, LocalStorage, Theme, etc.)

#### 2.4 Type-Safe Development
- **TypeScript Integration**
  - Type definitions for components
  - CustomElement interface
  - Using generics with $ selector
  - Observable attributes typing

### Phase 3: Practical Examples

#### 3.1 Component Examples (for `examples-page`)
- **Interactive Button Component**
  - With click handlers
  - Disabled state
  - Custom styling
  - Accessibility features
  
- **Form Components**
  - Text input with validation
  - Toggle button states
  - Form submission handling
  
- **Card Components**
  - Basic card layout
  - Folded card with expand/collapse
  - Card with images
  
- **List Components**
  - Dynamic list rendering
  - List item interactions
  - Sorting and filtering

#### 3.2 Integration Patterns
- **Parent-Child Communication**
  - Using actionCallback
  - Event bubbling
  - Passing data to children
  
- **Global State Access**
  - Connecting components to store
  - Dispatching actions
  - Reactive updates
  
- **Router Integration**
  - Programmatic navigation
  - Route guards
  - Query parameters

#### 3.3 Real-World Scenarios
- **Building a Todo App**
  - Complete mini-application
  - Multiple components working together
  - State management
  - Persistence with LocalStorage
  
- **Dashboard Layout**
  - Multi-panel layout
  - Responsive design
  - Component composition
  
- **Dynamic Content Loading**
  - Fetching data
  - Loading states
  - Error handling

### Phase 4: Best Practices & Patterns

#### 4.1 Component Design
- **Single Responsibility**
- **Composability**
- **Reusability**
- **Performance Considerations**
  - Shadow DOM render optimization
  - Event listener cleanup
  - Memory management

#### 4.2 Testing
- **Playwright Testing**
  - Writing component tests
  - Shadow DOM testing
  - E2E test patterns
  - Test utilities (setPageHtml)

#### 4.3 Development Workflow
- **Hot Module Replacement**
- **Build Process**
- **Production Deployment**
- **Debugging Tips**

### Phase 5: API Reference

#### 5.1 BaseElement API
- **Properties**
  - shadowRoot
  - actionCallback
  - abortSignal
  - $<T>(selector) method
  
- **Lifecycle Methods**
  - connectedCallback()
  - disconnectedCallback()
  - attributeChangedCallback()
  - renderTemplate()
  
- **Static Properties**
  - observedAttributes

#### 5.2 Router API
- **RouteObject Interface**
- **Router Methods**
- **Navigation Functions**

#### 5.3 Store API
- **Store Methods**
- **Action Types**
- **Reducer Pattern**

## Implementation Steps

### Step 1: Update Documentation Data Structure
**File**: `src/example-site/documentation/documentation.ts`

1. Expand `howToUse` array with comprehensive content
2. Create separate documentation sections:
   - `gettingStarted`
   - `coreFeatures`
   - `advancedTopics`
   - `apiReference`
3. Add more interactive gist examples
4. Include code snippets for common patterns

### Step 2: Enhance How-to-Use Page
**File**: `src/example-site/pages/how-to-use-page.ts`

1. Add table of contents component
2. Add code syntax highlighting
3. Improve navigation within the page
4. Add "copy code" buttons
5. Include live component examples

### Step 3: Build Examples Page
**File**: `src/example-site/pages/examples-page.ts`

1. Create categorized example sections
2. Add interactive demos
3. Include source code for each example
4. Add "Edit in CodeSandbox" links
5. Show before/after comparisons

### Step 4: Create New Documentation Components
**Location**: `src/example-site/components/`

1. **doc-section** (atom): Collapsible documentation section
2. **code-example** (molecule): Code viewer with live preview
3. **api-table** (molecule): API documentation table
4. **toc-nav** (molecule): Table of contents navigation
5. **example-card** (molecule): Interactive example card

### Step 5: Add Documentation Assets
1. Create example gists on GitHub
2. Prepare code samples
3. Create diagrams (if needed)
4. Add screenshots for visual examples

### Step 6: Testing & Validation
1. Test all documentation pages render correctly
2. Verify all gists load properly
3. Test all interactive examples
4. Check mobile responsiveness
5. Verify navigation works correctly
6. Test in different browsers

## Success Criteria

- [ ] All core concepts are documented with clear explanations
- [ ] At least 10 practical examples with working code
- [ ] API reference covers all major classes and methods
- [ ] Documentation is searchable and well-organized
- [ ] All code examples are tested and working
- [ ] Mobile-friendly documentation layout
- [ ] Clear navigation between documentation sections
- [ ] Examples include both simple and complex use cases

## Timeline Estimate

- **Phase 1**: 2-3 hours (Core concepts)
- **Phase 2**: 3-4 hours (Advanced features)
- **Phase 3**: 4-5 hours (Practical examples)
- **Phase 4**: 2-3 hours (Best practices)
- **Phase 5**: 2-3 hours (API reference)
- **Testing**: 1-2 hours

**Total**: 14-20 hours

## References

- Existing README.md
- Custom element documentation: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
- Project GitHub repository: https://github.com/ChenPeleg/vanilla-components
- Copilot instructions: `.github/copilot-instructions.md`

## Notes

- Keep documentation consistent with project conventions
- Use existing component patterns
- Ensure all examples follow the BaseElement pattern
- Include proper TypeScript types in examples
- Reference existing test files for testing patterns
- Maintain the atomic design structure for new components
