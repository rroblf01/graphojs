import type { Diagram } from '../diagram/Diagram.ts';
import { LayerNames } from '../layer/Layer.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';

export interface ImageExportOptions {
  /** Background color. Default: '#ffffff' */
  background?: string;
  /** Padding around the content. Default: 20 */
  padding?: number;
  /** Scale factor for the output resolution. Default: 1 */
  scale?: number;
  /** Maximum width in pixels. */
  maxWidth?: number;
  /** Maximum height in pixels. */
  maxHeight?: number;
}

/**
 * Exports a diagram to a raster image (PNG).
 * Renders the diagram content to an offscreen canvas.
 */
export class PNGExporter {
  private options: Required<ImageExportOptions>;

  constructor(options: ImageExportOptions = {}) {
    this.options = {
      background: options.background ?? '#ffffff',
      padding: options.padding ?? 20,
      scale: options.scale ?? 1,
      maxWidth: options.maxWidth ?? 10000,
      maxHeight: options.maxHeight ?? 10000,
    };
  }

  /**
   * Render the diagram content to an offscreen canvas.
   */
  makeCanvas(diagram: Diagram): HTMLCanvasElement {
    const { padding, scale, background } = this.options;

    // Compute content bounds
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const layer of diagram.getLayers()) {
      if (layer.name === LayerNames.Grid) continue;
      for (const part of layer.parts) {
        if (!part.visible) continue;
        minX = Math.min(minX, part.bounds.x);
        minY = Math.min(minY, part.bounds.y);
        maxX = Math.max(maxX, part.bounds.right);
        maxY = Math.max(maxY, part.bounds.bottom);
      }
    }

    if (minX === Infinity) {
      minX = 0;
      minY = 0;
      maxX = 100;
      maxY = 100;
    }

    const contentW = maxX - minX + padding * 2;
    const contentH = maxY - minY + padding * 2;

    // Apply scale and clamp
    let outW = contentW * scale;
    let outH = contentH * scale;
    const clamp = Math.min(this.options.maxWidth / outW, this.options.maxHeight / outH, 1);
    if (clamp < 1) {
      outW *= clamp;
      outH *= clamp;
    }

    // Create offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(outW));
    canvas.height = Math.max(1, Math.round(outH));

    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Transform: map content bounds to canvas
    const renderScale = Math.min(outW / contentW, outH / contentH);
    ctx.scale(renderScale, renderScale);
    ctx.translate(padding - minX, padding - minY);

    // Render parts in layer order
    for (const layer of diagram.getLayers()) {
      if (layer.name === LayerNames.Grid) continue;
      for (const part of layer.getVisibleParts()) {
        this.renderPart(ctx, part);
      }
    }

    return canvas;
  }

  private renderPart(ctx: CanvasRenderingContext2D, part: Part): void {
    ctx.save();
    ctx.globalAlpha = part.opacity;

    if (part instanceof Node) {
      const { x, y, width, height } = part.bounds;

      if (part.angle !== 0) {
        const cx = x + width / 2;
        const cy = y + height / 2;
        ctx.translate(cx, cy);
        ctx.rotate((part.angle * Math.PI) / 180);
        ctx.translate(-cx, -cy);
      }

      if (part.panel) {
        part.panel.setPosition(0, 0);
        part.panel.setActualSize(width, height);
        part.panel.draw(ctx, x, y, width, height);
      } else {
        ctx.fillStyle = part.fill;
        ctx.strokeStyle = part.stroke;
        ctx.lineWidth = part.strokeWidth;
        switch (part.shape) {
          case 'ellipse':
            ctx.beginPath();
            ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
          case 'roundedRect':
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, part.cornerRadius);
            ctx.fill();
            ctx.stroke();
            break;
          default:
            ctx.fillRect(x, y, width, height);
            ctx.strokeRect(x, y, width, height);
            break;
        }
        if (part.label) {
          ctx.fillStyle = part.labelColor;
          ctx.font = part.labelFont;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(part.label, x + width / 2, y + height / 2);
        }
      }
    } else if (part instanceof Link) {
      ctx.strokeStyle = part.stroke;
      ctx.lineWidth = part.strokeWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      const points = part.pathPoints.length > 0 ? part.pathPoints : [part.fromPort, part.toPort];
      ctx.beginPath();
      const first = points[0];
      if (first) {
        ctx.moveTo(first.x, first.y);
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          if (p) ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    } else if (part instanceof Group) {
      const { x, y, width, height } = part.bounds;
      ctx.fillStyle = part.fill;
      ctx.strokeStyle = part.stroke;
      ctx.lineWidth = part.strokeWidth;
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
    }

    ctx.restore();
  }

  /**
   * Export the diagram to a PNG data URL.
   */
  makeDataURL(diagram: Diagram): string {
    return this.makeCanvas(diagram).toDataURL('image/png');
  }

  /**
   * Export the diagram to a PNG Blob.
   */
  makeBlob(diagram: Diagram): Promise<Blob> {
    const canvas = this.makeCanvas(diagram);
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to export PNG'));
      }, 'image/png');
    });
  }

  /**
   * Download the diagram as a PNG file.
   */
  exportToFile(diagram: Diagram, filename: string): void {
    const dataUrl = this.makeDataURL(diagram);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }
}

/** Create a PNG exporter with default options. */
export function createPNGExporter(options?: ImageExportOptions): PNGExporter {
  return new PNGExporter(options);
}

/** Quick export a diagram to a PNG data URL. */
export function exportToPNG(diagram: Diagram, options?: ImageExportOptions): string {
  return new PNGExporter(options).makeDataURL(diagram);
}
