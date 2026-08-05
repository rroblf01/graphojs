// GraphoJS export: PNG image, SVG, and print.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', { fill: '#e8f5e9', stroke: '#388e3c', strokeWidth: 2 }),
  $(go.TextBlock, 'label', { margin: 8 }, new go.Binding('text', 'label')),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'PNG' },
    { key: 2, label: 'SVG' },
    { key: 3, label: 'Print' },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});

// Export buttons below the diagram.
window.__exportImage = () => {
  const url = diagram.makeImageData({ scale: 2 });
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graphojs.png';
  a.click();
};

window.__exportSvg = () => {
  const svg = diagram.makeSvg();
  const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
    type: 'image/svg+xml',
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'graphojs.svg';
  a.click();
};

window.__print = () => diagram.print();

window.__diagram = diagram;
