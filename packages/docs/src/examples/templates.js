// GraphoJS templates: customize nodes, links and groups with bindings.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: 'lightyellow',
    stroke: '#f57c00',
    strokeWidth: 2,
    minSize: { width: 120, height: 50 },
  }),
  $(go.TextBlock, { margin: 8, stroke: '#333' }, new go.Binding('text', 'name')),
  {
    // Part-level properties on the node itself
    background: 'transparent',
  },
);

diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#666', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#666', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, name: 'Alpha' },
    { key: 2, name: 'Beta' },
    { key: 3, name: 'Gamma' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});

window.__diagram = diagram;
