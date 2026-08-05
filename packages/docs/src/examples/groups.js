// GraphoJS: grupos con nodos anidados y colapso/expansión.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

// Template para nodos normales
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: 'white',
    stroke: '#00897b',
    strokeWidth: 2,
    minSize: { width: 100, height: 40 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 6, font: '600 12px system-ui, sans-serif', stroke: '#00695c' },
    new go.Binding('text', 'label'),
  ),
);

// Template para grupos
diagram.groupTemplate = $(
  go.Group,
  'Vertical',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#e0f2f1',
    stroke: '#26a69a',
    strokeWidth: 2,
    minSize: { width: 260, height: 120 },
  }),
  $(
    go.TextBlock,
    'header',
    {
      margin: 8,
      font: '700 13px system-ui, sans-serif',
      stroke: '#004d40',
    },
    new go.Binding('text', 'header'),
  ),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, header: 'Servidor' },
    { key: 2, group: 1, label: 'API' },
    { key: 3, group: 1, label: 'Auth' },
    { key: 4, header: 'Base de datos' },
    { key: 5, group: 4, label: 'Postgres' },
    { key: 6, group: 4, label: 'Redis' },
  ],
  linkDataArray: [
    { from: 2, to: 3 },
    { from: 2, to: 5 },
  ],
});

diagram.zoomToFit();
window.__diagram = diagram;
