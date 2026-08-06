# @graphojs/react

React wrapper for [GraphoJS](https://www.npmjs.com/package/graphojs), an open-source, MIT-licensed alternative to GoJS for interactive diagramming.

## Install

```bash
npm install graphojs @graphojs/react
# or
pnpm add graphojs @graphojs/react
```

Requires `react >= 19` and `react-dom >= 19`.

## Quick start

```tsx
import { Diagram, Palette, Overview } from '@graphojs/react';
import { GraphObject, GraphLinksModel, Shape, TextBlock, Panel } from 'graphojs';

const $ = GraphObject.make;

const nodeTemplate = $(
  Panel,
  'Auto',
  $(Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
  $(TextBlock, 'label', { margin: 6 }),
);

const model = new GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Alpha', x: 0, y: 0 },
    { key: 2, label: 'Beta', x: 150, y: 0 },
  ],
  linkDataArray: [{ from: 1, to: 2 }],
});

export function App() {
  return (
    <Diagram model={model} nodeTemplate={nodeTemplate} />
  );
}
```

## Components

- `Diagram` — props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`, `initDiagram`, `onDiagramInit`, `onModelChange`, `onDiagramEvent`, `onSelectionChanged`, `className`, `style`. The diagram is created once and updates reactively when props change.
- `Palette` — draggable template palette. Props: `templates`, `nodeTemplate`, `linkTemplate`.
- `Overview` — minimap of a diagram. Props: `observed`, `className`, `style`.

## License

MIT — see [LICENSE](./LICENSE).
