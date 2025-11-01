import { DocumentationKind, type DocumentationType } from '../../models/documentation.types.ts';
import { CODE_SNIPPETS } from './code-snippets.ts';

const buttonExampleDocs: DocumentationType[] = [
    {
        content: 'Interactive Button Component',
        type: DocumentationKind.header,
    },
    {
        content: `<notice-box variant="tip" title="Try the Live Example">This interactive button example below demonstrates click handling, disabled states, and how parent components can listen to the <code>actionCallback</code>.</notice-box>`,
        type: DocumentationKind.html,
    },
    {
        content: `A complete button component demonstrating click handling, disabled states, and custom styling.`
    },
    {
        content: CODE_SNIPPETS.INTERACTIVE_BUTTON,
        type: DocumentationKind.highlightedCode
    },
    {
        content: 'Usage Example',
        type: DocumentationKind.header,
    },
    {
        content: CODE_SNIPPETS.BUTTON_USAGE_EXAMPLE,
        type: DocumentationKind.highlightedCode
    }
];

const formInputExampleDocs: DocumentationType[] = [
    {
        content: 'Form Input with Validation',
        type: DocumentationKind.header,
    },
    {
        content: `A text input component with real-time validation and error messages.`
    },
    {
        content: CODE_SNIPPETS.VALIDATED_INPUT,
        type: DocumentationKind.highlightedCode
    }
];

const cardExampleDocs: DocumentationType[] = [
    {
        content: 'Expandable Card Component',
        type: DocumentationKind.header,
    },
    {
        content: `A card component with expand/collapse functionality and different states.`
    },
    {
        content: CODE_SNIPPETS.EXPANDABLE_CARD,
        type: DocumentationKind.highlightedCode
    }
];

const stateManagementExampleDocs: DocumentationType[] = [
    {
        content: 'Global Counter with Store',
        type: DocumentationKind.header,
    },
    {
        content: `A practical example showing how to connect components to the global store for state management.`
    },
    {
        content: CODE_SNIPPETS.GLOBAL_COUNTER_DISPLAY,
        type: DocumentationKind.highlightedCode
    }
];

const routingExampleDocs: DocumentationType[] = [
    {
        content: 'Navigation with Router',
        type: DocumentationKind.header,
    },
    {
        content: `Example showing how to implement navigation between pages using the hash router.`
    },
    {
        content: CODE_SNIPPETS.APP_NAVIGATION,
        type: DocumentationKind.highlightedCode
    }
];

export const exampleDocs: DocumentationType[] = [
    ...buttonExampleDocs,
    ...formInputExampleDocs,
    ...cardExampleDocs,
    ...stateManagementExampleDocs,
    ...routingExampleDocs
];
