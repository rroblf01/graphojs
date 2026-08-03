// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
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
