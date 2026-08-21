// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Layer, LayerNames } from '../../src/layer/Layer.ts';
import { Group } from '../../src/parts/Group.ts';
import { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';
import { createLayerCache, LayerCache } from '../../src/render/LayerCache.ts';

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
    fillText: vi.fn(),
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

describe('LayerCache', () => {
  it('should create with defaults', () => {
    const cache = new LayerCache();
    expect(cache.size).toBe(0);
    expect(cache.getScale()).toBe(1);
  });

  it('should create via factory', () => {
    const cache = createLayerCache(2);
    expect(cache).toBeInstanceOf(LayerCache);
    expect(cache.getScale()).toBe(2);
  });

  it('should return null for layer with no parts', () => {
    const cache = new LayerCache();
    const layer = new Layer('Default', 0);
    expect(cache.getLayer(layer)).toBeNull();
  });

  it('should cache a layer with parts', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));

    const entry = cache.getLayer(layer);
    expect(entry).not.toBeNull();
    expect(entry?.canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(cache.size).toBe(1);
  });

  it('should not redraw clean layers', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));

    const first = cache.getLayer(layer);
    const second = cache.getLayer(layer);
    expect(second).toBe(first); // Same cached entry
  });

  it('should redraw dirty layers', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));

    const first = cache.getLayer(layer);
    cache.markDirty(LayerNames.Default);
    const second = cache.getLayer(layer);
    expect(second).not.toBe(first);
  });

  it('should mark all layers dirty', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));
    cache.getLayer(layer);

    cache.markAllDirty();
    expect(cache.isDirty(LayerNames.Default)).toBe(true);
  });

  it('should compute content bounds from parts', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));
    layer.add(Node.fromPosAndSize(2, 200, 100, 100, 50));

    const entry = cache.getLayer(layer);
    expect(entry).not.toBeNull();
    expect(entry?.width).toBeGreaterThanOrEqual(300);
    expect(entry?.height).toBeGreaterThanOrEqual(150);
  });

  it('should cache groups and links', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);

    const group = new Group(1);
    group.bounds = { x: 0, y: 0, width: 200, height: 100 } as never;
    layer.add(group);

    const link = new Link(100, 1, 2);
    layer.add(link);

    const entry = cache.getLayer(layer);
    expect(entry).not.toBeNull();
  });

  it('should clear cache', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));
    cache.getLayer(layer);

    expect(cache.size).toBe(1);
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it('should remove a layer from cache', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));
    cache.getLayer(layer);

    cache.removeLayer(LayerNames.Default);
    expect(cache.size).toBe(0);
  });

  it('should update scale and clear cache', () => {
    const cache = new LayerCache();
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 100, 50));
    cache.getLayer(layer);

    cache.setScale(2);
    expect(cache.getScale()).toBe(2);
    expect(cache.size).toBe(0);
  });
});
