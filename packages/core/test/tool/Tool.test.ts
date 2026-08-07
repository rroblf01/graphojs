import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Tool } from '../../src/tool/Tool.ts';
import { ToolManager } from '../../src/tool/ToolManager.ts';
import { ClickSelectingTool } from '../../src/tool/ClickSelectingTool.ts';
import { ContextMenuTool } from '../../src/tool/ContextMenuTool.ts';
import { DraggingTool } from '../../src/tool/DraggingTool.ts';
import { PanningTool } from '../../src/tool/PanningTool.ts';
import { ZoomingTool } from '../../src/tool/ZoomingTool.ts';

/** A minimal Diagram double exposing exactly what these three tools call. */
function createMockDiagram(overrides: Record<string, unknown> = {}) {
  const state = {
    x: 0,
    y: 0,
    scale: 1,
    allowZoom: true,
    minScale: 0.1,
    maxScale: 10,
    allowHorizontalScroll: true,
    allowVerticalScroll: true,
    ...overrides,
  };
  const canvas = {
    style: {} as Record<string, string>,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
  };
  let currentPart: unknown = null;
  return {
    getViewport: () => ({ x: state.x, y: state.y, scale: state.scale }),
    setViewport: vi.fn((x: number, y: number, scale?: number) => {
      state.x = x;
      state.y = y;
      if (scale !== undefined) state.scale = scale;
    }),
    getRenderer: () => ({ getCanvas: () => canvas }),
    get allowZoom() {
      return state.allowZoom;
    },
    get minScale() {
      return state.minScale;
    },
    get maxScale() {
      return state.maxScale;
    },
    get allowHorizontalScroll() {
      return state.allowHorizontalScroll;
    },
    get allowVerticalScroll() {
      return state.allowVerticalScroll;
    },
    findPartAt: () => currentPart,
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    setCurrentPart: (part: unknown) => {
      currentPart = part;
    },
    hideContextMenu: vi.fn(),
    canvas,
    _state: state,
  };
}

function wheelEvent(overrides: Partial<WheelEvent> = {}): WheelEvent {
  return {
    clientX: 0,
    clientY: 0,
    deltaY: 100,
    preventDefault: vi.fn(),
    ...overrides,
  } as unknown as WheelEvent;
}

function mouseEvent(overrides: Partial<MouseEvent> = {}): MouseEvent {
  return {
    button: 0,
    clientX: 0,
    clientY: 0,
    shiftKey: false,
    preventDefault: vi.fn(),
    ...overrides,
  } as unknown as MouseEvent;
}

class TestTool extends Tool {
  activateCalled = false;
  deactivateCalled = false;
  mouseDownCalled = false;
  mouseMoveCalled = false;
  mouseUpCalled = false;

  override doActivate(): void {
    this.activateCalled = true;
    super.doActivate();
  }

  override doDeactivate(): void {
    this.deactivateCalled = true;
    super.doDeactivate();
  }

  override doMouseDown(_e: MouseEvent): void {
    this.mouseDownCalled = true;
  }

  override doMouseMove(_e: MouseEvent): void {
    this.mouseMoveCalled = true;
  }

  override doMouseUp(_e: MouseEvent): void {
    this.mouseUpCalled = true;
  }
}

describe('Tool', () => {
  let tool: TestTool;

  beforeEach(() => {
    tool = new TestTool();
  });

  it('should have default values', () => {
    expect(tool.diagram).toBeNull();
    expect(tool.isActive).toBe(false);
    expect(tool.isEnabled).toBe(true);
  });

  it('should activate and deactivate', () => {
    tool.doActivate();
    expect(tool.isActive).toBe(true);
    expect(tool.activateCalled).toBe(true);

    tool.doDeactivate();
    expect(tool.isActive).toBe(false);
    expect(tool.deactivateCalled).toBe(true);
  });

  it('should handle mouse events', () => {
    const event = new Event('mousedown') as MouseEvent;
    tool.doMouseDown(event);
    expect(tool.mouseDownCalled).toBe(true);

    const moveEvent = new Event('mousemove') as MouseEvent;
    tool.doMouseMove(moveEvent);
    expect(tool.mouseMoveCalled).toBe(true);

    const upEvent = new Event('mouseup') as MouseEvent;
    tool.doMouseUp(upEvent);
    expect(tool.mouseUpCalled).toBe(true);
  });

  it('should find part at coordinates', () => {
    expect(tool.findPartAt(0, 0)).toBeNull();
  });
});

describe('ToolManager', () => {
  let toolManager: ToolManager;

  beforeEach(() => {
    const mockDiagram = Object.create(null) as {
      findPartAt: () => null;
      getDiagramPoint: () => { x: number; y: number };
    };
    mockDiagram.findPartAt = () => null;
    mockDiagram.getDiagramPoint = () => ({ x: 0, y: 0 });
    toolManager = new ToolManager(mockDiagram);
  });

  it('should register and unregister tools', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);
    expect(toolManager.hasTool('test')).toBe(true);
    expect(toolManager.getTool('test')).toBe(tool);
    expect(toolManager.getToolNames()).toContain('test');

    expect(toolManager.unregisterTool('test')).toBe(true);
    expect(toolManager.hasTool('test')).toBe(false);
  });

  it('should activate and deactivate tools', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);

    expect(toolManager.activateTool('test')).toBe(true);
    expect(toolManager.getActiveTool()).toBe(tool);
    expect(toolManager.getActiveToolName()).toBe('test');
    expect(tool.isActive).toBe(true);

    toolManager.deactivateTool();
    expect(toolManager.getActiveTool()).toBeNull();
    expect(toolManager.getActiveToolName()).toBeNull();
    expect(tool.isActive).toBe(false);
  });

  it('should not activate disabled tool', () => {
    const tool = new TestTool();
    tool.isEnabled = false;
    toolManager.registerTool('test', tool);

    expect(toolManager.activateTool('test')).toBe(false);
    expect(toolManager.getActiveTool()).toBeNull();
  });

  it('should deactivate previous tool when activating new one', () => {
    const tool1 = new TestTool();
    const tool2 = new TestTool();
    toolManager.registerTool('test1', tool1);
    toolManager.registerTool('test2', tool2);

    toolManager.activateTool('test1');
    expect(toolManager.getActiveTool()).toBe(tool1);

    toolManager.activateTool('test2');
    expect(toolManager.getActiveTool()).toBe(tool2);
    expect(tool1.deactivateCalled).toBe(true);
  });

  it('should delegate mouse events to active tool', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);
    toolManager.activateTool('test');

    const downEvent = new Event('mousedown') as MouseEvent;
    toolManager.handleMouseDown(downEvent);
    expect(tool.mouseDownCalled).toBe(true);

    const moveEvent = new Event('mousemove') as MouseEvent;
    toolManager.handleMouseMove(moveEvent);
    expect(tool.mouseMoveCalled).toBe(true);

    const upEvent = new Event('mouseup') as MouseEvent;
    toolManager.handleMouseUp(upEvent);
    expect(tool.mouseUpCalled).toBe(true);
  });

  it('should handle unregistering active tool', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);
    toolManager.activateTool('test');

    expect(toolManager.unregisterTool('test')).toBe(true);
    expect(toolManager.getActiveTool()).toBeNull();
  });
});

describe('ClickSelectingTool', () => {
  it('should create with correct defaults', () => {
    const tool = new ClickSelectingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
  });
});

describe('DraggingTool', () => {
  it('should create with correct defaults', () => {
    const tool = new DraggingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
    expect(tool.isDragging).toBe(false);
  });
});

describe('PanningTool', () => {
  it('should create with correct defaults', () => {
    const tool = new PanningTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
  });

  it('canStart on middle-button or shift+left, not plain left/right click', () => {
    const tool = new PanningTool();
    expect(tool.canStart('panning', mouseEvent({ button: 1 }))).toBe(true);
    expect(tool.canStart('panning', mouseEvent({ button: 0, shiftKey: true }))).toBe(true);
    expect(tool.canStart('panning', mouseEvent({ button: 0, shiftKey: false }))).toBe(false);
    expect(tool.canStart('panning', mouseEvent({ button: 2 }))).toBe(false);
  });

  it('doActivate sets a grab cursor; doDeactivate resets it', () => {
    const diagram = createMockDiagram();
    const tool = new PanningTool();
    tool.diagram = diagram as never;

    tool.doActivate();
    expect(diagram.canvas.style.cursor).toBe('grab');

    tool.doDeactivate();
    expect(diagram.canvas.style.cursor).toBe('default');
  });

  it('pans the viewport by the mouse delta, scaled by panSpeed', () => {
    const diagram = createMockDiagram({ x: 100, y: 50, scale: 2 });
    const tool = new PanningTool();
    tool.diagram = diagram as never;
    tool.panSpeed = 1;

    tool.doMouseDown(mouseEvent({ button: 1, clientX: 200, clientY: 200 }));
    expect(diagram.canvas.style.cursor).toBe('grabbing');

    tool.doMouseMove(mouseEvent({ clientX: 220, clientY: 210 })); // +20,+10 screen px / scale 2 = +10,+5
    expect(diagram.setViewport).toHaveBeenCalledWith(100 - 10, 50 - 5);

    tool.doMouseUp(mouseEvent());
    expect(diagram.canvas.style.cursor).toBe('default');
  });

  it('panSpeed multiplies the pan distance (and reflects back via the getter)', () => {
    const diagram = createMockDiagram({ x: 0, y: 0, scale: 1 });
    const tool = new PanningTool();
    tool.diagram = diagram as never;
    tool.panSpeed = 3;
    expect(tool.panSpeed).toBe(3);

    tool.doMouseDown(mouseEvent({ button: 1, clientX: 0, clientY: 0 }));
    tool.doMouseMove(mouseEvent({ clientX: 10, clientY: 0 }));
    expect(diagram.setViewport).toHaveBeenCalledWith(-30, 0);
  });

  it('locks the X axis when allowHorizontalScroll is false', () => {
    const diagram = createMockDiagram({ x: 50, y: 50, allowHorizontalScroll: false });
    const tool = new PanningTool();
    tool.diagram = diagram as never;

    tool.doMouseDown(mouseEvent({ button: 1, clientX: 0, clientY: 0 }));
    tool.doMouseMove(mouseEvent({ clientX: 40, clientY: 40 }));
    // x is locked at the original offset; y still moves.
    expect(diagram.setViewport).toHaveBeenCalledWith(50, 50 - 40);
  });

  it('locks the Y axis when allowVerticalScroll is false', () => {
    const diagram = createMockDiagram({ x: 50, y: 50, allowVerticalScroll: false });
    const tool = new PanningTool();
    tool.diagram = diagram as never;

    tool.doMouseDown(mouseEvent({ button: 1, clientX: 0, clientY: 0 }));
    tool.doMouseMove(mouseEvent({ clientX: 40, clientY: 40 }));
    // y is locked at the original offset; x still moves.
    expect(diagram.setViewport).toHaveBeenCalledWith(50 - 40, 50);
  });

  it('does nothing on mouse move when not currently panning', () => {
    const diagram = createMockDiagram();
    const tool = new PanningTool();
    tool.diagram = diagram as never;

    tool.doMouseMove(mouseEvent({ clientX: 100, clientY: 100 }));
    expect(diagram.setViewport).not.toHaveBeenCalled();
  });
});

describe('ZoomingTool', () => {
  it('should create with correct defaults', () => {
    const tool = new ZoomingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
  });

  it('should create with custom min/max scale', () => {
    const tool = new ZoomingTool(0.5, 5);
    expect(tool.isEnabled).toBe(true);
  });

  it('zooms in on wheel-up (negative deltaY), anchored on the cursor', () => {
    const diagram = createMockDiagram({ x: 0, y: 0, scale: 1 });
    const tool = new ZoomingTool();
    tool.diagram = diagram as never;

    const e = wheelEvent({ deltaY: -100, clientX: 100, clientY: 50 });
    tool.doMouseWheel(e);

    expect(e.preventDefault).toHaveBeenCalled();
    // scale 1 * 1.1 = 1.1; diagram point under the cursor was (100, 50) at
    // scale 1, so the new offset must keep that same point under (100, 50)
    // at the new scale: newX = 100 - 100/1.1, newY = 50 - 50/1.1.
    expect(diagram.setViewport).toHaveBeenCalledWith(
      expect.closeTo(9.0909, 3),
      expect.closeTo(4.5455, 3),
      expect.closeTo(1.1, 5),
    );
  });

  it('zooms out on wheel-down (positive deltaY)', () => {
    const diagram = createMockDiagram({ scale: 1 });
    const tool = new ZoomingTool();
    tool.diagram = diagram as never;

    tool.doMouseWheel(wheelEvent({ deltaY: 100 }));
    const [, , newScale] = diagram.setViewport.mock.calls[0] as [number, number, number];
    expect(newScale).toBeCloseTo(0.9, 5);
  });

  it('clamps to the diagram minScale/maxScale', () => {
    const diagram = createMockDiagram({ scale: 0.11, minScale: 0.1, maxScale: 10 });
    const tool = new ZoomingTool();
    tool.diagram = diagram as never;

    tool.doMouseWheel(wheelEvent({ deltaY: 100 })); // would go below 0.1 unclamped
    const [, , newScale] = diagram.setViewport.mock.calls[0] as [number, number, number];
    expect(newScale).toBeCloseTo(0.1, 5);
  });

  it('does nothing when diagram.allowZoom is false', () => {
    const diagram = createMockDiagram({ allowZoom: false });
    const tool = new ZoomingTool();
    tool.diagram = diagram as never;

    const e = wheelEvent();
    tool.doMouseWheel(e);
    expect(diagram.setViewport).not.toHaveBeenCalled();
    expect(e.preventDefault).not.toHaveBeenCalled();
  });

  it('does nothing without a diagram attached', () => {
    const tool = new ZoomingTool();
    expect(() => tool.doMouseWheel(wheelEvent())).not.toThrow();
  });
});

describe('ContextMenuTool', () => {
  it('canStart only on right-click (button 2)', () => {
    const tool = new ContextMenuTool();
    expect(tool.canStart('contextMenu', mouseEvent({ button: 2 }))).toBe(true);
    expect(tool.canStart('contextMenu', mouseEvent({ button: 0 }))).toBe(false);
  });

  it('doMouseDown records the part under the cursor on right-click', () => {
    const diagram = createMockDiagram();
    const part = { key: 1 };
    diagram.setCurrentPart(part);
    const tool = new ContextMenuTool();
    tool.diagram = diagram as never;

    tool.doMouseDown(mouseEvent({ button: 2 }));
    expect(tool.currentPart).toBe(part);
  });

  it('ignores non-right-click buttons on mouse down/up', () => {
    const diagram = createMockDiagram();
    diagram.setCurrentPart({ key: 1 });
    const tool = new ContextMenuTool();
    tool.diagram = diagram as never;

    tool.doMouseDown(mouseEvent({ button: 0 }));
    expect(tool.currentPart).toBeNull();

    tool.doMouseUp(mouseEvent({ button: 0 }));
    expect(tool.currentPart).toBeNull();
  });

  it('doMouseUp updates currentPart on right-click', () => {
    const diagram = createMockDiagram();
    const tool = new ContextMenuTool();
    tool.diagram = diagram as never;

    diagram.setCurrentPart({ key: 'a' });
    tool.doMouseUp(mouseEvent({ button: 2 }));
    expect(tool.currentPart).toEqual({ key: 'a' });
  });

  it('does nothing without a diagram attached', () => {
    const tool = new ContextMenuTool();
    expect(() => tool.doMouseDown(mouseEvent({ button: 2 }))).not.toThrow();
    expect(() => tool.doMouseUp(mouseEvent({ button: 2 }))).not.toThrow();
    expect(tool.currentPart).toBeNull();
  });

  it('hide() delegates to diagram.hideContextMenu() and clears currentPart', () => {
    const diagram = createMockDiagram();
    diagram.setCurrentPart({ key: 1 });
    const tool = new ContextMenuTool();
    tool.diagram = diagram as never;
    tool.doMouseDown(mouseEvent({ button: 2 }));
    expect(tool.currentPart).not.toBeNull();

    tool.hide();
    expect(diagram.hideContextMenu).toHaveBeenCalled();
    expect(tool.currentPart).toBeNull();
  });

  it('hide() is a no-op without a diagram attached', () => {
    const tool = new ContextMenuTool();
    expect(() => tool.hide()).not.toThrow();
  });
});
