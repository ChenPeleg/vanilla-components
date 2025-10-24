import { TokenMatcher } from './TokenMatcher.ts';
import { HtmlRenderer } from './HtmlRenderer.ts';

// Token types for syntax highlighting
export type TokenType = 
    | 'keyword' 
    | 'string' 
    | 'comment' 
    | 'number' 
    | 'operator' 
    | 'punctuation'
    | 'function'
    | 'class'
    | 'type'
    | 'identifier'
    | 'whitespace'
    | 'unknown';

// Token interface representing a single token in code
export interface Token {
    type: TokenType;
    value: string;
    raw: string; // Original text including quotes for strings
}

// Language types supported by the highlighter
export type SupportedLanguage = 'ts' | 'js' | 'html' | 'css';

/**
 * SyntaxHighlighter - A tokenizer-based syntax highlighter for code blocks
 * 
 * This class provides syntax highlighting functionality using regex-based tokenization.
 * It supports multiple token types and can be extended to support various programming languages.
 * 
 * The class has been refactored to use utility classes for better separation of concerns:
 * - TokenMatcher: Handles token pattern matching and identification
 * - HtmlRenderer: Handles HTML generation and styling
 */
export class SyntaxHighlighter {
    private readonly tokenMatcher: TokenMatcher;
    private readonly htmlRenderer: HtmlRenderer;

    constructor() {
        this.tokenMatcher = new TokenMatcher();
        this.htmlRenderer = new HtmlRenderer();
    }

    /**
     * Tokenize code into an array of tokens
     * Uses TokenMatcher utility to identify different token types
     * @param code - The source code to tokenize
     * @param language - The programming language (for future language-specific tokenization)
     */
    tokenize(code: string, language: SupportedLanguage = 'ts'): Token[] {
        const tokens: Token[] = [];
        let position = 0;
        
        // Note: language parameter is reserved for future language-specific tokenization
        void language;

        while (position < code.length) {
            const token = this.tokenMatcher.matchToken(code, position);
            tokens.push(token);
            position += token.value.length;
        }

        return tokens;
    }

    /**
     * Convert tokens to HTML with data attributes for styling
     */
    tokensToHtml(tokens: Token[]): string {
        return this.htmlRenderer.tokensToHtml(tokens);
    }

    /**
     * Add code unit data using tokenization
     */
    addCodeUnitData(code: string, language: SupportedLanguage = 'ts'): string {
        const tokens = this.tokenize(code, language);
        const highlightedCode = this.tokensToHtml(tokens);
        return this.htmlRenderer.wrapInPreTag(highlightedCode, language);
    }

    /**
     * Apply Tailwind CSS styles to highlighted code
     */
    applyStylesToHighlightedCode(highlightedCode: string): string {
        return this.htmlRenderer.applyStylesToHtml(highlightedCode);
    }

    /**
     * Main method to highlight code
     * Returns HTML string with syntax highlighting applied
     */
    highlightCode(code: string, language: SupportedLanguage = 'ts'): string {
        const codeWithData = this.addCodeUnitData(code, language);
        const styledCode = this.applyStylesToHighlightedCode(codeWithData);
        return `${styledCode}\n`;
    }
}
