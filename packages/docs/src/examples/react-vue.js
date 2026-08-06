// GraphoJS + React/Vue: los wrappers montan el mismo núcleo.
// Este playground demuestra el Diagram del core; los wrappers graphojs/react
// y graphojs/vue envuelven exactamente este componente.
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const diagram = new go.Diagram('graphojs-root');
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#ede7f6',
    stroke: '#5e35b1',
    strokeWidth: 2,
    minSize: { width: 110, height: 44 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 6, font: '600 12px system-ui, sans-serif', stroke: '#4527a0' },
    new go.Binding('text', 'label'),
  ),
);
diagram.linkTemplate = $(
  go.Link,
  $(go.Shape, { stroke: '#b39ddb', strokeWidth: 2 }),
  $(go.Shape, { toArrow: 'Triangle', fill: '#5e35b1', stroke: null }),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'React', x: 40, y: 40 },
    { key: 2, label: 'Vue', x: 320, y: 40 },
    { key: 3, label: 'Core', x: 180, y: 200 },
  ],
  linkDataArray: [
    { from: 3, to: 1 },
    { from: 3, to: 2 },
  ],
});

// Hook initDiagram (el mismo callback que exponen los wrappers)
diagram.zoomToFit();
window.__diagram = diagram;
