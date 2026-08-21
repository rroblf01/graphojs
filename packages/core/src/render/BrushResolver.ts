import { type Brush, type BrushLike, BrushType } from '../geometry/Brush.ts';

/**
 * Resolve a `BrushLike` (a plain CSS color string, or a {@link Brush}) into
 * a value a Canvas 2D `fillStyle`/`strokeStyle` accepts, given the element's
 * bounds. Solid/plain-string brushes pass through unchanged; Linear/Radial
 * brushes become a `CanvasGradient`; Pattern brushes become a
 * `CanvasPattern`.
 */
export function resolveBrushLike(
  ctx: CanvasRenderingContext2D,
  brush: BrushLike | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
): string | CanvasGradient | CanvasPattern {
  if (!brush) return 'transparent';
  if (typeof brush === 'string') return brush;

  switch (brush.type) {
    case BrushType.Linear: {
      const p1 = brush.start.computePoint(x, y, width, height);
      const p2 = brush.end.computePoint(x, y, width, height);
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      applyColorStops(gradient, brush);
      return gradient;
    }
    case BrushType.Radial: {
      const p1 = brush.start.computePoint(x, y, width, height);
      const p2 = brush.end.computePoint(x, y, width, height);
      const scale = Math.max(width, height);
      const gradient = ctx.createRadialGradient(
        p1.x,
        p1.y,
        brush.startRadius * scale,
        p2.x,
        p2.y,
        brush.endRadius * scale,
      );
      applyColorStops(gradient, brush);
      return gradient;
    }
    case BrushType.Pattern: {
      if (brush.pattern) {
        const pattern = ctx.createPattern(brush.pattern, 'repeat');
        if (pattern) return pattern;
      }
      return brush.color || 'transparent';
    }
    default:
      return brush.color;
  }
}

function applyColorStops(gradient: CanvasGradient, brush: Brush): void {
  const stops = brush.colorStops;
  if (!stops || stops.count === 0) {
    gradient.addColorStop(0, brush.color || '#000000');
    return;
  }
  for (const { key, value } of stops.toArray().sort((a, b) => a.key - b.key)) {
    gradient.addColorStop(Math.max(0, Math.min(1, key)), value);
  }
}
