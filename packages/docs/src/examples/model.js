// GraphoJS model: add/edit/remove nodes and links programmatically.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'Rectangle', { fill: '#e3f2fd', stroke: '#1976d2', strokeWidth: 2 }),
  $(go.TextBlock, 'label', { margin: 8 }, new go.Binding('text', 'label')),
);
diagram.linkTemplate = $(go.Link, $(go.Shape, { stroke: '#666', strokeWidth: 2 }));

const model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'A' },
    { key: 2, label: 'B' },
  ],
  linkDataArray: [{ from: 1, to: 2 }],
});
diagram.model = model;

// Add a node programmatically (GoJS-style API).
model.addNodeData({ key: 3, label: 'C' });
model.addLinkData({ from: 2, to: 3 });

// Update a node's data reactively.
model.setDataProperty(model.getNodeDataArray()[0], 'label', 'A (editado)');

window.__diagram = diagram;
