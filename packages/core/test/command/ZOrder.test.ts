import { describe, it, expect } from 'vitest';
import { CommandHandler } from '../../src/command/CommandHandler.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';
import { Node } from '../../src/parts/Node.ts';
import { Layer } from '../../src/layer/Layer.ts';
import type { Link } from '../../src/parts/Link.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(): Diagram {
  const model = new GraphLinksModel();
  const undoManager = new UndoManager();
  const parts = new Map<string | number, Node | Link>();
  const layer = new Layer('Default', 0);

  model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
  model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });

  const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
  const node2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
  node1.layer = layer;
  node2.layer = layer;
  parts.set(1, node1);
  parts.set(2, node2);

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
  } as unknown as Diagram;
}

describe('CommandHandler z-order', () => {
  it('should bring selected part to front', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    (diagram.getPart(1) as Node).isSelected = true;
    (diagram.getPart(1) as Node).zOrder = 5;

    expect(handler.bringToFront()).toBe(true);
    expect((diagram.getPart(1) as Node).zOrder).toBeGreaterThan(5);
  });

  it('should send selected part to back', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    (diagram.getPart(2) as Node).isSelected = true;
    (diagram.getPart(2) as Node).zOrder = 5;

    expect(handler.sendToBack()).toBe(true);
    expect((diagram.getPart(2) as Node).zOrder).toBeLessThan(5);
  });

  it('should raise and lower z-order', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const node = diagram.getPart(1) as Node;
    node.isSelected = true;
    node.zOrder = 10;

    expect(handler.raise()).toBe(true);
    expect(node.zOrder).toBe(11);

    expect(handler.lower()).toBe(true);
    expect(node.zOrder).toBe(10);
  });

  it('should be undoable', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();
    const node = diagram.getPart(1) as Node;
    node.isSelected = true;
    node.zOrder = 5;
    model.setNodeProperty(1, 'zOrder', 5);

    handler.raise();
    expect(model.getNodeProperty(1, 'zOrder')).toBe(6);

    handler.undo();
    expect(model.getNodeProperty(1, 'zOrder')).toBe(5);

    handler.redo();
    expect(model.getNodeProperty(1, 'zOrder')).toBe(6);
  });

  it('should not operate with no selection', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    expect(handler.bringToFront()).toBe(false);
    expect(handler.sendToBack()).toBe(false);
    expect(handler.raise()).toBe(false);
    expect(handler.lower()).toBe(false);
  });
});
