import { Map as GoMap } from '../collections/Map.ts';
import { Spot } from './Spot.ts';

/** GoJS-compatible: the kind of paint a {@link Brush} represents. */
export const BrushType = {
  Solid: 1,
  Linear: 2,
  Radial: 3,
  Pattern: 4,
} as const;
export type BrushType = (typeof BrushType)[keyof typeof BrushType];

/** GoJS-compatible: the color space used by `Brush.lighten`/`darken`/`mix`. */
export const ColorSpace = {
  Lab: 1,
  HSL: 2,
} as const;
export type ColorSpace = (typeof ColorSpace)[keyof typeof ColorSpace];

/** GoJS-compatible: anywhere a color/paint is accepted — a plain CSS color string, or a {@link Brush}. */
export type BrushLike = Brush | string | null;

/**
 * GoJS-compatible: a portable, serializable description of a solid color,
 * linear gradient, radial gradient, or pattern fill/stroke — an
 * alternative to a plain CSS color string for `Shape.fill`/`stroke` (and
 * anywhere else `BrushLike` is accepted). Unlike a raw `CanvasGradient`,
 * a `Brush` doesn't need a live canvas context to construct — it's
 * resolved to one lazily at draw time (see `resolveBrushLike` in
 * `render/BrushResolver.ts`).
 */
export class Brush {
  static readonly Solid = BrushType.Solid;
  static readonly Linear = BrushType.Linear;
  static readonly Radial = BrushType.Radial;
  static readonly Pattern = BrushType.Pattern;
  static readonly Lab = ColorSpace.Lab;
  static readonly HSL = ColorSpace.HSL;

  private _type: BrushType;
  private _color = '';
  private _start: Spot = Spot.TopLeft;
  private _end: Spot = Spot.BottomRight;
  private _startRadius = 0;
  private _endRadius = 1;
  private _colorStops: GoMap<number, string> | null = null;
  private _pattern: HTMLCanvasElement | HTMLImageElement | null = null;

  /**
   * @param type one of `Brush.Solid`/`Linear`/`Radial`/`Pattern` (default `Solid`).
   * @param init a partial property bag, plus optionally numeric keys
   *   (`{0: "red", 1: "blue"}`) as shorthand for color stops.
   */
  constructor(
    type: BrushType | string = BrushType.Solid,
    init?: Partial<Brush> & Record<number, string>,
  ) {
    this._type = typeof type === 'string' ? (Number(type) as BrushType) || BrushType.Solid : type;
    if (init) {
      const stops = new GoMap<number, string>();
      let hasStops = false;
      for (const key of Object.keys(init)) {
        const n = Number(key);
        if (Number.isFinite(n) && String(n) === key) {
          stops.set(n, (init as Record<number, string>)[n] as string);
          hasStops = true;
        }
      }
      if (hasStops) this._colorStops = stops;
      if (init.color !== undefined) this._color = init.color;
      if (init.start !== undefined) this._start = init.start;
      if (init.end !== undefined) this._end = init.end;
      if (init.startRadius !== undefined) this._startRadius = init.startRadius;
      if (init.endRadius !== undefined) this._endRadius = init.endRadius;
      if (init.pattern !== undefined) this._pattern = init.pattern;
    }
  }

  copy(): Brush {
    const b = new Brush(this._type);
    b._color = this._color;
    b._start = this._start;
    b._end = this._end;
    b._startRadius = this._startRadius;
    b._endRadius = this._endRadius;
    b._colorStops = this._colorStops ? this._colorStops.copy() : null;
    b._pattern = this._pattern;
    return b;
  }

  /** GoJS-compatible: add a color stop at fractional location `loc` (0..1); returns `this`. */
  addColorStop(loc: number, color: string): this {
    if (!this._colorStops) this._colorStops = new GoMap<number, string>();
    this._colorStops.set(loc, color);
    return this;
  }

  get type(): BrushType {
    return this._type;
  }

  set type(value: BrushType) {
    this._type = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get start(): Spot {
    return this._start;
  }

  set start(value: Spot) {
    this._start = value;
  }

  get end(): Spot {
    return this._end;
  }

  set end(value: Spot) {
    this._end = value;
  }

  get startRadius(): number {
    return this._startRadius;
  }

  set startRadius(value: number) {
    this._startRadius = value;
  }

  get endRadius(): number {
    return this._endRadius;
  }

  set endRadius(value: number) {
    this._endRadius = value;
  }

  get colorStops(): GoMap<number, string> | null {
    return this._colorStops;
  }

  set colorStops(value: GoMap<number, string> | null) {
    this._colorStops = value;
  }

  get pattern(): HTMLCanvasElement | HTMLImageElement | null {
    return this._pattern;
  }

  set pattern(value: HTMLCanvasElement | HTMLImageElement | null) {
    this._pattern = value;
  }

  /** Lighten this brush's solid `color` in place by `fraction` (default 0.2); returns `this`. */
  lightenBy(fraction = 0.2, _mode: ColorSpace = ColorSpace.Lab): this {
    this._color = Brush.lightenBy(this._color, fraction);
    return this;
  }

  /** Darken this brush's solid `color` in place by `fraction` (default 0.2); returns `this`. */
  darkenBy(fraction = 0.2, _mode: ColorSpace = ColorSpace.Lab): this {
    this._color = Brush.darkenBy(this._color, fraction);
    return this;
  }

  /** Whether this brush's solid `color` is perceptually dark (ignores gradients/patterns). */
  isDark(): boolean {
    return Brush.isDark(this._color);
  }

  // ---- static color utilities ----

  static randomColor(min = 0, max = 255): string {
    const lo = Math.max(0, Math.min(255, min));
    const hi = Math.max(lo, Math.min(255, max));
    const channel = (): number => Math.floor(lo + Math.random() * (hi - lo + 1));
    return `rgb(${channel()}, ${channel()}, ${channel()})`;
  }

  static isValidColor(color: string): boolean {
    if (typeof color !== 'string' || color.length === 0) return false;
    const ctx = getProbeCtx();
    if (!ctx) return /^#[0-9a-f]{3,8}$/i.test(color) || /^(rgb|hsl)a?\(/i.test(color);
    ctx.fillStyle = '#000000';
    try {
      ctx.fillStyle = color;
    } catch {
      return false;
    }
    return ctx.fillStyle !== '#000000' || color === '#000000' || color === 'black';
  }

  static lighten(color: string): string {
    return Brush.lightenBy(color, 0.2);
  }

  static lightenBy(color: string, fraction = 0.2, _mode: ColorSpace = ColorSpace.Lab): string {
    return mixTowards(color, [255, 255, 255], fraction);
  }

  static darken(color: string): string {
    return Brush.darkenBy(color, 0.2);
  }

  static darkenBy(color: string, fraction = 0.2, _mode: ColorSpace = ColorSpace.Lab): string {
    return mixTowards(color, [0, 0, 0], fraction);
  }

  static mix(color1: string, color2: string, fraction = 0.5): string {
    const [r1, g1, b1] = parseColor(color1);
    const [r2, g2, b2] = parseColor(color2);
    return rgbToCss(lerp(r1, r2, fraction), lerp(g1, g2, fraction), lerp(b1, b2, fraction));
  }

  static isDark(color: BrushLike): boolean {
    if (color === null) return false;
    const solid = color instanceof Brush ? color.color : color;
    const [r, g, b] = parseColor(solid);
    // Perceived luminance (ITU-R BT.601).
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128;
  }
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function mixTowards(color: string, target: [number, number, number], fraction: number): string {
  const [r, g, b] = parseColor(color);
  return rgbToCss(
    lerp(r, target[0], fraction),
    lerp(g, target[1], fraction),
    lerp(b, target[2], fraction),
  );
}

function rgbToCss(r: number, g: number, b: number): string {
  const clamp = (n: number): number => Math.max(0, Math.min(255, n));
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}

/** Parse a CSS color string into `[r, g, b]` (0-255 each). Supports hex and rgb()/rgba(). */
function parseColor(color: string): [number, number, number] {
  const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1] as string;
    if (h.length === 3)
      h = h
        .split('')
        .map((c) => c + c)
        .join('');
    return [
      Number.parseInt(h.slice(0, 2), 16),
      Number.parseInt(h.slice(2, 4), 16),
      Number.parseInt(h.slice(4, 6), 16),
    ];
  }
  const rgb = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (rgb) {
    return [
      Number.parseFloat(rgb[1] as string),
      Number.parseFloat(rgb[2] as string),
      Number.parseFloat(rgb[3] as string),
    ];
  }
  const named = NAMED_COLORS[color.trim().toLowerCase()];
  if (named) return named;
  return [0, 0, 0];
}

const NAMED_COLORS: Record<string, [number, number, number]> = {
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
};

let probeCtx: CanvasRenderingContext2D | null | undefined;

function getProbeCtx(): CanvasRenderingContext2D | null {
  if (probeCtx !== undefined) return probeCtx;
  try {
    probeCtx = document.createElement('canvas').getContext('2d');
  } catch {
    probeCtx = null;
  }
  return probeCtx;
}
