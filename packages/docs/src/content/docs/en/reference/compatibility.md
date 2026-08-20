---
title: Compatibility
description: GraphoJS's compatibility surface with GoJS.
---

GraphoJS implements GoJS's compatibility surface. Below is a
summary of what's supported. For the full detail of every class,
method, and property, see the [API reference](/reference/api/), generated
directly from the source code. It covers all 5 public subpaths
(`graphojs`, `graphojs/go`, `graphojs/templates`, `graphojs/react`,
`graphojs/vue`) — note that `graphojs/go` re-exports the same classes as
`graphojs` under the `go.*` namespace (nothing is exclusive to `graphojs/go`
today), so its reference page will look sparse; for the actual classes
(`go.Diagram`, `go.Node`, ...) see the `graphojs` page directly.

## Implemented surface

- `go.*` namespace (`import * as go from 'graphojs/go'`)
- `go.GraphObject.make` declarative construction
- `go.Node` / `go.Link` / `go.Group` / `go.Panel` / `go.Shape` / `go.TextBlock` templates
- `go.Binding` with converters, TwoWay, and dot-paths
- `nodeTemplate` / `linkTemplate` / `groupTemplate` / `nodeTemplateMap` / `linkTemplateMap` / `groupTemplateMap`
- `diagram.model` and transactions (`startTransaction`/`commitTransaction`)
- `model.nodeDataArray` / `linkDataArray`
- Diagram flags: `isReadOnly`, `isEnabled`, `allowMove`, `allowCopy`, `allowDelete`,
  `allowZoom`, `allowTextEdit`, `allowLink`, `allowRelink`
- Diagram events: `SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`, `PartResized`, ...
- `go.Palette` / `go.Overview` / `go.ContextMenu` / tooltips
- Undo/redo with transactions and commands
- Layouts: `Grid`, `Tree`, `Circular`, `ForceDirected`, `LayeredDigraph`, `Spot`
- Model: `mergeChanges`, incremental JSON, validation
- Export: PNG (`makeImage`), SVG (`makeSvg`), print
- Graph navigation: `findLinksInto/OutOf`, `findNodesInto/OutOf`, tree helpers
- `GuidedDraggingTool`-style alignment guides while dragging:
  `draggingTool.isGuidedDraggingEnabled` / `guidelineSnapDistance`
- `diagram.print()` prints as vector SVG by default (vector PDF when
  "saving as PDF"); `format: 'png'` for the classic rasterized PNG
- GraphML import/export (with no direct equivalent in GoJS):
  `go.Serializer.serializeToGraphML` / `deserializeFromGraphML`
- Server-side rendering with an optional Node canvas (`renderDiagramToCanvas`),
  with no equivalent in GoJS (DOM/browser only)
- Canvas accessibility (ARIA, `aria-live` region, keyboard focus
  cursor) — with no equivalent in GoJS

## GoJS-style extensions (outside `go.*`)

**Design decision, valid for 1.0.0 and onward**: just as in real
GoJS (where they live in the separate `gojs/extensions` package, not in the
core), these widgets/tools are imported from `graphojs` directly — **not**
from `graphojs/go` — and this will remain the case permanently. This isn't an
oversight or something pending "promotion" to `go.*`; it is the correct
GoJS-compatible surface:

- `TreeExpanderButton` / `PanelExpanderButton` — collapse/expand buttons
  for node templates (see [Trees](/en/guide/tree/) and
  [Templates](/en/guide/templates/)).
- `LinkLabelDraggingTool` — drags a link's label
  (`link.labelSegmentIndex` / `labelSegmentFraction` / `labelOffset`).

If GraphoJS adds more utilities of this kind in the future
(panels inspired by other GoJS extensions), the same rule applies: they are
exposed from `graphojs`, and `go.*` remains a faithful mirror of GoJS's
actual core.

## Experimental surface

Most of what's listed above is considered stable as of 1.0.0. These
pieces are more recent, have no real precedent in GoJS to copy, and their
exact shape (options, defaults, even names) may keep
changing before 1.0.0 — they won't be removed without a deprecation cycle, but
there's also no guarantee of full stability yet. They are marked with
`@experimental` in their JSDoc:

- `renderDiagramToCanvas` / `measureDiagramContent` (server-side rendering)
  — still needs validation from real-world use beyond this repo's tests.
- `Serializer.serializeToGraphML` / `deserializeFromGraphML` /
  `exportToGraphMLFile` / `importFromGraphMLFile` — GraphoJS's own
  interchange format (GraphML has no equivalent in the GoJS API); the
  type/coercion heuristics for numeric keys could be refined further.
- `AccessibilityMessages` / `diagram.accessibilityMessages` — already covers
  selection/focus, undo/redo, add/delete, and tree collapse/expand;
  it may keep growing before 1.0.0, but changes will be additive,
  not breaking.
- `Diagram.selectionStyle` / `DiagramOptions.selectionStyle` — selection/focus
  colors, with automatic detection of `prefers-contrast: more` /
  `forced-colors: active`; the exact shape may be refined before
  1.0.0.

## Known differences

| GoJS | GraphoJS |
|------|----------|
| Hundreds of Shape figures | 77 common figures + flowchart/BPMN/UML symbols |
| Full `Shape.geometryString` | Supports M/L/H/V/C/S/Q/T/A/Z |
| Licensed (proprietary) | MIT |
| `Part` IS a `GraphObject` | `Part` has a `panel` (visual tree) |
| Palette templates in `go.*` | In the lazy subpath `graphojs/templates` |

## Migration

See [Migration](/en/guide/migration/) for the step-by-step guide from `gojs` → `graphojs`.
