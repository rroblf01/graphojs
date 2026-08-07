import { describe, expect, it } from 'vitest';
import { LayeredDigraphLayout } from '../../src/layout/LayeredDigraphLayout.ts';
import { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';

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

  it('median-heuristic crossing reduction untangles a fully-reversed bipartite layer', () => {
    const a = Node.fromPosAndSize('A', 0, 0, 40, 30);
    const b = Node.fromPosAndSize('B', 0, 0, 40, 30);
    const c = Node.fromPosAndSize('C', 0, 0, 40, 30);
    const d = Node.fromPosAndSize('D', 0, 0, 40, 30);
    const e = Node.fromPosAndSize('E', 0, 0, 40, 30);
    const f = Node.fromPosAndSize('F', 0, 0, 40, 30);

    // Insertion order for layer 1 is [D, E, F], but the edges connect it to
    // layer 0's [A, B, C] in fully reversed order (A-F, B-E, C-D) — every
    // pair of edges crosses (3 crossings, the maximum for 3 edges).
    const links = [new Link(1, 'A', 'F'), new Link(2, 'B', 'E'), new Link(3, 'C', 'D')];

    const layout = new LayeredDigraphLayout({ spacing: 20 });
    layout.apply([a, b, c, d, e, f], links);

    // Layer 1 must be reordered to [F, E, D] to match layer 0 and eliminate
    // every crossing.
    const layer1ByX = [d, e, f].slice().sort((n1, n2) => n1.bounds.x - n2.bounds.x);
    expect(layer1ByX.map((n) => n.key)).toEqual(['F', 'E', 'D']);

    // With that order every edge is a straight vertical line.
    expect(a.bounds.x).toBe(f.bounds.x);
    expect(b.bounds.x).toBe(e.bounds.x);
    expect(c.bounds.x).toBe(d.bounds.x);
  });

  it('reduceCrossings: false keeps the original insertion order within each layer', () => {
    const a = Node.fromPosAndSize('A', 0, 0, 40, 30);
    const b = Node.fromPosAndSize('B', 0, 0, 40, 30);
    const c = Node.fromPosAndSize('C', 0, 0, 40, 30);
    const d = Node.fromPosAndSize('D', 0, 0, 40, 30);
    const e = Node.fromPosAndSize('E', 0, 0, 40, 30);
    const f = Node.fromPosAndSize('F', 0, 0, 40, 30);
    const links = [new Link(1, 'A', 'F'), new Link(2, 'B', 'E'), new Link(3, 'C', 'D')];

    const layout = new LayeredDigraphLayout({ spacing: 20, reduceCrossings: false });
    layout.apply([a, b, c, d, e, f], links);

    // Layer 1 stays in its original insertion order [D, E, F], so the
    // crossings are left in place (D and F don't align with C and A).
    const layer1ByX = [d, e, f].slice().sort((n1, n2) => n1.bounds.x - n2.bounds.x);
    expect(layer1ByX.map((n) => n.key)).toEqual(['D', 'E', 'F']);
  });
});
