import { createApp, h, ref } from 'vue';
import { Diagram, Palette, Overview } from '@graphojs/vue';
import { GraphObject, GraphLinksModel, type Diagram as GoDiagram, Shape, TextBlock, Panel } from 'graphojs';

const $ = GraphObject.make;

let selectionCount = 0;

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

const container = document.getElementById('root');
if (container) {
  const app = createApp({
    setup() {
      const diagram = ref<GoDiagram | null>(null);
      return () =>
        h('div', {}, [
          h(Diagram, {
            model,
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
