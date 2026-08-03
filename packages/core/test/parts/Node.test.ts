import { describe, expect, it } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';
import { Node } from '../../src/parts/Node.ts';

describe('Node', () => {
  describe('construction', () => {
    it('creates a node with key and bounds', () => {
      const node = new Node('n1', new Rect(10, 20, 100, 50));
      expect(node.key).toBe('n1');
      expect(node.bounds).toEqual(new Rect(10, 20, 100, 50));
    });

    it('creates from position and size', () => {
      const node = Node.fromPosAndSize('n1', 10, 20, 100, 50);
      expect(node.key).toBe('n1');
      expect(node.bounds).toEqual(new Rect(10, 20, 100, 50));
    });

    it('has default properties', () => {
      const node = new Node('n1', new Rect(0, 0, 100, 50));
      expect(node.visible).toBe(true);
      expect(node.selectable).toBe(true);
      expect(node.isSelected).toBe(false);
      expect(node.opacity).toBe(1);
      expect(node.fill).toBe('#cccccc');
      expect(node.stroke).toBe('#333333');
      expect(node.strokeWidth).toBe(1);
      expect(node.shape).toBe('rect');
      expect(node.label).toBe('');
    });
  });

  describe('properties', () => {
    it('gets center', () => {
      const node = new Node('n1', new Rect(10, 20, 100, 50));
      expect(node.center).toEqual({ x: 60, y: 45 });
    });

    it('gets position', () => {
      const node = new Node('n1', new Rect(10, 20, 100, 50));
      expect(node.position).toEqual({ x: 10, y: 20 });
    });

    it('gets size', () => {
      const node = new Node('n1', new Rect(10, 20, 100, 50));
      expect(node.size).toEqual({ width: 100, height: 50 });
    });
  });

  describe('containment', () => {
    it('contains a point inside', () => {
      const node = new Node('n1', new Rect(10, 20, 100, 50));
      expect(node.containsPoint({ x: 50, y: 40 })).toBe(true);
    });

    it('does not contain a point outside', () => {
      const node = new Node('n1', new Rect(10, 20, 100, 50));
      expect(node.containsPoint({ x: 200, y: 200 })).toBe(false);
    });
  });

  describe('mutations', () => {
    it('updates bounds', () => {
      const node = new Node('n1', new Rect(0, 0, 100, 50));
      node.bounds = new Rect(20, 30, 200, 100);
      expect(node.bounds).toEqual(new Rect(20, 30, 200, 100));
    });

    it('sets shape', () => {
      const node = new Node('n1', new Rect(0, 0, 100, 50));
      node.shape = 'ellipse';
      expect(node.shape).toBe('ellipse');
    });

    it('sets label', () => {
      const node = new Node('n1', new Rect(0, 0, 100, 50));
      node.label = 'Hello';
      expect(node.label).toBe('Hello');
    });

    it('sets visual properties', () => {
      const node = new Node('n1', new Rect(0, 0, 100, 50));
      node.fill = '#ff0000';
      node.stroke = '#00ff00';
      node.strokeWidth = 2;
      node.opacity = 0.5;
      node.isSelected = true;
      expect(node.fill).toBe('#ff0000');
      expect(node.stroke).toBe('#00ff00');
      expect(node.strokeWidth).toBe(2);
      expect(node.opacity).toBe(0.5);
      expect(node.isSelected).toBe(true);
    });
  });
});
