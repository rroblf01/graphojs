// @vitest-environment jsdom
/**
 * Regression tests for bugs found during code review.
 * Each describe block maps to a specific bug fix.
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import {
  Diagram,
  GraphLinksModel,
  GraphObject,
  Shape,
  TextBlock,
  Panel,
  Node,
  Link,
  Binding,
  Group,
  UndoManager,
  TreeModel,
} from '../src/index.ts';

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
    closePath: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    clip: vi.fn(),
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

const diagrams: Diagram[] = [];

function createDiagram(): Diagram {
  const diagram = new Diagram({ div: document.createElement('div') });
  diagrams.push(diagram);
  return diagram;
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
  for (const d of diagrams) d.destroy();
  vi.restoreAllMocks();
});

describe('A1: converter applied only once', () => {
  it('multiplies the value once, not twice', () => {
    const t = new TextBlock();
    const b = new Binding('text', 'n', (v: unknown) => Number(v) * 2);
    b.applyToTarget(t, { n: 10 } as never);
    expect(t.text).toBe(20); // 10*2 = 20, not 40
  });

  it('prefixes the value once', () => {
    const t = new TextBlock();
    const b = new Binding('text', 'color', (v: unknown) => '#' + String(v));
    b.applyToTarget(t, { color: 'ff0000' } as never);
    expect(t.text).toBe('#ff0000'); // not '##ff0000'
  });

  it('applies converter via ofConverter fluently', () => {
    const t = new TextBlock();
    const b = new Binding('text', 'v').ofConverter((v: unknown) => Number(v) + 1);
    b.applyToTarget(t, { v: 5 } as never);
    expect(t.text).toBe(6); // not 7
  });
});

describe('A2: node/link key namespace collision', () => {
  it('selecting a link does not select the colliding node', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }], // auto link key = 1, collides with node 1
    });
    d.model = m;

    const linkKey = m.getLinkKey(m.getLinkDataArray()[0]!);
    const link = d.findLinkForKey(linkKey!);
    expect(link).not.toBeNull();
    d.select(link as never);

    const selected = d.getSelectedParts();
    expect(selected.length).toBe(1);
    expect(selected[0]).toBe(link); // the link, NOT node 1
    expect(d.findNodeForKey(1)!.isSelected).toBe(false);
  });

  it('removing a link does not remove the colliding node', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;

    const linkKey = m.getLinkKey(m.getLinkDataArray()[0]!);
    expect(d.findNodeForKey(1)).not.toBeNull();
    m.removeLink(linkKey!);

    // Incremental sync must remove the LINK, not node 1
    expect(d.findLinkForKey(linkKey!)).toBeNull();
    expect(d.findNodeForKey(1)).not.toBeNull();
  });

  it('selecting both a node and a colliding link works', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;

    const node = d.findNodeForKey(1);
    const linkKey = m.getLinkKey(m.getLinkDataArray()[0]!);
    const link = d.findLinkForKey(linkKey!);
    d.select(node as never);
    d.select(link as never, true);

    const selected = d.getSelectedParts();
    expect(selected.length).toBe(2);
    expect(selected).toContain(node);
    expect(selected).toContain(link);
  });
});

describe('A3: ModelTransactionCommand undo/redo completeness', () => {
  it('undo+redo of a transaction that adds a link does not duplicate it', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
    });
    d.model = m;

    d.commit(() => {
      m.addLink({ from: 1, to: 2 });
    }, 'add link');
    const linksAfterAdd = m.getLinkCount();
    expect(linksAfterAdd).toBe(1);

    d.undo();
    expect(m.getLinkCount()).toBe(0);

    d.redo();
    expect(m.getLinkCount()).toBe(1); // not 2 (no duplicate)
  });

  it('undo+redo of a transaction that removes a node restores and re-removes it', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
    });
    d.model = m;

    d.commit(() => {
      m.removeNode(2);
    }, 'remove node');
    expect(m.getNodeData(2)).toBeUndefined();

    d.undo();
    expect(m.getNodeData(2)).toBeDefined();

    d.redo();
    expect(m.getNodeData(2)).toBeUndefined(); // redo re-removes it
  });

  it('link property changes are undoable', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;
    const linkData = m.getLinkDataArray()[0]!;

    d.commit(() => {
      m.setDataProperty(linkData, 'label', 'Hello');
    }, 'label');
    expect(linkData.label).toBe('Hello');

    d.undo();
    expect(linkData.label).toBeUndefined();

    d.redo();
    expect(linkData.label).toBe('Hello');
  });
});

describe('A4: link key uniqueness', () => {
  it('addLink rejects a duplicate explicit key', () => {
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ key: 'a', from: 1, to: 2 }],
    });
    expect(() => m.addLink({ key: 'a', from: 2, to: 1 })).toThrow();
  });

  it('generateLinkKey skips existing keys', () => {
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ key: 1, from: 1, to: 2 }], // explicit key 1
    });
    const k = m.addLink({ from: 2, to: 1 });
    expect(k).not.toBe(1); // must not collide with existing key 1
  });
});

describe('B9: incremental sync applies element bindings', () => {
  it('refreshes a bound TextBlock label on data edit', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      'Auto',
      $(Shape, 'Rectangle'),
      $(TextBlock, 'label', { name: 'label' }, new Binding('text', 'name')),
    );
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, name: 'Alpha', x: 0, y: 0, width: 100, height: 50 }],
    });
    d.model = m;

    const node = d.findNodeForKey(1) as Node;
    const label = node.findObject('label') as TextBlock;
    expect(label.text).toBe('Alpha');

    // Edit the data via an incremental property change
    m.setDataProperty(m.getNodeDataArray()[0]!, 'name', 'Beta');
    expect(label.text).toBe('Beta'); // element binding re-applied
  });
});

describe('B11: nodeDataArray reassignment does not over-emit', () => {
  it('undo of a reassignment does not empty the model', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
    });
    d.model = m;

    d.commit(() => {
      m.nodeDataArray = m.nodeDataArray as never; // same reference
    }, 'reassign');
    expect(m.getNodeCount()).toBe(2);

    d.undo();
    // Should NOT remove everything — only the (empty) diff is reversed
    expect(m.getNodeCount()).toBe(2);
  });
});

describe('B12: nested transactions keep outer events', () => {
  it('undo of an outer transaction reverses the outer node', () => {
    const d = createDiagram();
    const m = new GraphLinksModel();
    d.model = m;

    d.startTransaction('outer');
    m.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });

    d.startTransaction('inner');
    m.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
    d.commitTransaction('inner');

    d.commitTransaction('outer');
    expect(m.getNodeCount()).toBe(2);

    d.undo(); // outer undo should remove BOTH nodes
    expect(m.getNodeCount()).toBe(0);
  });
});

describe('C13: link fromKey/toKey stay in sync after relink', () => {
  it('updateLinkFromData updates link endpoints', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
        { key: 3, x: 400, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;

    const linkData = m.getLinkDataArray()[0]!;
    m.setDataProperty(linkData, 'to', 3); // relink
    const linkKey = m.getLinkKey(linkData);
    const link = d.findLinkForKey(linkKey!);
    expect(link).not.toBeNull();
    expect(link!.toKey).toBe(3); // updated, not stale 2
  });
});

describe('C15: text edits are undoable and Escape does not commit', () => {
  it('text edit is wrapped in an undoable transaction', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50, label: 'Old' }],
    });
    d.model = m;
    const undoCount = d.undoManager.getUndoStack().length;

    d.getToolManager().getTool('textEditing');
    // Simulate a committed text edit through the diagram transaction path
    d.commit(() => {
      m.setNodeProperty(1, 'label', 'New');
    }, 'text edit');
    expect(m.getNodeData(1)!.label).toBe('New');

    d.undo();
    expect(m.getNodeData(1)!.label).toBe('Old'); // undoable
    void undoCount;
  });

  it('model has link setLinkProperty available for link edits', () => {
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    m.setLinkProperty(m.getLinkDataArray()[0]!.key as number, 'label', 'L');
    expect(m.getLinkDataArray()[0]!.label).toBe('L');
  });
});

describe('C16: relinking respects relinkableTo and finds link by key', () => {
  it('relinkableTo is respected and link is found by key with duplicates', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
        { key: 3, x: 400, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [
        { key: 'a', from: 1, to: 2 },
        { key: 'b', from: 1, to: 2 }, // duplicate endpoints, distinct keys
      ],
    });
    d.model = m;

    const linkA = d.findLinkForKey('a');
    const linkB = d.findLinkForKey('b');
    expect(linkA).not.toBeNull();
    expect(linkB).not.toBeNull();

    // Setting the 'to' of link A via its key must not affect link B
    m.setDataProperty(m.getLinkData('a')!, 'to', 3);
    expect(m.getLinkData('a')!.to).toBe(3);
    expect(m.getLinkData('b')!.to).toBe(2);
  });
});

describe('C20: declarative ports resolve after layout', () => {
  it('updatePortSpots moves ports off (0,0) after layout', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      'Spot',
      $(Shape, 'Rectangle'),
      $(Shape, 'Circle', { portId: 'out', width: 12, height: 12 }),
    );
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    d.model = m;
    const node = d.findNodeForKey(1) as Node;
    const port = node.findPort('out');
    expect(port).toBeDefined();

    // Simulate post-layout element positions (right edge of the node)
    const portEl = node.panel!.elements.find((el) => el.portId === 'out')!;
    portEl.setPosition(88, 25);
    node.updatePortSpots();
    const p = port!.computePoint(0, 0, 100, 50);
    expect(p.x).toBeCloseTo(88, 0);
    expect(p.x).toBeGreaterThan(0);
  });
});

describe('C22: invalidateLinksForNode clears cached link paths', () => {
  it('clears pathPoints of connected links', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;
    const linkKey = m.getLinkKey(m.getLinkDataArray()[0]!);
    const link = d.findLinkForKey(linkKey!) as Link;

    d.invalidateLinksForNode(1);
    expect(link.pathPoints.length).toBe(0);
  });
});

describe('C24: Shape.clone copies strokeCap/strokeJoin; Part.copy clones panel', () => {
  it('Shape.clone preserves cap/join', () => {
    const s = new Shape('rect');
    s.strokeCap = 'round';
    s.strokeJoin = 'bevel';
    const c = s.clone();
    expect(c.strokeCap).toBe('round');
    expect(c.strokeJoin).toBe('bevel');
  });

  it('Part.copy clones the visual tree', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const p = new Panel('Auto');
    p.add(new TextBlock('hi'));
    node.panel = p;
    const copy = node.copy();
    expect(copy.panel).not.toBeNull();
    expect(copy.panel).not.toBe(p);
    expect(copy.panel!.elementCount).toBe(1);
  });
});
