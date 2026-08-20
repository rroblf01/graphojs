// @vitest-environment jsdom
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { Size } from '../../src/geometry/Size.ts';
import { GraphObject } from '../../src/panel/GraphObject.ts';
import { Panel } from '../../src/panel/Panel.ts';
import { Shape } from '../../src/panel/Shape.ts';

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
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
});

describe('Grid snapping', () => {
  it('should be disabled by default', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.isSnapToGridEnabled()).toBe(false);
    diagram.destroy();
  });

  it('should enable snapping', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableSnapToGrid();
    expect(diagram.isSnapToGridEnabled()).toBe(true);
    diagram.destroy();
  });

  it('should disable snapping', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableSnapToGrid();
    diagram.disableSnapToGrid();
    expect(diagram.isSnapToGridEnabled()).toBe(false);
    diagram.destroy();
  });

  it('should be configurable via options', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div, snapToGrid: true });
    expect(diagram.isSnapToGridEnabled()).toBe(true);
    diagram.destroy();
  });

  it('should snap values to the grid', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableSnapToGrid();

    expect(diagram.snapValue(17)).toBe(20);
    expect(diagram.snapValue(23)).toBe(20);
    expect(diagram.snapValue(35)).toBe(40);
    expect(diagram.snapValue(9)).toBe(0);
    diagram.destroy();
  });

  it('should not snap when disabled', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.snapValue(17)).toBe(17);
    diagram.destroy();
  });

  it('should snap points', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableSnapToGrid();

    const point = diagram.snapPoint({ x: 17, y: 43 });
    expect(point.x).toBe(20);
    expect(point.y).toBe(40);
    diagram.destroy();
  });

  it('should set and get grid size', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.getGridSize()).toBe(20);

    diagram.setGridSize(10);
    expect(diagram.getGridSize()).toBe(10);

    diagram.enableSnapToGrid();
    expect(diagram.snapValue(17)).toBe(20);
    expect(diagram.snapValue(13)).toBe(10);
    diagram.destroy();
  });

  it('should respect custom grid size in options', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div, gridSize: 50 });
    expect(diagram.getGridSize()).toBe(50);
    diagram.destroy();
  });
});

describe('diagram.grid — GoJS-compatible Panel "Grid" background pattern', () => {
  it('accepts a Panel and extracts its LineH/LineV Shape styling for rendering', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const $ = GraphObject.make;

    const gridPanel = $(
      Panel,
      'Grid',
      { gridCellSize: new Size(30, 40) },
      $(Shape, 'LineH', { stroke: 'blue', strokeWidth: 2 }),
      $(Shape, 'LineV', { stroke: 'green', strokeWidth: 3 }),
    );
    diagram.grid = gridPanel;

    expect(diagram.grid).toBe(gridPanel);
    const style = (
      diagram as unknown as { getGridPatternStyle(): Record<string, unknown> }
    ).getGridPatternStyle();
    expect(style).toEqual({
      cellWidth: 30,
      cellHeight: 40,
      horizontal: { stroke: 'blue', strokeWidth: 2 },
      vertical: { stroke: 'green', strokeWidth: 3 },
    });
    diagram.destroy();
  });

  it('returns undefined when no grid pattern is set', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.grid).toBeNull();
    const style = (diagram as unknown as { getGridPatternStyle(): unknown }).getGridPatternStyle();
    expect(style).toBeUndefined();
    diagram.destroy();
  });

  it('does not crash on a non-Panel value (grid used to be loosely typed as unknown)', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    // biome-ignore lint/suspicious/noExplicitAny: exercising a pre-existing loose-typing edge case
    (diagram as any).grid = { opacity: 0.1 };
    const style = (diagram as unknown as { getGridPatternStyle(): unknown }).getGridPatternStyle();
    expect(style).toBeUndefined();
    diagram.destroy();
  });
});
