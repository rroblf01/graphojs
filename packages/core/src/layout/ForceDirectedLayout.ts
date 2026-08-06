import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
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
}

/**
 * Force-directed layout using a simple spring-electric model.
 */
export class ForceDirectedLayout extends Layout {
  private defaultNodeSeparation: number;
  private defaultLinkDistance: number;
  private maxIterations: number;
  private convergenceThreshold: number;

  constructor(options: ForceDirectedLayoutOptions = {}) {
    super(options);
    this.defaultNodeSeparation = options.defaultNodeSeparation ?? 100;
    this.defaultLinkDistance = options.defaultLinkDistance ?? 150;
    this.maxIterations = options.maxIterations ?? 300;
    this.convergenceThreshold = options.convergenceThreshold ?? 0.01;
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

    // Build adjacency for quick lookup
    const linkSet = new Set<string>();
    for (const link of links) {
      linkSet.add(`${link.fromKey}-${link.toKey}`);
      linkSet.add(`${link.toKey}-${link.fromKey}`);
    }

    // Run simulation
    for (let i = 0; i < this.maxIterations; i++) {
      const totalForce = this.simulateStep(nodes, links, linkSet);
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

  private simulateStep(nodes: Node[], _links: Link[], linkSet: Set<string>): number {
    const forces = new Map<Node, { fx: number; fy: number }>();
    let totalForce = 0;

    // Initialize forces
    for (const node of nodes) {
      forces.set(node, { fx: 0, fy: 0 });
    }

    // Repulsive forces (all pairs)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (!a || !b) continue;

        const aCenter = a.bounds.center;
        const bCenter = b.bounds.center;
        let dx = bCenter.x - aCenter.x;
        let dy = bCenter.y - aCenter.y;
        if (dx === 0 && dy === 0) {
          // Perfectly coincident: the repulsion magnitude below is nonzero,
          // but with no direction to push along it would never separate them.
          // Give each pair a distinct fallback direction (golden-angle spread).
          const angle = ((i + 1) * (j + 1) * 2.399963229728653) % (2 * Math.PI);
          dx = Math.cos(angle) * 0.01;
          dy = Math.sin(angle) * 0.01;
        }
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Coulomb's law repulsion
        const repulsion = (this.defaultNodeSeparation * this.defaultNodeSeparation) / dist;
        const fx = (repulsion * dx) / dist;
        const fy = (repulsion * dy) / dist;

        const fa = forces.get(a);
        const fb = forces.get(b);
        if (fa && fb) {
          fa.fx -= fx;
          fa.fy -= fy;
          fb.fx += fx;
          fb.fy += fy;
        }
      }
    }

    // Attractive forces (connected pairs)
    for (const node of nodes) {
      for (const other of nodes) {
        if (node === other) continue;
        if (!linkSet.has(`${node.key}-${other.key}`)) continue;

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
        if (fn) {
          fn.fx += fx;
          fn.fy += fy;
        }
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
