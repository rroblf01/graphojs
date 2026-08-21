// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Geometry,
  GeometryType,
  PathFigure,
  PathSegment,
  SegmentType,
} from '../../src/geometry/Geometry.ts';
import { Shape } from '../../src/panel/Shape.ts';

function mockContext() {
  return {
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    arc: vi.fn(),
    ellipse: vi.fn(),
    rect: vi.fn(),
    roundRect: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

describe('PathSegment', () => {
  it('constructs with defaults and supports close()/isClosed', () => {
    const seg = new PathSegment(SegmentType.Line, 10, 20);
    expect(seg.type).toBe(SegmentType.Line);
    expect(seg.endX).toBe(10);
    expect(seg.endY).toBe(20);
    expect(seg.isClosed).toBe(false);
    expect(seg.close()).toBe(seg);
    expect(seg.isClosed).toBe(true);
  });

  it('copy() produces an independent equal segment', () => {
    const seg = new PathSegment(SegmentType.Bezier, 1, 2, 3, 4, 5, 6);
    const copy = seg.copy();
    expect(copy).not.toBe(seg);
    expect(seg.equalsApprox(copy)).toBe(true);
    copy.endX = 99;
    expect(seg.equalsApprox(copy)).toBe(false);
  });
});

describe('PathFigure', () => {
  it('add() appends segments and copy() is independent', () => {
    const fig = new PathFigure(0, 0);
    fig
      .add(new PathSegment(SegmentType.Line, 10, 0))
      .add(new PathSegment(SegmentType.Line, 10, 10));
    expect(fig.segments.count).toBe(2);

    const copy = fig.copy();
    copy.add(new PathSegment(SegmentType.Line, 0, 10));
    expect(fig.segments.count).toBe(2);
    expect(copy.segments.count).toBe(3);
  });
});

describe('Geometry', () => {
  it('static type constants match GeometryType', () => {
    expect(Geometry.Path).toBe(GeometryType.Path);
    expect(Geometry.Rectangle).toBe(GeometryType.Rectangle);
  });

  it('add()/figures round-trip and copy() is independent', () => {
    const geo = new Geometry();
    const fig = new PathFigure(0, 0).add(new PathSegment(SegmentType.Line, 10, 10));
    geo.add(fig);
    expect(geo.figures.count).toBe(1);

    const copy = geo.copy();
    copy.add(new PathFigure(5, 5));
    expect(geo.figures.count).toBe(1);
    expect(copy.figures.count).toBe(2);
  });

  it('stringify() serializes a triangle to the geometryString mini-language', () => {
    const geo = new Geometry().add(
      new PathFigure(0, 0)
        .add(new PathSegment(SegmentType.Line, 10, 20))
        .add(new PathSegment(SegmentType.Line, -10, 20).close()),
    );
    expect(Geometry.stringify(geo)).toBe('M0,0 L10,20 L-10,20 Z');
  });

  it('parse() rebuilds an equivalent structure from a geometryString', () => {
    const geo = Geometry.parse('M0,0 L10,0 L10,10 Z');
    expect(geo.figures.count).toBe(1);
    const fig = geo.figures.first();
    expect(fig?.startX).toBe(0);
    expect(fig?.startY).toBe(0);
    expect(fig?.segments.count).toBe(2);
    expect(fig?.segments.last()?.isClosed).toBe(true);
  });

  it('parse() then stringify() round-trips a simple path', () => {
    const original = 'M0,0 L10,0 L10,10 Z';
    const roundTripped = Geometry.stringify(Geometry.parse(original));
    expect(roundTripped).toBe(original);
  });

  it('parse() handles C (cubic bezier) and Q (quadratic) commands', () => {
    const geo = Geometry.parse('M0,0 C1,2,3,4,5,6 Q7,8,9,10');
    const fig = geo.figures.first();
    const segs = fig?.segments.toArray() ?? [];
    expect(segs[0]?.type).toBe(SegmentType.Bezier);
    expect(segs[0]?.endX).toBe(5);
    expect(segs[0]?.endY).toBe(6);
    expect(segs[1]?.type).toBe(SegmentType.QuadraticBezier);
    expect(segs[1]?.endX).toBe(9);
    expect(segs[1]?.endY).toBe(10);
  });

  it('computeBoundsWithoutOrigin() covers every point in every figure', () => {
    const geo = new Geometry().add(
      new PathFigure(0, 0)
        .add(new PathSegment(SegmentType.Line, 10, 0))
        .add(new PathSegment(SegmentType.Line, 10, 20)),
    );
    const bounds = geo.computeBoundsWithoutOrigin();
    expect(bounds.x).toBe(0);
    expect(bounds.y).toBe(0);
    expect(bounds.width).toBe(10);
    expect(bounds.height).toBe(20);
  });

  it('stringifyFixed(digits) rounds numeric output', () => {
    const geo = new Geometry().add(
      new PathFigure(0, 0).add(new PathSegment(SegmentType.Line, 1.23456, 2.3456)),
    );
    expect(Geometry.stringifyFixed(2)(geo)).toBe('M0,0 L1.23,2.35');
  });
});

describe('Shape.geometry', () => {
  it('setting a Geometry populates geometryString via Geometry.stringify', () => {
    const shape = new Shape();
    const geo = new Geometry().add(
      new PathFigure(0, 0).add(new PathSegment(SegmentType.Line, 10, 10).close()),
    );
    shape.geometry = geo;
    expect(shape.geometry).toBe(geo);
    expect(shape.geometryString).toBe('M0,0 L10,10 Z');
  });

  it('clone() deep-copies the Geometry, not just the string', () => {
    const shape = new Shape();
    const geo = new Geometry().add(new PathFigure(0, 0));
    shape.geometry = geo;
    const cloned = shape.clone();
    expect(cloned.geometry).not.toBe(geo);
    expect(cloned.geometryString).toBe(shape.geometryString);
  });

  it('setting geometry = null clears geometryString', () => {
    const shape = new Shape();
    shape.geometryString = 'M0,0 L10,10';
    shape.geometry = null;
    expect(shape.geometryString).toBe('');
  });
});
