import { describe, expect, it } from 'vitest';
import { createDefaultLayers, Layer, LayerDefaults, LayerNames } from '../../src/layer/Layer.ts';
import { Node } from '../../src/parts/Node.ts';

describe('Layer', () => {
  it('should create with name and z-order', () => {
    const layer = new Layer('MyLayer', 5);
    expect(layer.name).toBe('MyLayer');
    expect(layer.zOrder).toBe(5);
    expect(layer.isTemporary).toBe(false);
    expect(layer.opacity).toBe(1);
  });

  it('should add and remove parts', () => {
    const layer = new Layer('Default', 0);
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 100, 0, 100, 50);

    layer.add(node1);
    layer.add(node2);
    expect(layer.partCount).toBe(2);
    expect(layer.parts).toContain(node1);
    expect(layer.parts).toContain(node2);

    layer.remove(node1);
    expect(layer.partCount).toBe(1);
    expect(layer.parts).not.toContain(node1);
  });

  it('should not add duplicates', () => {
    const layer = new Layer('Default', 0);
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    layer.add(node);
    layer.add(node);
    expect(layer.partCount).toBe(1);
  });

  it('should check contains', () => {
    const layer = new Layer('Default', 0);
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    expect(layer.contains(node)).toBe(false);
    layer.add(node);
    expect(layer.contains(node)).toBe(true);
  });

  it('should get visible parts', () => {
    const layer = new Layer('Default', 0);
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 100, 0, 100, 50);

    layer.add(node1);
    layer.add(node2);
    node2.visible = false;

    const visible = layer.getVisibleParts();
    expect(visible).toHaveLength(1);
    expect(visible[0]).toBe(node1);
  });

  it('should clear all parts', () => {
    const layer = new Layer('Default', 0);
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    layer.add(node);

    layer.clear();
    expect(layer.partCount).toBe(0);
  });

  it('should remove non-existent part gracefully', () => {
    const layer = new Layer('Default', 0);
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    expect(layer.remove(node)).toBe(false);
  });

  it('should set z-order', () => {
    const layer = new Layer('Default', 0);
    layer.zOrder = 10;
    expect(layer.zOrder).toBe(10);
  });

  it('should set temporary flag', () => {
    const layer = new Layer('Dragging', 100);
    layer.isTemporary = true;
    expect(layer.isTemporary).toBe(true);
  });

  it('should clamp opacity between 0 and 1', () => {
    const layer = new Layer('Default', 0);
    layer.opacity = 0.5;
    expect(layer.opacity).toBe(0.5);
    layer.opacity = -0.5;
    expect(layer.opacity).toBe(0);
    layer.opacity = 1.5;
    expect(layer.opacity).toBe(1);
  });
});

describe('LayerNames', () => {
  it('should have built-in layer names', () => {
    expect(LayerNames.Grid).toBe('Grid');
    expect(LayerNames.ViewportBackground).toBe('ViewportBackground');
    expect(LayerNames.Background).toBe('Background');
    expect(LayerNames.Foreground).toBe('Foreground');
    expect(LayerNames.ViewportForeground).toBe('ViewportForeground');
    expect(LayerNames.Adornment).toBe('Adornment');
    expect(LayerNames.Tool).toBe('Tool');
  });

  it('Default is the empty string, matching real GoJS (not the literal name "Default")', () => {
    expect(LayerNames.Default).toBe('');
  });
});

describe('LayerDefaults', () => {
  it('should have default z-orders', () => {
    expect(LayerDefaults.Grid).toBe(-100);
    expect(LayerDefaults.ViewportBackground).toBe(-30);
    expect(LayerDefaults.Background).toBe(-10);
    expect(LayerDefaults.Default).toBe(0);
    expect(LayerDefaults.Foreground).toBe(10);
    expect(LayerDefaults.ViewportForeground).toBe(30);
    expect(LayerDefaults.Adornment).toBe(50);
    expect(LayerDefaults.Tool).toBe(100);
  });
});

describe('createDefaultLayers', () => {
  it('should create the 8 standard GoJS-compatible layers', () => {
    const layers = createDefaultLayers();
    expect(layers).toHaveLength(8);
  });

  it('should have correct names and z-orders', () => {
    const layers = createDefaultLayers();
    const names = layers.map((l) => l.name);
    expect(names).toEqual([
      'Grid',
      'ViewportBackground',
      'Background',
      '',
      'Foreground',
      'ViewportForeground',
      'Adornment',
      'Tool',
    ]);

    const zOrders = layers.map((l) => l.zOrder);
    expect(zOrders).toEqual([-100, -30, -10, 0, 10, 30, 50, 100]);
  });

  it('should be sorted by z-order', () => {
    const layers = createDefaultLayers();
    for (let i = 1; i < layers.length; i++) {
      expect(layers[i]?.zOrder).toBeGreaterThanOrEqual(layers[i - 1]?.zOrder ?? 0);
    }
  });
});
