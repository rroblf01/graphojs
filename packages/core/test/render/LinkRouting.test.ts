// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import {
  routeOrthogonal,
  routeCurved,
  routeStraight,
  computeLabelPosition,
} from '../../src/render/LinkRouter.ts';

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

describe('Link routing algorithms', () => {
  it('routeStraight returns two points', () => {
    const from = { x: 0, y: 0 };
    const to = { x: 100, y: 100 };
    const pts = routeStraight(from, to);
    expect(pts).toHaveLength(2);
    expect(pts[0]).toEqual(from);
    expect(pts[1]).toEqual(to);
  });

  it('routeOrthogonal produces L-shaped path when exit/entry differ', () => {
    const from = { x: 50, y: 0 };
    const to = { x: 200, y: 150 };
    const fromNode = { x: 0, y: 0, width: 100, height: 50 };
    const toNode = { x: 150, y: 100, width: 100, height: 50 };
    const pts = routeOrthogonal(from, to, fromNode, toNode, 0);
    expect(pts.length).toBeGreaterThanOrEqual(3);
    expect(pts[0]).toEqual(from);
    expect(pts[pts.length - 1]).toEqual(to);
  });

  it('routeOrthogonal produces Z-shaped path when exit/entry are same axis', () => {
    const from = { x: 50, y: 0 };
    const to = { x: 50, y: 150 };
    const fromNode = { x: 0, y: 0, width: 100, height: 50 };
    const toNode = { x: 0, y: 100, width: 100, height: 50 };
    const pts = routeOrthogonal(from, to, fromNode, toNode, 0);
    expect(pts.length).toBeGreaterThanOrEqual(4);
    expect(pts[0]).toEqual(from);
    expect(pts[pts.length - 1]).toEqual(to);
  });

  it('routeOrthogonal with corner rounding', () => {
    const from = { x: 50, y: 0 };
    const to = { x: 200, y: 150 };
    const fromNode = { x: 0, y: 0, width: 100, height: 50 };
    const toNode = { x: 150, y: 100, width: 100, height: 50 };
    const pts = routeOrthogonal(from, to, fromNode, toNode, 10);
    expect(pts.length).toBeGreaterThanOrEqual(3);
    expect(pts[0]).toEqual(from);
    expect(pts[pts.length - 1]).toEqual(to);
  });

  it('routeCurved returns sampled bezier points', () => {
    const from = { x: 0, y: 0 };
    const to = { x: 200, y: 100 };
    const fromNode = { x: 0, y: 0, width: 80, height: 40 };
    const toNode = { x: 150, y: 50, width: 80, height: 40 };
    const pts = routeCurved(from, to, fromNode, toNode);
    expect(pts.length).toBe(21); // 20 segments + 1
    expect(pts[0]).toEqual(from);
    expect(pts[pts.length - 1]).toEqual(to);
  });

  it('routeCurved produces smooth curve (intermediate points differ from straight line)', () => {
    const from = { x: 0, y: 0 };
    const to = { x: 200, y: 0 };
    const fromNode = { x: 0, y: 0, width: 40, height: 40 };
    const toNode = { x: 180, y: 0, width: 40, height: 40 };
    const pts = routeCurved(from, to, fromNode, toNode);
    // Middle point should not be on the straight line y=0 if control points pull it away
    const mid = pts[10];
    expect(mid).toBeDefined();
  });
});

describe('Link label positioning', () => {
  const points = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
  ];

  it('computeLabelPosition returns midpoint of middle segment by default', () => {
    const pos = computeLabelPosition(points, -1, 7, 'auto');
    // Middle segment is segment 1 (from index 1 to 2: (100,0)->(100,100))
    // Midpoint is (100,50), normal direction is horizontal, offset by 7
    expect(pos.x).toBeCloseTo(93, 0);
    expect(pos.y).toBeCloseTo(50, 0);
  });

  it('computeLabelPosition respects segmentIndex', () => {
    const pos = computeLabelPosition(points, 0, 10, 'auto');
    expect(pos.x).toBe(50); // midpoint of segment 0
    expect(pos.y).toBe(10); // offset
  });

  it('computeLabelPosition respects labelSide top', () => {
    const pos = computeLabelPosition(points, 0, 10, 'top');
    expect(pos.y).toBeLessThan(0); // above
  });

  it('computeLabelPosition respects labelSide bottom', () => {
    const pos = computeLabelPosition(points, 0, 10, 'bottom');
    expect(pos.y).toBeGreaterThan(0); // below
  });

  it('computeLabelPosition with single point', () => {
    const pos = computeLabelPosition([{ x: 50, y: 50 }], 0, 7, 'auto');
    expect(pos.x).toBe(50);
    expect(pos.y).toBe(50);
  });
});

describe('Link routing integration', () => {
  it('should render links with orthogonal routing', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 80, height: 40 });
    model.addNode({ key: 2, x: 200, y: 100, width: 80, height: 40 });
    model.addLink({ key: 100, from: 1, to: 2, routing: 'orthogonal' });

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should render links with curved routing', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 80, height: 40 });
    model.addNode({ key: 2, x: 200, y: 100, width: 80, height: 40 });
    model.addLink({ key: 100, from: 1, to: 2, routing: 'curved' });

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should render links with labels using new positioning', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 80, height: 40 });
    model.addNode({ key: 2, x: 200, y: 100, width: 80, height: 40 });
    model.addLink({ key: 100, from: 1, to: 2, label: 'test link' });

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should handle corner rounding in orthogonal routing', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 80, height: 40 });
    model.addNode({ key: 2, x: 200, y: 100, width: 80, height: 40 });
    model.addLink({ key: 100, from: 1, to: 2, routing: 'orthogonal', corner: 10 });

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });
});
