export class SyntaxtHighlihter {
    addCodeUnitData(code: string, language: 'ts' | 'html'): string {
        // Simple syntax highlighter implementation (for demonstration purposes)
        const keywords = ['function', 'return', 'const', 'let', 'var', 'if', 'else', 'switch', 'case', 'break', 'static'];
        const highlightedCode = code.split(' ').map(word => {
            console.log('word:', word);
            if (keywords.includes(word)) {
                return `<span data-symbol="keyword">${word}</span>`;
            }
            return word;
        }).join(' ');
        return `<pre class="code-block language-${language}">${highlightedCode}</pre>`;

    }
    private matchSymbolToTailwindClass(symbol: string): string {
        const symbolClassMap: Record<string, string> = {
            'keyword': 'text-blue-500 font-bold',
            'string': 'text-green-500',
            'comment': 'text-gray-500 italic',
            'static': 'text-purple-500',
            // Add more symbol-to-class mappings as needed
        };
        return symbolClassMap[symbol] || 'text-gray-800';
    }
    applyStylesToHighlightedCode(highlightedCode: string): string {
        return highlightedCode.replace(/<span data-symbol="(.*?)">(.*?)<\/span>/g, (_match, symbol, content) => {
            const tailwindClass = this.matchSymbolToTailwindClass(symbol);
            return `<span class="${tailwindClass}">${content}</span>`;
        });
    }
    highlightCode (code: string): string {
        const codeWithData = this.addCodeUnitData(code, 'ts');
        const styledCode = this.applyStylesToHighlightedCode (codeWithData)
        return `${styledCode}\n`;
    }


}


//
