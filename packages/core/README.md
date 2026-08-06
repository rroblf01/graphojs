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
- `graphojs/react` — React wrapper (`Diagram`, `Palette`, `Overview` components)
- `graphojs/vue` — Vue 3 wrapper (`Diagram`, `Palette`, `Overview` components)

React and Vue are optional peer dependencies: install them only if you use the
corresponding subpath.

## React / Vue

```bash
npm install graphojs react          # for graphojs/react
npm install graphojs vue            # for graphojs/vue
```

```tsx
// React
import { Diagram } from 'graphojs/react';

// Vue
import { Diagram } from 'graphojs/vue';
```

## License

MIT — see [LICENSE](./LICENSE).
