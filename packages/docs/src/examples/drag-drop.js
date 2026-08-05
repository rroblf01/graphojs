// GraphoJS: arrastra elementos desde una palette al diagrama.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: 'white',
    stroke: '#1976d2',
    strokeWidth: 2,
    minSize: { width: 110, height: 46 },
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowBlur: 6,
  }),
  $(go.TextBlock, 'label', { margin: 8, font: '600 12px system-ui, sans-serif' },
    new go.Binding('text', 'label')),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [{ key: 1, label: 'Suelta aquí' }],
  linkDataArray: [],
});

// Palette con templates arrastrables (definición; el botón de abajo simula el drop)
const shapes = ['Rectangle', 'Ellipse', 'Diamond', 'RoundedRectangle'];
const fills = ['#e3f2fd', '#fce4ec', '#e8f5e9', '#fff8e1'];
const templates = shapes.map((shape, i) => ({
  id: `tpl-${i}`,
  name: shape,
  category: 'shapes',
  shape: shape.toLowerCase(),
  width: 110,
  height: 46,
  fill: fills[i],
  stroke: '#1976d2',
  strokeWidth: 2,
  label: shape,
}));

// Registrar el drop: cuando se suelta un template sobre el diagrama
diagram.addDiagramListener('PartAdded', () => {
  diagram.zoomToFit();
});

window.__diagram = diagram;
window.__paletteTemplates = templates;

// Botón para añadir un nodo aleatorio (simula el drop)
const btn = document.createElement('button');
btn.textContent = '+ Añadir nodo';
btn.style.cssText =
  'padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;' +
  'border:1px solid #90caf9;background:#e3f2fd;color:#0d47a1;cursor:pointer;margin:8px 0;';
btn.addEventListener('click', () => {
  const n = diagram.getModel().getNodeCount();
  diagram.getModel().addNodeData({
    key: n + 1,
    label: `Nodo ${n + 1}`,
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 150,
    shape: 'roundedRect',
    fill: '#e3f2fd',
  });
  diagram.zoomToFit();
});
document.getElementById('graphojs-root').appendChild(btn);

window.__diagram = diagram;
