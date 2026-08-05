/**
 * A Spot represents an alignment point within a rectangle.
 * Standard spots: TopLeft, TopCenter, TopRight, LeftMiddle, Center,
 * RightMiddle, BottomLeft, BottomCenter, BottomRight.
 * Fractional spots allow any position using x/y in [0,1] plus offsets.
 */
export class Spot {
  /** x as a fraction of the width (0..1). */
  readonly x: number;
  /** y as a fraction of the height (0..1). */
  readonly y: number;
  /** Offset in pixels applied after the fractional position. */
  readonly offsetX: number;
  /** Offset in pixels applied after the fractional position. */
  readonly offsetY: number;

  constructor(x = 0.5, y = 0.5, offsetX = 0, offsetY = 0) {
    this.x = x;
    this.y = y;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  /** Spot at the top-left corner. */
  static readonly TopLeft = new Spot(0, 0);
  /** Spot at the top-center. */
  static readonly TopCenter = new Spot(0.5, 0);
  /** GoJS-compatible: Spot at the top-center. */
  static readonly Top = new Spot(0.5, 0);
  /** Spot at the top-right corner. */
  static readonly TopRight = new Spot(1, 0);
  /** Spot at the middle of the left edge. */
  static readonly LeftMiddle = new Spot(0, 0.5);
  /** GoJS-compatible: Spot at the middle of the left edge. */
  static readonly MiddleLeft = new Spot(0, 0.5);
  /** GoJS-compatible: Spot at the middle of the left edge. */
  static readonly Left = new Spot(0, 0.5);
  /** Spot at the center. */
  static readonly Center = new Spot(0.5, 0.5);
  /** GoJS-compatible: Spot at the center. */
  static readonly MiddleCenter = new Spot(0.5, 0.5);
  /** Spot at the middle of the right edge. */
  static readonly RightMiddle = new Spot(1, 0.5);
  /** GoJS-compatible: Spot at the middle of the right edge. */
  static readonly MiddleRight = new Spot(1, 0.5);
  /** GoJS-compatible: Spot at the middle of the right edge. */
  static readonly Right = new Spot(1, 0.5);
  /** Spot at the bottom-left corner. */
  static readonly BottomLeft = new Spot(0, 1);
  /** Spot at the bottom-center. */
  static readonly BottomCenter = new Spot(0.5, 1);
  /** GoJS-compatible: Spot at the bottom-center. */
  static readonly Bottom = new Spot(0.5, 1);
  /** Spot at the bottom-right corner. */
  static readonly BottomRight = new Spot(1, 1);
  /** GoJS-compatible: A spot with no meaningful position. */
  static readonly None = new Spot(Number.NaN, Number.NaN);

  /** GoJS-compatible: Parse a string like "0,0", "1 1 4 4", or a standard name like "MiddleCenter". */
  static parse(value: string): Spot {
    if (/^[a-zA-Z]+$/.test(value)) {
      return Spot.fromName(value);
    }
    const nums = value
      .split(/[,\s]+/)
      .map(Number)
      .filter((n) => Number.isFinite(n));
    return new Spot(nums[0] ?? 0.5, nums[1] ?? 0.5, nums[2] ?? 0, nums[3] ?? 0);
  }

  /** GoJS-compatible: Whether the given value is a Spot object. */
  static isSpot(value: unknown): boolean {
    return value instanceof Spot;
  }

  /** GoJS-compatible: Whether this spot has valid fractional coordinates. */
  isSpot(): boolean {
    return (
      Number.isFinite(this.x) &&
      Number.isFinite(this.y) &&
      this.x >= 0 &&
      this.x <= 1 &&
      this.y >= 0 &&
      this.y <= 1
    );
  }

  /** GoJS-compatible: In-place mutation returning this spot. */
  setSpot(x: number, y: number, offsetX = 0, offsetY = 0): this {
    (this as { x: number }).x = x;
    (this as { y: number }).y = y;
    (this as { offsetX: number }).offsetX = offsetX;
    (this as { offsetY: number }).offsetY = offsetY;
    return this;
  }

  /** GoJS-compatible: Compute the point in the rect for this spot. */
  spotToPoint(x: number, y: number, width: number, height: number): { x: number; y: number } {
    return this.computePoint(x, y, width, height);
  }

  /** GoJS-compatible: Compute the spot (fraction) for a point within a rect. */
  pointToSpot(px: number, py: number, x: number, y: number, width: number, height: number): Spot {
    const fx = width === 0 ? 0 : (px - x) / width;
    const fy = height === 0 ? 0 : (py - y) / height;
    return new Spot(fx, fy);
  }

  /** Create a Spot from a standard name. */
  static fromName(name: string): Spot {
    switch (name) {
      case 'TopLeft':
        return Spot.TopLeft;
      case 'Top':
      case 'TopCenter':
        return Spot.TopCenter;
      case 'TopRight':
        return Spot.TopRight;
      case 'Left':
      case 'MiddleLeft':
      case 'LeftMiddle':
        return Spot.MiddleLeft;
      case 'Center':
      case 'MiddleCenter':
        return Spot.MiddleCenter;
      case 'Right':
      case 'MiddleRight':
      case 'RightMiddle':
        return Spot.MiddleRight;
      case 'BottomLeft':
        return Spot.BottomLeft;
      case 'Bottom':
      case 'BottomCenter':
        return Spot.BottomCenter;
      case 'BottomRight':
        return Spot.BottomRight;
      default:
        return Spot.Center;
    }
  }

  /** Compute the point within a rect for this spot. */
  computePoint(x: number, y: number, width: number, height: number): { x: number; y: number } {
    return {
      x: x + this.x * width + this.offsetX,
      y: y + this.y * height + this.offsetY,
    };
  }

  /** Check if two spots are equivalent. */
  equals(other: Spot): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.offsetX === other.offsetX &&
      this.offsetY === other.offsetY
    );
  }

  /** Return a copy with additional offset. */
  offset(dx: number, dy: number): Spot {
    return new Spot(this.x, this.y, this.offsetX + dx, this.offsetY + dy);
  }

  /** GoJS-compatible: Return a copy of this spot. */
  copy(): Spot {
    return new Spot(this.x, this.y, this.offsetX, this.offsetY);
  }
}
