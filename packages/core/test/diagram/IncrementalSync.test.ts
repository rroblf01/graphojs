// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
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

// Intentionally no afterAll deleting requestAnimationFrame/cancelAnimationFrame:
// vitest.setup.ts installs a persistent global polyfill, and removing it here
// can crash a still-pending render-loop callback from a Diagram this file (or
// another file sharing the same worker) forgot to destroy() — see the
// `requestAnimationFrame is not defined` flake this used to cause.

describe('Incremental model sync', () => {
  it('should add a node incrementally', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    let partAddedEvents = 0;
    diagram.addDiagramListener('PartAdded', () => partAddedEvents++);

    model.addNode({ key: 1, x: 10, y: 20, width: 100, height: 50, label: 'Hello' });

    const node = diagram.getPart(1);
    expect(node).toBeDefined();
    expect(node?.bounds.x).toBe(10);
    expect(node?.bounds.y).toBe(20);
    expect((node as { label: string }).label).toBe('Hello');
    expect(partAddedEvents).toBe(1);

    diagram.destroy();
  });

  it('should update a node property incrementally', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50, label: 'A' });

    model.setNodeProperty(1, 'label', 'B');
    const node = diagram.getPart(1) as { label: string };
    expect(node.label).toBe('B');

    diagram.destroy();
  });

  it('should move a node incrementally', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });

    model.setNodeProperty(1, 'x', 50);
    model.setNodeProperty(1, 'y', 60);

    const node = diagram.getPart(1);
    expect(node?.bounds.x).toBe(50);
    expect(node?.bounds.y).toBe(60);

    diagram.destroy();
  });

  it('should remove a node incrementally', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 100, y: 0, width: 100, height: 50 });

    let removedEvents = 0;
    diagram.addDiagramListener('PartRemoved', () => removedEvents++);

    model.removeNode(1);
    expect(diagram.getPart(1)).toBeUndefined();
    expect(diagram.getPart(2)).toBeDefined();
    expect(removedEvents).toBe(1);

    diagram.destroy();
  });

  it('should add a link incrementally', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });

    model.addLink({ key: 100, from: 1, to: 2 });
    const link = diagram.getPart(100);
    expect(link).toBeDefined();

    diagram.destroy();
  });

  it('should remove a link incrementally', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
    model.addLink({ key: 100, from: 1, to: 2 });

    model.removeLink(100);
    expect(diagram.getPart(100)).toBeUndefined();

    diagram.destroy();
  });

  it('should fire ModelChanged on model edits', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    let modelChanged = 0;
    diagram.addDiagramListener('ModelChanged', () => modelChanged++);

    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.setNodeProperty(1, 'label', 'X');

    expect(modelChanged).toBeGreaterThanOrEqual(2);

    diagram.destroy();
  });

  it('should add a group incrementally with members', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, isGroup: true, x: 0, y: 0, width: 300, height: 200 });

    // Add a member after the group exists
    model.addNode({ key: 2, x: 10, y: 10, width: 50, height: 50, group: 1 });

    const group = diagram.getPart(1);
    expect(group).toBeDefined();
    expect((group as { isGroup: boolean }).isGroup).toBe(true);

    diagram.destroy();
  });
});
