# GraphoJS

An open-source, MIT-licensed alternative to GoJS for building interactive diagrams and graphs in the web.

## Packages

| Package           | npm                                                                                                       | Description                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `graphojs`        | [![npm](https://img.shields.io/npm/v/graphojs.svg)](https://www.npmjs.com/package/graphojs)               | Core library (framework-agnostic, Canvas 2D) |
| `@graphojs/react` | [![npm](https://img.shields.io/npm/v/@graphojs/react.svg)](https://www.npmjs.com/package/@graphojs/react) | React wrapper                                |
| `@graphojs/vue`   | [![npm](https://img.shields.io/npm/v/@graphojs/vue.svg)](https://www.npmjs.com/package/@graphojs/vue)     | Vue wrapper                                  |

## Status

**Work in progress** — not yet published. See the [Roadmap](#roadmap) for planned features.

## GoJS Compatibility

GraphoJS exposes a drop-in, GoJS-compatible API. Most GoJS code migrates by
changing only the import:

```diff
- import * as go from 'gojs';
+ import * as go from 'graphojs/go';
```

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
- `go.Binding` at the Part and element level (with converters & TwoWay)
- `nodeTemplate` / `linkTemplate` / `groupTemplate` / `nodeTemplateMap` / `linkTemplateMap`
- `go.Link.Orthogonal`, `go.Shape.RoundedRectangle`, `go.Panel.Auto` enum constants
- `go.Point.parse`, `go.Rect.parse`, `go.Size.parse`, `go.Margin.parse`
- `diagram.model` property assignment, `diagram.commit`, `startTransaction`/`commitTransaction`
- `diagram.undoManager` / `commandHandler` / `toolManager` / `animationManager` accessors
- Diagram events: `SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`, `PartResized`, and more
- Touch panning, pinch-to-zoom, arrow-key nudging
- `Part.location` / `locationSpot`, `Link.fromNode`/`toNode`, `fromEndSegmentLength`, `reshapable`

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
- [ ] React / Vue wrappers
- [ ] npm publication & documentation
- [ ] Performance benchmarks on large graphs

## License

MIT — see [LICENSE](./LICENSE).

## Author

Ricardo Robles Fernandez
