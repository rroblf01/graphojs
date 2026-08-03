/**
 * A margin with top, right, bottom, and left values.
 */
export class Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(top: number, right: number, bottom: number, left: number) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  /** Create a Margin with the same value on all sides. */
  static uniform(value: number): Margin {
    return new Margin(value, value, value, value);
  }

  /** Create a Margin with vertical and horizontal values. */
  static symmetric(vertical: number, horizontal: number): Margin {
    return new Margin(vertical, horizontal, vertical, horizontal);
  }

  /** Create a zero margin. */
  static zero(): Margin {
    return new Margin(0, 0, 0, 0);
  }

  /** Create a Margin from an object with top, right, bottom, left properties. */
  static from(obj: { top: number; right: number; bottom: number; left: number }): Margin {
    return new Margin(obj.top, obj.right, obj.bottom, obj.left);
  }

  /** Check if this margin equals another margin. */
  equals(other: Margin): boolean {
    return (
      this.top === other.top &&
      this.right === other.right &&
      this.bottom === other.bottom &&
      this.left === other.left
    );
  }

  /** Check if this margin is approximately equal to another within a tolerance. */
  equalsApprox(other: Margin, tolerance: number = 0.0001): boolean {
    return (
      Math.abs(this.top - other.top) <= tolerance &&
      Math.abs(this.right - other.right) <= tolerance &&
      Math.abs(this.bottom - other.bottom) <= tolerance &&
      Math.abs(this.left - other.left) <= tolerance
    );
  }

  /** Return a copy of this margin. */
  clone(): Margin {
    return new Margin(this.top, this.right, this.bottom, this.left);
  }

  /** Get the total horizontal margin (left + right). */
  get horizontal(): number {
    return this.left + this.right;
  }

  /** Get the total vertical margin (top + bottom). */
  get vertical(): number {
    return this.top + this.bottom;
  }

  /** Check if this margin is zero. */
  isZero(): boolean {
    return this.top === 0 && this.right === 0 && this.bottom === 0 && this.left === 0;
  }

  /** Check if this margin is uniform (same value on all sides). */
  isUniform(): boolean {
    return this.top === this.right && this.right === this.bottom && this.bottom === this.left;
  }

  /** Add another margin to this margin. */
  add(other: Margin): Margin {
    return new Margin(
      this.top + other.top,
      this.right + other.right,
      this.bottom + other.bottom,
      this.left + other.left,
    );
  }

  /** Subtract another margin from this margin. */
  subtract(other: Margin): Margin {
    return new Margin(
      this.top - other.top,
      this.right - other.right,
      this.bottom - other.bottom,
      this.left - other.left,
    );
  }

  /** Scale this margin by a factor. */
  scale(factor: number): Margin {
    return new Margin(
      this.top * factor,
      this.right * factor,
      this.bottom * factor,
      this.left * factor,
    );
  }

  /** Convert to a plain object. */
  toJSON(): { top: number; right: number; bottom: number; left: number } {
    return { top: this.top, right: this.right, bottom: this.bottom, left: this.left };
  }

  /** Create a Margin from a JSON string or object. */
  static fromJSON(
    data: string | { top: number; right: number; bottom: number; left: number },
  ): Margin {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;
    return new Margin(obj.top, obj.right, obj.bottom, obj.left);
  }

  toString(): string {
    return `(${this.top}, ${this.right}, ${this.bottom}, ${this.left})`;
  }
}
