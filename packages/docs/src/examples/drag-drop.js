// GraphoJS: añade nodos al diagrama (simula un drag & drop desde una palette).
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
  $(go.TextBlock, 'label', { margin: 8, font: '600 12px system-ui, sans-serif', stroke: '#0d47a1' },
    new go.Binding('text', 'label')),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [{ key: 1, label: 'Nodo inicial' }],
  linkDataArray: [],
});
diagram.zoomToFit();

// Layout del panel de controles debajo del diagrama
const panel = document.createElement('div');
panel.style.cssText =
  'display:flex;gap:8px;align-items:center;margin-top:8px;padding:8px 10px;' +
  'background:#f1f3f5;border-radius:8px;border:1px solid #e0e3e7;flex-wrap:wrap;';
panel.textContent = 'Añade nodos con el botón, arrástralos en el lienzo:';

const addBtn = document.createElement('button');
addBtn.textContent = '+ Añadir nodo';
addBtn.style.cssText =
  'padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;' +
  'border:1px solid #90caf9;background:#e3f2fd;color:#0d47a1;cursor:pointer;';

const status = document.createElement('span');
status.style.cssText = 'font:600 12px system-ui, sans-serif;color:#546e7a;';

function nextKey() {
  // key único: máximo key del modelo + 1
  const keys = diagram.getModel().getNodeDataArray().map((d) => d.key ?? 0);
  return Math.max(0, ...keys) + 1;
}

function addNode() {
  const key = nextKey();
  const col = (key - 1) % 4;
  const row = Math.floor((key - 1) / 4);
  diagram.getModel().addNodeData({
    key,
    label: `Nodo ${key}`,
    x: 40 + col * 130,
    y: 40 + row * 70,
  });
  status.textContent = `${key} nodo(s) en el lienzo`;
  diagram.zoomToFit();
}

addBtn.addEventListener('click', addNode);
panel.appendChild(addBtn);
panel.appendChild(status);
document.getElementById('graphojs-root').appendChild(panel);

window.__diagram = diagram;
