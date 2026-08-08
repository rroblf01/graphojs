// GraphoJS: el objeto Diagram — viewport/zoom, navegación de grafo/árbol y eventos.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const root = document.getElementById('graphojs-root');
root.style.display = 'flex';
root.style.flexDirection = 'column';

const diagramHost = document.createElement('div');
diagramHost.style.cssText = 'flex:1 1 auto;min-height:0;position:relative;';
root.appendChild(diagramHost);

const diagram = new go.Diagram(diagramHost);
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#e3f2fd',
    stroke: '#1976d2',
    strokeWidth: 2,
    minSize: { width: 110, height: 46 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#0d47a1' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#546e7a', stroke: null }),
);

const nodeDataArray = [
  { key: 1, label: 'Raíz', x: 220, y: 20 },
  { key: 2, label: 'Hijo A', parent: 1, x: 60, y: 140 },
  { key: 3, label: 'Hijo B', parent: 1, x: 380, y: 140 },
  { key: 4, label: 'Nieto A1', parent: 2, x: 60, y: 260 },
];
// linkDataArray derivado de `parent` — Diagram no crea enlaces desde ese
// campo por sí solo, hace falta un Link real por cada relación.
const linkDataArray = nodeDataArray
  .filter((d) => d.parent != null)
  .map((d) => ({ from: d.parent, to: d.key }));

diagram.model = new go.GraphLinksModel({ nodeDataArray, linkDataArray });

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:36px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;white-space:pre-wrap;';
log.textContent = 'Haz clic en un nodo para ver su vecindad y su posición en el árbol.';

diagram.addDiagramListener('SelectionChanged', () => {
  const node = diagram.selection[0];
  if (!node?.data) {
    log.textContent = 'Haz clic en un nodo para ver su vecindad y su posición en el árbol.';
    return;
  }
  const into = node.findLinksInto().length;
  const outOf = node
    .findNodesOutOf()
    .map((n) => n.data.label)
    .join(', ');
  const parent = diagram.findTreeParent(node);
  const children = diagram
    .findTreeChildren(node)
    .map((n) => n.data.label)
    .join(', ');
  log.textContent =
    `"${node.data.label}" — ${into} enlace(s) entrantes, sale hacia: ${outOf || '(ninguno)'}\n` +
    `Padre en el árbol: ${parent?.data.label ?? '(es raíz)'} · Hijos: ${children || '(ninguno)'}`;
});

const scaleLabel = document.createElement('span');
scaleLabel.style.cssText =
  'font:600 12px system-ui, sans-serif;color:#546e7a;margin-left:auto;margin-right:8px;';
function refreshScaleLabel() {
  scaleLabel.textContent = `zoom: ${Math.round(diagram.scale * 100)}%`;
}
diagram.addDiagramListener('ViewportChanged', refreshScaleLabel);

const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:0 8px 8px;flex-wrap:wrap;align-items:center;';
const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
  return b;
};

mk('🔍 Zoom to fit', 'border:1px solid #90caf9;background:#e3f2fd;color:#0d47a1;', () => {
  diagram.zoomToFit();
});
mk('🎯 Centrar en la raíz', 'border:1px solid #ce93d8;background:#f3e5f5;color:#6a1b9a;', () => {
  const rootNode = diagram.findTreeRoots()[0];
  if (rootNode) diagram.centerRect(rootNode.bounds);
});
mk('🔎 Zoom a "Nieto A1"', 'border:1px solid #81c784;background:#e8f5e9;color:#1b5e20;', () => {
  const node = diagram.findNodeForKey(4);
  if (node) diagram.zoomToRect(node.bounds, 30);
});

bar.appendChild(scaleLabel);

root.appendChild(bar);
root.appendChild(log);
diagram.zoomToFit();
refreshScaleLabel();

window.__diagram = diagram;
