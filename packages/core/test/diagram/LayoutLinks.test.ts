// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { CircularLayout } from '../../src/layout/CircularLayout.ts';
import { GridLayout } from '../../src/layout/GridLayout.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';

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
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    globalAlpha: 1,
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
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

afterAll(() => {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
});

function makeDiagram(nodeCount: number) {
  const div = document.createElement('div');
  const diagram = new Diagram({ div });
  const nodeDataArray = Array.from({ length: nodeCount }, (_, i) => ({
    key: i,
    x: 0,
    y: 0,
    width: 100,
    height: 50,
  }));
  const linkDataArray = Array.from({ length: nodeCount }, (_, i) => ({
    from: i,
    to: (i + 1) % nodeCount,
  }));
  diagram.setModel(new GraphLinksModel({ nodeDataArray, linkDataArray }));
  return diagram;
}

describe('Layout recomputes link endpoints', () => {
  it('recomputes from/to ports after layoutDiagram so links do not keep origin ports', () => {
    const diagram = makeDiagram(8);
    diagram.layout = new CircularLayout({ radius: 130 });
    diagram.layoutDiagram();

    const links = Array.from(diagram.links.values());
    expect(links.length).toBe(8);
    for (const link of links) {
      // Nodes moved away from (0,0); ports must follow, not stay at the
      // (0,0)-origin-based center (50,25).
      expect(Math.hypot(link.fromPort.x - 50, link.fromPort.y - 25)).toBeGreaterThan(10);
      expect(Math.hypot(link.toPort.x - 50, link.toPort.y - 25)).toBeGreaterThan(10);
    }
    diagram.destroy();
  });

  it('clears cached path points so the renderer re-routes the new geometry', () => {
    const diagram = makeDiagram(3);
    diagram.layout = new GridLayout({ spacingX: 80, spacingY: 80 });
    diagram.layoutDiagram();

    for (const link of diagram.links.values()) {
      expect(link.pathPoints.length).toBe(0);
    }
    diagram.destroy();
  });
});

describe('zoomToFit centers content', () => {
  it('keeps the whole content on-screen when the aspect ratios differ', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    // content spans x:60..580, y:60..120 (wide + short) in an 800x600 canvas
    model.addNode({ key: 1, x: 60, y: 60, width: 520, height: 60 });
    model.addNode({ key: 2, x: 60, y: 100, width: 40, height: 20 });

    diagram.zoomToFit();

    const viewport = diagram.getViewport();
    for (const node of diagram.nodes.values()) {
      expect(node.bounds.x).toBeGreaterThanOrEqual(viewport.x);
      expect(node.bounds.right).toBeLessThanOrEqual(viewport.x + viewport.width);
      expect(node.bounds.y).toBeGreaterThanOrEqual(viewport.y);
      expect(node.bounds.bottom).toBeLessThanOrEqual(viewport.y + viewport.height);
    }
    diagram.destroy();
  });

  it('centers the content bounding box on the viewport', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 60, y: 60, width: 520, height: 60 });

    diagram.zoomToFit();

    const viewport = diagram.getViewport();
    const content = { x: 10, y: 10, width: 620, height: 160 }; // bounds + padding 50
    const viewCenterX = viewport.x + viewport.width / 2;
    const viewCenterY = viewport.y + viewport.height / 2;
    expect(viewCenterX).toBeCloseTo(content.x + content.width / 2, 0);
    expect(viewCenterY).toBeCloseTo(content.y + content.height / 2, 0);
    diagram.destroy();
  });
});
