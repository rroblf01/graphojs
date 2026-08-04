// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { Diagram, GraphLinksModel, GraphObject, Shape, TextBlock, Panel } from '../src/index.ts';

const diagrams: Diagram[] = [];

function createDiagram(): Diagram {
  const diagram = new Diagram({ div: document.createElement('div') });
  diagrams.push(diagram);
  return diagram;
}

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
    arc: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
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

afterEach(() => {
  for (const d of diagrams) {
    d.destroy();
  }
  diagrams.length = 0;
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Diagram GoJS-compatible transactions', () => {
  it('should support startTransaction/commitTransaction', () => {
    const diagram = createDiagram();
    const model = new GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    diagram.setModel(model);

    const started = diagram.startTransaction('test');
    expect(started).toBe(true);
    const committed = diagram.commitTransaction('test');
    expect(committed).toBe(true);
  });

  it('should support commit() helper', () => {
    const diagram = createDiagram();
    const model = new GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    diagram.setModel(model);

    diagram.commit((d) => {
      expect(d).toBe(diagram);
    }, 'test commit');
  });
});

describe('Diagram GoJS-compatible templates', () => {
  it('should apply nodeTemplate to created nodes', () => {
    const diagram = createDiagram();

    const $ = GraphObject.make;
    const template = $(
      Panel,
      'Auto',
      $(Shape, 'RoundedRectangle', { fill: 'red', stroke: 'black' }),
      $(TextBlock, 'Default', { name: 'label', font: '14px sans-serif' }),
    );
    diagram.nodeTemplate = template;

    const model = new GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    diagram.setModel(model);

    const node = diagram.getPart(1) as import('../src/parts/Node.ts').Node;
    expect(node).not.toBeNull();
    expect(node.panel).not.toBeNull();
    expect(node.panel?.type).toBe('Auto');
    expect(node.panel?.elementCount).toBe(2);
    expect(node.panel?.elements[0]).toBeInstanceOf(Shape);
    expect(node.findObject('label')).toBeInstanceOf(TextBlock);
  });

  it('should apply category-specific template from nodeTemplateMap', () => {
    const diagram = createDiagram();

    const $ = GraphObject.make;
    const diamond = $(Panel, 'Auto', $(Shape, 'diamond', { fill: 'yellow' }));
    diagram.addNodeTemplate('special', diamond);

    const model = new GraphLinksModel();
    model.nodeDataArray = [
      { key: 1, x: 0, y: 0, width: 100, height: 50 },
      { key: 2, x: 200, y: 0, width: 100, height: 50, category: 'special' },
    ];
    diagram.setModel(model);

    const node1 = diagram.getPart(1) as import('../src/parts/Node.ts').Node;
    const node2 = diagram.getPart(2) as import('../src/parts/Node.ts').Node;

    expect(node1.panel).toBeNull();
    expect(node2.panel).not.toBeNull();
    const shape = node2.panel?.elements[0];
    expect(shape).toBeInstanceOf(Shape);
    expect((shape as Shape).shape).toBe('diamond');
  });

  it('should clone templates so nodes do not share the same panel instance', () => {
    const diagram = createDiagram();

    const $ = GraphObject.make;
    const template = $(Panel, 'Auto', $(Shape, 'rect'));
    diagram.nodeTemplate = template;

    const model = new GraphLinksModel();
    model.nodeDataArray = [
      { key: 1, x: 0, y: 0, width: 100, height: 50 },
      { key: 2, x: 200, y: 0, width: 100, height: 50 },
    ];
    diagram.setModel(model);

    const node1 = diagram.getPart(1) as import('../src/parts/Node.ts').Node;
    const node2 = diagram.getPart(2) as import('../src/parts/Node.ts').Node;

    expect(node1.panel).not.toBe(node2.panel);
  });
});
