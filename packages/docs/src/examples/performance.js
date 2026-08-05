// GraphoJS performance: crea 3000 nodos + enlaces y mide la sincronización.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: '#90a4ae', strokeWidth: 1.5 }),
  $(go.TextBlock, 'label', { margin: 4, fontSize: 9 }, new go.Binding('text', 'label')),
);

const N = 3000;
const nodes = [];
for (let i = 0; i < N; i++) {
  nodes.push({
    key: i,
    label: `N${i}`,
    x: (i % 60) * 60,
    y: Math.floor(i / 60) * 36,
    width: 50,
    height: 26,
  });
}
const links = [];
for (let i = 0; i < N; i++) {
  const to = (i * 5 + 1) % N;
  if (i !== to) links.push({ from: i, to });
}

const t0 = performance.now();
diagram.model = new go.GraphLinksModel({ nodeDataArray: nodes, linkDataArray: links });
const syncMs = performance.now() - t0;

const stat = document.createElement('div');
stat.id = 'stat';
stat.style.cssText =
  'font: 700 14px system-ui, monospace;margin: 10px 0;padding: 10px 14px;border-radius: 8px;' +
  'background: #e8f5e9;color: #1b5e20;border: 1px solid #81c784;display:inline-block;';
stat.textContent = `⚡ ${N} nodos + ${links.length} enlaces sincronizados en ${syncMs.toFixed(1)} ms`;
document.getElementById('graphojs-root').appendChild(stat);

diagram.zoomToFit();
window.__diagram = diagram;
