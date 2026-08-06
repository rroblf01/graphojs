// GraphoJS export: PNG, SVG, print e importar/exportar el modelo en JSON.
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
    fill: '#e8f5e9',
    stroke: '#2e7d32',
    strokeWidth: 2,
    minSize: { width: 110, height: 46 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#1b5e20' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#66bb6a', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#2e7d32', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'PNG', x: 40, y: 40 },
    { key: 2, label: 'SVG', x: 320, y: 40 },
    { key: 3, label: 'Print', x: 600, y: 40 },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
diagram.zoomToFit();

// Botones de exportación e importación
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
mk('🖨 Imprimir', 'border:1px solid #ce93d8;background:#f3e5f5;color:#6a1b9a;', () =>
  diagram.print(),
);

// Exportar el modelo a un archivo .json
mk('⬇ Exportar JSON', 'border:1px solid #90a4ae;background:#eceff1;color:#37474f;', () =>
  go.Serializer.exportToFile(diagram, 'graphojs.json'),
);

// Importar un .json (restaura nodos, enlaces y viewport)
mk('⬆ Importar JSON', 'border:1px solid #b0bec5;background:#eceff1;color:#37474f;', () =>
  go.Serializer.importFromFile(diagram).then(() => diagram.zoomToFit()),
);

root.appendChild(bar);

// Vista previa del JSON serializado (solo lectura)
const pre = document.createElement('pre');
pre.style.cssText =
  'flex:0 0 auto;max-height:140px;overflow:auto;margin:0 8px 8px;padding:8px;' +
  'font:11px/1.4 ui-monospace,monospace;color:#455a64;background:#fafafa;' +
  'border:1px solid #e0e3e7;border-radius:6px;';
pre.textContent = go.Serializer.serializeToString(diagram);

const refresh = document.createElement('button');
refresh.textContent = '↻ Refrescar JSON';
refresh.style.cssText =
  'margin-left:8px;padding:4px 10px;font:600 12px system-ui, sans-serif;border-radius:6px;' +
  'border:1px solid #cfd8dc;background:#fff;color:#455a64;cursor:pointer;';
refresh.addEventListener('click', () => {
  pre.textContent = go.Serializer.serializeToString(diagram);
});
bar.appendChild(refresh);

root.appendChild(pre);

window.__diagram = diagram;
window.go = go;
