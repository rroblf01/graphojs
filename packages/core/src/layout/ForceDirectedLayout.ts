import type { NodeKey } from '../model/Model.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import { BarnesHutTree } from './BarnesHutTree.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for force-directed layout.
 */
export interface ForceDirectedLayoutOptions extends LayoutOptions {
  /** Default node separation. Default: 100 */
  defaultNodeSeparation?: number;
  /** Default link distance. Default: 150 */
  defaultLinkDistance?: number;
  /** Iteration limit. Default: 300 */
  maxIterations?: number;
  /** Convergence threshold. Default: 0.01 */
  convergenceThreshold?: number;
  /**
   * Barnes-Hut approximation ratio for the repulsion simulation (size of a
   * region divided by its distance to the node being pushed — below this,
   * the whole region is treated as one aggregate point instead of recursing
   * into it). Smaller is more accurate but slower; 0 would disable the
   * approximation entirely (falling back to exact all-pairs repulsion).
   * Default: 0.9
   */
  theta?: number;
}

/**
 * Force-directed layout using a simple spring-electric model. Repulsion
 * (the O(n²) part of the naive algorithm) is approximated with a
 * {@link BarnesHutTree}, making each iteration O(n log n) — see `theta` to
 * tune the accuracy/speed trade-off.
 */
export class ForceDirectedLayout extends Layout {
  private defaultNodeSeparation: number;
  private defaultLinkDistance: number;
  private maxIterations: number;
  private convergenceThreshold: number;
  private theta: number;

  constructor(options: ForceDirectedLayoutOptions = {}) {
    super(options);
    this.defaultNodeSeparation = options.defaultNodeSeparation ?? 100;
    this.defaultLinkDistance = options.defaultLinkDistance ?? 150;
    this.maxIterations = options.maxIterations ?? 300;
    this.convergenceThreshold = options.convergenceThreshold ?? 0.01;
    this.theta = options.theta ?? 0.9;
  }

  /** GoJS-compatible: The default spring length between linked nodes. */
  get defaultSpringLength(): number {
    return this.defaultLinkDistance;
  }

  set defaultSpringLength(value: number) {
    this.defaultLinkDistance = value;
  }

  override apply(nodes: Node[], links: Link[]): void {
    if (nodes.length === 0) return;

    // Initialize positions if not set
    this.initializePositions(nodes);

    const nodeByKey = new Map<NodeKey, Node>();
    for (const node of nodes) nodeByKey.set(node.key, node);

    // Run simulation
    for (let i = 0; i < this.maxIterations; i++) {
      const totalForce = this.simulateStep(nodes, links, nodeByKey);
      if (totalForce < this.convergenceThreshold) {
        break;
      }
    }

    // Center the layout
    if (this.center) {
      this.centerLayout(nodes);
    }
  }

  /**
   * Seed starting positions only for nodes that are exactly coincident with
   * another node (typically freshly-created nodes that all default to the
   * same spot) — nodes that already have distinct positions, whether from
   * the user's own placement or a prior call to this same layout, are left
   * where they are so a repeated doLayout() refines rather than resets them.
   */
  private initializePositions(nodes: Node[]): void {
    const groups = new Map<string, Node[]>();
    for (const node of nodes) {
      const posKey = `${node.bounds.x},${node.bounds.y}`;
      const group = groups.get(posKey);
      if (group) group.push(node);
      else groups.set(posKey, [node]);
    }

    const gridSize = Math.ceil(Math.sqrt(nodes.length));
    let gridIndex = 0;
    for (const group of groups.values()) {
      if (group.length < 2) continue; // already at a distinct position
      for (const node of group) {
        const row = Math.floor(gridIndex / gridSize);
        const col = gridIndex % gridSize;
        const targetX = col * this.defaultNodeSeparation;
        const targetY = row * this.defaultNodeSeparation;
        node.bounds = node.bounds.offset(targetX - node.bounds.x, targetY - node.bounds.y);
        gridIndex++;
      }
    }
  }

  private simulateStep(nodes: Node[], links: Link[], nodeByKey: Map<NodeKey, Node>): number {
    const forces = new Map<Node, { fx: number; fy: number }>();
    let totalForce = 0;

    // Initialize forces
    for (const node of nodes) {
      forces.set(node, { fx: 0, fy: 0 });
    }

    // Repulsive forces (all pairs) — Barnes-Hut approximated: build a
    // quadtree of node centers once, then look up each node's aggregate
    // repulsion in O(log n) instead of comparing every pair directly.
    const bodies = nodes.map((node) => {
      const center = node.bounds.center;
      return { x: center.x, y: center.y, mass: 1, node };
    });
    const tree = BarnesHutTree.build(bodies);
    const separationSq = this.defaultNodeSeparation * this.defaultNodeSeparation;

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      if (!body) continue;
      const out = { fx: 0, fy: 0 };
      tree.accumulateRepulsion(body, this.theta, (dist, mass) => (separationSq * mass) / dist, out);

      if (out.fx === 0 && out.fy === 0) {
        // Degenerate direction — e.g. exactly coincident with the region's
        // center of mass. Nudge along a deterministic pseudo-random
        // direction (golden-angle spread) so the simulation can still
        // separate them instead of leaving them stacked forever.
        const angle = ((i + 1) * 2.399963229728653) % (2 * Math.PI);
        out.fx = Math.cos(angle) * 0.01;
        out.fy = Math.sin(angle) * 0.01;
      }

      const force = forces.get(body.node);
      if (force) {
        force.fx += out.fx;
        force.fy += out.fy;
      }
    }

    // Attractive forces (connected pairs) — iterate links directly (O(E))
    // instead of scanning every node pair to find the linked ones.
    for (const link of links) {
      const node = nodeByKey.get(link.fromKey);
      const other = nodeByKey.get(link.toKey);
      if (!node || !other || node === other) continue;

      const nodeCenter = node.bounds.center;
      const otherCenter = other.bounds.center;
      const dx = otherCenter.x - nodeCenter.x;
      const dy = otherCenter.y - nodeCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Spring attraction
      const attraction = (dist * dist) / this.defaultLinkDistance;
      const fx = (attraction * dx) / dist;
      const fy = (attraction * dy) / dist;

      const fn = forces.get(node);
      const fo = forces.get(other);
      if (fn) {
        fn.fx += fx;
        fn.fy += fy;
      }
      if (fo) {
        fo.fx -= fx;
        fo.fy -= fy;
      }
    }

    // Apply forces with damping
    const damping = 0.9;
    for (const node of nodes) {
      const force = forces.get(node);
      if (!force) continue;

      const magnitude = Math.sqrt(force.fx * force.fx + force.fy * force.fy);

      if (magnitude > 0.001) {
        const step = Math.min(magnitude, this.defaultNodeSeparation * 0.1);
        const dx = (force.fx / magnitude) * step;
        const dy = (force.fy / magnitude) * step;
        node.bounds = node.bounds.offset(dx * damping, dy * damping);
        totalForce += magnitude;
      }
    }

    return totalForce / nodes.length;
  }
}
