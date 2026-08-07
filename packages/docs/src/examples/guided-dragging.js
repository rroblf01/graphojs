// GraphoJS: guías de alineación al arrastrar (snapping a bordes/centros de otros nodos).
import * as go from 'graphojs/go';

const $ = go.GraphObject.make;

const root = document.getElementById('graphojs-root');
root.style.display = 'flex';
root.style.flexDirection = 'column';

const diagramHost = document.createElement('div');
diagramHost.style.cssText = 'flex:1 1 auto;min-height:0;position:relative;';
root.appendChild(diagramHost);

const diagram = new go.Diagram(diagramHost);
diagram.background = '#fafbfc';

diagram.nodeTemplate = $(
  go.Node,
  'Auto',
  $(go.Shape, 'RoundedRectangle', {
    fill: '#e8eaf6',
    stroke: '#3949ab',
    strokeWidth: 2,
    minSize: { width: 100, height: 60 },
  }),
  $(
    go.TextBlock,
    'label',
    { margin: 6, font: '600 12px system-ui, sans-serif', stroke: '#283593' },
    new go.Binding('text', 'label'),
  ),
);

diagram.model = new go.GraphLinksModel({
  nodeDataArray: [
    { key: 1, label: 'A', x: 40, y: 40 },
    { key: 2, label: 'B', x: 220, y: 40 },
    { key: 3, label: 'C', x: 400, y: 40 },
    { key: 4, label: 'D', x: 40, y: 180 },
    { key: 5, label: 'E (arrástrame)', x: 250, y: 260 },
  ],
  linkDataArray: [],
});

// Activar las guías de alineación en el DraggingTool por defecto.
diagram.toolManager.draggingTool.isGuidedDraggingEnabled = true;
diagram.toolManager.draggingTool.guidelineSnapDistance = 8;

const log = document.createElement('div');
log.style.cssText =
  'font:600 12px system-ui, monospace;margin:8px;padding:8px;min-height:20px;' +
  'background:#eef2f5;border-radius:6px;color:#263238;';
log.textContent =
  'Arrastra "E" cerca de los bordes o centros de A/B/C/D — aparecerán líneas guía rosas al alinearse.';
root.appendChild(log);
diagram.zoomToFit();

window.__diagram = diagram;
