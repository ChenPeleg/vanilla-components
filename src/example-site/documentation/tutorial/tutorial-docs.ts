import { DocumentationKind, type DocumentationType } from '../../models/documentation.types.ts';
import {SiteColors} from '../../colors/siteColors.ts';
import { TUTORIAL_SNIPPETS } from './tutorial-code-snippets.ts';

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
        content: TUTORIAL_SNIPPETS.NPM_INSTALL,
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
        content: TUTORIAL_SNIPPETS.GIT_CLONE,
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
        content: TUTORIAL_SNIPPETS.MY_BUTTON,
        type: DocumentationKind.highlightedCode
    },
    {
        content: 'Key Points',
        type: DocumentationKind.header,
    },
    {
         content: `<notice-box variant="important" title="Key Points">
            <div class="p-0">
                <p class="font-bold mb-2">⚡ Important</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Always extend <code>BaseElement</code></li>
                    <li>Call <code>super.connectedCallback()</code> first in your connectedCallback</li>
                    <li>Implement <code>renderTemplate()</code> method for your component's HTML</li>
                    <li>Use <code>customElements.define()</code> to register your component</li>
                    <li>Include <code>.ts</code> extension in imports</li>
                </ul>
            </div>
        </notice-box>`,
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
        content: TUTORIAL_SNIPPETS.DYNAMIC_CARD,
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
        content: TUTORIAL_SNIPPETS.CLICK_COUNTER,
        type: DocumentationKind.highlightedCode
    },
    {
        content: 'Parent Component',
        type: DocumentationKind.header,
    },
    {
        content: TUTORIAL_SNIPPETS.PARENT_CONTAINER,
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
        // Wrapped the previous tip div inside a notice-box for prominence
        content: `<notice-box variant="tip" title="Styling with TailwindCSS">
            <p class="font-bold mb-2">💡 Tip</p>
            <p>The <code>globalStyleSheet</code> is automatically applied to all components extending BaseElement in the <code>connectedCallback()</code> method.</p>
        </notice-box>`,
        type: DocumentationKind.html
    },
    {
        content: TUTORIAL_SNIPPETS.STYLED_CARD,
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
        content: TUTORIAL_SNIPPETS.ROUTES_DEFINITION,
        type: DocumentationKind.highlightedCode
    },
    {
        content: 'Navigation',
        type: DocumentationKind.header,
    },
    {
        content: TUTORIAL_SNIPPETS.NAVIGATION_USAGE,
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
        content: TUTORIAL_SNIPPETS.ACTION_TYPES,
        type: DocumentationKind.highlightedCode
    },
    {
        content: 'Subscribing to State Changes',
        type: DocumentationKind.header,
    },
    {
        content: TUTORIAL_SNIPPETS.COUNTER_DISPLAY,
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
