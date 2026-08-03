import { describe, expect, it } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';

describe('Rect', () => {
  describe('construction', () => {
    it('creates a rect with x, y, width, height', () => {
      const r = new Rect(1, 2, 3, 4);
      expect(r.x).toBe(1);
      expect(r.y).toBe(2);
      expect(r.width).toBe(3);
      expect(r.height).toBe(4);
    });

    it('creates from position and size', () => {
      const r = Rect.fromPosAndSize({ x: 1, y: 2 }, { width: 3, height: 4 });
      expect(r).toEqual(new Rect(1, 2, 3, 4));
    });

    it('creates from two corners', () => {
      const r = Rect.fromCorners({ x: 5, y: 6 }, { x: 1, y: 2 });
      expect(r).toEqual(new Rect(1, 2, 4, 4));
    });

    it('creates a zero rect', () => {
      const r = Rect.zero();
      expect(r).toEqual(new Rect(0, 0, 0, 0));
    });
  });

  describe('properties', () => {
    it('gets corners', () => {
      const r = new Rect(1, 2, 3, 4);
      expect(r.topLeft).toEqual({ x: 1, y: 2 });
      expect(r.topRight).toEqual({ x: 4, y: 2 });
      expect(r.bottomLeft).toEqual({ x: 1, y: 6 });
      expect(r.bottomRight).toEqual({ x: 4, y: 6 });
    });

    it('gets center', () => {
      const r = new Rect(0, 0, 4, 6);
      expect(r.center).toEqual({ x: 2, y: 3 });
    });

    it('gets edges', () => {
      const r = new Rect(1, 2, 3, 4);
      expect(r.left).toBe(1);
      expect(r.right).toBe(4);
      expect(r.top).toBe(2);
      expect(r.bottom).toBe(6);
    });
  });

  describe('operations', () => {
    it('calculates area', () => {
      expect(new Rect(0, 0, 3, 4).area()).toBe(12);
    });

    it('calculates perimeter', () => {
      expect(new Rect(0, 0, 3, 4).perimeter()).toBe(14);
    });

    it('checks containment of point', () => {
      const r = new Rect(0, 0, 10, 10);
      expect(r.containsPoint({ x: 5, y: 5 })).toBe(true);
      expect(r.containsPoint({ x: 0, y: 0 })).toBe(true);
      expect(r.containsPoint({ x: 10, y: 10 })).toBe(true);
      expect(r.containsPoint({ x: 11, y: 5 })).toBe(false);
    });

    it('checks containment of rect', () => {
      const outer = new Rect(0, 0, 10, 10);
      const inner = new Rect(2, 2, 3, 3);
      expect(outer.containsRect(inner)).toBe(true);
      expect(inner.containsRect(outer)).toBe(false);
    });

    it('checks intersection', () => {
      const r1 = new Rect(0, 0, 5, 5);
      const r2 = new Rect(3, 3, 5, 5);
      const r3 = new Rect(10, 10, 5, 5);
      expect(r1.intersects(r2)).toBe(true);
      expect(r1.intersects(r3)).toBe(false);
    });

    it('calculates intersection', () => {
      const r1 = new Rect(0, 0, 5, 5);
      const r2 = new Rect(3, 3, 5, 5);
      expect(r1.intersection(r2)).toEqual(new Rect(3, 3, 2, 2));
    });

    it('returns null for non-intersecting rects', () => {
      const r1 = new Rect(0, 0, 5, 5);
      const r2 = new Rect(10, 10, 5, 5);
      expect(r1.intersection(r2)).toBeNull();
    });

    it('calculates union', () => {
      const r1 = new Rect(0, 0, 5, 5);
      const r2 = new Rect(3, 3, 5, 5);
      expect(r1.union(r2)).toEqual(new Rect(0, 0, 8, 8));
    });

    it('inflates a rect', () => {
      const r = new Rect(5, 5, 10, 10);
      expect(r.inflate(2)).toEqual(new Rect(3, 3, 14, 14));
    });

    it('deflates a rect', () => {
      const r = new Rect(3, 3, 14, 14);
      expect(r.deflate(2)).toEqual(new Rect(5, 5, 10, 10));
    });

    it('offsets a rect', () => {
      const r = new Rect(1, 2, 3, 4);
      expect(r.offset(5, 6)).toEqual(new Rect(6, 8, 3, 4));
    });
  });

  describe('comparison', () => {
    it('checks equality', () => {
      expect(new Rect(1, 2, 3, 4).equals(new Rect(1, 2, 3, 4))).toBe(true);
      expect(new Rect(1, 2, 3, 4).equals(new Rect(1, 2, 3, 5))).toBe(false);
    });

    it('checks approximate equality', () => {
      expect(new Rect(1, 2, 3, 4).equalsApprox(new Rect(1, 2, 3, 4))).toBe(true);
      expect(new Rect(1, 2, 3, 4).equalsApprox(new Rect(1.00005, 2, 3, 4))).toBe(true);
      expect(new Rect(1, 2, 3, 4).equalsApprox(new Rect(1.1, 2, 3, 4))).toBe(false);
    });
  });

  describe('utility', () => {
    it('clones a rect', () => {
      const original = new Rect(1, 2, 3, 4);
      const cloned = original.clone();
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('checks if empty', () => {
      expect(new Rect(0, 0, 0, 5).isEmpty()).toBe(true);
      expect(new Rect(0, 0, 5, 0).isEmpty()).toBe(true);
      expect(new Rect(0, 0, 5, 5).isEmpty()).toBe(false);
    });

    it('converts to JSON', () => {
      expect(new Rect(1, 2, 3, 4).toJSON()).toEqual({ x: 1, y: 2, width: 3, height: 4 });
    });

    it('creates from JSON', () => {
      expect(Rect.fromJSON({ x: 1, y: 2, width: 3, height: 4 })).toEqual(new Rect(1, 2, 3, 4));
      expect(Rect.fromJSON('{"x":1,"y":2,"width":3,"height":4}')).toEqual(new Rect(1, 2, 3, 4));
    });

    it('converts to string', () => {
      expect(new Rect(1, 2, 3, 4).toString()).toBe('(1, 2, 3, 4)');
    });
  });
});
