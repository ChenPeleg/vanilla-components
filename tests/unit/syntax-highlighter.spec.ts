import { test, expect } from '@playwright/test';
import { Highlighter } from '../../src/example-site/code/syntax-highlighter';

test.describe('Highlighter', () => {
    let highlighter: Highlighter;

    test.beforeEach(() => {
        highlighter = new Highlighter();
    });

    test('tokenizes simple keywords', () => {
        const code = 'const x = 5;';
        const tokens = highlighter.tokenize(code);
        
        // Should have tokens for: const, whitespace, x, whitespace, =, whitespace, 5, ;
        expect(tokens.length).toBeGreaterThan(0);
        
        // First token should be 'const' keyword
        expect(tokens[0].type).toBe('keyword');
        expect(tokens[0].value).toBe('const');
    });

    test('tokenizes strings with quotes', () => {
        const code = 'const str = "hello world";';
        const tokens = highlighter.tokenize(code);
        
        // Find the string token
        const stringToken = tokens.find(t => t.type === 'string');
        expect(stringToken).toBeDefined();
        expect(stringToken?.value).toBe('"hello world"');
    });

    test('tokenizes template literals', () => {
        const code = 'const tpl = `hello ${name}`;';
        const tokens = highlighter.tokenize(code);
        
        // Find the string token (template literal is treated as string)
        const stringToken = tokens.find(t => t.type === 'string');
        expect(stringToken).toBeDefined();
        expect(stringToken?.value).toContain('`');
    });

    test('tokenizes numbers', () => {
        const code = 'const num = 42;';
        const tokens = highlighter.tokenize(code);
        
        // Find the number token
        const numberToken = tokens.find(t => t.type === 'number');
        expect(numberToken).toBeDefined();
        expect(numberToken?.value).toBe('42');
    });

    test('tokenizes single-line comments', () => {
        const code = '// This is a comment\nconst x = 5;';
        const tokens = highlighter.tokenize(code);
        
        // Find the comment token
        const commentToken = tokens.find(t => t.type === 'comment');
        expect(commentToken).toBeDefined();
        expect(commentToken?.value).toContain('This is a comment');
    });

    test('tokenizes multi-line comments', () => {
        const code = '/* Multi\nline\ncomment */const x = 5;';
        const tokens = highlighter.tokenize(code);
        
        // Find the comment token
        const commentToken = tokens.find(t => t.type === 'comment');
        expect(commentToken).toBeDefined();
        expect(commentToken?.value).toContain('Multi');
    });

    test('tokenizes operators', () => {
        const code = 'a === b';
        const tokens = highlighter.tokenize(code);
        
        // Find the operator token
        const operatorToken = tokens.find(t => t.type === 'operator');
        expect(operatorToken).toBeDefined();
        expect(operatorToken?.value).toBe('===');
    });

    test('identifies function names', () => {
        const code = 'myFunction()';
        const tokens = highlighter.tokenize(code);
        
        // Find the function token
        const functionToken = tokens.find(t => t.type === 'function');
        expect(functionToken).toBeDefined();
        expect(functionToken?.value).toBe('myFunction');
    });

    test('identifies class names', () => {
        const code = 'class MyClass';
        const tokens = highlighter.tokenize(code);
        
        // Find the class token (MyClass should be identified as a class due to capitalization)
        const classToken = tokens.find(t => t.type === 'class');
        expect(classToken).toBeDefined();
        expect(classToken?.value).toBe('MyClass');
    });

    test('escapes HTML in output', () => {
        const code = 'const html = "<script>alert()</script>";';
        const result = highlighter.highlightCode(code);
        
        // Security test: Verify that script tags in code are properly escaped
        // to prevent XSS attacks. The literal string '<script>' in the test
        // is intentional - we're checking it does NOT appear in output.
        expect(result).not.toMatch(/<script>/);
        expect(result).toContain('&lt;script&gt;');
    });

    test('applies correct Tailwind classes', () => {
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Should have classes for keywords
        expect(result).toContain('text-blue-500');
    });

    test('handles empty code', () => {
        const code = '';
        const tokens = highlighter.tokenize(code);
        
        expect(tokens).toEqual([]);
    });

    test('handles code with only whitespace', () => {
        const code = '   \n\t  ';
        const tokens = highlighter.tokenize(code);
        
        // Should have only whitespace tokens
        expect(tokens.every(t => t.type === 'whitespace')).toBe(true);
    });

    test('tokenizes complex TypeScript code', () => {
        const code = `
interface User {
    name: string;
    age: number;
}

async function getUser(): Promise<User> {
    return { name: "John", age: 30 };
}
        `.trim();
        
        const tokens = highlighter.tokenize(code);
        
        // Should have interface and async keywords
        const hasInterface = tokens.some(t => t.type === 'keyword' && t.value === 'interface');
        const hasAsync = tokens.some(t => t.type === 'keyword' && t.value === 'async');
        
        expect(hasInterface).toBe(true);
        expect(hasAsync).toBe(true);
    });
});
