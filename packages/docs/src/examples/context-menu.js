// GraphoJS: menú contextual (clic derecho) y tooltips al pasar el ratón.
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
  new go.Binding('tooltip', 'tooltip'),
  $(go.Shape, 'RoundedRectangle', {
    fill: '#fff3e0',
    stroke: '#ef6c00',
    strokeWidth: 2,
    minSize: { width: 130, height: 50 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 8, font: '600 13px system-ui, sans-serif', stroke: '#e65100' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#ffb74d', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#ef6c00', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'Servidor web', tooltip: 'Recibe peticiones HTTP entrantes', x: 40, y: 40 },
    { key: 2, label: 'API', tooltip: 'Lógica de negocio y validación', x: 280, y: 40 },
    { key: 3, label: 'Base de datos', tooltip: 'Almacenamiento persistente', x: 520, y: 40 },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});

// Tooltips: basta con dar texto a `part.tooltip` (vía la data, arriba) y
// activarlos una vez.
diagram.enableTooltips({ delay: 300 });

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';
log.textContent = 'Clic derecho en un nodo o en el fondo para ver el menú contextual.';
root.appendChild(log);
diagram.zoomToFit();

// Menú contextual: distintos items para un nodo que para el fondo vacío.
diagram.setContextMenu(
  go.createDefaultContextMenu(diagram, {
    partItems: [
      {
        label: '🗑 Eliminar',
        action: (d, part) => {
          if (part) {
            d.getModel().removeNode(part.key);
            log.textContent = `Eliminado: ${part.data?.label ?? part.key}`;
          }
        },
      },
      {
        label: '📋 Duplicar',
        action: (d, part) => {
          if (!part) return;
          const key = d.getModel().generateKey();
          d.getModel().addNode({
            ...part.data,
            key,
            label: `${part.data.label} (copia)`,
            x: part.bounds.x + 20,
            y: part.bounds.y + 90,
          });
          log.textContent = `Duplicado: ${part.data?.label}`;
        },
      },
    ],
    backgroundItems: [
      {
        label: '➕ Añadir nodo',
        action: (d) => {
          const key = d.getModel().generateKey();
          d.getModel().addNode({ key, label: `Nodo ${key}`, x: 40, y: 200 });
          log.textContent = 'Nodo añadido desde el menú contextual';
        },
      },
    ],
  }),
);

window.__diagram = diagram;
