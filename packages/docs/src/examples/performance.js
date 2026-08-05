// GraphoJS performance: create 2000 nodes + links and measure the sync.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
  $(go.TextBlock, 'label', { margin: 4, fontSize: 10 }, new go.Binding('text', 'label')),
);

const N = 2000;
const nodes = [];
for (let i = 0; i < N; i++) {
  nodes.push({ key: i, label: `N${i}`, x: (i % 50) * 90, y: Math.floor(i / 50) * 60, width: 80, height: 40 });
}
const links = [];
for (let i = 0; i < N; i++) {
  const to = (i * 3 + 1) % N;
  if (i !== to) links.push({ from: i, to });
}

const t0 = performance.now();
diagram.model = new go.GraphLinksModel({ nodeDataArray: nodes, linkDataArray: links });
const syncMs = performance.now() - t0;

const stat = document.createElement('div');
stat.id = 'stat';
stat.style.cssText = 'font:12px monospace;margin:8px;color:#555;';
stat.textContent = `sync ${N} nodos + ${N} links: ${syncMs.toFixed(1)} ms`;
document.getElementById('graphojs-root').appendChild(stat);

window.__diagram = diagram;
