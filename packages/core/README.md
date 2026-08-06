# GraphoJS

An open-source, MIT-licensed alternative to GoJS for building interactive diagrams and graphs on the web. Canvas 2D rendering, GoJS-compatible API.

## Install

```bash
npm install graphojs
# or
pnpm add graphojs
```

## Quick start

```ts
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = $(go.Diagram, 'myDiagramDiv', {
  'undoManager.isEnabled': true,
});

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
  $(go.TextBlock, 'Default Text', { margin: 12 }, new go.Binding('text', 'name')),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 'A', name: 'Alpha', x: 0, y: 0, width: 100, height: 50 },
    { key: 'B', name: 'Beta', x: 200, y: 0, width: 100, height: 50 },
  ],
  linkDataArray: [{ from: 'A', to: 'B' }],
});
```

## Subpaths

- `graphojs` — main entry (`Diagram`, `GraphLinksModel`, `GraphObject`, `Shape`, ...)
- `graphojs/go` — full `go.*` namespace for GoJS compatibility
- `graphojs/templates` — predefined palette templates (`getAllTemplates`, `basicShapes`, `dataFlowShapes`, `flowchartShapes`)

## React / Vue

- [@graphojs/react](https://www.npmjs.com/package/@graphojs/react) — React wrapper
- [@graphojs/vue](https://www.npmjs.com/package/@graphojs/vue) — Vue wrapper

## License

MIT — see [LICENSE](./LICENSE).
