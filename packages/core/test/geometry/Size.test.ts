import { describe, expect, it } from 'vitest';
import { Size } from '../../src/geometry/Size.ts';

describe('Size', () => {
  describe('construction', () => {
    it('creates a size with width and height', () => {
      const s = new Size(10, 20);
      expect(s.width).toBe(10);
      expect(s.height).toBe(20);
    });

    it('creates from an object', () => {
      const s = Size.from({ width: 30, height: 40 });
      expect(s.width).toBe(30);
      expect(s.height).toBe(40);
    });

    it('creates a zero size', () => {
      const s = Size.zero();
      expect(s.width).toBe(0);
      expect(s.height).toBe(0);
    });

    it('creates a square size', () => {
      const s = Size.of(5);
      expect(s.width).toBe(5);
      expect(s.height).toBe(5);
    });
  });

  describe('comparison', () => {
    it('checks equality', () => {
      expect(new Size(1, 2).equals(new Size(1, 2))).toBe(true);
      expect(new Size(1, 2).equals(new Size(1, 3))).toBe(false);
    });

    it('checks approximate equality', () => {
      expect(new Size(1, 2).equalsApprox(new Size(1, 2))).toBe(true);
      expect(new Size(1, 2).equalsApprox(new Size(1.00005, 2.00005))).toBe(true);
      expect(new Size(1, 2).equalsApprox(new Size(1.1, 2))).toBe(false);
    });
  });

  describe('operations', () => {
    it('scales a size', () => {
      expect(new Size(2, 3).scale(2)).toEqual(new Size(4, 6));
    });
  });

  describe('utility', () => {
    it('clones a size', () => {
      const original = new Size(1, 2);
      const cloned = original.clone();
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('checks if valid', () => {
      expect(new Size(1, 2).isValid()).toBe(true);
      expect(new Size(-1, 2).isValid()).toBe(false);
      expect(new Size(1, -2).isValid()).toBe(false);
    });

    it('checks if zero', () => {
      expect(new Size(0, 0).isZero()).toBe(true);
      expect(new Size(1, 0).isZero()).toBe(false);
    });

    it('checks if empty', () => {
      expect(new Size(0, 5).isEmpty()).toBe(true);
      expect(new Size(5, 0).isEmpty()).toBe(true);
      expect(new Size(5, 5).isEmpty()).toBe(false);
    });

    it('checks if square', () => {
      expect(new Size(5, 5).isSquare()).toBe(true);
      expect(new Size(5, 10).isSquare()).toBe(false);
    });

    it('calculates area', () => {
      expect(new Size(3, 4).area()).toBe(12);
    });

    it('calculates perimeter', () => {
      expect(new Size(3, 4).perimeter()).toBe(14);
    });

    it('calculates aspect ratio', () => {
      expect(new Size(10, 5).aspectRatio()).toBe(2);
      expect(new Size(5, 0).aspectRatio()).toBe(Infinity);
    });

    it('checks containment', () => {
      expect(new Size(10, 10).contains(new Size(5, 5))).toBe(true);
      expect(new Size(5, 5).contains(new Size(10, 10))).toBe(false);
    });

    it('calculates union', () => {
      expect(new Size(5, 10).union(new Size(10, 5))).toEqual(new Size(10, 10));
    });

    it('calculates intersection', () => {
      expect(new Size(10, 10).intersection(new Size(5, 5))).toEqual(new Size(5, 5));
    });

    it('converts to JSON', () => {
      expect(new Size(1, 2).toJSON()).toEqual({ width: 1, height: 2 });
    });

    it('creates from JSON', () => {
      expect(Size.fromJSON({ width: 1, height: 2 })).toEqual(new Size(1, 2));
      expect(Size.fromJSON('{"width":1,"height":2}')).toEqual(new Size(1, 2));
    });

    it('converts to string', () => {
      expect(new Size(1, 2).toString()).toBe('(1, 2)');
    });
  });
});
