// GraphoJS templates: nodos, enlaces y grupos personalizados con bindings.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#fff8e1',
    stroke: '#f57c00',
    strokeWidth: 2,
    minSize: { width: 130, height: 52 },
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowBlur: 5,
  }),
  $(
    go.TextBlock,
    'label',
    {
      margin: 8,
      font: '600 13px system-ui, sans-serif',
      stroke: '#e65100',
    },
    new go.Binding('text', 'name'),
  ),
);

// Enlace con etiqueta y flecha
diagram.linkTemplate = $(
  go.Link,
  { routing: go.Link.Orthogonal, corner: 6 },
  $(go.Shape, { stroke: '#bdbdbd', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#757575', stroke: null }),
  $(
    go.TextBlock,
    'label',
    {
      font: '600 11px system-ui, sans-serif',
      stroke: '#616161',
    },
    new go.Binding('text', 'label'),
  ),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, name: 'Alpha' },
    { key: 2, name: 'Beta' },
    { key: 3, name: 'Gamma' },
  ],
  linkDataArray: [
    { from: 1, to: 2, label: 'usa' },
    { from: 2, to: 3, label: 'produce' },
  ],
});

diagram.zoomToFit();
window.__diagram = diagram;
