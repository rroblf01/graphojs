import { describe, expect, it } from 'vitest';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';

describe('GraphLinksModel', () => {
  describe('node operations', () => {
    it('adds a node with auto-generated key', () => {
      const model = new GraphLinksModel();
      const key = model.addNode({ label: 'A' });
      expect(key).toBe(1);
      expect(model.getNodeCount()).toBe(1);
    });

    it('adds a node with explicit key', () => {
      const model = new GraphLinksModel();
      const key = model.addNode({ key: 'n1', label: 'A' });
      expect(key).toBe('n1');
      expect(model.getNodeCount()).toBe(1);
    });

    it('throws on duplicate key', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      expect(() => model.addNode({ key: 'n1', label: 'B' })).toThrow(
        'Node with key n1 already exists',
      );
    });

    it('removes a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      expect(model.removeNode('n1')).toBe(true);
      expect(model.getNodeCount()).toBe(0);
    });

    it('returns false when removing non-existent node', () => {
      const model = new GraphLinksModel();
      expect(model.removeNode('n1')).toBe(false);
    });

    it('checks if node exists', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      expect(model.containsNode('n1')).toBe(true);
      expect(model.containsNode('n2')).toBe(false);
    });

    it('gets node data by key', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      expect(model.getNodeData('n1')).toEqual({ key: 'n1', label: 'A' });
    });

    it('sets and gets node property', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.setNodeProperty('n1', 'label', 'B');
      expect(model.getNodeProperty('n1', 'label')).toBe('B');
    });

    it('throws when setting property on non-existent node', () => {
      const model = new GraphLinksModel();
      expect(() => model.setNodeProperty('n1', 'label', 'B')).toThrow('Node with key n1 not found');
    });

    it('gets all node data', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      expect(model.getNodeDataArray()).toEqual([
        { key: 'n1', label: 'A' },
        { key: 'n2', label: 'B' },
      ]);
    });
  });

  describe('link operations', () => {
    it('adds a link', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      const linkKey = model.addLink({ from: 'n1', to: 'n2' });
      expect(linkKey).toBe(1);
      expect(model.getLinkCount()).toBe(1);
    });

    it('throws when adding link with missing source', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n2', label: 'B' });
      expect(() => model.addLink({ from: 'n1', to: 'n2' })).toThrow('Source node n1 not found');
    });

    it('throws when adding link with missing target', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      expect(() => model.addLink({ from: 'n1', to: 'n2' })).toThrow('Target node n2 not found');
    });

    it('throws when adding link without from/to', () => {
      const model = new GraphLinksModel();
      expect(() => model.addLink({ from: undefined as never, to: undefined as never })).toThrow(
        'Link must have "from" and "to" properties',
      );
    });

    it('accepts a link whose endpoint key is 0 (a legitimate falsy key, not "missing")', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 0, label: 'A' });
      model.addNode({ key: 1, label: 'B' });
      expect(() => model.addLink({ from: 0, to: 1 })).not.toThrow();
      expect(model.getLinkDataArray()).toHaveLength(1);
    });

    it('removes a link', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addLink({ from: 'n1', to: 'n2' });
      expect(model.removeLink(1)).toBe(true);
      expect(model.getLinkCount()).toBe(0);
    });

    it('returns false when removing non-existent link', () => {
      const model = new GraphLinksModel();
      expect(model.removeLink(1)).toBe(false);
    });

    it('gets links for a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addNode({ key: 'n3', label: 'C' });
      model.addLink({ from: 'n1', to: 'n2' });
      model.addLink({ from: 'n2', to: 'n3' });
      expect(model.getLinksForNode('n2')).toHaveLength(2);
    });

    it('gets links from a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addLink({ from: 'n1', to: 'n2' });
      expect(model.getLinksFrom('n1')).toHaveLength(1);
      expect(model.getLinksFrom('n2')).toHaveLength(0);
    });

    it('gets links to a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addLink({ from: 'n1', to: 'n2' });
      expect(model.getLinksTo('n2')).toHaveLength(1);
      expect(model.getLinksTo('n1')).toHaveLength(0);
    });

    it('checks if link exists', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addLink({ from: 'n1', to: 'n2' });
      expect(model.containsLink('n1', 'n2')).toBe(true);
      expect(model.containsLink('n2', 'n1')).toBe(false);
    });

    it('removes all links when removing a node', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addNode({ key: 'n3', label: 'C' });
      model.addLink({ from: 'n1', to: 'n2' });
      model.addLink({ from: 'n2', to: 'n3' });
      model.removeNode('n2');
      expect(model.getLinkCount()).toBe(0);
    });
  });

  describe('events', () => {
    it('emits node Added event', () => {
      const model = new GraphLinksModel();
      const events: unknown[] = [];
      model.addChangedListener((e) => events.push(e));
      model.addNode({ key: 'n1', label: 'A' });
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({ type: 'node Added' });
    });

    it('emits node Removed event', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      const events: unknown[] = [];
      model.addChangedListener((e) => events.push(e));
      model.removeNode('n1');
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({ type: 'node Removed' });
    });

    it('emits link Added event', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      const events: unknown[] = [];
      model.addChangedListener((e) => events.push(e));
      model.addLink({ from: 'n1', to: 'n2' });
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({ type: 'link Added' });
    });

    it('emits property Changed event', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      const events: unknown[] = [];
      model.addChangedListener((e) => events.push(e));
      model.setNodeProperty('n1', 'label', 'B');
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        type: 'property Changed',
        propertyName: 'label',
        oldValue: 'A',
        newValue: 'B',
      });
    });

    it('removes listener', () => {
      const model = new GraphLinksModel();
      const events: unknown[] = [];
      const listener = (e: unknown) => events.push(e);
      model.addChangedListener(listener);
      model.addNode({ key: 'n1', label: 'A' });
      expect(events).toHaveLength(1);
      model.removeChangedListener(listener);
      model.addNode({ key: 'n2', label: 'B' });
      expect(events).toHaveLength(1);
    });
  });

  describe('serialization', () => {
    it('converts to JSON', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addLink({ from: 'n1', to: 'n2' });
      const json = model.toJSON();
      expect(json.class).toBe('GraphLinksModel');
      expect(json.nodeDataArray).toHaveLength(2);
      expect(json.linkDataArray).toHaveLength(1);
    });

    it('creates from JSON', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addLink({ from: 'n1', to: 'n2' });

      const json = model.toJSON();
      const restored = GraphLinksModel.fromJSON(json);
      expect(restored.getNodeCount()).toBe(2);
      expect(restored.getLinkCount()).toBe(1);
      expect(restored.getNodeData('n1')).toEqual({ key: 'n1', label: 'A' });
    });

    it('round-trips JSON serialization', () => {
      const model = new GraphLinksModel();
      model.addNode({ key: 'n1', label: 'A' });
      model.addNode({ key: 'n2', label: 'B' });
      model.addNode({ key: 'n3', label: 'C' });
      model.addLink({ from: 'n1', to: 'n2' });
      model.addLink({ from: 'n2', to: 'n3' });

      const json = model.toJSON();
      const restored = GraphLinksModel.fromJSON(json);
      expect(model.equals(restored)).toBe(true);
    });
  });
});
