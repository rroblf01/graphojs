// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { DraggingTool } from '../../src/tool/DraggingTool.ts';
import { LinkingTool } from '../../src/tool/LinkingTool.ts';
import { RelinkingTool } from '../../src/tool/RelinkingTool.ts';
import { ResizingTool } from '../../src/tool/ResizingTool.ts';
import { Node } from '../../src/parts/Node.ts';
import { Link } from '../../src/parts/Link.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(): Diagram {
  const model = new GraphLinksModel();
  const undoManager = new UndoManager();
  model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
  model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
  model.addNode({ key: 3, x: 0, y: 200, width: 100, height: 50 });

  const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
  const node2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
  const node3 = Node.fromPosAndSize(3, 0, 200, 100, 50);
  const nodes = [node1, node2, node3];
  const links: Link[] = [];

  return {
    getModel: () => model,
    getUndoManager: () => undoManager,
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    getPart: (key: string | number) =>
      nodes.find((n) => n.key === key) ?? links.find((l) => l.key === key),
    findNodeForKey: (key: string | number) => nodes.find((n) => n.key === key) ?? null,
    invalidateLinksForNode: () => {},
    findPartAt: () => nodes.find((n) => n.isSelected) ?? node1,
    getSelectedParts: () => nodes.filter((n) => n.isSelected),
    clearSelection: () => {
      for (const n of nodes) n.isSelected = false;
    },
    getRenderer: () => ({ getCanvas: () => ({ style: {} }) }),
    invalidate: vi.fn(),
    fireDiagramEvent: vi.fn(),
  } as unknown as Diagram;
}

describe('Tool undo integration', () => {
  it('linking tool creates undoable link', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    const undoManager = diagram.getUndoManager();
    const tool = new LinkingTool();
    tool.diagram = diagram;

    const node1 = diagram.getPart(1) as Node;
    const node2 = diagram.getPart(2) as Node;
    tool.createLink(node1, node2);

    expect(model.getLinkCount()).toBe(1);
    expect(undoManager.canUndo()).toBe(true);

    undoManager.undo();
    expect(model.getLinkCount()).toBe(0);

    undoManager.redo();
    expect(model.getLinkCount()).toBe(1);
  });

  it('relinking tool creates undoable link change', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    const undoManager = diagram.getUndoManager();
    model.addLink({ key: 100, from: 1, to: 2 });

    const link = new Link(100, 1, 2);
    const tool = new RelinkingTool();
    tool.diagram = diagram;
    (tool as unknown as { _end: 'from' | 'to' })._end = 'to';

    const node3 = diagram.getPart(3) as Node;
    tool.reconnectLink(link, node3);

    expect(model.getLinkData(100)?.to).toBe(3);
    expect(undoManager.canUndo()).toBe(true);

    undoManager.undo();
    expect(model.getLinkData(100)?.to).toBe(2);
  });

  it('resizing tool creates undoable resize', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    const undoManager = diagram.getUndoManager();
    const node = diagram.getPart(1) as Node;

    node.bounds = { x: 0, y: 0, width: 150, height: 80 } as never;

    const tool = new ResizingTool();
    tool.diagram = diagram;
    (tool as unknown as { _node: Node | null })._node = node;
    (tool as unknown as { _isResizing: boolean })._isResizing = true;

    tool.doMouseUp(new MouseEvent('mouseup', { button: 0 }));

    expect(model.getNodeProperty(1, 'width')).toBe(150);
    expect(undoManager.canUndo()).toBe(true);

    undoManager.undo();
    expect(model.getNodeProperty(1, 'width')).toBe(100);
  });

  it('dragging tool creates undoable move', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    const undoManager = diagram.getUndoManager();
    const node = diagram.getPart(1) as Node;

    const tool = new DraggingTool();
    tool.diagram = diagram;

    // Simulate a drag: select node 1, mousedown, move, mouseup
    node.isSelected = true;
    const downEvent = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(downEvent);

    // Move the node visually by 50, 50
    node.bounds = { x: 50, y: 50, width: 100, height: 50 } as never;
    const upEvent = new MouseEvent('mouseup', { button: 0 });
    tool.doMouseUp(upEvent);

    expect(model.getNodeProperty(1, 'x')).toBe(50);
    expect(model.getNodeProperty(1, 'y')).toBe(50);
    expect(undoManager.canUndo()).toBe(true);

    undoManager.undo();
    expect(model.getNodeProperty(1, 'x')).toBe(0);
    expect(model.getNodeProperty(1, 'y')).toBe(0);
  });
});
