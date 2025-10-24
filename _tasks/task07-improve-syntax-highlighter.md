# Task 07: Improve Syntax Highlighter

## Overview
This task outlines a comprehensive plan to enhance the syntax highlighter component in the Vanilla Components project. The current implementation provides basic keyword highlighting but is limited to one part of the application (examples page). This plan will improve functionality, expand language support, and make it available throughout the application.

## Current State Analysis

### Existing Implementation
- **Location**: `src/example-site/code/syntaxt-highlihter.ts`
- **Component**: `highlighted-code.ts` web component
- **Current Usage**: Only in `examples-page.ts` for `DocumentationKind.highlightedCode`
- **Functionality**: Basic keyword detection using space-based splitting
- **Supported Keywords**: function, return, const, let, var, if, else, switch, case, break, static
- **Languages**: TypeScript and HTML (minimal support)

### Current Limitations
1. **Tokenization**: Uses naive space-splitting instead of proper token parsing
2. **Language Support**: Only basic TypeScript/JavaScript keywords
3. **Limited Availability**: Not used across other parts of the application
4. **No Advanced Features**: Missing line numbers, copy functionality, theme support
5. **Typo**: File named `syntaxt-highlihter.ts` (should be `syntax-highlighter.ts`)
6. **Limited Token Types**: Only keywords are highlighted, missing strings, comments, operators, etc.
7. **No Context Awareness**: Cannot handle multi-word tokens or special characters properly

## High-Level Improvement Plan

### Phase 1: Core Enhancement (Foundation)
**Goal**: Fix fundamental issues and improve tokenization

#### Step 1.1: Fix Naming and Structure
- Rename `syntaxt-highlihter.ts` to `syntax-highlighter.ts`
- Update all imports across the codebase
- Add proper TypeScript interfaces and types

#### Step 1.2: Implement Proper Tokenization
- Replace space-splitting with regex-based tokenization
- Create token type system (keyword, string, comment, operator, number, etc.)
- Handle multi-character operators and symbols correctly
- Support quoted strings (single and double quotes)
- Support template literals for JavaScript/TypeScript

#### Step 1.3: Expand Token Types
- Keywords (existing + expanded list)
- Strings (single, double, template literals)
- Comments (single-line and multi-line)
- Numbers (integers, floats, hex, binary)
- Operators (=, +, -, *, /, ===, !==, etc.)
- Brackets and punctuation
- Function/method names
- Class names
- Type annotations (TypeScript specific)

### Phase 2: Language Support Expansion
**Goal**: Add comprehensive language support

#### Step 2.1: JavaScript/TypeScript Enhancement
- Add modern ES6+ keywords (async, await, import, export, class, extends, etc.)
- Support JSX/TSX syntax
- TypeScript-specific keywords (interface, type, enum, namespace, etc.)
- Decorator syntax (@decorator)
- Type annotations and generics

#### Step 2.2: HTML/XML Support
- HTML tags and attributes
- Self-closing tags
- DOCTYPE declarations
- HTML entities
- Attribute values and quotes

#### Step 2.3: CSS Support
- Selectors (class, id, element, pseudo)
- Properties and values
- Units and colors
- CSS variables
- Media queries and at-rules

#### Step 2.4: Additional Languages (Future)
- JSON (keys, values, structure)
- Markdown (headers, bold, italic, code blocks, links)
- Shell/Bash scripts
- SQL queries

### Phase 3: Feature Enhancement
**Goal**: Add user-facing features

#### Step 3.1: Line Numbers
- Optional line number display
- Configurable via attribute
- Proper alignment with code

#### Step 3.2: Copy to Clipboard
- Add copy button to code blocks
- Visual feedback on copy
- Fallback for browsers without clipboard API

#### Step 3.3: Language Detection
- Auto-detect language from code patterns
- Allow manual language specification via attribute
- Display language indicator badge

#### Step 3.4: Syntax Themes
- Create multiple color themes (light, dark, high-contrast)
- Support custom theme configuration
- Use CSS variables for easy customization

#### Step 3.5: Code Highlighting Features
- Highlight specific lines (for examples and tutorials)
- Diff highlighting (additions/deletions)
- Search and highlight within code blocks

### Phase 4: Component Integration
**Goal**: Make syntax highlighter available throughout the application

#### Step 4.1: Expand Component Usage
- Update `code-snippet.ts` to use syntax highlighting
- Add syntax highlighting to tutorial pages
- Enable in "How to Use" documentation
- Support inline code highlighting (not just blocks)

#### Step 4.2: Create Convenience Components
- `<inline-code>` for inline syntax highlighting
- `<code-block-with-header>` with title and language badge
- `<code-comparison>` for before/after comparisons
- `<interactive-code>` with editable and runnable code

#### Step 4.3: Update Documentation System
- Add new `DocumentationKind` types for different code presentations
- Update page renderers to support new types
- Create reusable templates for common code patterns

### Phase 5: Performance and Optimization
**Goal**: Ensure efficient rendering and good UX

#### Step 5.1: Performance Optimization
- Lazy loading for large code blocks
- Virtual scrolling for very long files
- Debounce/throttle for live highlighting
- Memoization of parsed tokens

#### Step 5.2: Accessibility Improvements
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements for copy actions
- High contrast mode support

#### Step 5.3: Mobile Responsiveness
- Horizontal scrolling for wide code blocks
- Touch-friendly copy button
- Responsive font sizing
- Swipe gestures for scrolling

### Phase 6: Testing and Documentation
**Goal**: Ensure reliability and maintainability

#### Step 6.1: Unit Tests
- Test tokenization for each language
- Test edge cases (empty code, special characters, etc.)
- Test theme application
- Test component rendering

#### Step 6.2: Integration Tests
- Test in different pages (examples, tutorials, docs)
- Test copy functionality
- Test theme switching
- Test with various code lengths

#### Step 6.3: Documentation
- Add examples to documentation pages
- Create API reference for syntax highlighter
- Document supported languages and tokens
- Provide customization guide

#### Step 6.4: Performance Benchmarks
- Measure rendering time for various code sizes
- Compare before/after performance
- Set performance budgets

## Implementation Priority

### Priority 1: Critical (Week 1)
- Phase 1: Core Enhancement
  - Fix naming issues
  - Implement proper tokenization
  - Expand token types for JavaScript/TypeScript
- Phase 4.1: Basic Integration
  - Make it work in current examples-page properly

### Priority 2: High Value (Week 2-3)
- Phase 2: Language Support
  - Complete JavaScript/TypeScript support
  - Add HTML/CSS support
- Phase 3.1-3.3: Essential Features
  - Line numbers
  - Copy button
  - Language detection

### Priority 3: Enhancement (Week 4-5)
- Phase 3.4-3.5: Advanced Features
  - Themes
  - Line highlighting
- Phase 4.2-4.3: Component Integration
  - Convenience components
  - Documentation system updates

### Priority 4: Polish (Week 6+)
- Phase 5: Performance and Optimization
- Phase 6: Testing and Documentation

## Success Metrics

### Functional Success
- ✅ Correctly highlights at least 95% of common code patterns
- ✅ Supports 4+ programming languages (JS/TS, HTML, CSS, JSON)
- ✅ Available in at least 3 different pages/contexts
- ✅ Zero performance degradation for code blocks under 1000 lines
- ✅ Copy functionality works in 99%+ of browsers

### Code Quality
- ✅ Test coverage above 80%
- ✅ No TypeScript errors or warnings
- ✅ Follows project coding conventions
- ✅ Properly documented with JSDoc comments

### User Experience
- ✅ Renders in under 100ms for typical code blocks (< 100 lines)
- ✅ Works on mobile devices without horizontal scrolling issues
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Intuitive copy button with clear feedback

## Technical Considerations

### Architecture Decisions
1. **Token Parser**: Use regex-based approach for simplicity and performance
2. **Extensibility**: Plugin architecture for adding new languages
3. **Theming**: CSS variables for easy customization
4. **Performance**: Lazy loading for large files

### Dependencies
- **Consider**: Using a lightweight library like Prism.js or Highlight.js for advanced features
- **Trade-off**: Balance between bundle size and features
- **Decision Point**: Start with custom implementation, evaluate libraries in Phase 2

### Browser Support
- Target: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features are acceptable given target
- Clipboard API with fallback for older browsers

## Migration Path

### Breaking Changes
- File rename requires import updates
- API changes might affect existing usage

### Compatibility Strategy
1. Create new syntax highlighter alongside old one
2. Migrate examples-page to new implementation
3. Test thoroughly before removing old implementation
4. Update documentation and examples
5. Remove old implementation

## Future Enhancements (Beyond this Task)

1. **Interactive Features**
   - Live code editing with real-time highlighting
   - Code execution/preview (sandboxed)
   - Code folding for large blocks

2. **Advanced Language Support**
   - GraphQL
   - YAML
   - Docker
   - Python
   - Rust

3. **AI Integration**
   - Code explanation tooltips
   - Syntax error detection
   - Code suggestions

4. **Collaboration Features**
   - Shareable code snippets with syntax highlighting
   - Embedded code blocks for external sites
   - API for programmatic highlighting

## Resources and References

### Similar Projects
- [Prism.js](https://prismjs.com/) - Lightweight syntax highlighter
- [Highlight.js](https://highlightjs.org/) - Automatic language detection
- [Shiki](https://shiki.matsu.io/) - VS Code's syntax highlighter

### Documentation
- [Web Components Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [Shadow DOM Styling](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [Regular Expressions for Tokenization](https://eloquentjavascript.net/09_regexp.html)

## Timeline Estimate

- **Phase 1**: 8-12 hours
- **Phase 2**: 12-16 hours
- **Phase 3**: 16-20 hours
- **Phase 4**: 10-14 hours
- **Phase 5**: 8-12 hours
- **Phase 6**: 12-16 hours

**Total Estimate**: 66-90 hours (8-11 weeks at 8 hours/week)

## Next Steps

1. ✅ Review and approve this plan
2. ⏳ Create feature branch for Phase 1 work
3. ⏳ Implement Phase 1: Core Enhancement
4. ⏳ Test and iterate on Phase 1
5. ⏳ Proceed to Phase 2 based on results

## Questions for Stakeholders

1. Should we use an existing library (Prism.js/Highlight.js) or build custom?
2. Which languages are most important for Priority 1 implementation?
3. Are there specific code examples that must be supported well?
4. What is the acceptable bundle size increase for this feature?
5. Should we support code execution/preview or just highlighting?

---

**Status**: 📋 Planning Complete - Ready for Implementation
**Created**: 2025-10-24
**Last Updated**: 2025-10-24
**Owner**: Development Team
