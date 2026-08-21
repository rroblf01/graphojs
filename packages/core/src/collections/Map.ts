import { ArraySnapshotIterator, type Iterator } from './Iterator.ts';
import { Set as GoSet } from './Set.ts';

/** GoJS-compatible: a key/value pair, as returned by {@link Map} iteration. */
export interface IKeyValuePair<K, V> {
  key: K;
  value: V;
}

/**
 * GoJS-compatible: a key/value collection, mirroring `go.Map`. Named `Map`
 * to match GoJS's exact API — import it aliased (e.g.
 * `import { Map as GoMap } from 'graphojs'`) to avoid shadowing the native
 * `Map` in the same scope.
 */
// biome-ignore lint/suspicious/noShadowRestrictedNames: GoJS names this class "Map"
export class Map<K, V> {
  private native: globalThis.Map<K, V>;

  constructor(coll?: Iterable<IKeyValuePair<K, V>> | Iterable<readonly [K, V]>) {
    this.native = new globalThis.Map();
    if (coll) this.addAll(coll);
  }

  entries(): IterableIterator<[K, V]> {
    return this.native.entries();
  }

  toString(): string {
    return `Map/${this.native.size}`;
  }

  set(key: K, val: V): this {
    this.native.set(key, val);
    return this;
  }

  add(key: K, val: V): this {
    this.native.set(key, val);
    return this;
  }

  addAll(coll: Iterable<IKeyValuePair<K, V>> | Iterable<readonly [K, V]>): this {
    for (const entry of coll) {
      if (Array.isArray(entry)) {
        this.native.set(entry[0], entry[1]);
      } else {
        const pair = entry as IKeyValuePair<K, V>;
        this.native.set(pair.key, pair.value);
      }
    }
    return this;
  }

  first(): IKeyValuePair<K, V> | null {
    for (const [key, value] of this.native) return { key, value };
    return null;
  }

  any(pred: (a: IKeyValuePair<K, V>) => boolean): boolean {
    for (const [key, value] of this.native) {
      if (pred({ key, value })) return true;
    }
    return false;
  }

  all(pred: (a: IKeyValuePair<K, V>) => boolean): boolean {
    for (const [key, value] of this.native) {
      if (!pred({ key, value })) return false;
    }
    return true;
  }

  each(func: (a: IKeyValuePair<K, V>) => void): this {
    for (const [key, value] of this.native) func({ key, value });
    return this;
  }

  map<S>(func: (a: IKeyValuePair<K, V>) => S): Map<K, S> {
    const result = new Map<K, S>();
    for (const [key, value] of this.native) result.set(key, func({ key, value }));
    return result;
  }

  filter(pred: (a: IKeyValuePair<K, V>) => boolean): Map<K, V> {
    const result = new Map<K, V>();
    for (const [key, value] of this.native) {
      if (pred({ key, value })) result.set(key, value);
    }
    return result;
  }

  has(key: K): boolean {
    return this.native.has(key);
  }

  contains(key: K): boolean {
    return this.native.has(key);
  }

  get(key: K): V | null {
    return this.native.has(key) ? (this.native.get(key) as V) : null;
  }

  getValue(key: K): V | null {
    return this.get(key);
  }

  delete(key: K): boolean {
    return this.native.delete(key);
  }

  remove(key: K): boolean {
    return this.native.delete(key);
  }

  clear(): void {
    this.native.clear();
  }

  copy(): Map<K, V> {
    return new Map(this.native.entries());
  }

  toArray(): IKeyValuePair<K, V>[] {
    return Array.from(this.native, ([key, value]) => ({ key, value }));
  }

  toKeySet(): GoSet<K> {
    return new GoSet(this.native.keys());
  }

  get count(): number {
    return this.native.size;
  }

  get size(): number {
    return this.native.size;
  }

  get iterator(): Iterator<IKeyValuePair<K, V>> {
    return new ArraySnapshotIterator(this.toArray());
  }

  get iteratorKeys(): Iterator<K> {
    return new ArraySnapshotIterator(Array.from(this.native.keys()));
  }

  keys(): IterableIterator<K> {
    return this.native.keys();
  }

  get iteratorValues(): Iterator<V> {
    return new ArraySnapshotIterator(Array.from(this.native.values()));
  }

  values(): IterableIterator<V> {
    return this.native.values();
  }

  forEach(callbackFunc: (value: V, key: K, map: Map<K, V>) => void): void {
    for (const [key, value] of this.native) callbackFunc(value, key, this);
  }

  [Symbol.iterator](): globalThis.Iterator<[K, V]> {
    return this.native[Symbol.iterator]();
  }
}
