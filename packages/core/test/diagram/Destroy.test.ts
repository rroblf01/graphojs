// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { ContextMenu } from '../../src/export/ContextMenu.ts';
import { AddNodeCommand } from '../../src/undo/commands.ts';

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

  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
    return setTimeout(() => cb(performance.now()), 16) as unknown as number;
  };
  globalThis.cancelAnimationFrame = (id: number) => {
    clearTimeout(id);
  };

  // ResizeObserver stub for jsdom
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

describe('Diagram destroy / memory management', () => {
  it('should create and not be destroyed', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    expect(diagram.isDestroyed()).toBe(false);
    diagram.destroy();
  });

  it('should remove canvas from container on destroy', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    // The canvas plus the accessibility live region.
    expect(div.children).toHaveLength(2);

    diagram.destroy();
    expect(div.children).toHaveLength(0);
  });

  it('should be idempotent when destroyed twice', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.destroy();
    expect(() => diagram.destroy()).not.toThrow();
    expect(diagram.isDestroyed()).toBe(true);
  });

  it('should clear the undo manager on destroy', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();
    model.addNode({ key: 1, x: 0, y: 0 });
    diagram.executeCommand(new AddNodeCommand(model, { key: 2 }));
    expect(diagram.getUndoManager().canUndo()).toBe(true);

    diagram.destroy();
    expect(diagram.getUndoManager().canUndo()).toBe(false);
  });

  it('should destroy the context menu on destroy', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: false });
    diagram.setContextMenu(menu);
    const destroySpy = vi.spyOn(menu, 'destroy');

    diagram.destroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(diagram.getContextMenu()).toBeNull();
  });

  it('should remove model change listener on destroy', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const model = diagram.getModel();

    // After destroy, model changes should not trigger sync (no error)
    diagram.destroy();
    expect(() => model.addNode({ key: 99, x: 0, y: 0 })).not.toThrow();
  });

  it('should clear parts and selection on destroy', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.getModel().addNode({ key: 1, x: 0, y: 0 });

    diagram.destroy();
    expect(diagram.getSelectedParts()).toHaveLength(0);
  });
});
