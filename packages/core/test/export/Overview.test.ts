// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Overview, createOverview } from '../../src/export/Overview.ts';
import { Layer, LayerNames } from '../../src/layer/Layer.ts';
import { Node } from '../../src/parts/Node.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function mockContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    clearRect: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    ellipse: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

function createMockDiagram(): Diagram {
  const layer = new Layer(LayerNames.Default, 0);
  const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
  layer.add(node);

  const canvas = document.createElement('canvas');
  return {
    getLayers: () => [layer],
    getViewport: () => ({ x: 0, y: 0, width: 500, height: 400, scale: 1 }),
    setViewport: vi.fn(),
    getRenderer: () => ({ getCanvas: () => canvas }),
  } as unknown as Diagram;
}

describe('Overview', () => {
  it('should create canvas in container', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const overview = new Overview(container, diagram);

    expect(overview.getCanvas()).toBeInstanceOf(HTMLCanvasElement);
    expect(container.contains(overview.getCanvas())).toBe(true);
  });

  it('should use custom width and height', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const overview = new Overview(container, diagram, { width: 300, height: 200 });

    expect(overview.getCanvas().width).toBe(300);
    expect(overview.getCanvas().height).toBe(200);
  });

  it('should render without errors', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const overview = new Overview(container, diagram);

    expect(() => overview.render()).not.toThrow();
  });

  it('should destroy and remove canvas', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const overview = new Overview(container, diagram);

    overview.destroy();
    expect(container.children).toHaveLength(0);
  });
});

describe('createOverview', () => {
  it('should create overview', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const overview = createOverview(container, diagram);

    expect(overview).toBeInstanceOf(Overview);
    expect(container.contains(overview.getCanvas())).toBe(true);
  });
});
