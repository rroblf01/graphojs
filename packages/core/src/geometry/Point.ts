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

  /** GoJS-compatible: Parse a string like "100, 200" or "100 200". */
  static parse(value: string): Point {
    const nums = value
      .split(/[,\s]+/)
      .map(Number)
      .filter((n) => Number.isFinite(n));
    return new Point(nums[0] ?? 0, nums[1] ?? 0);
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

  /** GoJS-compatible: Return a copy of this point. */
  copy(): Point {
    return new Point(this.x, this.y);
  }

  /** GoJS-compatible: Return a new point offset by (dx, dy). */
  offset(dx: number, dy: number): Point {
    return new Point(this.x + dx, this.y + dy);
  }

  /** GoJS-compatible: The squared distance to another point. */
  distanceSquared(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return dx * dx + dy * dy;
  }

  /** GoJS-compatible: The distance to another point. */
  distance(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /** GoJS-compatible: Component-wise multiply (x*p.x, y*p.y). */
  multiply(other: Point): Point {
    return new Point(this.x * other.x, this.y * other.y);
  }

  /** GoJS-compatible: Whether either coordinate is NaN. */
  isNaN(): boolean {
    return Number.isNaN(this.x) || Number.isNaN(this.y);
  }

  /** GoJS-compatible: Create a point on a circle of the given radius at the given angle (radians). */
  static polar(length: number, angle: number): Point {
    return new Point(length * Math.cos(angle), length * Math.sin(angle));
  }

  /** GoJS-compatible: Create a random point with coordinates in [0, 1). */
  static random(): Point {
    return new Point(Math.random(), Math.random());
  }

  /** GoJS-compatible: The cross product with another point (x1*y2 - y1*x2). */
  cross(other: Point): number {
    return this.x * other.y - this.y * other.x;
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
