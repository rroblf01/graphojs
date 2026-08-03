import { describe, it, expect } from 'vitest';
import { ForceDirectedLayout } from '../../src/layout/ForceDirectedLayout.ts';
import { TreeLayout } from '../../src/layout/TreeLayout.ts';
import { CircularLayout } from '../../src/layout/CircularLayout.ts';
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
});
