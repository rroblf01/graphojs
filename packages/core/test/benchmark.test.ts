// @vitest-environment jsdom
/**
 * Performance benchmark for large graphs.
 * Run with: npx vitest run packages/core/test/benchmark.test.ts
 * These are informational benchmarks, not strict correctness tests.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Diagram,
  ForceDirectedLayout,
  GraphLinksModel,
  GridLayout,
  TreeLayout,
} from '../src/index.ts';

function mockContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    ellipse: vi.fn(),
    arc: vi.fn(),
    arcTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    clip: vi.fn(),
    closePath: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    top: 0,
    left: 0,
    right: 800,
    bottom: 600,
  })) as unknown as typeof HTMLCanvasElement.prototype.getBoundingClientRect;
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterAll(() => vi.restoreAllMocks());

describe('Large graph performance', () => {
  it('creates 2000 nodes and 2000 links in a reasonable time', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();

    const nodes = [];
    for (let i = 0; i < 2000; i++) {
      nodes.push({ key: i, x: (i % 50) * 120, y: Math.floor(i / 50) * 80, width: 100, height: 50 });
    }
    const links = [];
    for (let i = 0; i < 2000; i++) {
      const from = i % 2000;
      const to = (i * 7 + 1) % 2000;
      if (from !== to) links.push({ from, to });
    }

    const start = performance.now();
    model.nodeDataArray = nodes;
    model.linkDataArray = links;
    diagram.model = model;
    const elapsed = performance.now() - start;

    expect(diagram.getPart(1999)).not.toBeUndefined();
    const firstLink = links[0];
    expect(firstLink).toBeDefined();
    if (firstLink) {
      expect(diagram.findLinkForKey(diagram.getModel().getLinkKey(firstLink))).not.toBeNull();
    }

    // Informational: report timing. Threshold is generous (5s) to avoid flakiness.
    console.log(`[benchmark] 2000 nodes + ${links.length} links synced in ${elapsed.toFixed(1)}ms`);
    expect(elapsed).toBeLessThan(5000);
  });

  it('model sync stays usable at 50,000 nodes + 50,000 links', () => {
    // Informational ceiling test (see ROADMAP.md Phase 2): the largest scale
    // GraphoJS aims to support without falling over. Generous threshold.
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();

    const nodes = [];
    for (let i = 0; i < 50000; i++) {
      nodes.push({ key: i, x: (i % 200) * 30, y: Math.floor(i / 200) * 30, width: 20, height: 20 });
    }
    const links = [];
    for (let i = 0; i < 50000; i++) {
      const from = i % 50000;
      const to = (i * 7 + 1) % 50000;
      if (from !== to) links.push({ from, to });
    }

    const start = performance.now();
    model.nodeDataArray = nodes;
    model.linkDataArray = links;
    diagram.model = model;
    const elapsed = performance.now() - start;

    expect(diagram.getPart(49999)).not.toBeUndefined();

    console.log(
      `[benchmark] 50000 nodes + ${links.length} links synced in ${elapsed.toFixed(1)}ms`,
    );
    expect(elapsed).toBeLessThan(60000);
  }, 90000);

  it('handles rapid incremental model updates efficiently', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    diagram.model = model;

    const start = performance.now();
    for (let i = 0; i < 500; i++) {
      model.setDataProperty(model.nodeDataArray[0], 'x', i);
    }
    const elapsed = performance.now() - start;

    console.log(`[benchmark] 500 incremental updates in ${elapsed.toFixed(1)}ms`);
    expect(elapsed).toBeLessThan(2000);
  });

  it('renders 2000 nodes + 2000 links within a frame budget', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();

    const nodes = [];
    for (let i = 0; i < 2000; i++) {
      nodes.push({
        key: i,
        x: (i % 50) * 120,
        y: Math.floor(i / 50) * 80,
        width: 100,
        height: 50,
        label: `N${i}`,
      });
    }
    const links = [];
    for (let i = 0; i < 2000; i++) {
      const f = i % 2000;
      const t = (i * 7 + 1) % 2000;
      if (f !== t) links.push({ from: f, to: t });
    }
    model.nodeDataArray = nodes;
    model.linkDataArray = links;
    diagram.model = model;

    const start = performance.now();
    for (let i = 0; i < 5; i++) (diagram as unknown as { render(): void }).render();
    const avg = (performance.now() - start) / 5;

    console.log(
      `[benchmark] avg render ${avg.toFixed(2)}ms for 2000 nodes + ${links.length} links`,
    );
    expect(avg).toBeLessThan(50);
  });

  it('repeated renders of a static (unmoved) 20,000-node diagram skip re-rebuilding the virtualization index', () => {
    // See ROADMAP.md Phase 2: the virtualization spatial index used to be
    // rebuilt from scratch on every single render() call, even when nothing
    // had moved since the last frame (e.g. a plain pan/zoom). It's now only
    // rebuilt when parts actually change, so repeated static renders should
    // be dramatically cheaper on average than the first one.
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    const nodes = [];
    for (let i = 0; i < 20000; i++) {
      nodes.push({ key: i, x: (i % 200) * 30, y: Math.floor(i / 200) * 30, width: 20, height: 20 });
    }
    model.nodeDataArray = nodes;
    diagram.model = model;

    const render = (diagram as unknown as { render(): void }).render.bind(diagram);
    render(); // first render: builds the index for the first time

    const start = performance.now();
    for (let i = 0; i < 20; i++) render();
    const avgRepeated = (performance.now() - start) / 20;

    console.log(`[benchmark] 20000 static nodes: avg repeated render ${avgRepeated.toFixed(2)}ms`);
    // Generous bound: a full quadtree rebuild of 20k items every frame would
    // regularly exceed this; skipping it when nothing moved should not.
    expect(avgRepeated).toBeLessThan(20);
  });

  it('runs layouts on large graphs efficiently', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    const nodes: Array<{ key: number; x: number; y: number; width: number; height: number }> = [];
    for (let i = 0; i < 2000; i++) {
      nodes.push({ key: i, x: (i % 50) * 120, y: Math.floor(i / 50) * 80, width: 100, height: 50 });
    }
    // Use a tree-shaped (acyclic) link structure so TreeLayout terminates.
    const links: Array<{ from: number; to: number }> = [];
    for (let i = 1; i < 2000; i++) {
      links.push({ from: Math.floor((i - 1) / 2), to: i });
    }
    model.nodeDataArray = nodes;
    model.linkDataArray = links;
    diagram.model = model;

    const parts = Array.from(diagram.nodes.values());
    const allLinks = Array.from(diagram.links.values());

    const grid = new GridLayout();
    let t = performance.now();
    grid.apply(parts, allLinks);
    const gridMs = performance.now() - t;

    const tree = new TreeLayout();
    t = performance.now();
    tree.apply(parts, allLinks);
    const treeMs = performance.now() - t;

    console.log(
      `[benchmark] grid layout on 2000 nodes ${gridMs.toFixed(1)}ms; tree layout ${treeMs.toFixed(1)}ms`,
    );
    expect(gridMs).toBeLessThan(2000);
    expect(treeMs).toBeLessThan(2000);
  });

  it('runs force-directed layout on a large graph (Barnes-Hut repulsion)', () => {
    // Before the Barnes-Hut rewrite, this took ~3.2s at just 400 nodes
    // (naive O(n^2) repulsion + an accidentally O(n^2) attraction scan); at
    // 5000 nodes the old algorithm would have taken minutes. It now
    // completes in well under a second.
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    const n = 5000;
    const nodes: Array<{ key: number; x: number; y: number; width: number; height: number }> = [];
    for (let i = 0; i < n; i++) {
      nodes.push({ key: i, x: (i % 20) * 120, y: Math.floor(i / 20) * 80, width: 100, height: 50 });
    }
    const links: Array<{ from: number; to: number }> = [];
    for (let i = 1; i < n; i++) {
      links.push({ from: Math.floor((i - 1) / 2), to: i });
    }
    model.nodeDataArray = nodes;
    model.linkDataArray = links;
    diagram.model = model;

    const parts = Array.from(diagram.nodes.values());
    const allLinks = Array.from(diagram.links.values());

    const fd = new ForceDirectedLayout({ maxIterations: 100 });
    const t = performance.now();
    fd.apply(parts, allLinks);
    const fdMs = performance.now() - t;

    console.log(`[benchmark] force-directed layout on ${n} nodes ${fdMs.toFixed(1)}ms`);
    expect(fdMs).toBeLessThan(5000);
  }, 30000);

  it('force-directed layout stays usable at 50,000 nodes', () => {
    // Informational ceiling test (see ROADMAP.md Phase 2): confirms the
    // Barnes-Hut approximation keeps this from becoming quadratic even at
    // the top of the range GraphoJS aims to support. Generous threshold —
    // this is about proving "doesn't fall over," not a tight budget.
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    const n = 50000;
    const nodes: Array<{ key: number; x: number; y: number; width: number; height: number }> = [];
    for (let i = 0; i < n; i++) {
      nodes.push({ key: i, x: (i % 100) * 30, y: Math.floor(i / 100) * 30, width: 20, height: 20 });
    }
    model.nodeDataArray = nodes;
    diagram.model = model;
    const parts = Array.from(diagram.nodes.values());

    const fd = new ForceDirectedLayout({ maxIterations: 10 });
    const t = performance.now();
    fd.apply(parts, []);
    const fdMs = performance.now() - t;

    console.log(
      `[benchmark] force-directed layout (10 iterations) on ${n} nodes ${fdMs.toFixed(1)}ms`,
    );
    expect(fdMs).toBeLessThan(30000);
  }, 60000);

  it('hit-testing findPartAt is not catastrophically slow with 2000 nodes', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    const nodes: Array<{ key: number; x: number; y: number; width: number; height: number }> = [];
    for (let i = 0; i < 2000; i++) {
      nodes.push({ key: i, x: (i % 50) * 120, y: Math.floor(i / 50) * 80, width: 100, height: 50 });
    }
    model.nodeDataArray = nodes;
    diagram.model = model;

    // Probe near the edge of a node (the worst case that triggers a full scan)
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      diagram.findPartAt(10 + (i % 100), 10 + (i % 50));
    }
    const elapsed = performance.now() - start;
    const perCall = elapsed / 1000;

    console.log(
      `[benchmark] hit-test findPartAt avg ${perCall.toFixed(3)}ms over 2000 nodes (${elapsed.toFixed(1)}ms for 1000 calls)`,
    );
    expect(perCall).toBeLessThan(5);
  });

  it('pan hot-path (setViewport + content bounds) stays responsive', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = new GraphLinksModel();
    const nodes: Array<{ key: number; x: number; y: number; width: number; height: number }> = [];
    for (let i = 0; i < 2000; i++) {
      nodes.push({ key: i, x: (i % 50) * 120, y: Math.floor(i / 50) * 80, width: 100, height: 50 });
    }
    model.nodeDataArray = nodes;
    diagram.model = model;

    const start = performance.now();
    for (let i = 0; i < 200; i++) {
      diagram.setViewport(i * 10, 0, 1);
      diagram.getContentBounds();
    }
    const elapsed = performance.now() - start;
    const perCall = elapsed / 200;

    console.log(
      `[benchmark] pan hot-path (setViewport+bounds) avg ${perCall.toFixed(3)}ms (${elapsed.toFixed(1)}ms for 200 iterations)`,
    );
    expect(perCall).toBeLessThan(10);
  });
});
