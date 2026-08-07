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

- [x] Benchmarked beyond the previous ceiling. `packages/core/test/benchmark.test.ts`
  now includes informational (generous-threshold) tests at 50,000 nodes for
  model sync (~3.8s), `ForceDirectedLayout` (~1.7s for 10 iterations), and a
  regression test proving repeated static renders don't re-rebuild the
  virtualization index (see below). `e2e/perf.spec.ts`'s 5,000-node
  real-browser benchmark is unchanged and still the headline number for
  interactive use.
- [x] `ForceDirectedLayout` was O(n²) per iteration — actually **two**
  separate O(n²) loops, not one: the repulsion pass (genuinely all-pairs)
  and, less obviously, the attraction pass (which scanned every node pair
  just to find the linked ones via a `Set` lookup, instead of iterating the
  `links` array it already had). Fixed both:
  - Repulsion is now approximated with a `BarnesHutTree` quadtree
    (`layout/BarnesHutTree.ts`, standard Barnes-Hut, same technique
    D3-force uses) — O(n log n) per iteration, tunable via the new
    `theta` option. Verified against an exact O(n²) reference in
    `test/layout/BarnesHutTree.test.ts` (theta=0 matches closely; theta=0.9
    stays within ~15% for a realistic distant-cluster case) and confirmed
    sub-quadratic scaling empirically.
  - Attraction now iterates `links` directly (O(E)) instead of scanning
    every node pair (O(V²)) — mathematically identical result (each link
    still pulls both endpoints together by the same amount), just without
    the wasted non-matching comparisons.
  - Net effect, measured: **400 nodes, 3223ms → 79ms** (~40x). What used to
    be infeasible above a few hundred nodes now handles 5,000 nodes in
    ~1.3s and 50,000 in ~1.7s (10 iterations, no links).
- [x] Revisited virtualization and evaluated occlusion culling vs. LOD:
  - **Found and fixed a real inefficiency**: the viewport-culling spatial
    index was rebuilt from scratch on *every* `render()` call, even when
    nothing had moved since the last frame (e.g. a plain pan/zoom). It now
    shares the same "did anything change" signal already used for the
    hit-test index (`markHitIndexDirty`) and only rebuilds when parts
    actually changed. ~2x improvement measured on repeated static renders
    at 20,000 nodes (14.5ms → 7.5ms average).
  - **Evaluated occlusion culling — decided against it.** Occlusion culling
    (skipping parts fully covered by opaque parts in front of them) pays
    off for scenes with large, densely-stacked opaque elements (3D scenes,
    deeply nested opaque UI). Node-link diagrams don't fit that pattern:
    layouts are generally designed to *avoid* full overlap, and even when
    nodes do overlap (e.g. mid-drag), it's rarely deep full-containment
    stacking. The bookkeeping cost of correct depth-sorted occlusion
    detection would likely exceed what it saves for this workload — the
    existing viewport culling already bounds the working set to what's on
    screen, which is where the real win is. Revisit only if a real,
    measured use case (not a hypothetical one) shows otherwise.
  - Label-hiding LOD already existed (`Diagram.enableLOD`) and remains
    sufficient for the "many tiny nodes at low zoom" case; no evidence of a
    shape-rendering (as opposed to label) bottleneck was found to justify
    extending LOD further right now — see Phase 2 follow-up below if that
    changes.

**Not done, deliberately deferred** (no measured problem found to justify the complexity):
- Simplifying shape rendering (skip shadows/gradients, or draw a plain
  rect) for nodes below some on-screen pixel size at extreme zoom-out.
  Current render times at scale (see benchmarks above) don't show this as
  a bottleneck yet; revisit if a real dense-diagram use case does.

## Phase 3 — Test quality and coverage floor

- [x] Raised coverage on the weakest modules. `ZoomingTool`, `PanningTool`,
  and `ContextMenuTool` went from under 50% branch coverage to 97-100%
  (`test/tool/Tool.test.ts`); `Picture.ts` went from 0% to fully covered
  (`test/panel/Picture.test.ts`). Along the way found and fixed a real bug:
  `PanningTool` never actually read `Diagram.allowHorizontalScroll` /
  `allowVerticalScroll` — both flags existed and had getters/setters, but
  nothing gated panning on them, so setting either to `false` did nothing.
  `PanningTool.doMouseMove` now respects both axes independently.
- [x] Added `coverage.thresholds` to `vitest.config.ts`
  (`statements: 74, branches: 58, functions: 76, lines: 76`, set with
  margin below the current ~77-78/63/80/80% so normal run-to-run variance
  doesn't flake CI) — regressions now fail the `test:coverage` CI job
  instead of just showing up in a report nobody reads.
- [x] Found and fixed a real, intermittent test-suite reliability bug
  uncovered while verifying the new thresholds: `vitest run` would exit
  with code 1 on roughly 3 of every 5 runs (all 1124 tests reporting
  "passed", but with unhandled `ReferenceError: requestAnimationFrame is
  not defined` errors) — a problem for `test:coverage` running in CI, since
  a non-zero exit fails the job regardless of the printed pass count. Root
  causes, all in test code/widgets rather than the render loop itself:
  - `Palette` and `Overview` each create their **own internal `Diagram`**
    (with its own render loop) when constructed without one — GoJS-
    compatible behavior — but neither ever destroyed it: `Palette` had no
    `destroy()` method at all, and `Overview.destroy()` cleaned up its own
    canvas/listeners but never called `this.diagram.destroy()`. Both now
    track whether they own their diagram and destroy it when they do;
    `go-migration.test.ts`'s untracked `new go.Palette(...)` /
    `new go.Overview(...)` instances are now destroyed too.
  - Several test files (`benchmark.test.ts`, `export/ServerRenderer.test.ts`,
    `serialization/GraphML.test.ts`, `go-compatibility.test.ts`) created
    `Diagram` instances and simply never destroyed them, leaking their
    `requestAnimationFrame`-scheduled render loops past the test file's own
    lifetime. Fixed by destroying every diagram at the end of its test (or,
    where a shared `createDiagram()` helper is used, via a tracked array +
    `afterEach`, matching the pattern already used elsewhere in the suite).
  - Verified via 6 consecutive full-suite runs (plain and with `--coverage`)
    all exiting 0 with zero unhandled errors, after previously failing on
    ~60% of runs.
- [x] Added visual regression tests (Playwright screenshot comparisons) for
  `Shape` figures and layouts — see `e2e/visual.spec.ts`.

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
