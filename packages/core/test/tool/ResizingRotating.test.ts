// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { ResizingTool } from '../../src/tool/ResizingTool.ts';
import { RotatingTool } from '../../src/tool/RotatingTool.ts';
import { Node } from '../../src/parts/Node.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(node: Node): Diagram {
  const model = new GraphLinksModel();
  const undoManager = new UndoManager();
  model.addNode({
    key: node.key,
    x: node.bounds.x,
    y: node.bounds.y,
    width: node.bounds.width,
    height: node.bounds.height,
  });
  return {
    getModel: () => model,
    getUndoManager: () => undoManager,
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    findPartAt: (x: number, y: number) => (node.containsPoint({ x, y }) ? node : null),
    getPart: () => node,
    invalidate: vi.fn(),
    fireDiagramEvent: vi.fn(),
  } as unknown as Diagram;
}

describe('ResizingTool', () => {
  it('should create with defaults', () => {
    const tool = new ResizingTool();
    expect(tool.isResizing).toBe(false);
    expect(tool.resizingNode).toBeNull();
    expect(tool.handle).toBeNull();
    expect(tool.minWidth).toBe(20);
    expect(tool.minHeight).toBe(20);
  });

  it('should detect corner handles', () => {
    const tool = new ResizingTool();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    expect(tool.getHandleAt(node, { x: 0, y: 0 })).toBe('nw');
    expect(tool.getHandleAt(node, { x: 100, y: 0 })).toBe('ne');
    expect(tool.getHandleAt(node, { x: 0, y: 50 })).toBe('sw');
    expect(tool.getHandleAt(node, { x: 100, y: 50 })).toBe('se');
  });

  it('should detect edge handles', () => {
    const tool = new ResizingTool();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    expect(tool.getHandleAt(node, { x: 50, y: 0 })).toBe('n');
    expect(tool.getHandleAt(node, { x: 50, y: 50 })).toBe('s');
    expect(tool.getHandleAt(node, { x: 0, y: 25 })).toBe('w');
    expect(tool.getHandleAt(node, { x: 100, y: 25 })).toBe('e');
  });

  it('should return null away from handles', () => {
    const tool = new ResizingTool();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    expect(tool.getHandleAt(node, { x: 50, y: 25 })).toBeNull();
  });

  it('should start resizing on selected node handle', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.isSelected = true;
    const diagram = createMockDiagram(node);
    const tool = new ResizingTool();
    tool.diagram = diagram;
    tool.isEnabled = true;

    // getDiagramPoint returns (0,0) which is the NW handle
    const event = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(event);

    expect(tool.isResizing).toBe(true);
    expect(tool.resizingNode).toBe(node);
  });

  it('should resize the node on move', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.isSelected = true;
    const diagram = createMockDiagram(node);
    const tool = new ResizingTool();
    tool.diagram = diagram;

    // Start at NW handle (0,0)
    const downEvent = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(downEvent);

    // getDiagramPoint always returns (0,0), so resize by moving start point
    // Instead directly test the resize logic via startBounds manipulation
    tool.minWidth = 10;
    tool.minHeight = 10;

    // Simulate moving: emulate a start point and dragging by setting _startPoint
    (tool as unknown as { _startPoint: { x: number; y: number } })._startPoint = { x: 10, y: 10 };
    const moveEvent = new MouseEvent('mousemove', { button: 0 });
    tool.doMouseMove(moveEvent);

    // Since getDiagramPoint returns (0,0), dx=-10, dy=-10
    expect(node.bounds.width).toBe(110);
    expect(node.bounds.height).toBe(60);
  });

  it('should enforce minimum size', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.isSelected = true;
    const diagram = createMockDiagram(node);
    const tool = new ResizingTool();
    tool.diagram = diagram;

    // Start at SE handle, then drag far to the NW
    (tool as unknown as { _handle: 'se' | null })._handle = 'se';
    (
      tool as unknown as { _startBounds: { x: number; y: number; width: number; height: number } }
    )._startBounds = { x: 0, y: 0, width: 100, height: 50 };
    (tool as unknown as { _startPoint: { x: number; y: number } })._startPoint = { x: 100, y: 50 };
    (tool as unknown as { _node: Node | null })._node = node;
    (tool as unknown as { _isResizing: boolean })._isResizing = true;

    const moveEvent = new MouseEvent('mousemove', { button: 0 });
    tool.doMouseMove(moveEvent);

    expect(node.bounds.width).toBeGreaterThanOrEqual(tool.minWidth);
    expect(node.bounds.height).toBeGreaterThanOrEqual(tool.minHeight);
  });

  it('should set min width and height', () => {
    const tool = new ResizingTool();
    tool.minWidth = 30;
    tool.minHeight = 40;
    expect(tool.minWidth).toBe(30);
    expect(tool.minHeight).toBe(40);
  });
});

describe('RotatingTool', () => {
  it('should create with defaults', () => {
    const tool = new RotatingTool();
    expect(tool.isRotating).toBe(false);
    expect(tool.rotatingNode).toBeNull();
  });

  it('should compute rotation handle point', () => {
    const tool = new RotatingTool();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const handle = tool.getRotationHandlePoint(node);
    expect(handle.x).toBe(50);
    expect(handle.y).toBe(-20);
  });

  it('should detect rotation handle', () => {
    const tool = new RotatingTool();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    expect(tool.isOnRotationHandle(node, { x: 50, y: -20 })).toBe(true);
    expect(tool.isOnRotationHandle(node, { x: 50, y: 25 })).toBe(false);
  });

  it('should rotate a node', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.isSelected = true;
    const diagram = createMockDiagram(node);
    const tool = new RotatingTool();
    tool.diagram = diagram;

    // Start rotation at angle of point (50,-20): atan2(-20,0) = -90 deg
    (tool as unknown as { _node: Node | null })._node = node;
    (tool as unknown as { _isRotating: boolean })._isRotating = true;
    (tool as unknown as { _startAngle: number })._startAngle = -90;

    node.angle = 0;
    const moveEvent = new MouseEvent('mousemove', { button: 0 });
    // getDiagramPoint returns (0,0): atan2(0-25, 0-50) = atan2(-25,-50) = ~-153.4
    tool.doMouseMove(moveEvent);

    expect(node.angle).not.toBe(0);
    expect(diagram.invalidate).toHaveBeenCalled();
  });

  it('should rotate node to positive angle', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const tool = new RotatingTool();
    const diagram = createMockDiagram(node);
    tool.diagram = diagram;
    tool.rotatingNode; // just reference

    // Force rotation to produce negative then wrap positive
    (tool as unknown as { _node: Node | null })._node = node;
    (tool as unknown as { _isRotating: boolean })._isRotating = true;
    (tool as unknown as { _startAngle: number })._startAngle = 180;
    node.angle = 0;

    const moveEvent = new MouseEvent('mousemove', { button: 0 });
    tool.doMouseMove(moveEvent);
    // -153.4 - 180 = -333.4 -> wraps to ~26.6
    expect(node.angle).toBeGreaterThan(0);
    expect(node.angle).toBeLessThan(360);
  });
});

describe('RotatingTool persistence and undo', () => {
  it('commits the angle to the model and is undoable', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const diagram = createMockDiagram(node);
    const tool = new RotatingTool();
    tool.diagram = diagram;
    const model = diagram.getModel();

    tool.startTransaction = vi.fn(() => true);
    tool.commitTransaction = vi.fn(() => true);

    // Simulate a full rotate gesture then release
    (tool as unknown as { _node: Node | null })._node = node;
    (tool as unknown as { _isRotating: boolean })._isRotating = true;
    (tool as unknown as { _startAngle: number })._startAngle = -90;
    node.angle = 0;
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0 }));
    tool.doMouseUp(new MouseEvent('mouseup'));

    const data = model.getNodeData(1);
    expect(data?.angle).toBeGreaterThan(0);

    // Undo must restore the original angle
    const manager = diagram.getUndoManager();
    expect(manager.canUndo()).toBe(true);
    manager.undo();
    expect(model.getNodeData(1)?.angle ?? 0).toBeCloseTo(0);
  });
});
