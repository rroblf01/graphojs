// @vitest-environment jsdom
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { Rect } from '../../src/geometry/Rect.ts';
import {
  computeJumpoverPoints,
  type RoutingObstacle,
  routeOrthogonalAvoidingObstacles,
  splitPathAtJumps,
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

describe('Obstacle Avoidance Routing', () => {
  it('routes around a single obstacle', () => {
    const from = { x: 0, y: 50 };
    const to = { x: 200, y: 50 };
    const fromNode = new Rect(-10, 40, 20, 20);
    const toNode = new Rect(190, 40, 20, 20);
    const obstacles: RoutingObstacle[] = [{ x: 80, y: 30, width: 40, height: 40 }];

    const points = routeOrthogonalAvoidingObstacles(from, to, fromNode, toNode, obstacles, 0);
    expect(points.length).toBeGreaterThanOrEqual(3);
    expect(points[0]).toEqual(from);
    expect(points[points.length - 1]).toEqual(to);

    // Verify path doesn't pass through the obstacle
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      // Check if segment intersects obstacle
      const obs = obstacles[0];
      if (!obs) continue;
      const intersects =
        a.x >= obs.x && a.x <= obs.x + obs.width && a.y >= obs.y && a.y <= obs.y + obs.height;
      expect(intersects).toBe(false);
    }
  });

  it('uses direct path when no obstacles block', () => {
    const from = { x: 0, y: 50 };
    const to = { x: 200, y: 50 };
    const fromNode = new Rect(-10, 40, 20, 20);
    const toNode = new Rect(190, 40, 20, 20);
    const obstacles: RoutingObstacle[] = [
      { x: 80, y: 100, width: 40, height: 40 }, // Not in the way
    ];

    const points = routeOrthogonalAvoidingObstacles(from, to, fromNode, toNode, obstacles, 0);
    // Should use standard orthogonal routing
    expect(points.length).toBeGreaterThanOrEqual(2);
    expect(points[0]).toEqual(from);
    expect(points[points.length - 1]).toEqual(to);
  });

  it('handles multiple obstacles', () => {
    const from = { x: 0, y: 100 };
    const to = { x: 300, y: 100 };
    const fromNode = new Rect(-10, 90, 20, 20);
    const toNode = new Rect(290, 90, 20, 20);
    const obstacles: RoutingObstacle[] = [
      { x: 80, y: 80, width: 40, height: 40 },
      { x: 160, y: 80, width: 40, height: 40 },
    ];

    const points = routeOrthogonalAvoidingObstacles(from, to, fromNode, toNode, obstacles, 0);
    expect(points.length).toBeGreaterThanOrEqual(3);
    expect(points[0]).toEqual(from);
    expect(points[points.length - 1]).toEqual(to);
  });
});

describe('Jumpover', () => {
  it('computeJumpoverPoints finds intersections', () => {
    const link1 = [
      { x: 0, y: 50 },
      { x: 100, y: 50 },
    ];
    const link2 = [
      { x: 50, y: 0 },
      { x: 50, y: 100 },
    ];

    const jumps = computeJumpoverPoints(link1, link2, 10);
    expect(jumps.length).toBe(1);
    expect(jumps[0]!.position.x).toBe(50);
    expect(jumps[0]!.position.y).toBe(50);
  });

  it('computeJumpoverPoints returns empty for parallel links', () => {
    const link1 = [
      { x: 0, y: 50 },
      { x: 100, y: 50 },
    ];
    const link2 = [
      { x: 0, y: 60 },
      { x: 100, y: 60 },
    ];

    const jumps = computeJumpoverPoints(link1, link2, 10);
    expect(jumps.length).toBe(0);
  });

  it('splitPathAtJumps creates gaps', () => {
    const points = [
      { x: 0, y: 50 },
      { x: 100, y: 50 },
    ];
    const jumps = [{ index: 0, position: { x: 50, y: 50 } }];

    const result = splitPathAtJumps(points, jumps, 10);
    expect(result.length).toBeGreaterThanOrEqual(4);
    // Should have a gap around x=50
  });
});

describe('Link avoidObstacles property', () => {
  it('should render links with avoidObstacles', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 50, height: 50 });
    model.addNode({ key: 2, x: 200, y: 0, width: 50, height: 50 });
    model.addNode({ key: 3, x: 100, y: -20, width: 50, height: 50 }); // Obstacle
    model.addLink({ key: 100, from: 1, to: 2, routing: 'orthogonal', avoidObstacles: true });

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });
});
