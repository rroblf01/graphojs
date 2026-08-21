import type { BrushLike } from '../geometry/Brush.ts';
import { Geometry } from '../geometry/Geometry.ts';
import { Rect } from '../geometry/Rect.ts';
import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { resolveBrushLike } from '../render/BrushResolver.ts';
import { PathCache } from '../render/RenderCache.ts';
import { ShapeRenderer } from '../shapes/ShapeRenderer.ts';
import type { ShapeType } from '../shapes/ShapeTypes.ts';
import { normalizeShapeType } from '../shapes/ShapeTypes.ts';
import { drawGeometryString } from './GeometryString.ts';
import { GraphObject } from './GraphObject.ts';

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
  static readonly File = 'file';
  static readonly Folder = 'folder';
  static readonly Terminator = 'terminator';
  static readonly Planner = 'planner';
  static readonly Database = 'database';
  static readonly Subroutine = 'subroutine';
  static readonly DoubleChevron = 'doubleChevron';
  static readonly HalfCircle = 'halfCircle';
  static readonly RightTriangle = 'rightTriangle';
  static readonly TabbedRectangle = 'tabbedRectangle';

  private _shape: ShapeType = 'rect';
  private _fill: BrushLike = '#cccccc';
  private _stroke: BrushLike = '#333333';
  private _strokeWidth = 1;
  private _cornerRadius = 0;
  private _interval = 1;

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

  get fill(): BrushLike {
    return this._fill;
  }

  set fill(value: BrushLike) {
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

  private _geometry: Geometry | null = null;

  /**
   * GoJS-compatible: a programmatically-built {@link Geometry} for this
   * shape's outline (an alternative to setting {@link geometryString}
   * directly). Serializes into `geometryString` under the hood via
   * `Geometry.stringify`, reusing the same rendering path.
   */
  get geometry(): Geometry | null {
    return this._geometry;
  }

  set geometry(value: Geometry | null) {
    this._geometry = value;
    this._geometryString = value ? Geometry.stringify(value) : '';
  }

  get stroke(): BrushLike {
    return this._stroke;
  }

  set stroke(value: BrushLike) {
    this._stroke = value;
  }

  get strokeWidth(): number {
    return this._strokeWidth;
  }

  set strokeWidth(value: number) {
    this._strokeWidth = value;
  }

  private _strokeDashArray: number[] = [];

  /** GoJS-compatible: The dash pattern for stroking the outline. */
  get strokeDashArray(): number[] {
    return this._strokeDashArray;
  }

  set strokeDashArray(value: number[]) {
    this._strokeDashArray = Array.isArray(value) ? value : [];
  }

  /** GoJS-compatible: Get the geometry as a string (alias of geometryString). */
  get fromGeometry(): unknown {
    return this._geometryString || null;
  }

  /** GoJS-compatible: Set the geometry from a geometry string or object. */
  set fromGeometry(value: unknown) {
    if (typeof value === 'string') {
      this._geometryString = value;
    } else if (value && typeof value === 'object') {
      const gs = (value as { string?: unknown }).string;
      if (typeof gs === 'string') this._geometryString = gs;
    }
  }

  /** GoJS-compatible: Get the geometry (alias of fromGeometry). */
  get toGeometry(): unknown {
    return this._geometryString || null;
  }

  /** GoJS-compatible: Set the geometry (alias of fromGeometry). */
  set toGeometry(value: unknown) {
    this.fromGeometry = value;
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

  /**
   * GoJS-compatible: for a `"LineH"`/`"LineV"` `Shape` tiled by a `Panel
   * "Grid"`, how often this line is actually drawn — every Nth row/column
   * instead of every one. Only consulted by `Panel`'s Grid tiling; a
   * plain positive integer, defaulting to 1 (every line).
   */
  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
  }

  /** Fluent setter for fill. */
  setFill(value: BrushLike): this {
    this._fill = value;
    return this;
  }

  /** Fluent setter for stroke. */
  setStroke(value: BrushLike): this {
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
    cloned._interval = this._interval;
    cloned._geometryString = this._geometryString;
    cloned._geometry = this._geometry ? this._geometry.copy() : null;
    cloned._strokeCap = this._strokeCap;
    cloned._strokeJoin = this._strokeJoin;
    cloned.isPanelMain = this.isPanelMain;
    cloned.toArrow = this.toArrow;
    cloned.fromArrow = this.fromArrow;
    return cloned;
  }

  override measure(): Size {
    const w = this.width > 0 ? this.width : 100;
    const h = this.height > 0 ? this.height : 60;
    return new SizeClass(w, h);
  }

  /** GoJS-compatible: The bounds of this shape's geometry (at its current size). */
  getGeometricBounds(): Rect {
    const w = this.width > 0 ? this.width : this.actualSize.width;
    const h = this.height > 0 ? this.height : this.actualSize.height;
    return new Rect(0, 0, w || 0, h || 0);
  }

  /** GoJS-compatible: The bounds of this shape's geometry inflated by the stroke width. */
  getStrokeBounds(): Rect {
    const b = this.getGeometricBounds();
    const s = this._strokeWidth / 2;
    return new Rect(b.x - s, b.y - s, b.width + this._strokeWidth, b.height + this._strokeWidth);
  }

  override draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    ctx.save();
    ctx.fillStyle = resolveBrushLike(ctx, this._fill, x, y, width, height);
    ctx.strokeStyle = resolveBrushLike(ctx, this._stroke, x, y, width, height);
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
