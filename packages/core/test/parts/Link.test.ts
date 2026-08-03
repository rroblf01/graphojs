import { describe, expect, it } from 'vitest';
import { Link } from '../../src/parts/Link.ts';

describe('Link', () => {
  describe('construction', () => {
    it('creates a link with key, from, and to', () => {
      const link = new Link('l1', 'n1', 'n2');
      expect(link.key).toBe('l1');
      expect(link.fromKey).toBe('n1');
      expect(link.toKey).toBe('n2');
    });

    it('has default properties', () => {
      const link = new Link('l1', 'n1', 'n2');
      expect(link.visible).toBe(true);
      expect(link.selectable).toBe(true);
      expect(link.isSelected).toBe(false);
      expect(link.opacity).toBe(1);
      expect(link.stroke).toBe('#333333');
      expect(link.strokeWidth).toBe(2);
      expect(link.fill).toBe('none');
      expect(link.routing).toBe('straight');
    });
  });

  describe('ports', () => {
    it('sets and gets fromPort', () => {
      const link = new Link('l1', 'n1', 'n2');
      link.fromPort = { x: 10, y: 20 };
      expect(link.fromPort).toEqual({ x: 10, y: 20 });
    });

    it('sets and gets toPort', () => {
      const link = new Link('l1', 'n1', 'n2');
      link.toPort = { x: 100, y: 200 };
      expect(link.toPort).toEqual({ x: 100, y: 200 });
    });
  });

  describe('bounds', () => {
    it('updates bounds from port positions', () => {
      const link = new Link('l1', 'n1', 'n2');
      link.fromPort = { x: 10, y: 20 };
      link.toPort = { x: 100, y: 200 };
      link.updateBounds();
      expect(link.bounds.x).toBe(10);
      expect(link.bounds.y).toBe(20);
      expect(link.bounds.width).toBe(90);
      expect(link.bounds.height).toBe(180);
    });

    it('handles same position ports', () => {
      const link = new Link('l1', 'n1', 'n2');
      link.fromPort = { x: 50, y: 50 };
      link.toPort = { x: 50, y: 50 };
      link.updateBounds();
      expect(link.bounds.width).toBe(1);
      expect(link.bounds.height).toBe(1);
    });
  });

  describe('routing', () => {
    it('sets routing', () => {
      const link = new Link('l1', 'n1', 'n2');
      link.routing = 'orthogonal';
      expect(link.routing).toBe('orthogonal');
    });
  });
});
