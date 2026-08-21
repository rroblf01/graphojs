// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Brush, BrushType } from '../../src/geometry/Brush.ts';
import { Spot } from '../../src/geometry/Spot.ts';
import { Shape } from '../../src/panel/Shape.ts';
import { resolveBrushLike } from '../../src/render/BrushResolver.ts';

function mockContext() {
  const gradientStops: Array<{ loc: number; color: string }> = [];
  const gradient = {
    addColorStop: vi.fn((loc: number, color: string) => gradientStops.push({ loc, color })),
    __stops: gradientStops,
  };
  return {
    createLinearGradient: vi.fn(() => gradient),
    createRadialGradient: vi.fn(() => gradient),
    createPattern: vi.fn(() => ({ __pattern: true })),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    rect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
  } as unknown as CanvasRenderingContext2D & { __gradient: typeof gradient };
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

describe('Brush construction', () => {
  it('defaults to Solid and stores a color', () => {
    const b = new Brush(Brush.Solid, { color: 'red' });
    expect(b.type).toBe(BrushType.Solid);
    expect(b.color).toBe('red');
  });

  it('numeric keys in init become color stops (GoJS shorthand)', () => {
    const b = new Brush(Brush.Linear, { 0: 'red', 1: 'blue' } as Record<number, string>);
    expect(b.colorStops?.get(0)).toBe('red');
    expect(b.colorStops?.get(1)).toBe('blue');
  });

  it('addColorStop appends stops fluently', () => {
    const b = new Brush(Brush.Radial);
    b.addColorStop(0, 'white').addColorStop(1, 'black');
    expect(b.colorStops?.count).toBe(2);
  });

  it('copy() is independent of the original', () => {
    const b = new Brush(Brush.Linear, { 0: 'red' } as Record<number, string>);
    const copy = b.copy();
    copy.addColorStop(1, 'blue');
    expect(b.colorStops?.count).toBe(1);
    expect(copy.colorStops?.count).toBe(2);
  });
});

describe('Brush color utilities', () => {
  it('lightenBy/darkenBy move a color towards white/black', () => {
    expect(Brush.lightenBy('#000000', 1)).toBe('rgb(255, 255, 255)');
    expect(Brush.darkenBy('#ffffff', 1)).toBe('rgb(0, 0, 0)');
    expect(Brush.lightenBy('#000000', 0)).toBe('rgb(0, 0, 0)');
  });

  it('mix blends two colors by fraction', () => {
    expect(Brush.mix('#000000', '#ffffff', 0.5)).toBe('rgb(128, 128, 128)');
  });

  it('isDark reports based on perceived luminance', () => {
    expect(Brush.isDark('#000000')).toBe(true);
    expect(Brush.isDark('#ffffff')).toBe(false);
    expect(Brush.isDark(new Brush(Brush.Solid, { color: '#000000' }))).toBe(true);
    expect(Brush.isDark(null)).toBe(false);
  });

  it('instance lightenBy/darkenBy/isDark mutate the solid color', () => {
    const b = new Brush(Brush.Solid, { color: '#000000' });
    expect(b.isDark()).toBe(true);
    b.lightenBy(1);
    expect(b.color).toBe('rgb(255, 255, 255)');
  });

  it('randomColor stays within the given range', () => {
    for (let i = 0; i < 5; i++) {
      const c = Brush.randomColor(10, 20);
      const match = c.match(/rgb\((\d+), (\d+), (\d+)\)/);
      expect(match).not.toBeNull();
      for (let ch = 1; ch <= 3; ch++) {
        const v = Number(match?.[ch]);
        expect(v).toBeGreaterThanOrEqual(10);
        expect(v).toBeLessThanOrEqual(20);
      }
    }
  });
});

describe('resolveBrushLike', () => {
  it('passes plain strings through unchanged', () => {
    const ctx = mockContext();
    expect(resolveBrushLike(ctx, 'red', 0, 0, 100, 100)).toBe('red');
  });

  it('returns "transparent" for null/undefined', () => {
    const ctx = mockContext();
    expect(resolveBrushLike(ctx, null, 0, 0, 100, 100)).toBe('transparent');
    expect(resolveBrushLike(ctx, undefined, 0, 0, 100, 100)).toBe('transparent');
  });

  it('a Solid brush resolves to its color string', () => {
    const ctx = mockContext();
    const b = new Brush(Brush.Solid, { color: 'green' });
    expect(resolveBrushLike(ctx, b, 0, 0, 100, 100)).toBe('green');
  });

  it('a Linear brush creates a CanvasGradient with sorted color stops', () => {
    const ctx = mockContext();
    const b = new Brush(Brush.Linear, {
      start: Spot.TopLeft,
      end: Spot.BottomRight,
      1: 'blue',
      0: 'red',
    } as unknown as Record<number, string>);
    const result = resolveBrushLike(ctx, b, 0, 0, 100, 50) as unknown as { __stops: unknown[] };
    expect(ctx.createLinearGradient).toHaveBeenCalledWith(0, 0, 100, 50);
    expect(result.__stops).toEqual([
      { loc: 0, color: 'red' },
      { loc: 1, color: 'blue' },
    ]);
  });

  it('a Radial brush creates a CanvasGradient scaled by the bounds', () => {
    const ctx = mockContext();
    const b = new Brush(Brush.Radial, { startRadius: 0, endRadius: 0.5 });
    resolveBrushLike(ctx, b, 0, 0, 100, 100);
    expect(ctx.createRadialGradient).toHaveBeenCalled();
  });

  it('a Pattern brush without an actual pattern image falls back to its color', () => {
    const ctx = mockContext();
    const b = new Brush(Brush.Pattern, { color: 'pink' });
    expect(resolveBrushLike(ctx, b, 0, 0, 100, 100)).toBe('pink');
  });
});

describe('Shape.fill/stroke accept a Brush', () => {
  it('draw() resolves a Brush fill into a real fillStyle instead of "[object Object]"', () => {
    const shape = new Shape('rect');
    shape.fill = new Brush(Brush.Solid, { color: 'orange' });
    const ctx = mockContext();
    shape.draw(ctx, 0, 0, 100, 50);
    expect(ctx.fillStyle).toBe('orange');
  });

  it('clone() preserves a Brush fill by reference (shallow, consistent with clone() elsewhere)', () => {
    const shape = new Shape('rect');
    const brush = new Brush(Brush.Solid, { color: 'teal' });
    shape.fill = brush;
    const cloned = shape.clone();
    expect(cloned.fill).toBe(brush);
  });
});
