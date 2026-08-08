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
  // Puerto visible: un punto en el borde derecho — arrastra desde aquí para
  // crear un enlace. portId (no vacío) es imprescindible: sin ningún
  // elemento con portId, LinkingTool nunca reconoce el nodo como "sobre un
  // puerto" y arrastrar no hace nada, por silencioso que parezca el fallo.
  $(go.Shape, 'Circle', {
    portId: 'out',
    width: 10,
    height: 10,
    alignment: go.Spot.Right,
    fill: '#546e7a',
    stroke: null,
  }),
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
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:36px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;white-space:pre-wrap;';
log.textContent =
  '🖱️ Arrastrando: arrastra desde el punto gris del borde derecho de\n' +
  '"Entrada A" hasta otro nodo.';
root.appendChild(log);

// Vía 1: interactiva — LinkingTool comprueba isValidLink en cada intento de
// arrastrar un enlace nuevo, y si es inválido simplemente no lo crea (no hay
// evento ni excepción qué capturar; por eso el log de abajo solo se actualiza
// cuando SÍ se crea uno).
diagram.addDiagramListener('LinkDrawn', (e) => {
  log.textContent =
    `🖱️ Arrastrando: enlace creado ${e.subject.fromNode?.data.label} → ${e.subject.toNode?.data.label}\n` +
    '(si arrastraste hacia un destino inválido, no habrá pasado nada — así se comporta LinkingTool)';
});

// Vía 2: programática — model.addLink() SÍ lanza una excepción si la
// validación falla, así que hace falta un try/catch (o diagram.commit()).
const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:0 8px 8px;flex-wrap:wrap;';
const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
  return b;
};
mk(
  '{ } Código: Entrada A → Salida (válido)',
  'border:1px solid #81c784;background:#e8f5e9;color:#1b5e20;',
  () => {
    try {
      model.addLink({ from: 1, to: 3 });
      log.textContent = '{ } Código: model.addLink({ from: 1, to: 3 }) — creado sin error.';
    } catch (err) {
      log.textContent = `{ } Código: ${err.message}`;
    }
  },
);
mk(
  '{ } Código: Entrada A → Entrada B (inválido)',
  'border:1px solid #ef9a9a;background:#ffebee;color:#c62828;',
  () => {
    try {
      model.addLink({ from: 1, to: 2 });
      log.textContent = '{ } Código: se creó (esto no debería pasar).';
    } catch (err) {
      log.textContent =
        `{ } Código: model.addLink({ from: 1, to: 2 }) lanzó: "${err.message}"\n` +
        '(por eso hace falta un try/catch, o diagram.commit(), al llamarlo directamente)';
    }
  },
);
root.appendChild(bar);
diagram.zoomToFit();

window.__diagram = diagram;
