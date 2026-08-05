/**
 * A 2D size with width and height.
 */
export class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /** Create a Size from an object with width and height properties. */
  static from(obj: { width: number; height: number }): Size {
    return new Size(obj.width, obj.height);
  }

  /** Create a zero size (0, 0). */
  static zero(): Size {
    return new Size(0, 0);
  }

  /** Create a square size where width === height. */
  static of(value: number): Size {
    return new Size(value, value);
  }

  /** GoJS-compatible: Parse a string like "100, 200" or "100 200". */
  static parse(value: string): Size {
    const nums = value
      .split(/[,\s]+/)
      .map(Number)
      .filter((n) => Number.isFinite(n));
    return new Size(nums[0] ?? 0, nums[1] ?? 0);
  }

  /** Check if this size equals another size. */
  equals(other: Size): boolean {
    return this.width === other.width && this.height === other.height;
  }

  /** Check if this size is approximately equal to another within a tolerance. */
  equalsApprox(other: Size, tolerance: number = 0.0001): boolean {
    return (
      Math.abs(this.width - other.width) <= tolerance &&
      Math.abs(this.height - other.height) <= tolerance
    );
  }

  /** Return a copy of this size. */
  clone(): Size {
    return new Size(this.width, this.height);
  }

  /** GoJS-compatible: Return a copy of this size. */
  copy(): Size {
    return new Size(this.width, this.height);
  }

  /** Scale this size by a factor. */
  scale(factor: number): Size {
    return new Size(this.width * factor, this.height * factor);
  }

  /** Check if this size is valid (non-negative). */
  isValid(): boolean {
    return this.width >= 0 && this.height >= 0;
  }

  /** Check if this size is the zero size. */
  isZero(): boolean {
    return this.width === 0 && this.height === 0;
  }

  /** Check if this size is empty (width or height is 0). */
  isEmpty(): boolean {
    return this.width === 0 || this.height === 0;
  }

  /** Check if this size is a square. */
  isSquare(): boolean {
    return this.width === this.height;
  }

  /** Get the area of this size. */
  area(): number {
    return this.width * this.height;
  }

  /** Get the perimeter of this size. */
  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  /** Get the aspect ratio (width / height). Returns Infinity if height is 0. */
  aspectRatio(): number {
    if (this.height === 0) return Infinity;
    return this.width / this.height;
  }

  /** Check if this size contains another size. */
  contains(other: Size): boolean {
    return this.width >= other.width && this.height >= other.height;
  }

  /** Get the minimum size that contains both sizes. */
  union(other: Size): Size {
    return new Size(Math.max(this.width, other.width), Math.max(this.height, other.height));
  }

  /** Get the maximum size that fits within both sizes. */
  intersection(other: Size): Size {
    return new Size(Math.min(this.width, other.width), Math.min(this.height, other.height));
  }

  /** Convert to a plain object. */
  toJSON(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  /** Create a Size from a JSON string or object. */
  static fromJSON(data: string | { width: number; height: number }): Size {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;
    return new Size(obj.width, obj.height);
  }

  toString(): string {
    return `(${this.width}, ${this.height})`;
  }
}
