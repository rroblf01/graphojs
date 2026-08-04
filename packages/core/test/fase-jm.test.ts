// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Diagram } from '../src/diagram/Diagram.ts';
import { LinkingBaseTool } from '../src/tool/LinkingBaseTool.ts';
import type { Node } from '../src/parts/Node.ts';

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

describe('LinkingBaseTool', () => {
  it('LinkingBaseTool can be instantiated', () => {
    const tool = new LinkingBaseTool();
    expect(tool.isDragging).toBe(false);
    expect(tool.sourceNode).toBeNull();
    expect(tool.targetNode).toBeNull();
    expect(tool.preventCycles).toBe(false);
  });

  it('wouldCreateCycle detects cycles', () => {
    const tool = new LinkingBaseTool();
    const model = {
      getLinksFrom: (key: string | number) => {
        if (key === 1) return [{ to: 2 }];
        if (key === 2) return [{ to: 3 }];
        return [];
      },
    };
    expect(tool['wouldCreateCycle'](1, 3, model)).toBe(false);
    expect(tool['wouldCreateCycle'](1, 4, model)).toBe(false);
    expect(tool['wouldCreateCycle'](3, 1, model)).toBe(true);
  });
});

describe('Diagram scrollToPart', () => {
  it('scrollToPart centers the viewport on a part', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 500, y: 500, width: 100, height: 50 });
    model.addNode({ key: 2, x: 1000, y: 1000, width: 100, height: 50 });

    diagram.zoomToFit();
    const node2 = diagram.getPart(2) as Node;
    expect(() => diagram.scrollToPart(node2)).not.toThrow();
    diagram.destroy();
  });

  it('getContentBounds returns correct bounds', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 100, y: 200, width: 50, height: 50 });
    model.addNode({ key: 2, x: 300, y: 400, width: 50, height: 50 });

    const bounds = diagram.getContentBounds();
    expect(bounds.x).toBe(100);
    expect(bounds.y).toBe(200);
    expect(bounds.width).toBe(250); // 300 + 50 - 100
    expect(bounds.height).toBe(250); // 400 + 50 - 200
    diagram.destroy();
  });

  it('getViewportBounds returns viewport', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.setViewport(100, 200, 1.5);

    const vp = diagram.getViewportBounds();
    expect(vp.x).toBe(100);
    expect(vp.y).toBe(200);
    diagram.destroy();
  });
});
