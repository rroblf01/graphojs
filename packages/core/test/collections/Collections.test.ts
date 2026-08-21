import { describe, expect, it } from 'vitest';
import { List } from '../../src/collections/List.ts';
import { Map as GoMap } from '../../src/collections/Map.ts';
import { Set as GoSet } from '../../src/collections/Set.ts';

describe('List', () => {
  it('constructs from an iterable and supports basic access', () => {
    const list = new List([1, 2, 3]);
    expect(list.count).toBe(3);
    expect(list.size).toBe(3);
    expect(list.length).toBe(3);
    expect(list.elt(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.first()).toBe(1);
    expect(list.last()).toBe(3);
  });

  it('add/push/addAll/remove/delete/removeAt', () => {
    const list = new List<number>();
    list.add(1);
    list.push(2);
    list.addAll([3, 4]);
    expect(list.toArray()).toEqual([1, 2, 3, 4]);

    expect(list.remove(2)).toBe(true);
    expect(list.remove(99)).toBe(false);
    expect(list.toArray()).toEqual([1, 3, 4]);

    list.removeAt(0);
    expect(list.toArray()).toEqual([3, 4]);
  });

  it('contains/has/indexOf', () => {
    const list = new List(['a', 'b', 'c']);
    expect(list.contains('b')).toBe(true);
    expect(list.has('z')).toBe(false);
    expect(list.indexOf('c')).toBe(2);
  });

  it('any/all/each/map/filter', () => {
    const list = new List([1, 2, 3, 4]);
    expect(list.any((n) => n > 3)).toBe(true);
    expect(list.all((n) => n > 0)).toBe(true);
    const seen: number[] = [];
    list.each((n) => seen.push(n));
    expect(seen).toEqual([1, 2, 3, 4]);
    expect(list.map((n) => n * 2).toArray()).toEqual([2, 4, 6, 8]);
    expect(list.filter((n) => n % 2 === 0).toArray()).toEqual([2, 4]);
  });

  it('insertAt/setElt/set/pop/clear', () => {
    const list = new List([1, 2, 3]);
    list.insertAt(1, 99);
    expect(list.toArray()).toEqual([1, 99, 2, 3]);
    list.set(0, -1);
    expect(list.elt(0)).toBe(-1);
    expect(list.pop()).toBe(3);
    list.clear();
    expect(list.count).toBe(0);
    expect(list.pop()).toBeNull();
  });

  it('sort/sortRange/reverse', () => {
    const list = new List([3, 1, 2]);
    list.sort((a, b) => a - b);
    expect(list.toArray()).toEqual([1, 2, 3]);
    list.reverse();
    expect(list.toArray()).toEqual([3, 2, 1]);
  });

  it('copy/toArray/toSet are independent snapshots', () => {
    const list = new List([1, 2, 2, 3]);
    const copy = list.copy();
    copy.add(4);
    expect(list.count).toBe(4);
    expect(copy.count).toBe(5);

    const set = list.toSet();
    expect(set.count).toBe(3);
  });

  it('the iterator follows next()/value/reset() protocol', () => {
    const list = new List([10, 20, 30]);
    const it = list.iterator;
    const seen: number[] = [];
    while (it.next()) seen.push(it.value);
    expect(seen).toEqual([10, 20, 30]);
    it.reset();
    expect(it.next()).toBe(true);
    expect(it.value).toBe(10);
  });

  it('iteratorBackwards yields items in reverse without mutating the list', () => {
    const list = new List([1, 2, 3]);
    const seen: number[] = [];
    const it = list.iteratorBackwards;
    while (it.next()) seen.push(it.value);
    expect(seen).toEqual([3, 2, 1]);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  it('supports for...of via Symbol.iterator', () => {
    const list = new List([1, 2, 3]);
    const seen: number[] = [];
    for (const n of list) seen.push(n);
    expect(seen).toEqual([1, 2, 3]);
  });
});

describe('Set (GoJS-compatible, aliased to avoid shadowing the native Set)', () => {
  it('deduplicates on construction and add', () => {
    const set = new GoSet([1, 2, 2, 3]);
    expect(set.count).toBe(3);
    set.add(3);
    expect(set.count).toBe(3);
    set.add(4);
    expect(set.count).toBe(4);
  });

  it('has/contains/containsAll/containsAny', () => {
    const set = new GoSet([1, 2, 3]);
    expect(set.has(2)).toBe(true);
    expect(set.contains(9)).toBe(false);
    expect(set.containsAll([1, 2])).toBe(true);
    expect(set.containsAll([1, 9])).toBe(false);
    expect(set.containsAny([9, 2])).toBe(true);
  });

  it('remove/delete/removeAll/retainAll', () => {
    const set = new GoSet([1, 2, 3, 4]);
    expect(set.remove(1)).toBe(true);
    expect(set.delete(99)).toBe(false);
    set.removeAll([2, 3]);
    expect(set.toArray()).toEqual([4]);

    const set2 = new GoSet([1, 2, 3, 4]);
    set2.retainAll([2, 4]);
    expect(set2.toArray().sort()).toEqual([2, 4]);
  });

  it('map/filter/toList/toArray/copy', () => {
    const set = new GoSet([1, 2, 3]);
    expect(
      set
        .map((n) => n * 10)
        .toArray()
        .sort(),
    ).toEqual([10, 20, 30]);
    expect(
      set
        .filter((n) => n > 1)
        .toArray()
        .sort(),
    ).toEqual([2, 3]);
    expect(set.toList().count).toBe(3);
    const copy = set.copy();
    copy.add(99);
    expect(set.count).toBe(3);
    expect(copy.count).toBe(4);
  });

  it('supports for...of via Symbol.iterator', () => {
    const set = new GoSet([1, 2, 3]);
    expect([...set].sort()).toEqual([1, 2, 3]);
  });
});

describe('Map (GoJS-compatible, aliased to avoid shadowing the native Map)', () => {
  it('set/get/has/contains', () => {
    const map = new GoMap<string, number>();
    map.set('a', 1).set('b', 2);
    expect(map.get('a')).toBe(1);
    expect(map.get('z')).toBeNull();
    expect(map.has('b')).toBe(true);
    expect(map.contains('z')).toBe(false);
  });

  it('constructs from key/value pairs and from native [k,v] tuples', () => {
    const fromPairs = new GoMap<string, number>([{ key: 'a', value: 1 }]);
    expect(fromPairs.get('a')).toBe(1);

    const fromTuples = new GoMap<string, number>([['b', 2]]);
    expect(fromTuples.get('b')).toBe(2);
  });

  it('delete/remove/clear/count', () => {
    const map = new GoMap<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(map.count).toBe(2);
    expect(map.delete('a')).toBe(true);
    expect(map.remove('z')).toBe(false);
    expect(map.count).toBe(1);
    map.clear();
    expect(map.count).toBe(0);
  });

  it('each/map/filter/toArray operate on key/value pairs', () => {
    const map = new GoMap<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    const pairs: string[] = [];
    map.each(({ key, value }) => pairs.push(`${key}=${value}`));
    expect(pairs.sort()).toEqual(['a=1', 'b=2']);

    const doubled = map.map(({ value }) => value * 2);
    expect(doubled.get('a')).toBe(2);

    const filtered = map.filter(({ value }) => value > 1);
    expect(filtered.has('a')).toBe(false);
    expect(filtered.has('b')).toBe(true);
  });

  it('toKeySet/keys/values', () => {
    const map = new GoMap<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(map.toKeySet().toArray().sort()).toEqual(['a', 'b']);
    expect([...map.keys()].sort()).toEqual(['a', 'b']);
    expect([...map.values()].sort()).toEqual([1, 2]);
  });

  it('the iterator follows next()/value protocol over key/value pairs', () => {
    const map = new GoMap<string, number>([['a', 1]]);
    const it = map.iterator;
    expect(it.next()).toBe(true);
    expect(it.value).toEqual({ key: 'a', value: 1 });
  });
});
