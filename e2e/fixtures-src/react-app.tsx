import {
  type Diagram as GoDiagram,
  GraphLinksModel,
  GraphObject,
  Panel,
  Shape,
  TextBlock,
} from 'graphojs';
import { Diagram, Overview, Palette } from 'graphojs/react';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

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

function App() {
  const [diagram, setDiagram] = useState<GoDiagram | null>(null);
  const [model, setModel] = useState(modelA);
  return (
    <>
      <Diagram
        model={model}
        nodeTemplate={nodeTemplate}
        initDiagram={(d) => {
          setDiagram(d);
          window.__diagram = d;
        }}
        onSelectionChanged={() => {
          selectionCount++;
        }}
      />
      <Palette
        templates={[
          { id: 'pal-item', name: 'Pal', category: 'c', shape: 'rect', width: 80, height: 40 },
        ]}
        nodeTemplate={nodeTemplate}
      />
      {diagram && <Overview observed={diagram} />}
      <button
        type="button"
        id="swap-model"
        onClick={() => setModel(model === modelA ? modelB : modelA)}
      >
        Swap model
      </button>
    </>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
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
