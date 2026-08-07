# Roadmap to v1.0.0

GraphoJS has reached feature parity with the core GoJS programming model
(templates, bindings, tools, layouts, undo/redo, groups, export, and a growing
set of extension-style widgets). This document tracks what's left before
committing to a **1.0.0** release — the point at which the public API is
considered stable and safe to build on long-term.

Versions before 1.0.0 may still introduce breaking changes to the public API
between minor releases, per [semver](https://semver.org/#spec-item-4).

## What "1.0.0" means for this project

- The `graphojs` and `graphojs/go` public API surface is frozen: breaking
  changes after 1.0.0 require a major version bump.
- The project has been validated by at least one real, non-trivial
  application beyond its own docs/examples.
- Test coverage has a floor enforced in CI, not just a report.

## Phase 1 — API stability

- [x] Audited the public surface and marked what isn't ready to promise
  stability for: `renderDiagramToCanvas`/`measureDiagramContent`, the
  GraphML Serializer functions, and `AccessibilityMessages` are now tagged
  `@experimental` in their JSDoc (visible as IDE tooltips) and listed in a
  new "Superficie experimental" section in `compatibility.md`.
- [x] Audit every `as any` / `as unknown as X` cast in `src/` (51 found, 0
  bare `any`). Fixed what was actually unnecessary or unsafe, and along the
  way found two real bugs hiding behind loose casts:
  - `Layout.doLayout()` (called with no explicit collection) always
    operated on empty arrays — `Layout` never actually held a reference to
    its `Diagram`, only a cast-based duck-type probe that could never
    succeed. `Layout.diagram` is now a real field, wired up by
    `Diagram.layout = ...`, plus a new `Diagram.allNodes` getter
    (mirroring the existing `allLinks`) so `doLayout()` has something to
    read.
  - `Diagram.selectPartsInRect(rect, partialInclusion=false)` crashed with
    `r.containsRect is not a function` whenever called with a plain
    `{x,y,width,height}` literal — which is exactly what
    `DragSelectingTool` always passes. The cast pretended a plain object
    literal was a real `Rect` instance; now a real `Rect` is constructed
    instead of cast.
  - Removed genuinely dead code in `ContextMenuTool` (it isn't wired into
    any ToolManager event list today, so `doMouseUp`'s delegate-through-a-
    private-method cast could never run) and simplified unnecessary casts
    in `CommandHandler`/`Model`/`ModelTransactionCommand` where the real
    type already exposed what was needed.
  - Consolidated the duplicated `LinkCapableModel` (`model/Model.ts`) /
    `LinkOps` (`undo/ModelTransactionCommand.ts`) structural types into one.
  - **Left as-is, deliberately**: `Binding.ts`'s `BindingTarget = Part |
    GraphObject` duck-typing (avoids a real circular value-import between
    `Binding.ts` and `GraphObject.ts`), the dynamic template-property-bag
    assignment pattern in `Diagram.applyTemplateProperties`/
    `GraphObject.make`, and the Vue prop-typing casts — these are
    genuinely hard to avoid given what they do, not just untidy.
  - **Lesson learned the hard way**: an early pass "simplified" the
    `_model as unknown as {...}` capability probes in `Diagram.ts` by
    calling `getLinkDataArray()`/`getLinkKey()` directly, reasoning that
    `_model` is typed as `GraphLinksModel`. The test suite caught this
    immediately — GoJS-compatible code can (and does, in
    `go-migration.test.ts`) assign a `TreeModel` via
    `diagram.model = treeModel as unknown as GraphLinksModel`, mirroring
    real GoJS's polymorphic `Diagram.model`. The capability check was
    restored, now using the shared `LinkCapableModel` type instead of an
    ad hoc one. A reminder that "the type says X" and "X is true at
    runtime" are different claims when the codebase itself contains
    sanctioned escape hatches.
- [x] Decided the final shape of anything marked "extension-style, not in
  `go.*`" (`TreeExpanderButton`, `PanelExpanderButton`,
  `LinkLabelDraggingTool`): they stay out of `go.*` permanently, matching
  real GoJS's own separate extensions module. Documented as a standing
  design decision (not a pending "to promote later" item) in
  `compatibility.md`'s new "Extensiones estilo GoJS" section.

## Phase 2 — Performance at scale

- [ ] Benchmark beyond the current ceiling (~5,000 nodes/links in a real
  browser, ~2,000 in jsdom — see `e2e/perf.spec.ts` and
  `packages/core/test/benchmark.test.ts`) up to 50,000–100,000 parts.
- [ ] `ForceDirectedLayout` is O(n²) per iteration; add a Barnes-Hut or
  quadtree-based approximation before recommending it for large graphs.
- [ ] Revisit virtualization: current culling is viewport-based (see
  `VirtualizationManager`); evaluate whether occlusion culling or level-of-detail
  rendering is needed for dense diagrams.

## Phase 3 — Test quality and coverage floor

- [ ] Raise coverage on the weakest modules (`ZoomingTool`, `PanningTool`,
  `ContextMenuTool` are all under 50% branch coverage as of this writing —
  run `pnpm test:coverage` for current numbers).
- [ ] Add `coverage.thresholds` to `vitest.config.ts` so CI fails on
  regressions, not just reports a number.
- [ ] Add visual regression tests (Playwright screenshot comparisons) for
  `Shape` figures and layouts — today everything is verified numerically
  (bounds, positions) but never against the actual rendered pixels.

## Phase 4 — Documentation completeness

- [ ] Confirm the generated API reference (`reference/api` in the docs site)
  covers 100% of the public exports, not just what's been hand-documented in
  guides.
- [ ] Add a troubleshooting/FAQ page collecting real "this worked one way in
  GoJS, here it's different" cases as they come up.
- [ ] Keep `compatibility.md`'s "known differences" table current — it should
  always reflect the actual gap, not a historical snapshot.

## Phase 5 — Accessibility, round 2

The first accessibility pass (ARIA roles, live region, keyboard focus cursor)
shipped in [Unreleased] of the CHANGELOG. For 1.0.0:

- [x] Fixed during the Phase 1 audit: the live-region announcements and
  `aria-label` were hardcoded in Spanish, inconsistent with the rest of the
  (English) public API — an English-speaking screen-reader user would have
  heard Spanish. Defaults are now English, with every string overridable
  per-part via `diagram.accessibilityMessages` /
  `DiagramOptions.accessibilityMessages` (see the Interaction guide).
- [ ] Respect `prefers-reduced-motion` in `AnimationManager`.
- [ ] Add high-contrast-friendly focus/selection styling (current colors are
  fixed hex values, not theme-aware).
- [ ] Announce more than selection changes via the live region: undo/redo,
  add/delete, and collapse/expand at minimum.

## Phase 6 — Cross-browser and real-device validation

- [ ] e2e currently runs only against Firefox (see `playwright.config.ts`).
  Add Chromium and WebKit projects before 1.0.0 — Safari/iOS in particular,
  since touch/pinch-zoom bugs (like the pinch-centering bug fixed this
  session) tend to surface there first.
- [ ] Manually verify touch interaction on at least one real iOS and one real
  Android device, not just Playwright's touch emulation.

## Phase 7 — Ecosystem decisions

- [ ] Decide whether Svelte/Angular wrappers are in scope for 1.0.0 or
  explicitly out of scope (React and Vue wrappers already ship as
  `graphojs/react` / `graphojs/vue`).
- [ ] Revisit bundle size (~74 KB gzip as of this writing) after all the
  above — confirm tree-shaking still works for consumers who only import a
  subset of the API.

## Signal to actually cut 1.0.0

Beyond the checklist above, the strongest signal that GraphoJS is ready for
1.0.0 is **real usage**: at least one non-trivial application (ideally
external, not just this project's own docs site) built on top of it, with any
friction points folded back into the phases above before the API is frozen.

---

Contributions welcome on any of the above — open an issue to discuss scope
before starting on a phase, since some of these (especially Phase 1 and
Phase 6) affect what counts as a breaking change going forward.
