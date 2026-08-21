import { List } from '../collections/List.ts';
import type { Point } from './Point.ts';
import type { Rect } from './Rect.ts';
import { Rect as RectClass } from './Rect.ts';

/** GoJS-compatible: the kind of segment within a {@link PathFigure}. */
export const SegmentType = {
  Move: 1,
  Line: 2,
  Bezier: 3,
  QuadraticBezier: 4,
  Arc: 5,
  SvgArc: 6,
} as const;
export type SegmentType = (typeof SegmentType)[keyof typeof SegmentType];

/** GoJS-compatible: the overall shape a {@link Geometry} represents. */
export const GeometryType = {
  Line: 0,
  Rectangle: 1,
  Ellipse: 2,
  Path: 3,
} as const;
export type GeometryType = (typeof GeometryType)[keyof typeof GeometryType];

/**
 * GoJS-compatible: one segment of a {@link PathFigure} — a line, bezier, or
 * arc from the current point to `(endX, endY)`.
 */
export class PathSegment {
  type: SegmentType;
  endX: number;
  endY: number;
  point1X: number;
  point1Y: number;
  point2X: number;
  point2Y: number | boolean;
  clockwise: boolean;
  private _isClosed = false;

  constructor(
    type: SegmentType = SegmentType.Line,
    ex = 0,
    ey = 0,
    x1 = 0,
    y1 = 0,
    x2 = 0,
    y2: number | boolean = 0,
    clockwise = true,
  ) {
    this.type = type;
    this.endX = ex;
    this.endY = ey;
    this.point1X = x1;
    this.point1Y = y1;
    this.point2X = x2;
    this.point2Y = y2;
    this.clockwise = clockwise;
  }

  copy(): PathSegment {
    const s = new PathSegment(
      this.type,
      this.endX,
      this.endY,
      this.point1X,
      this.point1Y,
      this.point2X,
      this.point2Y,
      this.clockwise,
    );
    s._isClosed = this._isClosed;
    return s;
  }

  equalsApprox(s: PathSegment): boolean {
    return (
      this.type === s.type &&
      this.endX === s.endX &&
      this.endY === s.endY &&
      this.point1X === s.point1X &&
      this.point1Y === s.point1Y &&
      this.point2X === s.point2X &&
      this.point2Y === s.point2Y
    );
  }

  /** GoJS-compatible: mark this segment as closing its figure; returns `this`. */
  close(): this {
    this._isClosed = true;
    return this;
  }

  get isClosed(): boolean {
    return this._isClosed;
  }

  set isClosed(value: boolean) {
    this._isClosed = value;
  }
}

/**
 * GoJS-compatible: a subpath of a {@link Geometry} — a starting point plus
 * an ordered list of {@link PathSegment}s.
 */
export class PathFigure {
  startX: number;
  startY: number;
  isFilled: boolean;
  isShadowed: boolean;
  isEvenOdd: boolean;
  private _segments: List<PathSegment>;

  constructor(sx = 0, sy = 0, filled = true, shadowed = true, isEvenOdd = false) {
    this.startX = sx;
    this.startY = sy;
    this.isFilled = filled;
    this.isShadowed = shadowed;
    this.isEvenOdd = isEvenOdd;
    this._segments = new List<PathSegment>();
  }

  copy(): PathFigure {
    const f = new PathFigure(
      this.startX,
      this.startY,
      this.isFilled,
      this.isShadowed,
      this.isEvenOdd,
    );
    f._segments = new List(this._segments.toArray().map((s) => s.copy()));
    return f;
  }

  equalsApprox(f: PathFigure): boolean {
    return (
      this.startX === f.startX &&
      this.startY === f.startY &&
      this._segments.count === f._segments.count
    );
  }

  get segments(): List<PathSegment> {
    return this._segments;
  }

  set segments(value: List<PathSegment>) {
    this._segments = value;
  }

  /** GoJS-compatible: append a segment; returns `this`. */
  add(segment: PathSegment): this {
    this._segments.add(segment);
    return this;
  }
}

/**
 * GoJS-compatible: a custom, programmatically-built shape outline for
 * `Shape.geometry`, mirroring real GoJS's `Geometry`/`PathFigure`/
 * `PathSegment` object model.
 *
 * Unlike real GoJS, graphojs doesn't have a separate native rendering path
 * for arbitrary geometries — a `Geometry` serializes to the same SVG-like
 * mini-language string `Shape.geometryString` already supports
 * (M/L/C/Q/A/Z), and `Shape.geometry = someGeometry` sets `geometryString`
 * from that serialization under the hood. `Geometry.parse`/`stringify`
 * round-trip through the same format; smooth-curve shorthand (SVG's S/T)
 * is expanded to an equivalent absolute C/Q on parse, since PathSegment has
 * no direct "smooth" segment type.
 */
export class Geometry {
  static readonly Line = GeometryType.Line;
  static readonly Rectangle = GeometryType.Rectangle;
  static readonly Ellipse = GeometryType.Ellipse;
  static readonly Path = GeometryType.Path;

  type: GeometryType;
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  private _figures: List<PathFigure>;

  constructor(type: GeometryType = GeometryType.Path, init?: Partial<Geometry>) {
    this.type = type;
    this._figures = new List<PathFigure>();
    if (init) Object.assign(this, init);
  }

  copy(): Geometry {
    const g = new Geometry(this.type);
    g.startX = this.startX;
    g.startY = this.startY;
    g.endX = this.endX;
    g.endY = this.endY;
    g._figures = new List(this._figures.toArray().map((f) => f.copy()));
    return g;
  }

  equalsApprox(g: Geometry): boolean {
    return this.type === g.type && this._figures.count === g._figures.count;
  }

  get figures(): List<PathFigure> {
    return this._figures;
  }

  set figures(value: List<PathFigure>) {
    this._figures = value;
  }

  /** GoJS-compatible: append a figure; returns `this`. */
  add(figure: PathFigure): this {
    this._figures.add(figure);
    return this;
  }

  /** Compute the bounding box of every figure's points (an approximation: does not flatten curves). */
  computeBoundsWithoutOrigin(result?: Rect): Rect {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    const consider = (x: number, y: number): void => {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    };
    for (const fig of this._figures.toArray()) {
      consider(fig.startX, fig.startY);
      for (const seg of fig.segments.toArray()) {
        consider(seg.endX, seg.endY);
        if (typeof seg.point1X === 'number') consider(seg.point1X, seg.point1Y);
        if (typeof seg.point2X === 'number' && typeof seg.point2Y === 'number') {
          consider(seg.point2X, seg.point2Y);
        }
      }
    }
    if (!Number.isFinite(minX)) {
      minX = minY = maxX = maxY = 0;
    }
    if (result) {
      result.x = minX;
      result.y = minY;
      result.width = maxX - minX;
      result.height = maxY - minY;
      return result;
    }
    return new RectClass(minX, minY, maxX - minX, maxY - minY);
  }

  /** GoJS-compatible: serialize to graphojs's geometryString mini-language (M/L/C/Q/A/Z). */
  static stringify(val: Geometry): string {
    const parts: string[] = [];
    for (const fig of val.figures.toArray()) {
      parts.push(`M${fig.startX},${fig.startY}`);
      for (const seg of fig.segments.toArray()) {
        switch (seg.type) {
          case SegmentType.Line:
            parts.push(`L${seg.endX},${seg.endY}`);
            break;
          case SegmentType.Bezier:
            parts.push(
              `C${seg.point1X},${seg.point1Y},${seg.point2X},${seg.point2Y},${seg.endX},${seg.endY}`,
            );
            break;
          case SegmentType.QuadraticBezier:
            parts.push(`Q${seg.point1X},${seg.point1Y},${seg.endX},${seg.endY}`);
            break;
          case SegmentType.SvgArc:
            parts.push(
              `A${seg.point1X},${seg.point1Y},${seg.point2X},${seg.point2Y ? 1 : 0},${seg.clockwise ? 1 : 0},${seg.endX},${seg.endY}`,
            );
            break;
          case SegmentType.Arc:
          case SegmentType.Move:
            // No direct equivalent in the geometryString mini-language;
            // approximated as a line to the segment's end point.
            parts.push(`L${seg.endX},${seg.endY}`);
            break;
        }
        if (seg.isClosed) parts.push('Z');
      }
    }
    return parts.join(' ');
  }

  /**
   * GoJS-compatible: parse a geometryString into a structured `Geometry`.
   * H/V are expanded to an equivalent L; S/T (smooth curves) are
   * approximated as a plain C/Q using the given control point directly
   * (without SVG's "reflect the previous control point" adjustment).
   */
  static parse(str: string, filled = true): Geometry {
    const geo = new Geometry(GeometryType.Path);
    let figure: PathFigure | null = null;
    let cx = 0;
    let cy = 0;
    for (const cmd of tokenizeForGeometry(str)) {
      const a = cmd.args;
      switch (cmd.op) {
        case 'M':
          figure = new PathFigure(a[0] ?? 0, a[1] ?? 0, filled);
          geo.add(figure);
          cx = a[0] ?? 0;
          cy = a[1] ?? 0;
          break;
        case 'L':
          figure?.add(new PathSegment(SegmentType.Line, a[0] ?? cx, a[1] ?? cy));
          cx = a[0] ?? cx;
          cy = a[1] ?? cy;
          break;
        case 'H':
          figure?.add(new PathSegment(SegmentType.Line, a[0] ?? cx, cy));
          cx = a[0] ?? cx;
          break;
        case 'V':
          figure?.add(new PathSegment(SegmentType.Line, cx, a[0] ?? cy));
          cy = a[0] ?? cy;
          break;
        case 'C':
          figure?.add(
            new PathSegment(
              SegmentType.Bezier,
              a[4] ?? cx,
              a[5] ?? cy,
              a[0] ?? cx,
              a[1] ?? cy,
              a[2] ?? cx,
              a[3] ?? cy,
            ),
          );
          cx = a[4] ?? cx;
          cy = a[5] ?? cy;
          break;
        case 'S':
          figure?.add(
            new PathSegment(
              SegmentType.Bezier,
              a[2] ?? cx,
              a[3] ?? cy,
              cx,
              cy,
              a[0] ?? cx,
              a[1] ?? cy,
            ),
          );
          cx = a[2] ?? cx;
          cy = a[3] ?? cy;
          break;
        case 'Q':
          figure?.add(
            new PathSegment(
              SegmentType.QuadraticBezier,
              a[2] ?? cx,
              a[3] ?? cy,
              a[0] ?? cx,
              a[1] ?? cy,
            ),
          );
          cx = a[2] ?? cx;
          cy = a[3] ?? cy;
          break;
        case 'T':
          figure?.add(new PathSegment(SegmentType.QuadraticBezier, a[0] ?? cx, a[1] ?? cy, cx, cy));
          cx = a[0] ?? cx;
          cy = a[1] ?? cy;
          break;
        case 'A':
          figure?.add(
            new PathSegment(
              SegmentType.SvgArc,
              a[5] ?? cx,
              a[6] ?? cy,
              a[0] ?? 0,
              a[1] ?? 0,
              a[2] ?? 0,
              (a[3] ?? 0) !== 0,
              (a[4] ?? 0) !== 0,
            ),
          );
          cx = a[5] ?? cx;
          cy = a[6] ?? cy;
          break;
        case 'Z':
          figure?.segments.last()?.close();
          break;
      }
    }
    return geo;
  }

  /** GoJS-compatible: a back-converter factory for `Binding`s that write a `Geometry` as a string, rounded to `digits`. */
  static stringifyFixed(digits: number): (val: Geometry) => string {
    return (val: Geometry): string => {
      const full = Geometry.stringify(val);
      return full.replace(/-?\d+\.\d+/g, (n) => Number.parseFloat(n).toFixed(digits));
    };
  }

  /** Test membership by checking against the flattened bounding box (an approximation, not exact path containment). */
  containsPoint(p: Point): boolean {
    const b = this.computeBoundsWithoutOrigin();
    return p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height;
  }
}

interface GeometryToken {
  op: string;
  args: number[];
}

const GEOMETRY_ARITY: Record<string, number> = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0,
};

/** Minimal tokenizer for {@link Geometry.parse}, mirroring `panel/GeometryString.ts`'s. */
function tokenizeForGeometry(d: string): GeometryToken[] {
  const tokens: GeometryToken[] = [];
  const re = /([MLHVCSQTAZ])|(-?\d*\.?\d+(?:e-?\d+)?)/gi;
  let match: RegExpExecArray | null;
  let op = '';
  let nums: number[] = [];
  const flush = (): void => {
    if (!op) return;
    const arity = GEOMETRY_ARITY[op.toUpperCase()] ?? 0;
    if (arity === 0) {
      tokens.push({ op: op.toUpperCase(), args: [] });
      return;
    }
    for (let i = 0; i + arity <= nums.length; i += arity) {
      tokens.push({ op: op.toUpperCase(), args: nums.slice(i, i + arity) });
    }
  };
  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex-exec loop
  while ((match = re.exec(d))) {
    if (match[1]) {
      flush();
      op = match[1];
      nums = [];
    } else if (match[2]) {
      nums.push(Number.parseFloat(match[2]));
    }
  }
  flush();
  return tokens;
}
