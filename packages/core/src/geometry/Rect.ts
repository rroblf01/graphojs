import type { Point } from './Point.ts';
import type { Size } from './Size.ts';

/**
 * A 2D rectangle defined by position (x, y) and size (width, height).
 */
export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /** Create a Rect from position and size. */
  static fromPosAndSize(pos: Point, size: Size): Rect {
    return new Rect(pos.x, pos.y, size.width, size.height);
  }

  /** Create a Rect from two corner points. */
  static fromCorners(a: Point, b: Point): Rect {
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    const width = Math.abs(b.x - a.x);
    const height = Math.abs(b.y - a.y);
    return new Rect(x, y, width, height);
  }

  /** Create a zero rect at origin. */
  static zero(): Rect {
    return new Rect(0, 0, 0, 0);
  }

  /** GoJS-compatible: Parse a string like "x, y, w, h" or "x y w h". */
  static parse(value: string): Rect {
    const nums = value
      .split(/[,\s]+/)
      .map(Number)
      .filter((n) => Number.isFinite(n));
    return new Rect(nums[0] ?? 0, nums[1] ?? 0, nums[2] ?? 0, nums[3] ?? 0);
  }

  /** Check if this rect equals another rect. */
  equals(other: Rect): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.width === other.width &&
      this.height === other.height
    );
  }

  /** Check if this rect is approximately equal to another within a tolerance. */
  equalsApprox(other: Rect, tolerance: number = 0.0001): boolean {
    return (
      Math.abs(this.x - other.x) <= tolerance &&
      Math.abs(this.y - other.y) <= tolerance &&
      Math.abs(this.width - other.width) <= tolerance &&
      Math.abs(this.height - other.height) <= tolerance
    );
  }

  /** Return a copy of this rect. */
  clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  /** Get the top-left corner. */
  get topLeft(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  /** Get the top-right corner. */
  get topRight(): { x: number; y: number } {
    return { x: this.x + this.width, y: this.y };
  }

  /** Get the bottom-left corner. */
  get bottomLeft(): { x: number; y: number } {
    return { x: this.x, y: this.y + this.height };
  }

  /** Get the bottom-right corner. */
  get bottomRight(): { x: number; y: number } {
    return { x: this.x + this.width, y: this.y + this.height };
  }

  /** Get the center point. */
  get center(): { x: number; y: number } {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  }

  /** Get the left edge x coordinate. */
  get left(): number {
    return this.x;
  }

  /** Get the right edge x coordinate. */
  get right(): number {
    return this.x + this.width;
  }

  /** Get the top edge y coordinate. */
  get top(): number {
    return this.y;
  }

  /** Get the bottom edge y coordinate. */
  get bottom(): number {
    return this.y + this.height;
  }

  /** Get the area. */
  area(): number {
    return this.width * this.height;
  }

  /** Get the perimeter. */
  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  /** Check if this rect is empty (zero width or height). */
  isEmpty(): boolean {
    return this.width === 0 || this.height === 0;
  }

  /** Check if this rect contains a point. */
  containsPoint(point: { x: number; y: number }): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  /** Check if this rect contains another rect. */
  containsRect(other: Rect): boolean {
    return (
      other.x >= this.x &&
      other.y >= this.y &&
      other.x + other.width <= this.x + this.width &&
      other.y + other.height <= this.y + this.height
    );
  }

  /** Check if this rect intersects another rect. */
  intersects(other: Rect): boolean {
    return !(
      other.x > this.x + this.width ||
      other.x + other.width < this.x ||
      other.y > this.y + this.height ||
      other.y + other.height < this.y
    );
  }

  /** Get the intersection of this rect with another rect. */
  intersection(other: Rect): Rect | null {
    const x = Math.max(this.x, other.x);
    const y = Math.max(this.y, other.y);
    const right = Math.min(this.x + this.width, other.x + other.width);
    const bottom = Math.min(this.y + this.height, other.y + other.height);

    if (right < x || bottom < y) return null;

    return new Rect(x, y, right - x, bottom - y);
  }

  /** Get the smallest rect that contains both rects. */
  union(other: Rect): Rect {
    const x = Math.min(this.x, other.x);
    const y = Math.min(this.y, other.y);
    const right = Math.max(this.x + this.width, other.x + other.width);
    const bottom = Math.max(this.y + this.height, other.y + other.height);
    return new Rect(x, y, right - x, bottom - y);
  }

  /** Expand this rect by the given margin on all sides. */
  inflate(dx: number, dy?: number): Rect {
    const dyVal = dy ?? dx;
    return new Rect(this.x - dx, this.y - dyVal, this.width + 2 * dx, this.height + 2 * dyVal);
  }

  /** Shrink this rect by the given margin on all sides. */
  deflate(dx: number, dy?: number): Rect {
    return this.inflate(-dx, -(dy ?? dx));
  }

  /** Offset this rect by the given amounts. */
  offset(dx: number, dy: number): Rect {
    return new Rect(this.x + dx, this.y + dy, this.width, this.height);
  }

  /** Convert to a plain object. */
  toJSON(): { x: number; y: number; width: number; height: number } {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }

  /** Create a Rect from a JSON string or object. */
  static fromJSON(data: string | { x: number; y: number; width: number; height: number }): Rect {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;
    return new Rect(obj.x, obj.y, obj.width, obj.height);
  }

  toString(): string {
    return `(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
  }
}
