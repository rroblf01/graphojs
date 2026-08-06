/**
 * Cache for computed link paths.
 * Avoids recomputing routing when endpoints haven't moved.
 */
export class LinkPathCache {
  private cache = new Map<string, Array<{ x: number; y: number }>>();
  private version = 0;

  /**
   * Generate a cache key from link properties. When `avoidObstacles` is set,
   * the routing result depends on every obstacle's position, so the obstacles
   * are serialized into the key to avoid reusing stale paths.
   */
  private static getKey(
    fromKey: string | number,
    toKey: string | number,
    routing: string,
    corner: number,
    fromPort: { x: number; y: number },
    toPort: { x: number; y: number },
    avoidObstacles = false,
    jumpOver = false,
    obstacles: Array<{ x: number; y: number; width: number; height: number }> = [],
  ): string {
    let obstacleSignature = '';
    if (avoidObstacles && obstacles.length > 0) {
      obstacleSignature = obstacles.map((o) => `${o.x},${o.y},${o.width},${o.height}`).join(';');
    }
    return `${fromKey}-${toKey}-${routing}-${corner}-${avoidObstacles}-${jumpOver}-${fromPort.x},${fromPort.y}-${toPort.x},${toPort.y}-${obstacleSignature}`;
  }

  /**
   * Get a cached path if available.
   */
  get(
    fromKey: string | number,
    toKey: string | number,
    routing: string,
    corner: number,
    fromPort: { x: number; y: number },
    toPort: { x: number; y: number },
    avoidObstacles = false,
    jumpOver = false,
    obstacles: Array<{ x: number; y: number; width: number; height: number }> = [],
  ): Array<{ x: number; y: number }> | null {
    const key = LinkPathCache.getKey(
      fromKey,
      toKey,
      routing,
      corner,
      fromPort,
      toPort,
      avoidObstacles,
      jumpOver,
      obstacles,
    );
    return this.cache.get(key) ?? null;
  }

  /**
   * Store a computed path in the cache.
   */
  set(
    fromKey: string | number,
    toKey: string | number,
    routing: string,
    corner: number,
    fromPort: { x: number; y: number },
    toPort: { x: number; y: number },
    points: Array<{ x: number; y: number }>,
    avoidObstacles = false,
    jumpOver = false,
    obstacles: Array<{ x: number; y: number; width: number; height: number }> = [],
  ): void {
    const key = LinkPathCache.getKey(
      fromKey,
      toKey,
      routing,
      corner,
      fromPort,
      toPort,
      avoidObstacles,
      jumpOver,
      obstacles,
    );
    this.cache.set(key, points);
    this.version++;
  }

  /**
   * Invalidate the entire cache.
   */
  invalidate(): void {
    this.cache.clear();
    this.version++;
  }

  /**
   * Get the current cache version (increments on changes).
   */
  getVersion(): number {
    return this.version;
  }

  /**
   * Get the number of cached entries.
   */
  get size(): number {
    return this.cache.size;
  }
}

/**
 * Pool for offscreen canvases to avoid frequent allocation.
 */
export class CanvasPool {
  private pool: HTMLCanvasElement[] = [];
  private inUse = new Set<HTMLCanvasElement>();
  private maxWidth: number;
  private maxHeight: number;

  constructor(maxSize = 10, maxWidth = 2048, maxHeight = 2048) {
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    // Pre-allocate canvases
    for (let i = 0; i < maxSize; i++) {
      const canvas = this.createCanvas();
      this.pool.push(canvas);
    }
  }

  /**
   * Get a canvas from the pool.
   */
  acquire(width: number, height: number): HTMLCanvasElement {
    let canvas = this.pool.pop();
    if (!canvas) {
      canvas = this.createCanvas();
    }
    canvas.width = Math.min(width, this.maxWidth);
    canvas.height = Math.min(height, this.maxHeight);
    this.inUse.add(canvas);
    return canvas;
  }

  /**
   * Release a canvas back to the pool.
   */
  release(canvas: HTMLCanvasElement): void {
    if (this.inUse.delete(canvas)) {
      // Clear the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      this.pool.push(canvas);
    }
  }

  /**
   * Release all canvases back to the pool.
   */
  releaseAll(): void {
    for (const canvas of this.inUse) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      this.pool.push(canvas);
    }
    this.inUse.clear();
  }

  /**
   * Get the number of available canvases.
   */
  get available(): number {
    return this.pool.length;
  }

  /**
   * Get the number of canvases in use.
   */
  get used(): number {
    return this.inUse.size;
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = this.maxWidth;
    canvas.height = this.maxHeight;
    return canvas;
  }
}

/**
 * Throttle function calls to limit execution rate.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Debounce function calls to delay execution until after a pause.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}
