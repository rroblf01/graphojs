// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import {
  measureDiagramContent,
  renderDiagramToCanvas,
  type ServerCanvasLike,
} from '../../src/export/ServerRenderer.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { GraphObject } from '../../src/panel/GraphObject.ts';
import { Panel } from '../../src/panel/Panel.ts';
import { Shape } from '../../src/panel/Shape.ts';
import { TextBlock } from '../../src/panel/TextBlock.ts';

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
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    rect: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    ellipse: vi.fn(),
    arc: vi.fn(),
    arcTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    roundRect: vi.fn(),
    clip: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    font: '',
    textBaseline: '',
    textAlign: '',
    lineJoin: '',
    lineCap: '',
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

function createDiagram(): Diagram {
  return new Diagram({ div: document.createElement('div') });
}

/** A bare, non-DOM object — no HTMLCanvasElement anywhere in its chain. */
function createFakeServerCanvas(): ServerCanvasLike & { ctx: CanvasRenderingContext2D } {
  const ctx = mockContext();
  return {
    width: 1,
    height: 1,
    getContext: () => ctx,
    ctx,
  };
}

describe('measureDiagramContent', () => {
  it('returns a default box for an empty diagram', () => {
    const d = createDiagram();
    expect(measureDiagramContent(d)).toEqual({ x: 0, y: 0, width: 100, height: 100 });
  });

  it('computes the bounding box of visible parts, ignoring invisible ones', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 200, y: 100, width: 50, height: 30 },
      ],
    });
    d.findNodeForKey(2)!.visible = false;

    expect(measureDiagramContent(d)).toEqual({ x: 0, y: 0, width: 50, height: 30 });
  });
});

describe('renderDiagramToCanvas', () => {
  it('throws when the canvas has no 2D context', () => {
    const d = createDiagram();
    const badCanvas: ServerCanvasLike = { width: 1, height: 1, getContext: () => null };
    expect(() => renderDiagramToCanvas(d, badCanvas)).toThrow();
  });

  it('works with a plain non-DOM canvas-like object (no HTMLCanvasElement)', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 50, height: 30, label: 'Hi' }],
    });
    const canvas = createFakeServerCanvas();

    expect(canvas).not.toBeInstanceOf(HTMLCanvasElement);
    expect(() => renderDiagramToCanvas(d, canvas)).not.toThrow();
    expect(canvas.ctx.fillRect).toHaveBeenCalled(); // background + node fallback shape
    expect(canvas.ctx.fillText).toHaveBeenCalledWith('Hi', 25, 15);
  });

  it('sizes the canvas to content bounds + padding, scaled', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const canvas = createFakeServerCanvas();

    renderDiagramToCanvas(d, canvas, { padding: 10, scale: 2 });

    // content 100x50 + padding 10*2 = 120x70, times scale 2
    expect(canvas.width).toBe(240);
    expect(canvas.height).toBe(140);
  });

  it('clamps to maxWidth/maxHeight while preserving aspect ratio', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 1000, height: 500 }],
    });
    const canvas = createFakeServerCanvas();

    renderDiagramToCanvas(d, canvas, { padding: 0, maxWidth: 200 });

    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(100); // aspect ratio 2:1 preserved
  });

  it('renders a panel-templated node via Panel.draw', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(Panel, 'Auto', $(Shape, 'rect', { fill: '#fff' }), $(TextBlock, 'Label'));
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 60, height: 40 }],
    });
    const canvas = createFakeServerCanvas();

    expect(() => renderDiagramToCanvas(d, canvas)).not.toThrow();
    // Panel.draw ultimately issues shape-drawing calls (rect -> fillRect/strokeRect or a path).
    expect(
      (canvas.ctx.fillRect as ReturnType<typeof vi.fn>).mock.calls.length +
        (canvas.ctx.fill as ReturnType<typeof vi.fn>).mock.calls.length,
    ).toBeGreaterThan(0);
  });

  it('renders links and groups without throwing', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, isGroup: true, x: 0, y: 0, width: 200, height: 150 },
        { key: 2, x: 200, y: 0, width: 50, height: 30 },
        { key: 3, x: 300, y: 0, width: 50, height: 30 },
      ],
      linkDataArray: [{ from: 2, to: 3 }],
    });
    const canvas = createFakeServerCanvas();

    expect(() => renderDiagramToCanvas(d, canvas)).not.toThrow();
  });
});
