// GraphoJS layouts: Grid, Tree, Circular, ForceDirected con un botón.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#ede7f6',
    stroke: '#5e35b1',
    strokeWidth: 2,
    minSize: { width: 110, height: 44 },
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowBlur: 4,
  }),
  $(go.TextBlock, 'label', { margin: 6, font: '600 12px system-ui, sans-serif', stroke: '#4527a0' },
    new go.Binding('text', 'label')),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#b39ddb', strokeWidth: 2 }),
);

// Grafo en forma de árbol (funciona con varios layouts)
const nodes = [];
for (let i = 0; i < 12; i++) nodes.push({ key: i, label: `Nodo ${i}` });
const links = [];
for (let i = 1; i < 12; i++) links.push({ from: Math.floor((i - 1) / 2), to: i });

diagram.model = new go.GraphLinksModel({ nodeDataArray: nodes, linkDataArray: links });

// Botones de layout sobre el diagrama
const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;';
for (const [name, key] of [
  ['Grid', 'grid'],
  ['Tree', 'tree'],
  ['Circular', 'circular'],
  ['Force', 'force'],
]) {
  const b = document.createElement('button');
  b.textContent = name;
  b.style.cssText =
    'padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;' +
    'border:1px solid #b39ddb;background:#ede7f6;color:#4527a0;cursor:pointer;';
  b.addEventListener('click', () => {
    const layouts = {
      grid: new go.GridLayout(),
      tree: new go.TreeLayout(),
      circular: new go.CircularLayout(),
      force: new go.ForceDirectedLayout({ maxIterations: 100 }),
    };
    diagram.layout = layouts[key];
    diagram.layoutDiagram();
    diagram.zoomToFit();
  });
  bar.appendChild(b);
}
document.getElementById('graphojs-root').appendChild(bar);

diagram.layout = new go.TreeLayout();
diagram.layoutDiagram();
diagram.zoomToFit();
window.__diagram = diagram;
