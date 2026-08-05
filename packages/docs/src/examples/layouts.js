// GraphoJS layouts: Grid, Tree, Circular, ForceDirected.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: '#fff3e0', stroke: '#f57c00', strokeWidth: 2 }),
  $(go.TextBlock, 'label', { margin: 6 }, new go.Binding('text', 'label')),
);

// A tree-shaped graph works well with several layouts.
const nodes = [];
for (let i = 0; i < 15; i++) nodes.push({ key: i, label: `N${i}` });
const links = [];
for (let i = 1; i < 15; i++) links.push({ from: Math.floor((i - 1) / 2), to: i });

diagram.model = new go.GraphLinksModel({ nodeDataArray: nodes, linkDataArray: links });

// Change layout on demand (stored on window for the buttons below).
window.__setLayout = (name) => {
  const layouts = {
    grid: new go.GridLayout(),
    tree: new go.TreeLayout(),
    circular: new go.CircularLayout(),
    force: new go.ForceDirectedLayout({ maxIterations: 100 }),
  };
  diagram.layout = layouts[name] ?? layouts.grid;
  diagram.layoutDiagram();
  diagram.zoomToFit();
};

window.__setLayout('tree');
window.__diagram = diagram;
