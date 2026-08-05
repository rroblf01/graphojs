// GraphoJS + React/Vue: the wrapper components render the same core.
// This playground demonstrates the core diagram; the React/Vue wrappers
// (@graphojs/react, @graphojs/vue) mount this exact Diagram in a component.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: '#ede7f6', stroke: '#5e35b1', strokeWidth: 2 }),
  $(go.TextBlock, 'label', { margin: 8 }, new go.Binding('text', 'label')),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'React' },
    { key: 2, label: 'Vue' },
  ],
  linkDataArray: [{ from: 1, to: 2 }],
});

// initDiagram hook (same callback the React/Vue wrappers expose).
window.__onDiagramInit = (d) => {
  d.zoomToFit();
};

window.__diagram = diagram;
