// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Panel, panel, shape } from '../../src/panel/Panel.ts';
import { Shape } from '../../src/panel/Shape.ts';
import { TextBlock } from '../../src/panel/TextBlock.ts';
import { Spot } from '../../src/geometry/Spot.ts';
import { Size } from '../../src/geometry/Size.ts';
import { Margin } from '../../src/geometry/Margin.ts';
import { Node } from '../../src/parts/Node.ts';

function mockContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
    beginPath: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    ellipse: vi.fn(),
    roundRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    closePath: vi.fn(),
    arc: vi.fn(),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    rect: vi.fn(),
    setLineDash: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    font: '',
    textAlign: '',
    textBaseline: '',
    globalAlpha: 1,
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

describe('Spot', () => {
  it('should have standard spots', () => {
    expect(Spot.TopLeft.x).toBe(0);
    expect(Spot.TopLeft.y).toBe(0);
    expect(Spot.Center.x).toBe(0.5);
    expect(Spot.BottomRight.x).toBe(1);
    expect(Spot.BottomRight.y).toBe(1);
  });

  it('should compute points', () => {
    const p = Spot.TopRight.computePoint(10, 20, 100, 50);
    expect(p.x).toBe(110);
    expect(p.y).toBe(20);

    const c = Spot.Center.computePoint(0, 0, 100, 50);
    expect(c.x).toBe(50);
    expect(c.y).toBe(25);
  });

  it('should create from name', () => {
    expect(Spot.fromName('TopLeft')).toEqual(Spot.TopLeft);
    expect(Spot.fromName('Center')).toEqual(Spot.Center);
    expect(Spot.fromName('Unknown')).toEqual(Spot.Center);
  });

  it('should apply offsets', () => {
    const spot = new Spot(0.5, 0.5, 5, -5);
    const p = spot.computePoint(0, 0, 100, 50);
    expect(p.x).toBe(55);
    expect(p.y).toBe(20);
  });
});

describe('Panel measurement', () => {
  it('Auto panel measures main element', () => {
    const p = new Panel('Auto');
    p.add(shape('rect').setFill('#fff'));
    const size = p.measure();
    expect(size.width).toBe(100);
    expect(size.height).toBe(60);
  });

  it('Vertical panel stacks elements', () => {
    const p = new Panel('Vertical');
    p.add(new TextBlock('A').setFont('12px sans-serif'));
    p.add(new TextBlock('B').setFont('12px sans-serif'));
    const size = p.measure();
    expect(size.height).toBeGreaterThan(20); // two stacked lines
  });

  it('Vertical panel respects spacing', () => {
    const p = new Panel('Vertical');
    p.spacing = 10;
    const a = new TextBlock('A');
    a.width = 50;
    a.height = 20;
    const b = new TextBlock('B');
    b.width = 50;
    b.height = 20;
    p.add(a);
    p.add(b);
    const size = p.measure();
    expect(size.height).toBe(50); // 20 + 10 + 20
  });

  it('Horizontal panel lays out side by side', () => {
    const p = new Panel('Horizontal');
    const a = new TextBlock('A');
    a.width = 40;
    a.height = 20;
    const b = new TextBlock('B');
    b.width = 60;
    b.height = 20;
    p.add(a);
    p.add(b);
    const size = p.measure();
    expect(size.width).toBe(100);
  });

  it('Spot panel takes max element size', () => {
    const p = new Panel('Spot');
    const a = new TextBlock('A');
    a.width = 50;
    a.height = 30;
    const b = new TextBlock('B');
    b.width = 80;
    b.height = 40;
    p.add(a);
    p.add(b);
    const size = p.measure();
    expect(size.width).toBe(80);
    expect(size.height).toBe(40);
  });

  it('respects padding', () => {
    const p = new Panel('Auto');
    p.padding = Margin.uniform(5);
    const s = shape('rect');
    s.width = 50;
    s.height = 30;
    p.add(s);
    const size = p.measure();
    expect(size.width).toBe(60);
    expect(size.height).toBe(40);
  });

  it('respects explicit size', () => {
    const p = new Panel('Auto');
    p.width = 200;
    p.height = 100;
    p.add(shape('rect'));
    const size = p.measure();
    expect(size.width).toBe(200);
    expect(size.height).toBe(100);
  });

  it('Table panel measures grid', () => {
    const p = new Panel('Table');
    const a = new TextBlock('A');
    a.width = 30;
    a.height = 20;
    (a as TextBlock & { row: number; column: number }).row = 0;
    (a as TextBlock & { row: number; column: number }).column = 0;
    const b = new TextBlock('B');
    b.width = 50;
    b.height = 20;
    (b as TextBlock & { row: number; column: number }).row = 0;
    (b as TextBlock & { row: number; column: number }).column = 1;
    const c = new TextBlock('C');
    c.width = 40;
    c.height = 30;
    (c as TextBlock & { row: number; column: number }).row = 1;
    (c as TextBlock & { row: number; column: number }).column = 0;
    p.add(a);
    p.add(b);
    p.add(c);

    expect(p.rowCount).toBe(2);
    expect(p.columnCount).toBe(2);
    const size = p.measure();
    expect(size.width).toBe(90); // max(col0)=40 + col1=50
    expect(size.height).toBe(50); // 20 + 30
  });

  it('Table panel counts columns/rows spanned by columnSpan/rowSpan', () => {
    const p = new Panel('Table');
    const header = new TextBlock('Header');
    header.width = 200;
    header.height = 20;
    (header as TextBlock & { row: number; column: number; columnSpan: number }).row = 0;
    (header as TextBlock & { row: number; column: number; columnSpan: number }).column = 0;
    (header as TextBlock & { row: number; column: number; columnSpan: number }).columnSpan = 2;
    const cellA = new TextBlock('A');
    cellA.width = 30;
    cellA.height = 20;
    (cellA as TextBlock & { row: number; column: number }).row = 1;
    (cellA as TextBlock & { row: number; column: number }).column = 0;
    const cellB = new TextBlock('B');
    cellB.width = 30;
    cellB.height = 20;
    (cellB as TextBlock & { row: number; column: number }).row = 1;
    (cellB as TextBlock & { row: number; column: number }).column = 1;
    p.add(header);
    p.add(cellA);
    p.add(cellB);

    // Before the fix, columnCount only looked at `column` (0), never `columnSpan`.
    expect(p.columnCount).toBe(2);
  });
});

describe('Panel layout and drawing', () => {
  it('Auto panel positions main element to fill', () => {
    const p = new Panel('Auto');
    const bg = shape('rect');
    p.add(bg);
    const text = new TextBlock('Hello');
    p.add(text);

    const ctx = mockContext();
    p.draw(ctx, 10, 20, 100, 60);

    expect(bg.position.x).toBe(10);
    expect(bg.position.y).toBe(20);
    expect(bg.actualSize.width).toBe(100);
    expect(bg.actualSize.height).toBe(60);
  });

  it('Spot panel positions element at its spot', () => {
    const p = new Panel('Spot');
    const a = new TextBlock('A');
    a.width = 20;
    a.height = 10;
    a.alignment = Spot.TopLeft;
    p.add(a);

    const ctx = mockContext();
    p.draw(ctx, 0, 0, 100, 50);

    expect(a.position.x).toBe(0);
    expect(a.position.y).toBe(0);
  });

  it('draws background', () => {
    const p = new Panel('Auto');
    p.background = '#ff0000';
    p.add(shape('rect'));

    const ctx = mockContext();
    p.draw(ctx, 0, 0, 100, 60);
    expect(ctx.fillRect).toHaveBeenCalled();
  });

  it('Table panel stretches a columnSpan element across the full width of its spanned columns', () => {
    const p = new Panel('Table');
    const header = new TextBlock('Header');
    (header as TextBlock & { row: number; column: number; columnSpan: number }).row = 0;
    (header as TextBlock & { row: number; column: number; columnSpan: number }).column = 0;
    (header as TextBlock & { row: number; column: number; columnSpan: number }).columnSpan = 2;
    const cellA = new TextBlock('A');
    cellA.width = 40;
    (cellA as TextBlock & { row: number; column: number }).row = 1;
    (cellA as TextBlock & { row: number; column: number }).column = 0;
    const cellB = new TextBlock('B');
    cellB.width = 60;
    (cellB as TextBlock & { row: number; column: number }).row = 1;
    (cellB as TextBlock & { row: number; column: number }).column = 1;
    p.add(header);
    p.add(cellA);
    p.add(cellB);

    const ctx = mockContext();
    p.draw(ctx, 0, 0, 100, 60);

    // Column widths are 40 and 60 (driven by cellA/cellB); the spanning
    // header must cover both, not be squeezed into column 0 alone.
    expect(header.actualSize.width).toBe(100);
    expect(cellB.position.x).toBe(40);
  });

  it('Table panel keeps an aligned element at its natural size instead of stretching it to fill the cell', () => {
    const p = new Panel('Table');
    const icon = new TextBlock('•');
    icon.width = 10;
    icon.height = 10;
    icon.alignment = Spot.TopLeft;
    (icon as TextBlock & { row: number; column: number }).row = 0;
    (icon as TextBlock & { row: number; column: number }).column = 0;
    p.add(icon);

    const ctx = mockContext();
    p.draw(ctx, 0, 0, 200, 100);

    expect(icon.actualSize.width).toBe(10);
    expect(icon.actualSize.height).toBe(10);
    expect(icon.position.x).toBe(0);
    expect(icon.position.y).toBe(0);
  });

  it('hitTest finds topmost element', () => {
    const p = new Panel('Auto');
    const bg = shape('rect');
    p.add(bg);
    const text = new TextBlock('X');
    p.add(text);

    p.setPosition(0, 0);
    p.setActualSize(100, 60);

    // Simulate layout by drawing
    const ctx = mockContext();
    p.draw(ctx, 0, 0, 100, 60);

    const hit = p.hitTest(50, 30);
    expect(hit).not.toBeNull();
    expect(hit).toBe(text);
  });

  it('returns null when hitTest misses', () => {
    const p = new Panel('Auto');
    const bg = shape('rect');
    bg.width = 10;
    bg.height = 10;
    p.add(bg);
    p.setPosition(0, 0);
    p.setActualSize(100, 60);
    const ctx = mockContext();
    p.draw(ctx, 0, 0, 100, 60);

    expect(p.hitTest(500, 500)).toBeNull();
  });
});

describe('Panel element management', () => {
  it('should add and count elements', () => {
    const p = new Panel('Auto');
    p.add(shape('rect'));
    p.add(new TextBlock('X'));
    expect(p.elementCount).toBe(2);
  });

  it('should remove elements', () => {
    const p = new Panel('Auto');
    const s = shape('rect');
    p.add(s);
    expect(p.remove(s)).toBe(true);
    expect(p.elementCount).toBe(0);
  });

  it('should clear elements', () => {
    const p = new Panel('Auto');
    p.add(shape('rect'));
    p.add(new TextBlock('X'));
    p.clear();
    expect(p.elementCount).toBe(0);
  });

  it('should support fluent panel() helper', () => {
    const p = panel('Vertical');
    expect(p.type).toBe('Vertical');
    expect(p).toBeInstanceOf(Panel);
  });

  it('should support fluent shape() helper', () => {
    const s = shape('diamond');
    expect(s).toBeInstanceOf(Shape);
    expect(s.shape).toBe('diamond');
  });
});

describe('Node with panel', () => {
  it('should support panel rendering', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 60);
    const p = new Panel('Auto');
    p.add(shape('rect').setFill('#fff').setStroke('#000'));
    p.add(new TextBlock('Title').setFont('12px sans-serif'));
    node.panel = p;

    expect(node.hasPanel).toBe(true);
    expect(node.panel).toBe(p);
  });

  it('should not have panel by default', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 60);
    expect(node.hasPanel).toBe(false);
    expect(node.panel).toBeNull();
  });

  it('should allow clearing panel', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 60);
    node.panel = new Panel('Auto');
    node.panel = null;
    expect(node.hasPanel).toBe(false);
  });
});

describe('Size helpers', () => {
  it('Size class is used by panels', () => {
    const p = new Panel('Auto');
    p.add(shape('rect'));
    const size = p.measure();
    expect(size).toBeInstanceOf(Size);
    expect(size.isValid()).toBe(true);
  });
});
