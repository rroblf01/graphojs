import type { Layer } from '../layer/Layer.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';

interface CachedLayer {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Caches layer rendering to offscreen canvases so static content
 * does not need to be redrawn every frame. Only dirty layers are redrawn.
 */
export class LayerCache {
  private cache: Map<string, CachedLayer> = new Map();
  private dirtyLayers: Set<string> = new Set();

  constructor(private scale = 1) {}

  /** Set the device scale for cached rendering. */
  setScale(scale: number): void {
    if (scale !== this.scale) {
      this.scale = scale;
      this.clear();
    }
  }

  /** Get the current scale. */
  getScale(): number {
    return this.scale;
  }

  /** Mark a layer as dirty (needs redraw). */
  markDirty(layerName: string): void {
    this.dirtyLayers.add(layerName);
  }

  /** Mark all layers as dirty. */
  markAllDirty(): void {
    for (const name of this.cache.keys()) {
      this.dirtyLayers.add(name);
    }
  }

  /** Check if a layer is dirty. */
  isDirty(layerName: string): boolean {
    return this.dirtyLayers.has(layerName);
  }

  /** Get the number of cached layers. */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Get a cached rendering for a layer.
   * If the layer is dirty or not cached, it is re-rendered.
   * Returns null if the layer has no visible parts.
   */
  getLayer(layer: Layer): CachedLayer | null {
    const name = layer.name;

    // Check if cache is valid
    const cached = this.cache.get(name);
    const needsRedraw = this.dirtyLayers.has(name) || !cached;

    if (!needsRedraw && cached) {
      return cached;
    }

    const visibleParts = layer.getVisibleParts();
    if (visibleParts.length === 0) {
      this.cache.delete(name);
      this.dirtyLayers.delete(name);
      return null;
    }

    // Compute content bounds for the layer
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const part of visibleParts) {
      minX = Math.min(minX, part.bounds.x);
      minY = Math.min(minY, part.bounds.y);
      maxX = Math.max(maxX, part.bounds.right);
      maxY = Math.max(maxY, part.bounds.bottom);
    }
    if (minX === Infinity) {
      this.cache.delete(name);
      this.dirtyLayers.delete(name);
      return null;
    }

    // Account for stroke width and selection padding
    const padding = 4;
    const x = minX - padding;
    const y = minY - padding;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    // Create offscreen canvas at device scale
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * this.scale));
    canvas.height = Math.max(1, Math.round(height * this.scale));

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      this.dirtyLayers.delete(name);
      return cached ?? null;
    }

    ctx.scale(this.scale, this.scale);
    ctx.translate(-x, -y);

    // Render parts
    for (const part of visibleParts) {
      this.renderPart(ctx, part);
    }

    const entry: CachedLayer = { canvas, x, y, width, height };
    this.cache.set(name, entry);
    this.dirtyLayers.delete(name);

    return entry;
  }

  private renderPart(ctx: CanvasRenderingContext2D, part: Part): void {
    ctx.save();
    ctx.globalAlpha = part.opacity;

    if (part instanceof Node) {
      this.renderNode(ctx, part);
    } else if (part instanceof Link) {
      this.renderLink(ctx, part);
    } else if (part instanceof Group) {
      this.renderGroup(ctx, part);
    }

    ctx.restore();
  }

  private renderNode(ctx: CanvasRenderingContext2D, node: Node): void {
    const { x, y, width, height } = node.bounds;
    ctx.fillStyle = node.fill;
    ctx.strokeStyle = node.stroke;
    ctx.lineWidth = node.strokeWidth;

    switch (node.shape) {
      case 'ellipse':
        ctx.beginPath();
        ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'roundedRect': {
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, node.cornerRadius);
        ctx.fill();
        ctx.stroke();
        break;
      }
      default:
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        break;
    }

    if (node.label) {
      ctx.fillStyle = node.labelColor;
      ctx.font = node.labelFont;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, x + width / 2, y + height / 2);
    }
  }

  private renderLink(ctx: CanvasRenderingContext2D, link: Link): void {
    ctx.strokeStyle = link.stroke;
    ctx.lineWidth = link.strokeWidth;
    ctx.beginPath();
    const points = link.pathPoints.length > 0 ? link.pathPoints : [link.fromPort, link.toPort];
    const first = points[0];
    if (!first) return;
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (!p) continue;
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    // Render the link panel (label/template) at the midpoint
    if (link.panel && points.length > 0) {
      const mid = points[Math.floor(points.length / 2)];
      if (mid) {
        const panel = link.panel;
        const natural = panel.measure();
        const w = Math.max(1, natural.width || 40);
        const h = Math.max(1, natural.height || 20);
        panel.setPosition(mid.x - w / 2, mid.y - h / 2);
        panel.setActualSize(w, h);
        panel.draw(ctx, mid.x - w / 2, mid.y - h / 2, w, h);
      }
    }
  }

  private renderGroup(ctx: CanvasRenderingContext2D, group: Group): void {
    const { x, y, width, height } = group.bounds;
    ctx.fillStyle = group.fill;
    ctx.strokeStyle = group.stroke;
    ctx.lineWidth = group.strokeWidth;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
  }

  /** Clear the cache. */
  clear(): void {
    this.cache.clear();
    this.dirtyLayers.clear();
  }

  /** Remove a specific layer from the cache. */
  removeLayer(name: string): void {
    this.cache.delete(name);
    this.dirtyLayers.delete(name);
  }
}

/** Create a layer cache. */
export function createLayerCache(scale?: number): LayerCache {
  return new LayerCache(scale);
}
