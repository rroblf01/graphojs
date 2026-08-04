// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
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

const diagrams: Diagram[] = [];

function createDiagram(): Diagram {
  const div = document.createElement('div');
  const diagram = new Diagram({ div });
  diagrams.push(diagram);
  return diagram;
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

afterEach(() => {
  for (const d of diagrams) {
    d.destroy();
  }
  diagrams.length = 0;
});

afterAll(() => {
  vi.restoreAllMocks();
});

function createTouch(type: string, points: Array<{ x: number; y: number }>): TouchEvent {
  const touches = points.map(
    (p, i) =>
      ({
        identifier: i,
        clientX: p.x,
        clientY: p.y,
        screenX: p.x,
        screenY: p.y,
        pageX: p.x,
        pageY: p.y,
        target: document.createElement('div'),
      }) as Touch,
  );
  const event = new Event(type) as TouchEvent;
  Object.defineProperty(event, 'touches', { value: touches, enumerable: true });
  Object.defineProperty(event, 'changedTouches', { value: touches, enumerable: true });
  Object.defineProperty(event, 'preventDefault', { value: vi.fn() });
  return event;
}

describe('Diagram GoJS-compatible touch and keyboard', () => {
  it('should support arrow key nudging via commandHandler', () => {
    const diagram = createDiagram();
    const model = new GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    diagram.setModel(model);

    const node = diagram.getPart(1) as { isSelected: boolean };
    diagram.select(node as never);

    const cmd = diagram.getCommandHandler();
    const result = cmd.nudgeSelection(1, 0, 1);
    expect(result).toBe(true);
  });

  it('should handle touchstart with single finger', () => {
    const diagram = createDiagram();
    const canvas = diagram.getRenderer().getCanvas();

    const event = createTouch('touchstart', [{ x: 100, y: 100 }]);
    canvas.dispatchEvent(event);

    expect((diagram as unknown as { touchState: unknown }).touchState).not.toBeNull();
  });

  it('should pan viewport on single-finger touchmove', () => {
    const diagram = createDiagram();
    const canvas = diagram.getRenderer().getCanvas();

    const start = createTouch('touchstart', [{ x: 100, y: 100 }]);
    canvas.dispatchEvent(start);

    const move = createTouch('touchmove', [{ x: 150, y: 120 }]);
    canvas.dispatchEvent(move);

    const viewport = diagram.getViewport();
    expect(viewport.x).toBe(-50);
    expect(viewport.y).toBe(-20);
  });

  it('should zoom on two-finger pinch', () => {
    const diagram = createDiagram();
    const canvas = diagram.getRenderer().getCanvas();

    const start = createTouch('touchstart', [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
    ]);
    canvas.dispatchEvent(start);

    const move = createTouch('touchmove', [
      { x: 100, y: 100 },
      { x: 300, y: 100 },
    ]);
    canvas.dispatchEvent(move);

    const viewport = diagram.getViewport();
    expect(viewport.scale).toBeGreaterThan(1);
  });

  it('should clear touch state on touchend', () => {
    const diagram = createDiagram();
    const canvas = diagram.getRenderer().getCanvas();

    const start = createTouch('touchstart', [{ x: 100, y: 100 }]);
    canvas.dispatchEvent(start);

    const end = createTouch('touchend', []);
    canvas.dispatchEvent(end);

    expect((diagram as unknown as { touchState: unknown }).touchState).toBeNull();
  });
});
