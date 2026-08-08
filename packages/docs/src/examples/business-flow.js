// GraphoJS: flujo de negocio con DOS bucles reales (control de calidad y
// reintento del cliente), botones para disparar cada bucle, y una animación
// de progreso que "rellena" el camino recorrido hasta el punto que elijas.
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

// Colores por estado: pendiente (por defecto) vs completado (tras animar).
const PENDING = { fill: '#e3f2fd', stroke: '#1976d2' };
const DONE = { fill: '#c8e6c9', stroke: '#2e7d32' };
const LOOP_COLOR = '#e65100';

diagram.nodeTemplateMap.set(
  'step',
  $(
    go.Node,
    'Auto',
    $(
      go.Shape,
      'RoundedRectangle',
      { strokeWidth: 2, minSize: { width: 130, height: 56 } },
      new go.Binding('fill', 'fill'),
      new go.Binding('stroke', 'stroke'),
    ),
    $(
      go.TextBlock,
      { margin: 8, font: '600 12px system-ui, sans-serif', textAlign: 'center' },
      new go.Binding('text', 'label'),
      new go.Binding('stroke', 'stroke'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'decision',
  $(
    go.Node,
    'Auto',
    $(go.Shape, 'gatewayExclusive', {
      fill: '#fff3e0',
      stroke: '#f57c00',
      strokeWidth: 2,
      minSize: { width: 90, height: 90 },
    }),
    $(
      go.TextBlock,
      { margin: 4, font: '600 11px system-ui, sans-serif', textAlign: 'center' },
      new go.Binding('text', 'label'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'terminator',
  $(
    go.Node,
    'Auto',
    $(go.Shape, 'Ellipse', {
      fill: '#eceff1',
      stroke: '#546e7a',
      strokeWidth: 2,
      minSize: { width: 90, height: 56 },
    }),
    $(
      go.TextBlock,
      { margin: 6, font: '600 12px system-ui, sans-serif' },
      new go.Binding('text', 'label'),
    ),
  ),
);

diagram.linkTemplate = $(
  go.Link,
  {
    routing: 'orthogonal',
    corner: 8,
    labelFont: '600 11px system-ui, sans-serif',
    labelColor: '#546e7a',
  },
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#90a4ae', stroke: null }),
);

// El "camino feliz": 10 pasos en orden. El progreso (0-10) dice cuántos de
// estos ya están completados; la decisión final y los dos bucles de
// reintento son el desenlace, no forman parte de la barra de progreso.
const STEPS = [
  { key: 1, label: 'Cliente llama' },
  { key: 2, label: 'Comercial contacta' },
  { key: 3, label: 'Solicita datos' },
  { key: 4, label: 'Prepara contrato' },
  { key: 5, label: 'Cliente firma contrato' },
  { key: 6, label: 'Contrato a producción' },
  { key: 7, label: 'Fabricamos producto' },
  { key: 8, label: 'Control de calidad' },
  { key: 9, label: 'Enviamos al cliente' },
  { key: 10, label: 'Cliente da su opinión' },
];

const positions = {
  1: { x: 40, y: 40 },
  2: { x: 230, y: 40 },
  3: { x: 420, y: 40 },
  4: { x: 610, y: 40 },
  5: { x: 800, y: 40 },
  6: { x: 800, y: 180 },
  7: { x: 610, y: 180 },
  8: { x: 420, y: 180 },
  9: { x: 230, y: 180 },
  10: { x: 40, y: 180 },
};

const nodeDataArray = [
  ...STEPS.map((s) => ({
    key: s.key,
    category: 'step',
    label: s.label,
    fill: PENDING.fill,
    stroke: PENDING.stroke,
    ...positions[s.key],
  })),
  { key: 'decision', category: 'decision', label: '¿Satisfecho?', x: 40, y: 320 },
  { key: 'fin', category: 'terminator', label: 'Fin', x: 230, y: 335 },
];

// Enlaces del camino principal (1→2→...→10), la salida a la decisión final,
// y DOS bucles reales:
//  - "loopQuality": si el control de calidad (8) encuentra un defecto, se
//    vuelve a fabricar (7) en vez de seguir hacia envío.
//  - "loopRetry": si el cliente no queda satisfecho al final, se vuelve a
//    preparar el contrato (4) en vez de terminar.
const linkDataArray = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8 },
  { from: 8, to: 9 },
  { from: 9, to: 10 },
  { from: 8, to: 7, label: 'Defecto', loop: 'loopQuality' },
  { from: 10, to: 'decision' },
  { from: 'decision', to: 'fin', label: 'Sí' },
  { from: 'decision', to: 4, label: 'No', loop: 'loopRetry' },
];

diagram.model = new go.GraphLinksModel({ nodeDataArray, linkDataArray });

// Los dos enlaces de bucle se distinguen por color y grosor — se buscan
// *después* de asignar el modelo, cuando ya existen los Links.
const model = diagram.getModel();
const loopLinks = {};
for (const link of diagram.allLinks) {
  if (link.data?.loop) {
    link.stroke = LOOP_COLOR;
    link.strokeWidth = 3;
    loopLinks[link.data.loop] = link;
  }
}

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:52px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;white-space:pre-wrap;';
log.textContent = 'Elige hasta qué paso animar y pulsa "▶ Animar".';

// Leyenda siempre visible — no depende de haber pulsado nada todavía.
const legend = document.createElement('div');
legend.style.cssText =
  'display:flex;gap:14px;margin:0 8px 4px;flex-wrap:wrap;font:600 11px system-ui, sans-serif;color:#546e7a;';
function swatch(color, text) {
  const item = document.createElement('span');
  item.style.cssText = 'display:inline-flex;align-items:center;gap:5px;';
  const dot = document.createElement('span');
  dot.style.cssText = `width:10px;height:10px;border-radius:3px;background:${color};display:inline-block;`;
  item.appendChild(dot);
  item.appendChild(document.createTextNode(text));
  legend.appendChild(item);
}
swatch(PENDING.fill, 'Pendiente');
swatch(DONE.fill, 'Completado');
swatch(LOOP_COLOR, 'Enlace de bucle (reintento)');

const bar = document.createElement('div');
bar.style.cssText = 'display:flex;gap:10px;margin:0 8px 8px;flex-wrap:wrap;align-items:center;';

const sliderLabel = document.createElement('label');
sliderLabel.style.cssText = 'font:600 12px system-ui, sans-serif;color:#37474f;';
sliderLabel.textContent = 'Progreso:';

const slider = document.createElement('input');
slider.type = 'range';
slider.min = '0';
slider.max = String(STEPS.length);
slider.value = String(Math.round(STEPS.length * 0.6)); // arranca cerca del 60% de ejemplo
slider.style.cssText = 'width:160px;';

const pctLabel = document.createElement('span');
pctLabel.style.cssText = 'font:700 12px system-ui, sans-serif;color:#1976d2;min-width:3.5em;';
function refreshPctLabel() {
  const n = Number(slider.value);
  const pct = Math.round((n / STEPS.length) * 100);
  pctLabel.textContent = `${pct}% (${n}/${STEPS.length})`;
}
slider.addEventListener('input', refreshPctLabel);
refreshPctLabel();

function resetStyles() {
  for (const s of STEPS) {
    const node = diagram.findNodeForKey(s.key);
    if (!node) continue;
    model.setDataProperty(node.data, 'fill', PENDING.fill);
    model.setDataProperty(node.data, 'stroke', PENDING.stroke);
  }
  for (const link of diagram.allLinks) {
    if (link.data?.loop) continue;
    link.stroke = '#90a4ae';
    link.strokeWidth = 2;
  }
  diagram.invalidate();
}

let animationToken = 0;

// Anima el "relleno" de progreso paso a paso hasta `target`. `note`, si se
// da, se muestra como primera línea del log (usado por los botones de
// bucle para explicar qué disparó el rebobinado).
function animateProgress(target, note) {
  const myToken = ++animationToken; // cancela cualquier animación anterior en curso
  resetStyles();
  let i = 0;
  const tick = () => {
    if (myToken !== animationToken || i >= target) {
      const done = STEPS.slice(0, target).map((s) => s.label);
      const pending = STEPS.slice(target).map((s) => s.label);
      log.textContent =
        (note ? `${note}\n\n` : '') +
        `Progreso: ${target}/${STEPS.length} (${Math.round((target / STEPS.length) * 100)}%)\n` +
        `✅ Hecho: ${done.join(' → ') || '(nada aún)'}\n` +
        `⏳ Pendiente: ${pending.join(' → ') || '(nada, proceso completo)'}`;
      return;
    }
    const step = STEPS[i];
    const node = diagram.findNodeForKey(step.key);
    if (node) {
      model.setDataProperty(node.data, 'fill', DONE.fill);
      model.setDataProperty(node.data, 'stroke', DONE.stroke);
    }
    if (i > 0) {
      const prevKey = STEPS[i - 1].key;
      const link = diagram.allLinks.find(
        (l) => l.data?.from === prevKey && l.data?.to === step.key,
      );
      if (link) {
        link.stroke = '#2e7d32';
        link.strokeWidth = 3;
      }
    }
    diagram.invalidate();
    i++;
    setTimeout(tick, 260);
  };
  tick();
}

// Dispara un bucle: hace parpadear su enlace un momento (para que se vea
// *cuál* bucle se ha activado) y luego rebobina el progreso hasta justo
// antes del paso destino, para que se pueda repetir desde ahí.
function triggerLoop(loopKey, destKey, reason) {
  animationToken++; // corta cualquier animación de progreso en curso
  const link = loopLinks[loopKey];
  if (!link) return;
  const rewindTarget = STEPS.findIndex((s) => s.key === destKey);
  let flashes = 0;
  const flashTick = () => {
    link.strokeWidth = flashes % 2 === 0 ? 6 : 3;
    diagram.invalidate();
    flashes++;
    if (flashes < 6) {
      setTimeout(flashTick, 130);
    } else {
      link.strokeWidth = 3;
      slider.value = String(rewindTarget);
      refreshPctLabel();
      animateProgress(rewindTarget, reason);
    }
  };
  flashTick();
}

const mk = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  bar.appendChild(b);
  return b;
};

bar.appendChild(sliderLabel);
bar.appendChild(slider);
bar.appendChild(pctLabel);
mk('▶ Animar', 'border:1px solid #81c784;background:#e8f5e9;color:#1b5e20;', () => {
  animateProgress(Number(slider.value));
});
mk('↺ Reiniciar', 'border:1px solid #90a4ae;background:#eceff1;color:#37474f;', () => {
  animationToken++; // corta cualquier animación en curso
  resetStyles();
  log.textContent = 'Elige hasta qué paso animar y pulsa "▶ Animar".';
});

const loopBar = document.createElement('div');
loopBar.style.cssText = 'display:flex;gap:10px;margin:0 8px 8px;flex-wrap:wrap;align-items:center;';
const mkLoop = (label, css, fn) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:6px 14px;font:600 12px system-ui, sans-serif;border-radius:6px;cursor:pointer;${css}`;
  b.addEventListener('click', fn);
  loopBar.appendChild(b);
  return b;
};
mkLoop(
  '🔁 Defecto en control de calidad',
  `border:1px solid ${LOOP_COLOR};background:#fbe9e7;color:${LOOP_COLOR};`,
  () => {
    triggerLoop(
      'loopQuality',
      7,
      '🔁 Bucle "Defecto": el control de calidad falla y volvemos a fabricar el producto.',
    );
  },
);
mkLoop(
  '🔁 Cliente no satisfecho',
  `border:1px solid ${LOOP_COLOR};background:#fbe9e7;color:${LOOP_COLOR};`,
  () => {
    triggerLoop(
      'loopRetry',
      4,
      '🔁 Bucle "No satisfecho": el cliente rechaza el resultado y volvemos a preparar el contrato.',
    );
  },
);

root.appendChild(legend);
root.appendChild(bar);
root.appendChild(loopBar);
root.appendChild(log);
diagram.zoomToFit();

window.__diagram = diagram;
