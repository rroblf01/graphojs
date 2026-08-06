// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import {
  Adornment,
  AdornmentShape,
  AdornmentManager,
  createSelectionAdornment,
  createRotationAdornment,
} from '../src/parts/Adornment.ts';
import { Node } from '../src/parts/Node.ts';
import { Rect } from '../src/geometry/Rect.ts';
import { GridLayout } from '../src/layout/GridLayout.ts';
import { SpotLayout } from '../src/layout/SpotLayout.ts';
import { GraphLinksModel } from '../src/model/GraphLinksModel.ts';
import { TreeModel } from '../src/model/TreeModel.ts';
import { LinkPathCache, CanvasPool, throttle, debounce } from '../src/render/PerformanceCache.ts';

function mockContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    ellipse: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    globalAlpha: 1,
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    top: 0,
    left: 0,
    right: 800,
    bottom: 600,
  })) as unknown as typeof HTMLCanvasElement.prototype.getBoundingClientRect;

  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterAll(() => {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
});

describe('Adornment System', () => {
  it('AdornmentShape contains point correctly', () => {
    const shape = new AdornmentShape({
      name: 'test',
      bounds: new Rect(0, 0, 10, 10),
    });
    expect(shape.containsPoint({ x: 5, y: 5 })).toBe(true);
    expect(shape.containsPoint({ x: 15, y: 15 })).toBe(false);
  });

  it('Adornment manages child shapes', () => {
    const adornment = new Adornment('a1', 'Selection', 'Selection');
    const shape1 = new AdornmentShape({ name: 'handle1', bounds: new Rect(0, 0, 8, 8) });
    const shape2 = new AdornmentShape({ name: 'handle2', bounds: new Rect(10, 10, 8, 8) });

    adornment.addShape(shape1);
    adornment.addShape(shape2);
    expect(adornment.childShapes).toHaveLength(2);
    expect(adornment.findShape('handle1')).toBe(shape1);
    expect(adornment.findShape('handle3')).toBeUndefined();

    adornment.removeShape(shape1);
    expect(adornment.childShapes).toHaveLength(1);
  });

  it('createSelectionAdornment creates handles', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    const adornment = createSelectionAdornment('a1', node);
    expect(adornment.adornmentType).toBe('Selection');
    expect(adornment.childShapes.length).toBeGreaterThan(0);
    expect(adornment.adornedPart).toBe(node);
  });

  it('createRotationAdornment creates rotation handle', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    const adornment = createRotationAdornment('a1', node);
    expect(adornment.adornmentType).toBe('Rotation');
    expect(adornment.childShapes).toHaveLength(1);
  });

  it('updatePosition() tracks the adorned part after it moves/resizes, instead of freezing at creation time', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    const adornment = createSelectionAdornment('a1', node);
    const nw = adornment.findShape('corner-nw-resize')!;
    const se = adornment.findShape('corner-se-resize')!;
    expect(nw.bounds.x).toBe(-4); // 0 - half(4)
    expect(se.bounds.x).toBe(96); // 100 - half(4)

    // The node moves and resizes.
    node.bounds = new Rect(200, 300, 40, 20);
    adornment.updatePosition();

    expect(adornment.bounds.x).toBe(200);
    expect(adornment.bounds.width).toBe(40);
    // The corner handles must have followed, not stayed at their original spot.
    expect(nw.bounds.x).toBeCloseTo(200 - 4);
    expect(nw.bounds.y).toBeCloseTo(300 - 4);
    expect(se.bounds.x).toBeCloseTo(240 - 4);
    expect(se.bounds.y).toBeCloseTo(320 - 4);
  });

  it('rotation handle updatePosition() keeps its fixed offset above the adorned part as it moves', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    const adornment = createRotationAdornment('a1', node);
    const handle = adornment.childShapes[0]!;
    expect(handle.bounds.center).toEqual({ x: 50, y: -20 });

    node.bounds = new Rect(500, 500, 100, 50);
    adornment.updatePosition();

    expect(handle.bounds.center).toEqual({ x: 550, y: 480 }); // still 20px above the top-center
  });

  it('AdornmentManager tracks adornments per part', () => {
    const manager = new AdornmentManager();
    const node = new Node(1, new Rect(0, 0, 100, 50));
    const adornment = createSelectionAdornment('a1', node);

    manager.addAdornment(node, adornment);
    expect(manager.getAdornment(node, 'Selection')).toBe(adornment);
    expect(manager.getAdornments(node).size).toBe(1);

    manager.removeAdornment(node, 'Selection');
    expect(manager.getAdornment(node, 'Selection')).toBeUndefined();
  });

  it('Part manages adornments', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    const adornment = createSelectionAdornment('a1', node);
    node.addAdornment('Selection', adornment);
    expect(node.findAdornment('Selection')).toBe(adornment);
    expect(node.adornments.size).toBe(1);

    node.removeAdornment('Selection');
    expect(node.findAdornment('Selection')).toBeUndefined();
  });
});

describe('GridLayout', () => {
  it('arranges nodes in grid', () => {
    const nodes = [
      new Node(1, new Rect(0, 0, 50, 50)),
      new Node(2, new Rect(0, 0, 50, 50)),
      new Node(3, new Rect(0, 0, 50, 50)),
      new Node(4, new Rect(0, 0, 50, 50)),
    ];
    const layout = new GridLayout({ columns: 2, spacingX: 10, spacingY: 10, center: false });
    layout.apply(nodes, []);

    // First row: nodes at y=0
    expect(nodes[0].bounds.x).toBe(0);
    expect(nodes[1].bounds.x).toBe(60); // 50 + 10
    // Second row: nodes at y=60
    expect(nodes[2].bounds.y).toBe(60);
    expect(nodes[3].bounds.y).toBe(60);
  });
});

describe('SpotLayout', () => {
  it('places nodes at spot with offset', () => {
    const nodes = [
      new Node(1, new Rect(100, 100, 50, 50)),
      new Node(2, new Rect(200, 200, 50, 50)),
    ];
    const layout = new SpotLayout({
      spot: { x: 0, y: 0 },
      offset: { x: 120, y: 0 },
      center: false,
    });
    layout.apply(nodes, []);

    expect(nodes[0].bounds.x).toBe(0);
    expect(nodes[1].bounds.x).toBe(120);
  });

  it('alignmentSpot centers differently-sized nodes on the same point regardless of size', () => {
    const small = new Node(1, new Rect(0, 0, 20, 20));
    const large = new Node(2, new Rect(0, 0, 100, 100));
    const layout = new SpotLayout({
      spot: { x: 50, y: 50 },
      offset: { x: 0, y: 0 }, // no per-index stacking — same target for both
      alignmentSpot: { x: 0.5, y: 0.5 }, // center, not top-left
      center: false,
    });
    layout.apply([small, large], []);

    expect(small.bounds.center).toEqual({ x: 50, y: 50 });
    expect(large.bounds.center).toEqual({ x: 50, y: 50 });
    // Confirms it's size-independent: top-left corners differ even though centers match.
    expect(small.bounds.x).not.toBe(large.bounds.x);
  });
});

describe('Model copy()', () => {
  it('GraphLinksModel.copy() creates deep copy', () => {
    const model = new GraphLinksModel();
    model.addNode({ key: 1, x: 0, y: 0 });
    model.addNode({ key: 2, x: 100, y: 0 });
    model.addLink({ key: 100, from: 1, to: 2 });

    const copy = model.copy();
    expect(copy).not.toBe(model);
    expect(copy.getNodeCount()).toBe(2);
    expect(copy.getLinkCount()).toBe(1);
    expect(copy.getNodeData(1)).toEqual(model.getNodeData(1));
  });

  it('TreeModel.copy() creates deep copy', () => {
    const model = new TreeModel();
    model.addNode({ key: 1 }); // Root node (no parent)
    model.addNode({ key: 2, parent: 1 });

    const copy = model.copy();
    expect(copy).not.toBe(model);
    expect(copy.getNodeCount()).toBe(2);
  });

  it('Model.setDataProperty emits change event', () => {
    const model = new GraphLinksModel();
    model.addNode({ key: 1, x: 0 });

    let eventFired = false;
    model.addChangedListener((event) => {
      if (event.propertyName === 'x') eventFired = true;
    });

    const nodeData = model.getNodeData(1);
    if (nodeData) {
      model.setDataProperty(nodeData, 'x', 100);
    }
    expect(eventFired).toBe(true);
    expect(model.getNodeData(1)?.x).toBe(100);
  });
});

describe('Performance Caches', () => {
  it('LinkPathCache stores and retrieves paths', () => {
    const cache = new LinkPathCache();
    const path = [
      { x: 0, y: 0 },
      { x: 100, y: 100 },
    ];

    expect(cache.get(1, 2, 'straight', 0, { x: 0, y: 0 }, { x: 100, y: 100 })).toBeNull();

    cache.set(1, 2, 'straight', 0, { x: 0, y: 0 }, { x: 100, y: 100 }, path);
    expect(cache.get(1, 2, 'straight', 0, { x: 0, y: 0 }, { x: 100, y: 100 })).toEqual(path);
    expect(cache.size).toBe(1);

    cache.invalidate();
    expect(cache.size).toBe(0);
  });

  it('CanvasPool acquires and releases canvases', () => {
    const pool = new CanvasPool(2);
    expect(pool.available).toBe(2);

    const canvas1 = pool.acquire(100, 100);
    expect(pool.available).toBe(1);
    expect(pool.used).toBe(1);

    pool.acquire(200, 200);
    expect(pool.available).toBe(0);
    expect(pool.used).toBe(2);

    pool.release(canvas1);
    expect(pool.available).toBe(1);
    expect(pool.used).toBe(1);
  });

  it('throttle limits function calls', () => {
    let count = 0;
    const fn = () => {
      count++;
    };
    const throttled = throttle(fn, 50);

    throttled();
    throttled();
    throttled();
    expect(count).toBe(1);
  });

  it('debounce delays function calls', async () => {
    let count = 0;
    const fn = () => {
      count++;
    };
    const debounced = debounce(fn, 50);

    debounced();
    debounced();
    debounced();
    expect(count).toBe(0);

    await new Promise((r) => setTimeout(r, 100));
    expect(count).toBe(1);
  });
});

describe('Part improvements', () => {
  it('Part.copy() creates deep copy', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    node.fill = 'red';
    node.stroke = 'blue';

    const copy = node.copy();
    expect(copy).not.toBe(node);
    expect(copy.key).toBe(node.key);
    expect(copy.fill).toBe('red');
    expect(copy.stroke).toBe('blue');
  });

  it('Part has draggable/resizable/rotatable flags', () => {
    const node = new Node(1, new Rect(0, 0, 100, 50));
    expect(node.draggable).toBe(true);
    expect(node.resizable).toBe(true);
    expect(node.rotatable).toBe(true);

    node.draggable = false;
    node.resizable = false;
    node.rotatable = false;
    expect(node.draggable).toBe(false);
    expect(node.resizable).toBe(false);
    expect(node.rotatable).toBe(false);
  });
});
