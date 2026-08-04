import { describe, it, expect } from 'vitest';
import { CommandHandler, createCommandHandler } from '../../src/command/CommandHandler.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';
import { Node } from '../../src/parts/Node.ts';
import type { Link } from '../../src/parts/Link.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(): Diagram {
  const model = new GraphLinksModel();
  const undoManager = new UndoManager();
  const parts = new Map<string | number, Node | Link>();

  model.addNode({ key: 101, x: 0, y: 0, label: 'A' });
  model.addNode({ key: 102, x: 100, y: 0, label: 'B' });

  const node1 = Node.fromPosAndSize(101, 0, 0, 100, 50);
  const node2 = Node.fromPosAndSize(102, 100, 0, 100, 50);
  parts.set(101, node1);
  parts.set(102, node2);

  return {
    getModel: () => model,
    getUndoManager: () => undoManager,
    getPart: (key: string | number) => parts.get(key),
    getSelectedParts: () => {
      const result: (Node | Link)[] = [];
      for (const [, part] of parts) {
        if (part.isSelected) result.push(part);
      }
      return result;
    },
    clearSelection: () => {
      for (const [, part] of parts) {
        part.isSelected = false;
      }
    },
    invalidate: () => {},
    undo: () => undoManager.undo(),
    redo: () => undoManager.redo(),
    fireDiagramEvent: () => {},
  } as unknown as Diagram;
}

describe('CommandHandler', () => {
  it('should create with defaults', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    expect(handler.getDiagram()).toBe(diagram);
    expect(handler.canCopy()).toBe(false);
    expect(handler.canPaste()).toBe(false);
    expect(handler.getClipboard()).toHaveLength(0);
  });

  it('should select all', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();

    expect(handler.selectAll()).toBe(true);
    expect(model.getNodeData(101)?.key).toBe(101);
  });

  it('should delete selection with undo', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();

    // Select node 1
    (diagram.getPart(101) as Node).isSelected = true;

    expect(handler.deleteSelection()).toBe(true);
    expect(model.containsNode(101)).toBe(false);
    expect(model.containsNode(102)).toBe(true);

    // Undo restores node 1
    expect(handler.undo()).toBe(true);
    expect(model.containsNode(101)).toBe(true);
  });

  it('should delete selection and connected links', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();

    model.addLink({ key: 100, from: 101, to: 102 });

    (diagram.getPart(101) as Node).isSelected = true;
    handler.deleteSelection();

    expect(model.containsNode(101)).toBe(false);
    // Link should be removed too (connected to deleted node)
    const linkData = model.getLinkDataArray().find((l) => model.getLinkKey(l) === 100);
    expect(linkData).toBeUndefined();
  });

  it('should copy and paste selection', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();

    (diagram.getPart(101) as Node).isSelected = true;
    expect(handler.copySelection()).toBe(true);
    expect(handler.canPaste()).toBe(true);
    expect(handler.getClipboard()).toHaveLength(1);

    const countBefore = model.getNodeCount();
    expect(handler.pasteClipboard()).toBe(true);
    expect(model.getNodeCount()).toBe(countBefore + 1);
  });

  it('should cut selection (copy + delete)', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();

    (diagram.getPart(101) as Node).isSelected = true;
    expect(handler.cutSelection()).toBe(true);
    expect(model.containsNode(101)).toBe(false);
    expect(handler.canPaste()).toBe(true);
  });

  it('should clear clipboard', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);

    (diagram.getPart(101) as Node).isSelected = true;
    handler.copySelection();
    expect(handler.canPaste()).toBe(true);

    handler.clearClipboard();
    expect(handler.canPaste()).toBe(false);
    expect(handler.getClipboard()).toHaveLength(0);
  });

  it('should set clipboard', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    handler.setClipboard([{ key: 99, label: 'X' }]);
    expect(handler.getClipboard()).toHaveLength(1);
  });

  it('should not delete when nothing selected', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    expect(handler.deleteSelection()).toBe(false);
    expect(handler.copySelection()).toBe(false);
  });

  it('should undo and redo', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();

    (diagram.getPart(101) as Node).isSelected = true;
    handler.deleteSelection();
    expect(model.containsNode(101)).toBe(false);

    expect(handler.undo()).toBe(true);
    expect(model.containsNode(101)).toBe(true);

    expect(handler.redo()).toBe(true);
    expect(model.containsNode(101)).toBe(false);
  });

  it('should create command handler via factory', () => {
    const diagram = createMockDiagram();
    const handler = createCommandHandler(diagram);
    expect(handler).toBeInstanceOf(CommandHandler);
  });
});
