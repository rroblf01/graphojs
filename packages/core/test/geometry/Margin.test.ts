import { describe, expect, it } from 'vitest';
import { Margin } from '../../src/geometry/Margin.ts';

describe('Margin', () => {
  describe('construction', () => {
    it('creates a margin with all values', () => {
      const m = new Margin(1, 2, 3, 4);
      expect(m.top).toBe(1);
      expect(m.right).toBe(2);
      expect(m.bottom).toBe(3);
      expect(m.left).toBe(4);
    });

    it('creates a uniform margin', () => {
      const m = Margin.uniform(5);
      expect(m).toEqual(new Margin(5, 5, 5, 5));
    });

    it('creates a symmetric margin', () => {
      const m = Margin.symmetric(2, 3);
      expect(m).toEqual(new Margin(2, 3, 2, 3));
    });

    it('creates a zero margin', () => {
      const m = Margin.zero();
      expect(m).toEqual(new Margin(0, 0, 0, 0));
    });

    it('creates from an object', () => {
      const m = Margin.from({ top: 1, right: 2, bottom: 3, left: 4 });
      expect(m).toEqual(new Margin(1, 2, 3, 4));
    });
  });

  describe('comparison', () => {
    it('checks equality', () => {
      expect(new Margin(1, 2, 3, 4).equals(new Margin(1, 2, 3, 4))).toBe(true);
      expect(new Margin(1, 2, 3, 4).equals(new Margin(1, 2, 3, 5))).toBe(false);
    });

    it('checks approximate equality', () => {
      expect(new Margin(1, 2, 3, 4).equalsApprox(new Margin(1, 2, 3, 4))).toBe(true);
      expect(new Margin(1, 2, 3, 4).equalsApprox(new Margin(1.00005, 2, 3, 4))).toBe(true);
      expect(new Margin(1, 2, 3, 4).equalsApprox(new Margin(1.1, 2, 3, 4))).toBe(false);
    });
  });

  describe('properties', () => {
    it('calculates horizontal', () => {
      expect(new Margin(1, 2, 3, 4).horizontal).toBe(6);
    });

    it('calculates vertical', () => {
      expect(new Margin(1, 2, 3, 4).vertical).toBe(4);
    });
  });

  describe('operations', () => {
    it('adds margins', () => {
      expect(new Margin(1, 2, 3, 4).add(new Margin(5, 6, 7, 8))).toEqual(new Margin(6, 8, 10, 12));
    });

    it('subtracts margins', () => {
      expect(new Margin(5, 6, 7, 8).subtract(new Margin(1, 2, 3, 4))).toEqual(
        new Margin(4, 4, 4, 4),
      );
    });

    it('scales a margin', () => {
      expect(new Margin(1, 2, 3, 4).scale(2)).toEqual(new Margin(2, 4, 6, 8));
    });
  });

  describe('utility', () => {
    it('clones a margin', () => {
      const original = new Margin(1, 2, 3, 4);
      const cloned = original.clone();
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('checks if zero', () => {
      expect(new Margin(0, 0, 0, 0).isZero()).toBe(true);
      expect(new Margin(1, 0, 0, 0).isZero()).toBe(false);
    });

    it('checks if uniform', () => {
      expect(new Margin(5, 5, 5, 5).isUniform()).toBe(true);
      expect(new Margin(1, 2, 3, 4).isUniform()).toBe(false);
    });

    it('converts to JSON', () => {
      expect(new Margin(1, 2, 3, 4).toJSON()).toEqual({ top: 1, right: 2, bottom: 3, left: 4 });
    });

    it('creates from JSON', () => {
      expect(Margin.fromJSON({ top: 1, right: 2, bottom: 3, left: 4 })).toEqual(
        new Margin(1, 2, 3, 4),
      );
      expect(Margin.fromJSON('{"top":1,"right":2,"bottom":3,"left":4}')).toEqual(
        new Margin(1, 2, 3, 4),
      );
    });

    it('converts to string', () => {
      expect(new Margin(1, 2, 3, 4).toString()).toBe('(1, 2, 3, 4)');
    });
  });
});
