// GraphoJS: organigrama con TreeLayout y botones para colapsar/expandir ramas.
import * as go from 'graphojs/go';
import { TreeExpanderButton } from 'graphojs';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Panel,
  'Horizontal',
  $(
    go.Panel,
    'Auto',
    $(go.Shape, 'RoundedRectangle', {
      fill: '#e3f2fd',
      stroke: '#1565c0',
      strokeWidth: 2,
      minSize: { width: 150, height: 56 },
      shadowColor: 'rgba(0,0,0,0.12)',
      shadowBlur: 4,
    }),
    $(
      go.Panel,
      'Vertical',
      { margin: 8 },
      $(
        go.TextBlock,
        { font: '700 13px system-ui, sans-serif', stroke: '#0d47a1' },
        new go.Binding('text', 'name'),
      ),
      $(
        go.TextBlock,
        {
          font: '11px system-ui, sans-serif',
          stroke: '#1565c0',
          margin: new go.Margin(2, 0, 0, 0),
        },
        new go.Binding('text', 'title'),
      ),
    ),
  ),
  TreeExpanderButton({ background: '#ffffff', stroke: '#1565c0' }),
);

diagram.linkTemplate = $(
  go.Link,
  { routing: 'orthogonal', corner: 6 },
  $(go.Shape, { stroke: '#64b5f6', strokeWidth: 2 }),
);

const nodeDataArray = [
  { key: 1, name: 'Ana Ortiz', title: 'CEO' },
  { key: 2, parent: 1, name: 'Marta Ruiz', title: 'CTO' },
  { key: 3, parent: 1, name: 'Luis Vega', title: 'CFO' },
  { key: 4, parent: 2, name: 'Sara Gómez', title: 'Eng. Manager' },
  { key: 5, parent: 2, name: 'Iván Torres', title: 'Eng. Manager' },
  { key: 6, parent: 4, name: 'Clara Iglesias', title: 'Frontend' },
  { key: 7, parent: 4, name: 'Diego Prado', title: 'Backend' },
  { key: 8, parent: 3, name: 'Nuria Salas', title: 'Contabilidad' },
];
// TreeLayout builds the hierarchy from actual links, not from `parent` data
// properties directly — derive one link per parent/child pair.
const linkDataArray = nodeDataArray
  .filter((d) => d.parent !== undefined)
  .map((d) => ({ from: d.parent, to: d.key }));

diagram.model = new go.GraphLinksModel({ nodeDataArray, linkDataArray });

diagram.layout = new go.TreeLayout({ nodeSpacing: 30, layerSpacing: 50 });
diagram.layoutDiagram();
diagram.zoomToFit();
window.__diagram = diagram;
