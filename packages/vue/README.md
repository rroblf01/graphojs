# @graphojs/vue

Vue 3 wrapper for [GraphoJS](https://www.npmjs.com/package/graphojs), an open-source, MIT-licensed alternative to GoJS for interactive diagramming.

## Install

```bash
npm install graphojs @graphojs/vue
# or
pnpm add graphojs @graphojs/vue
```

Requires `vue >= 3.5`.

## Quick start

```vue
<script setup>
import { Diagram } from '@graphojs/vue';
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
</script>

<template>
  <Diagram :model="model" :node-template="nodeTemplate" />
</template>
```

## Components

- `Diagram` — props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`, `initDiagram`, `onModelChange`, `onDiagramEvent`, `onSelectionChanged`, `className`, `style`. Emits `diagram-init`, `model-change`, `diagram-event`, `selection-changed`. The diagram is created once and updates reactively when props change.
- `Palette` — draggable template palette. Props: `templates`, `nodeTemplate`, `linkTemplate`, `className`, `style`.
- `Overview` — minimap of a diagram. Props: `observed`, `className`, `style`.

## License

MIT — see [LICENSE](./LICENSE).
