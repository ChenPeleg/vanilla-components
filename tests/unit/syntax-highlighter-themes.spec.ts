import { test, expect } from '@playwright/test';
import { Highlighter } from '../../src/example-site/code/syntax-highlighter';

test.describe('Highlighter Color Themes', () => {
    test('bold theme applies bright colors with font-bold for keywords', () => {
        const highlighter = new Highlighter('bold');
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Should have bold blue color for keywords
        expect(result).toContain('text-blue-500');
        expect(result).toContain('font-bold');
    });

    test('calm theme applies same colors as bold (placeholder implementation)', () => {
        const highlighter = new Highlighter('calm');
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Calm theme currently has same colors as bold
        expect(result).toContain('text-blue-500');
    });

    test('faded theme applies lighter colors (300 variants)', () => {
        const highlighter = new Highlighter('faded');
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Should have faded blue color for keywords (300 variant instead of 500)
        expect(result).toContain('text-blue-300');
        expect(result).not.toContain('text-blue-500');
    });

    test('faded theme uses text-green-300 for strings', () => {
        const highlighter = new Highlighter('faded');
        const code = 'const str = "hello";';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-green-300');
    });

    test('faded theme uses text-orange-300 for numbers', () => {
        const highlighter = new Highlighter('faded');
        const code = 'const num = 42;';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-orange-300');
    });

    test('faded theme uses text-yellow-300 for functions', () => {
        const highlighter = new Highlighter('faded');
        const code = 'myFunction()';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-yellow-300');
    });

    test('faded theme uses text-cyan-300 for classes', () => {
        const highlighter = new Highlighter('faded');
        const code = 'class MyClass';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-cyan-300');
    });

    test('faded theme uses text-gray-500 for identifiers', () => {
        const highlighter = new Highlighter('faded');
        const code = 'myVariable';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-gray-500');
    });

    test('default constructor uses bold theme', () => {
        const highlighter = new Highlighter();
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Should have bold theme colors
        expect(result).toContain('text-blue-500');
        expect(result).toContain('font-bold');
    });
});
