// GraphoJS: deshacer/rehacer con estado de botones y descripción de la acción.
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
    fill: '#ede7f6',
    stroke: '#5e35b1',
    strokeWidth: 2,
    minSize: { width: 110, height: 46 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#4527a0' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#b39ddb', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#5e35b1', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [{ key: 1, label: 'Nodo 1', x: 40, y: 40 }],
  linkDataArray: [],
});

const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:8px;flex-wrap:wrap;align-items:center;';
const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
  return b;
};

const status = document.createElement('div');
status.style.cssText =
  'font:600 12px system-ui, monospace;margin:0 8px 8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';

function refreshStatus() {
  const um = diagram.getUndoManager();
  undoBtn.disabled = !um.canUndo();
  redoBtn.disabled = !um.canRedo();
  undoBtn.style.opacity = um.canUndo() ? '1' : '0.4';
  redoBtn.style.opacity = um.canRedo() ? '1' : '0.4';
  status.textContent = `Deshacer: ${um.getUndoDescription() ?? '(nada)'} · Rehacer: ${um.getRedoDescription() ?? '(nada)'}`;
}

function addNode() {
  const key = diagram.getModel().generateKey();
  diagram.commit((d) => {
    const nodes = d.getModel().getNodeDataArray();
    const last = nodes[nodes.length - 1];
    d.getModel().addNode({
      key,
      label: `Nodo ${key}`,
      x: (last?.x ?? 0) + 150,
      y: 40,
    });
    if (last) d.getModel().addLink({ from: last.key, to: key });
  }, `Añadir Nodo ${key}`);
  diagram.zoomToFit();
  refreshStatus();
}

mk('➕ Añadir nodo', 'border:1px solid #b39ddb;background:#ede7f6;color:#4527a0;', addNode);
const undoBtn = mk(
  '↶ Deshacer',
  'border:1px solid #90a4ae;background:#eceff1;color:#37474f;',
  () => {
    diagram.undo();
    diagram.zoomToFit();
    refreshStatus();
  },
);
const redoBtn = mk(
  '↷ Rehacer',
  'border:1px solid #90a4ae;background:#eceff1;color:#37474f;',
  () => {
    diagram.redo();
    diagram.zoomToFit();
    refreshStatus();
  },
);

root.appendChild(bar);
root.appendChild(status);
refreshStatus();
diagram.zoomToFit();

window.__diagram = diagram;
