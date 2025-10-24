import { test, expect } from '@playwright/test';
import { TokenMatcher } from '../../src/example-site/code/TokenMatcher';

test.describe('TokenMatcher', () => {
    let matcher: TokenMatcher;

    test.beforeEach(() => {
        matcher = new TokenMatcher();
    });

    test('matchMultiLineComment - matches multi-line comments', () => {
        const code = '/* This is a\nmulti-line comment */';
        const token = matcher.matchMultiLineComment(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('comment');
        expect(token?.value).toContain('multi-line');
    });

    test('matchMultiLineComment - returns null when no match', () => {
        const code = 'const x = 5;';
        const token = matcher.matchMultiLineComment(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchSingleLineComment - matches single-line comments', () => {
        const code = '// This is a comment';
        const token = matcher.matchSingleLineComment(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('comment');
        expect(token?.value).toBe('// This is a comment');
    });

    test('matchSingleLineComment - returns null when no match', () => {
        const code = 'const x = 5;';
        const token = matcher.matchSingleLineComment(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchTemplateLiteral - matches template literals', () => {
        const code = '`hello ${name}`';
        const token = matcher.matchTemplateLiteral(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('string');
        expect(token?.value).toContain('`');
    });

    test('matchTemplateLiteral - returns null when no backtick', () => {
        const code = '"hello"';
        const token = matcher.matchTemplateLiteral(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchString - matches double-quoted strings', () => {
        const code = '"hello world"';
        const token = matcher.matchString(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('string');
        expect(token?.value).toBe('"hello world"');
    });

    test('matchString - matches single-quoted strings', () => {
        const code = "'hello world'";
        const token = matcher.matchString(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('string');
        expect(token?.value).toBe("'hello world'");
    });

    test('matchString - returns null when no match', () => {
        const code = 'const x = 5;';
        const token = matcher.matchString(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchNumber - matches integers', () => {
        const code = '42';
        const token = matcher.matchNumber(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('number');
        expect(token?.value).toBe('42');
    });

    test('matchNumber - matches floats', () => {
        const code = '3.14159';
        const token = matcher.matchNumber(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('number');
        expect(token?.value).toBe('3.14159');
    });

    test('matchNumber - matches hex numbers', () => {
        const code = '0xFF';
        const token = matcher.matchNumber(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('number');
        expect(token?.value).toBe('0xFF');
    });

    test('matchNumber - returns null when no match', () => {
        const code = 'abc';
        const token = matcher.matchNumber(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchOperator - matches triple equals', () => {
        const code = '===';
        const token = matcher.matchOperator(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('operator');
        expect(token?.value).toBe('===');
    });

    test('matchOperator - matches arrow function', () => {
        const code = '=>';
        const token = matcher.matchOperator(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('operator');
        expect(token?.value).toBe('=>');
    });

    test('matchOperator - returns null when no match', () => {
        const code = 'abc';
        const token = matcher.matchOperator(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchPunctuation - matches brackets', () => {
        const code = '()';
        const token = matcher.matchPunctuation(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('punctuation');
        expect(token?.value).toBe('(');
    });

    test('matchPunctuation - returns null when no match', () => {
        const code = 'abc';
        const token = matcher.matchPunctuation(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchIdentifier - matches variable names', () => {
        const code = 'myVariable';
        const token = matcher.matchIdentifier(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('identifier');
        expect(token?.value).toBe('myVariable');
    });

    test('matchIdentifier - matches keywords', () => {
        const code = 'const';
        const token = matcher.matchIdentifier(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('keyword');
        expect(token?.value).toBe('const');
    });

    test('matchIdentifier - identifies class names', () => {
        const code = 'MyClass';
        const token = matcher.matchIdentifier(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('class');
        expect(token?.value).toBe('MyClass');
    });

    test('matchIdentifier - identifies function calls', () => {
        const code = 'myFunction()';
        const token = matcher.matchIdentifier(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('function');
        expect(token?.value).toBe('myFunction');
    });

    test('matchIdentifier - returns null when no match', () => {
        const code = '123';
        const token = matcher.matchIdentifier(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchWhitespace - matches spaces', () => {
        const code = '   ';
        const token = matcher.matchWhitespace(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('whitespace');
        expect(token?.value).toBe('   ');
    });

    test('matchWhitespace - matches newlines', () => {
        const code = '\n\t';
        const token = matcher.matchWhitespace(code, 0);
        
        expect(token).toBeDefined();
        expect(token?.type).toBe('whitespace');
    });

    test('matchWhitespace - returns null when no match', () => {
        const code = 'abc';
        const token = matcher.matchWhitespace(code, 0);
        
        expect(token).toBeNull();
    });

    test('matchToken - returns first matching token', () => {
        const code = 'const x = 5;';
        const token = matcher.matchToken(code, 0);
        
        expect(token.type).toBe('keyword');
        expect(token.value).toBe('const');
    });

    test('matchToken - returns unknown for unmatched characters', () => {
        const code = '@';
        const token = matcher.matchToken(code, 0);
        
        expect(token.type).toBe('unknown');
        expect(token.value).toBe('@');
    });

    test('isKeyword - returns true for keywords', () => {
        expect(matcher.isKeyword('const')).toBe(true);
        expect(matcher.isKeyword('async')).toBe(true);
        expect(matcher.isKeyword('interface')).toBe(true);
    });

    test('isKeyword - returns false for non-keywords', () => {
        expect(matcher.isKeyword('myVariable')).toBe(false);
        expect(matcher.isKeyword('MyClass')).toBe(false);
    });
});
