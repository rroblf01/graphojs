// GraphoJS: validación de nodos y enlaces con isValidNode / isValidLink.
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
  $(
    go.Shape,
    'RoundedRectangle',
    { strokeWidth: 2, minSize: { width: 110, height: 46 } },
    new go.Binding('fill', 'color'),
    new go.Binding('stroke', 'strokeColor'),
  ),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif' },
    new go.Binding('text', 'label'),
    new go.Binding('stroke', 'strokeColor'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#546e7a', stroke: null }),
);

const model = new go.GraphLinksModel({
  nodeDataArray: [
    {
      key: 1,
      label: 'Entrada A',
      color: '#e3f2fd',
      strokeColor: '#1976d2',
      kind: 'input',
      x: 40,
      y: 40,
    },
    {
      key: 2,
      label: 'Entrada B',
      color: '#e3f2fd',
      strokeColor: '#1976d2',
      kind: 'input',
      x: 40,
      y: 180,
    },
    {
      key: 3,
      label: 'Salida',
      color: '#e8f5e9',
      strokeColor: '#2e7d32',
      kind: 'output',
      x: 320,
      y: 110,
    },
  ],
  linkDataArray: [],
});

// Regla: solo se permiten enlaces "input" → "output" (nunca input→input,
// output→output, ni auto-enlaces). LinkingTool comprueba esto en cada
// intento de arrastrar un nuevo enlace, y model.addLink() lo comprueba
// también en cualquier alta programática.
model.isValidLink = (linkData) => {
  const from = model.getNodeData(linkData.from);
  const to = model.getNodeData(linkData.to);
  return !!from && !!to && from.kind === 'input' && to.kind === 'output';
};

diagram.model = model;

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';
log.textContent =
  'Intenta enlazar Entrada A → Entrada B (se rechaza) y Entrada A → Salida (se acepta).';
root.appendChild(log);
diagram.zoomToFit();

diagram.addDiagramListener('LinkDrawn', (e) => {
  log.textContent = `✅ Enlace creado: ${e.subject.fromNode?.data.label} → ${e.subject.toNode?.data.label}`;
});

window.__diagram = diagram;
