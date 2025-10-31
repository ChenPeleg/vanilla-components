# Task 08: Refactor how to use and examples

## Objective

The `how-to-use` and `examples` sections are very similar. The need to be refactored and reuse the same components.
so there will be minimal repetition.

## Plan

- Identify duplication in `src/example-site/pages/how-to-use-page.ts` and `src/example-site/pages/examples-page.ts` (buildDocUnit + page scaffolding).
- Create molecule `documentation-renderer.ts` to render an array of `DocumentationType` via a single `buildDocUnit()` switch.
- Create organism `docs-page-layout.ts` providing the shared layout (role="main", responsive container); accepts attributes: `title`, `intro`, and `bg` (Tailwind classes).
- Update pages to use shared components:
  - `how-to-use-page.ts`: `<docs-page-layout title="How to use" bg="bg-amber-200">` + `<documentation-renderer .docs="documentation"></documentation-renderer>`.
  - `examples-page.ts`: `<docs-page-layout title="Practical Examples" bg="bg-fuchsia-100" intro="Explore real-world examples...">` + `<documentation-renderer .docs="examples"></documentation-renderer>`.
  - Remove local `buildDocUnit()` and duplicate markup from both pages.
- Keep routes and element names the same; only swap internal implementation to shared components.
- Accessibility: ensure role="main", correct heading levels (`header-1` for page title, `header-2` for sections), and meaningful `aria-label` where appropriate.
- Conventions: extend `BaseElement`, call `super.connectedCallback()` first, use `.ts` in imports, and shadow queries via `this.$<T>()`.
- File placement: put `documentation-renderer.ts` under `src/example-site/components/molecules/` and `docs-page-layout.ts` under `src/example-site/components/organism/`.
- Do not edit `src/_core/imported-components.ts`; rely on auto-registration (run startup script when needed).
- Testing:
  - Add Playwright tests asserting titles render, docs list renders all `DocumentationKind` variants (header, gist, code, html, highlightedCode, text).
  - Verify both pages render same structure except for title/intro/background.
- Success criteria:
  - Duplicate code removed; single source for doc unit rendering and page layout.
  - Strict TypeScript passes; lint/build succeed; existing routes unchanged.
  - Playwright tests pass; visual parity maintained across pages.
