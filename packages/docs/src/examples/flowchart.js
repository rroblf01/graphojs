// GraphoJS: diagrama de flujo con carriles (swimlanes) y figuras BPMN.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

// Carriles: una franja de color (etiqueta) + un fondo ancho, ambos fijos
// (no seleccionables/arrastrables) para que actúen como decorado estático.
const laneFixed = { selectable: false, draggable: false, deletable: false, zOrder: -10 };

diagram.nodeTemplateMap.set(
  'laneLabel',
  $(
    go.Node,
    'Auto',
    laneFixed,
    $(go.Shape, 'Rectangle', new go.Binding('fill', 'fill'), { stroke: null }),
    $(
      go.TextBlock,
      { font: '700 12px system-ui, sans-serif', stroke: 'white' },
      new go.Binding('text', 'label'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'laneBody',
  $(go.Node, 'Auto', laneFixed, $(go.Shape, 'Rectangle', { fill: '#f5f7fa', stroke: '#dde1e6' })),
);

// Figuras del flujo
diagram.nodeTemplateMap.set(
  'terminator',
  $(
    go.Node,
    'Auto',
    $(go.Shape, 'Ellipse', { fill: '#e8f5e9', stroke: '#43a047', strokeWidth: 2 }),
    $(
      go.TextBlock,
      { margin: 6, font: '600 12px system-ui, sans-serif' },
      new go.Binding('text', 'label'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'process',
  $(
    go.Node,
    'Auto',
    $(go.Shape, 'RoundedRectangle', { fill: '#e3f2fd', stroke: '#1976d2', strokeWidth: 2 }),
    $(
      go.TextBlock,
      { margin: 6, font: '600 12px system-ui, sans-serif' },
      new go.Binding('text', 'label'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'decision',
  $(
    go.Node,
    'Auto',
    $(go.Shape, 'gatewayExclusive', { fill: '#fff3e0', stroke: '#f57c00', strokeWidth: 2 }),
    $(
      go.TextBlock,
      { margin: 4, font: '600 11px system-ui, sans-serif', textAlign: 'center' },
      new go.Binding('text', 'label'),
    ),
  ),
);

diagram.linkTemplate = $(
  go.Link,
  {
    routing: 'orthogonal',
    corner: 6,
    labelFont: '600 11px system-ui, sans-serif',
    labelColor: '#546e7a',
  },
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#90a4ae', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    // Carril "Ventas" (y: 0-170)
    {
      key: 'lane1-label',
      category: 'laneLabel',
      x: 0,
      y: 0,
      width: 110,
      height: 170,
      fill: '#1565c0',
      label: 'Ventas',
    },
    { key: 'lane1-body', category: 'laneBody', x: 110, y: 0, width: 790, height: 170 },
    // Carril "Almacén" (y: 200-370)
    {
      key: 'lane2-label',
      category: 'laneLabel',
      x: 0,
      y: 200,
      width: 110,
      height: 170,
      fill: '#00695c',
      label: 'Almacén',
    },
    { key: 'lane2-body', category: 'laneBody', x: 110, y: 200, width: 790, height: 170 },

    // Flujo
    { key: 1, category: 'terminator', x: 140, y: 55, width: 100, height: 60, label: 'Inicio' },
    { key: 2, category: 'process', x: 290, y: 50, width: 150, height: 70, label: 'Validar pedido' },
    { key: 3, category: 'decision', x: 490, y: 40, width: 90, height: 90, label: '¿Stock?' },
    {
      key: 4,
      category: 'process',
      x: 640,
      y: 50,
      width: 170,
      height: 70,
      label: 'Notificar cliente',
    },
    {
      key: 5,
      category: 'process',
      x: 490,
      y: 245,
      width: 170,
      height: 70,
      label: 'Preparar envío',
    },
    { key: 6, category: 'terminator', x: 720, y: 245, width: 100, height: 60, label: 'Fin' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4, label: 'No' },
    { from: 3, to: 5, label: 'Sí' },
    { from: 4, to: 6 },
    { from: 5, to: 6 },
  ],
});

diagram.zoomToFit();
window.__diagram = diagram;
