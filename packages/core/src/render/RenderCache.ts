import type { ShapeType } from '../shapes/ShapeTypes.ts';
import { ShapeRenderer } from '../shapes/ShapeRenderer.ts';

/**
 * A cache for complex shape paths as Path2D objects.
 * Building a Path2D for complex shapes (diamond, star, etc.) is expensive;
 * caching them avoids recomputation each frame.
 */
export class PathCache {
  private paths = new Map<string, Path2D>();
  private _size = 0;

  /** Get the number of cached paths. */
  get size(): number {
    return this._size;
  }

  /**
   * Get (or build) a cached Path2D for a shape type at a given size.
   * The key includes the size because the shape geometry depends on it.
   */
  getPath(type: ShapeType, width: number, height: number): Path2D | null {
    const key = `${type}:${Math.round(width)}x${Math.round(height)}`;
    const cached = this.paths.get(key);
    if (cached) return cached;

    // Path2D may not be available in all environments
    if (typeof Path2D === 'undefined') return null;

    const path = this.buildPath(type, width, height);
    if (!path) return null;

    this.paths.set(key, path);
    this._size = this.paths.size;
    return path;
  }

  private buildPath(type: ShapeType, width: number, height: number): Path2D | null {
    const path = new Path2D();

    // Simple shapes built directly for performance
    switch (type) {
      case 'rect':
        path.rect(0, 0, width, height);
        return path;
      case 'ellipse':
        path.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
        return path;
      case 'roundedRect': {
        const r = Math.min(width, height) * 0.1;
        path.roundRect(0, 0, width, height, r);
        return path;
      }
      default:
        break;
    }

    // Complex shapes via the shared ShapeRenderer, forwarded to Path2D
    const ctx = createPath2DContext(path);
    const renderer = new ShapeRenderer(ctx);
    renderer.renderShape(type, 0, 0, width, height);
    return path;
  }

  /** Clear the path cache. */
  clear(): void {
    this.paths.clear();
    this._size = 0;
  }
}

/**
 * Create a context-like object that forwards path-building calls to a Path2D
 * and ignores everything else. Uses a Proxy so we don't need to implement the
 * full CanvasRenderingContext2D interface.
 */
function createPath2DContext(path: Path2D): CanvasRenderingContext2D {
  const pathMethods = [
    'moveTo',
    'lineTo',
    'closePath',
    'rect',
    'ellipse',
    'roundRect',
    'arc',
    'quadraticCurveTo',
    'bezierCurveTo',
  ];

  const proxy = new Proxy(
    {
      // Fill/stroke are no-ops (they can't be forwarded to Path2D)
      fill: () => {},
      stroke: () => {},
      beginPath: () => {},
      fillStyle: '#000',
      strokeStyle: '#000',
      lineWidth: 1,
    },
    {
      get(target: Record<string, unknown>, prop: string | symbol): unknown {
        const name = String(prop);
        if (pathMethods.includes(name)) {
          const method = (path as unknown as Record<string, unknown>)[name];
          if (typeof method === 'function') {
            return method.bind(path);
          }
          return method;
        }
        return target[name];
      },
    },
  );

  return proxy as unknown as CanvasRenderingContext2D;
}

/**
 * A cache for text width measurements.
 * Measuring text is expensive; cache widths per (text, font) pair.
 */
export class TextMeasureCache {
  private widths = new Map<string, number>();
  private _size = 0;

  /** Get the number of cached measurements. */
  get size(): number {
    return this._size;
  }

  /**
   * Measure text width, caching by (text, font).
   */
  measure(ctx: CanvasRenderingContext2D, text: string, font: string): number {
    const key = `${font}|${text}`;
    const cached = this.widths.get(key);
    if (cached !== undefined) return cached;

    const width = ctx.measureText(text).width;
    this.widths.set(key, width);
    this._size = this.widths.size;
    return width;
  }

  /** Clear the measurement cache. */
  clear(): void {
    this.widths.clear();
    this._size = 0;
  }
}

/** Create a path cache. */
export function createPathCache(): PathCache {
  return new PathCache();
}

/** Create a text measure cache. */
export function createTextMeasureCache(): TextMeasureCache {
  return new TextMeasureCache();
}
