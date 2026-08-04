// @vitest-environment jsdom
/**
 * Performance benchmark for large graphs.
 * Run with: npx vitest run packages/core/test/benchmark.test.ts
 * These are informational benchmarks, not strict correctness tests.
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Diagram, GraphLinksModel } from '../src/index.ts';

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
    expect(diagram.findLinkForKey(diagram.getModel().getLinkKey(links[0]!))).not.toBeNull();

    // Informational: report timing. Threshold is generous (5s) to avoid flakiness.
    console.log(`[benchmark] 2000 nodes + ${links.length} links synced in ${elapsed.toFixed(1)}ms`);
    expect(elapsed).toBeLessThan(5000);
  });

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
});
