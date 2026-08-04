// @vitest-environment jsdom
/**
 * End-to-end migration test: this uses the exact same code pattern as the
 * official GoJS "Getting Started" tutorial, but imports from graphojs.
 * If this passes, GoJS code can migrate with only the import path changed.
 */
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import * as go from '../src/go.ts';
import type { Diagram } from '../src/go.ts';

const diagrams: Diagram[] = [];

function createDiagram(): Diagram {
  const div = document.createElement('div');
  div.style.width = '600px';
  div.style.height = '400px';
  document.body.appendChild(div);
  const diagram = new go.Diagram(div);
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
    arcTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    clip: vi.fn(),
    closePath: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    font: '',
    textBaseline: '',
    textAlign: '',
    lineJoin: '',
    lineCap: '',
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 600,
    height: 400,
    top: 0,
    left: 0,
    right: 600,
    bottom: 400,
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
  for (const d of diagrams) d.destroy();
  diagrams.length = 0;
  document.body.innerHTML = '';
});

afterAll(() => vi.restoreAllMocks());

describe('GoJS Getting Started tutorial migration', () => {
  it('builds a node template with GraphObject.make and bindings', () => {
    const myDiagram = createDiagram();
    myDiagram.undoManager.isEnabled = true;

    const $ = go.GraphObject.make;

    // GoJS tutorial node template (verbatim pattern)
    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
      $(go.TextBlock, 'Default Text', { margin: 12 }, new go.Binding('text', 'name')),
    );

    // The template should be stored
    expect(myDiagram.nodeTemplate).not.toBeNull();
  });

  it('applies element-level bindings from the node template', () => {
    const myDiagram = createDiagram();
    const $ = go.GraphObject.make;

    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
      $(go.TextBlock, 'Default Text', { name: 'label' }, new go.Binding('text', 'name')),
    );

    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, name: 'Alpha', x: 0, y: 0, width: 100, height: 60 }];
    myDiagram.model = model;

    const part = myDiagram.getPart(1);
    expect(part).not.toBeNull();

    // The TextBlock label should have its text bound to the "name" property
    const node = part as import('../src/parts/Node.ts').Node;
    const textBlock = node.findObject('label') as import('../src/panel/TextBlock.ts').TextBlock;
    expect(textBlock).not.toBeNull();
    expect(textBlock.text).toBe('Alpha');
  });

  it('supports the GoJS model assignment pattern', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();

    // GoJS pattern: diagram.model = model; then model.nodeDataArray = [...]
    myDiagram.model = model;
    model.nodeDataArray = [
      { key: 1, name: 'Alpha', x: 0, y: 0, width: 100, height: 50 },
      { key: 2, name: 'Beta', x: 200, y: 0, width: 100, height: 50 },
    ];

    const node1 = myDiagram.getPart(1);
    const node2 = myDiagram.getPart(2);
    expect(node1).not.toBeNull();
    expect(node2).not.toBeNull();
    expect(myDiagram.model).toBe(model);
  });

  it('creates links with routing and arrowheads via constants', () => {
    const myDiagram = createDiagram();
    const $ = go.GraphObject.make;

    myDiagram.nodeTemplate = $(go.Node, 'Auto', $(go.Shape, 'Rectangle'));
    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape, { strokeWidth: 3 }),
      $(go.Shape, 'Arrow', { toArrow: go.Link.StandardArrowHead }),
    );

    const model = new go.GraphLinksModel();
    model.nodeDataArray = [
      { key: 1, x: 0, y: 0, width: 100, height: 50 },
      { key: 2, x: 200, y: 0, width: 100, height: 50 },
    ];
    model.linkDataArray = [{ from: 1, to: 2, routing: 'orthogonal' }];
    myDiagram.model = model;

    const link = myDiagram.getPart(3);
    expect(link).not.toBeNull();
  });

  it('supports diagram.commit and addDiagramListener', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, name: 'Alpha', x: 0, y: 0, width: 100, height: 50 }];
    myDiagram.model = model;

    let clicked = 0;
    myDiagram.addDiagramListener('SelectionChanged', () => {
      clicked++;
    });

    myDiagram.commit((d) => {
      d.model.setDataProperty(d.model.nodeDataArray[0], 'name', 'Updated');
    }, 'update name');

    expect(model.nodeDataArray[0].name).toBe('Updated');
    expect(clicked).toBe(0);
  });

  it('parses geometry from strings like GoJS', () => {
    const p = go.Point.parse('10, 20');
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);

    const r = go.Rect.parse('1 2 3 4');
    expect(r.x).toBe(1);
    expect(r.y).toBe(2);
    expect(r.width).toBe(3);
    expect(r.height).toBe(4);

    const s = go.Size.parse('50, 30');
    expect(s.width).toBe(50);
    expect(s.height).toBe(30);

    const m = go.Margin.parse('5');
    expect(m.top).toBe(5);
    expect(m.right).toBe(5);
    expect(m.bottom).toBe(5);
    expect(m.left).toBe(5);
  });
});
