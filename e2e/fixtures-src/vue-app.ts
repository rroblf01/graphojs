import {
  type Diagram as GoDiagram,
  GraphLinksModel,
  GraphObject,
  Panel,
  Shape,
  TextBlock,
} from 'graphojs';
import { Diagram, Overview, Palette } from 'graphojs/vue';
import { createApp, h, ref } from 'vue';

const $ = GraphObject.make;

let selectionCount = 0;

const nodeTemplate = $(
  Panel,
  'Auto',
  $(Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
  $(TextBlock, 'label', { margin: 6 }),
);

const modelA = new GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Alpha', x: 0, y: 0 },
    { key: 2, label: 'Beta', x: 150, y: 0 },
  ],
  linkDataArray: [{ from: 1, to: 2 }],
});

const modelB = new GraphLinksModel({
  nodeDataArray: [
    { key: 10, label: 'Gamma', x: 0, y: 0 },
    { key: 20, label: 'Delta', x: 150, y: 0 },
  ],
  linkDataArray: [{ from: 10, to: 20 }],
});

const container = document.getElementById('root');
if (container) {
  const app = createApp({
    setup() {
      const diagram = ref<GoDiagram | null>(null);
      const useModelB = ref(false);
      return () =>
        h('div', {}, [
          h(Diagram, {
            model: useModelB.value ? modelB : modelA,
            nodeTemplate,
            initDiagram: (d: GoDiagram) => {
              diagram.value = d;
              window.__diagram = d;
            },
            onSelectionChanged: () => {
              selectionCount++;
            },
          }),
          h(Palette, {
            templates: [
              { id: 'pal-item', name: 'Pal', category: 'c', shape: 'rect', width: 80, height: 40 },
            ],
            nodeTemplate,
          }),
          diagram.value ? h(Overview, { observed: diagram.value }) : null,
          h(
            'button',
            {
              id: 'swap-model',
              onClick: () => {
                useModelB.value = !useModelB.value;
              },
            },
            'Swap model',
          ),
        ]);
    },
  });
  app.config.errorHandler = (err) => {
    (window as unknown as { __vueError?: string }).__vueError = String(err);
  };
  app.mount(container);
}

declare global {
  interface Window {
    __diagram: GoDiagram | null;
    __go: typeof GraphObject;
    __selectionCount: () => number;
  }
}

window.__go = GraphObject;
window.__selectionCount = () => selectionCount;
