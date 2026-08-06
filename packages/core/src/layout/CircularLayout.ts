import type { Node } from '../parts/Node.ts';
import type { Link } from '../parts/Link.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for circular layout.
 */
export interface CircularLayoutOptions extends LayoutOptions {
  /** Radius of the circle. Default: auto-computed from node count/size. */
  radius?: number;
  /** Starting angle in degrees. Default: 0 */
  startAngle?: number;
  /** Whether to sort nodes by degree (most-connected first). Default: false */
  sortByDegree?: boolean;
  /** Whether to arrange in concentric circles. Default: false */
  concentric?: boolean;
}

/**
 * Circular layout arranges nodes in a circle.
 */
export class CircularLayout extends Layout {
  private radius: number;
  /** Whether radius should be auto-computed from node count/size (true when not given explicitly). */
  private autoRadius: boolean;
  private startAngle: number;
  private sortByDegree: boolean;
  private concentric: boolean;

  constructor(options: CircularLayoutOptions = {}) {
    super(options);
    this.radius = options.radius ?? 200;
    this.autoRadius = options.radius === undefined;
    this.startAngle = options.startAngle ?? 0;
    this.sortByDegree = options.sortByDegree ?? false;
    this.concentric = options.concentric ?? false;
  }

  override apply(nodes: Node[], links: Link[]): void {
    if (nodes.length === 0) return;

    const ordered = this.sortByDegree ? this.orderByDegree(nodes, links) : nodes;

    if (this.concentric) {
      this.applyConcentric(ordered);
    } else {
      this.applySimple(ordered);
    }
  }

  /** Order nodes by descending degree (most-connected first) so hub nodes stand out. */
  private orderByDegree(nodes: Node[], links: Link[]): Node[] {
    const degree = new Map<Node['key'], number>();
    for (const node of nodes) degree.set(node.key, 0);
    for (const link of links) {
      if (degree.has(link.fromKey)) degree.set(link.fromKey, (degree.get(link.fromKey) ?? 0) + 1);
      if (degree.has(link.toKey)) degree.set(link.toKey, (degree.get(link.toKey) ?? 0) + 1);
    }
    return [...nodes].sort((a, b) => (degree.get(b.key) ?? 0) - (degree.get(a.key) ?? 0));
  }

  /** Radius that fits all nodes around the circle without overlapping, given their sizes. */
  private computeRadius(nodes: Node[]): number {
    if (!this.autoRadius) return this.radius;
    let arcLength = 0;
    for (const node of nodes) {
      arcLength += Math.max(node.bounds.width, node.bounds.height) + this.spacing;
    }
    const computed = arcLength / (2 * Math.PI);
    return Math.max(this.radius, computed);
  }

  private applySimple(nodes: Node[]): void {
    const radius = this.computeRadius(nodes);
    const angleStep = (2 * Math.PI) / nodes.length;
    const startRad = (this.startAngle * Math.PI) / 180;

    for (let i = 0; i < nodes.length; i++) {
      const angle = startRad + i * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const node = nodes[i];
      if (node) {
        const nodeWidth = node.bounds.width;
        const nodeHeight = node.bounds.height;
        const dx = x - nodeWidth / 2 - node.bounds.x;
        const dy = y - nodeHeight / 2 - node.bounds.y;
        node.bounds = node.bounds.offset(dx, dy);
      }
    }
  }

  /** Place nodes on successive concentric rings, filling each ring's capacity before starting the next. */
  private applyConcentric(nodes: Node[]): void {
    const avgSize =
      nodes.reduce((sum, n) => sum + Math.max(n.bounds.width, n.bounds.height), 0) / nodes.length;
    const arcUnit = avgSize + this.spacing;
    const baseRadius = Math.max(this.autoRadius ? arcUnit : this.radius, arcUnit);
    const startRad = (this.startAngle * Math.PI) / 180;

    let remaining = nodes;
    let ringIndex = 0;
    while (remaining.length > 0) {
      const ringRadius = baseRadius + ringIndex * arcUnit;
      const circumference = 2 * Math.PI * ringRadius;
      const capacity = Math.max(1, Math.min(remaining.length, Math.floor(circumference / arcUnit)));
      const ringNodes = remaining.slice(0, capacity);
      remaining = remaining.slice(capacity);

      const angleStep = (2 * Math.PI) / ringNodes.length;
      for (let i = 0; i < ringNodes.length; i++) {
        const angle = startRad + i * angleStep;
        const x = Math.cos(angle) * ringRadius;
        const y = Math.sin(angle) * ringRadius;
        const node = ringNodes[i];
        if (node) {
          const dx = x - node.bounds.width / 2 - node.bounds.x;
          const dy = y - node.bounds.height / 2 - node.bounds.y;
          node.bounds = node.bounds.offset(dx, dy);
        }
      }
      ringIndex++;
    }
  }
}
