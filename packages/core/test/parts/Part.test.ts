import { describe, expect, it } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';
import { Part } from '../../src/parts/Part.ts';

class TestPart extends Part {}

describe('Part', () => {
  describe('construction', () => {
    it('creates a part with key and bounds', () => {
      const part = new TestPart('p1', new Rect(10, 20, 100, 50));
      expect(part.key).toBe('p1');
      expect(part.bounds).toEqual(new Rect(10, 20, 100, 50));
    });

    it('has default properties', () => {
      const part = new TestPart('p1', new Rect(0, 0, 100, 50));
      expect(part.visible).toBe(true);
      expect(part.selectable).toBe(true);
      expect(part.isSelected).toBe(false);
      expect(part.opacity).toBe(1);
      expect(part.fill).toBe('#cccccc');
      expect(part.stroke).toBe('#333333');
      expect(part.strokeWidth).toBe(1);
      expect(part.zOrder).toBe(0);
    });
  });

  describe('properties', () => {
    it('gets center', () => {
      const part = new TestPart('p1', new Rect(10, 20, 100, 50));
      expect(part.center).toEqual({ x: 60, y: 45 });
    });

    it('gets position', () => {
      const part = new TestPart('p1', new Rect(10, 20, 100, 50));
      expect(part.position).toEqual({ x: 10, y: 20 });
    });

    it('gets size', () => {
      const part = new TestPart('p1', new Rect(10, 20, 100, 50));
      expect(part.size).toEqual({ width: 100, height: 50 });
    });
  });

  describe('containment', () => {
    it('contains a point inside', () => {
      const part = new TestPart('p1', new Rect(10, 20, 100, 50));
      expect(part.containsPoint({ x: 50, y: 40 })).toBe(true);
    });

    it('does not contain a point outside', () => {
      const part = new TestPart('p1', new Rect(10, 20, 100, 50));
      expect(part.containsPoint({ x: 200, y: 200 })).toBe(false);
    });
  });

  describe('mutations', () => {
    it('updates bounds', () => {
      const part = new TestPart('p1', new Rect(0, 0, 100, 50));
      part.bounds = new Rect(20, 30, 200, 100);
      expect(part.bounds).toEqual(new Rect(20, 30, 200, 100));
    });

    it('sets visual properties', () => {
      const part = new TestPart('p1', new Rect(0, 0, 100, 50));
      part.fill = '#ff0000';
      part.stroke = '#00ff00';
      part.strokeWidth = 2;
      part.opacity = 0.5;
      part.isSelected = true;
      part.zOrder = 10;
      expect(part.fill).toBe('#ff0000');
      expect(part.stroke).toBe('#00ff00');
      expect(part.strokeWidth).toBe(2);
      expect(part.opacity).toBe(0.5);
      expect(part.isSelected).toBe(true);
      expect(part.zOrder).toBe(10);
    });

    it('sets visibility', () => {
      const part = new TestPart('p1', new Rect(0, 0, 100, 50));
      part.visible = false;
      expect(part.visible).toBe(false);
    });

    it('sets selectability', () => {
      const part = new TestPart('p1', new Rect(0, 0, 100, 50));
      part.selectable = false;
      expect(part.selectable).toBe(false);
    });
  });
});
