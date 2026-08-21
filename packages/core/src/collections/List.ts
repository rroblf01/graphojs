import { ArraySnapshotIterator, type Iterator } from './Iterator.ts';
import { Set as GoSet } from './Set.ts';

/**
 * GoJS-compatible: an ordered collection, mirroring `go.List`. graphojs's
 * own internals use plain arrays; this class exists as a public utility for
 * code ported from GoJS that constructs `new go.List<T>()` directly.
 */
export class List<T> {
  private items: T[];

  constructor(coll?: Iterable<T>) {
    this.items = coll ? Array.from(coll) : [];
  }

  [Symbol.iterator](): globalThis.Iterator<T> {
    return this.items[Symbol.iterator]();
  }

  toString(): string {
    return `List/${this.items.length}[${this.items.join(',')}]`;
  }

  add(val: T): this {
    this.items.push(val);
    return this;
  }

  push(val: T): void {
    this.items.push(val);
  }

  addAll(coll: Iterable<T>): this {
    this.items.push(...coll);
    return this;
  }

  clear(): void {
    this.items.length = 0;
  }

  contains(val: T): boolean {
    return this.items.includes(val);
  }

  has(val: T): boolean {
    return this.items.includes(val);
  }

  indexOf(val: T): number {
    return this.items.indexOf(val);
  }

  elt(i: number): T {
    return this.items[i] as T;
  }

  get(i: number): T {
    return this.items[i] as T;
  }

  setElt(i: number, val: T): void {
    this.items[i] = val;
  }

  set(i: number, val: T): void {
    this.items[i] = val;
  }

  first(): T | null {
    return this.items.length > 0 ? (this.items[0] as T) : null;
  }

  last(): T | null {
    return this.items.length > 0 ? (this.items[this.items.length - 1] as T) : null;
  }

  pop(): T | null {
    return this.items.length > 0 ? (this.items.pop() as T) : null;
  }

  any(pred: (a: T) => boolean): boolean {
    return this.items.some(pred);
  }

  all(pred: (a: T) => boolean): boolean {
    return this.items.every(pred);
  }

  each(func: (a: T) => void): this {
    for (const item of this.items) func(item);
    return this;
  }

  map<S>(func: (a: T) => S): List<S> {
    return new List(this.items.map(func));
  }

  filter(pred: (a: T) => boolean): List<T> {
    return new List(this.items.filter(pred));
  }

  insertAt(i: number, val: T): void {
    this.items.splice(i, 0, val);
  }

  remove(val: T): boolean {
    const i = this.items.indexOf(val);
    if (i < 0) return false;
    this.items.splice(i, 1);
    return true;
  }

  delete(val: T): boolean {
    return this.remove(val);
  }

  removeAt(i: number): void {
    this.items.splice(i, 1);
  }

  removeRange(from: number, to: number): this {
    this.items.splice(from, to - from + 1);
    return this;
  }

  copy(): List<T> {
    return new List(this.items);
  }

  toArray(): T[] {
    return this.items.slice();
  }

  toSet(): GoSet<T> {
    return new GoSet(this.items);
  }

  sort(sortfunc: (a: T, b: T) => number): this {
    this.items.sort(sortfunc);
    return this;
  }

  sortRange(sortfunc: (a: T, b: T) => number, from = 0, to = this.items.length - 1): this {
    const slice = this.items.slice(from, to + 1).sort(sortfunc);
    this.items.splice(from, slice.length, ...slice);
    return this;
  }

  reverse(): this {
    this.items.reverse();
    return this;
  }

  get count(): number {
    return this.items.length;
  }

  get size(): number {
    return this.items.length;
  }

  get length(): number {
    return this.items.length;
  }

  get iterator(): Iterator<T> {
    return new ArraySnapshotIterator(this.items);
  }

  get iteratorBackwards(): Iterator<T> {
    return new ArraySnapshotIterator(this.items.slice().reverse());
  }
}
