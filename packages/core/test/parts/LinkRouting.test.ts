import { describe, it, expect } from 'vitest';
import { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';
import { Ports } from '../../src/parts/Port.ts';

describe('Link arrowheads and labels', () => {
  it('should default to triangle arrowhead', () => {
    const link = new Link(1, 2, 3);
    expect(link.arrowhead).toBe('triangle');
    expect(link.arrowheadSize).toBe(10);
  });

  it('should set arrowhead style', () => {
    const link = new Link(1, 2, 3);
    link.arrowhead = 'diamond';
    expect(link.arrowhead).toBe('diamond');
  });

  it('should set arrowhead size', () => {
    const link = new Link(1, 2, 3);
    link.arrowheadSize = 15;
    expect(link.arrowheadSize).toBe(15);
  });

  it('should set label properties', () => {
    const link = new Link(1, 2, 3);
    link.label = 'connects';
    link.labelColor = '#ff0000';
    link.labelFont = '14px sans-serif';
    expect(link.label).toBe('connects');
    expect(link.labelColor).toBe('#ff0000');
    expect(link.labelFont).toBe('14px sans-serif');
  });

  it('should set corner radius', () => {
    const link = new Link(1, 2, 3);
    link.corner = 8;
    expect(link.corner).toBe(8);
  });
});

describe('Link path computation', () => {
  it('should set path points and update bounds', () => {
    const link = new Link(1, 2, 3);
    link.setPathPoints([
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 50, y: 40 },
    ]);
    link.updateBounds();
    expect(link.bounds.x).toBe(0);
    expect(link.bounds.y).toBe(0);
    expect(link.bounds.width).toBe(50);
    expect(link.bounds.height).toBe(40);
  });

  it('should fall back to ports when no path points', () => {
    const link = new Link(1, 2, 3);
    link.fromPort = { x: 0, y: 0 };
    link.toPort = { x: 100, y: 50 };
    link.updateBounds();
    expect(link.bounds.width).toBe(100);
    expect(link.bounds.height).toBe(50);
  });
});

describe('Node connection points', () => {
  it('should compute edge point for target to the right', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const p = node.getConnectionPoint({ x: 500, y: 25 });
    expect(p.x).toBe(100);
    expect(p.y).toBe(25);
  });

  it('should compute edge point for target to the left', () => {
    const node = Node.fromPosAndSize(1, 200, 100, 100, 50);
    const p = node.getConnectionPoint({ x: 0, y: 125 });
    expect(p.x).toBe(200);
    expect(p.y).toBe(125);
  });

  it('should compute edge point for target below', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const p = node.getConnectionPoint({ x: 50, y: 500 });
    expect(p.x).toBe(50);
    expect(p.y).toBe(50);
  });

  it('should use named port for connection', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.addPort(Ports.right('out'));
    const p = node.getConnectionPoint({ x: 0, y: 0 }, 'out');
    expect(p.x).toBe(100);
    expect(p.y).toBe(25);
  });
});
