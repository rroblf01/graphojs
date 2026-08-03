import { Rect } from '../geometry/Rect.ts';

interface QuadTreeItem<T> {
  x: number;
  y: number;
  data: T;
}

/**
 * A quadtree spatial index for fast 2D region queries.
 * Used for viewport culling and hit-testing optimization.
 */
export class QuadTree<T> {
  private bounds: Rect;
  private maxDepth: number;
  private maxItems: number;
  private items: QuadTreeItem<T>[] = [];
  private children: QuadTree<T>[] = [];
  private depth: number;
  private _itemCount = 0;

  constructor(bounds: Rect, options?: { maxDepth?: number; maxItems?: number; depth?: number }) {
    this.bounds = bounds;
    this.maxDepth = options?.maxDepth ?? 8;
    this.maxItems = options?.maxItems ?? 16;
    this.depth = options?.depth ?? 0;
  }

  /** Get the bounds of this quadtree node. */
  getBounds(): Rect {
    return this.bounds;
  }

  /** Get the total number of items in the quadtree. */
  get itemCount(): number {
    return this._itemCount;
  }

  /** Insert an item at a point. */
  insert(x: number, y: number, data: T): void {
    if (!this.bounds.containsPoint({ x, y })) {
      return;
    }

    this._itemCount++;

    if (this.children.length > 0) {
      this.insertIntoChildren(x, y, data);
      return;
    }

    this.items.push({ x, y, data });

    if (this.items.length > this.maxItems && this.depth < this.maxDepth) {
      this.subdivide();
      for (const item of this.items) {
        this.insertIntoChildren(item.x, item.y, item.data);
      }
      this.items = [];
    }
  }

  /** Insert an item described by a bounding rectangle (uses center point). */
  insertWithBounds(bounds: Rect, data: T): void {
    this.insert(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, data);
  }

  /** Insert into child nodes. */
  private insertIntoChildren(x: number, y: number, data: T): void {
    for (const child of this.children) {
      if (child.bounds.containsPoint({ x, y })) {
        child.insert(x, y, data);
        return;
      }
    }
  }

  /** Split this node into four children. */
  private subdivide(): void {
    const { x, y, width, height } = this.bounds;
    const halfW = width / 2;
    const halfH = height / 2;

    this.children.push(
      new QuadTree<T>(new Rect(x, y, halfW, halfH), {
        maxDepth: this.maxDepth,
        maxItems: this.maxItems,
        depth: this.depth + 1,
      }),
      new QuadTree<T>(new Rect(x + halfW, y, halfW, halfH), {
        maxDepth: this.maxDepth,
        maxItems: this.maxItems,
        depth: this.depth + 1,
      }),
      new QuadTree<T>(new Rect(x, y + halfH, halfW, halfH), {
        maxDepth: this.maxDepth,
        maxItems: this.maxItems,
        depth: this.depth + 1,
      }),
      new QuadTree<T>(new Rect(x + halfW, y + halfH, halfW, halfH), {
        maxDepth: this.maxDepth,
        maxItems: this.maxItems,
        depth: this.depth + 1,
      }),
    );
  }

  /**
   * Query all items within a region (inclusive).
   * Returns data items found in the region.
   */
  queryRegion(bounds: Rect): T[] {
    const result: T[] = [];
    this.queryRegionInto(bounds, result);
    return result;
  }

  private queryRegionInto(bounds: Rect, result: T[]): void {
    if (!this.bounds.intersects(bounds)) {
      return;
    }

    for (const item of this.items) {
      if (bounds.containsPoint({ x: item.x, y: item.y })) {
        result.push(item.data);
      }
    }

    for (const child of this.children) {
      child.queryRegionInto(bounds, result);
    }
  }

  /**
   * Query items within a rectangular region.
   * Returns data items with their positions.
   */
  queryRegionWithPoints(bounds: Rect): Array<{ x: number; y: number; data: T }> {
    const result: Array<{ x: number; y: number; data: T }> = [];
    this.queryRegionWithPointsInto(bounds, result);
    return result;
  }

  private queryRegionWithPointsInto(
    bounds: Rect,
    result: Array<{ x: number; y: number; data: T }>,
  ): void {
    if (!this.bounds.intersects(bounds)) {
      return;
    }

    for (const item of this.items) {
      if (bounds.containsPoint({ x: item.x, y: item.y })) {
        result.push({ x: item.x, y: item.y, data: item.data });
      }
    }

    for (const child of this.children) {
      child.queryRegionWithPointsInto(bounds, result);
    }
  }

  /** Query all items within a circle. */
  queryCircle(cx: number, cy: number, radius: number): T[] {
    const region = new Rect(cx - radius, cy - radius, radius * 2, radius * 2);
    return this.queryRegionWithPoints(region)
      .filter(({ x, y }) => {
        const dx = x - cx;
        const dy = y - cy;
        return dx * dx + dy * dy <= radius * radius;
      })
      .map(({ data }) => data);
  }

  /** Query the nearest item to a point within maxDistance. */
  queryNearest(x: number, y: number, maxDistance: number): T | null {
    const points = this.queryRegionWithPoints(
      new Rect(x - maxDistance, y - maxDistance, maxDistance * 2, maxDistance * 2),
    );
    if (points.length === 0) return null;

    let nearest: T | null = null;
    let nearestDist = Infinity;

    for (const point of points) {
      const dx = point.x - x;
      const dy = point.y - y;
      const dist = dx * dx + dy * dy;
      if (dist <= maxDistance * maxDistance && dist < nearestDist) {
        nearestDist = dist;
        nearest = point.data;
      }
    }
    return nearest;
  }

  /** Remove an item from the quadtree. */
  remove(data: T): boolean {
    const removed = this.removeFromNode(data);
    if (removed) {
      this._itemCount = Math.max(0, this._itemCount - 1);
    }
    return removed;
  }

  private removeFromNode(data: T): boolean {
    const index = this.items.findIndex((item) => item.data === data);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }

    for (const child of this.children) {
      if (child.removeFromNode(data)) {
        return true;
      }
    }
    return false;
  }

  /** Remove all items. */
  clear(): void {
    this.items = [];
    this.children = [];
    this._itemCount = 0;
  }

  /** Check if this node is a leaf (has no children). */
  isLeaf(): boolean {
    return this.children.length === 0;
  }

  /** Get all items in the quadtree. */
  getAllItems(): T[] {
    const result: T[] = [];
    this.collectItems(result);
    return result;
  }

  private collectItems(result: T[]): void {
    for (const item of this.items) {
      result.push(item.data);
    }
    for (const child of this.children) {
      child.collectItems(result);
    }
  }
}
