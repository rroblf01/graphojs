import { describe, expect, it } from 'vitest';
import { TreeModel } from '../../src/model/TreeModel.ts';

describe('TreeModel', () => {
  it('should create with defaults', () => {
    const model = new TreeModel();
    expect(model.getParentKeyProperty()).toBe('parent');
    expect(model.getNodeCount()).toBe(0);
  });

  it('should add root nodes', () => {
    const model = new TreeModel();
    model.addNode({ key: 1, label: 'Root' });
    expect(model.containsNode(1)).toBe(true);
    expect(model.isRoot(1)).toBe(true);
  });

  it('should add nodes with parents', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3, parent: 1 });
    model.addNode({ key: 4, parent: 2 });

    expect(model.getParentKeyForNode(2)).toBe(1);
    expect(model.getChildKeys(1)).toEqual([2, 3]);
    expect(model.getChildCount(1)).toBe(2);
    expect(model.hasChildren(2)).toBe(true);
  });

  it('should reject parent not in model', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    expect(() => model.addNode({ key: 2, parent: 99 })).toThrow('Parent node 99 not found');
  });

  it('should get descendants recursively', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3, parent: 2 });
    model.addNode({ key: 4, parent: 3 });

    const descendants = model.getDescendants(1);
    expect(descendants).toHaveLength(3);
    expect(descendants.map((d) => d.key)).toEqual([2, 3, 4]);
  });

  it('should remove node and descendants', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3, parent: 2 });

    expect(model.removeNode(1)).toBe(true);
    expect(model.getNodeCount()).toBe(0);
  });

  it('should get root nodes', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3 });

    const roots = model.getRootNodes();
    expect(roots).toHaveLength(2);
  });

  it('should compute depth', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3, parent: 2 });
    model.addNode({ key: 4, parent: 3 });

    expect(model.getDepth(1)).toBe(0);
    expect(model.getDepth(2)).toBe(1);
    expect(model.getDepth(3)).toBe(2);
    expect(model.getDepth(4)).toBe(3);
  });

  it('should set parent', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2 });
    model.addNode({ key: 3 });

    model.setParent(2, 1);
    expect(model.getParentKeyForNode(2)).toBe(1);

    // Make node 2 a root
    model.setParent(2, undefined);
    expect(model.getParentKeyForNode(2)).toBeUndefined();
  });

  it('should reject self-parenting', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    expect(() => model.setParent(1, 1)).toThrow('own parent');
  });

  it('should reject cycles', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3, parent: 2 });

    // Trying to make 1 a child of 3 creates a cycle
    expect(() => model.setParent(1, 3)).toThrow('cycle');
  });

  it('should get parent node data', () => {
    const model = new TreeModel();
    model.addNode({ key: 1, label: 'P' });
    model.addNode({ key: 2, parent: 1 });

    const parent = model.getParentNode(2);
    expect(parent?.label).toBe('P');
  });

  it('should serialize and deserialize', () => {
    const model = new TreeModel();
    model.addNode({ key: 1, label: 'Root' });
    model.addNode({ key: 2, parent: 1, label: 'Child' });

    const json = model.toJSON();
    expect(json.class).toBe('TreeModel');
    expect(json.parentKeyProperty).toBe('parent');

    const restored = TreeModel.fromJSON(json);
    expect(restored.getNodeCount()).toBe(2);
    expect(restored.getParentKeyForNode(2)).toBe(1);
    expect(restored.getNodeData(2)?.label).toBe('Child');
  });

  it('should set custom parent key property', () => {
    const model = new TreeModel();
    model.setParentKeyProperty('pid');
    model.addNode({ key: 1 });
    model.addNode({ key: 2, pid: 1 });
    expect(model.getParentKeyForNode(2)).toBe(1);
    expect(model.getParentKeyProperty()).toBe('pid');
  });

  it('should get parent key for missing node', () => {
    const model = new TreeModel();
    expect(model.getParentKeyForNode(99)).toBeUndefined();
  });

  it('should reject mutations when read-only', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.isReadOnly = true;

    expect(() => model.addNode({ key: 2 })).toThrow('Cannot modify a read-only model');
    expect(() => model.removeNode(1)).toThrow('Cannot modify a read-only model');
    expect(() => model.setParent(1, undefined)).toThrow('Cannot modify a read-only model');
    expect(model.getNodeCount()).toBe(1);
  });

  it('should roll back addNode/removeNode/setParent within a transaction', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });

    model.startTransaction();
    model.addNode({ key: 3 });
    expect(model.rollbackTransaction()).toBe(true);
    expect(model.containsNode(3)).toBe(false);

    model.startTransaction();
    model.removeNode(2);
    expect(model.rollbackTransaction()).toBe(true);
    expect(model.containsNode(2)).toBe(true);
    expect(model.getParentKeyForNode(2)).toBe(1);

    model.startTransaction();
    model.setParent(2, undefined);
    expect(model.isRoot(2)).toBe(true);
    expect(model.rollbackTransaction()).toBe(true);
    expect(model.getParentKeyForNode(2)).toBe(1);
  });

  it('should report the correct oldValue when a property Changed event fires from setParent', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2, parent: 1 });
    model.addNode({ key: 3 });

    let seenOldValue: unknown;
    let seenNewValue: unknown;
    model.addChangedListener((event) => {
      if (event.type === 'property Changed') {
        seenOldValue = event.oldValue;
        seenNewValue = event.newValue;
      }
    });

    model.setParent(2, 3);
    expect(seenOldValue).toBe(1);
    expect(seenNewValue).toBe(3);
  });
});
