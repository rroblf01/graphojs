// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';
import { Panel, shape } from '../../src/panel/Panel.ts';
import { Group } from '../../src/parts/Group.ts';
import { Canvas2DRenderer } from '../../src/render/Canvas2DRenderer.ts';

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
});

describe('Canvas2DRenderer dirty rects', () => {
  function createRenderer(): Canvas2DRenderer {
    const canvas = document.createElement('canvas');
    return new Canvas2DRenderer(canvas);
  }

  it('should disable dirty rects by default', () => {
    const renderer = createRenderer();
    expect(renderer.isDirtyRectEnabled()).toBe(false);
  });

  it('should enable dirty rects', () => {
    const renderer = createRenderer();
    renderer.enableDirtyRects();
    expect(renderer.isDirtyRectEnabled()).toBe(true);
  });

  it('should disable dirty rects', () => {
    const renderer = createRenderer();
    renderer.enableDirtyRects();
    renderer.markDirty(0, 0, 10, 10);
    renderer.disableDirtyRects();
    expect(renderer.isDirtyRectEnabled()).toBe(false);
    expect(renderer.dirtyRectCount).toBe(0);
  });

  it('should collect dirty rects when enabled', () => {
    const renderer = createRenderer();
    renderer.enableDirtyRects();
    renderer.markDirty(10, 20, 30, 40);
    expect(renderer.dirtyRectCount).toBe(1);
  });

  it('should not collect dirty rects when disabled', () => {
    const renderer = createRenderer();
    renderer.markDirty(10, 20, 30, 40);
    expect(renderer.dirtyRectCount).toBe(0);
  });

  it('should mark dirty rect from bounds', () => {
    const renderer = createRenderer();
    renderer.enableDirtyRects();
    renderer.markDirtyRect({ x: 5, y: 5, width: 100, height: 50 });
    expect(renderer.dirtyRectCount).toBe(1);
  });

  it('should clear dirty rects', () => {
    const renderer = createRenderer();
    renderer.enableDirtyRects();
    renderer.markDirty(0, 0, 10, 10);
    renderer.clearDirtyRects();
    expect(renderer.dirtyRectCount).toBe(0);
  });

  it('should clear only dirty regions when enabled', () => {
    const renderer = createRenderer();
    renderer.enableDirtyRects();
    renderer.markDirty(0, 0, 10, 10);
    renderer.clear();
    // Should clear each dirty rect
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(renderer.dirtyRectCount).toBe(0);
  });

  it('should full clear when no dirty rects', () => {
    const renderer = createRenderer();
    renderer.clear();
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
  });
});

describe('Canvas2DRenderer devicePixelRatio on resize', () => {
  function createRenderer(): Canvas2DRenderer {
    const canvas = document.createElement('canvas');
    return new Canvas2DRenderer(canvas);
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('re-reads devicePixelRatio on resize', () => {
    vi.stubGlobal('devicePixelRatio', 1);
    const renderer = createRenderer();
    const canvas = renderer.getCanvas();
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;

    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);

    vi.stubGlobal('devicePixelRatio', 2);
    renderer.resize();

    expect(canvas.width).toBe(1600);
    expect(canvas.height).toBe(1200);
    expect(ctx.setTransform).toHaveBeenLastCalledWith(2, 0, 0, 2, 0, 0);
  });
});

describe('Canvas2DRenderer renderGroup', () => {
  function createRenderer(): Canvas2DRenderer {
    const canvas = document.createElement('canvas');
    return new Canvas2DRenderer(canvas);
  }

  it('renders the group panel (groupTemplate) instead of the flat fallback when set', () => {
    const renderer = createRenderer();
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;
    const group = new Group(1, new Rect(0, 0, 100, 60));
    group.fill = '#000000'; // flat-fallback color — must not be what gets drawn
    const bg = shape('roundedRect');
    bg.fill = '#e0f2f1'; // groupTemplate's own color — this should get drawn
    const templatePanel = new Panel('Auto');
    templatePanel.add(bg);
    group.panel = templatePanel;

    renderer.renderGroup(group);

    expect(ctx.fillStyle).toBe('#e0f2f1');
  });

  it('falls back to a flat fill/stroke rect when the group has no template panel', () => {
    const renderer = createRenderer();
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;
    const group = new Group(1, new Rect(0, 0, 100, 60));
    group.fill = '#123456';

    renderer.renderGroup(group);

    expect(ctx.fillStyle).toBe('#123456');
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 60);
  });
});

describe('Canvas2DRenderer renderGrid with a diagram.grid pattern', () => {
  function createRenderer(): Canvas2DRenderer {
    const canvas = document.createElement('canvas');
    return new Canvas2DRenderer(canvas);
  }

  it('falls back to the default gray styling and uniform gridSize when no pattern is given', () => {
    const renderer = createRenderer();
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;
    const strokeCalls: Array<{ style: unknown; width: unknown }> = [];
    ctx.stroke = vi.fn(() => strokeCalls.push({ style: ctx.strokeStyle, width: ctx.lineWidth }));

    renderer.renderGrid(new Rect(0, 0, 10, 10), 20);

    expect(strokeCalls).toEqual([
      { style: '#e0e0e0', width: 0.5 },
      { style: '#e0e0e0', width: 0.5 },
    ]);
  });

  it('uses the pattern cellWidth/cellHeight and separate horizontal/vertical line styling', () => {
    const renderer = createRenderer();
    const ctx = (renderer as unknown as { ctx: ReturnType<typeof mockContext> }).ctx;
    const strokeCalls: Array<{ style: unknown; width: unknown }> = [];
    ctx.stroke = vi.fn(() => strokeCalls.push({ style: ctx.strokeStyle, width: ctx.lineWidth }));

    // 10x10 viewport with 20px cells: exactly one vertical line (x=0) and
    // one horizontal line (y=0), so each stroke() call is unambiguous.
    renderer.renderGrid(new Rect(0, 0, 10, 10), 5, {
      cellWidth: 20,
      cellHeight: 20,
      vertical: { stroke: 'blue', strokeWidth: 2 },
      horizontal: { stroke: 'red', strokeWidth: 3 },
    });

    expect(strokeCalls).toEqual([
      { style: 'blue', width: 2 },
      { style: 'red', width: 3 },
    ]);
  });
});
