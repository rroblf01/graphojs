// GraphoJS: arrastra la etiqueta de un enlace para reposicionarla.
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
    fill: '#e0f7fa',
    stroke: '#00838f',
    strokeWidth: 2,
    minSize: { width: 110, height: 46 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#006064' },
    new go.Binding('text', 'label'),
  ),
);

// El TextBlock con `labelKey` marca esta forma como la etiqueta arrastrable
// del enlace — LinkLabelDraggingTool ya está registrado por defecto.
diagram.linkTemplate = $(
  go.Link,
  { routing: go.Link.Orthogonal, corner: 8 },
  $(go.Shape, { stroke: '#4dd0e1', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#00838f', stroke: null }),
  $(
    go.TextBlock,
    'label',
    {
      margin: 4,
      font: '600 11px system-ui, sans-serif',
      stroke: '#006064',
      background: 'white',
    },
    new go.Binding('text', 'label'),
  ),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Cliente', x: 40, y: 40 },
    { key: 2, label: 'Servidor', x: 320, y: 40 },
  ],
  linkDataArray: [{ from: 1, to: 2, label: 'petición HTTP' }],
});

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';
log.textContent = 'Arrastra la etiqueta "petición HTTP" a lo largo del enlace, o a un lado.';
root.appendChild(log);
diagram.zoomToFit();

const link = diagram.findLinkForKey(
  diagram.getModel().getLinkKey(diagram.getModel().getLinkDataArray()[0]),
);
diagram
  .getRenderer()
  .getCanvas()
  .addEventListener('mouseup', () => {
    if (link) {
      log.textContent = `Etiqueta: segmento ${link.labelSegmentFraction.toFixed(2)}, desplazamiento ${link.labelOffset.toFixed(0)}px`;
    }
  });

window.__diagram = diagram;
