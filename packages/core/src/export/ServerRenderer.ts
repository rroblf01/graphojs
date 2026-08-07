import type { Diagram } from '../diagram/Diagram.ts';
import { LayerNames } from '../layer/Layer.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';

/**
 * Minimal canvas-like object accepted for server-side rendering — matches
 * what `node-canvas`, `@napi-rs/canvas`, and `skia-canvas` already provide.
 * No DOM/browser APIs (no `getBoundingClientRect`, no `style`) are required.
 */
export interface ServerCanvasLike {
  width: number;
  height: number;
  getContext(contextId: '2d'): CanvasRenderingContext2D | null;
}

export interface ServerRenderOptions {
  /** Background color. Default: '#ffffff' */
  background?: string;
  /** Padding around the content. Default: 20 */
  padding?: number;
  /** Scale factor for the output resolution. Default: 1 */
  scale?: number;
  /** Maximum output width in pixels. */
  maxWidth?: number;
  /** Maximum output height in pixels. */
  maxHeight?: number;
}

/** Bounding box of all visible content in `diagram`, ignoring the grid layer. */
export function measureDiagramContent(diagram: Diagram): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

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

  if (minX === Number.POSITIVE_INFINITY) {
    return { x: 0, y: 0, width: 100, height: 100 };
  }
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

/**
 * Renders `diagram`'s current content onto a caller-supplied canvas-like
 * object — no `document`, no DOM, no browser `<canvas>` involved. Intended
 * for server-side rendering: build the `Diagram` under a lightweight DOM
 * shim (e.g. jsdom, whose own canvas has no real 2D backend) for its
 * model/layout logic, then render the actual pixels into a fast native
 * canvas from an optional package of your choice:
 *
 * ```js
 * import { createCanvas } from '@napi-rs/canvas'; // or 'canvas', 'skia-canvas'...
 * import { renderDiagramToCanvas } from 'graphojs';
 *
 * const canvas = createCanvas(1, 1); // resized internally to fit the content
 * renderDiagramToCanvas(diagram, canvas, { padding: 20 });
 * const png = canvas.toBuffer('image/png');
 * ```
 *
 * GraphoJS does not depend on any Node canvas package — bring whichever one
 * you prefer; this only requires `width`/`height`/`getContext('2d')`.
 */
export function renderDiagramToCanvas(
  diagram: Diagram,
  canvas: ServerCanvasLike,
  options: ServerRenderOptions = {},
): void {
  const { background = '#ffffff', padding = 20, scale = 1 } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get a 2D context from the provided canvas');

  const bounds = measureDiagramContent(diagram);
  const contentW = bounds.width + padding * 2;
  const contentH = bounds.height + padding * 2;

  let outW = contentW * scale;
  let outH = contentH * scale;
  if (options.maxWidth !== undefined || options.maxHeight !== undefined) {
    const clamp = Math.min(
      options.maxWidth !== undefined ? options.maxWidth / outW : 1,
      options.maxHeight !== undefined ? options.maxHeight / outH : 1,
      1,
    );
    outW *= clamp;
    outH *= clamp;
  }

  canvas.width = Math.max(1, Math.round(outW));
  canvas.height = Math.max(1, Math.round(outH));

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const renderScale = Math.min(canvas.width / contentW, canvas.height / contentH);
  ctx.save();
  ctx.scale(renderScale, renderScale);
  ctx.translate(padding - bounds.x, padding - bounds.y);

  for (const layer of diagram.getLayers()) {
    if (layer.name === LayerNames.Grid) continue;
    for (const part of layer.getVisibleParts()) {
      renderPartToContext(ctx, part);
    }
  }
  ctx.restore();
}

/** Draws one part directly via a plain 2D context — no renderer/layer machinery involved. */
function renderPartToContext(ctx: CanvasRenderingContext2D, part: Part): void {
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
    const first = points[0];
    if (first) {
      ctx.beginPath();
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
