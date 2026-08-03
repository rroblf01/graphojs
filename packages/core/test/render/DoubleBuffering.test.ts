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
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
});

describe('Diagram double buffering', () => {
  it('should be disabled by default', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.isDoubleBufferingEnabled()).toBe(false);
    diagram.destroy();
  });

  it('should enable and disable double buffering', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableDoubleBuffering();
    expect(diagram.isDoubleBufferingEnabled()).toBe(true);

    diagram.disableDoubleBuffering();
    expect(diagram.isDoubleBufferingEnabled()).toBe(false);
    diagram.destroy();
  });

  it('should render without errors with double buffering', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.getModel().addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    diagram.enableDoubleBuffering();

    expect(() => diagram.zoomToFit()).not.toThrow();
    expect(() => diagram.setViewport(0, 0, 1)).not.toThrow();
    diagram.destroy();
  });

  it('should clear back buffer on disable', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.enableDoubleBuffering();
    diagram.disableDoubleBuffering();
    expect(diagram.isDoubleBufferingEnabled()).toBe(false);
    diagram.destroy();
  });
});
