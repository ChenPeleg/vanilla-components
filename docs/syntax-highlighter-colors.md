# Syntax Highlighter Color Schemes

## Overview

The HighlighterParser now uses color schemes inspired by popular code editors and syntax highlighting themes used in the JavaScript/TypeScript community.

## Available Themes

**Note:** All themes are designed for dark backgrounds (`bg-gray-800` or similar). The colors are optimized for code blocks with dark backgrounds, which is the standard in most code editors.

### Bold Theme (Default) - VS Code Dark+ Inspired

The default "bold" theme is inspired by **VS Code Dark+**, the most popular code editor theme for JavaScript and TypeScript development.

**Color Mapping:**
- **Keywords** (`const`, `let`, `function`, `class`, etc.): `text-blue-400` - Light blue (#569CD6 in VS Code)
- **Strings**: `text-orange-400` - Orange/brown (#CE9178 in VS Code)
- **Comments**: `text-green-600 italic` - Green (#6A9955 in VS Code)
- **Numbers**: `text-lime-300` - Light green (#B5CEA8 in VS Code)
- **Functions**: `text-yellow-200` - Yellow (#DCDCAA in VS Code)
- **Classes/Types**: `text-teal-400` - Teal/cyan (#4EC9B0 in VS Code)
- **Operators**: `text-gray-300` - Light gray (#D4D4D4 in VS Code)
- **Punctuation**: `text-gray-300` - Light gray
- **Variables/Identifiers**: `text-sky-300` - Light blue (#9CDCFE in VS Code)
- **Static members**: `text-blue-400` - Light blue

### Calm Theme - GitHub Inspired

The "calm" theme is inspired by **GitHub's syntax highlighting** with softer, more balanced colors for comfortable viewing.

**Color Mapping:**
- **Keywords**: `text-blue-500` - Soft blue
- **Strings**: `text-amber-600` - Warm amber
- **Comments**: `text-slate-500 italic` - Subtle slate
- **Numbers**: `text-emerald-500` - Emerald green
- **Functions**: `text-amber-500` - Amber
- **Classes/Types**: `text-cyan-600` - Cyan
- **Operators**: `text-slate-400` - Slate gray
- **Punctuation**: `text-slate-400` - Slate gray
- **Variables/Identifiers**: `text-slate-700` - Dark slate
- **Static members**: `text-violet-600` - Violet

### Faded Theme

The "faded" theme uses lighter shades (primarily 300-level and 200-level Tailwind colors) for reduced visual intensity.

**Color Mapping:**
- **Keywords**: `text-blue-300` - Faded blue
- **Strings**: `text-orange-300` - Faded orange
- **Comments**: `text-gray-400 italic` - Light gray
- **Numbers**: `text-lime-200` - Very light green
- **Functions**: `text-yellow-100` - Very light yellow
- **Classes/Types**: `text-teal-300` - Faded teal
- **Operators**: `text-gray-400` - Light gray
- **Punctuation**: `text-gray-400` - Light gray
- **Variables/Identifiers**: `text-sky-200` - Very light blue
- **Static members**: `text-blue-300` - Faded blue

## Usage

To use a specific theme, pass it to the `Highlighter` constructor:

```typescript
import { Highlighter } from './syntax-highlighter.ts';

// Use VS Code Dark+ inspired colors (default)
const highlighter = new Highlighter('bold');

// Use GitHub inspired colors
const calmHighlighter = new Highlighter('calm');

// Use faded colors
const fadedHighlighter = new Highlighter('faded');
```

For the `<highlighted-code>` web component, use the `theme` attribute:

```html
<!-- VS Code Dark+ style (default) -->
<highlighted-code code="const x = 5;"></highlighted-code>

<!-- GitHub style -->
<highlighted-code theme="calm" code="const x = 5;"></highlighted-code>

<!-- Faded style -->
<highlighted-code theme="faded" code="const x = 5;"></highlighted-code>
```

## Design Rationale

The color schemes were updated to match popular, widely-recognized syntax highlighting styles:

1. **VS Code Dark+** is the most popular theme among JavaScript/TypeScript developers
2. **GitHub** theme is familiar to millions of developers who read code on GitHub daily
3. **Tailwind CSS colors** are used for easy integration with the existing styling system

These themes provide:
- **Familiarity**: Developers recognize the color patterns from their daily tools
- **Accessibility**: Colors are chosen for good contrast and readability
- **Consistency**: Token types have consistent colors across different code examples

## Color Reference Chart

| Token Type | Bold (VS Code) | Calm (GitHub) | Faded |
|------------|----------------|---------------|-------|
| Keywords | text-blue-400 | text-blue-500 | text-blue-300 |
| Strings | text-orange-400 | text-amber-600 | text-orange-300 |
| Comments | text-green-600 | text-slate-500 | text-gray-400 |
| Numbers | text-lime-300 | text-emerald-500 | text-lime-200 |
| Functions | text-yellow-200 | text-amber-500 | text-yellow-100 |
| Classes/Types | text-teal-400 | text-cyan-600 | text-teal-300 |
| Operators | text-gray-300 | text-slate-400 | text-gray-400 |
| Identifiers | text-sky-300 | text-slate-700 | text-sky-200 |

## Demo

View the live demo at `/theme-demo.html` to see all three themes in action with the same code sample.
