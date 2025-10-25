import type { Token, SupportedLanguage } from './syntax-highlighter.ts';

/**
 * HighlighterParser - Utility class for converting tokens to styled HTML
 * 
 * This class handles the conversion of parsed tokens into HTML strings,
 * including HTML escaping for security and CSS styling application.
 */
export class HighlighterParser {
    /**
     * Map token types to Tailwind CSS classes for styling
     */
    private readonly symbolClassMap: Record<string, string> = {
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

    /**
     * Escape HTML special characters to prevent XSS attacks
     */
    escapeHtml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Convert an array of tokens to HTML with data attributes
     * Whitespace tokens are preserved as-is, other tokens are wrapped in spans
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
     * Get Tailwind CSS classes for a given token type
     */
    private getStyleClass(tokenType: string): string {
        return this.symbolClassMap[tokenType] || 'text-gray-800';
    }

    /**
     * Apply Tailwind CSS styles to HTML with data-symbol attributes
     * Replaces data attributes with actual class attributes
     */
    applyStylesToHtml(html: string): string {
        return html.replace(/<span data-symbol="(.*?)">(.*?)<\/span>/g, (_match, symbol, content) => {
            const tailwindClass = this.getStyleClass(symbol);
            return `<span class="${tailwindClass}">${content}</span>`;
        });
    }

    /**
     * Wrap code HTML in a pre tag with appropriate language class
     */
    wrapInPreTag(html: string, language: SupportedLanguage): string {
        return `<pre class="code-block language-${language}">${html}</pre>`;
    }

    /**
     * Convert tokens to fully styled HTML output
     */
    renderTokens(tokens: Token[], language: SupportedLanguage): string {
        const htmlWithData = this.tokensToHtml(tokens);
        const styledHtml = this.applyStylesToHtml(htmlWithData);
        const wrappedHtml = this.wrapInPreTag(styledHtml, language);
        return `${wrappedHtml}\n`;
    }
}
