// GraphoJS: diagrama de Gantt con tareas, dependencias e hitos (flag).
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

const DAY = 24; // px por día
const ROW = 48; // px por fila
const HEADER = 30; // alto de la regla de días

diagram.nodeTemplateMap.set(
  'tick',
  $(
    go.Node,
    'Auto',
    { selectable: false, draggable: false, deletable: false },
    $(
      go.TextBlock,
      { font: '11px system-ui, sans-serif', stroke: '#78909c' },
      new go.Binding('text', 'label'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'task',
  $(
    go.Node,
    'Auto',
    $(go.Shape, 'RoundedRectangle', { fill: '#42a5f5', stroke: '#1565c0', strokeWidth: 1 }),
    $(
      go.TextBlock,
      { margin: 6, font: '600 11px system-ui, sans-serif', stroke: 'white' },
      new go.Binding('text', 'label'),
    ),
  ),
);
diagram.nodeTemplateMap.set(
  'milestone',
  $(go.Node, 'Auto', $(go.Shape, 'flag', { fill: '#fb8c00', stroke: '#e65100', strokeWidth: 1 })),
);
diagram.nodeTemplateMap.set(
  'milestoneLabel',
  $(
    go.Node,
    'Auto',
    { selectable: false, draggable: false, deletable: false },
    $(
      go.TextBlock,
      { font: '600 11px system-ui, sans-serif', stroke: '#e65100' },
      new go.Binding('text', 'label'),
    ),
  ),
);

diagram.linkTemplate = $(
  go.Link,
  { routing: 'orthogonal', corner: 4 },
  $(go.Shape, { stroke: '#90a4ae', strokeWidth: 1.5 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#90a4ae', stroke: null, arrowheadSize: 6 }),
);

// Tareas: día de inicio (start) y duración en días; row = fila vertical.
const tasks = [
  { key: 1, name: 'Diseño', start: 0, duration: 3, row: 0 },
  { key: 2, name: 'Desarrollo', start: 3, duration: 5, row: 1, dependsOn: 1 },
  { key: 3, name: 'Pruebas', start: 8, duration: 3, row: 2, dependsOn: 2 },
  { key: 4, name: 'Lanzamiento', start: 11, duration: 0, row: 3, dependsOn: 3, milestone: true },
];

const nodeDataArray = [
  { key: 'tick0', category: 'tick', x: 2, y: 6, width: 40, height: 18, label: 'Día 0' },
  { key: 'tick5', category: 'tick', x: 2 + 5 * DAY, y: 6, width: 40, height: 18, label: 'Día 5' },
  {
    key: 'tick10',
    category: 'tick',
    x: 2 + 10 * DAY,
    y: 6,
    width: 40,
    height: 18,
    label: 'Día 10',
  },
];

const linkDataArray = [];
for (const t of tasks) {
  const x = t.start * DAY;
  const y = HEADER + t.row * ROW;
  if (t.milestone) {
    nodeDataArray.push({ key: t.key, category: 'milestone', x, y: y + 3, width: 28, height: 28 });
    nodeDataArray.push({
      key: `${t.key}-label`,
      category: 'milestoneLabel',
      x: x + 34,
      y: y + 8,
      width: 120,
      height: 20,
      label: t.name,
    });
  } else {
    nodeDataArray.push({
      key: t.key,
      category: 'task',
      x,
      y,
      width: t.duration * DAY,
      height: 34,
      label: t.name,
    });
  }
  if (t.dependsOn) linkDataArray.push({ from: t.dependsOn, to: t.key });
}

diagram.model = new go.GraphLinksModel({ nodeDataArray, linkDataArray });
diagram.zoomToFit();
window.__diagram = diagram;
