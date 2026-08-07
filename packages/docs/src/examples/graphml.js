// GraphoJS: exportar/importar el modelo como GraphML (formato estándar de grafos).
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
    fill: '#fce4ec',
    stroke: '#c2185b',
    strokeWidth: 2,
    minSize: { width: 110, height: 46 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#880e4f' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#f48fb1', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#c2185b', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'A', x: 40, y: 40 },
    { key: 2, label: 'B', x: 280, y: 40 },
    { key: 3, label: 'C', x: 160, y: 160 },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
  ],
});

const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;';
const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
};

const pre = document.createElement('pre');
pre.style.cssText =
  'flex:0 0 auto;max-height:160px;overflow:auto;margin:0 8px 8px;padding:8px;' +
  'font:11px/1.4 ui-monospace,monospace;color:#455a64;background:#fafafa;' +
  'border:1px solid #e0e3e7;border-radius:6px;';

function refreshPreview() {
  pre.textContent = go.Serializer.serializeToGraphML(diagram);
}

mk('⬇ Exportar GraphML', 'border:1px solid #f48fb1;background:#fce4ec;color:#880e4f;', () => {
  go.Serializer.exportToGraphMLFile(diagram, 'graphojs.graphml');
});
mk('⬆ Importar GraphML', 'border:1px solid #b0bec5;background:#eceff1;color:#37474f;', () => {
  go.Serializer.importFromGraphMLFile(diagram).then(() => {
    diagram.zoomToFit();
    refreshPreview();
  });
});
mk(
  '↻ Refrescar vista previa',
  'border:1px solid #cfd8dc;background:#fff;color:#455a64;',
  refreshPreview,
);

root.appendChild(bar);
root.appendChild(pre);
refreshPreview();
diagram.zoomToFit();

window.__diagram = diagram;
