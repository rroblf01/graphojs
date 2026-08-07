// GraphoJS drag & drop: añade nodos desde una palette arrastrando al lienzo,
// o con el botón "+ Añadir nodo". Los nodos se mueven arrastrando con el ratón.
import * as go from 'graphojs/go';
import { getAllTemplates } from 'graphojs/templates';

const $ = go.GraphObject.make;

const root = document.getElementById('graphojs-root');

// Layout en columnas: palette arriba, lienzo en medio, controles abajo.
root.style.display = 'flex';
root.style.flexDirection = 'column';

const paletteEl = document.createElement('div');
paletteEl.style.cssText =
  'flex:0 0 auto;max-height:150px;overflow-y:auto;border-bottom:1px solid #e0e3e7;';
root.appendChild(paletteEl);

const diagramHost = document.createElement('div');
diagramHost.style.cssText = 'flex:1 1 auto;min-height:0;position:relative;';
root.appendChild(diagramHost);

const diagram = new go.Diagram(diagramHost);
diagram.background = '#fafbfc';

// Template basado en los datos del template soltado (shape/fill/stroke/label)
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(
    go.Shape,
    { strokeWidth: 2, minSize: { width: 110, height: 46 } },
    new go.Binding('figure', 'shape'),
    new go.Binding('fill', 'fill'),
    new go.Binding('stroke', 'stroke'),
  ),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 12px system-ui, sans-serif', stroke: '#0d47a1' },
    new go.Binding('text', 'label'),
  ),
);

// Palette con los templates de flujo de datos: arrástralos al lienzo.
new go.Palette(paletteEl, diagram, getAllTemplates(), { showCategories: false });

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Nodo inicial', shape: 'roundedRect', fill: '#e3f2fd', stroke: '#1976d2' },
  ],
  linkDataArray: [],
});
diagram.zoomToFit();

// Panel de controles debajo del diagrama
const panel = document.createElement('div');
panel.style.cssText =
  'flex:0 0 auto;display:flex;gap:8px;align-items:center;padding:8px 10px;' +
  'background:#f1f3f5;border-top:1px solid #e0e3e7;flex-wrap:wrap;';
panel.textContent = 'Arrastra un elemento de la palette al lienzo, o añade con el botón:';

const addBtn = document.createElement('button');
addBtn.textContent = '+ Añadir nodo';
addBtn.style.cssText =
  'padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;' +
  'border:1px solid #90caf9;background:#e3f2fd;color:#0d47a1;cursor:pointer;';

const status = document.createElement('span');
status.style.cssText = 'font:600 12px system-ui, sans-serif;color:#546e7a;';

function nextKey() {
  // key único: máximo key del modelo + 1
  const keys = diagram
    .getModel()
    .getNodeDataArray()
    .map((d) => d.key ?? 0);
  return Math.max(0, ...keys) + 1;
}

function addNode() {
  const key = nextKey();
  const col = (key - 1) % 4;
  const row = Math.floor((key - 1) / 4);
  diagram.getModel().addNodeData({
    key,
    label: `Nodo ${key}`,
    shape: 'roundedRect',
    fill: '#e3f2fd',
    stroke: '#1976d2',
    x: 40 + col * 130,
    y: 40 + row * 70,
  });
  status.textContent = `${key} nodo(s) en el lienzo`;
  diagram.zoomToFit();
}

addBtn.addEventListener('click', addNode);
panel.appendChild(addBtn);
panel.appendChild(status);
root.appendChild(panel);

window.__diagram = diagram;
