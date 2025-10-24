import { DocumentationKind, type DocumentationType } from '../models/documentation.types.ts';
import { tutorialDocs } from './tutorial/tutorial-docs.ts';
import { exampleDocs } from './examples/example-docs.ts';

export const documentation: DocumentationType[] = tutorialDocs.map((doc, index) => ({
    id: doc.id || `doc-${index + 1}`,
    type: doc.type || DocumentationKind.Text,
    ...doc,
}));

export const examples: DocumentationType[] = exampleDocs.map((doc, index) => ({
    id: doc.id || `example-${index + 1}`,
    type: doc.type || DocumentationKind.Text,
    ...doc,
}));
