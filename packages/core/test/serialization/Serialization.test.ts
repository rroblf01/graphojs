import { describe, it, expect } from 'vitest';
import { UndoManager } from '../../src/undo/UndoManager.ts';
import {
  AddNodeCommand,
  RemoveNodeCommand,
  SetNodePropertyCommand,
  AddLinkCommand,
  RemoveLinkCommand,
  MoveNodeCommand,
} from '../../src/undo/commands.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';

describe('UndoManager', () => {
  it('should start with empty stacks', () => {
    const manager = new UndoManager();
    expect(manager.canUndo()).toBe(false);
    expect(manager.canRedo()).toBe(false);
  });

  it('should track undo/redo state', () => {
    const manager = new UndoManager();
    const model = new GraphLinksModel();
    const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

    manager.execute(command);
    expect(manager.canUndo()).toBe(true);
    expect(manager.canRedo()).toBe(false);
  });

  it('should undo a command', () => {
    const manager = new UndoManager();
    const model = new GraphLinksModel();
    const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

    manager.execute(command);
    expect(model.getNodeCount()).toBe(1);

    manager.undo();
    expect(model.getNodeCount()).toBe(0);
    expect(manager.canRedo()).toBe(true);
  });

  it('should redo a command', () => {
    const manager = new UndoManager();
    const model = new GraphLinksModel();
    const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

    manager.execute(command);
    manager.undo();
    manager.redo();

    expect(model.getNodeCount()).toBe(1);
    expect(manager.canUndo()).toBe(true);
  });

  it('should clear redo stack on new command', () => {
    const manager = new UndoManager();
    const model = new GraphLinksModel();
    const cmd1 = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });
    const cmd2 = new AddNodeCommand(model, { key: 2, x: 100, y: 0 });

    manager.execute(cmd1);
    manager.undo();
    manager.execute(cmd2);

    expect(manager.canRedo()).toBe(false);
  });

  it('should limit history size', () => {
    const manager = new UndoManager(3);
    const model = new GraphLinksModel();

    for (let i = 1; i <= 5; i++) {
      manager.execute(new AddNodeCommand(model, { key: i, x: 0, y: 0 }));
    }

    expect(manager.getUndoStack().length).toBe(3);
  });

  it('should get command descriptions', () => {
    const manager = new UndoManager();
    const model = new GraphLinksModel();
    const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

    manager.execute(command);
    expect(manager.getUndoDescription()).toBe('Add node 1');
  });

  it('should clear history', () => {
    const manager = new UndoManager();
    const model = new GraphLinksModel();
    const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

    manager.execute(command);
    manager.clear();

    expect(manager.canUndo()).toBe(false);
    expect(manager.canRedo()).toBe(false);
  });
});

describe('Commands', () => {
  describe('AddNodeCommand', () => {
    it('should add a node', () => {
      const model = new GraphLinksModel();
      const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

      command.execute();
      expect(model.getNodeCount()).toBe(1);
    });

    it('should undo adding a node', () => {
      const model = new GraphLinksModel();
      const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

      command.execute();
      command.undo();
      expect(model.getNodeCount()).toBe(0);
    });

    it('should describe the command', () => {
      const model = new GraphLinksModel();
      const command = new AddNodeCommand(model, { key: 1, x: 0, y: 0 });

      expect(command.describe()).toBe('Add node 1');
    });
  });

  describe('RemoveNodeCommand', () => {
    it('should remove a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      const command = new RemoveNodeCommand(model, 1);

      command.execute();
      expect(model.getNodeCount()).toBe(0);
    });

    it('should undo removing a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      const command = new RemoveNodeCommand(model, 1);

      command.execute();
      command.undo();
      expect(model.getNodeCount()).toBe(1);
    });
  });

  describe('SetNodePropertyCommand', () => {
    it('should set a property', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      const command = new SetNodePropertyCommand(model, 1, 'label', 'Test');

      command.execute();
      expect(model.getNodeProperty(1, 'label')).toBe('Test');
    });

    it('should undo setting a property', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0, label: 'Original' });
      const command = new SetNodePropertyCommand(model, 1, 'label', 'Changed');

      command.execute();
      command.undo();
      expect(model.getNodeProperty(1, 'label')).toBe('Original');
    });
  });

  describe('AddLinkCommand', () => {
    it('should add a link', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      model.addNode({ key: 2, x: 100, y: 0 });
      const command = new AddLinkCommand(model, { key: 100, from: 1, to: 2 });

      command.execute();
      expect(model.getLinkCount()).toBe(1);
    });

    it('should undo adding a link', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      model.addNode({ key: 2, x: 100, y: 0 });
      const command = new AddLinkCommand(model, { key: 100, from: 1, to: 2 });

      command.execute();
      command.undo();
      expect(model.getLinkCount()).toBe(0);
    });
  });

  describe('RemoveLinkCommand', () => {
    it('should remove a link', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      model.addNode({ key: 2, x: 100, y: 0 });
      model.addLink({ key: 100, from: 1, to: 2 });
      const command = new RemoveLinkCommand(model, 100);

      command.execute();
      expect(model.getLinkCount()).toBe(0);
    });

    it('should undo removing a link', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      model.addNode({ key: 2, x: 100, y: 0 });
      model.addLink({ key: 100, from: 1, to: 2 });
      const command = new RemoveLinkCommand(model, 100);

      command.execute();
      command.undo();
      expect(model.getLinkCount()).toBe(1);
    });
  });

  describe('MoveNodeCommand', () => {
    it('should move a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      const command = new MoveNodeCommand(model, 1, 100, 200);

      command.execute();
      expect(model.getNodeProperty(1, 'x')).toBe(100);
      expect(model.getNodeProperty(1, 'y')).toBe(200);
    });

    it('should undo moving a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 1, x: 0, y: 0 });
      const command = new MoveNodeCommand(model, 1, 100, 200);

      command.execute();
      command.undo();
      expect(model.getNodeProperty(1, 'x')).toBe(0);
      expect(model.getNodeProperty(1, 'y')).toBe(0);
    });
  });
});
