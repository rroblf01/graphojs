import { describe, it, expect } from 'vitest';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import type { NodeData, LinkData } from '../../src/model/Model.ts';

describe('Model validation', () => {
  it('should validate node before adding', () => {
    const model = new GraphLinksModel();
    model.isValidNode = (data: NodeData) => {
      return typeof data.label === 'string' && data.label.length > 0;
    };

    expect(() => model.addNode({ key: 1, label: '' })).toThrow('Node validation failed');
    expect(() => model.addNode({ key: 1, label: 'Valid' })).not.toThrow();
    expect(model.containsNode(1)).toBe(true);
  });

  it('should allow validation without callback', () => {
    const model = new GraphLinksModel();
    expect(model.validateNode({ key: 1 })).toBe(true);
  });

  it('should validate node removal', () => {
    const model = new GraphLinksModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2 });

    model.isValidNodeRemoval = (data: NodeData) => {
      return data.key !== 1;
    };

    expect(() => model.removeNode(1)).toThrow('Node removal validation failed');
    expect(model.removeNode(2)).toBe(true);
    expect(model.containsNode(1)).toBe(true);
  });

  it('should get and set node validation callbacks', () => {
    const model = new GraphLinksModel();
    const cb = (data: NodeData) => Boolean(data.key);
    model.isValidNode = cb;
    expect(model.isValidNode).toBe(cb);

    model.isValidNode = null;
    expect(model.isValidNode).toBeNull();
  });
});

describe('GraphLinksModel link validation', () => {
  function setupModel(): GraphLinksModel {
    const model = new GraphLinksModel();
    model.addNode({ key: 1 });
    model.addNode({ key: 2 });
    return model;
  }

  it('should reject self-loops when disallowed', () => {
    const model = setupModel();
    model.allowsSelfLoops = false;

    expect(() => model.addLink({ from: 1, to: 1 })).toThrow('Link validation failed');
    expect(() => model.addLink({ from: 1, to: 2 })).not.toThrow();
  });

  it('should allow self-loops by default', () => {
    const model = setupModel();
    expect(model.allowsSelfLoops).toBe(true);
    expect(() => model.addLink({ from: 1, to: 1 })).not.toThrow();
  });

  it('should reject duplicate links when disallowed', () => {
    const model = setupModel();
    model.allowsDuplicateLinks = false;

    model.addLink({ from: 1, to: 2 });
    expect(() => model.addLink({ from: 1, to: 2 })).toThrow('Link validation failed');
    expect(() => model.addLink({ from: 2, to: 1 })).not.toThrow();
  });

  it('should allow duplicate links by default', () => {
    const model = setupModel();
    expect(model.allowsDuplicateLinks).toBe(true);

    model.addLink({ key: 'a', from: 1, to: 2 });
    expect(() => model.addLink({ key: 'b', from: 1, to: 2 })).not.toThrow();
  });

  it('should validate link with callback', () => {
    const model = setupModel();
    model.isValidLink = (linkData: LinkData) => {
      return linkData.to !== 2;
    };

    expect(() => model.addLink({ from: 1, to: 2 })).toThrow('Link validation failed');
    expect(() => model.addLink({ from: 1, to: 1 })).not.toThrow();
  });

  it('should validate link removal', () => {
    const model = setupModel();
    model.addLink({ key: 100, from: 1, to: 2 });

    model.isValidLinkRemoval = (linkData: LinkData) => {
      return linkData.from !== 1;
    };

    expect(() => model.removeLink(100)).toThrow('Link removal validation failed');
    expect(model.getLinkCount()).toBe(1);
  });

  it('should get and set link validation callbacks', () => {
    const model = setupModel();
    const cb = (linkData: LinkData) => linkData.from !== linkData.to;
    model.isValidLink = cb;
    expect(model.isValidLink).toBe(cb);
  });

  it('should validate link without callback', () => {
    const model = setupModel();
    expect(model.validateLink({ from: 1, to: 2 })).toBe(true);
  });
});
