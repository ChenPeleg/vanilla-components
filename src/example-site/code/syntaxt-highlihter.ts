export class SyntaxtHighlihter {
    highlight(code: string, language: 'ts' | 'html'): string {
        // Simple syntax highlighter implementation (for demonstration purposes)
        const keywords = ['function', 'return', 'const', 'let', 'var', 'if', 'else', 'switch', 'case', 'break'];
        const highlightedCode = code.split(' ').map(word => {
            if (keywords.includes(word)) {
                return `<span class="keyword">${word}</span>`;
            }
            return word;
        }).join(' ');
        return `<pre class="code-block language-${language}">${highlightedCode}</pre>`;

    }
}


//
