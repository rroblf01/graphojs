import { describe, expect, it } from 'vitest';
import { CommandHandler } from '../../src/command/CommandHandler.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import type { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';

function createMockDiagram(): Diagram {
  const model = new GraphLinksModel();
  const undoManager = new UndoManager();
  const parts = new Map<string | number, Node | Link>();

  model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
  model.addNode({ key: 2, x: 200, y: 100, width: 100, height: 50 });
  model.addNode({ key: 3, x: 400, y: 300, width: 100, height: 50 });

  const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
  const node2 = Node.fromPosAndSize(2, 200, 100, 100, 50);
  const node3 = Node.fromPosAndSize(3, 400, 300, 100, 50);
  parts.set(1, node1);
  parts.set(2, node2);
  parts.set(3, node3);

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

function selectAll(diagram: Diagram): void {
  for (const key of [1, 2, 3]) {
    (diagram.getPart(key) as Node).isSelected = true;
  }
}

describe('CommandHandler alignment', () => {
  it('should align left', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.align('left')).toBe(true);
    expect((diagram.getPart(1) as Node).bounds.x).toBe(0);
    expect((diagram.getPart(2) as Node).bounds.x).toBe(0);
    expect((diagram.getPart(3) as Node).bounds.x).toBe(0);
  });

  it('should align top', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.align('top')).toBe(true);
    expect((diagram.getPart(1) as Node).bounds.y).toBe(0);
    expect((diagram.getPart(2) as Node).bounds.y).toBe(0);
    expect((diagram.getPart(3) as Node).bounds.y).toBe(0);
  });

  it('should align right', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.align('right')).toBe(true);
    // Max right edge is node3 at 400+100=500, width 100 -> x=400
    expect((diagram.getPart(1) as Node).bounds.right).toBe(500);
    expect((diagram.getPart(2) as Node).bounds.right).toBe(500);
    expect((diagram.getPart(3) as Node).bounds.right).toBe(500);
  });

  it('should align bottom', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.align('bottom')).toBe(true);
    // Max bottom is node3 at 300+50=350, height 50 -> y=300
    expect((diagram.getPart(1) as Node).bounds.bottom).toBe(350);
    expect((diagram.getPart(2) as Node).bounds.bottom).toBe(350);
  });

  it('should align center horizontally', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.align('centerH')).toBe(true);
    // Group center x = (0 + 500)/2 = 250
    expect((diagram.getPart(1) as Node).bounds.x + 50).toBe(250);
    expect((diagram.getPart(2) as Node).bounds.x + 50).toBe(250);
  });

  it('should not align with single node', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    (diagram.getPart(1) as Node).isSelected = true;

    expect(handler.align('left')).toBe(false);
  });

  it('should be undoable', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    const model = diagram.getModel();
    selectAll(diagram);

    handler.align('left');
    expect(model.getNodeProperty(2, 'x')).toBe(0);

    handler.undo();
    expect(model.getNodeProperty(2, 'x')).toBe(200);

    handler.redo();
    expect(model.getNodeProperty(2, 'x')).toBe(0);
  });
});

describe('CommandHandler distribution', () => {
  it('should distribute horizontally', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.distributeHorizontally()).toBe(true);
    // Nodes stay ordered left to right
    expect((diagram.getPart(1) as Node).bounds.x).toBeLessThan(
      (diagram.getPart(2) as Node).bounds.x,
    );
    expect((diagram.getPart(2) as Node).bounds.x).toBeLessThan(
      (diagram.getPart(3) as Node).bounds.x,
    );
  });

  it('should distribute vertically', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    selectAll(diagram);

    expect(handler.distributeVertically()).toBe(true);
    expect((diagram.getPart(1) as Node).bounds.y).toBeLessThan(
      (diagram.getPart(2) as Node).bounds.y,
    );
    expect((diagram.getPart(2) as Node).bounds.y).toBeLessThan(
      (diagram.getPart(3) as Node).bounds.y,
    );
  });

  it('should not distribute with fewer than 3 nodes', () => {
    const diagram = createMockDiagram();
    const handler = new CommandHandler(diagram);
    (diagram.getPart(1) as Node).isSelected = true;
    (diagram.getPart(2) as Node).isSelected = true;

    expect(handler.distributeHorizontally()).toBe(false);
    expect(handler.distributeVertically()).toBe(false);
  });
});
