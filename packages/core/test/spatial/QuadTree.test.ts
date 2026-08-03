import { describe, it, expect } from 'vitest';
import { QuadTree } from '../../src/spatial/QuadTree.ts';
import { Rect } from '../../src/geometry/Rect.ts';

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
