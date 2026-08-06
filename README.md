# GraphoJS

An open-source, MIT-licensed alternative to GoJS for building interactive diagrams and graphs in the web.

## Packages

| Package           | npm                                                                                                       | Description                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `graphojs`        | [![npm](https://img.shields.io/npm/v/graphojs.svg)](https://www.npmjs.com/package/graphojs)               | Core library (framework-agnostic, Canvas 2D) |
| `@graphojs/react` | [![npm](https://img.shields.io/npm/v/@graphojs/react.svg)](https://www.npmjs.com/package/@graphojs/react) | React wrapper                                |
| `@graphojs/vue`   | [![npm](https://img.shields.io/npm/v/@graphojs/vue.svg)](https://www.npmjs.com/package/@graphojs/vue)     | Vue wrapper                                  |

## Status

Published on npm. See the [Roadmap](#roadmap) for planned features.

## GoJS Compatibility

GraphoJS exposes a drop-in, GoJS-compatible API. Most GoJS code migrates by
changing only the import:

```diff
- import * as go from 'gojs';
+ import * as go from 'graphojs/go';
```

See [MIGRATION.md](./MIGRATION.md) for the complete migration guide, and
[examples/flowchart.html](./examples/flowchart.html) for a standalone demo.

The full GoJS programming model is supported:

```typescript
const $ = go.GraphObject.make;

const myDiagram = $(go.Diagram, "myDiagramDiv", {
  "undoManager.isEnabled": true,
});

myDiagram.nodeTemplate = $(
  go.Node,
  "Auto",
  $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" }),
  $(go.TextBlock, "Default Text", { margin: 12 }, new go.Binding("text", "name")),
);

myDiagram.linkTemplate = $(
  go.Link,
  { routing: go.Link.Orthogonal, corner: 5 },
  $(go.Shape, { strokeWidth: 3 }),
  $(go.Shape, "Arrow", { toArrow: go.Link.StandardArrowHead }),
);

myDiagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: "A", name: "Alpha", x: 0, y: 0, width: 100, height: 50 },
    { key: "B", name: "Beta", x: 200, y: 0, width: 100, height: 50 },
  ],
  linkDataArray: [{ from: "A", to: "B" }],
});

myDiagram.addDiagramListener("SelectionChanged", (e) => {
  console.log("Selected:", e.subject);
});

myDiagram.commit((d) => {
  d.model.setDataProperty(d.model.nodeDataArray[0], "name", "Alpha Updated");
}, "update name");
```

### Implemented compatibility surface

- `go.*` namespace (`import * as go from 'graphojs/go'`)
- `go.GraphObject.make` declarative construction
- `go.Node` / `go.Link` / `go.Group` / `go.Panel` / `go.Shape` / `go.TextBlock` templates
- `go.Binding` at the Part and element level (with converters, TwoWay, dot-path sources)
- `nodeTemplate` / `linkTemplate` / `groupTemplate` / `nodeTemplateMap` / `linkTemplateMap`
- `go.Link.Orthogonal`, `go.Shape.RoundedRectangle`, `go.Panel.Auto` enum constants
- `go.Point.parse`, `go.Rect.parse`, `go.Size.parse`, `go.Margin.parse`
- `diagram.model` property assignment, `diagram.commit`, `startTransaction`/`commitTransaction`
- `model.nodeDataArray` / `linkDataArray` assignment with auto key generation
- `new go.GraphLinksModel({ nodeDataArray, linkDataArray })`
- `diagram.undoManager` / `commandHandler` / `toolManager` / `animationManager` accessors
- `diagram.isReadOnly` / `isEnabled` / `allowMove` / `allowCopy` / `allowDelete` flags
- `diagram.allowTextEdit` / `allowLink` / `allowRelink` / `allowZoom` / `scrollMode`
- Diagram flags enforced in interaction tools (`isReadOnly` / `isEnabled` / `allow*`)
- `diagram.layers` / `layout` / `background` / `div` / `isModified`
- `diagram.scale` / `zoomFactor` / `position` / `padding` / `add` / `remove` / `findPartsInRect`
- `diagram.makeImage` / `makeImageData` / `makeSvg` / `zoomToRect` / `layoutDiagram`
- `diagram.addModelChangedListener` / `removeModelChangedListener`
- `diagram.findTreeRoots` / `findTreeChildren` / `findTreeParent`
- Diagram events: `SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`, `PartResized`, and more
- `GraphObject.click` / `doubleClick` / `contextClick` / `mouseEnter` / `mouseLeave` handlers
- Touch panning, pinch-to-zoom, arrow-key nudging
- `Part.location` / `locationSpot` / `position` / `data` / `dragAlpha`, `Link.fromNode`/`toNode`, `fromEndSegmentLength`, `reshapable`, `isTreeLink`
- `diagram.findNodeForKey` / `findLinkForKey` / `findNodeForData` / `clear` / `centerRect` / `centerPoint`
- Link templates with `toArrow` / `fromArrow` / `strokeWidth`
- `TextBlock.stroke` (GoJS text color), `editable`, `wrap`, `isMultiline`, `strokeWidth`, `fontFamily`/`fontSize`/`fontStyle`
- Panel data panels: `itemArray` / `itemTemplate` (incl. `new go.Binding('itemArray', 'items')`); `Position` panel type
- `Shape.figure` / `strokeCap` / `strokeJoin`
- Undoable model transactions: direct `model.addNode`/`setDataProperty` edits within `diagram.commit` are undoable
- `go.Palette` / `go.Overview` constructible with just a div; `overview.observed`
- `Model.mergeChanges` / `toIncrementalJson` / `applyIncrementalJson` / change log / `toJson` / `isReadOnly`
- `Binding.ofObject`, `UndoManager.maxHistoryLength` / `isUndoingRedoing`

## Performance

Minified bundle: **~67 KB gzip** (265 KB raw) — smaller than GoJS (~130 KB gzip).
Tree-shaking works for consumers; importing just `Diagram` loads only the core
chunk. The predefined palette templates (`graphojs/templates`) are split into a
separate lazy subpath (~1 KB gzip) that is only loaded when you create a default
palette.

Benchmarks (see `packages/core/test/benchmark.test.ts` and `e2e/perf.spec.ts`):

| Operation | Result |
|---|---|
| Model sync (jsdom) | 2000 nodes + 2000 links in ~40 ms |
| Render per frame (jsdom mock) | ~10 ms for 2000 nodes + 2000 links |
| 500 incremental updates | ~2 ms |
| Layouts (jsdom) | grid ~2 ms / tree ~39 ms on 2000 nodes |
| Hit-test `findPartAt` | ~0.03 ms per call over 2000 nodes |
| Pan hot-path (`setViewport` + bounds) | ~0.09 ms per step |
| **Large graph in a real browser** (`e2e/perf.spec.ts`) | 5000 nodes + 5000 links: model sync ~170 ms, first render ~35 ms, ~105 FPS during interaction |

Run the jsdom benchmarks with `npx vitest run packages/core/test/benchmark.test.ts`
and the real-browser large-graph benchmark with `npx playwright test e2e/perf.spec.ts`.
The browser thresholds are deliberately generous to avoid CI flakiness; they only
fail on severe regressions.

The render loop skips frames when nothing changed (`isDirty`), and rendering uses
viewport culling, dirty-rect redraw, Path2D caching, and text-measure caching.

## Tech Stack

- **TypeScript** 7.0.2
- **Biome** 2.5.6 (lint + format)
- **Vitest** 4.1.10 (unit tests)
- **Playwright** 1.62.1 (e2e tests)
- **tsup** 8.5.1 (bundler)
- **pnpm** 11.18.0 (package manager)

## Development

```bash
# Install dependencies (requires pnpm 11.18.0)
pnpm install

# Build all packages
pnpm build

# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run type checks
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# Lint + format check
pnpm check

# Run e2e tests (requires Playwright)
pnpm test:e2e:install
pnpm test:e2e
```

## Roadmap

- [x] Geometry primitives, data model & rendering engine
- [x] Interaction tools (pan, zoom, select, drag, link, resize, rotate)
- [x] Layouts (Grid, Tree, Circular, ForceDirected, LayeredDigraph, Spot)
- [x] Undo/redo, groups, bindings, templates, events, virtualization
- [x] GoJS-compatible API (`graphojs/go`)
- [x] React / Vue wrappers
- [x] npm publication & documentation
- [x] Performance benchmarks on large graphs

## License

MIT — see [LICENSE](./LICENSE).

## Author

Ricardo Robles Fernandez
