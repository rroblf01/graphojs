// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { createOverview, Overview } from '../../src/export/Overview.ts';
import { Layer, LayerNames } from '../../src/layer/Layer.ts';
import { Node } from '../../src/parts/Node.ts';

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

  it('should pan to the point actually clicked when content is letterboxed (wide content, near-square overview)', () => {
    // Wide content (1000x100) in a 200x150 overview letterboxes vertically:
    // scale = min(200/1000, 150/100) = 0.2, offsetY = (150 - 100*0.2)/2 = 65.
    // So content is drawn on screen at y:65..85 — clicking the very top edge
    // of that visible strip (screen y=65) must map to diagram y=0, not to
    // whatever a naive linear (no-offset) mapping over the full 150px would give.
    const layer = new Layer(LayerNames.Default, 0);
    layer.add(Node.fromPosAndSize(1, 0, 0, 1000, 100));
    const setViewport = vi.fn();
    const diagram = {
      getLayers: () => [layer],
      getViewport: () => ({ x: 0, y: 0, width: 500, height: 400, scale: 1 }),
      setViewport,
      getRenderer: () => ({ getCanvas: () => document.createElement('canvas') }),
    } as unknown as Diagram;

    const container = document.createElement('div');
    const overview = new Overview(container, diagram, { width: 200, height: 150 });
    overview.getCanvas().getBoundingClientRect = () =>
      ({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        width: 200,
        height: 150,
        right: 200,
        bottom: 150,
      }) as DOMRect;

    overview
      .getCanvas()
      .dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 65, bubbles: true }));

    expect(setViewport).toHaveBeenCalledTimes(1);
    const [, newY] = setViewport.mock.calls[0] as [number, number, number];
    // newY = centerY - viewport.height/2 = 0 - 200 = -200 when correct.
    // The old (buggy) linear mapping would have produced ~-156.7 instead.
    expect(newY).toBeCloseTo(-200, 0);
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
