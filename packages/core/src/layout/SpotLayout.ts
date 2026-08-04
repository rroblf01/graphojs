import type { Node } from '../parts/Node.ts';
import type { Link } from '../parts/Link.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for spot layout.
 */
export interface SpotLayoutOptions extends LayoutOptions {
  /** The spot (position) to place all nodes at. Default: { x: 0, y: 0 } */
  spot?: { x: number; y: number };
  /** Offset for each subsequent node. Default: { x: 120, y: 0 } */
  offset?: { x: number; y: number };
  /** Maximum nodes per row before wrapping. 0 = no wrap. Default: 0 */
  wrap?: number;
}

/**
 * Spot layout places all nodes at a specific spot, optionally
 * with offsets for stacking.
 */
export class SpotLayout extends Layout {
  private spot: { x: number; y: number };
  private offset: { x: number; y: number };
  private wrap: number;

  constructor(options: SpotLayoutOptions = {}) {
    super(options);
    this.spot = options.spot ?? { x: 0, y: 0 };
    this.offset = options.offset ?? { x: 120, y: 0 };
    this.wrap = options.wrap ?? 0;
  }

  override apply(nodes: Node[], _links: Link[]): void {
    if (nodes.length === 0) return;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node) continue;

      let targetX = this.spot.x;
      let targetY = this.spot.y;

      if (this.wrap > 0) {
        const col = i % this.wrap;
        const row = Math.floor(i / this.wrap);
        targetX += col * this.offset.x;
        targetY += row * this.offset.y;
      } else {
        targetX += i * this.offset.x;
        targetY += i * this.offset.y;
      }

      const dx = targetX - node.bounds.x;
      const dy = targetY - node.bounds.y;
      node.bounds = node.bounds.offset(dx, dy);
    }

    if (this.center) {
      this.centerLayout(nodes);
    }
  }
}
