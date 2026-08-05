// GraphoJS: figuras de Shape variadas y coloridas.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

// Nodo que muestra una figura a partir de data.figure
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'Rectangle', {
    stroke: '#37474f',
    strokeWidth: 2,
    minSize: { width: 90, height: 90 },
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowBlur: 6,
    fill: 'white',
  }, new go.Binding('figure', 'figure'), new go.Binding('fill', 'fill')),
  $(go.TextBlock, 'label', { margin: 6, font: '700 12px system-ui, sans-serif', stroke: '#263238' },
    new go.Binding('text', 'label')),
);

const figures = [
  ['Rectangle', '#e3f2fd'],
  ['RoundedRectangle', '#fce4ec'],
  ['Ellipse', '#e8f5e9'],
  ['Diamond', '#fff8e1'],
  ['Triangle', '#f3e5f5'],
  ['Hexagon', '#e0f2f1'],
  ['Star', '#fffde7'],
  ['Cross', '#ffebee'],
];

const nodes = figures.map(([figure, fill], i) => ({
  key: i,
  figure: figure.toLowerCase(),
  fill,
  label: figure,
}));

diagram.model = new go.GraphLinksModel({ nodeDataArray: nodes, linkDataArray: [] });
diagram.layout = new go.GridLayout({ spacingX: 30, spacingY: 30 });
diagram.layoutDiagram();
diagram.zoomToFit();
window.__diagram = diagram;
