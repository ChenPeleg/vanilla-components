# Vanilla Components

A modern starter kit and example for building web applications using vanilla web components with TypeScript, Vite, and TailwindCSS.

[![npm version](https://img.shields.io/npm/v/vanilla-components.svg)](https://www.npmjs.com/package/vanilla-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 NPM Package

This package is available on NPM: [https://www.npmjs.com/package/vanilla-components](https://www.npmjs.com/package/vanilla-components)

## 🚀 Quick Start

### As a Starter Kit

Use this project as a starting point for your vanilla web components application:

```bash
npx vanilla-components [directory-name]
```

If no directory name is provided, files will be copied to the current directory.

### As an Example

Clone this repository to explore and learn from the example components and project structure:

```bash
git clone https://github.com/ChenPeleg/vanilla-components.git
cd vanilla-components
npm install
npm run dev
```

## 🎯 Use Cases

**When to use this starter kit:**
- You want to build a single-page application with minimal dependencies
- You prefer vanilla JavaScript/TypeScript over heavy frameworks
- You need a modern, maintainable web components architecture
- You want to showcase projects with nearly zero runtime dependencies

**How it helps:**
- Reduces boilerplate code for custom elements
- Provides a solid foundation with modern tooling
- Includes examples of common UI patterns
- Offers development tools for efficient workflow

## 🏗️ Project Structure

```
├── src/
│   ├── _core/                 # Core functionality
│   │   ├── elements/          # Base element classes
│   │   └── router/            # Client-side routing
│   ├── example-site/          # Example implementation
│   │   ├── components/        # Reusable components
│   │   └── pages/             # Page components
│   └── app-page.ts            # Main application entry
├── public/                    # Static assets
├── package/                   # NPM package installer
├── scripts/                   # Build and utility scripts
├── tests/                     # Playwright tests
└── index.html                 # Entry HTML file
```

## 🛠️ Technology Stack

- **[Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)**: Native web components
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Vite](https://vite.dev/)**: Fast build tool and dev server
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Playwright](https://playwright.dev/)**: End-to-end testing

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:package      # Start development server in package mode

# Building
npm run build           # Build for production
npm run build:site      # Build site version

# Testing
npm test                # Run all tests
npm run test:iterate    # Run tests in iteration mode

# Other
npm run preview         # Preview production build
npm run run-on-start    # Run startup scripts
```

## 🧩 Core Features

### BaseElement Class

All components extend the `BaseElement` class which provides:

> ⚠️ **Work in Progress**: The `FiberElement` class with fiber-like reconciliation and virtual DOM support is currently under development and not yet production-ready.

- Shadow DOM encapsulation
- TailwindCSS integration
- Type-safe element querying
- Action callback system
- Lifecycle management

### Component Architecture

Components are organized following atomic design principles:
- **Atoms**: Basic UI elements (buttons, headers)
- **Molecules**: Component combinations (hero sections, cards)
- **Organisms**: Complex UI sections (panels, pages)
- **Pages**: Full page components

### Routing System

Built-in hash-based routing for single-page applications without external dependencies.

## 🔧 Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npx playwright install  # First time only
   npm test
   ```

## 📝 Creating Components

Example component structure:

```typescript
import { BaseElement } from '../_core/elements/base-element.ts';

class MyComponent extends BaseElement {
    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="p-4 bg-blue-100 rounded">
                <h2 class="text-xl font-bold">
                    <slot></slot>
                </h2>
            </div>
        `;
    }
}

customElements.define('my-component', MyComponent);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Chen Peleg**

---

Built with ❤️ using vanilla web technologies
