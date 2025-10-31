import { test, expect } from '@playwright/test';
import { HighlighterParser } from '../../src/example-site/code/HighlighterParser';
import type { Token } from '../../src/example-site/code/syntax-highlighter';

test.describe('HighlighterParser', () => {
    let renderer: HighlighterParser;

    test.beforeEach(() => {
        renderer = new HighlighterParser();
    });

    test('escapeHtml - escapes HTML special characters', () => {
        const input = '<script>alert("XSS")</script>';
        const escaped = renderer.escapeHtml(input);
        
        expect(escaped).not.toContain('<script>');
        expect(escaped).toContain('&lt;script&gt;');
        expect(escaped).toContain('&quot;');
    });

    test('escapeHtml - escapes ampersands', () => {
        const input = 'a && b';
        const escaped = renderer.escapeHtml(input);
        
        expect(escaped).toContain('&amp;&amp;');
    });

    test('escapeHtml - escapes single quotes', () => {
        const input = "it's";
        const escaped = renderer.escapeHtml(input);
        
        expect(escaped).toContain('&#039;');
    });

    test('tokensToHtml - converts tokens to HTML', () => {
        const tokens: Token[] = [
            { type: 'keyword', value: 'const', raw: 'const' },
            { type: 'whitespace', value: ' ', raw: ' ' },
            { type: 'identifier', value: 'x', raw: 'x' },
        ];
        
        const html = renderer.tokensToHtml(tokens);
        
        expect(html).toContain('<span data-symbol="keyword">const</span>');
        expect(html).toContain(' '); // whitespace preserved
        expect(html).toContain('<span data-symbol="identifier">x</span>');
    });

    test('tokensToHtml - preserves whitespace without spans', () => {
        const tokens: Token[] = [
            { type: 'whitespace', value: '   ', raw: '   ' },
        ];
        
        const html = renderer.tokensToHtml(tokens);
        
        expect(html).toBe('   ');
        expect(html).not.toContain('span');
    });

    test('tokensToHtml - escapes HTML in token values', () => {
        const tokens: Token[] = [
            { type: 'string', value: '"<script>"', raw: '"<script>"' },
        ];
        
        const html = renderer.tokensToHtml(tokens);
        
        expect(html).toContain('&lt;script&gt;');
        expect(html).not.toContain('<script>');
    });

    test('applyStylesToHtml - replaces data attributes with classes', () => {
        const html = '<span data-symbol="keyword">const</span>';
        const styled = renderer.applyStylesToHtml(html);
        
        expect(styled).toContain('class="text-blue-500"');
        expect(styled).not.toContain('data-symbol');
    });

    test('applyStylesToHtml - applies correct classes for different token types', () => {
        const html = '<span data-symbol="string">hello</span>';
        const styled = renderer.applyStylesToHtml(html);
        
        expect(styled).toContain('class="text-amber-600"');
    });

    test('applyStylesToHtml - applies default class for unknown types', () => {
        const html = '<span data-symbol="unknown">?</span>';
        const styled = renderer.applyStylesToHtml(html);
        
        expect(styled).toContain('class="text-gray-800"');
    });

    test('wrapInPreTag - wraps HTML in pre tag with language class', () => {
        const html = '<span>code</span>';
        const wrapped = renderer.wrapInPreTag(html, 'ts');
        
        expect(wrapped).toContain('<pre class="code-block language-ts">');
        expect(wrapped).toContain('</pre>');
        expect(wrapped).toContain('<span>code</span>');
    });

    test('wrapInPreTag - supports different languages', () => {
        const html = '<span>code</span>';
        const wrapped = renderer.wrapInPreTag(html, 'js');
        
        expect(wrapped).toContain('language-js');
    });

    test('renderTokens - performs full rendering pipeline', () => {
        const tokens: Token[] = [
            { type: 'keyword', value: 'const', raw: 'const' },
            { type: 'whitespace', value: ' ', raw: ' ' },
            { type: 'identifier', value: 'x', raw: 'x' },
        ];
        
        const result = renderer.renderTokens(tokens, 'ts');
        
        expect(result).toContain('<pre class="code-block language-ts">');
        expect(result).toContain('class="text-blue-500">const</span>');
        expect(result).toContain('class="text-sky-300">x</span>');
        expect(result).toContain('\n'); // Ends with newline
    });

    test('renderTokens - handles complex tokens', () => {
        const tokens: Token[] = [
            { type: 'comment', value: '// comment', raw: '// comment' },
            { type: 'whitespace', value: '\n', raw: '\n' },
            { type: 'string', value: '"hello"', raw: '"hello"' },
        ];
        
        const result = renderer.renderTokens(tokens, 'js');
        
        expect(result).toContain('class="text-slate-500 italic">// comment</span>');
        expect(result).toContain('class="text-amber-600">&quot;hello&quot;</span>');
    });

    test('renderTokens - securely handles malicious code', () => {
        const tokens: Token[] = [
            { type: 'string', value: '<script>alert("XSS")</script>', raw: '<script>alert("XSS")</script>' },
        ];
        
        const result = renderer.renderTokens(tokens, 'ts');
        
        expect(result).not.toMatch(/<script>/);
        expect(result).toContain('&lt;script&gt;');
    });

    test('renderTokens - handles empty token array', () => {
        const tokens: Token[] = [];
        const result = renderer.renderTokens(tokens, 'ts');
        
        expect(result).toContain('<pre class="code-block language-ts">');
        expect(result).toContain('</pre>');
    });

    test('complete integration - keyword, string, and number', () => {
        const tokens: Token[] = [
            { type: 'keyword', value: 'const', raw: 'const' },
            { type: 'whitespace', value: ' ', raw: ' ' },
            { type: 'identifier', value: 'str', raw: 'str' },
            { type: 'whitespace', value: ' ', raw: ' ' },
            { type: 'operator', value: '=', raw: '=' },
            { type: 'whitespace', value: ' ', raw: ' ' },
            { type: 'string', value: '"hello"', raw: '"hello"' },
            { type: 'punctuation', value: ';', raw: ';' },
        ];
        
        const result = renderer.renderTokens(tokens, 'ts');
        
        expect(result).toContain('text-blue-500');
        expect(result).toContain('text-sky-300');
        expect(result).toContain('text-slate-400');
        expect(result).toContain('text-amber-600');
        expect(result).toContain('text-slate-400');
    });
});
