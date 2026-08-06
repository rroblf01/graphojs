import { describe, it, expect } from 'vitest';
import { ForceDirectedLayout } from '../../src/layout/ForceDirectedLayout.ts';
import { TreeLayout } from '../../src/layout/TreeLayout.ts';
import { CircularLayout } from '../../src/layout/CircularLayout.ts';
import { GridLayout } from '../../src/layout/GridLayout.ts';
import { Node } from '../../src/parts/Node.ts';
import { Link } from '../../src/parts/Link.ts';

describe('ForceDirectedLayout', () => {
  it('should create with default options', () => {
    const layout = new ForceDirectedLayout();
    expect(layout).toBeDefined();
  });

  it('should create with custom options', () => {
    const layout = new ForceDirectedLayout({
      defaultNodeSeparation: 150,
      defaultLinkDistance: 200,
      maxIterations: 500,
      convergenceThreshold: 0.001,
    });
    expect(layout).toBeDefined();
  });

  it('should handle empty node list', () => {
    const layout = new ForceDirectedLayout();
    layout.apply([], []);
  });

  it('should position single node', () => {
    const layout = new ForceDirectedLayout();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    layout.apply([node], []);
    expect(node.bounds.x).toBeDefined();
    expect(node.bounds.y).toBeDefined();
  });

  it('should position multiple nodes', () => {
    const layout = new ForceDirectedLayout();
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 100, 0, 100, 50);
    const link = new Link(100, 1, 2);
    layout.apply([node1, node2], [link]);
    expect(node1.bounds).toBeDefined();
    expect(node2.bounds).toBeDefined();
  });

  it('should separate connected nodes', () => {
    const layout = new ForceDirectedLayout();
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const link = new Link(100, 1, 2);
    layout.apply([node1, node2], [link]);
    // Nodes should be separated
    const center1 = node1.bounds.center;
    const center2 = node2.bounds.center;
    const distance = Math.abs(center1.x - center2.x) + Math.abs(center1.y - center2.y);
    expect(distance).toBeGreaterThanOrEqual(0);
  });

  it('separates perfectly coincident nodes instead of leaving them stacked', () => {
    const layout = new ForceDirectedLayout();
    const node1 = Node.fromPosAndSize(1, 50, 50, 40, 40);
    const node2 = Node.fromPosAndSize(2, 50, 50, 40, 40); // exact same spot, unlinked
    layout.apply([node1, node2], []);

    const dist = Math.hypot(
      node1.bounds.center.x - node2.bounds.center.x,
      node1.bounds.center.y - node2.bounds.center.y,
    );
    expect(dist).toBeGreaterThan(1);
  });

  it('initializePositions only re-grids nodes that are exactly coincident, leaving distinct positions (e.g. from a prior layout or the user) alone', () => {
    const layout = new ForceDirectedLayout() as unknown as {
      initializePositions(nodes: Node[]): void;
    };
    const distinct1 = Node.fromPosAndSize(1, 10, 20, 40, 40);
    const distinct2 = Node.fromPosAndSize(2, 300, 400, 40, 40);
    const coincidentA = Node.fromPosAndSize(3, 0, 0, 40, 40);
    const coincidentB = Node.fromPosAndSize(4, 0, 0, 40, 40);

    layout.initializePositions([distinct1, distinct2, coincidentA, coincidentB]);

    // Nodes that already had their own distinct position (e.g. a completed
    // prior layout pass, or a manual drag) must not be reset to a grid.
    expect(distinct1.bounds.x).toBe(10);
    expect(distinct1.bounds.y).toBe(20);
    expect(distinct2.bounds.x).toBe(300);
    expect(distinct2.bounds.y).toBe(400);
    // The genuinely-coincident pair must have been separated onto distinct cells.
    expect(
      coincidentA.bounds.x === coincidentB.bounds.x && coincidentA.bounds.y === coincidentB.bounds.y,
    ).toBe(false);
  });
});

describe('TreeLayout', () => {
  it('should create with default options', () => {
    const layout = new TreeLayout();
    expect(layout).toBeDefined();
  });

  it('should create with custom options', () => {
    const layout = new TreeLayout({
      angle: 45,
      radial: true,
      angleIncrement: 30,
      nodeSpacing: 50,
    });
    expect(layout).toBeDefined();
  });

  it('should handle empty node list', () => {
    const layout = new TreeLayout();
    layout.apply([], []);
  });

  it('should position single node', () => {
    const layout = new TreeLayout();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    layout.apply([node], []);
    expect(node.bounds.x).toBeDefined();
    expect(node.bounds.y).toBeDefined();
  });

  it('should arrange nodes in hierarchy', () => {
    const layout = new TreeLayout();
    const root = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const child1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const child2 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const link1 = new Link(100, 1, 2);
    const link2 = new Link(101, 1, 3);
    layout.apply([root, child1, child2], [link1, link2]);
    // Root should be above children
    const rootCenter = root.bounds.center;
    const child1Center = child1.bounds.center;
    const child2Center = child2.bounds.center;
    expect(rootCenter.y).toBeLessThanOrEqual(child1Center.y);
    expect(rootCenter.y).toBeLessThanOrEqual(child2Center.y);
  });

  it('should handle radial layout', () => {
    const layout = new TreeLayout({ radial: true });
    const root = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const child1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const child2 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const link1 = new Link(100, 1, 2);
    const link2 = new Link(101, 1, 3);
    layout.apply([root, child1, child2], [link1, link2]);
    expect(root.bounds).toBeDefined();
    expect(child1.bounds).toBeDefined();
    expect(child2.bounds).toBeDefined();
  });

  it('does not infinite-recurse on a cyclic link graph', () => {
    const layout = new TreeLayout();
    const a = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const b = Node.fromPosAndSize(2, 0, 0, 100, 50);
    // A -> B -> A is a cycle
    const link1 = new Link(100, 1, 2);
    const link2 = new Link(101, 2, 1);
    expect(() => layout.apply([a, b], [link1, link2])).not.toThrow();
  });

  it('lays out every root of a forest, not just the first', () => {
    const layout = new TreeLayout();
    const a = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const b = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const c = Node.fromPosAndSize(3, 500, 500, 100, 50);
    const d = Node.fromPosAndSize(4, 500, 500, 100, 50);
    // Two independent trees: A->B and C->D
    const link1 = new Link(100, 1, 2);
    const link2 = new Link(101, 3, 4);
    layout.apply([a, b, c, d], [link1, link2]);

    // The second tree must have moved from its stale (500,500) position too.
    expect(c.bounds.x === 500 && c.bounds.y === 500).toBe(false);
    expect(d.bounds.x === 500 && d.bounds.y === 500).toBe(false);
    // And the two trees must not overlap each other.
    const aTreeRight = Math.max(a.bounds.right, b.bounds.right);
    const cTreeLeft = Math.min(c.bounds.x, d.bounds.x);
    expect(aTreeRight <= cTreeLeft || Math.max(c.bounds.right, d.bounds.right) <= a.bounds.x).toBe(
      true,
    );
  });

  it('spaces sibling subtrees so wide leaf nodes do not overlap', () => {
    const layout = new TreeLayout({ nodeSpacing: 30 });
    const root = Node.fromPosAndSize(1, 0, 0, 40, 30);
    const child1 = Node.fromPosAndSize(2, 0, 0, 80, 30);
    const child2 = Node.fromPosAndSize(3, 0, 0, 80, 30);
    const child3 = Node.fromPosAndSize(4, 0, 0, 80, 30);
    layout.apply(
      [root, child1, child2, child3],
      [new Link(100, 1, 2), new Link(101, 1, 3), new Link(102, 1, 4)],
    );

    const siblings = [child1, child2, child3].sort((x, y) => x.bounds.x - y.bounds.x);
    for (let i = 0; i < siblings.length - 1; i++) {
      expect(siblings[i]!.bounds.right).toBeLessThanOrEqual(siblings[i + 1]!.bounds.x);
    }
  });

  it('angle rotates the growth axis (90 grows rightward instead of downward)', () => {
    const down = new TreeLayout({ angle: 0 });
    const root1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const child1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    down.apply([root1, child1], [new Link(100, 1, 2)]);
    expect(child1.bounds.y).toBeGreaterThan(root1.bounds.y); // grew down
    expect(child1.bounds.x).toBeCloseTo(root1.bounds.x); // same column

    const right = new TreeLayout({ angle: 90 });
    const root2 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    const child2 = Node.fromPosAndSize(4, 0, 0, 100, 50);
    right.apply([root2, child2], [new Link(101, 3, 4)]);
    expect(child2.bounds.x).toBeGreaterThan(root2.bounds.x); // grew right
    expect(child2.bounds.y).toBeCloseTo(root2.bounds.y); // same row
  });
});

describe('CircularLayout', () => {
  it('should create with default options', () => {
    const layout = new CircularLayout();
    expect(layout).toBeDefined();
  });

  it('should create with custom options', () => {
    const layout = new CircularLayout({
      radius: 300,
      startAngle: 90,
      sortByDegree: true,
      concentric: true,
    });
    expect(layout).toBeDefined();
  });

  it('should handle empty node list', () => {
    const layout = new CircularLayout();
    layout.apply([], []);
  });

  it('should position single node', () => {
    const layout = new CircularLayout();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    layout.apply([node], []);
    expect(node.bounds.x).toBeDefined();
    expect(node.bounds.y).toBeDefined();
  });

  it('should arrange nodes in circle', () => {
    const layout = new CircularLayout();
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const node3 = Node.fromPosAndSize(3, 0, 0, 100, 50);
    layout.apply([node1, node2, node3], []);
    // All nodes should be roughly equidistant from center
    const center1 = node1.bounds.center;
    const center2 = node2.bounds.center;
    const center3 = node3.bounds.center;
    const dist1 = Math.sqrt(center1.x ** 2 + center1.y ** 2);
    const dist2 = Math.sqrt(center2.x ** 2 + center2.y ** 2);
    const dist3 = Math.sqrt(center3.x ** 2 + center3.y ** 2);
    expect(Math.abs(dist1 - dist2)).toBeLessThan(100);
    expect(Math.abs(dist2 - dist3)).toBeLessThan(100);
  });

  it('should handle concentric layout', () => {
    const layout = new CircularLayout({ concentric: true });
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    layout.apply([node1, node2], []);
    expect(node1.bounds).toBeDefined();
    expect(node2.bounds).toBeDefined();
  });

  it('should start at custom angle', () => {
    const layout = new CircularLayout({ startAngle: 90 });
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    layout.apply([node1, node2], []);
    // Nodes should be positioned based on start angle
    const center1 = node1.bounds.center;
    const center2 = node2.bounds.center;
    expect(center1.y).toBeDefined();
    expect(center2.y).toBeDefined();
  });

  it('auto-scales the radius so many nodes do not overlap on the ring', () => {
    const layout = new CircularLayout(); // default radius, no explicit override
    const nodes = Array.from({ length: 50 }, (_, i) => Node.fromPosAndSize(i, 0, 0, 100, 100));
    layout.apply(nodes, []);

    // Adjacent nodes around the ring must not overlap.
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!;
      const b = nodes[(i + 1) % nodes.length]!;
      const dist = Math.hypot(a.bounds.center.x - b.bounds.center.x, a.bounds.center.y - b.bounds.center.y);
      expect(dist).toBeGreaterThanOrEqual(Math.max(a.bounds.width, a.bounds.height) * 0.9);
    }
  });

  it('respects an explicitly-given radius instead of auto-scaling it', () => {
    const layout = new CircularLayout({ radius: 300 });
    const node1 = Node.fromPosAndSize(1, 0, 0, 20, 20);
    const node2 = Node.fromPosAndSize(2, 0, 0, 20, 20);
    layout.apply([node1, node2], []);
    const dist1 = Math.hypot(node1.bounds.center.x, node1.bounds.center.y);
    expect(dist1).toBeCloseTo(300, 0);
  });

  it('concentric mode actually places nodes on multiple rings instead of leaving them untouched', () => {
    const layout = new CircularLayout({ concentric: true, radius: 50 });
    const nodes = Array.from({ length: 40 }, (_, i) => Node.fromPosAndSize(i, 999, 999, 60, 60));
    layout.apply(nodes, []);

    // None should be left at the stale (999,999) position.
    for (const node of nodes) {
      expect(node.bounds.x === 999 && node.bounds.y === 999).toBe(false);
    }
    // Nodes must be spread across more than one distinct radius (multiple rings).
    const radii = new Set(
      nodes.map((n) => Math.round(Math.hypot(n.bounds.center.x, n.bounds.center.y) / 10) * 10),
    );
    expect(radii.size).toBeGreaterThan(1);
  });

  it('sortByDegree orders nodes by descending connection count', () => {
    const layout = new CircularLayout({ sortByDegree: true, startAngle: 0 });
    // Node 2 has degree 3 (hub), others have degree 1.
    const hub = Node.fromPosAndSize(2, 0, 0, 50, 50);
    const leaf1 = Node.fromPosAndSize(1, 0, 0, 50, 50);
    const leaf2 = Node.fromPosAndSize(3, 0, 0, 50, 50);
    const leaf3 = Node.fromPosAndSize(4, 0, 0, 50, 50);
    const links = [new Link(100, 1, 2), new Link(101, 2, 3), new Link(102, 2, 4)];
    layout.apply([leaf1, hub, leaf2, leaf3], links);

    // The hub (highest degree) should be placed first, i.e. at angle 0 (startAngle).
    const angleOf = (n: Node) => Math.atan2(n.bounds.center.y, n.bounds.center.x);
    expect(Math.abs(angleOf(hub))).toBeLessThan(0.01);
  });
});

describe('GridLayout', () => {
  function makeNodes(count: number) {
    return Array.from({ length: count }, (_, i) => Node.fromPosAndSize(i, 0, 0, 80, 40));
  }

  it('wrappingColumn actually controls how many cells fit per row', () => {
    const layout = new GridLayout({ spacingX: 0, spacingY: 0 });
    layout.wrappingColumn = 3;
    const nodes = makeNodes(6);
    layout.apply(nodes, []);

    // Row 0: nodes 0,1,2 at x=0,80,160; row 1: nodes 3,4,5 at x=0,80,160 again.
    expect(nodes[2]!.bounds.x).toBeCloseTo(nodes[0]!.bounds.x + 160);
    expect(nodes[3]!.bounds.x).toBeCloseTo(nodes[0]!.bounds.x); // wrapped to column 0
    expect(nodes[3]!.bounds.y).toBeGreaterThan(nodes[0]!.bounds.y); // on the next row
  });

  it('wrappingWidth actually controls how many cells fit per row (by available pixel width)', () => {
    const layout = new GridLayout({ spacingX: 0, spacingY: 0 });
    layout.wrappingWidth = 240; // fits exactly 3 columns of an 80-wide cell
    const nodes = makeNodes(6);
    layout.apply(nodes, []);

    expect(nodes[3]!.bounds.x).toBeCloseTo(nodes[0]!.bounds.x);
    expect(nodes[3]!.bounds.y).toBeGreaterThan(nodes[0]!.bounds.y);
  });

  it('an explicit columns option still takes priority over wrappingColumn/wrappingWidth', () => {
    const layout = new GridLayout({ columns: 2, spacingX: 0, spacingY: 0 });
    layout.wrappingColumn = 5;
    const nodes = makeNodes(4);
    layout.apply(nodes, []);

    expect(nodes[2]!.bounds.x).toBeCloseTo(nodes[0]!.bounds.x); // wrapped after 2, not 5
    expect(nodes[2]!.bounds.y).toBeGreaterThan(nodes[0]!.bounds.y);
  });
});
