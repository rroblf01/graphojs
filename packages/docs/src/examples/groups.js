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

// Template para grupos: la Shape de fondo ocupa todo el grupo ('Auto'),
// y la cabecera se alinea arriba para no solaparse con los miembros.
diagram.groupTemplate = $(
  go.Group,
  'Auto',
  { placeholderPadding: 32 },
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
      alignment: go.Spot.Top,
      margin: 8,
      font: '700 13px system-ui, sans-serif',
      stroke: '#004d40',
    },
    new go.Binding('text', 'header'),
  ),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, isGroup: true, header: 'Servidor', x: 40, y: 40 },
    { key: 2, group: 1, label: 'API', x: 70, y: 80 },
    { key: 3, group: 1, label: 'Auth', x: 70, y: 170 },
    { key: 4, isGroup: true, header: 'Base de datos', x: 400, y: 40 },
    { key: 5, group: 4, label: 'Postgres', x: 430, y: 80 },
    { key: 6, group: 4, label: 'Redis', x: 430, y: 170 },
  ],
  linkDataArray: [
    { from: 2, to: 3 },
    { from: 2, to: 5 },
  ],
});

diagram.zoomToFit();
window.__diagram = diagram;
