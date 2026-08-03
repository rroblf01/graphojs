import { describe, it, expect } from 'vitest';
import { Node } from '../../src/parts/Node.ts';

describe('shapeContainsPoint', () => {
  it('should include points inside a rect', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'rect';
    expect(node.shapeContainsPoint({ x: 50, y: 25 })).toBe(true);
    expect(node.shapeContainsPoint({ x: 0, y: 0 })).toBe(true);
    expect(node.shapeContainsPoint({ x: 150, y: 25 })).toBe(false);
  });

  it('should exclude corners of an ellipse', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'ellipse';

    // Center is inside
    expect(node.shapeContainsPoint({ x: 50, y: 25 })).toBe(true);
    // Corners of the bounding box are OUTSIDE the ellipse
    expect(node.shapeContainsPoint({ x: 0, y: 0 })).toBe(false);
    expect(node.shapeContainsPoint({ x: 100, y: 0 })).toBe(false);
    expect(node.shapeContainsPoint({ x: 0, y: 50 })).toBe(false);
    expect(node.shapeContainsPoint({ x: 100, y: 50 })).toBe(false);
    // Edge midpoint is inside
    expect(node.shapeContainsPoint({ x: 100, y: 25 })).toBe(true);
  });

  it('should exclude corners of a rounded rect', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'roundedRect';
    node.cornerRadius = 10;

    expect(node.shapeContainsPoint({ x: 50, y: 25 })).toBe(true);
    expect(node.shapeContainsPoint({ x: 5, y: 5 })).toBe(true); // Inside corner radius area? (5,5) is within 10px of corner (10,10), distance ~7.07 < 10 -> inside
    expect(node.shapeContainsPoint({ x: 0, y: 0 })).toBe(false); // Exact corner outside
  });

  it('should handle rounded rect with default radius', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'roundedRect';
    node.cornerRadius = 0;

    // With 0 radius, falls back to ~10% of min dimension = 5
    expect(node.shapeContainsPoint({ x: 50, y: 25 })).toBe(true);
    expect(node.shapeContainsPoint({ x: 0, y: 0 })).toBe(false); // (0,0) is in the corner circle? r=5, corner (5,5), dist~7 > 5 -> outside
  });

  it('should reject points outside bounding box for all shapes', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'ellipse';
    expect(node.shapeContainsPoint({ x: 200, y: 200 })).toBe(false);
  });

  it('should work for nodes with offset position', () => {
    const node = Node.fromPosAndSize(1, 100, 200, 100, 50);
    node.shape = 'ellipse';

    expect(node.shapeContainsPoint({ x: 150, y: 225 })).toBe(true);
    expect(node.shapeContainsPoint({ x: 100, y: 200 })).toBe(false);
    expect(node.shapeContainsPoint({ x: 200, y: 225 })).toBe(true);
  });
});
