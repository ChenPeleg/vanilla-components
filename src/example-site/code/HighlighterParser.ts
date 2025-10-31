import type { Token, SupportedLanguage } from './syntax-highlighter.ts';

/**
 * Color theme options for syntax highlighting
 */
export type ColorTheme = 'bold' | 'calm' | 'faded';

/**
 * HighlighterParser - Utility class for converting tokens to styled HTML
 * 
 * This class handles the conversion of parsed tokens into HTML strings,
 * including HTML escaping for security and CSS styling application.
 */
export class HighlighterParser {
    public $$getThemesForTestOnly()  {
        return  {
            bold: this.boldTheme,
            calm: this.calmTheme,
            faded: this.fadedTheme,
        }
    }
    private colorTheme: ColorTheme;

    /**
     * Color scheme maps for different themes
     * 
     * Bold theme: Based on VS Code Dark+ theme - the most popular editor theme for JS/TS
     * - Keywords: Light blue (#569CD6 ≈ text-blue-400)
     * - Strings: Orange/brown (#CE9178 ≈ text-orange-400)
     * - Comments: Green (#6A9955 ≈ text-green-600)
     * - Numbers: Light green (#B5CEA8 ≈ text-lime-300)
     * - Functions: Yellow (#DCDCAA ≈ text-yellow-200)
     * - Classes/Types: Teal/cyan (#4EC9B0 ≈ text-teal-400)
     * - Operators/Punctuation: Light gray (#D4D4D4 ≈ text-gray-300)
     * - Variables: Light blue (#9CDCFE ≈ text-sky-300)
     */
    private readonly calmTheme: Record<string, string> = {
        'keyword': 'text-blue-400',
        'string': 'text-orange-400',
        'comment': 'text-green-600 italic',
        'number': 'text-lime-300',
        'operator': 'text-gray-300',
        'punctuation': 'text-gray-300',
        'function': 'text-yellow-200',
        'class': 'text-teal-400',
        'type': 'text-teal-400',
        'identifier': 'text-sky-300',
        'static': 'text-blue-400',
    };

    /**
     * Calm theme: Based on GitHub theme colors for a gentler appearance
     * - Keywords: Soft blue
     * - Strings: Muted coral/salmon
     * - Comments: Subtle gray-green
     */
    private readonly boldTheme : Record<string, string> = {
        'keyword': 'text-blue-500',
        'string': 'text-amber-600',
        'comment': 'text-slate-500 italic',
        'number': 'text-emerald-500',
        'operator': 'text-slate-400',
        'punctuation': 'text-slate-400',
        'function': 'text-amber-500',
        'class': 'text-cyan-600',
        'type': 'text-cyan-600',
        'identifier': 'text-slate-700',
        'static': 'text-violet-600',
    };

    /**
     * Faded theme: Lighter, softer colors for reduced visual intensity
     */
    private readonly fadedTheme: Record<string, string> = {
        'keyword': 'text-blue-300',
        'string': 'text-orange-300',
        'comment': 'text-gray-400 italic',
        'number': 'text-lime-200',
        'operator': 'text-gray-400',
        'punctuation': 'text-gray-400',
        'function': 'text-yellow-100',
        'class': 'text-teal-300',
        'type': 'text-teal-300',
        'identifier': 'text-sky-200',
        'static': 'text-blue-300',
    };

    constructor(theme: ColorTheme = 'bold') {
        this.colorTheme = theme;
    }

    /**
     * Get the current color theme map
     */
    private get symbolClassMap(): Record<string, string> {
        switch (this.colorTheme) {
            case 'bold':
                return this.boldTheme;
            case 'calm':
                return this.calmTheme;
            case 'faded':
                return this.fadedTheme;
            default:
                return this.boldTheme;
        }
    }

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
