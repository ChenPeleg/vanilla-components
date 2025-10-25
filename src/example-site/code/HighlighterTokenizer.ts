import type { Token } from './syntax-highlighter.ts';

/**
 * HighlighterTokenizer - Utility class for matching different token types in source code
 * 
 * This class encapsulates the regex patterns and matching logic for identifying
 * different types of tokens (keywords, strings, numbers, operators, etc.) in source code.
 * Each token type has its own dedicated matching method for better organization and maintainability.
 */
export class HighlighterTokenizer {
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
     * Try to match a multi-line comment at the current position
     */
    matchMultiLineComment(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^\/\*[\s\S]*?\*\//);
        
        if (match) {
            return {
                type: 'comment',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match a single-line comment at the current position
     */
    matchSingleLineComment(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^\/\/.*/);
        
        if (match) {
            return {
                type: 'comment',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match a template literal at the current position
     */
    matchTemplateLiteral(code: string, position: number): Token | null {
        if (code[position] !== '`') {
            return null;
        }

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
        return {
            type: 'string',
            value: templateLiteral,
            raw: templateLiteral
        };
    }

    /**
     * Try to match a string (single or double quotes) at the current position
     */
    matchString(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^["'](?:[^"'\\]|\\.)*["']/);
        
        if (match) {
            return {
                type: 'string',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match a number at the current position
     */
    matchNumber(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^(?:0[xX][0-9a-fA-F]+|0[bB][01]+|\d+\.?\d*(?:[eE][+-]?\d+)?)/);
        
        if (match) {
            return {
                type: 'number',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match an operator at the current position
     */
    matchOperator(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^(?:===|!==|==|!=|<=|>=|=>|&&|\|\||<<|>>|\+\+|--|[+\-*\/%<>=!&|^~?:])/);
        
        if (match) {
            return {
                type: 'operator',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match punctuation at the current position
     */
    matchPunctuation(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^[(){}\[\];,.]/);
        
        if (match) {
            return {
                type: 'punctuation',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match an identifier, keyword, function name, or class name at the current position
     */
    matchIdentifier(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
        
        if (!match) {
            return null;
        }

        const identifier = match[0];
        
        // Check if it's a keyword
        if (this.keywords.includes(identifier)) {
            return {
                type: 'keyword',
                value: identifier,
                raw: identifier
            };
        }
        
        // Check if it's a class name (starts with uppercase)
        const tokenType = /^[A-Z]/.test(identifier) ? 'class' : 'identifier';
        
        // Look ahead to see if it's followed by parentheses (function call)
        const nextNonWhitespace = code.slice(position + identifier.length).match(/^\s*\(/);
        
        return {
            type: nextNonWhitespace ? 'function' : tokenType,
            value: identifier,
            raw: identifier
        };
    }

    /**
     * Try to match whitespace at the current position
     */
    matchWhitespace(code: string, position: number): Token | null {
        const slice = code.slice(position);
        const match = slice.match(/^[\s\n\r\t]+/);
        
        if (match) {
            return {
                type: 'whitespace',
                value: match[0],
                raw: match[0]
            };
        }
        return null;
    }

    /**
     * Try to match any token at the current position
     * Returns the first matching token or an 'unknown' token if nothing matches
     */
    matchToken(code: string, position: number): Token {
        // Try each matcher in order of priority
        const matchers = [
            () => this.matchMultiLineComment(code, position),
            () => this.matchSingleLineComment(code, position),
            () => this.matchTemplateLiteral(code, position),
            () => this.matchString(code, position),
            () => this.matchNumber(code, position),
            () => this.matchOperator(code, position),
            () => this.matchPunctuation(code, position),
            () => this.matchIdentifier(code, position),
            () => this.matchWhitespace(code, position),
        ];

        for (const matcher of matchers) {
            const token = matcher();
            if (token) {
                return token;
            }
        }

        // If nothing matched, return unknown token
        return {
            type: 'unknown',
            value: code[position],
            raw: code[position]
        };
    }

    /**
     * Check if a given identifier is a keyword
     */
    isKeyword(identifier: string): boolean {
        return this.keywords.includes(identifier);
    }
}
