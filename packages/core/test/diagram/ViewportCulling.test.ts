// @vitest-environment jsdom
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { Rect } from '../../src/geometry/Rect.ts';
import { Node } from '../../src/parts/Node.ts';
import { VirtualizationManager } from '../../src/spatial/VirtualizationManager.ts';

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

describe('Automatic viewport culling', () => {
  it('should render many nodes without errors', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        model.addNode({ key: i * 10 + j, x: i * 100, y: j * 100, width: 50, height: 50 });
      }
    }

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should handle zoom and pan with many nodes', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    for (let i = 0; i < 20; i++) {
      model.addNode({ key: i, x: i * 100, y: 0, width: 50, height: 50 });
    }

    expect(() => diagram.zoomToFit()).not.toThrow();
    expect(() => diagram.setViewport(0, 0, 0.5)).not.toThrow();
    expect(() => diagram.setViewport(100, 100, 2)).not.toThrow();
    diagram.destroy();
  });

  it('VirtualizationManager.cull returns all parts when disabled', () => {
    const viz = new VirtualizationManager(new Rect(-1000, -1000, 2000, 2000));
    viz.isEnabled = false;

    const part1 = new Node(1, new Rect(0, 0, 10, 10));
    const part2 = new Node(2, new Rect(5000, 5000, 10, 10));
    const parts = [part1, part2];

    const viewport = new Rect(-100, -100, 200, 200);
    const result = viz.cull(viewport, parts);
    expect(result).toHaveLength(2);
  });

  it('VirtualizationManager.cull returns only visible parts when enabled', () => {
    const viz = new VirtualizationManager(new Rect(-1000, -1000, 12000, 12000));
    viz.isEnabled = true;

    const part1 = new Node(1, new Rect(0, 0, 10, 10));
    const part2 = new Node(2, new Rect(5000, 5000, 10, 10));
    viz.insert(part1);
    viz.insert(part2);

    const viewport = new Rect(-100, -100, 200, 200);
    const result = viz.cull(viewport);
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe(1);
  });

  it('VirtualizationManager rebuilds index correctly', () => {
    const viz = new VirtualizationManager(new Rect(-1000, -1000, 12000, 12000));
    viz.isEnabled = true;

    const part1 = new Node(1, new Rect(0, 0, 10, 10));
    const part2 = new Node(2, new Rect(100, 100, 10, 10));

    viz.insert(part1);
    expect(viz.itemCount).toBe(1);

    // Rebuild with new parts
    viz.rebuild([part1, part2], new Rect(-1000, -1000, 12000, 12000));
    expect(viz.itemCount).toBe(2);
  });

  it('VirtualizationManager createViewport works correctly', () => {
    const vp = VirtualizationManager.createViewport(100, 200, 800, 600, 50);
    expect(vp.x).toBe(50);
    expect(vp.y).toBe(150);
    expect(vp.width).toBe(900);
    expect(vp.height).toBe(700);
  });
});
