// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { Node } from '../../src/parts/Node.ts';
import { DragSelectingTool } from '../../src/tool/DragSelectingTool.ts';

function createMockDiagram(): Diagram {
  const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
  const node2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
  const node3 = Node.fromPosAndSize(3, 400, 300, 100, 50);
  const nodes = [node1, node2, node3];

  return {
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    findPartAt: () => null, // Empty background always
    clearSelection: vi.fn(),
    showSelectionRect: vi.fn(),
    hideSelectionRect: vi.fn(),
    selectPartsInRect: vi.fn((rect: { x: number; y: number; width: number; height: number }) => {
      for (const n of nodes) {
        if (
          n.bounds.x < rect.x + rect.width &&
          n.bounds.x + n.bounds.width > rect.x &&
          n.bounds.y < rect.y + rect.height &&
          n.bounds.y + n.bounds.height > rect.y
        ) {
          n.isSelected = true;
        }
      }
    }),
    getSelectedParts: () => nodes.filter((n) => n.isSelected),
  } as unknown as Diagram;
}

describe('DragSelectingTool', () => {
  it('should create with defaults', () => {
    const tool = new DragSelectingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isSelecting).toBe(false);
  });

  it('should start selecting on empty background', () => {
    const diagram = createMockDiagram();
    const tool = new DragSelectingTool();
    tool.diagram = diagram;

    const event = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(event);

    expect(tool.isSelecting).toBe(true);
    expect(diagram.showSelectionRect).toHaveBeenCalled();
  });

  it('should not start selecting on a part', () => {
    const diagram = createMockDiagram();
    const tool = new DragSelectingTool();
    tool.diagram = diagram;
    // findPartAt returns a node for this test
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    Object.defineProperty(diagram, 'findPartAt', { value: () => node });

    const event = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(event);
    expect(tool.isSelecting).toBe(false);
  });

  it('should update selection rectangle on move', () => {
    const diagram = createMockDiagram();
    const tool = new DragSelectingTool();
    tool.diagram = diagram;
    let point = { x: 0, y: 0 };
    // Make getDiagramPoint configurable
    const getPoint = () => point;
    Object.defineProperty(diagram, 'getDiagramPoint', { value: getPoint });

    point = { x: 0, y: 0 };
    tool.doMouseDown(new MouseEvent('mousedown', { button: 0 }));

    point = { x: 100, y: 80 };
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0 }));

    expect(diagram.showSelectionRect).toHaveBeenLastCalledWith({
      x: 0,
      y: 0,
      width: 100,
      height: 80,
    });
  });

  it('should select parts intersecting the rectangle', () => {
    const diagram = createMockDiagram();
    const tool = new DragSelectingTool();
    tool.diagram = diagram;
    let point = { x: 0, y: 0 };
    Object.defineProperty(diagram, 'getDiagramPoint', { value: () => point });

    point = { x: 0, y: 0 };
    tool.doMouseDown(new MouseEvent('mousedown', { button: 0 }));

    point = { x: 300, y: 80 };
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0 }));
    tool.doMouseUp(new MouseEvent('mouseup', { button: 0 }));

    // node1 (0-100) and node2 (200-300) intersect the box (0-300 x 0-80)
    expect((diagram.getSelectedParts() as Node[]).map((n) => n.key)).toContain(1);
    expect((diagram.getSelectedParts() as Node[]).map((n) => n.key)).toContain(2);
    expect((diagram.getSelectedParts() as Node[]).map((n) => n.key)).not.toContain(3);
    expect(diagram.hideSelectionRect).toHaveBeenCalled();
  });

  it('should clear selection on empty drag start', () => {
    const diagram = createMockDiagram();
    const tool = new DragSelectingTool();
    tool.diagram = diagram;

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0 }));
    expect(diagram.clearSelection).toHaveBeenCalled();
  });
});
