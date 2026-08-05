// GraphoJS: árbol jerárquico expandible con TreeModel.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#fff3e0',
    stroke: '#ef6c00',
    strokeWidth: 2,
    minSize: { width: 110, height: 44 },
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowBlur: 4,
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 6, font: '600 12px system-ui, sans-serif', stroke: '#e65100' },
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
    { key: 1, label: 'Raíz' },
    { key: 2, parent: 1, label: 'Nivel 2a' },
    { key: 3, parent: 1, label: 'Nivel 2b' },
    { key: 4, parent: 2, label: 'Nivel 3a' },
    { key: 5, parent: 2, label: 'Nivel 3b' },
    { key: 6, parent: 3, label: 'Nivel 3c' },
    { key: 7, parent: 4, label: 'Hoja' },
  ],
  linkDataArray: [],
});

diagram.layout = new go.TreeLayout({ nodeSpacing: 40 });
diagram.layoutDiagram();
diagram.zoomToFit();
window.__diagram = diagram;
