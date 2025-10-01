import {makeBrandedType} from '../../models/makeBrandedType.ts';

export const DocumentationKind = makeBrandedType({
    Text: 'text',
    gist: 'gist',
    html: 'html',
    header: 'header',
    code: 'code',
}, 'environment');

export type DocumentationKindType = (typeof DocumentationKind)[keyof typeof DocumentationKind];


export  type DocumentationType = {
    id?: string; content: string; type?: DocumentationKindType;
}

const howToUse: DocumentationType[] = [{
    content: 'The base element',
    type: DocumentationKind.header,
}, {
    content: `The base element is a custom web component that extends the functionality of the native HTML element.
              It provides a foundation for creating reusable components with encapsulated styles and behavior.`
}, {
    content: ` `
},

    {
    content: `To use the base element just extent it and put some html inside the <code>renderTemplate()</code> method.`
}]

export const documentation: DocumentationType[] = [...howToUse].map((doc, index) => ({
    id: doc.id || `doc-${index + 1}`,
    type: doc.type || DocumentationKind.text, ...doc,
}));
