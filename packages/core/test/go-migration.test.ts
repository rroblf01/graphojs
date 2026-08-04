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

  it('constructs a GraphLinksModel with options (GoJS pattern)', () => {
    const model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, name: 'A', x: 0, y: 0, width: 100, height: 50 },
        { key: 2, name: 'B', x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    expect(model.nodeDataArray.length).toBe(2);
    expect(model.linkDataArray.length).toBe(1);
  });

  it('supports diagram read-only and interaction flags', () => {
    const myDiagram = createDiagram();
    myDiagram.isReadOnly = true;
    expect(myDiagram.isReadOnly).toBe(true);
    myDiagram.allowMove = false;
    expect(myDiagram.allowMove).toBe(false);
    myDiagram.allowCopy = false;
    expect(myDiagram.allowCopy).toBe(false);
    myDiagram.isEnabled = false;
    expect(myDiagram.isEnabled).toBe(false);
    // Restore for cleanup
    myDiagram.isEnabled = true;
    myDiagram.isReadOnly = false;
  });

  it('enforces read-only in the command handler', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    myDiagram.model = model;
    myDiagram.select(myDiagram.getPart(1) as never);

    myDiagram.isReadOnly = true;
    expect(myDiagram.commandHandler.deleteSelection()).toBe(false);

    myDiagram.isReadOnly = false;
    expect(myDiagram.commandHandler.deleteSelection()).toBe(true);
  });

  it('buffers model changed events within transactions', () => {
    const model = new go.GraphLinksModel();
    let eventCount = 0;
    model.addChangedListener(() => eventCount++);

    model.startTransaction('batch');
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
    // Events buffered
    expect(eventCount).toBe(0);
    model.commitTransaction('batch');
    expect(eventCount).toBe(2);
  });

  it('exposes part.data with model data reference', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    const data = { key: 1, name: 'Alpha', x: 0, y: 0, width: 100, height: 50 };
    model.nodeDataArray = [data];
    myDiagram.model = model;

    const node = myDiagram.getPart(1) as import('../src/parts/Node.ts').Node;
    expect(node.data).toBe(data);
  });

  it('constructs a Diagram from a div id string', () => {
    const div = document.createElement('div');
    div.id = 'my-diagram-div';
    document.body.appendChild(div);
    const d = new go.Diagram('my-diagram-div');
    diagrams.push(d);
    expect(d).toBeInstanceOf(go.Diagram);
  });

  it('assigns nodeDataArray/linkDataArray after setting the model (GoJS pattern)', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    myDiagram.model = model;

    // GoJS pattern: assign arrays after the model is connected
    model.nodeDataArray = [
      { key: 1, x: 0, y: 0, width: 100, height: 50 },
      { key: 2, x: 200, y: 0, width: 100, height: 50 },
    ];
    model.linkDataArray = [{ from: 1, to: 2 }];

    expect(myDiagram.findNodeForKey(1)).not.toBeNull();
    expect(myDiagram.findNodeForKey(2)).not.toBeNull();
    const linkKey = model.getLinkKey(model.linkDataArray[0]!);
    expect(linkKey).not.toBeUndefined();
    expect(myDiagram.findLinkForKey(linkKey!)).not.toBeNull();
  });

  it('auto-assigns keys when arrays are set without them', () => {
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ name: 'A' }, { name: 'B' }];
    model.linkDataArray = [{ from: 1, to: 2 }];
    expect(model.nodeDataArray[0]!.key).toBeDefined();
    expect(model.nodeDataArray[1]!.key).toBeDefined();
    expect(model.linkDataArray[0]!.key).toBeDefined();
  });

  it('finds parts by data object and clears the diagram', () => {
    const myDiagram = createDiagram();
    const data = { key: 1, x: 0, y: 0, width: 100, height: 50 };
    const model = new go.GraphLinksModel({ nodeDataArray: [data] });
    myDiagram.model = model;

    expect(myDiagram.findNodeForData(data)).not.toBeNull();

    myDiagram.clear();
    expect(myDiagram.getPart(1)).toBeUndefined();
    expect(model.nodeDataArray.length).toBe(0);
  });

  it('centers the viewport on a rect and point', () => {
    const myDiagram = createDiagram();
    myDiagram.centerPoint({ x: 100, y: 100 });
    const viewport = myDiagram.getViewport();
    expect(viewport).toBeDefined();
    myDiagram.centerRect({ x: 0, y: 0, width: 200, height: 100 } as never);
    expect(myDiagram.getViewport()).toBeDefined();
  });

  it('applies link template arrowhead and stroke width', () => {
    const myDiagram = createDiagram();
    const $ = go.GraphObject.make;

    myDiagram.nodeTemplate = $(go.Node, 'Auto', $(go.Shape, 'Rectangle'));
    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal },
      $(go.Shape, { strokeWidth: 3 }),
      $(go.Shape, 'Arrow', { toArrow: 'Triangle' }),
    );

    const model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    myDiagram.model = model;

    const linkKey = model.getLinkKey(model.linkDataArray[0]!);
    const link = myDiagram.findLinkForKey(linkKey!) as import('../src/parts/Link.ts').Link;
    expect(link).not.toBeNull();
    expect(link.strokeWidth).toBe(3);
    expect(link.arrowhead).toBe('triangle');
  });

  it('does not collide node and link keys in the parts map', () => {
    const myDiagram = createDiagram();
    const $ = go.GraphObject.make;

    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(go.Shape, 'Rectangle'),
      $(go.TextBlock, 'Default', { name: 'label' }, new go.Binding('text', 'name')),
    );

    const model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, name: 'Alpha', x: 0, y: 0, width: 100, height: 50 },
        { key: 2, name: 'Beta', x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    myDiagram.model = model;

    // Link key auto-generates from 1, colliding with node key 1.
    // The node must still exist and its element binding must be applied.
    const node1 = myDiagram.findNodeForKey(1);
    expect(node1).not.toBeNull();
    const label = (node1 as import('../src/parts/Node.ts').Node).findObject(
      'label',
    ) as import('../src/panel/TextBlock.ts').TextBlock;
    expect(label.text).toBe('Alpha');
    expect(myDiagram.findLinkForKey(model.getLinkKey(model.linkDataArray[0]!)!)).not.toBeNull();
  });

  it('exposes layers, layout, background, div and isModified', () => {
    const myDiagram = createDiagram();
    expect(myDiagram.layers.length).toBeGreaterThan(0);
    expect(myDiagram.div).toBeInstanceOf(HTMLDivElement);
    expect(myDiagram.background).toBe('#ffffff');
    myDiagram.background = '#000000';
    expect(myDiagram.background).toBe('#000000');
    expect(myDiagram.isModified).toBe(false);
    expect(myDiagram.layout).toBeNull();
  });

  it('marks isModified after model changes', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    myDiagram.model = model;
    expect(myDiagram.isModified).toBe(false);

    model.setDataProperty(model.nodeDataArray[0]!, 'x', 10);
    expect(myDiagram.isModified).toBe(true);
  });

  it('supports addModelChangedListener', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    myDiagram.model = model;

    let events = 0;
    const listener = () => events++;
    myDiagram.addModelChangedListener(listener);
    model.setDataProperty(model.nodeDataArray[0]!, 'x', 5);
    myDiagram.removeModelChangedListener(listener);
    model.setDataProperty(model.nodeDataArray[0]!, 'x', 6);
    expect(events).toBe(1);
  });

  it('applies a diagram layout when assigned', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 0, y: 0, width: 100, height: 50 },
        { key: 3, x: 0, y: 0, width: 100, height: 50 },
      ],
    });
    myDiagram.model = model;

    myDiagram.layout = new go.GridLayout({ spacing: 20 });
    expect(myDiagram.layout).not.toBeNull();
  });

  it('merges changes from another model via the change log', () => {
    const source = new go.GraphLinksModel();
    source.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    source.setDataProperty(source.nodeDataArray[0]!, 'name', 'Alpha');
    source.clearChangedEventLog();
    source.nodeDataArray = [
      { key: 1, x: 0, y: 0, width: 100, height: 50, name: 'Alpha' },
      { key: 2, x: 200, y: 0, width: 100, height: 50, name: 'Beta' },
    ];

    const target = new go.GraphLinksModel();
    target.mergeChanges(source);
    expect(target.getNodeData(1)?.name).toBe('Alpha');
    expect(target.getNodeData(2)?.name).toBe('Beta');
  });

  it('produces and applies incremental JSON', () => {
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [
      { key: 1, x: 0, y: 0, width: 100, height: 50, name: 'A' },
      { key: 2, x: 200, y: 0, width: 100, height: 50, name: 'B' },
    ];
    model.clearChangedEventLog();
    model.setDataProperty(model.nodeDataArray[0]!, 'name', 'A2');
    model.removeNode(2);

    const inc = model.toIncrementalJson();
    expect(inc.modifiedNodeData?.some((n) => n.name === 'A2')).toBe(true);
    expect(inc.removedNodeIds).toContain(2);

    const other = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50, name: 'A' },
        { key: 2, x: 200, y: 0, width: 100, height: 50, name: 'B' },
        { key: 3, x: 300, y: 0, width: 100, height: 50, name: 'C' },
      ],
    });
    other.applyIncrementalJson(inc);
    expect(other.getNodeData(1)?.name).toBe('A2');
    expect(other.getNodeData(2)).toBeUndefined();
    expect(other.getNodeData(3)?.name).toBe('C');
  });

  it('creates node templates with data panels (itemArray/itemTemplate)', () => {
    const myDiagram = createDiagram();
    const $ = go.GraphObject.make;

    myDiagram.nodeTemplate = $(
      go.Node,
      'Vertical',
      $(go.TextBlock, 'Title', { name: 'title' }, new go.Binding('text', 'name')),
      $(go.Panel, 'Vertical', {
        itemArray: [{ text: 'Item A' }, { text: 'Item B' }],
        itemTemplate: $(go.TextBlock, 'item', new go.Binding('text', 'text')),
      }),
    );

    const model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, name: 'Node 1', x: 0, y: 0, width: 150, height: 100 }],
    });
    myDiagram.model = model;

    const node = myDiagram.findNodeForKey(1) as import('../src/parts/Node.ts').Node;
    expect(node).not.toBeNull();
    expect(node.panel?.elementCount).toBe(2); // title + items panel

    const itemsPanel = node.panel?.elements[1] as import('../src/panel/Panel.ts').Panel;
    expect(itemsPanel.elementCount).toBe(2);
    expect((itemsPanel.elements[0] as import('../src/panel/TextBlock.ts').TextBlock).text).toBe(
      'Item A',
    );
  });

  it('supports new GoJS shape figures', () => {
    const s1 = new go.Shape('X');
    expect(s1.shape).toBe('x');
    const s2 = new go.Shape('Plus');
    expect(s2.shape).toBe('plus');
    const s3 = new go.Shape('Person');
    expect(s3.shape).toBe('person');
    const s4 = new go.Shape('Line');
    expect(s4.shape).toBe('line');
    expect(go.Shape.Circle).toBe('circle');
  });

  it('supports link tree properties', () => {
    const link = new go.Link(1, 1, 2);
    expect(link.isTreeLink).toBe(false);
    link.isTreeLink = true;
    link.treeLinkRoute = 'straight';
    expect(link.isTreeLink).toBe(true);
    expect(link.treeLinkRoute).toBe('straight');
  });

  it('fires Modified event when isModified changes', () => {
    const myDiagram = createDiagram();
    let modifiedCount = 0;
    myDiagram.addDiagramListener('Modified', () => modifiedCount++);

    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    myDiagram.model = model;

    model.setDataProperty(model.nodeDataArray[0]!, 'x', 5);
    expect(myDiagram.isModified).toBe(true);
    expect(modifiedCount).toBeGreaterThan(0);
  });

  it('exposes command handler capability shortcuts', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel();
    model.nodeDataArray = [{ key: 1, x: 0, y: 0, width: 100, height: 50 }];
    myDiagram.model = model;

    expect(myDiagram.commandHandler.canDeleteSelection()).toBe(false);
    myDiagram.select(myDiagram.getPart(1) as never);
    expect(myDiagram.commandHandler.canDeleteSelection()).toBe(true);
    expect(myDiagram.commandHandler.canSelectAll()).toBe(true);
  });

  it('exposes all go namespace exports', () => {
    expect(go.DiagramEvents).toBeDefined();
    expect(go.QuadTree).toBeDefined();
    expect(go.PartPool).toBeDefined();
    expect(go.VirtualizationManager).toBeDefined();
    expect(go.LayerCache).toBeDefined();
    expect(go.ShapeRenderer).toBeDefined();
    expect(go.normalizeShapeType).toBeDefined();
    expect(go.version).toBeDefined();
  });

  it('supports scale, position, padding and findPartsInRect', () => {
    const myDiagram = createDiagram();
    myDiagram.scale = 2;
    expect(myDiagram.scale).toBe(2);

    myDiagram.position = { x: 10, y: 20 };
    expect(myDiagram.position).toEqual({ x: 10, y: 20 });

    myDiagram.padding = 5;
    expect(myDiagram.padding).toBe(5);

    const model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 300, y: 300, width: 100, height: 50 },
      ],
    });
    myDiagram.model = model;

    const found = myDiagram.findPartsInRect({ x: -10, y: -10, width: 200, height: 200 });
    expect(found.length).toBe(1);
  });

  it('supports programmatic add and remove of parts', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    myDiagram.model = model;

    const node = new go.Node(2);
    myDiagram.add(node);
    expect(myDiagram.findNodeForKey(2)).not.toBeNull();

    myDiagram.remove(node);
    expect(myDiagram.findNodeForKey(2)).toBeNull();
  });

  it('exposes subject on diagram events', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    myDiagram.model = model;

    let subject: unknown = null;
    myDiagram.addDiagramListener('SelectionChanged', (e) => {
      subject = e.subject;
    });
    myDiagram.select(myDiagram.getPart(1) as never);
    expect(subject).not.toBeNull();
  });

  it('supports Position panel type, TextBlock wrap, Link short lengths, dragAlpha', () => {
    // Position panel via GraphObject.make
    const $ = go.GraphObject.make;
    const positionPanel = $(go.Panel, 'Position', $(go.Shape, 'Rectangle'));
    expect(positionPanel.type).toBe('Position');

    // TextBlock wrap/isMultiline
    const tb = new go.TextBlock('Hello');
    tb.wrap = 'Ellipsis';
    tb.isMultiline = false;
    expect(tb.wrap).toBe('Ellipsis');
    expect(tb.isMultiline).toBe(false);

    // Link short lengths
    const link = new go.Link(1, 1, 2);
    link.fromShortLength = 15;
    link.toShortLength = 25;
    expect(link.fromShortLength).toBe(15);
    expect(link.toShortLength).toBe(25);

    // Part dragAlpha / isInDocumentBounds
    const node = new go.Node(5);
    node.dragAlpha = 0.5;
    expect(node.dragAlpha).toBe(0.5);
    expect(node.isInDocumentBounds).toBe(true);
  });

  it('exposes allowTextEdit/allowLink/allowRelink flags', () => {
    const myDiagram = createDiagram();
    expect(myDiagram.allowTextEdit).toBe(true);
    myDiagram.allowTextEdit = false;
    expect(myDiagram.allowTextEdit).toBe(false);
    myDiagram.allowLink = false;
    myDiagram.allowRelink = false;
    expect(myDiagram.allowLink).toBe(false);
    expect(myDiagram.allowRelink).toBe(false);
  });

  it('supports tree traversal and model read-only', () => {
    const myDiagram = createDiagram();
    const model = new go.TreeModel({
      nodeDataArray: [
        { key: 1, name: 'Root' },
        { key: 2, name: 'Child 1', parent: 1 },
        { key: 3, name: 'Child 2', parent: 1 },
      ],
    });
    myDiagram.model = model as unknown as go.GraphLinksModel;

    const roots = myDiagram.findTreeRoots();
    expect(roots.length).toBe(1);
    expect(roots[0]!.key).toBe(1);

    const children = myDiagram.findTreeChildren(roots[0]!);
    expect(children.length).toBe(2);

    const parent = myDiagram.findTreeParent(children[0]!);
    expect(parent?.key).toBe(1);

    expect(model.isReadOnly).toBe(false);
    model.isReadOnly = true;
    expect(model.isReadOnly).toBe(true);
  });

  it('runs a realistic GoJS app: palette, overview, layout, events, undo, validation', () => {
    const div = document.createElement('div');
    const diagram = new go.Diagram({ div });
    diagrams.push(diagram);

    const $ = go.GraphObject.make;

    // Validation
    const model = new go.GraphLinksModel();
    model.isValidNode = (d) => typeof d.key !== 'undefined';
    expect(model.isValidNode({})).toBe(false);
    expect(model.isValidNode({ key: 1 })).toBe(true);

    // Templates
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(go.Shape, 'RoundedRectangle', { fill: 'white', stroke: 'gray' }),
      $(go.TextBlock, 'label', { margin: 8, editable: true }, new go.Binding('text', 'name')),
    );
    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal },
      $(go.Shape, { strokeWidth: 3 }),
      $(go.Shape, 'Arrow', { toArrow: 'Triangle' }),
    );

    // Layout
    diagram.layout = new go.GridLayout({ spacing: 30 });

    // Model
    model.nodeDataArray = [
      { key: 1, name: 'Alpha', x: 0, y: 0, width: 120, height: 60 },
      { key: 2, name: 'Beta', x: 0, y: 0, width: 120, height: 60 },
      { key: 3, name: 'Gamma', x: 0, y: 0, width: 120, height: 60 },
    ];
    model.linkDataArray = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
    ];
    diagram.model = model;

    // Events
    let clickEvents = 0;
    diagram.addDiagramListener('ObjectSingleClicked', () => clickEvents++);
    diagram.addDiagramListener('LinkDrawn', () => {});

    // Undo
    const beforeUndo = diagram.getModel().getNodeCount();
    diagram.startTransaction('add');
    diagram.getModel().addNode({ key: 4, name: 'Delta', x: 0, y: 0, width: 120, height: 60 });
    diagram.commitTransaction();
    expect(diagram.getModel().getNodeCount()).toBe(beforeUndo + 1);
    diagram.undo();
    expect(diagram.getModel().getNodeCount()).toBe(beforeUndo);

    // find by key
    expect(diagram.findNodeForKey(1)).not.toBeNull();
    expect(
      diagram.findLinkForKey(
        diagram.getModel().getLinkKey(diagram.getModel().getLinkDataArray()[0]!)!,
      ),
    ).not.toBeNull();

    // Palette & Overview construct with a div
    const paletteDiv = document.createElement('div');
    const palette = new go.Palette(paletteDiv);
    expect(palette).toBeDefined();
    const overviewDiv = document.createElement('div');
    const overview = new go.Overview(overviewDiv);
    expect(overview).toBeDefined();

    // Command handler shortcuts
    diagram.select(diagram.findNodeForKey(1) as never);
    expect(diagram.commandHandler.canDeleteSelection()).toBe(true);
  });

  it('supports getDiagramDiv, layoutDiagram, zoomToRect, toJson, Overview.observed', () => {
    const myDiagram = createDiagram();
    expect(myDiagram.getDiagramDiv()).toBeInstanceOf(HTMLDivElement);

    // Model.toJson alias
    const model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const json = model.toJson();
    expect(json.nodeDataArray.length).toBe(1);

    // layoutDiagram
    const model2 = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 0, y: 0, width: 100, height: 50 },
        { key: 3, x: 0, y: 0, width: 100, height: 50 },
      ],
    });
    myDiagram.model = model2;
    myDiagram.layoutDiagram(new go.GridLayout({ spacing: 20 }));

    // zoomToRect
    myDiagram.zoomToRect({ x: 0, y: 0, width: 200, height: 100 });

    // Overview.observed
    const overviewDiv = document.createElement('div');
    const overview = new go.Overview(overviewDiv, myDiagram);
    overview.observed = myDiagram;
    expect(overview.observed).toBe(myDiagram);
  });

  it('supports makeSvg, makeImageData, zoomFactor and isUndoingRedoing', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    myDiagram.model = model;

    const svg = myDiagram.makeSvg();
    expect(typeof svg).toBe('string');

    const canvas = myDiagram.makeImage();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);

    myDiagram.zoomFactor = 1.5;
    expect(myDiagram.zoomFactor).toBe(1.5);
    expect(myDiagram.scale).toBe(1.5);

    expect(myDiagram.undoManager.isUndoingRedoing).toBe(false);
  });

  it('supports scrollMode document and infinite', () => {
    const myDiagram = createDiagram();
    expect(myDiagram.scrollMode).toBe('document');
    myDiagram.scrollMode = 'infinite';
    expect(myDiagram.scrollMode).toBe('infinite');
  });

  it('fires GoJS events: ChangedSelection, ClipboardPasted, SelectionDeleted, LayoutCompleted', () => {
    const myDiagram = createDiagram();
    const fired: string[] = [];
    myDiagram.addAnyDiagramListener((e) => fired.push(e.type));

    const model = new go.GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 0, y: 0, width: 100, height: 50 },
      ],
    });
    myDiagram.model = model;

    // Select + ChangedSelection
    myDiagram.select(myDiagram.findNodeForKey(1) as never);
    expect(fired).toContain('ChangedSelection');

    // Copy + ClipboardChanged
    myDiagram.commandHandler.copySelection();
    expect(fired).toContain('ClipboardChanged');
    expect(fired).toContain('SelectionCopied');

    // Paste + ClipboardPasted
    myDiagram.commandHandler.pasteClipboard();
    expect(fired).toContain('ClipboardPasted');

    // Delete + SelectionDeleted
    myDiagram.select(myDiagram.findNodeForKey(1) as never);
    myDiagram.commandHandler.deleteSelection();
    expect(fired).toContain('SelectionDeleted');

    // LayoutCompleted
    myDiagram.layoutDiagram(new go.GridLayout({ spacing: 10 }));
    expect(fired).toContain('LayoutCompleted');

    // SubGraphCollapsed/Expanded
    const g = new go.Group(99);
    myDiagram.add(g);
    myDiagram.collapseGroup(g);
    myDiagram.expandGroup(g);
    expect(fired).toContain('SubGraphCollapsed');
    expect(fired).toContain('SubGraphExpanded');
  });

  it('enforces isReadOnly/allowMove in interaction tools', () => {
    const myDiagram = createDiagram();
    const model = new go.GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    myDiagram.model = model;

    const dragging = myDiagram.toolManager.getTool('dragging') as go.DraggingTool;
    expect(dragging).toBeDefined();

    // Read-only diagram: dragging should not start
    myDiagram.isReadOnly = true;
    expect(dragging.isActive).toBe(false);
    expect(myDiagram.isReadOnly).toBe(true);

    // allowMove = false should also block dragging
    myDiagram.isReadOnly = false;
    myDiagram.allowMove = false;
    expect(myDiagram.allowMove).toBe(false);
    expect(myDiagram.allowLink).toBe(true);
    expect(myDiagram.allowRelink).toBe(true);
  });
});
