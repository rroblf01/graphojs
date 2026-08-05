// GraphoJS export: PNG, SVG y print con botones.
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
    minSize: { width: 110, height: 46 },
  }),
  $(go.TextBlock, 'label', { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#1b5e20' },
    new go.Binding('text', 'label')),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#66bb6a', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#2e7d32', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'PNG' },
    { key: 2, label: 'SVG' },
    { key: 3, label: 'Print' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
diagram.zoomToFit();

// Botones de exportación
const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;';
const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
};
mk('⬇ PNG', 'border:1px solid #81c784;background:#e8f5e9;color:#1b5e20;', () => {
  const url = diagram.makeImageData({ scale: 2 });
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graphojs.png';
  a.click();
});
mk('⬇ SVG', 'border:1px solid #90caf9;background:#e3f2fd;color:#0d47a1;', () => {
  const svg = diagram.makeSvg();
  const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
    type: 'image/svg+xml',
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'graphojs.svg';
  a.click();
});
mk('🖨 Imprimir', 'border:1px solid #ce93d8;background:#f3e5f5;color:#6a1b9a;', () => diagram.print());
document.getElementById('graphojs-root').appendChild(bar);

window.__diagram = diagram;
