# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-06

First public release on npm. Three packages are published together:

- [`graphojs`](https://www.npmjs.com/package/graphojs) — core library (Canvas 2D, GoJS-compatible API)
- [`@graphojs/react`](https://www.npmjs.com/package/@graphojs/react) — React wrapper
- [`@graphojs/vue`](https://www.npmjs.com/package/@graphojs/vue) — Vue 3 wrapper

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

#### React (`@graphojs/react`)

- `Diagram`, `Palette`, and `Overview` components that create the underlying
  widgets once and update reactively when props change.
- Props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`,
  `initDiagram`, `onDiagramInit`, `onModelChange`, `onDiagramEvent`,
  `onSelectionChanged`, `className`, `style`.

#### Vue (`@graphojs/vue`)

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

[0.1.0]: https://github.com/rroblf01/graphojs/releases/tag/v0.1.0
