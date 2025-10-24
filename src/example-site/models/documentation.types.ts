import {makeBrandedType} from '../../models/makeBrandedType.ts';

export const DocumentationKind = makeBrandedType({
    Text: 'text',
    gist: 'gist',
    html: 'html',
    header: 'header',
    code: 'code',
    highlightedCode: 'highlightedCode'
}, 'environment');

export type DocumentationKindType = (typeof DocumentationKind)[keyof typeof DocumentationKind];

export type DocumentationType = {
    id?: string; content: string; type?: DocumentationKindType;
}
