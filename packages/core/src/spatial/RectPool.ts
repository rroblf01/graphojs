import { Rect } from '../geometry/Rect.ts';

/**
 * A pool for reusable Rect objects to reduce garbage collection pressure
 * during rendering and layout operations.
 */
export class RectPool {
  private pool: Rect[] = [];
  private maxPoolSize: number;

  constructor(maxPoolSize = 512) {
    this.maxPoolSize = maxPoolSize;
  }

  /** Get the number of pooled rects. */
  get size(): number {
    return this.pool.length;
  }

  /**
   * Acquire a Rect from the pool (or allocate a new one).
   * Must be released with release() when no longer needed.
   */
  acquire(x: number, y: number, width: number, height: number): Rect {
    const rect = this.pool.pop();
    if (rect) {
      rect.x = x;
      rect.y = y;
      rect.width = width;
      rect.height = height;
      return rect;
    }
    return new Rect(x, y, width, height);
  }

  /**
   * Release a Rect back to the pool for reuse.
   */
  release(rect: Rect): void {
    if (this.pool.length >= this.maxPoolSize) return;
    this.pool.push(rect);
  }

  /** Clear the pool. */
  clear(): void {
    this.pool.length = 0;
  }
}

/** Create a rect pool. */
export function createRectPool(maxPoolSize?: number): RectPool {
  return new RectPool(maxPoolSize);
}
