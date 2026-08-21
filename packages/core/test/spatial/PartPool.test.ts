import { describe, expect, it } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';
import { Node } from '../../src/parts/Node.ts';
import { PartPool } from '../../src/spatial/PartPool.ts';
import { VirtualizationManager } from '../../src/spatial/VirtualizationManager.ts';

describe('PartPool', () => {
  it('should create with defaults', () => {
    const pool = new PartPool();
    expect(pool.availableNodeCount).toBe(0);
    expect(pool.activeCount).toBe(0);
    expect(pool.pooledCount).toBe(0);
  });

  it('should acquire new nodes', () => {
    const pool = new PartPool();
    const node = pool.acquireNode(1, new Rect(0, 0, 100, 50));

    expect(node).toBeInstanceOf(Node);
    expect(node.key).toBe(1);
    expect(pool.activeNodeCount).toBe(1);
  });

  it('should reuse released nodes', () => {
    const pool = new PartPool();
    const node = pool.acquireNode(1, new Rect(0, 0, 100, 50));
    pool.releaseNode(node);

    expect(pool.availableNodeCount).toBe(1);
    expect(pool.activeNodeCount).toBe(0);

    const node2 = pool.acquireNode(2, new Rect(10, 10, 50, 50));
    expect(node2).toBe(node); // Same instance reused
    expect(pool.availableNodeCount).toBe(0);
    expect(pool.activeNodeCount).toBe(1);
  });

  it('should acquire and release links', () => {
    const pool = new PartPool();
    const link = pool.acquireLink(100);
    expect(pool.activeLinkCount).toBe(1);

    pool.releaseLink(link);
    expect(pool.availableLinkCount).toBe(1);
    expect(pool.activeLinkCount).toBe(0);
  });

  it('should acquire and release groups', () => {
    const pool = new PartPool();
    const group = pool.acquireGroup(1, new Rect(0, 0, 200, 100));
    expect(pool.activeGroupCount).toBe(1);

    pool.releaseGroup(group);
    expect(pool.availableGroupCount).toBe(1);
    expect(pool.activeGroupCount).toBe(0);
  });

  it('should respect max pool size', () => {
    const pool = new PartPool(2);
    const nodes = [
      pool.acquireNode(1, new Rect(0, 0, 10, 10)),
      pool.acquireNode(2, new Rect(0, 0, 10, 10)),
      pool.acquireNode(3, new Rect(0, 0, 10, 10)),
    ];

    for (const node of nodes) {
      pool.releaseNode(node);
    }

    // Only 2 should be pooled, 1 discarded (not pooled)
    expect(pool.availableNodeCount).toBe(2);
    expect(pool.activeNodeCount).toBe(0);
  });

  it('should clear the pool', () => {
    const pool = new PartPool();
    const node = pool.acquireNode(1, new Rect(0, 0, 10, 10));
    pool.releaseNode(node);
    pool.clear();

    expect(pool.pooledCount).toBe(0);
    expect(pool.activeCount).toBe(0);
  });
});

describe('VirtualizationManager', () => {
  it('should create with defaults', () => {
    const manager = new VirtualizationManager(new Rect(0, 0, 1000, 1000));
    expect(manager.isEnabled).toBe(false);
    expect(manager.culledCount).toBe(0);
    expect(manager.itemCount).toBe(0);
  });

  it('should insert and remove parts', () => {
    const manager = new VirtualizationManager(new Rect(0, 0, 1000, 1000));
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    manager.insert(node);
    expect(manager.itemCount).toBe(1);

    expect(manager.remove(node)).toBe(true);
    expect(manager.itemCount).toBe(0);
  });

  it('should query parts in region', () => {
    const manager = new VirtualizationManager(new Rect(0, 0, 1000, 1000));
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 800, 800, 100, 50);

    manager.insert(node1);
    manager.insert(node2);

    const result = manager.queryRegion(new Rect(0, 0, 200, 200));
    expect(result).toContain(node1);
    expect(result).not.toContain(node2);
  });

  it('should cull based on viewport', () => {
    const manager = new VirtualizationManager(new Rect(0, 0, 1000, 1000));
    manager.isEnabled = true;

    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 800, 800, 100, 50);
    manager.insert(node1);
    manager.insert(node2);

    const visible = manager.cull(new Rect(0, 0, 200, 200));
    expect(visible).toContain(node1);
    expect(visible).not.toContain(node2);
    expect(manager.culledCount).toBe(1);
  });

  it('should not cull when disabled', () => {
    const manager = new VirtualizationManager(new Rect(0, 0, 1000, 1000));
    manager.isEnabled = false;

    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    manager.insert(node1);

    const visible = manager.cull(new Rect(0, 0, 200, 200));
    expect(visible).toHaveLength(0);
    expect(manager.culledCount).toBe(0);
  });

  it('should create viewport with padding', () => {
    const viewport = VirtualizationManager.createViewport(10, 20, 100, 50, 5);
    expect(viewport.x).toBe(5);
    expect(viewport.y).toBe(15);
    expect(viewport.width).toBe(110);
    expect(viewport.height).toBe(60);
  });

  it('should clear', () => {
    const manager = new VirtualizationManager(new Rect(0, 0, 1000, 1000));
    manager.insert(Node.fromPosAndSize(1, 0, 0, 100, 50));
    manager.clear();
    expect(manager.itemCount).toBe(0);
  });
});
