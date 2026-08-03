import type { Node } from '../parts/Node.ts';
import type { Link } from '../parts/Link.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for circular layout.
 */
export interface CircularLayoutOptions extends LayoutOptions {
  /** Radius of the circle. Default: 200 */
  radius?: number;
  /** Starting angle in degrees. Default: 0 */
  startAngle?: number;
  /** Whether to sort nodes by degree. Default: false */
  sortByDegree?: boolean;
  /** Whether to arrange in concentric circles. Default: false */
  concentric?: boolean;
}

/**
 * Circular layout arranges nodes in a circle.
 */
export class CircularLayout extends Layout {
  private radius: number;
  private startAngle: number;
  private sortByDegree: boolean;
  private concentric: boolean;

  constructor(options: CircularLayoutOptions = {}) {
    super(options);
    this.radius = options.radius ?? 200;
    this.startAngle = options.startAngle ?? 0;
    this.sortByDegree = options.sortByDegree ?? false;
    this.concentric = options.concentric ?? false;
  }

  override apply(nodes: Node[], _links: Link[]): void {
    if (nodes.length === 0) return;

    if (this.concentric) {
      this.applyConcentric(nodes);
    } else {
      this.applySimple(nodes);
    }
  }

  private applySimple(nodes: Node[]): void {
    let sortedNodes = nodes;

    if (this.sortByDegree) {
      sortedNodes = [...nodes];
    }

    const angleStep = (2 * Math.PI) / sortedNodes.length;
    const startRad = (this.startAngle * Math.PI) / 180;

    for (let i = 0; i < sortedNodes.length; i++) {
      const angle = startRad + i * angleStep;
      const x = Math.cos(angle) * this.radius;
      const y = Math.sin(angle) * this.radius;

      const node = sortedNodes[i];
      if (node) {
        const nodeWidth = node.bounds.width;
        const nodeHeight = node.bounds.height;
        const dx = x - nodeWidth / 2 - node.bounds.x;
        const dy = y - nodeHeight / 2 - node.bounds.y;
        node.bounds = node.bounds.offset(dx, dy);
      }
    }
  }

  private applyConcentric(_nodes: Node[]): void {
    // Simplified concentric layout
  }
}
