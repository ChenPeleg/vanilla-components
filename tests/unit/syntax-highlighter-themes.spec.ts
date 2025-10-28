import { test, expect } from '@playwright/test';
import { Highlighter } from '../../src/example-site/code/syntax-highlighter';

test.describe('Highlighter Color Themes', () => {
    test('bold theme applies VS Code Dark+ inspired colors for keywords', () => {
        const highlighter = new Highlighter('bold');
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // VS Code Dark+ uses light blue for keywords (text-blue-400)
        expect(result).toContain('text-blue-400');
    });

    test('bold theme uses orange for strings (VS Code Dark+ style)', () => {
        const highlighter = new Highlighter('bold');
        const code = 'const str = "hello";';
        const result = highlighter.highlightCode(code);
        
        // VS Code Dark+ uses orange/brown for strings
        expect(result).toContain('text-orange-400');
    });

    test('bold theme uses lime-green for numbers (VS Code Dark+ style)', () => {
        const highlighter = new Highlighter('bold');
        const code = 'const num = 42;';
        const result = highlighter.highlightCode(code);
        
        // VS Code Dark+ uses light green for numbers
        expect(result).toContain('text-lime-300');
    });

    test('bold theme uses yellow for functions (VS Code Dark+ style)', () => {
        const highlighter = new Highlighter('bold');
        const code = 'myFunction()';
        const result = highlighter.highlightCode(code);
        
        // VS Code Dark+ uses yellow for functions
        expect(result).toContain('text-yellow-200');
    });

    test('bold theme uses teal for classes (VS Code Dark+ style)', () => {
        const highlighter = new Highlighter('bold');
        const code = 'class MyClass';
        const result = highlighter.highlightCode(code);
        
        // VS Code Dark+ uses teal/cyan for classes
        expect(result).toContain('text-teal-400');
    });

    test('bold theme uses green for comments (VS Code Dark+ style)', () => {
        const highlighter = new Highlighter('bold');
        const code = '// comment';
        const result = highlighter.highlightCode(code);
        
        // VS Code Dark+ uses green for comments
        expect(result).toContain('text-green-600');
        expect(result).toContain('italic');
    });

    test('calm theme applies GitHub-inspired colors for keywords', () => {
        const highlighter = new Highlighter('calm');
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Calm theme uses text-blue-500 for keywords
        expect(result).toContain('text-blue-500');
    });

    test('calm theme uses amber for strings', () => {
        const highlighter = new Highlighter('calm');
        const code = 'const str = "hello";';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-amber-600');
    });

    test('faded theme applies lighter colors (300 variants)', () => {
        const highlighter = new Highlighter('faded');
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Should have faded blue color for keywords (300 variant)
        expect(result).toContain('text-blue-300');
    });

    test('faded theme uses text-orange-300 for strings', () => {
        const highlighter = new Highlighter('faded');
        const code = 'const str = "hello";';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-orange-300');
    });

    test('faded theme uses text-lime-200 for numbers', () => {
        const highlighter = new Highlighter('faded');
        const code = 'const num = 42;';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-lime-200');
    });

    test('faded theme uses text-yellow-100 for functions', () => {
        const highlighter = new Highlighter('faded');
        const code = 'myFunction()';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-yellow-100');
    });

    test('faded theme uses text-teal-300 for classes', () => {
        const highlighter = new Highlighter('faded');
        const code = 'class MyClass';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-teal-300');
    });

    test('faded theme uses text-sky-200 for identifiers', () => {
        const highlighter = new Highlighter('faded');
        const code = 'myVariable';
        const result = highlighter.highlightCode(code);
        
        expect(result).toContain('text-sky-200');
    });

    test('default constructor uses bold theme with VS Code colors', () => {
        const highlighter = new Highlighter();
        const code = 'const x = 5;';
        const result = highlighter.highlightCode(code);
        
        // Should have bold theme colors (VS Code Dark+ inspired)
        expect(result).toContain('text-blue-400');
    });
});
