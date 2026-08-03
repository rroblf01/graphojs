/**
 * A 2D point with x and y coordinates.
 */
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /** Create a Point from an object with x and y properties. */
  static from(obj: { x: number; y: number }): Point {
    return new Point(obj.x, obj.y);
  }

  /** Create a zero point (0, 0). */
  static zero(): Point {
    return new Point(0, 0);
  }

  /** Create a point where x === y. */
  static of(value: number): Point {
    return new Point(value, value);
  }

  /** Check if this point equals another point. */
  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /** Check if this point is approximately equal to another within a tolerance. */
  equalsApprox(other: Point, tolerance: number = 0.0001): boolean {
    return Math.abs(this.x - other.x) <= tolerance && Math.abs(this.y - other.y) <= tolerance;
  }

  /** Return a copy of this point. */
  clone(): Point {
    return new Point(this.x, this.y);
  }

  /** Add another point to this point. */
  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  /** Subtract another point from this point. */
  subtract(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }

  /** Scale this point by a factor. */
  scale(factor: number): Point {
    return new Point(this.x * factor, this.y * factor);
  }

  /** Calculate the distance to another point. */
  distanceTo(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /** Calculate the squared distance to another point (faster, no sqrt). */
  distanceSquaredTo(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return dx * dx + dy * dy;
  }

  /** Calculate the length (magnitude) of this point as a vector. */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** Calculate the squared length of this point as a vector. */
  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /** Normalize this point to unit length. */
  normalize(): Point {
    const len = this.length();
    if (len === 0) return Point.zero();
    return new Point(this.x / len, this.y / len);
  }

  /** Calculate the dot product with another point. */
  dot(other: Point): number {
    return this.x * other.x + this.y * other.y;
  }

  /** Calculate the angle in radians from the positive x-axis. */
  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /** Rotate this point around the origin by the given angle in radians. */
  rotate(angle: number): Point {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Point(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /** Check if this point is finite. */
  isFinite(): boolean {
    return Number.isFinite(this.x) && Number.isFinite(this.y);
  }

  /** Check if this point is the zero point. */
  isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /** Convert to a plain object. */
  toJSON(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  /** Create a Point from a JSON string or object. */
  static fromJSON(data: string | { x: number; y: number }): Point {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;
    return new Point(obj.x, obj.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
