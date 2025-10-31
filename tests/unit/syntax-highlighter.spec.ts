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
        expect(tokens.length).toBeGreaterThan(0);
        expect(tokens[0].type).toBe('keyword');
        expect(tokens[0].value).toBe('const');
    });

    test('tokenizes strings with quotes', () => {
        const code = 'const str = "hello world";';
        const tokens = highlighter.tokenize(code);
        const stringToken = tokens.find(t => t.type === 'string');
        expect(stringToken).toBeDefined();
        expect(stringToken?.value).toBe('"hello world"');
    });

    test('tokenizes template literals', () => {
        const code = 'const tpl = `hello ${name}`;';
        const tokens = highlighter.tokenize(code);
        const stringToken = tokens.find(t => t.type === 'string');
        expect(stringToken).toBeDefined();
        expect(stringToken?.value).toContain('`');
    });

    test('tokenizes numbers', () => {
        const code = 'const num = 42;';
        const tokens = highlighter.tokenize(code);
        const numberToken = tokens.find(t => t.type === 'number');
        expect(numberToken).toBeDefined();
        expect(numberToken?.value).toBe('42');
    });

    test('tokenizes single-line comments', () => {
        const code = '// This is a comment\nconst x = 5;';
        const tokens = highlighter.tokenize(code);
        const commentToken = tokens.find(t => t.type === 'comment');
        expect(commentToken).toBeDefined();
        expect(commentToken?.value).toContain('This is a comment');
    });

    test('tokenizes multi-line comments', () => {
        const code = '/* Multi\nline\ncomment */const x = 5;';
        const tokens = highlighter.tokenize(code);
        const commentToken = tokens.find(t => t.type === 'comment');
        expect(commentToken).toBeDefined();
        expect(commentToken?.value).toContain('Multi');
    });

    test('tokenizes operators', () => {
        const code = 'a === b';
        const tokens = highlighter.tokenize(code);
        const operatorToken = tokens.find(t => t.type === 'operator');
        expect(operatorToken).toBeDefined();
        expect(operatorToken?.value).toBe('===');
    });

    test('identifies function names', () => {
        const code = 'myFunction()';
        const tokens = highlighter.tokenize(code);
        const functionToken = tokens.find(t => t.type === 'function');
        expect(functionToken).toBeDefined();
        expect(functionToken?.value).toBe('myFunction');
    });

    test('identifies class names', () => {
        const code = 'class MyClass';
        const tokens = highlighter.tokenize(code);
        const classToken = tokens.find(t => t.type === 'class');
        expect(classToken).toBeDefined();
        expect(classToken?.value).toBe('MyClass');
    });

    test('escapes HTML in output', () => {
        const code = 'const html = "<script>alert()</script>";';
        const result = highlighter.highlightCode(code);
        expect(result).not.toMatch(/<script>/);
        expect(result).toContain('&lt;script&gt;');
    });

    test('applies correct Tailwind classes', () => {
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
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
        const hasInterface = tokens.some(t => t.type === 'keyword' && t.value === 'interface');
        const hasAsync = tokens.some(t => t.type === 'keyword' && t.value === 'async');
        expect(hasInterface).toBe(true);
        expect(hasAsync).toBe(true);
    });
});
