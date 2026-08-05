// GraphoJS getting started: a small flowchart with a palette.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: '#1976d2', strokeWidth: 2 }),
  $(go.TextBlock, 'label', { margin: 8 }, new go.Binding('text', 'label')),
);

diagram.linkTemplate = $(go.Link, { routing: go.Link.Orthogonal }, $(go.Shape, { stroke: '#333' }));

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Inicio' },
    { key: 2, label: 'Procesar' },
    { key: 3, label: 'Fin' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});

// Expose for debugging.
window.__diagram = diagram;
