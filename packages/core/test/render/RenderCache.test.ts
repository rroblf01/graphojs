// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import {
  createPathCache,
  createTextMeasureCache,
  PathCache,
  TextMeasureCache,
} from '../../src/render/RenderCache.ts';

function mockContext() {
  return {
    measureText: (text: string) => ({ width: text.length * 8 }),
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  // Path2D may not exist in node; stub it if absent
  if (typeof globalThis.Path2D === 'undefined') {
    (globalThis as { Path2D?: unknown }).Path2D = class {
      moveTo() {}
      lineTo() {}
      closePath() {}
      rect() {}
      ellipse() {}
      roundRect() {}
      arc() {}
      quadraticCurveTo() {}
      bezierCurveTo() {}
    };
  }
});

describe('PathCache', () => {
  it('should create with defaults', () => {
    const cache = new PathCache();
    expect(cache.size).toBe(0);
  });

  it('should create via factory', () => {
    const cache = createPathCache();
    expect(cache).toBeInstanceOf(PathCache);
  });

  it('should cache a path by shape and size', () => {
    const cache = new PathCache();
    const path1 = cache.getPath('diamond', 100, 60);
    const path2 = cache.getPath('diamond', 100, 60);

    expect(path1).not.toBeNull();
    expect(path2).toBe(path1); // Same cached instance
    expect(cache.size).toBe(1);
  });

  it('should create separate paths for different sizes', () => {
    const cache = new PathCache();
    const path1 = cache.getPath('diamond', 100, 60);
    const path2 = cache.getPath('diamond', 200, 60);
    expect(path1).not.toBe(path2);
    expect(cache.size).toBe(2);
  });

  it('should handle rect and ellipse shapes', () => {
    const cache = new PathCache();
    expect(cache.getPath('rect', 100, 50)).not.toBeNull();
    expect(cache.getPath('ellipse', 100, 50)).not.toBeNull();
    expect(cache.getPath('roundedRect', 100, 50)).not.toBeNull();
  });

  it('should clear cache', () => {
    const cache = new PathCache();
    cache.getPath('diamond', 100, 60);
    expect(cache.size).toBe(1);
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it('should handle star and other complex shapes', () => {
    const cache = new PathCache();
    expect(cache.getPath('star', 100, 100)).not.toBeNull();
    expect(cache.getPath('cross', 80, 80)).not.toBeNull();
    expect(cache.getPath('hexagon', 100, 80)).not.toBeNull();
  });
});

describe('TextMeasureCache', () => {
  it('should create with defaults', () => {
    const cache = new TextMeasureCache();
    expect(cache.size).toBe(0);
  });

  it('should create via factory', () => {
    const cache = createTextMeasureCache();
    expect(cache).toBeInstanceOf(TextMeasureCache);
  });

  it('should measure and cache text widths', () => {
    const ctx = mockContext();
    const cache = new TextMeasureCache();
    const width = cache.measure(ctx, 'Hello', '12px sans-serif');

    expect(width).toBe(40); // 5 chars * 8
    expect(cache.size).toBe(1);
  });

  it('should return cached width for repeated calls', () => {
    const ctx = mockContext();
    const cache = new TextMeasureCache();
    const w1 = cache.measure(ctx, 'Hello', '12px sans-serif');
    const w2 = cache.measure(ctx, 'Hello', '12px sans-serif');
    expect(w1).toBe(w2);
    expect(cache.size).toBe(1);
  });

  it('should separate measurements by font', () => {
    const ctx = mockContext();
    const cache = new TextMeasureCache();
    cache.measure(ctx, 'Hi', '12px sans-serif');
    cache.measure(ctx, 'Hi', '20px sans-serif');
    expect(cache.size).toBe(2);
  });

  it('should clear cache', () => {
    const ctx = mockContext();
    const cache = new TextMeasureCache();
    cache.measure(ctx, 'Hi', '12px sans-serif');
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
