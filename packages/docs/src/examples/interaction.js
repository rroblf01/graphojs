// GraphoJS interaction: clic para seleccionar, arrastrar para mover, doble clic para editar texto.
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
    minSize: { width: 120, height: 52 },
    shadowColor: 'rgba(25,118,210,0.2)',
    shadowBlur: 8,
  }),
  $(go.TextBlock, 'label', {
    margin: 8,
    editable: true,
    font: '600 13px system-ui, sans-serif',
    stroke: '#0d47a1',
  }, new go.Binding('text', 'label')),
);

diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#546e7a', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Haz clic' },
    { key: 2, label: 'Arrástrame' },
    { key: 3, label: 'Doble clic' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});

diagram.zoomToFit();

// Log de selección bajo el diagrama
const log = document.createElement('div');
log.id = 'log';
log.style.cssText = 'font: 600 12px system-ui, monospace;margin: 8px;color:#0d47a1;min-height:18px;';
document.getElementById('graphojs-root').appendChild(log);

diagram.addDiagramListener('SelectionChanged', () => {
  const names = diagram.selection.map((p) => p.data?.label ?? p.key).join(', ');
  log.textContent = `selección: ${names || '(ninguna)'}`;
});

window.__diagram = diagram;
