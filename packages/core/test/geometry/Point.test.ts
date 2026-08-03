import { describe, expect, it } from 'vitest';
import { Point } from '../../src/geometry/Point.ts';

describe('Point', () => {
  describe('construction', () => {
    it('creates a point with x and y', () => {
      const p = new Point(1, 2);
      expect(p.x).toBe(1);
      expect(p.y).toBe(2);
    });

    it('creates from an object', () => {
      const p = Point.from({ x: 3, y: 4 });
      expect(p.x).toBe(3);
      expect(p.y).toBe(4);
    });

    it('creates a zero point', () => {
      const p = Point.zero();
      expect(p.x).toBe(0);
      expect(p.y).toBe(0);
    });

    it('creates a point with equal x and y', () => {
      const p = Point.of(5);
      expect(p.x).toBe(5);
      expect(p.y).toBe(5);
    });
  });

  describe('comparison', () => {
    it('checks equality', () => {
      expect(new Point(1, 2).equals(new Point(1, 2))).toBe(true);
      expect(new Point(1, 2).equals(new Point(1, 3))).toBe(false);
      expect(new Point(1, 2).equals(new Point(0, 2))).toBe(false);
    });

    it('checks approximate equality', () => {
      expect(new Point(1, 2).equalsApprox(new Point(1, 2))).toBe(true);
      expect(new Point(1, 2).equalsApprox(new Point(1.00005, 2.00005))).toBe(true);
      expect(new Point(1, 2).equalsApprox(new Point(1.1, 2))).toBe(false);
    });
  });

  describe('operations', () => {
    it('adds two points', () => {
      expect(new Point(1, 2).add(new Point(3, 4))).toEqual(new Point(4, 6));
    });

    it('subtracts two points', () => {
      expect(new Point(5, 6).subtract(new Point(2, 3))).toEqual(new Point(3, 3));
    });

    it('scales a point', () => {
      expect(new Point(2, 3).scale(2)).toEqual(new Point(4, 6));
    });

    it('calculates distance', () => {
      expect(new Point(0, 0).distanceTo(new Point(3, 4))).toBe(5);
    });

    it('calculates squared distance', () => {
      expect(new Point(0, 0).distanceSquaredTo(new Point(3, 4))).toBe(25);
    });

    it('calculates length', () => {
      expect(new Point(3, 4).length()).toBe(5);
    });

    it('normalizes a point', () => {
      const normalized = new Point(3, 4).normalize();
      expect(normalized.x).toBeCloseTo(0.6);
      expect(normalized.y).toBeCloseTo(0.8);
    });

    it('normalizes zero point to zero', () => {
      const normalized = new Point(0, 0).normalize();
      expect(normalized.x).toBe(0);
      expect(normalized.y).toBe(0);
    });

    it('calculates dot product', () => {
      expect(new Point(1, 2).dot(new Point(3, 4))).toBe(11);
    });

    it('calculates angle', () => {
      expect(new Point(1, 0).angle()).toBe(0);
      expect(new Point(0, 1).angle()).toBeCloseTo(Math.PI / 2);
    });

    it('rotates a point', () => {
      const rotated = new Point(1, 0).rotate(Math.PI / 2);
      expect(rotated.x).toBeCloseTo(0);
      expect(rotated.y).toBeCloseTo(1);
    });
  });

  describe('utility', () => {
    it('clones a point', () => {
      const original = new Point(1, 2);
      const cloned = original.clone();
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('checks if finite', () => {
      expect(new Point(1, 2).isFinite()).toBe(true);
      expect(new Point(Infinity, 2).isFinite()).toBe(false);
      expect(new Point(1, NaN).isFinite()).toBe(false);
    });

    it('checks if zero', () => {
      expect(new Point(0, 0).isZero()).toBe(true);
      expect(new Point(1, 0).isZero()).toBe(false);
    });

    it('converts to JSON', () => {
      expect(new Point(1, 2).toJSON()).toEqual({ x: 1, y: 2 });
    });

    it('creates from JSON', () => {
      expect(Point.fromJSON({ x: 1, y: 2 })).toEqual(new Point(1, 2));
      expect(Point.fromJSON('{"x":1,"y":2}')).toEqual(new Point(1, 2));
    });

    it('converts to string', () => {
      expect(new Point(1, 2).toString()).toBe('(1, 2)');
    });
  });
});
