// GraphoJS interaction: click to select, drag to move, double-click to edit text.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: 'white',
    stroke: '#1976d2',
    strokeWidth: 2,
    minSize: { width: 100, height: 50 },
  }),
  $(go.TextBlock, 'label', { margin: 8, editable: true }, new go.Binding('text', 'label')),
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

// Log selection changes.
let log = document.createElement('div');
log.id = 'log';
log.style.cssText = 'font:12px monospace;margin:8px;color:#555;';
document.getElementById('graphojs-root').appendChild(log);

diagram.addDiagramListener('SelectionChanged', () => {
  const keys = diagram.selection.map((p) => p.key).join(', ');
  log.textContent = `selection: ${keys}`;
});

window.__diagram = diagram;
