import { describe, it, expect } from 'vitest';
import { LayeredDigraphLayout } from '../../src/layout/LayeredDigraphLayout.ts';
import { Node } from '../../src/parts/Node.ts';
import { Link } from '../../src/parts/Link.ts';

describe('LayeredDigraphLayout', () => {
  it('should create with defaults', () => {
    const layout = new LayeredDigraphLayout();
    expect(layout).toBeInstanceOf(LayeredDigraphLayout);
  });

  it('should handle empty nodes', () => {
    const layout = new LayeredDigraphLayout();
    expect(() => layout.apply([], [])).not.toThrow();
  });

  it('should assign nodes to layers by depth', () => {
    const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const n2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const n3 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const link1 = new Link(100, 1, 2);
    const link2 = new Link(101, 2, 3);

    const layout = new LayeredDigraphLayout({ spacing: 50, layerSpacing: 100 });
    layout.apply([n1, n2, n3], [link1, link2]);

    // Root (n1) should be at the top
    expect(n1.bounds.y).toBeLessThan(n2.bounds.y);
    expect(n2.bounds.y).toBeLessThan(n3.bounds.y);
  });

  it('should lay out siblings in the same layer', () => {
    const root = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const a = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const b = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const linkA = new Link(100, 1, 2);
    const linkB = new Link(101, 1, 3);

    const layout = new LayeredDigraphLayout();
    layout.apply([root, a, b], [linkA, linkB]);

    // Siblings a and b should be at the same layer (same y)
    expect(a.bounds.y).toBe(b.bounds.y);
    // Root above both
    expect(root.bounds.y).toBeLessThan(a.bounds.y);
  });

  it('should handle horizontal direction', () => {
    const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const n2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const link = new Link(100, 1, 2);

    const layout = new LayeredDigraphLayout({ direction: 'horizontal' });
    layout.apply([n1, n2], [link]);

    // Root should be on the left
    expect(n1.bounds.x).toBeLessThan(n2.bounds.x);
  });

  it('should handle isolated nodes', () => {
    const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const n2 = Node.fromPosAndSize(2, 0, 0, 100, 50);

    const layout = new LayeredDigraphLayout();
    expect(() => layout.apply([n1, n2], [])).not.toThrow();
    expect(n1.bounds.y).toBe(n2.bounds.y); // Both isolated at layer 0
  });

  it('should handle diamond graph without error', () => {
    const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const n2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const n3 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const n4 = Node.fromPosAndSize(4, 0, 0, 100, 50);
    const links = [new Link(1, 1, 2), new Link(2, 1, 3), new Link(3, 2, 4), new Link(4, 3, 4)];

    const layout = new LayeredDigraphLayout();
    expect(() => layout.apply([n1, n2, n3, n4], links)).not.toThrow();
  });

  it('should handle cycle without infinite loop', () => {
    const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const n2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const n3 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const links = [new Link(1, 1, 2), new Link(2, 2, 3), new Link(3, 3, 1)];

    const layout = new LayeredDigraphLayout();
    expect(() => layout.apply([n1, n2, n3], links)).not.toThrow();
  });

  it('should respect padding', () => {
    const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const layout = new LayeredDigraphLayout({ padding: 25 });
    layout.apply([n1], []);
    // Single node is centered at origin
    expect(n1.bounds.x).toBe(-50);
    expect(n1.bounds.y).toBe(-25);
  });
});
