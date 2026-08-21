import { describe, expect, it } from 'vitest';
import { Spot } from '../../src/geometry/Spot.ts';
import { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';
import { Port, Ports } from '../../src/parts/Port.ts';

describe('Port', () => {
  it('should create with name', () => {
    const port = new Port('out');
    expect(port.name).toBe('out');
    expect(port.alignment).toBe('center');
    expect(port.visible).toBe(true);
  });

  it('should compute center point', () => {
    const port = new Port('center');
    const p = port.computePoint(0, 0, 100, 50);
    expect(p.x).toBe(50);
    expect(p.y).toBe(25);
  });

  it('should compute left edge point', () => {
    const port = new Port('left');
    port.alignment = 'left';
    const p = port.computePoint(0, 0, 100, 50);
    expect(p.x).toBe(0);
    expect(p.y).toBe(25);
  });

  it('should compute right edge point', () => {
    const port = new Port('right');
    port.alignment = 'right';
    const p = port.computePoint(0, 0, 100, 50);
    expect(p.x).toBe(100);
    expect(p.y).toBe(25);
  });

  it('should compute top edge point', () => {
    const port = new Port('top');
    port.alignment = 'top';
    const p = port.computePoint(10, 20, 100, 50);
    expect(p.x).toBe(60);
    expect(p.y).toBe(20);
  });

  it('should compute bottom edge point', () => {
    const port = new Port('bottom');
    port.alignment = 'bottom';
    const p = port.computePoint(10, 20, 100, 50);
    expect(p.x).toBe(60);
    expect(p.y).toBe(70);
  });

  it('should use custom spot', () => {
    const port = new Port('custom');
    port.spot = Spot.TopLeft;
    expect(port.alignment).toBe('custom');
    const p = port.computePoint(10, 20, 100, 50);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
  });
});

describe('Ports factory', () => {
  it('should create left port', () => {
    const port = Ports.left('in');
    expect(port.name).toBe('in');
    expect(port.alignment).toBe('left');
  });

  it('should create right port', () => {
    const port = Ports.right();
    expect(port.name).toBe('right');
    expect(port.alignment).toBe('right');
  });

  it('should create top and bottom ports', () => {
    expect(Ports.top().alignment).toBe('top');
    expect(Ports.bottom().alignment).toBe('bottom');
  });

  it('should create center port', () => {
    expect(Ports.center().alignment).toBe('center');
  });
});

describe('Node ports', () => {
  it('should add and find ports', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const inPort = Ports.left('in');
    const outPort = Ports.right('out');
    node.addPort(inPort);
    node.addPort(outPort);

    expect(node.portCount).toBe(2);
    expect(node.findPort('in')).toBe(inPort);
    expect(node.findPort('out')).toBe(outPort);
    expect(node.findPort('missing')).toBeUndefined();
  });

  it('should remove ports', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const port = Ports.left('in');
    node.addPort(port);
    expect(node.removePort(port)).toBe(true);
    expect(node.portCount).toBe(0);
    expect(node.removePort(port)).toBe(false);
  });

  it('should clear ports', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.addPort(Ports.left('in'));
    node.addPort(Ports.right('out'));
    node.clearPorts();
    expect(node.portCount).toBe(0);
  });

  it('should get port point', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.addPort(Ports.right('out'));

    const p = node.getPortPoint('out');
    expect(p.x).toBe(100);
    expect(p.y).toBe(25);
  });

  it('should return center for missing port', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const p = node.getPortPoint('missing');
    expect(p.x).toBe(50);
    expect(p.y).toBe(25);
  });

  it('should get connection point toward a target', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    // Target to the right: connection point on right edge
    const right = node.getConnectionPoint({ x: 200, y: 25 });
    expect(right.x).toBe(100);
    expect(right.y).toBe(25);

    // Target below: connection point on bottom edge
    const below = node.getConnectionPoint({ x: 50, y: 100 });
    expect(below.x).toBe(50);
    expect(below.y).toBe(50);
  });

  it('should use port for connection point', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.addPort(Ports.bottom('out'));

    const p = node.getConnectionPoint({ x: 0, y: 0 }, 'out');
    expect(p.x).toBe(50);
    expect(p.y).toBe(50);
  });
});

describe('Link with ports and routing', () => {
  it('should support fromPortName and toPortName', () => {
    const link = new Link(100, 1, 2);
    link.fromPortName = 'out';
    link.toPortName = 'in';
    expect(link.fromPortName).toBe('out');
    expect(link.toPortName).toBe('in');
  });

  it('should compute bounds from path points', () => {
    const link = new Link(100, 1, 2);
    link.setPathPoints([
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 50, y: 30 },
      { x: 100, y: 30 },
    ]);
    link.updateBounds();
    expect(link.bounds.x).toBe(0);
    expect(link.bounds.y).toBe(0);
    expect(link.bounds.width).toBe(100);
    expect(link.bounds.height).toBe(30);
  });

  it('should hit test along the path', () => {
    const link = new Link(100, 1, 2);
    link.setPathPoints([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ]);
    link.updateBounds();

    expect(link.containsPoint({ x: 50, y: 1 })).toBe(true);
    expect(link.containsPoint({ x: 50, y: 50 })).toBe(false);
  });
});
