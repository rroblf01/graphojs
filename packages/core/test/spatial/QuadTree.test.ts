import { describe, expect, it } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';
import { QuadTree } from '../../src/spatial/QuadTree.ts';

describe('QuadTree', () => {
  it('should insert and query items', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insert(100, 100, 'A');
    tree.insert(900, 900, 'B');

    expect(tree.itemCount).toBe(2);

    const result = tree.queryRegion(new Rect(0, 0, 200, 200));
    expect(result).toContain('A');
    expect(result).not.toContain('B');
  });

  it('should query all items in region', () => {
    const tree = new QuadTree<number>(new Rect(0, 0, 1000, 1000));
    for (let i = 0; i < 100; i++) {
      tree.insert((i * 37) % 1000, (i * 53) % 1000, i);
    }

    const result = tree.queryRegion(new Rect(0, 0, 500, 500));
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  it('should handle subdividing', () => {
    const tree = new QuadTree<number>(new Rect(0, 0, 1000, 1000), { maxItems: 4, maxDepth: 4 });
    for (let i = 0; i < 50; i++) {
      tree.insert(i * 10, i * 10, i);
    }
    expect(tree.itemCount).toBe(50);
    expect(tree.isLeaf()).toBe(false);
  });

  it('should query items in a circle', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insert(100, 100, 'center');
    tree.insert(500, 500, 'far');
    tree.insert(120, 120, 'near');

    const result = tree.queryCircle(100, 100, 50);
    expect(result).toContain('center');
    expect(result).toContain('near');
    expect(result).not.toContain('far');
  });

  it('should find nearest item', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insert(100, 100, 'A');
    tree.insert(900, 900, 'B');
    tree.insert(110, 95, 'C');

    const nearest = tree.queryNearest(105, 100, 200);
    expect(nearest).toBe('A');
  });

  it('should remove items', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insert(100, 100, 'A');
    tree.insert(200, 200, 'B');
    expect(tree.itemCount).toBe(2);

    expect(tree.remove('A')).toBe(true);
    expect(tree.itemCount).toBe(1);
    expect(tree.remove('A')).toBe(false);

    const result = tree.queryRegion(new Rect(0, 0, 1000, 1000));
    expect(result).toContain('B');
    expect(result).not.toContain('A');
  });

  it('should clear', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insert(100, 100, 'A');
    tree.insert(200, 200, 'B');
    tree.clear();

    expect(tree.itemCount).toBe(0);
    expect(tree.getAllItems()).toHaveLength(0);
  });

  it('should ignore insertions outside bounds', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 100, 100));
    tree.insert(500, 500, 'outside');
    expect(tree.itemCount).toBe(0);
  });

  it('should get all items', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000), { maxItems: 2 });
    for (let i = 0; i < 10; i++) {
      tree.insert(i * 100, i * 100, `item-${i}`);
    }
    const all = tree.getAllItems();
    expect(all).toHaveLength(10);
  });

  it('should insert with bounds using center', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insertWithBounds(new Rect(100, 100, 50, 50), 'centered');

    const result = tree.queryRegion(new Rect(0, 0, 300, 300));
    expect(result).toContain('centered');
  });

  it('should find a large item whose center is outside the query region but whose edge overlaps it', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    // Spans x:250-550 — its center (400,50) sits outside the 0..300 query
    // region, but the rectangle itself overlaps it on x:250-300.
    tree.insertWithBounds(new Rect(250, 0, 300, 100), 'wide-node');

    const result = tree.queryRegion(new Rect(0, 0, 300, 300));
    expect(result).toContain('wide-node');
  });

  it('should still find a bounded item after the tree subdivides past its partition boundary', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000), { maxItems: 2 });
    // Force a subdivision by inserting enough small, unrelated point items.
    for (let i = 0; i < 20; i++) {
      tree.insert(900 + (i % 10), 900 + (i % 10), `filler-${i}`);
    }
    expect(tree.isLeaf()).toBe(false);
    // A wide item straddling the left/right child partition boundary at x=500.
    tree.insertWithBounds(new Rect(450, 0, 100, 50), 'straddling');

    expect(tree.queryRegion(new Rect(0, 0, 460, 100))).toContain('straddling');
    expect(tree.queryRegion(new Rect(540, 0, 460, 100))).toContain('straddling');
  });

  it('should query region with points', () => {
    const tree = new QuadTree<string>(new Rect(0, 0, 1000, 1000));
    tree.insert(100, 100, 'A');

    const result = tree.queryRegionWithPoints(new Rect(0, 0, 200, 200));
    expect(result).toHaveLength(1);
    expect(result[0]?.x).toBe(100);
    expect(result[0]?.y).toBe(100);
    expect(result[0]?.data).toBe('A');
  });
});
