// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import type { Canvas2DRenderer } from '../../src/render/Canvas2DRenderer.ts';

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
  // Keep rAF mocked after cleanup so pending timers don't crash
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
});

describe('Diagram LOD', () => {
  it('should be disabled by default', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.isLODEnabled()).toBe(false);
    diagram.destroy();
  });

  it('should enable LOD', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableLOD();
    expect(diagram.isLODEnabled()).toBe(true);
    diagram.destroy();
  });

  it('should disable LOD', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableLOD();
    diagram.disableLOD();
    expect(diagram.isLODEnabled()).toBe(false);
    diagram.destroy();
  });

  it('should set and get label threshold', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableLOD();
    diagram.setLODLabelThreshold(0.5);
    expect(diagram.getLODLabelThreshold()).toBe(0.5);
    diagram.destroy();
  });

  it('should enable LOD with custom threshold', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableLOD(0.4);
    expect(diagram.getLODLabelThreshold()).toBe(0.4);
    diagram.destroy();
  });

  it('should renderer reflect label visibility', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const renderer = diagram.getRenderer() as Canvas2DRenderer;

    // Default: labels visible
    expect(renderer.getLabelsVisible()).toBe(true);

    // Enable LOD and zoom out below threshold
    diagram.enableLOD(0.5);
    diagram.setViewport(0, 0, 0.2);
    expect(renderer.getLabelsVisible()).toBe(false);

    // Zoom in above threshold
    diagram.setViewport(0, 0, 1.0);
    expect(renderer.getLabelsVisible()).toBe(true);

    diagram.destroy();
  });

  it('should always show labels when LOD disabled', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const renderer = diagram.getRenderer() as Canvas2DRenderer;

    diagram.setViewport(0, 0, 0.1);
    expect(renderer.getLabelsVisible()).toBe(true);

    diagram.destroy();
  });
});
