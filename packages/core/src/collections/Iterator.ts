/**
 * GoJS-compatible: an iterator over a {@link List}/{@link Set}/{@link Map}.
 * Call `next()` before reading `value`/`key`, per GoJS's iteration protocol
 * (distinct from the native ECMAScript iterator protocol).
 */
export interface Iterator<T> {
  readonly iterator: Iterator<T>;
  next(): boolean;
  hasNext(): boolean;
  first(): T | null;
  reset(): void;
  any(pred: (x: T) => boolean): boolean;
  all(pred: (x: T) => boolean): boolean;
  each(func: (x: T) => void): void;
  map<S>(func: (x: T) => S): Iterator<S>;
  filter(pred: (x: T) => boolean): Iterator<T>;
  readonly value: T;
  readonly key: unknown;
  [Symbol.iterator](): globalThis.Iterator<T>;
}

/** A simple array-snapshot-backed {@link Iterator}, shared by List and Set. */
export class ArraySnapshotIterator<T> implements Iterator<T> {
  private items: T[];
  private index = -1;

  constructor(items: readonly T[]) {
    this.items = items.slice();
  }

  get iterator(): Iterator<T> {
    return this;
  }

  next(): boolean {
    this.index++;
    return this.index < this.items.length;
  }

  hasNext(): boolean {
    return this.index + 1 < this.items.length;
  }

  first(): T | null {
    this.reset();
    return this.next() ? this.value : null;
  }

  reset(): void {
    this.index = -1;
  }

  any(pred: (x: T) => boolean): boolean {
    this.reset();
    while (this.next()) {
      if (pred(this.value)) return true;
    }
    return false;
  }

  all(pred: (x: T) => boolean): boolean {
    this.reset();
    while (this.next()) {
      if (!pred(this.value)) return false;
    }
    return true;
  }

  each(func: (x: T) => void): void {
    this.reset();
    while (this.next()) func(this.value);
  }

  map<S>(func: (x: T) => S): Iterator<S> {
    return new ArraySnapshotIterator(this.items.map(func));
  }

  filter(pred: (x: T) => boolean): Iterator<T> {
    return new ArraySnapshotIterator(this.items.filter(pred));
  }

  get value(): T {
    return this.items[this.index] as T;
  }

  get key(): unknown {
    return this.index;
  }

  [Symbol.iterator](): globalThis.Iterator<T> {
    return this.items[Symbol.iterator]();
  }
}
