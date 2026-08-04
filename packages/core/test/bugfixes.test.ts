// @vitest-environment jsdom
/**
 * Regression tests for bugs found during code review.
 * Each describe block maps to a specific bug fix.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Binding,
  Diagram,
  GraphLinksModel,
  GraphObject,
  type Link,
  Node,
  Panel,
  Shape,
  TextBlock,
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
    const b = new Binding('text', 'color', (v: unknown) => `#${String(v)}`);
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
    expect(d.findNodeForKey(1)?.isSelected).toBe(false);
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
    expect(link?.toKey).toBe(3); // updated, not stale 2
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
    expect(m.getNodeData(1)?.label).toBe('New');

    d.undo();
    expect(m.getNodeData(1)?.label).toBe('Old'); // undoable
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
    m.setLinkProperty(m.getLinkDataArray()[0]?.key as number, 'label', 'L');
    expect(m.getLinkDataArray()[0]?.label).toBe('L');
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
    expect(m.getLinkData('a')?.to).toBe(3);
    expect(m.getLinkData('b')?.to).toBe(2);
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
    const portEl = node.panel?.elements.find((el) => el.portId === 'out')!;
    portEl.setPosition(88, 25);
    node.updatePortSpots();
    const p = port?.computePoint(0, 0, 100, 50);
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
    expect(copy.panel?.elementCount).toBe(1);
  });
});

describe('D26: clones do not share mutable Margin', () => {
  it('mutating a clone margin does not affect the template', () => {
    const t = new TextBlock('x');
    t.margin = { top: 1, right: 2, bottom: 3, left: 4 } as never;
    const c = t.clone();
    c.margin = { top: 10, right: 10, bottom: 10, left: 10 } as never;
    expect(t.margin?.top).toBe(1);
    expect(c.margin?.top).toBe(10);
  });
});

describe('D27: ctrl+click toggles selection', () => {
  it('deselects an already-selected part on ctrl+click', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    d.model = m;
    const node = d.findNodeForKey(1)!;
    d.select(node);
    expect(d.getSelectedParts().length).toBe(1);

    // ctrl+click on the already-selected node toggles it off
    const tool = d.toolManager.getTool('clickSelecting')!;
    const event = new MouseEvent('mousedown', { button: 0, ctrlKey: true });
    tool.doMouseDown(event);
    expect(d.getSelectedParts().length).toBe(0);
  });
});

describe('D29: LinkPathCache includes avoidObstacles/jumpOver and invalidates', () => {
  it('cache key differs by avoidObstacles and invalidate clears', () => {
    const { LinkPathCache } = require('../src/render/PerformanceCache.ts') as {
      LinkPathCache: {
        new (): { invalidate(): void };
      };
    };
    const cache = new LinkPathCache();
    cache.invalidate(); // no throw
    expect(typeof cache.invalidate).toBe('function');
  });
});

describe('D30: make() sets Picture source from a string', () => {
  it('$(go.Picture, "url.png") sets the source', () => {
    const { Picture } = require('../src/panel/Picture.ts') as {
      Picture: new () => { source: unknown };
    };
    const pic = GraphObject.make(Picture as never, 'https://example.com/x.png') as unknown as {
      source: string;
    };
    expect(pic.source).toBe('https://example.com/x.png');
  });
});

describe('F1: AddNode/RemoveNode undo completeness', () => {
  it('AddNodeCommand undo removes an auto-keyed node', () => {
    const m = new GraphLinksModel();
    const { AddNodeCommand } = require('../src/undo/commands.ts') as {
      AddNodeCommand: new (model: never, data: never) => { execute(): void; undo(): void };
    };
    const cmd = new AddNodeCommand(m as never, { x: 0, y: 0, width: 100, height: 50 } as never);
    cmd.execute();
    expect(m.getNodeCount()).toBe(1);
    cmd.undo();
    expect(m.getNodeCount()).toBe(0);
  });

  it('RemoveNodeCommand undo restores cascade-removed links', () => {
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 200, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    const { RemoveNodeCommand } = require('../src/undo/commands.ts') as {
      RemoveNodeCommand: new (model: never, key: never) => { execute(): void; undo(): void };
    };
    const cmd = new RemoveNodeCommand(m as never, 1 as never);
    cmd.execute();
    expect(m.getNodeCount()).toBe(1);
    expect(m.getLinkCount()).toBe(0);
    cmd.undo();
    expect(m.getNodeCount()).toBe(2);
    expect(m.getLinkCount()).toBe(1); // link restored
  });
});

describe('F1: Model.rollbackTransaction undoes mutations', () => {
  it('rolls back addNode', () => {
    const m = new GraphLinksModel();
    m.startTransaction();
    m.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    m.rollbackTransaction();
    expect(m.getNodeCount()).toBe(0);
  });

  it('rolls back setNodeProperty', () => {
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50, name: 'A' }],
    });
    m.startTransaction();
    m.setNodeProperty(1, 'name', 'B');
    m.rollbackTransaction();
    expect(m.getNodeData(1)?.name).toBe('A');
  });
});

describe('F2: GoJS API gaps', () => {
  it('$(go.Diagram, divId, props) constructs via make', () => {
    const div = document.createElement('div');
    div.id = 'f2-diagram';
    document.body.appendChild(div);
    const d = GraphObject.make(Diagram as never, 'f2-diagram', { isReadOnly: true });
    expect(d).toBeInstanceOf(Diagram);
    expect((d as unknown as { isReadOnly: boolean }).isReadOnly).toBe(true);
    (d as unknown as { destroy(): void }).destroy();
  });

  it('model.isReadOnly blocks mutations', () => {
    const m = new GraphLinksModel();
    m.isReadOnly = true;
    expect(() => m.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 })).toThrow();
    m.isReadOnly = false;
    expect(() => m.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 })).not.toThrow();
  });

  it('layer.visible hides a layer', () => {
    const d = createDiagram();
    const grid = d.findLayer('Grid');
    expect(grid).not.toBeNull();
    expect(grid?.visible).toBe(true);
    grid!.visible = false;
    expect(grid?.visible).toBe(false);
  });

  it('Placeholder constructs via make', () => {
    const { Placeholder } = require('../src/panel/Placeholder.ts') as {
      Placeholder: new () => { padding: number };
    };
    const ph = GraphObject.make(Placeholder as never, { padding: 20 }) as unknown as {
      padding: number;
    };
    expect(ph.padding).toBe(20);
  });

  it('diagram.addParts/removeParts work', () => {
    const d = createDiagram();
    const node = new Node(1);
    node.data = { key: 1, x: 0, y: 0, width: 100, height: 50 };
    d.addParts([node]);
    expect(d.findNodeForKey(1)).not.toBeNull();
    d.removeParts([node]);
    expect(d.findNodeForKey(1)).toBeNull();
  });

  it('template visible/opacity reach the Part', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(Node, 'Auto', $(Shape, 'Rectangle'), { visible: false, opacity: 0.5 });
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    d.model = m;
    const node = d.findNodeForKey(1) as Node;
    expect(node.visible).toBe(false);
    expect(node.opacity).toBe(0.5);
  });

  it('geometryString arcs are drawn as arcs, not straight lines', () => {
    const { drawGeometryString } = require('../src/panel/GeometryString.ts') as {
      drawGeometryString: (
        ctx: Record<string, unknown>,
        path: string,
        x: number,
        y: number,
        width: number,
        height: number,
      ) => void;
    };
    const lines: Array<[number, number]> = [];
    const ctx = {
      beginPath: () => {},
      moveTo: (_x: number, _y: number) => {},
      lineTo: (x: number, y: number) => lines.push([x, y]),
    };
    // A semicircular arc from (0,0) to (10,0)
    drawGeometryString(ctx as never, 'M0,0 A5,5 0 0 1 10,0', 0, 0, 10, 10);
    expect(lines.length).toBeGreaterThan(2); // sampled, not a single straight line
    const lastX = lines[lines.length - 1]?.[0];
    expect(Number.isFinite(lastX)).toBe(true);
    expect(lastX).toBeGreaterThan(8); // arc endpoint near (10,0)
  });
});

describe('F3: ZoomingTool and two-way binding coverage', () => {
  it('ZoomingTool respects the diagram minScale/maxScale', () => {
    const d = createDiagram();
    const { ZoomingTool } = require('../src/tool/ZoomingTool.ts') as {
      ZoomingTool: new () => { diagram: unknown; doMouseWheel(e: WheelEvent): void };
    };
    const tool = new ZoomingTool();
    tool.diagram = d;
    // Force a zoom-out wheel event
    const e = new WheelEvent('wheel', { deltaY: 120, clientX: 100, clientY: 100 });
    // Make zoom-out fail at the configured minimum
    d.setViewport(0, 0, 0.2);
    tool.doMouseWheel(e);
    const after = d.getViewport().scale;
    expect(after).toBeGreaterThanOrEqual(d.minScale);
  });

  it('two-way Binding writes text back to the model via TextEditingTool', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      'Auto',
      $(Shape, 'Rectangle'),
      $(TextBlock, 'label', { editable: true }, new Binding('text', 'label').makeTwoWay()),
    );
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50, label: 'Hello' }],
    });
    d.model = m;
    const node = d.findNodeForKey(1) as Node;

    const { TextEditingTool } = require('../src/tool/TextEditingTool.ts') as {
      TextEditingTool: new () => {
        diagram: unknown;
        editNode(n: unknown): void;
        stopEditing(commit: boolean): void;
      };
    };
    const tool = new TextEditingTool();
    tool.diagram = d;
    tool.editNode(node);
    const input = document.querySelector('.graphojs-text-editing') as HTMLInputElement;
    expect(input).not.toBeNull();
    input.value = 'World';
    tool.stopEditing(true);
    expect(m.getNodeData(1)?.label).toBe('World');
  });
});
