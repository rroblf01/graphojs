// @vitest-environment jsdom
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import type { Node } from '../../src/parts/Node.ts';

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

describe('Render batching optimizations', () => {
  it('should render nodes with z-order without errors', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 50, y: 0, width: 100, height: 50 });
    model.setNodeProperty(2, 'zOrder', 10);

    // Force a render
    expect(() => diagram.zoomToFit()).not.toThrow();
    expect(() => diagram.setViewport(0, 0, 1)).not.toThrow();
    diagram.destroy();
  });

  it('should render nodes with layer opacity', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });

    // Set a layer opacity below 1 to exercise the save/restore path
    const layer = diagram.getLayer('Default');
    if (layer) layer.opacity = 0.5;

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should render links without errors', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
    model.addLink({ key: 100, from: 1, to: 2 });

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should render with both layer opacity and z-order', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 100, y: 0, width: 100, height: 50 });
    model.setNodeProperty(2, 'zOrder', 5);

    const layer = diagram.getLayer('Default');
    if (layer) layer.opacity = 0.8;

    expect(() => diagram.zoomToFit()).not.toThrow();
    diagram.destroy();
  });

  it('should preserve z-order sorting for overlapping nodes', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 0, y: 0, width: 100, height: 50 });
    model.setNodeProperty(2, 'zOrder', 10);

    const node1 = diagram.getPart(1) as Node;
    const node2 = diagram.getPart(2) as Node;
    expect(node1.zOrder).toBe(0);
    expect(node2.zOrder).toBe(10);
    expect(node2.zOrder).toBeGreaterThan(node1.zOrder);

    diagram.destroy();
  });
});
