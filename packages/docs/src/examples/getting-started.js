// GraphoJS getting started: un diagrama de flujo con palette y colores vivos.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#e3f2fd',
    stroke: '#1976d2',
    strokeWidth: 2,
    minSize: { width: 140, height: 56 },
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowBlur: 6,
    shadowOffset: { x: 0, y: 2 },
  }),
  $(
    go.TextBlock,
    'label',
    {
      margin: 8,
      font: '600 14px system-ui, sans-serif',
      stroke: '#0d47a1',
    },
    new go.Binding('text', 'label'),
  ),
);

diagram.linkTemplate = $(
  go.Link,
  { routing: go.Link.Orthogonal, corner: 8 },
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#546e7a', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Inicio' },
    { key: 2, label: 'Procesar' },
    { key: 3, label: 'Validar' },
    { key: 4, label: '¿OK?' },
    { key: 5, label: 'Fin' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 2 },
  ],
});

diagram.zoomToFit();
window.__diagram = diagram;
