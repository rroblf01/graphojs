# Roadmap to v1.0.0

**Status: shipped.** 1.0.0 was released on 2026-08-07 — see the
[CHANGELOG](./CHANGELOG.md#100---2026-08-07) for the full release notes.
This document is kept as the historical record of what led there; new work
after 1.0.0 belongs in issues/a new roadmap, not here.

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

- [x] The generated API reference didn't exist — `reference/api.md` was a
  36-line hand-written list covering a fraction of the 100+ real public
  exports across `graphojs`'s 5 subpaths. Replaced it with a real generated
  reference: `starlight-typedoc` + `typedoc` + `typedoc-plugin-markdown`
  now build `reference/api/` directly from source at `astro build` time
  (gitignored — regenerated every build, never committed), with one entry
  point per public subpath (`graphojs`, `graphojs/go` as `graphojs-go`,
  `graphojs/templates`, `graphojs/react`, `graphojs/vue`; tagged via
  `@module` JSDoc comments so the generated module names match the actual
  import paths). This now tracks every future export automatically instead
  of needing manual upkeep.
  - **Found and worked around a real gap in the toolchain**: naming the
    `go.ts` entry point `graphojs/go` (with a slash) made TypeDoc nest it as
    a *subdirectory* of the main `graphojs` module instead of a sibling —
    and since `go.ts` re-exports ~183 of the same classes `graphojs` already
    documents, those re-exports silently vanished from the docs entirely
    (typedoc-plugin-markdown doesn't render "Reference" reflections or emit
    a per-module overview page listing them). Verified via raw `typedoc
    --json` output (183 of 188 children were `Reference`-kind, not actually
    missing from TypeDoc's model — just dropped by the markdown renderer).
    Fixed by naming modules without shared `/`-prefixes (`graphojs-go`
    etc.) so each stays a top-level sibling, and added a note in
    `compatibility.md` explaining that `graphojs/go`'s reference page only
    shows what's *exclusive* to that subpath (e.g. `ModelTransactionCommand`)
    — the ~183 shared classes (`go.Diagram`, `go.Node`, ...) are the exact
    same declarations documented once under the main `graphojs` page.
    `graphojs/templates`, `/react`, `/vue` aren't affected — they only
    contain genuinely new declarations, nothing re-exported.
- [x] Deferred, deliberately: a troubleshooting/FAQ page. The ROADMAP's own
  framing is "collect real cases as they come up" — there isn't yet a real
  backlog of reported GoJS-migration friction beyond what's already in
  `compatibility.md`'s differences table, and fabricating hypothetical
  entries would be worse than not having the page. Revisit once real
  reports exist (e.g. from GitHub issues).
- [x] Fixed a concrete staleness/drift problem while auditing the "known
  differences" table: it was **duplicated** almost verbatim between
  `compatibility.md` and `guide/migration.md`, with the two copies already
  showing different (both stale) shape-figure counts — a live example of
  exactly the drift this checklist item warns about. `migration.md` now
  links to `compatibility.md`'s table instead of maintaining its own copy;
  the count itself is corrected to the real current number (75, via
  `ShapeTypes.ts`).

## Phase 5 — Accessibility, round 2

The first accessibility pass (ARIA roles, live region, keyboard focus cursor)
shipped in [Unreleased] of the CHANGELOG. For 1.0.0:

- [x] Fixed during the Phase 1 audit: the live-region announcements and
  `aria-label` were hardcoded in Spanish, inconsistent with the rest of the
  (English) public API — an English-speaking screen-reader user would have
  heard Spanish. Defaults are now English, with every string overridable
  per-part via `diagram.accessibilityMessages` /
  `DiagramOptions.accessibilityMessages` (see the Interaction guide).
- [x] Respect `prefers-reduced-motion` in `AnimationManager`. Added a real
  GoJS-compatible `AnimationManager.isEnabled` flag (GoJS has this too: when
  `false`, animations jump straight to their final values instead of
  tweening) and `Animation.finishImmediately()` to implement it. `Diagram`'s
  constructor now defaults `isEnabled` to `false` when
  `matchMedia('(prefers-reduced-motion: reduce)').matches` — an explicit
  assignment afterward always overrides that default. Guarded behind
  `typeof window.matchMedia === 'function'` since jsdom (used by the whole
  test suite) doesn't implement `matchMedia` at all; added a default
  polyfill to `vitest.setup.ts` so this stays testable.
- [x] Added high-contrast-friendly focus/selection styling. Selection
  outlines, resize handles, the rubber-band select rectangle, and the
  keyboard focus cursor were all fixed hex colors (`#2196f3`, `#6200ea`)
  scattered across `Canvas2DRenderer.ts` and `Diagram.ts`. Centralized them
  into `render/SelectionStyle.ts` (`SelectionStyle` interface,
  `defaultSelectionStyle`, `highContrastSelectionStyle`), wired through a
  new `Diagram.selectionStyle` getter/setter (propagates to the renderer)
  and `DiagramOptions.selectionStyle`. Defaults to the high-contrast palette
  when `prefers-contrast: more` or `forced-colors: active` matches — same
  override-always-wins pattern as `prefers-reduced-motion` above. Chose 3
  colors that stay distinguishable from each other under high contrast
  (black selection, red focus, yellow handles), not just from the
  background.
- [x] Announce more than selection changes via the live region. Added
  `partAdded`/`partsDeleted`/`undoPerformed`/`redoPerformed`/
  `treeCollapsed`/`treeExpanded` to `AccessibilityMessages` (matching the
  `@experimental` note already on that interface anticipating this), and
  made `Diagram.announce()` public so `CommandHandler`/tools can use it.
  Wired into `Diagram.undo()`/`redo()` (naming the affected command via the
  existing `UndoManager.getUndoDescription()`/`getRedoDescription()`),
  `CommandHandler.deleteSelection()`, `Diagram.collapseTree()`/
  `expandTree()`, and `ClickCreatingTool`. **Deliberately did not** hook the
  generic `PartAdded`/`PartRemoved` diagram events directly — those also
  fire once per node during a full bulk `diagram.model = ...` load (e.g.
  1,000 times for 1,000 nodes), which would spam a screen reader on every
  page load. Hooked the specific user-initiated-single-action call sites
  instead.

## Phase 6 — Cross-browser and real-device validation

- [x] e2e ran only against Firefox. Decision (per project owner): local dev
  stays Firefox-only (fast, matches daily workflow); CI additionally runs
  Chromium and WebKit. `playwright.config.ts` now adds those two projects
  only when `process.env.CI` is set — `pnpm test:e2e` locally is unchanged
  (10 tests, Firefox), CI runs 26 (Firefox's 10 + Chromium's 8 + WebKit's 8).
  Both new projects skip `visual.spec.ts`: its snapshots were captured
  against Firefox's renderer, and per-engine font/anti-aliasing differences
  would need their own baselines — visual regression stays deliberately
  single-browser rather than becoming a 3-way baseline-maintenance burden.
  `ci.yml`'s `e2e` job now installs all three browsers
  (`playwright install --with-deps firefox chromium webkit`).
  - Verified for real, not just config plumbing: installed Chromium locally
    (no `--with-deps`, since this sandbox has no root) and ran the full
    8-test cross-browser subset against it — all 8 passed. WebKit couldn't
    be verified locally (`playwright install webkit` needs `libicu74`/
    `libxml2`/`libflite1` via `apt`, requiring root this sandbox doesn't
    have) — CI's `ubuntu-latest` runner has root and `--with-deps`, so this
    is a local-sandbox limitation, not a config gap.
- [ ] **Not done — needs the project owner, not something automatable from
  here.** Manually verify touch interaction on at least one real iOS and one
  real Android device. Playwright's touch emulation (already exercised by
  `e2e/interaction.spec.ts` and the pinch-zoom fix earlier this session) is
  not a substitute for a real touchscreen — flag this explicitly rather than
  mark it done by proxy.

## Phase 7 — Ecosystem decisions

- [x] Decided (per project owner): Svelte/Angular wrappers are explicitly
  **out of scope for 1.0.0** — not an oversight, a deliberate deferral.
  Documented in the React/Vue guide (`guide/react-vue.mdx`) so it reads as
  a decision, not a gap someone needs to file an issue about.
- [x] Attempted the full fix (per project owner) for the broken tree-shaking
  found while checking this item. Real, measured improvement shipped, plus
  an honest account of the fundamental limit that remains:
  - **Fixed**: `tsup.config.ts` now ships each entry point unbundled
    (`bundle: false`, `entry: ['src/**/*.{ts,tsx}']`) instead of one
    pre-flattened, pre-minified file per subpath — the published `dist/`
    now mirrors `src/`'s ~150-file module graph, giving a downstream
    bundler something real to shake. This surfaced a real gap in tsup's
    unbundled mode: it doesn't rewrite `.ts`/`.tsx` import specifiers to
    the actual output extension, so `dist/index.js` literally contained
    `from './diagram/Diagram.ts'` — broken at runtime in every environment
    (Node, browsers) that doesn't have a `.ts` loader. Added
    `scripts/fix-dist-extensions.mjs` (runs after `tsup`, before the `.d.ts`
    step) to rewrite these to `.js` in ESM output and `.cjs` in CJS output;
    verified by actually executing the built output (`node --input-type
    =module -e "import ... from './dist/index.js'"` and the CJS
    equivalent), not just building without errors. `package.json`'s
    `./react`/`./vue` export paths updated to match the now-nested
    `dist/react/index.js` / `dist/vue/index.js` (their `types` entries were
    already nested; only `import`/`require` needed the fix).
    `e2e/build-fixtures.mjs` had the same stale flattened paths hardcoded
    — fixed, and the full e2e suite (Firefox + Chromium) re-verified
    against the new dist layout.
  - **Fixed**: `"sideEffects": false` replaced with an explicit array
    listing exactly the 3 files with real module-scope side effects
    (`export/Overview.{js,cjs}`, `export/Palette.{js,cjs}`,
    `diagram/Diagram.{js,cjs}` — each calls `registerDomComponent(...)`
    unconditionally). Previously this was an incorrect blanket claim that
    could have let a bundler silently drop one of these registrations.
  - **Also verified**: the generated `.d.ts` files reference `.ts`
    extensions too (e.g. `from './diagram/Diagram.ts'`), which looked like
    the same bug at first — but this is TypeScript's own documented
    declaration-resolution behavior, not a defect. Confirmed a real
    consumer's `tsc` resolves it correctly under both `moduleResolution:
    "bundler"` and the much stricter `"nodenext"` (tested against the
    actual built `.d.ts` output via a `node_modules` symlink, not a
    theoretical check) — left `.d.ts` untouched.
  - **Measured improvement**: importing only `Diagram` now costs ~63.9 KB
    gzip, down from ~76.5 KB before (a real ~16% cut for that common case)
    — out of a ~78 KB gzip full-bundle baseline.
  - **The remaining gap is real and not fixable by more build-config
    tuning.** Importing only `Point` — a leaf class with zero internal
    imports, confirmed to tree-shake to 682 B gzip in complete isolation
    (bypassing the package's `exports` map entirely to import its compiled
    file directly) — still costs ~63.9 KB through the package's public
    `graphojs` entry point, i.e. no better than importing `Diagram`.
    Root cause: `index.ts` re-exports ~150 names from one barrel file, and
    esbuild (confirmed the same limitation holds for the class of bundlers
    it represents) cannot cleanly shake through a re-export barrel that
    large to prove entire sibling modules are unreachable — a documented,
    known bundler limitation with large barrel files, not something
    `sideEffects`/`splitting`/`minify` tuning resolves. A full fix would
    mean exposing many fine-grained subpath exports (e.g. `graphojs/Point`,
    `graphojs/Diagram`, one per class) instead of one broad barrel — a
    breaking change to the public API shape, out of scope here. Since GoJS
    has the same one-big-bundle limitation, the "~74 KB gzip, smaller than
    GoJS" comparison in the CHANGELOG/README remains valid — it's a
    full-bundle-to-full-bundle comparison either way, which is what most
    real consumers (using most of the API surface) actually experience.

## Late finding — group templates weren't rendered at all

Found while visually reviewing the docs examples for crowding/color issues
(not originally a checklist item), and fixed before cutting 1.0.0 per an
explicit project-owner decision to not ship a stable-API release with a
known break in a standard GoJS feature:

- **The bug**: `Canvas2DRenderer.renderGroup()` only ever drew a flat,
  default-colored rectangle from `group.fill`/`stroke` — it never looked at
  `group.panel` at all. Every `groupTemplate` (custom `Shape` figure, header
  `TextBlock`, any nested content) was silently ignored for every group in
  every diagram. `renderNode()` already had the correct "draw the template
  panel if one exists, else fall back to a flat shape" pattern; `renderGroup`
  just never got the equivalent.
- **The fix**: `renderGroup()` now mirrors `renderNode()` — draws
  `group.panel` (sized to the group's auto-fit-to-members bounds) when
  present, falling back to the flat rect only when no `groupTemplate` is set.
- **A second bug found while verifying the fix**: with the panel now
  actually drawing, a `groupTemplate` using `'Auto'` (background `Shape` +
  header `TextBlock`, the same idiom node templates use everywhere) rendered
  the header dead-centered — overlapping the members it should sit above.
  `Panel`'s `'Auto'` layout centered every non-background element
  unconditionally; it now respects an explicit `alignment` spot (e.g.
  `Spot.Top`) the same way `'Spot'`/`'Table'` cells already did, falling
  back to centered when unset (no behavior change for existing templates
  that never set `alignment`).
- Both fixes have regression tests (`Canvas2DRenderer.test.ts`,
  `Panel.test.ts`) — this whole area had zero coverage before, which is
  exactly how it went unnoticed.

## Signal to actually cut 1.0.0

Beyond the checklist above, the strongest signal that GraphoJS is ready for
1.0.0 is **real usage**: at least one non-trivial application (ideally
external, not just this project's own docs site) built on top of it, with any
friction points folded back into the phases above before the API is frozen.

**This signal was not met before shipping 1.0.0** — no external application
had adopted GraphoJS as of this release. Per an explicit project-owner
decision, 1.0.0 shipped anyway once every other checklist item (including
the late group-template finding above) was resolved or consciously deferred
with reasoning. Real-usage friction, if and when it surfaces, becomes 1.0.x
patch releases or documented known-differences, not a reason 1.0.0 itself
was premature.

---

Contributions welcome on any of the above — open an issue to discuss scope
before starting on a phase, since some of these (especially Phase 1 and
Phase 6) affect what counts as a breaking change going forward.
