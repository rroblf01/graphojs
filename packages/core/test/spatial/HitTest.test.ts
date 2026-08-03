// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';

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

afterAll(() => {
  delete (globalThis as { requestAnimationFrame?: unknown }).requestAnimationFrame;
  delete (globalThis as { cancelAnimationFrame?: unknown }).cancelAnimationFrame;
});

describe('Spatial hit-testing', () => {
  it('should find a node at its location', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 10, y: 20, width: 100, height: 50 });

    const part = diagram.findPartAt(50, 40);
    expect(part).toBeDefined();
    expect(part?.key).toBe(1);

    diagram.destroy();
  });

  it('should find a node after it moves', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });

    // Move the node
    model.setNodeProperty(1, 'x', 200);
    model.setNodeProperty(1, 'y', 150);

    // Old location should no longer hit
    expect(diagram.findPartAt(50, 25)).toBeNull();
    // New location should hit
    const part = diagram.findPartAt(250, 175);
    expect(part?.key).toBe(1);

    diagram.destroy();
  });

  it('should find parts after adding many', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    // Add many nodes to trigger spatial index path (>= 50 parts)
    for (let i = 0; i < 60; i++) {
      model.addNode({
        key: i,
        x: (i % 10) * 110,
        y: Math.floor(i / 10) * 110,
        width: 100,
        height: 50,
      });
    }

    // Hit a node in the middle
    const part = diagram.findPartAt(110 + 50, 0 + 25);
    expect(part).toBeDefined();
    expect(part?.key).toBe(1);

    diagram.destroy();
  });

  it('should return null on empty diagram', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.findPartAt(100, 100)).toBeNull();
    diagram.destroy();
  });

  it('should find links in spatial index', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 300, y: 0, width: 100, height: 50 });
    model.addLink({ key: 100, from: 1, to: 2 });

    // Click near the middle of the link
    const part = diagram.findPartAt(200, 25);
    expect(part).not.toBeNull();

    diagram.destroy();
  });
});
