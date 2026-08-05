// GraphoJS model: añadir/editar/eliminar nodos y enlaces programáticamente.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#e8f5e9',
    stroke: '#2e7d32',
    strokeWidth: 2,
    minSize: { width: 120, height: 48 },
  }),
  $(go.TextBlock, 'label', { margin: 8, font: '600 13px system-ui, sans-serif' },
    new go.Binding('text', 'label')),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#81c784', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#2e7d32', stroke: null }),
);

const model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Cliente' },
    { key: 2, label: 'Servidor' },
  ],
  linkDataArray: [{ from: 1, to: 2 }],
});
diagram.model = model;

// API GoJS de mutación
model.addNodeData({ key: 3, label: 'Base de datos' });
model.addLinkData({ from: 2, to: 3 });

// Actualizar datos reactivamente (la etiqueta cambia al instante)
model.setDataProperty(model.getNodeDataArray()[0], 'label', 'Cliente web');

// Añadir y eliminar en un bucle para demostrar la reactividad
setTimeout(() => {
  const node4 = { key: 4, label: 'Cache' };
  model.addNodeData(node4);
  model.addLinkData({ from: 2, to: 4 });
  diagram.zoomToFit();
}, 1200);

window.__diagram = diagram;
window.__model = model;
