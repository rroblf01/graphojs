import { describe, expect, it } from 'vitest';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { AddNodeCommand } from '../../src/undo/commands.ts';
import { createTransaction, Transaction } from '../../src/undo/Transaction.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';

describe('Transaction', () => {
  it('should create with name and default size', () => {
    const transaction = new Transaction('My Transaction');
    expect(transaction.name).toBe('My Transaction');
    expect(transaction.size).toBe(0);
    expect(transaction.isEmpty).toBe(true);
  });

  it('should add commands', () => {
    const model = new GraphLinksModel();
    const transaction = new Transaction();
    transaction.add(new AddNodeCommand(model, { key: 1, x: 0, y: 0 }));

    expect(transaction.size).toBe(1);
    expect(transaction.isEmpty).toBe(false);
  });

  it('should execute all commands', () => {
    const model = new GraphLinksModel();
    const transaction = new Transaction();
    transaction.add(new AddNodeCommand(model, { key: 1, x: 0, y: 0 }));
    transaction.add(new AddNodeCommand(model, { key: 2, x: 10, y: 10 }));

    transaction.execute();
    expect(model.getNodeCount()).toBe(2);
    expect(model.containsNode(1)).toBe(true);
    expect(model.containsNode(2)).toBe(true);
  });

  it('should undo all commands in reverse order', () => {
    const model = new GraphLinksModel();
    const transaction = new Transaction();
    transaction.add(new AddNodeCommand(model, { key: 1, x: 0, y: 0 }));
    transaction.add(new AddNodeCommand(model, { key: 2, x: 10, y: 10 }));

    transaction.execute();
    transaction.undo();

    expect(model.getNodeCount()).toBe(0);
  });

  it('should describe with count', () => {
    const transaction = new Transaction('Bulk');
    const model = new GraphLinksModel();
    transaction.add(new AddNodeCommand(model, { key: 1 }));
    transaction.add(new AddNodeCommand(model, { key: 2 }));

    expect(transaction.describe()).toBe('Bulk (2 commands)');
  });

  it('should remove last command', () => {
    const model = new GraphLinksModel();
    const transaction = new Transaction();
    const cmd1 = new AddNodeCommand(model, { key: 1 });
    const cmd2 = new AddNodeCommand(model, { key: 2 });
    transaction.add(cmd1);
    transaction.add(cmd2);

    const removed = transaction.removeLast();
    expect(removed).toBe(cmd2);
    expect(transaction.size).toBe(1);
  });

  it('should clear commands', () => {
    const model = new GraphLinksModel();
    const transaction = new Transaction();
    transaction.add(new AddNodeCommand(model, { key: 1 }));
    transaction.clear();
    expect(transaction.isEmpty).toBe(true);
  });

  it('should create via factory', () => {
    const transaction = createTransaction('Factory');
    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.name).toBe('Factory');
  });
});

describe('UndoManager transactions', () => {
  it('should begin and commit a transaction', () => {
    const model = new GraphLinksModel();
    const manager = new UndoManager();

    manager.beginTransaction('Add two');
    manager.execute(new AddNodeCommand(model, { key: 1 }));
    manager.execute(new AddNodeCommand(model, { key: 2 }));
    const transaction = manager.commitTransaction();

    expect(transaction).not.toBeNull();
    expect(transaction?.size).toBe(2);
    expect(model.getNodeCount()).toBe(2);
    expect(manager.canUndo()).toBe(true);
    expect(manager.getUndoStack()).toHaveLength(1);
  });

  it('should undo a transaction as a single unit', () => {
    const model = new GraphLinksModel();
    const manager = new UndoManager();

    manager.beginTransaction('Add two');
    manager.execute(new AddNodeCommand(model, { key: 1 }));
    manager.execute(new AddNodeCommand(model, { key: 2 }));
    manager.commitTransaction();

    expect(manager.undo()).toBe(true);
    expect(model.getNodeCount()).toBe(0);
    expect(manager.canUndo()).toBe(false);
  });

  it('should redo a transaction', () => {
    const model = new GraphLinksModel();
    const manager = new UndoManager();

    manager.beginTransaction('Add two');
    manager.execute(new AddNodeCommand(model, { key: 1 }));
    manager.execute(new AddNodeCommand(model, { key: 2 }));
    manager.commitTransaction();

    manager.undo();
    expect(model.getNodeCount()).toBe(0);

    manager.redo();
    expect(model.getNodeCount()).toBe(2);
  });

  it('should rollback a transaction undoing its commands', () => {
    const model = new GraphLinksModel();
    const manager = new UndoManager();

    manager.beginTransaction('Temp');
    manager.execute(new AddNodeCommand(model, { key: 1 }));
    expect(model.getNodeCount()).toBe(1);

    const result = manager.rollbackTransaction();
    expect(result).toBe(true);
    expect(model.getNodeCount()).toBe(0);
    expect(manager.canUndo()).toBe(false);
  });

  it('should track open transactions', () => {
    const manager = new UndoManager();
    expect(manager.isTransactionOpen()).toBe(false);

    manager.beginTransaction();
    expect(manager.isTransactionOpen()).toBe(true);
    expect(manager.getTransactionDepth()).toBe(1);

    manager.beginTransaction('Nested');
    expect(manager.getTransactionDepth()).toBe(2);

    manager.commitTransaction();
    expect(manager.getTransactionDepth()).toBe(1);

    manager.commitTransaction();
    expect(manager.isTransactionOpen()).toBe(false);
  });

  it('should commit nested transactions into parent', () => {
    const model = new GraphLinksModel();
    const manager = new UndoManager();

    manager.beginTransaction('Outer');
    manager.beginTransaction('Inner');
    manager.execute(new AddNodeCommand(model, { key: 1 }));
    manager.commitTransaction(); // commits inner into outer

    expect(manager.getTransactionDepth()).toBe(1);

    const outer = manager.commitTransaction();
    expect(outer).not.toBeNull();
    expect(outer?.size).toBe(1);
    expect(manager.getUndoStack()).toHaveLength(1);
  });

  it('should ignore empty transactions on commit', () => {
    const manager = new UndoManager();

    manager.beginTransaction('Empty');
    const transaction = manager.commitTransaction();

    expect(transaction).not.toBeNull();
    expect(transaction?.isEmpty).toBe(true);
    expect(manager.canUndo()).toBe(false);
  });

  it('should not push to undo stack when no transaction open', () => {
    const model = new GraphLinksModel();
    const manager = new UndoManager();

    manager.execute(new AddNodeCommand(model, { key: 1 }));
    expect(manager.getUndoStack()).toHaveLength(1);
  });
});
