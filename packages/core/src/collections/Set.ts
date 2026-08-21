import { ArraySnapshotIterator, type Iterator } from './Iterator.ts';
import { List } from './List.ts';

/**
 * GoJS-compatible: an unordered collection of unique values, mirroring
 * `go.Set`. Named `Set` to match GoJS's exact API — import it aliased
 * (e.g. `import { Set as GoSet } from 'graphojs'`) to avoid shadowing the
 * native `Set` in the same scope.
 */
// biome-ignore lint/suspicious/noShadowRestrictedNames: GoJS names this class "Set"
export class Set<T> {
  private native: globalThis.Set<T>;

  constructor(coll?: Iterable<T>) {
    this.native = new globalThis.Set(coll);
  }

  values(): IterableIterator<T> {
    return this.native.values();
  }

  toString(): string {
    return `Set/${this.native.size}[${Array.from(this.native).join(',')}]`;
  }

  add(val: T): this {
    this.native.add(val);
    return this;
  }

  addAll(coll: Iterable<T>): this {
    for (const v of coll) this.native.add(v);
    return this;
  }

  has(val: T): boolean {
    return this.native.has(val);
  }

  contains(val: T): boolean {
    return this.native.has(val);
  }

  containsAll(coll: Iterable<T>): boolean {
    for (const v of coll) {
      if (!this.native.has(v)) return false;
    }
    return true;
  }

  containsAny(coll: Iterable<T>): boolean {
    for (const v of coll) {
      if (this.native.has(v)) return true;
    }
    return false;
  }

  first(): T | null {
    for (const v of this.native) return v;
    return null;
  }

  any(pred: (a: T) => boolean): boolean {
    for (const v of this.native) {
      if (pred(v)) return true;
    }
    return false;
  }

  all(pred: (a: T) => boolean): boolean {
    for (const v of this.native) {
      if (!pred(v)) return false;
    }
    return true;
  }

  each(func: (a: T) => void): this {
    for (const v of this.native) func(v);
    return this;
  }

  map<S>(func: (a: T) => S): Set<S> {
    return new Set(Array.from(this.native, func));
  }

  filter(pred: (a: T) => boolean): Set<T> {
    return new Set(Array.from(this.native).filter(pred));
  }

  delete(val: T): boolean {
    return this.native.delete(val);
  }

  remove(val: T): boolean {
    return this.native.delete(val);
  }

  removeAll(coll: Iterable<T>): this {
    for (const v of coll) this.native.delete(v);
    return this;
  }

  retainAll(coll: Iterable<T>): this {
    const keep = new globalThis.Set(coll);
    for (const v of this.native) {
      if (!keep.has(v)) this.native.delete(v);
    }
    return this;
  }

  clear(): void {
    this.native.clear();
  }

  copy(): Set<T> {
    return new Set(this.native);
  }

  toArray(): T[] {
    return Array.from(this.native);
  }

  toList(): List<T> {
    return new List(this.native);
  }

  get count(): number {
    return this.native.size;
  }

  get size(): number {
    return this.native.size;
  }

  get iterator(): Iterator<T> {
    return new ArraySnapshotIterator(Array.from(this.native));
  }

  entries(): IterableIterator<[T, T]> {
    return this.native.entries();
  }

  keys(): IterableIterator<T> {
    return this.native.keys();
  }

  forEach(callbackFunc: (value1: T, value2: T, set: Set<T>) => void): void {
    for (const v of this.native) callbackFunc(v, v, this);
  }

  [Symbol.iterator](): globalThis.Iterator<T> {
    return this.native[Symbol.iterator]();
  }
}
