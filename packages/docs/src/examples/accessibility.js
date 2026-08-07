// GraphoJS accesibilidad: navegación por teclado, anuncios de lector de
// pantalla, alto contraste y "reducir movimiento".
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
    fill: '#e3f2fd',
    stroke: '#1976d2',
    strokeWidth: 2,
    minSize: { width: 120, height: 50 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#0d47a1' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#546e7a', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Nodo A', x: 40, y: 40 },
    { key: 2, label: 'Nodo B', x: 260, y: 40 },
    { key: 3, label: 'Nodo C', x: 480, y: 40 },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});

// Las líneas aria-live son invisibles a propósito (son para lectores de
// pantalla) — para esta demo, las espejamos en un log visible.
const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';
log.textContent = 'Enfoca el diagrama (Tab) y usa las flechas — los anuncios aparecerán aquí.';
const originalAnnounce = diagram.announce.bind(diagram);
diagram.announce = (message) => {
  originalAnnounce(message);
  log.textContent = `🔊 ${message}`;
};

const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:8px;margin:0 8px 8px;flex-wrap:wrap;align-items:center;';
const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
  return b;
};

// "Reducir movimiento": diagram.animationManager.isEnabled ya se pone en
// false automáticamente si el sistema operativo lo pide — aquí se puede
// alternar a mano para ver la diferencia.
const motionBtn = mk(
  '⏸ Reducir movimiento',
  'border:1px solid #ce93d8;background:#f3e5f5;color:#6a1b9a;',
  () => {
    diagram.animationManager.isEnabled = !diagram.animationManager.isEnabled;
    motionBtn.textContent = diagram.animationManager.isEnabled
      ? '⏸ Reducir movimiento'
      : '▶ Activar animaciones';
  },
);

// Alto contraste: mismo cambio que ocurre solo si el SO pide más contraste.
let highContrast = false;
mk('◐ Alto contraste', 'border:1px solid #90a4ae;background:#eceff1;color:#37474f;', () => {
  highContrast = !highContrast;
  diagram.selectionStyle = highContrast ? go.highContrastSelectionStyle : go.defaultSelectionStyle;
  diagram.invalidate();
});

mk('↻ Animar Nodo A', 'border:1px solid #81c784;background:#e8f5e9;color:#1b5e20;', () => {
  const node = diagram.findNodeForKey(1);
  if (!node) return;
  const fromX = node.bounds.x;
  const toX = Math.abs(fromX - 40) < 1 ? 100 : 40;
  diagram.animationManager.animate(
    { x: fromX },
    { x: toX },
    (values) => {
      node.bounds.x = values.x;
      diagram.invalidate();
    },
    { duration: 600, easing: 'easeInOutQuad' },
  );
});

root.appendChild(bar);
root.appendChild(log);
diagram.zoomToFit();

window.__diagram = diagram;
