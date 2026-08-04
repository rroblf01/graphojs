import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import type { ShapeType } from '../shapes/ShapeTypes.ts';
import { ShapeRenderer } from '../shapes/ShapeRenderer.ts';
import { PathCache } from '../render/RenderCache.ts';
import { GraphObject } from './GraphObject.ts';
import { normalizeShapeType } from '../shapes/ShapeTypes.ts';
import { drawGeometryString } from './GeometryString.ts';

/** Shared path cache for all panel shapes (avoids recomputing complex paths). */
const sharedPathCache = new PathCache();

/**
 * A geometric shape element in a panel.
 */
export class Shape extends GraphObject {
  // GoJS-compatible figure constants
  static readonly Rectangle = 'rect';
  static readonly RoundedRectangle = 'roundedRect';
  static readonly Ellipse = 'ellipse';
  static readonly Diamond = 'diamond';
  static readonly Hexagon = 'hexagon';
  static readonly Octagon = 'octagon';
  static readonly Star = 'star';
  static readonly Triangle = 'triangle';
  static readonly Cross = 'cross';
  static readonly Arrow = 'arrow';
  static readonly Cloud = 'cloud';
  static readonly Parallelogram = 'parallelogram';
  static readonly Trapezoid = 'trapezoid';
  static readonly Pentagon = 'pentagon';
  static readonly Heart = 'heart';
  static readonly Cylinder = 'cylinder';
  static readonly Process = 'process';
  static readonly Document = 'document';
  static readonly Decision = 'decision';
  static readonly Start = 'start';
  static readonly End = 'end';
  static readonly Io = 'io';
  static readonly Card = 'card';
  static readonly Display = 'display';
  static readonly Delay = 'delay';
  static readonly ManualOperation = 'manualOperation';
  static readonly Merge = 'merge';
  static readonly Extract = 'extract';
  static readonly Or = 'or';
  static readonly SummingJunction = 'summingJunction';
  static readonly X = 'x';
  static readonly Plus = 'plus';
  static readonly Minus = 'minus';
  static readonly Line = 'line';
  static readonly Circle = 'circle';
  static readonly DoubleArrow = 'doubleArrow';
  static readonly Person = 'person';
  static readonly Ring = 'ring';
  static readonly Rhombus = 'rhombus';
  static readonly Kite = 'kite';
  static readonly Club = 'club';
  static readonly Spade = 'spade';
  static readonly PiePiece = 'piePiece';

  private _shape: ShapeType = 'rect';
  private _fill = '#cccccc';
  private _stroke = '#333333';
  private _strokeWidth = 1;
  private _cornerRadius = 0;

  constructor(shape?: string) {
    super();
    if (shape) this._shape = normalizeShapeType(shape);
  }

  get shape(): ShapeType {
    return this._shape;
  }

  set shape(value: string) {
    this._shape = normalizeShapeType(value);
  }

  /** GoJS-compatible: Alias for `shape` (GoJS uses `figure`). */
  get figure(): ShapeType {
    return this._shape;
  }

  set figure(value: string) {
    this._shape = normalizeShapeType(value);
  }

  get fill(): string {
    return this._fill;
  }

  set fill(value: string) {
    this._fill = value;
  }

  /** GoJS-compatible: Arrowhead figure at the start of a link (e.g. "Triangle", "OpenTriangle"). */
  toArrow: string = '';
  /** GoJS-compatible: Arrowhead figure at the end of a link (e.g. "Triangle", "OpenTriangle"). */
  fromArrow: string = '';

  /** GoJS-compatible: Whether to draw this shape even if it has no figure (used as link path). */
  isPanelMain = false;

  private _geometryString = '';

  /** GoJS-compatible: An SVG path (geometry string) used as this shape's outline. */
  get geometryString(): string {
    return this._geometryString;
  }

  set geometryString(value: string) {
    this._geometryString = value ?? '';
  }

  get stroke(): string {
    return this._stroke;
  }

  set stroke(value: string) {
    this._stroke = value;
  }

  get strokeWidth(): number {
    return this._strokeWidth;
  }

  set strokeWidth(value: number) {
    this._strokeWidth = value;
  }

  private _strokeCap: 'butt' | 'round' | 'square' = 'butt';
  private _strokeJoin: 'miter' | 'round' | 'bevel' = 'miter';

  /** GoJS-compatible: The cap style for stroking the outline. */
  get strokeCap(): 'butt' | 'round' | 'square' {
    return this._strokeCap;
  }

  set strokeCap(value: 'butt' | 'round' | 'square') {
    this._strokeCap = value;
  }

  /** GoJS-compatible: The join style for stroking the outline. */
  get strokeJoin(): 'miter' | 'round' | 'bevel' {
    return this._strokeJoin;
  }

  set strokeJoin(value: 'miter' | 'round' | 'bevel') {
    this._strokeJoin = value;
  }

  get cornerRadius(): number {
    return this._cornerRadius;
  }

  set cornerRadius(value: number) {
    this._cornerRadius = value;
  }

  /** Fluent setter for fill. */
  setFill(value: string): this {
    this._fill = value;
    return this;
  }

  /** Fluent setter for stroke. */
  setStroke(value: string): this {
    this._stroke = value;
    return this;
  }

  /** Fluent setter for stroke width. */
  setStrokeWidth(value: number): this {
    this._strokeWidth = value;
    return this;
  }

  /** Fluent setter for corner radius. */
  setCornerRadius(value: number): this {
    this._cornerRadius = value;
    return this;
  }

  /** Deep copy of this shape. */
  override clone(): this {
    const cloned = new Shape(this._shape) as this;
    cloned.copyFrom(this);
    cloned._fill = this._fill;
    cloned._stroke = this._stroke;
    cloned._strokeWidth = this._strokeWidth;
    cloned._cornerRadius = this._cornerRadius;
    cloned._geometryString = this._geometryString;
    cloned.toArrow = this.toArrow;
    cloned.fromArrow = this.fromArrow;
    return cloned;
  }

  override measure(): Size {
    const w = this.width > 0 ? this.width : 100;
    const h = this.height > 0 ? this.height : 60;
    return new SizeClass(w, h);
  }

  override draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    ctx.save();
    ctx.fillStyle = this._fill;
    ctx.strokeStyle = this._stroke;
    ctx.lineWidth = this._strokeWidth;

    if (this._geometryString) {
      // GoJS-compatible: geometry string takes precedence over the figure
      drawGeometryString(ctx, this._geometryString, x, y, width, height);
      ctx.fill();
      ctx.stroke();
    } else if (this._shape === 'rect' || this._shape === 'roundedRect') {
      if (this._shape === 'roundedRect') {
        const r = this._cornerRadius || Math.min(width, height) * 0.1;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, r);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
      }
    } else if (this._shape === 'ellipse') {
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    } else {
      // Use cached Path2D for complex shapes when available
      const path = sharedPathCache.getPath(this._shape, width, height);
      if (path) {
        ctx.translate(x, y);
        ctx.fill(path);
        ctx.stroke(path);
      } else {
        const renderer = new ShapeRenderer(ctx);
        renderer.renderShape(this._shape, x, y, width, height);
        ctx.fill();
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}
