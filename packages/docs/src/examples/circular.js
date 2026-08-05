// GraphoJS: layout circular con nodos coloridos en un anillo.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

const palette = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#ffc107',
  '#ff5722',
];

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(
    go.Shape,
    'Circle',
    {
      stroke: '#ffffff',
      strokeWidth: 3,
      minSize: { width: 54, height: 54 },
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowBlur: 6,
      fill: 'white',
    },
    new go.Binding('fill', 'color'),
  ),
  $(
    go.TextBlock,
    'label',
    { margin: 4, font: '700 12px system-ui, sans-serif', stroke: '#fff' },
    new go.Binding('text', 'label'),
  ),
);

const N = 8;
const nodes = [];
for (let i = 0; i < N; i++) {
  nodes.push({ key: i, label: `${i + 1}`, color: palette[i % palette.length] });
}
const links = [];
for (let i = 0; i < N; i++) {
  links.push({ from: i, to: (i + 1) % N });
}

diagram.model = new go.GraphLinksModel({ nodeDataArray: nodes, linkDataArray: links });
diagram.linkTemplate = $(
  go.Link,
  { routing: 'curved' },
  $(go.Shape, { stroke: '#cfd8dc', strokeWidth: 2 }),
);

diagram.layout = new go.CircularLayout({ radius: 130 });
diagram.layoutDiagram();
diagram.zoomToFit();
window.__diagram = diagram;
