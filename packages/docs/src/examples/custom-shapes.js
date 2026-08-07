// GraphoJS: figuras 100% personalizadas con geometryString (mini-lenguaje SVG).
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
    {
      fill: '#e1f5fe',
      stroke: '#0277bd',
      strokeWidth: 2,
      minSize: { width: 100, height: 80 },
    },
    new go.Binding('geometryString', 'geometry'),
  ),
  $(
    go.TextBlock,
    'label',
    { margin: 4, font: '600 11px system-ui, sans-serif', stroke: '#01579b' },
    new go.Binding('text', 'label'),
  ),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    // Triángulo: M(oveto) + L(ineto) + Z(close)
    { key: 1, label: 'Triángulo', geometry: 'M50,0 L100,80 L0,80 Z', x: 40, y: 40 },
    // Chevron: solo líneas, sin cerrar la figura del todo
    {
      key: 2,
      label: 'Chevron',
      geometry: 'M0,0 L60,0 L100,40 L60,80 L0,80 L40,40 Z',
      x: 220,
      y: 40,
    },
    // Nube: curvas Bézier (C) encadenadas
    {
      key: 3,
      label: 'Nube',
      geometry:
        'M20,60 C0,60 0,30 25,30 C25,10 55,10 60,25 C85,15 100,35 90,50 C100,60 85,75 70,70 C60,85 30,80 25,65 Z',
      x: 420,
      y: 40,
    },
    // Media luna: arco elíptico (A)
    {
      key: 4,
      label: 'Media luna',
      geometry: 'M50,0 A40,40 0 1,1 50,80 A55,40 0 1,0 50,0 Z',
      x: 40,
      y: 180,
    },
  ],
  linkDataArray: [],
});

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';
log.textContent = 'Cada figura viene de un geometryString distinto en el modelo (M/L/C/A/Z).';
root.appendChild(log);
diagram.zoomToFit();

window.__diagram = diagram;
