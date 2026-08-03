import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import { QuadTree } from './QuadTree.ts';
import type { Part } from '../parts/Part.ts';

/**
 * Manages viewport culling and spatial indexing for a diagram.
 * Only parts intersecting the visible viewport are considered "in view".
 */
export class VirtualizationManager {
  private spatialIndex: QuadTree<Part>;
  private _isEnabled = false;
  private _culledCount = 0;

  constructor(bounds: Rect, options?: { maxDepth?: number; maxItems?: number }) {
    this.spatialIndex = new QuadTree<Part>(bounds, options);
  }

  /** Whether virtualization is enabled. */
  get isEnabled(): boolean {
    return this._isEnabled;
  }

  /** Set whether virtualization is enabled. */
  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  /** Get the number of parts currently culled (hidden). */
  get culledCount(): number {
    return this._culledCount;
  }

  /** Get the total number of indexed parts. */
  get itemCount(): number {
    return this.spatialIndex.itemCount;
  }

  /** Get the underlying spatial index. */
  getIndex(): QuadTree<Part> {
    return this.spatialIndex;
  }

  /** Insert a part into the spatial index. */
  insert(part: Part): void {
    this.spatialIndex.insertWithBounds(part.bounds, part);
  }

  /** Insert a part at explicit coordinates. */
  insertAt(x: number, y: number, part: Part): void {
    this.spatialIndex.insert(x, y, part);
  }

  /** Remove a part from the spatial index. */
  remove(part: Part): boolean {
    return this.spatialIndex.remove(part);
  }

  /** Rebuild the spatial index from a list of parts. */
  rebuild(parts: Iterable<Part>, bounds: Rect): void {
    this.spatialIndex = new QuadTree<Part>(bounds);
    for (const part of parts) {
      this.spatialIndex.insertWithBounds(part.bounds, part);
    }
  }

  /**
   * Cull parts based on the current viewport.
   * Returns the parts that are visible in the viewport.
   */
  cull(viewport: Rect): Part[] {
    if (!this._isEnabled) {
      this._culledCount = 0;
      return [];
    }

    const visible = this.spatialIndex.queryRegion(viewport);
    const visibleSet = new Set(visible);
    this._culledCount = visibleSet.size;
    return visible;
  }

  /**
   * Query parts intersecting a region.
   */
  queryRegion(bounds: Rect): Part[] {
    return this.spatialIndex.queryRegion(bounds);
  }

  /** Query parts within a circle. */
  queryCircle(cx: number, cy: number, radius: number): Part[] {
    return this.spatialIndex.queryCircle(cx, cy, radius);
  }

  /** Query the nearest part to a point within a maximum distance. */
  queryNearest(x: number, y: number, maxDistance: number): Part | null {
    return this.spatialIndex.queryNearest(x, y, maxDistance);
  }

  /** Clear the spatial index. */
  clear(): void {
    this.spatialIndex.clear();
    this._culledCount = 0;
  }

  /** Create a viewport rect from diagram coordinates. */
  static createViewport(x: number, y: number, width: number, height: number, padding = 0): Rect {
    return new RectClass(x - padding, y - padding, width + padding * 2, height + padding * 2);
  }
}
