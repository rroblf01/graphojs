/** A point mass used by {@link BarnesHutTree} — one per node in a force-directed layout. */
export interface BarnesHutBody {
  x: number;
  y: number;
  mass: number;
}

/**
 * A Barnes-Hut quadtree: approximates the repulsive force from a large group
 * of distant bodies as a single force from their combined center of mass,
 * cutting force-directed layout's dominant cost from O(n²) to O(n log n) per
 * iteration. Standard technique (same idea D3-force and most n-body
 * simulators use) — see Barnes & Hut, 1986.
 *
 * Usage: build once per simulation step via `BarnesHutTree.build(bodies)`,
 * then call `accumulateRepulsion` once per body to get the approximated net
 * repulsive force away from every other body.
 */
export class BarnesHutTree {
  /** Depth cap so pathologically-clustered bodies can't recurse forever. */
  private static readonly MAX_DEPTH = 24;
  /** Minimum distance used in force calculations, to avoid division blowing up near-coincident bodies. */
  private static readonly MIN_DISTANCE = 0.1;

  private minX: number;
  private minY: number;
  private size: number;
  private mass = 0;
  private comX = 0;
  private comY = 0;
  private body: BarnesHutBody | null = null;
  private children: BarnesHutTree[] | null = null;

  private constructor(minX: number, minY: number, size: number) {
    this.minX = minX;
    this.minY = minY;
    this.size = size;
  }

  /** Build a tree covering all `bodies` and insert them. */
  static build(bodies: readonly BarnesHutBody[]): BarnesHutTree {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (const b of bodies) {
      minX = Math.min(minX, b.x);
      minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x);
      maxY = Math.max(maxY, b.y);
    }
    if (!Number.isFinite(minX)) {
      minX = 0;
      minY = 0;
      maxX = 1;
      maxY = 1;
    }
    // Square region with a little padding so edge-sitting bodies aren't lost to rounding.
    const size = Math.max(maxX - minX, maxY - minY, 1) * 1.1;
    const pad = size * 0.05;
    const tree = new BarnesHutTree(minX - pad, minY - pad, size + pad * 2);
    for (const b of bodies) tree.insert(b, 0);
    return tree;
  }

  private insert(newBody: BarnesHutBody, depth: number): void {
    const totalMass = this.mass + newBody.mass;
    this.comX = (this.comX * this.mass + newBody.x * newBody.mass) / totalMass;
    this.comY = (this.comY * this.mass + newBody.y * newBody.mass) / totalMass;
    this.mass = totalMass;

    if (this.children) {
      this.childFor(newBody.x, newBody.y).insert(newBody, depth + 1);
      return;
    }
    if (!this.body) {
      this.body = newBody;
      return;
    }
    if (depth >= BarnesHutTree.MAX_DEPTH) {
      // Give up subdividing further (pathologically-clustered bodies); the
      // aggregate mass/center of mass above already includes this body.
      return;
    }
    const existing = this.body;
    this.body = null;
    this.subdivide();
    this.childFor(existing.x, existing.y).insert(existing, depth + 1);
    this.childFor(newBody.x, newBody.y).insert(newBody, depth + 1);
  }

  private subdivide(): void {
    const half = this.size / 2;
    const { minX, minY } = this;
    this.children = [
      new BarnesHutTree(minX, minY, half),
      new BarnesHutTree(minX + half, minY, half),
      new BarnesHutTree(minX, minY + half, half),
      new BarnesHutTree(minX + half, minY + half, half),
    ];
  }

  private childFor(x: number, y: number): BarnesHutTree {
    const half = this.size / 2;
    const right = x >= this.minX + half ? 1 : 0;
    const bottom = y >= this.minY + half ? 1 : 0;
    // biome-ignore lint/style/noNonNullAssertion: index is always 0-3, children always has 4 entries
    return this.children![bottom * 2 + right]!;
  }

  /**
   * Add the approximated repulsive force pushing `self` away from every
   * other body in the tree into `out`. `strength(dist, mass)` returns the
   * force magnitude for a same-sized `mass` at distance `dist`; `theta`
   * controls the accuracy/speed trade-off (smaller = more accurate, GoJS's
   * own default region-checking layouts use a similarly small ratio).
   */
  accumulateRepulsion(
    self: BarnesHutBody,
    theta: number,
    strength: (dist: number, mass: number) => number,
    out: { fx: number; fy: number },
  ): void {
    if (this.mass === 0) return;
    if (this.body === self) return; // exact self, single-body leaf

    const dx = self.x - this.comX;
    const dy = self.y - this.comY;
    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), BarnesHutTree.MIN_DISTANCE);

    const children = this.children;
    if (!children || this.size / dist < theta) {
      const f = strength(dist, this.mass);
      out.fx += (f * dx) / dist;
      out.fy += (f * dy) / dist;
      return;
    }
    for (const child of children) {
      child.accumulateRepulsion(self, theta, strength, out);
    }
  }
}
