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
 */
export class SyntaxHighlighter {
    
    /**
     * Extended list of JavaScript/TypeScript keywords
     */
    private readonly keywords = [
        // Original keywords
        'function', 'return', 'const', 'let', 'var', 'if', 'else', 'switch', 'case', 'break', 'static',
        // ES6+ keywords
        'async', 'await', 'import', 'export', 'class', 'extends', 'super', 'this', 'new',
        'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'delete', 'void',
        'for', 'while', 'do', 'continue', 'default',
        // TypeScript specific
        'interface', 'type', 'enum', 'namespace', 'declare', 'abstract', 'implements',
        'private', 'public', 'protected', 'readonly', 'as', 'from',
        // Boolean and special values
        'true', 'false', 'null', 'undefined', 'NaN', 'Infinity'
    ];

    /**
     * Tokenize code into an array of tokens
     * Uses regex patterns to identify different token types
     * @param code - The source code to tokenize
     * @param language - The programming language (for future language-specific tokenization)
     */
    tokenize(code: string, language: SupportedLanguage = 'ts'): Token[] {
        const tokens: Token[] = [];
        let position = 0;
        
        // Note: language parameter is reserved for future language-specific tokenization
        void language;

        while (position < code.length) {
            let matched = false;

            // Match multi-line comments (/* ... */)
            const multiLineCommentMatch = code.slice(position).match(/^\/\*[\s\S]*?\*\//);
            if (multiLineCommentMatch) {
                tokens.push({
                    type: 'comment',
                    value: multiLineCommentMatch[0],
                    raw: multiLineCommentMatch[0]
                });
                position += multiLineCommentMatch[0].length;
                matched = true;
                continue;
            }

            // Match single-line comments (// ...)
            const singleLineCommentMatch = code.slice(position).match(/^\/\/.*/);
            if (singleLineCommentMatch) {
                tokens.push({
                    type: 'comment',
                    value: singleLineCommentMatch[0],
                    raw: singleLineCommentMatch[0]
                });
                position += singleLineCommentMatch[0].length;
                matched = true;
                continue;
            }

            // Match template literals (`...`)
            if (code[position] === '`') {
                let endPos = position + 1;
                let escaped = false;
                while (endPos < code.length) {
                    if (code[endPos] === '\\' && !escaped) {
                        escaped = true;
                        endPos++;
                        continue;
                    }
                    if (code[endPos] === '`' && !escaped) {
                        endPos++;
                        break;
                    }
                    escaped = false;
                    endPos++;
                }
                const templateLiteral = code.slice(position, endPos);
                tokens.push({
                    type: 'string',
                    value: templateLiteral,
                    raw: templateLiteral
                });
                position = endPos;
                matched = true;
                continue;
            }

            // Match strings (single or double quotes)
            const stringMatch = code.slice(position).match(/^["'](?:[^"'\\]|\\.)*["']/);
            if (stringMatch) {
                tokens.push({
                    type: 'string',
                    value: stringMatch[0],
                    raw: stringMatch[0]
                });
                position += stringMatch[0].length;
                matched = true;
                continue;
            }

            // Match numbers (integers, floats, hex, binary)
            const numberMatch = code.slice(position).match(/^(?:0[xX][0-9a-fA-F]+|0[bB][01]+|\d+\.?\d*(?:[eE][+-]?\d+)?)/);
            if (numberMatch) {
                tokens.push({
                    type: 'number',
                    value: numberMatch[0],
                    raw: numberMatch[0]
                });
                position += numberMatch[0].length;
                matched = true;
                continue;
            }

            // Match multi-character operators
            const operatorMatch = code.slice(position).match(/^(?:===|!==|==|!=|<=|>=|=>|&&|\|\||<<|>>|\+\+|--|[+\-*\/%<>=!&|^~?:])/);
            if (operatorMatch) {
                tokens.push({
                    type: 'operator',
                    value: operatorMatch[0],
                    raw: operatorMatch[0]
                });
                position += operatorMatch[0].length;
                matched = true;
                continue;
            }

            // Match punctuation (brackets, parentheses, braces, semicolons, commas, dots)
            const punctuationMatch = code.slice(position).match(/^[(){}\[\];,.]/);
            if (punctuationMatch) {
                tokens.push({
                    type: 'punctuation',
                    value: punctuationMatch[0],
                    raw: punctuationMatch[0]
                });
                position += punctuationMatch[0].length;
                matched = true;
                continue;
            }

            // Match identifiers (variable names, function names, class names)
            const identifierMatch = code.slice(position).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
            if (identifierMatch) {
                const identifier = identifierMatch[0];
                
                // Check if it's a keyword
                if (this.keywords.includes(identifier)) {
                    tokens.push({
                        type: 'keyword',
                        value: identifier,
                        raw: identifier
                    });
                } else {
                    // Check if it's a class name (starts with uppercase)
                    const tokenType = /^[A-Z]/.test(identifier) ? 'class' : 'identifier';
                    
                    // Look ahead to see if it's followed by parentheses (function call)
                    const nextNonWhitespace = code.slice(position + identifier.length).match(/^\s*\(/);
                    
                    tokens.push({
                        type: nextNonWhitespace ? 'function' : tokenType,
                        value: identifier,
                        raw: identifier
                    });
                }
                position += identifier.length;
                matched = true;
                continue;
            }

            // Match whitespace
            const whitespaceMatch = code.slice(position).match(/^[\s\n\r\t]+/);
            if (whitespaceMatch) {
                tokens.push({
                    type: 'whitespace',
                    value: whitespaceMatch[0],
                    raw: whitespaceMatch[0]
                });
                position += whitespaceMatch[0].length;
                matched = true;
                continue;
            }

            // If nothing matched, treat as unknown and advance
            if (!matched) {
                tokens.push({
                    type: 'unknown',
                    value: code[position],
                    raw: code[position]
                });
                position++;
            }
        }

        return tokens;
    }

    /**
     * Convert tokens to HTML with data attributes for styling
     */
    tokensToHtml(tokens: Token[]): string {
        return tokens.map(token => {
            if (token.type === 'whitespace') {
                return token.value;
            }
            // Escape HTML special characters
            const escaped = this.escapeHtml(token.value);
            return `<span data-symbol="${token.type}">${escaped}</span>`;
        }).join('');
    }

    /**
     * Escape HTML special characters to prevent XSS
     */
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Add code unit data using tokenization
     */
    addCodeUnitData(code: string, language: SupportedLanguage = 'ts'): string {
        const tokens = this.tokenize(code, language);
        const highlightedCode = this.tokensToHtml(tokens);
        return `<pre class="code-block language-${language}">${highlightedCode}</pre>`;
    }

    /**
     * Map token types to Tailwind CSS classes for styling
     */
    private matchSymbolToTailwindClass(symbol: string): string {
        const symbolClassMap: Record<string, string> = {
            'keyword': 'text-blue-500 font-bold',
            'string': 'text-green-500',
            'comment': 'text-gray-500 italic',
            'number': 'text-orange-500',
            'operator': 'text-pink-500',
            'punctuation': 'text-gray-400',
            'function': 'text-yellow-500',
            'class': 'text-cyan-500 font-semibold',
            'type': 'text-teal-500',
            'identifier': 'text-gray-800',
            'static': 'text-purple-500',
        };
        return symbolClassMap[symbol] || 'text-gray-800';
    }

    /**
     * Apply Tailwind CSS styles to highlighted code
     */
    applyStylesToHighlightedCode(highlightedCode: string): string {
        return highlightedCode.replace(/<span data-symbol="(.*?)">(.*?)<\/span>/g, (_match, symbol, content) => {
            const tailwindClass = this.matchSymbolToTailwindClass(symbol);
            return `<span class="${tailwindClass}">${content}</span>`;
        });
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
