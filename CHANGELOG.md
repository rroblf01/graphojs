# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `groupTemplateMap` / `addGroupTemplate` / `removeGroupTemplate` — category
  templates for groups, matching `nodeTemplateMap`/`linkTemplateMap`.
- 10 new `Shape` figures for BPMN/UML/flowchart diagrams: `component`,
  `gatewayExclusive`, `gatewayParallel`, `callout`, `bracket`, `flag`,
  `chevron`, `tape`, `shield`, `bolt`.
- Full SVG path mini-language support in `geometryString` (M/L/H/V/C/S/Q/T/A/Z,
  absolute/relative variants, implicit command repetition).
- `TreeExpanderButton` / `PanelExpanderButton` extension-style widgets;
  `Diagram.collapseTree`/`expandTree`, `Part.isTreeExpanded`, and the
  `TreeCollapsed`/`TreeExpanded` events now actually fire.
- Guided dragging (alignment snapping): `draggingTool.isGuidedDraggingEnabled`
  / `guidelineSnapDistance`, with alignment-guideline rendering
  (`Diagram.showAlignmentGuidelines`/`hideAlignmentGuidelines`).
- `LinkLabelDraggingTool` for repositioning a link's label by dragging it;
  `Link.labelSegmentFraction`, `Link.getLabelBounds()`,
  `SetLinkLabelPositionCommand`.
- `LayeredDigraphLayout` crossing reduction upgraded to a weighted-median
  heuristic with alternating down/up sweeps plus a transpose pass
  (Sugiyama-style), replacing a single-pass barycenter.
- 3 full sample guides with playgrounds: org chart, flowchart with swimlanes,
  and a Gantt chart.
- `diagram.print()` now embeds vector SVG by default
  (`format: 'svg' | 'png'`) — "Save as PDF" from the browser's print dialog
  now produces a real vector PDF instead of an embedded raster image.
- GraphML import/export: `Serializer.serializeToGraphML` /
  `deserializeFromGraphML` / `exportToGraphMLFile` / `importFromGraphMLFile`.
- Server-side rendering helper `renderDiagramToCanvas` / `measureDiagramContent`
  — render a diagram into any Node canvas package (`node-canvas`,
  `@napi-rs/canvas`, `skia-canvas`) without depending on any of them.
- Accessibility pass: the canvas is keyboard-focusable
  (`role="application"`, `aria-roledescription`), an `aria-live` region
  announces selection/focus changes, and Arrow keys move a keyboard focus
  cursor between parts when nothing is selected (Enter/Space selects,
  Escape clears). Announcement text is in English by default and fully
  overridable via `diagram.accessibilityMessages` /
  `DiagramOptions.accessibilityMessages` for localization.
- `vitest --coverage` script wired into CI (`pnpm test:coverage`, uploaded as
  a build artifact).
- `ForceDirectedLayout.theta` — tunes the new Barnes-Hut repulsion
  approximation's accuracy/speed trade-off (see Performance below).
- A real, generated API reference (`/reference/api/` on the docs site),
  covering all 5 public subpaths (`graphojs`, `graphojs/go`,
  `graphojs/templates`, `graphojs/react`, `graphojs/vue`) directly from
  source via TypeDoc — replaces a hand-written page that covered only a
  fraction of the actual public exports.
- `AnimationManager.isEnabled` (GoJS-compatible) and
  `Animation.finishImmediately()` — animations jump straight to their final
  values instead of tweening. Defaults to `false` when the OS requests
  `prefers-reduced-motion: reduce`.
- `Diagram.selectionStyle` / `DiagramOptions.selectionStyle` — colors for
  selection highlights, resize handles, and the keyboard focus cursor.
  Defaults to a higher-contrast palette (`highContrastSelectionStyle`) when
  the OS requests `prefers-contrast: more` or `forced-colors: active`.
- The live region now also announces undo/redo, deletions, and tree
  collapse/expand — not just selection/focus changes. `diagram.announce()`
  is now public, for tools/integrations that want to announce their own
  actions.

### Fixed

- `Panel.clone()` didn't set `parentPanel` on cloned static child elements,
  so `GraphObject.part`/`.diagram` couldn't be resolved from a nested cloned
  object (e.g. a button's `click` handler inside a node template) — click
  handlers on nested template elements now work correctly.
- `GraphObject.margin` now accepts a plain number (GoJS shorthand for a
  uniform margin on all four sides) instead of silently being ignored.
- Node/group properties set directly on the model data (`label`, `fill`,
  `stroke`, `angle`, `zOrder`) weren't applied on the initial
  `diagram.model = ...` load or a full model resync — only on later
  incremental single-part updates. They're now applied consistently in both
  paths.
- Pinch-to-zoom on touch devices didn't anchor on the pinch midpoint — the
  offset update divided by the new scale instead of the old one, so
  pinching with the fingers held perfectly still left the viewport offset
  completely unchanged (visually anchoring the zoom at the canvas origin
  instead of under the fingers).
- `Layout.doLayout()` called with no explicit collection always operated on
  empty arrays — `Layout` had no real reference to its `Diagram`, only a
  cast-based probe that could never succeed. `Layout.diagram` is now wired
  up automatically by `Diagram.layout = ...`.
- `Diagram.selectPartsInRect(rect, partialInclusion=false)` threw
  `r.containsRect is not a function` when called with a plain
  `{x,y,width,height}` object — exactly what `DragSelectingTool` always
  passes when `isPartialInclusion` is set to `false`.
- `PanningTool` never actually read `Diagram.allowHorizontalScroll` /
  `allowVerticalScroll` — both flags existed but nothing gated panning on
  them, so setting either to `false` had no effect.
- `Palette` and `Overview` create their own internal `Diagram` (with its own
  render loop) when constructed without one, but never destroyed it:
  `Palette` had no `destroy()` method at all, and `Overview.destroy()`
  cleaned up its own canvas/listeners but never destroyed the diagram it
  owned. Both now track diagram ownership and destroy it when they own it,
  fixing a render-loop leak for any `Palette`/`Overview` created this way.
- `"sideEffects": false` in `package.json` was incorrect: `Overview`,
  `Palette`, and `Diagram` each register themselves with `GraphObject.make`
  at module scope, a real side effect. A bundler trusting the old blanket
  `false` could have silently dropped that registration. Replaced with an
  explicit array naming just those 3 files.

### Performance

- Minified core bundle ≈ 74 KB gzip (~297 KB raw) — grew from the additions
  above; still smaller than GoJS (~130 KB gzip).
- The package now ships unbundled (`tsup`'s `bundle: false`, mirroring
  `src/`'s module structure in `dist/` instead of one flattened file per
  subpath) so a consumer's own bundler has a real module graph to
  tree-shake against — importing only `Diagram` now costs ~63.9 KB gzip,
  down from ~76.5 KB (no better than importing everything) before this
  change. Full tree-shaking down to individual leaf classes is still
  blocked by the size of the `graphojs`/`graphojs/go` re-export barrels (a
  known bundler limitation, not fixable by more build config — see
  ROADMAP.md Phase 7); `graphojs/templates` isn't affected by this and
  tree-shakes cleanly (confirmed ~0.8 KB gzip for a single template
  helper).
- `ForceDirectedLayout`'s repulsion pass is now approximated with a
  Barnes-Hut quadtree (O(n log n) instead of O(n²) per iteration), and its
  attraction pass now iterates links directly instead of scanning every
  node pair — together, a ~40x speedup measured at 400 nodes (3223ms →
  79ms), and what used to be computationally infeasible at 5,000+ nodes now
  completes in ~1.3s.
- The virtualization (viewport-culling) spatial index was being rebuilt
  from scratch on every single render call, even when nothing had moved
  since the last frame. It's now only rebuilt when parts actually change —
  roughly a 2x improvement measured on repeated static renders of a
  20,000-node diagram (14.5ms → 7.5ms average).

## [0.2.0] - 2026-08-06

### Changed

- The React and Vue wrappers are now **subpaths of the `graphojs` package**
  instead of separate `@graphojs/react` / `@graphojs/vue` packages. Import them
  as `graphojs/react` and `graphojs/vue`. `react`, `react-dom`, and `vue` are
  optional peer dependencies — install them only if you use the corresponding
  subpath.
- Added `homepage` (https://graphojs.ricardorobles.es/) to the package.

## [0.1.0] - 2026-08-06

First public release on npm. The `graphojs` package ships the core library
plus optional wrapper subpaths:

- [`graphojs`](https://www.npmjs.com/package/graphojs) — core library (Canvas 2D, GoJS-compatible API)
- [`graphojs/react`](https://www.npmjs.com/package/graphojs) — React wrapper (optional peer dependency)
- [`graphojs/vue`](https://www.npmjs.com/package/graphojs) — Vue 3 wrapper (optional peer dependency)

### Added

#### Core (`graphojs`)

- Canvas 2D rendering engine with viewport culling, dirty-rect redraw, Path2D
  caching, and text-measure caching.
- Geometry primitives and data model: `Point`, `Rect`, `Size`, `Spot`, `Margin`,
  `GraphLinksModel`, `TreeModel`, key generation, model validation, and
  incremental model-to-part sync.
- GoJS-compatible declarative construction via `GraphObject.make`.
- Templates: `Node`, `Link`, `Group`, `Panel` (Auto/Table/Spot/Vertical/
  Horizontal/Viewbox), `Shape` (with figures), `TextBlock`, and `Binding`
  (converters, TwoWay, dot-path sources, `ofObject`).
- Interaction tools: pan, zoom, click/drag select, rubber-band selection, node
  dragging, linking (`LinkingTool`/`RelinkingTool`), resizing, rotating, text
  editing, grid snapping, arrow-key nudging, touch panning and pinch-to-zoom.
- Layouts: Grid, Tree, Circular, ForceDirected, LayeredDigraph, Spot.
- Diagram events (`SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`,
  `PartResized`, and more), `GraphObject` event handlers, and model-changed
  listeners.
- Undo/redo transaction system integrated across all tools.
- Export: `makeImage`, `makeImageData` (PNG), `makeSvg`, `print`.
- Serialization: `Serializer` with `serializeToString`/`deserializeFromString`/
  `exportToFile`/`importFromFile`.
- Widgets: `Palette` (native HTML5 drag & drop) and `Overview`.
- Context menus, tooltips, layers, ports/spots for edge connections, groups,
  virtualization and spatial indexing (QuadTree) for hit-testing.
- Lazy `graphojs/templates` subpath with predefined palette templates
  (`getAllTemplates`, `basicShapes`, `dataFlowShapes`, `flowchartShapes`).
- `graphojs/go` subpath exposing the full `go.*` namespace for drop-in
  GoJS compatibility.

#### React (`graphojs/react`)

- `Diagram`, `Palette`, and `Overview` components that create the underlying
  widgets once and update reactively when props change.
- Props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`,
  `initDiagram`, `onDiagramInit`, `onModelChange`, `onDiagramEvent`,
  `onSelectionChanged`, `className`, `style`.

#### Vue (`graphojs/vue`)

- `Diagram`, `Palette`, and `Overview` components (Vue 3.5+) with reactive
  prop watching and emitted events (`diagram-init`, `model-change`,
  `diagram-event`, `selection-changed`).
- Props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`,
  `initDiagram`, `onModelChange`, `onDiagramEvent`, `onSelectionChanged`,
  `className`, `style`.

#### Documentation & tooling

- Astro + Starlight documentation site with editable playgrounds covering all
  major features (getting started, interaction, layouts, groups, templates,
  export, drag & drop, react/vue, and more).
- Migration guide from GoJS, standalone flowchart demo, and production
  Dockerfile for the docs site.
- CI pipeline (lint, format, typecheck, build, unit tests, e2e) and a
  release workflow for npm publishing on version tags.

### Fixed

- Device pixel ratio re-read on resize.
- Link endpoints recomputed after layout changes; links re-routed around moved
  obstacles.
- Link/undo/key-collision bugs across the tool and model layer.
- Converter double-invocation, incremental binding, and array reassignment.
- React wrapper no longer double-subscribes `onModelChange`.
- Vue wrapper no longer double-fires callbacks (prop + emitted event).
- `GraphObject.make` typing so part constructors (`Node`, `Link`, `Group`)
  resolve to `Panel` templates for consumers.

### Performance

- Minified core bundle ≈ 67 KB gzip (~265 KB raw), with tree-shaking support.
- 5000-node + 5000-link graph in a real browser: model sync ~170 ms, first
  render ~35 ms, ~105 FPS during interaction.

[0.2.0]: https://github.com/rroblf01/graphojs/releases/tag/v0.2.0
[0.1.0]: https://github.com/rroblf01/graphojs/releases/tag/v0.1.0
