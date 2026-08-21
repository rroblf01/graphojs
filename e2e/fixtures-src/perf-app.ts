import {
  Diagram as GoDiagram,
  GraphLinksModel,
  GraphObject,
  Panel,
  Shape,
  TextBlock,
} from 'graphojs';

const $ = GraphObject.make;

declare global {
  interface Window {
    __perf?: {
      modelSyncMs: number;
      firstRenderMs: number;
      fps: number;
      panFps: number;
      contentBoundsMs: number;
      nodes: number;
      links: number;
    };
  }
}

const NODES = 5000;

const nodeTemplate = $(
  Panel,
  'Auto',
  $(Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
  $(TextBlock, 'label', { margin: 4, fontSize: 10 }),
);

// Hook requestAnimationFrame to count how many times the diagram actually renders
let dirtyFrames = 0;
let sampleStart = 0;
const originalRaf = globalThis.requestAnimationFrame.bind(globalThis);
globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
  return originalRaf((time) => {
    // The diagram re-schedules rAF every frame; count only when it renders.
    // We approximate render frames by watching the diagram's dirty flag via a proxy-less hook:
    // count every scheduled callback while sampling.
    if (sampleStart > 0 && performance.now() - sampleStart < 1000) {
      dirtyFrames++;
    }
    cb(time);
  });
};

const container = document.getElementById('root');
if (container) {
  const diagram = new GoDiagram({ div: container as HTMLDivElement });
  diagram.nodeTemplate = nodeTemplate;

  const nodes: Array<Record<string, unknown>> = [];
  for (let i = 0; i < NODES; i++) {
    nodes.push({
      key: i,
      label: `N${i}`,
      x: (i % 100) * 90,
      y: Math.floor(i / 100) * 60,
      width: 80,
      height: 40,
    });
  }
  const links: Array<{ from: number; to: number }> = [];
  for (let i = 0; i < NODES; i++) {
    const f = i;
    const t = (i * 3 + 1) % NODES;
    if (f !== t) links.push({ from: f, to: t });
  }

  const model = new GraphLinksModel({ nodeDataArray: nodes, linkDataArray: links });

  let t0 = performance.now();
  diagram.model = model;
  const modelSyncMs = performance.now() - t0;

  // Measure the first real render frame
  await nextFrame();
  t0 = performance.now();
  diagram.requestUpdate();
  await nextFrame();
  const firstRenderMs = performance.now() - t0;

  // Sample FPS for ~1s while dirty (interaction-like churn)
  sampleStart = performance.now();
  dirtyFrames = 0;
  const churn = setInterval(() => {
    const node = diagram.findNodeForKey((Math.random() * NODES) | 0);
    if (node) node.location = { x: node.bounds.x + 1, y: node.bounds.y };
    diagram.requestUpdate();
  }, 8);
  await sleep(1100);
  clearInterval(churn);
  const fps = Math.round((dirtyFrames / (performance.now() - sampleStart)) * 1000);

  // Pan hot-path
  t0 = performance.now();
  for (let i = 0; i < 200; i++) diagram.setViewport(i * 10, 0, 1);
  const panMs = (performance.now() - t0) / 200;

  // content bounds after moving a node
  const node = diagram.findNodeForKey(0);
  if (node) node.location = { x: 0, y: 0 };
  t0 = performance.now();
  for (let i = 0; i < 50; i++) diagram.getContentBounds();
  const contentBoundsMs = (performance.now() - t0) / 50;

  window.__perf = {
    modelSyncMs,
    firstRenderMs,
    fps,
    panFps: Math.round(1000 / Math.max(0.001, panMs)),
    contentBoundsMs,
    nodes: NODES,
    links: links.length,
  };

  window.dispatchEvent(new Event('graphojs-perf-ready'));
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
