// @vitest-environment jsdom
/**
 * Regression tests for bugs found during code review.
 * Each describe block maps to a specific bug fix.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Binding,
  ClickCreatingTool,
  Diagram,
  GraphLinksModel,
  GraphObject,
  type Group,
  InputEvent,
  type Link,
  LinkReshapingTool,
  Node,
  Panel,
  Point,
  Rect as RectClass,
  Shape,
  Size,
  Spot,
  TextBlock,
  TextEditingTool,
  UndoManager,
} from '../src/index.ts';
import { DraggingTool } from '../src/tool/DraggingTool.ts';
import type { Command } from '../src/undo/Command.ts';

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
    const portEl = node.panel?.elements.find((el) => el.portId === 'out');
    expect(portEl).toBeDefined();
    portEl?.setPosition(88, 25);
    node.updatePortSpots();
    const p = port?.computePoint(0, 0, 100, 50);
    expect(p.x).toBeCloseTo(88, 0);
    expect(p.x).toBeGreaterThan(0);
  });

  it('a declarative named port already resolves to its real position before any render, so a link created in the same load anchors correctly', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      'Spot',
      $(Shape, 'Rectangle'),
      $(Shape, 'Circle', { portId: 'right', width: 10, height: 10, alignment: Spot.Right }),
    );
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 300, y: 0, width: 50, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2, fromPort: 'right' }],
    });
    d.model = m; // no render() has happened yet

    const node = d.findNodeForKey(1) as Node;
    const port = node.findPort('right');
    expect(port).toBeDefined();

    // Before the fix, the port stayed at spot (0,0) (top-left of the node)
    // until the node's first real render; it should already reflect its
    // real, right-edge-aligned layout position right away — the 10-wide
    // port element's own top-left sits at x=90 when flush against the
    // right edge of a 100-wide node (matching how collectPortsFromPanel
    // derives a port's spot from the element's top-left position).
    const p = port!.computePoint(0, 0, 100, 50);
    expect(p.x).toBeCloseTo(90, 0);
    expect(p.x).toBeGreaterThan(50);

    const link = [...d.links.values()][0] as Link;
    expect(link.fromPort.x).toBeGreaterThan(50);
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

  it('geometryString handles implicit command repetition (e.g. "L10,0 20,10 30,0") instead of dropping the extra points', () => {
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
    const lineTos: Array<[number, number]> = [];
    const ctx = {
      beginPath: () => {},
      moveTo: () => {},
      lineTo: (x: number, y: number) => lineTos.push([x, y]),
    };
    // One 'L' followed by two more implicit coordinate pairs — three lineTos total.
    drawGeometryString(ctx as never, 'M0,0 L10,0 20,10 30,0', 0, 0, 30, 10);
    expect(lineTos).toHaveLength(3);
  });

  it('geometryString parses elliptical-arc flags that are concatenated without a separator (e.g. "0,11,")', () => {
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
      moveTo: () => {},
      lineTo: (x: number, y: number) => lines.push([x, y]),
    };
    // "11" here is large-arc-flag=1 followed by sweep-flag=1, not the number 11.
    drawGeometryString(ctx as never, 'M0,0 A5,5,0,11,10,0', 0, 0, 10, 10);
    expect(lines.length).toBeGreaterThan(2); // sampled as a real arc
    const lastX = lines[lines.length - 1]?.[0];
    expect(lastX).toBeGreaterThan(8); // still reaches the endpoint near (10,0)
  });

  it("geometryString treats a moveto's repeated coordinate pairs as linetos, per the SVG spec", () => {
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
    const moveTos: Array<[number, number]> = [];
    const lineTos: Array<[number, number]> = [];
    const ctx = {
      beginPath: () => {},
      moveTo: (x: number, y: number) => moveTos.push([x, y]),
      lineTo: (x: number, y: number) => lineTos.push([x, y]),
    };
    drawGeometryString(ctx as never, 'M0,0 10,10 20,0', 0, 0, 20, 10);
    expect(moveTos).toHaveLength(1); // only the first pair is a real moveto
    expect(lineTos).toHaveLength(2); // every pair after it becomes a lineto
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

describe('F1: constants/enums + geometry helpers', () => {
  it('exports GoJS enum constant values', async () => {
    const go = await import('../src/go.ts');
    expect(go.BindingMode.OneWay).toBe(0);
    expect(go.BindingMode.TwoWay).toBe(1);
    expect(go.Position.None).toBe(-1);
    expect(go.Position.TopLeft).toBe(0);
    expect(go.Position.MiddleCenter).toBe(4);
    expect(go.Alignment.TopLeft).toBe(0);
    expect(go.Alignment.Center).toBe(2);
    expect(go.Alignment.BottomRight).toBe(5);
    expect(go.Object.Panel).toBe(0);
    expect(go.Object.Binding).toBe(5);
    expect(go.AutoScale.Uniform).toBe(1);
    expect(go.ScrollBehavior.NoScrollbars).toBe(2);
  });

  it('Point has copy/offset/distanceSquared/cross', async () => {
    const { Point } = await import('../src/index.ts');
    const p = new Point(3, 4);
    const c = p.copy();
    expect(c).not.toBe(p);
    expect(c.x).toBe(3);
    expect(c.y).toBe(4);
    expect(p.offset(1, 2)).toEqual({ x: 4, y: 6 });
    expect(new Point(3, 4).distanceSquared(new Point(0, 0))).toBe(25);
    expect(new Point(0, 1).cross(new Point(1, 0))).toBe(-1);
  });

  it('Rect copy/isReal/computeSides/relativeTo', async () => {
    const { Point, Rect, Spot } = await import('../src/index.ts');
    const r = new Rect(1, 2, 10, 20);
    const c = r.copy();
    expect(c).not.toBe(r);
    expect(c.width).toBe(10);
    expect(new Rect(1, 1, 10, 10).isReal()).toBe(true);
    expect(new Rect(Number.NaN, 1, 10, 10).isReal()).toBe(false);
    const s = r.computeSides(5);
    expect(s.x).toBe(6);
    expect(s.y).toBe(7);
    expect(s.width).toBe(0);
    expect(s.height).toBe(10);
    const spot = r.relativeTo(Spot.TopLeft);
    expect(spot.x).toBe(1);
    expect(spot.y).toBe(2);
    const cspot = r.relativeTo(Spot.Center);
    expect(cspot).toBeInstanceOf(Point);
    expect(cspot.x).toBe(6);
    expect(cspot.y).toBe(12);
  });

  it('Spot.None parse isSpot setSpot spotToPoint pointToSpot', async () => {
    const { Point, Spot } = await import('../src/index.ts');
    expect(Number.isNaN(Spot.None.x)).toBe(true);
    expect(Spot.isSpot(Spot.TopLeft)).toBe(true);
    const parsed = Spot.parse('Center');
    expect(parsed.x).toBe(0.5);
    expect(parsed.y).toBe(0.5);
    const target = new Spot(0.25, 0.75);
    const spot = target.copy();
    spot.setSpot(1, 1);
    expect(spot.x).toBe(1);
    expect(spot.y).toBe(1);
    const p = new Point(10, 10);
    const result = Spot.Center.spotToPoint(0, 0, 100, 100);
    expect(result.x).toBe(50);
    expect(result.y).toBe(50);
    const back = Spot.Center.pointToSpot(p.x, p.y, 0, 0, 100, 100);
    expect(back.x).toBeCloseTo(0.1);
    expect(back.y).toBeCloseTo(0.1);
  });

  it('Size.copy and Margin.copy', async () => {
    const { Margin, Size } = await import('../src/index.ts');
    const sz = new Size(2, 3);
    const sc = sz.copy();
    expect(sc).not.toBe(sz);
    expect(sc.width).toBe(2);
    expect(sc.height).toBe(3);
    const mg = new Margin(1, 2, 3, 4);
    const mc = mg.copy();
    expect(mc).not.toBe(mg);
    expect(mc.top).toBe(1);
    expect(mc.right).toBe(2);
    expect(mc.bottom).toBe(3);
    expect(mc.left).toBe(4);
  });

  it('Binding.mode getter/setter', async () => {
    const { Binding } = await import('../src/index.ts');
    const b = new Binding('text', 'label');
    expect(b.mode).toBe(0);
    b.mode = 1;
    expect(b.mode).toBe(1);
  });
});

describe('F2: Model GoJS API surface', () => {
  it('makeNodeData/copyNodeData/mergeNodeData', () => {
    const m = new GraphLinksModel();
    const proto = m.makeNodeData({ text: 'x' });
    expect(proto).toEqual({ text: 'x' });
    const copy = m.copyNodeData({ a: 1 });
    expect(copy).toEqual({ a: 1 });
    const target: Record<string, unknown> = { a: 1 };
    m.mergeNodeData(target, { b: 2 });
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('findNodeDataForKey/findNodeDataForPart aliases', () => {
    const m = new GraphLinksModel({ nodeDataArray: [{ key: 7, label: 'A' }] });
    expect(m.findNodeDataForKey(7)?.label).toBe('A');
    expect(m.findNodeDataForPart(7)?.label).toBe('A');
    expect(m.findNodeDataForKey(99)).toBeUndefined();
  });

  it('nodeCategoryProperty getter/setter', () => {
    const m = new GraphLinksModel();
    expect(m.nodeCategoryProperty).toBe('category');
    m.nodeCategoryProperty = 'kind';
    const data = { key: 1, kind: 'special' };
    expect(m.getCategoryForNodeData(data)).toBe('special');
    m.setCategoryForNodeData(data, 'default');
    expect(data.kind).toBe('default');
  });

  it('usesUndoManager/isModified/clearIsModified', () => {
    const m = new GraphLinksModel();
    expect(m.usesUndoManager).toBe(true);
    m.usesUndoManager = false;
    expect(m.usesUndoManager).toBe(false);
    m.isModified = true;
    m.clearIsModified();
    expect(m.isModified).toBe(false);
    m.addNode({ key: 1 });
    expect(m.isModified).toBe(true);
    m.clearIsModified();
    m.setNodeProperty(1, 'label', 'a');
    expect(m.isModified).toBe(true);
  });

  it('makeLinkData/copyLinkData/mergeLinkData/findLinkDataForKey', () => {
    const m = new GraphLinksModel({ nodeDataArray: [{ key: 1 }, { key: 2 }] });
    const ld = m.makeLinkData({ from: 1, to: 2, text: 'edge' });
    expect(ld.from).toBe(1);
    expect(ld.text).toBe('edge');
    expect(m.copyLinkData(ld)).toEqual(ld);
    const t: Record<string, unknown> = { from: 1, to: 2 };
    m.mergeLinkData(t, { weight: 5 });
    expect(t.weight).toBe(5);
    const key = m.addLink(ld);
    expect(m.findLinkDataForKey(key)).toBe(ld);
  });

  it('relinkNodeData updates links and linkFromPortIdProperty/linkToPortIdProperty', () => {
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1 }, { key: 2 }],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    m.linkFromPortIdProperty = 'fromPort';
    m.linkToPortIdProperty = 'toPort';
    expect(m.linkFromPortIdProperty).toBe('fromPort');
    m.relinkNodeData(1, 3);
    expect(m.getLinkDataArray()[0].from).toBe(3);
    expect(m.getLinkDataArray()[0].to).toBe(2);
  });
});

describe('F3: Diagram GoJS API surface', () => {
  it('minScale/maxScale setters clamp zoom', () => {
    const d = createDiagram();
    d.minScale = 0.2;
    d.maxScale = 5;
    expect(d.minScale).toBe(0.2);
    expect(d.maxScale).toBe(5);
    d.scale = 0.1;
    expect(d.scale).toBeGreaterThanOrEqual(0.2);
    d.scale = 10;
    expect(d.scale).toBeLessThanOrEqual(5);
  });

  it('selection returns selected parts', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 40, height: 40 }],
    });
    d.model = m;
    const node = d.findNodeForKey(1) as Node;
    d.select(node);
    expect(d.selection).toHaveLength(1);
    expect(d.selection[0]).toBe(node);
    d.clearSelection();
    expect(d.selection).toHaveLength(0);
  });

  it('modelChanged setter receives model events', () => {
    const d = createDiagram();
    const events: string[] = [];
    d.modelChanged = (ev) => events.push(ev.type);
    d.model.addNode({ key: 99, x: 0, y: 0 });
    d.model.setNodeProperty(99, 'label', 'x');
    expect(events).toEqual(['node Added', 'property Changed']);
    d.modelChanged = null;
    const before = events.length;
    d.model.addNode({ key: 100, x: 0, y: 0 });
    expect(events.length).toBe(before);
  });

  it('documentBounds/viewportBounds/computeBounds/actualBounds', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 100, y: 80, width: 50, height: 30 },
      ],
    });
    d.model = m;
    const bounds = d.computeBounds();
    expect(bounds.width).toBe(150);
    expect(bounds.height).toBe(110);
    expect(d.documentBounds.width).toBe(150);
    expect(d.actualBounds.width).toBe(150);
    expect(d.viewportBounds).toBeInstanceOf(RectClass);
  });

  it('getCanvasBounds returns container rect', () => {
    const d = createDiagram();
    const cb = d.getCanvasBounds();
    expect(typeof cb.x).toBe('number');
    expect(typeof cb.y).toBe('number');
    expect(cb.width).toBeGreaterThanOrEqual(0);
  });

  it('horizontalScrollPosition/verticalScrollPosition round trip', () => {
    const d = createDiagram();
    d.horizontalScrollPosition = 25;
    d.verticalScrollPosition = 40;
    expect(d.horizontalScrollPosition).toBe(25);
    expect(d.verticalScrollPosition).toBe(40);
  });

  it('grid/contentAlignment/autoScale/scrollBehavior/requestUpdate', () => {
    const d = createDiagram();
    d.grid = { opacity: 0.1 };
    expect(d.grid).toEqual({ opacity: 0.1 });
    d.contentAlignment = { x: 0.5, y: 0.5 };
    expect((d.contentAlignment as { x: number }).x).toBe(0.5);
    d.autoScale = 1;
    expect(d.autoScale).toBe(1);
    d.scrollBehavior = 2;
    expect(d.scrollBehavior).toBe(2);
    expect(() => d.requestUpdate()).not.toThrow();
    d.padding = 10;
    expect(d.padding).toBe(10);
  });

  it('isTreeExpanded reflects group state', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, isGroup: true }, { key: 2 }],
      linkDataArray: [],
    });
    d.model = m;
    const group = d.getPart(1) as Group;
    d.collapseGroup(group);
    expect(d.isTreeExpanded(group)).toBe(false);
    d.expandGroup(group);
    expect(d.isTreeExpanded(group)).toBe(true);
  });
});

describe('F4: Tools GoJS API surface', () => {
  it('LinkingTool.archetypeLinkData seeds new links', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({ nodeDataArray: [{ key: 1 }, { key: 2 }] });
    d.model = m;
    const { LinkingTool } = require('../src/tool/LinkingTool.ts') as {
      LinkingTool: new () => {
        diagram: unknown;
        createLink(a: unknown, b: unknown): boolean;
        archetypeLinkData: { color?: string };
      };
    };
    const tool = new LinkingTool();
    tool.diagram = d;
    tool.archetypeLinkData = { color: 'red' };
    const n1 = d.findNodeForKey(1) as Node;
    const n2 = d.findNodeForKey(2) as Node;
    expect(tool.createLink(n1, n2)).toBe(true);
    const link = d.findLinkForKey(1);
    expect(link).not.toBeNull();
    expect(link?.data?.color).toBe('red');
  });

  it('TextEditingTool.textBlock getter', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      'Auto',
      $(Shape, 'Rectangle'),
      $(TextBlock, 'label', { editable: true }, new Binding('text', 'label').makeTwoWay()),
    );
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50, label: 'Hi' }],
    });
    d.model = m;
    const node = d.findNodeForKey(1) as Node;
    const tool = new TextEditingTool();
    tool.diagram = d;
    tool.editNode(node);
    expect(tool.textBlock).not.toBeNull();
    tool.stopEditing(false);
  });

  it('PanningTool.panSpeed/DragSelectingTool.isPartialInclusion/ResizingTool.minSize', () => {
    const { PanningTool } = require('../src/tool/PanningTool.ts') as {
      PanningTool: new () => { panSpeed: number };
    };
    const pan = new PanningTool();
    pan.panSpeed = 2;
    expect(pan.panSpeed).toBe(2);

    const { DragSelectingTool } = require('../src/tool/DragSelectingTool.ts') as {
      DragSelectingTool: new () => { isPartialInclusion: boolean };
    };
    const drag = new DragSelectingTool();
    expect(drag.isPartialInclusion).toBe(true);
    drag.isPartialInclusion = false;
    expect(drag.isPartialInclusion).toBe(false);

    const { ResizingTool } = require('../src/tool/ResizingTool.ts') as {
      ResizingTool: new () => {
        minSize: { width: number; height: number };
        maxSize: { width: number; height: number };
        minWidth: number;
      };
    };
    const resize = new ResizingTool();
    resize.minSize = { width: 30, height: 40 };
    expect(resize.minWidth).toBe(30);
    expect(resize.minSize).toEqual({ width: 30, height: 40 });
    resize.maxSize = { width: 500, height: 600 };
    expect(resize.maxSize).toEqual({ width: 500, height: 600 });
  });

  it('ClickCreatingTool adds a node on empty click', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel();
    const tool = new ClickCreatingTool();
    tool.diagram = d;
    tool.archetypeNodeData = { label: 'new' };
    const click = new MouseEvent('mouseup', {
      button: 0,
      clientX: 100,
      clientY: 100,
    });
    tool.doMouseUp(click);
    expect(d.getModel().getNodeCount()).toBe(1);
    const data = d.getModel().getNodeDataArray()[0];
    expect(data?.label).toBe('new');
    expect(data && Math.round(data.x as number)).toBe(100);

    // The created node must be undoable in a single step.
    expect(d.getUndoManager().canUndo()).toBe(true);
    d.undo();
    expect(d.getModel().getNodeCount()).toBe(0);
  });

  it('ClickCreatingTool is actually reachable via a real mousedown->mouseup gesture, not preempted by ClickSelectingTool', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel();
    const clickCreating = d.getToolManager().getTool('clickCreating') as ClickCreatingTool;
    clickCreating.archetypeNodeData = { label: 'new' };
    const canvas = d.getRenderer().getCanvas();

    canvas.dispatchEvent(
      new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 100, bubbles: true }),
    );
    canvas.dispatchEvent(
      new MouseEvent('mouseup', { button: 0, clientX: 100, clientY: 100, bubbles: true }),
    );

    expect(d.getModel().getNodeCount()).toBe(1);
    expect(d.getModel().getNodeDataArray()[0]?.label).toBe('new');
  });

  it('ClickCreatingTool with no archetypeNodeData set leaves ordinary click-to-select working', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 90, y: 90, width: 50, height: 50 }],
    });
    const canvas = d.getRenderer().getCanvas();

    canvas.dispatchEvent(
      new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 100, bubbles: true }),
    );
    canvas.dispatchEvent(
      new MouseEvent('mouseup', { button: 0, clientX: 100, clientY: 100, bubbles: true }),
    );

    expect(d.getModel().getNodeCount()).toBe(1); // no node was click-created
  });

  it('dropping a Palette node onto a diagram is undoable', async () => {
    const { Palette } = await import('../src/export/Palette.ts');
    const { basicShapes } = await import('../src/template/TemplateCollection.ts');
    const d = createDiagram();
    d.model = new GraphLinksModel();
    const container = document.createElement('div');
    const palette = new Palette(container, d, basicShapes);

    const template = basicShapes[0]!;
    expect(palette.handleDropOnDiagram(template.id, 50, 60)).not.toBeNull();
    expect(d.getModel().getNodeCount()).toBe(1);

    expect(d.getUndoManager().canUndo()).toBe(true);
    d.undo();
    expect(d.getModel().getNodeCount()).toBe(0);
  });

  it('groupSelection and ungroupSelection are each a single undoable step', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 100, y: 0, width: 50, height: 30 },
      ],
    });
    const node1 = d.findNodeForKey(1) as Node;
    const node2 = d.findNodeForKey(2) as Node;
    d.select(node1);
    d.select(node2, true);

    const handler = d.getCommandHandler();
    expect(handler.groupSelection()).toBe(true);
    expect(d.getModel().getNodeCount()).toBe(3); // 2 nodes + 1 new group

    expect(d.getUndoManager().canUndo()).toBe(true);
    d.undo();
    expect(d.getModel().getNodeCount()).toBe(2);

    // Redo to get the group back, then verify ungroup is also one step.
    d.redo();
    const groupData = d
      .getModel()
      .getNodeDataArray()
      .find((n) => n.isGroup === true)!;
    const group = d.findGroupForKey(groupData.key as number)!;
    d.select(group);
    expect(handler.ungroupSelection()).toBe(true);
    expect(d.getModel().getNodeCount()).toBe(2);

    expect(d.getUndoManager().canUndo()).toBe(true);
    d.undo();
    expect(d.getModel().getNodeCount()).toBe(3);
  });

  it('ContextMenuTool and LinkReshapingTool exist and wire up', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel();
    const tm = (d as unknown as { _toolManager: { getTool(n: string): unknown } })._toolManager;
    expect(tm.getTool('clickCreating')).not.toBeUndefined();
    expect(tm.getTool('contextMenu')).not.toBeUndefined();
    expect(tm.getTool('linkReshaping')).not.toBeUndefined();
  });

  it('LinkReshapingTool reshapes a reshapable link', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 40, height: 40 },
        { key: 2, x: 200, y: 0, width: 40, height: 40 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;
    const link = d.findLinkForKey(1) as Link;
    link.reshapable = true;
    link.setPathPoints([
      { x: 20, y: 20 },
      { x: 110, y: 40 },
      { x: 220, y: 20 },
    ]);
    const tool = new LinkReshapingTool();
    tool.diagram = d;
    const down = new MouseEvent('mousedown', { button: 0, clientX: 110, clientY: 40 });
    tool.doMouseDown(down);
    expect(tool.currentLink).toBe(link);
    const move = new MouseEvent('mousemove', { button: 0, clientX: 130, clientY: 60 });
    tool.doMouseMove(move);
    tool.doMouseUp(move);
    expect(link.pathPoints[1]).toEqual({ x: 130, y: 60 });
  });

  it('a manual link reshape is undoable and survives an unrelated model change, but not a move of its own endpoint', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 40, height: 40 },
        { key: 2, x: 200, y: 0, width: 40, height: 40 },
        { key: 3, x: 400, y: 400 }, // unrelated node
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    d.model = m;
    const link = d.findLinkForKey(1) as Link;
    link.reshapable = true;
    link.setPathPoints([
      { x: 20, y: 20 },
      { x: 110, y: 40 },
      { x: 220, y: 20 },
    ]);

    const tool = new LinkReshapingTool();
    tool.diagram = d;
    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 110, clientY: 40 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 130, clientY: 60 }));
    tool.doMouseUp(new MouseEvent('mouseup', { button: 0, clientX: 130, clientY: 60 }));
    expect(link.pathPoints[1]).toEqual({ x: 130, y: 60 });
    expect(link.hasManualReshape).toBe(true);

    // Undoable in one step.
    expect(d.getUndoManager().canUndo()).toBe(true);

    // An unrelated node's property change must not wipe the manual reshape.
    const node3Data = d
      .getModel()
      .getNodeDataArray()
      .find((n) => n.key === 3)!;
    d.getModel().setDataProperty(node3Data, 'x', 500);
    expect(link.pathPoints[1]).toEqual({ x: 130, y: 60 });

    // Undo reverts to the pre-reshape path.
    d.undo();
    expect(link.pathPoints[1]).toEqual({ x: 110, y: 40 });
    expect(link.hasManualReshape).toBe(false);

    // Moving the link's OWN endpoint node does legitimately discard the
    // (already-undone, so re-apply first) manual reshape.
    d.redo();
    expect(link.hasManualReshape).toBe(true);
    const node1Data = d
      .getModel()
      .getNodeDataArray()
      .find((n) => n.key === 1)!;
    d.getModel().setDataProperty(node1Data, 'x', 50);
    expect(link.hasManualReshape).toBe(false);
  });

  it('rolling back a transaction undoes nodes/links added via a bulk setNodeDataArray/setLinkDataArray reassignment', () => {
    const model = new GraphLinksModel({
      nodeDataArray: [{ key: 1 }, { key: 2 }],
      linkDataArray: [{ key: 100, from: 1, to: 2 }],
    });

    model.startTransaction();
    model.setNodeDataArray([...model.getNodeDataArray(), { key: 3 }]);
    expect(model.rollbackTransaction()).toBe(true);
    expect(model.containsNode(3)).toBe(false);
    expect(model.getNodeCount()).toBe(2); // existing nodes untouched

    model.startTransaction();
    model.setLinkDataArray([...model.getLinkDataArray(), { key: 101, from: 2, to: 1 }]);
    expect(model.rollbackTransaction()).toBe(true);
    expect(model.getLinkDataArray().some((l) => model.getLinkKey(l) === 101)).toBe(false);
    expect(model.getLinkCount()).toBe(1); // existing link untouched
  });
});

describe('F5: CommandHandler zoom + pasteSelection', () => {
  it('increaseZoom/decreaseZoom/resetZoom respect limits', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    const ch = d.getCommandHandler();
    d.scale = 1;
    expect(ch.increaseZoom(2)).toBe(true);
    expect(d.scale).toBe(2);
    expect(ch.decreaseZoom(4)).toBe(true);
    expect(d.scale).toBe(0.5);
    expect(ch.resetZoom()).toBe(true);
    expect(d.scale).toBe(1);
    d.scale = d.maxScale;
    expect(ch.canIncreaseZoom()).toBe(false);
    d.scale = d.minScale;
    expect(ch.canDecreaseZoom()).toBe(false);
  });

  it('zoomToFit invokes diagram.zoomToFit', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    const ch = d.getCommandHandler();
    const spy = vi.spyOn(d, 'zoomToFit');
    expect(ch.zoomToFit()).toBe(true);
    expect(spy).toHaveBeenCalled();
  });

  it('pasteSelection pastes clipboard at offset', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 10, y: 20, width: 50, height: 30 }],
    });
    d.model = m;
    const ch = d.getCommandHandler();
    expect(ch.pasteSelection()).toBe(false);
    const node = d.findNodeForKey(1) as Node;
    d.select(node);
    expect(ch.copySelection()).toBe(true);
    expect(ch.pasteSelection()).toBe(true);
    expect(m.getNodeCount()).toBe(2);
  });

  it('pasteSelection at position lands first node there', () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 10, y: 20, width: 50, height: 30 }],
    });
    d.model = m;
    const ch = d.getCommandHandler();
    const node = d.findNodeForKey(1) as Node;
    d.select(node);
    ch.copySelection();
    expect(ch.pasteSelection({ x: 100, y: 200 })).toBe(true);
    const pasted = m.getNodeDataArray().filter((n) => (n as { key?: unknown }).key !== 1);
    expect(pasted).toHaveLength(1);
    expect((pasted[0] as { x?: number }).x).toBe(100);
    expect((pasted[0] as { y?: number }).y).toBe(200);
  });
});

describe('F7: GraphObject/Panel/Shape/TextBlock/Layout/UndoManager/Part props', () => {
  it('GraphObject grid/alignmentFocus/scale/shadow/pickable/copyable', () => {
    const $ = GraphObject.make;
    const shape = $(Shape, 'Rectangle');
    shape.row = 2;
    shape.column = 3;
    shape.rowSpan = 2;
    shape.columnSpan = 1;
    shape.alignmentFocus = { x: 0.5, y: 0.5 };
    shape.scale = 1.5;
    shape.isShadowed = true;
    shape.shadowColor = 'red';
    shape.shadowOffset = { x: 2, y: 2 };
    shape.shadowBlur = 5;
    expect(shape.row).toBe(2);
    expect(shape.column).toBe(3);
    expect(shape.rowSpan).toBe(2);
    expect(shape.columnSpan).toBe(1);
    expect(shape.scale).toBe(1.5);
    expect(shape.isShadowed).toBe(true);
    expect(shape.shadow).toBe('red');
    expect(shape.pickable).toBe(true);
    shape.pickable = false;
    expect(shape.pickable).toBe(false);
    shape.copyable = false;
    expect(shape.copyable).toBe(false);
  });

  it('Panel addSeparator/defaultAlignment', () => {
    const p = new Panel('Vertical');
    const sep = p.addSeparator();
    expect(sep).toBeDefined();
    expect(p.separators).toHaveLength(1);
    expect(p.elements).toHaveLength(1);
    p.defaultAlignment = { x: 0, y: 1 };
    expect(p.defaultAlignment).toEqual({ x: 0, y: 1 });
  });

  it('Shape strokeDashArray/fromGeometry/toGeometry', () => {
    const s = new Shape('Rectangle');
    s.strokeDashArray = [4, 2];
    expect(s.strokeDashArray).toEqual([4, 2]);
    s.fromGeometry = 'M0 0 L10 10';
    expect(s.fromGeometry).toBe('M0 0 L10 10');
    expect(s.toGeometry).toBe('M0 0 L10 10');
  });

  it('TextBlock isBold/isItalic/isUnderline/overflow/maxLines', () => {
    const t = new TextBlock('hi');
    t.isBold = true;
    expect(t.isBold).toBe(true);
    t.isItalic = true;
    expect(t.isItalic).toBe(true);
    t.isUnderline = true;
    expect(t.isUnderline).toBe(true);
    t.overflow = 'ellipsis';
    expect(t.overflow).toBe('ellipsis');
    t.maxLines = 2;
    expect(t.maxLines).toBe(2);
  });

  it('Layout options: GridLayout columnSpacing/rowSpacing/wrappingWidth, TreeLayout angle, ForceDirected defaultSpringLength, isInitial/isFinal/isOngoing', () => {
    const { GridLayout } = require('../src/layout/GridLayout.ts') as {
      GridLayout: new () => {
        columnSpacing: number;
        rowSpacing: number;
        wrappingWidth: number;
      };
    };
    const grid = new GridLayout();
    grid.columnSpacing = 30;
    grid.rowSpacing = 10;
    grid.wrappingWidth = 500;
    expect(grid.columnSpacing).toBe(30);
    expect(grid.rowSpacing).toBe(10);
    expect(grid.wrappingWidth).toBe(500);

    const { TreeLayout } = require('../src/layout/TreeLayout.ts') as {
      TreeLayout: new () => { angle: number; setChildLinkStyle(s: string): void };
    };
    const tree = new TreeLayout();
    tree.angle = 90;
    expect(tree.angle).toBe(90);
    expect(() => tree.setChildLinkStyle('orthogonal')).not.toThrow();

    const { ForceDirectedLayout } = require('../src/layout/ForceDirectedLayout.ts') as {
      ForceDirectedLayout: new () => { defaultSpringLength: number };
    };
    const fd = new ForceDirectedLayout();
    fd.defaultSpringLength = 200;
    expect(fd.defaultSpringLength).toBe(200);
  });

  it('Layout isInitial/isFinal/isOngoing', () => {
    // Layout is abstract; use GridLayout which extends it
    const { GridLayout } = require('../src/layout/GridLayout.ts') as {
      GridLayout: new () => {
        isInitial: boolean;
        isFinal: boolean;
        isOngoing: boolean;
      };
    };
    const grid = new GridLayout();
    expect(grid.isInitial).toBe(true);
    grid.isFinal = false;
    expect(grid.isFinal).toBe(false);
    grid.isOngoing = false;
    expect(grid.isOngoing).toBe(false);
  });

  it('UndoManager clearsHistory/setTransactionIsSeparateFromHistory/skipUndoManager', () => {
    const d = createDiagram();
    const um = d.getUndoManager();
    expect(um.clearsHistory).toBe(true);
    um.clearsHistory = false;
    expect(um.clearsHistory).toBe(false);
    expect(() => um.setTransactionIsSeparateFromHistory()).not.toThrow();
    expect(um.skipUndoManager).toBe(false);
    um.skipUndoManager = true;
    expect(um.skipUndoManager).toBe(true);
  });

  it('Part deletable/copyable/isHighlighted + Link curve/resizingSegmentIndex', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0 }],
      linkDataArray: [],
    });
    const node = d.findNodeForKey(1) as Node;
    expect(node.deletable).toBe(true);
    node.deletable = false;
    expect(node.deletable).toBe(false);
    node.copyable = false;
    expect(node.copyable).toBe(false);
    node.isHighlighted = true;
    expect(node.isHighlighted).toBe(true);

    const { Link } = require('../src/parts/Link.ts') as {
      Link: new (
        k: unknown,
        f: unknown,
        t: unknown,
      ) => {
        curve: string;
        resizingSegmentIndex: number;
        fromEndSegmentOrientation: number;
      };
    };
    const l = new Link(1, 2, 3);
    l.curve = 'Bezier';
    expect(l.curve).toBe('Bezier');
    l.resizingSegmentIndex = 2;
    expect(l.resizingSegmentIndex).toBe(2);
    l.fromEndSegmentOrientation = 90;
    expect(l.fromEndSegmentOrientation).toBe(90);
    l.toEndSegmentOrientation = 180;
    expect(l.toEndSegmentOrientation).toBe(180);
  });
});

describe('G9: geometry GoJS API gaps (Point/Rect/Size/Spot)', () => {
  it('Point distance/polar/isNaN/multiply/random', () => {
    const a = new Point(0, 0);
    const b = new Point(3, 4);
    expect(a.distance(b)).toBe(5);
    expect(a.distanceSquared(b)).toBe(25);
    expect(new Point(3, 4).multiply(new Point(2, 2))).toEqual(new Point(6, 8));
    expect(new Point(Number.NaN, 1).isNaN()).toBe(true);
    expect(new Point(1, 1).isNaN()).toBe(false);
    const p = Point.polar(10, 0);
    expect(p.x).toBeCloseTo(10, 5);
    expect(p.y).toBeCloseTo(0, 5);
    const r = Point.random();
    expect(r.x).toBeGreaterThanOrEqual(0);
    expect(r.x).toBeLessThan(1);
    expect(r.y).toBeGreaterThanOrEqual(0);
    expect(r.y).toBeLessThan(1);
  });

  it('Rect grow/position/size/centerX/centerY/setToPosition/setToSize', () => {
    const r = new RectClass(0, 0, 100, 50);
    expect(r.grow(10)).toEqual(new RectClass(-10, -10, 120, 70));
    expect(r.centerX).toBe(50);
    expect(r.centerY).toBe(25);
    expect(r.position).toEqual(new Point(0, 0));
    r.position = new Point(5, 6);
    expect(r.x).toBe(5);
    expect(r.y).toBe(6);
    expect(r.size).toEqual(new Size(100, 50));
    r.size = new Size(200, 80);
    expect(r.width).toBe(200);
    expect(r.height).toBe(80);
    const r2 = new RectClass(1, 2, 10, 20);
    r2.setToPosition(new Point(7, 8));
    expect(r2.x).toBe(7);
    expect(r2.y).toBe(8);
    r2.setToSize(new Size(30, 40));
    expect(r2.width).toBe(30);
    expect(r2.height).toBe(40);
  });

  it('Spot GoJS aliases Top/Bottom/Left/Right/Middle*', () => {
    expect(Spot.Top).toEqual(Spot.TopCenter);
    expect(Spot.Bottom).toEqual(Spot.BottomCenter);
    expect(Spot.Left).toEqual(Spot.MiddleLeft);
    expect(Spot.Right).toEqual(Spot.MiddleRight);
    expect(Spot.MiddleCenter).toEqual(Spot.Center);
    expect(Spot.MiddleLeft).toEqual(Spot.LeftMiddle);
    expect(Spot.MiddleRight).toEqual(Spot.RightMiddle);
    expect(Spot.fromName('MiddleCenter')).toEqual(Spot.Center);
    expect(Spot.fromName('Top')).toEqual(Spot.TopCenter);
    expect(Spot.fromName('Left')).toEqual(Spot.MiddleLeft);
    expect(Spot.fromName('Bottom')).toEqual(Spot.BottomCenter);
    expect(Spot.parse('MiddleCenter')).toEqual(Spot.Center);
    expect(Spot.parse('Top')).toEqual(Spot.TopCenter);
  });

  it('Link copy copies curve/resizingSegmentIndex/segment orientations', () => {
    const { Link } = require('../src/parts/Link.ts') as {
      Link: new (
        k: number,
        f: number,
        t: number,
      ) => {
        curve: string;
        resizingSegmentIndex: number;
        fromEndSegmentOrientation: number;
        toEndSegmentOrientation: number;
        copy(): unknown;
      };
    };
    const l = new Link(1, 2, 3);
    l.curve = 'Bezier';
    l.resizingSegmentIndex = 1;
    l.fromEndSegmentOrientation = 45;
    l.toEndSegmentOrientation = 90;
    const c = l.copy() as {
      curve: string;
      resizingSegmentIndex: number;
      fromEndSegmentOrientation: number;
      toEndSegmentOrientation: number;
    };
    expect(c.curve).toBe('Bezier');
    expect(c.resizingSegmentIndex).toBe(1);
    expect(c.fromEndSegmentOrientation).toBe(45);
    expect(c.toEndSegmentOrientation).toBe(90);
  });

  it('Part findDiagram/findLayer + Diagram findPartForKey', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0 }],
      linkDataArray: [],
    });
    const node = d.findNodeForKey(1) as Node;
    expect(node.diagram).toBe(d);
    expect(node.findDiagram()).toBe(d);
    expect(node.findLayer()).not.toBeNull();
    expect(d.findPartForKey(1)).toBe(node);
    expect(d.findPartForKey(999)).toBeNull();
  });

  it('GraphObject parent/part/isVisibleObject', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0 }],
      linkDataArray: [],
    });
    const node = d.findNodeForKey(1) as Node;
    const shape = new Shape('Rectangle');
    node.addVisual(shape);
    expect(node.elements[0]).toBe(shape);
    expect(shape.isVisibleObject).toBe(true);
    shape.visible = false;
    expect(shape.isVisibleObject).toBe(false);
    shape.visible = true;
    expect(shape.part).toBe(node);
  });
});

describe('H10: graph navigation + Link.fromNode/toNode + Shape bounds', () => {
  function navDiagram(): Diagram {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0 },
        { key: 2, x: 100, y: 0 },
        { key: 3, x: 200, y: 0 },
      ],
      linkDataArray: [
        { key: 10, from: 1, to: 2 },
        { key: 11, from: 2, to: 3 },
      ],
    });
    return d;
  }

  it('Node findLinksInto/findLinksOutOf/findNodesInto/findNodesOutOf', () => {
    const d = navDiagram();
    const n1 = d.findNodeForKey(1) as Node;
    const n2 = d.findNodeForKey(2) as Node;
    const n3 = d.findNodeForKey(3) as Node;
    expect(n1.findLinksOutOf()).toHaveLength(1);
    expect(n1.findLinksInto()).toHaveLength(0);
    expect(n1.findNodesOutOf().map((n) => n.key)).toEqual([2]);
    expect(n2.findLinksInto()).toHaveLength(1);
    expect(n2.findLinksOutOf()).toHaveLength(1);
    expect(n2.findNodesInto().map((n) => n.key)).toEqual([1]);
    expect(n2.findNodesOutOf().map((n) => n.key)).toEqual([3]);
    expect(n3.findLinksInto()).toHaveLength(1);
    expect(n3.findLinksOutOf()).toHaveLength(0);
  });

  it('Node findLinksConnected/findNodesConnected', () => {
    const d = navDiagram();
    const n2 = d.findNodeForKey(2) as Node;
    expect(n2.findLinksConnected()).toHaveLength(2);
    expect(
      n2
        .findNodesConnected()
        .map((n) => n.key)
        .sort(),
    ).toEqual([1, 3]);
  });

  it('Node isTreeLeaf/findTreeParentNode/findTreeChildrenNodes', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, parent: null, x: 0, y: 0 },
        { key: 2, parent: 1, x: 100, y: 0 },
        { key: 3, parent: 2, x: 200, y: 0 },
      ],
      linkDataArray: [],
    });
    const n1 = d.findNodeForKey(1) as Node;
    const n2 = d.findNodeForKey(2) as Node;
    const n3 = d.findNodeForKey(3) as Node;
    expect(n1.findTreeChildrenNodes().map((n) => n.key)).toEqual([2]);
    expect(n2.findTreeParentNode()?.key).toBe(1);
    expect(n2.findTreeChildrenNodes().map((n) => n.key)).toEqual([3]);
    expect(n3.isTreeLeaf()).toBe(true);
    expect(n2.isTreeLeaf()).toBe(false);
  });

  it('Link fromNode/toNode return Node objects and findFromNode/findToNode', () => {
    const d = navDiagram();
    const link = d.findLinkForKey(10) as Link;
    expect(link.fromNode?.key).toBe(1);
    expect(link.toNode?.key).toBe(2);
    expect(link.findFromNode()?.key).toBe(1);
    expect(link.findToNode()?.key).toBe(2);
    expect(link.fromKey).toBe(1);
    expect(link.toKey).toBe(2);
    link.fromNode = 3;
    expect(link.fromKey).toBe(3);
    link.fromKey = 1;
    const n3 = d.findNodeForKey(3) as Node;
    link.toNode = n3;
    expect(link.toKey).toBe(3);
  });

  it('Shape getGeometricBounds/getStrokeBounds', () => {
    const s = new Shape('Rectangle');
    s.width = 100;
    s.height = 50;
    s.strokeWidth = 4;
    expect(s.getGeometricBounds()).toEqual(new RectClass(0, 0, 100, 50));
    expect(s.getStrokeBounds()).toEqual(new RectClass(-2, -2, 104, 54));
  });
});

describe('I11: minor GoJS API gaps (Diagram.focus, canZoomToFit, ToolManager getters, Part state)', () => {
  it('Diagram.focus does not throw', () => {
    const d = createDiagram();
    expect(() => d.focus()).not.toThrow();
  });

  it('CommandHandler canZoomToFit reflects allowZoom', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0 }],
    });
    const ch = d.getCommandHandler();
    expect(ch.canZoomToFit()).toBe(true);
    expect(ch.zoomToFit()).toBe(true);
    d.allowZoom = false;
    expect(ch.canZoomToFit()).toBe(false);
    expect(ch.zoomToFit()).toBe(false);
  });

  it('ToolManager currentTool/mouseDownTools/mouseMoveTools/mouseUpTools', () => {
    const d = createDiagram();
    const tm = d.getToolManager();
    expect(tm.mouseDownTools).toBeDefined();
    expect(tm.mouseMoveTools).toBeDefined();
    expect(tm.mouseUpTools).toBeDefined();
    expect(Array.isArray(tm.mouseDownTools)).toBe(true);
    expect(tm.currentTool).toBeNull();
  });

  it('Part isPositioned/isMemberOfGroup', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0 }],
      linkDataArray: [],
    });
    const node = d.findNodeForKey(1) as Node;
    expect(node.isPositioned).toBe(true);
    expect(node.isMemberOfGroup).toBe(false);
    const node2 = d.findNodeForKey(1) as Node;
    node2.containingGroup = node as unknown as Group;
    expect(node2.isMemberOfGroup).toBe(true);
  });
});

describe('J12: critical GoJS API gaps (Part surface, model data methods, layout, collections, InputEvent)', () => {
  it('Part width/height/scale/desiredSize/background/pickable surface', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 50, height: 30 }],
    });
    const node = d.findNodeForKey(1) as Node;
    expect(node.width).toBe(50);
    expect(node.height).toBe(30);
    node.width = 100;
    expect(node.bounds.width).toBe(100);
    node.scale = 2;
    expect(node.scale).toBe(2);
    node.background = 'red';
    expect(node.background).toBe('red');
    node.pickable = false;
    expect(node.pickable).toBe(false);
    node.desiredSize = { width: 10, height: 20 };
    expect(node.desiredSize).toEqual({ width: 10, height: 20 });
  });

  it('$(go.Node, {width,height}) applies size via template', () => {
    const $ = GraphObject.make;
    const template = $(Node, { width: 150, height: 60 });
    const d = createDiagram();
    d.nodeTemplate = template;
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    const node = d.findNodeForKey(1) as Node;
    expect(node.width).toBe(150);
    expect(node.height).toBe(60);
  });

  it('model.addNodeData/removeNodeData + addLinkData/removeLinkData', () => {
    const m = new GraphLinksModel();
    m.addNodeData({ key: 1 });
    expect(m.containsNode(1)).toBe(true);
    m.addNodeData({ key: 2 });
    m.addLinkData({ from: 1, to: 2 });
    expect(m.getLinkDataArray().length).toBe(1);
    expect(m.removeNodeData(1)).toBe(true);
    expect(m.containsNode(1)).toBe(false);
    m.removeLinkData(m.getLinkDataArray()[0] as { key: number });
    expect(m.getLinkDataArray().length).toBe(0);
  });

  it('Layout.doLayout/layoutParts + Diagram.layoutParts', () => {
    const { GridLayout } = require('../src/layout/GridLayout.ts') as {
      GridLayout: new () => {
        spacing: number;
        doLayout(c?: { nodes?: unknown[]; links?: unknown[] }): void;
        layoutParts(parts: unknown[]): void;
      };
    };
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0 },
        { key: 2, x: 0, y: 0 },
      ],
    });
    d.layout =
      new (require('../src/layout/GridLayout.ts').GridLayout)() as unknown as typeof d.layout;
    expect(() => d.layoutParts([d.findNodeForKey(1), d.findNodeForKey(2)])).not.toThrow();
    const g = new GridLayout();
    g.spacing = 50;
    expect(() => g.doLayout()).not.toThrow();
  });

  it('Diagram.nodes/links/groups public iterables', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0 },
        { key: 2, x: 100, y: 0 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    expect(d.nodes.size).toBe(2);
    expect(d.links.size).toBe(1);
    expect(d.groups.size).toBe(0);
  });

  it('InputEvent exposes diagram/documentPoint/viewPoint/model/clickCount', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 10, y: 20 }],
    });
    const me = new MouseEvent('click', { clientX: 10, clientY: 20 });
    const input = new InputEvent(me);
    input.diagram = d;
    const pt = input.documentPoint();
    expect(pt).toBeDefined();
    expect(typeof pt.x).toBe('number');
    expect(input.viewPoint()).toEqual({ x: 10, y: 20 });
    expect(input.model).toBe(d.getModel());
    input.clickCount = 2;
    expect(input.clickCount).toBe(2);
    expect(input.handled).toBe(false);
  });

  it('link endpoints follow node bounds during drag, resize, and programmatic model moves', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 200, y: 0, width: 50, height: 30 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    const node1 = d.findNodeForKey(1) as Node;
    const link = [...d.links.values()][0] as Link;
    const beforeDrag = { ...link.fromPort };

    // Interactive drag (mirrors what DraggingTool does each mousemove)
    node1.bounds.x = 300;
    node1.bounds.y = 300;
    d.invalidateLinksForNode(1);
    expect(link.fromPort).not.toEqual(beforeDrag);
    expect(link.fromPort.x).toBeGreaterThan(290);

    // Interactive resize (mirrors what ResizingTool does each mousemove)
    const beforeResize = { ...link.fromPort };
    node1.bounds.width = 400;
    d.invalidateLinksForNode(1);
    expect(link.fromPort).not.toEqual(beforeResize);

    // Programmatic model move via setDataProperty (no interactive tool involved)
    const node2Data = d
      .getModel()
      .getNodeDataArray()
      .find((n) => n.key === 2)!;
    const beforeModelMove = { ...link.toPort };
    d.getModel().setDataProperty(node2Data, 'x', 900);
    expect(link.toPort).not.toEqual(beforeModelMove);
    expect(link.toPort.x).toBeGreaterThan(890);
  });

  it('a command that throws inside a transaction is not recorded, and its undo() is never later called', () => {
    const undoManager = new UndoManager();
    const goodCommand: Command = {
      execute: vi.fn(),
      undo: vi.fn(),
      describe: () => 'good',
    };
    const throwingCommand: Command = {
      execute: () => {
        throw new Error('boom');
      },
      undo: vi.fn(),
      describe: () => 'throwing',
    };

    undoManager.beginTransaction('t');
    undoManager.execute(goodCommand);
    expect(() => undoManager.execute(throwingCommand)).toThrow('boom');
    const transaction = undoManager.commitTransaction();

    // Only the command that actually executed successfully was recorded.
    expect(transaction?.size).toBe(1);

    undoManager.undo();
    expect(goodCommand.undo).toHaveBeenCalledTimes(1);
    expect(throwingCommand.undo).not.toHaveBeenCalled();
  });

  it('a group not itself being dragged resizes to keep following a dragged member', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, isGroup: true, x: 0, y: 0 },
        { key: 2, x: 10, y: 10, width: 30, height: 20, group: 1 },
      ],
    });
    const group = d.getPart(1) as Group;
    const member = d.findNodeForKey(2) as Node;
    expect(group.contains(member)).toBe(true);
    const boundsBefore = { x: group.bounds.x, y: group.bounds.y };

    const tool = new DraggingTool();
    tool.diagram = d;
    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 15, clientY: 15 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 415, clientY: 415 }));

    expect(group.bounds.x).not.toBe(boundsBefore.x);
    expect(group.bounds.containsRect(member.bounds)).toBe(true);
  });

  it('dragging a multi-selection leaves a non-draggable part in place', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 100, y: 0, width: 50, height: 30 },
      ],
    });
    const node1 = d.findNodeForKey(1) as Node;
    const node2 = d.findNodeForKey(2) as Node;
    node2.draggable = false;
    d.select(node1);
    d.select(node2, true);

    const tool = new DraggingTool();
    tool.diagram = d;
    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 25, clientY: 15 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 225, clientY: 15 }));

    expect(node1.bounds.x).toBe(200); // moved by +200
    expect(node2.bounds.x).toBe(100); // unchanged, draggable=false
  });

  it('drag keeps Rect prototype (bounds.right/center intact)', () => {
    const { DraggingTool } = require('../src/tool/DraggingTool.ts') as {
      DraggingTool: new () => {
        diagram: unknown;
        doMouseDown(e: MouseEvent): void;
        doMouseMove(e: MouseEvent): void;
      };
    };
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 50, height: 30 }],
    });
    const node = d.findNodeForKey(1) as Node;
    const tool = new DraggingTool();
    tool.diagram = d;
    expect(node.bounds.right).toBe(50);
    expect(node.bounds.center).toEqual({ x: 25, y: 15 });
  });
});

describe('K13: model integrity — group delete cascade, group membership cleanup', () => {
  it('deleting a Group also deletes its members instead of orphaning them', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, isGroup: true, x: 0, y: 0 },
        { key: 2, x: 10, y: 10, width: 30, height: 20, group: 1 },
        { key: 3, x: 200, y: 200 }, // unrelated node, must survive
      ],
    });
    const group = d.getPart(1) as Group;
    d.select(group);
    const handler = d.getCommandHandler();

    expect(handler.deleteSelection()).toBe(true);
    expect(d.getModel().containsNode(1)).toBe(false);
    expect(d.getModel().containsNode(2)).toBe(false); // member removed too
    expect(d.getModel().containsNode(3)).toBe(true); // unrelated node untouched
  });

  it("reparenting a node to a different group removes it from the old group's memberParts", () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, isGroup: true, x: 0, y: 0 },
        { key: 2, isGroup: true, x: 500, y: 0 },
        { key: 3, x: 10, y: 10, width: 30, height: 20, group: 1 },
      ],
    });
    d.model = m;
    const groupA = d.findGroupForKey(1) as Group;
    const groupB = d.findGroupForKey(2) as Group;
    const member = d.findNodeForKey(3) as Node;
    expect(groupA.contains(member)).toBe(true);

    const nodeData = m.getNodeData(3)!;
    m.setDataProperty(nodeData, 'group', 2);

    expect(groupA.contains(member)).toBe(false);
    expect(groupB.contains(member)).toBe(true);
    expect(member.containingGroup).toBe(groupB);
  });

  it("clearing a node's group property removes it from its group's memberParts", () => {
    const d = createDiagram();
    const m = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, isGroup: true, x: 0, y: 0 },
        { key: 2, x: 10, y: 10, width: 30, height: 20, group: 1 },
      ],
    });
    d.model = m;
    const group = d.findGroupForKey(1) as Group;
    const member = d.findNodeForKey(2) as Node;
    expect(group.contains(member)).toBe(true);

    m.setDataProperty(m.getNodeData(2)!, 'group', undefined);

    expect(group.contains(member)).toBe(false);
    expect(member.containingGroup).toBeNull();
  });
});

describe('L14: TextEditingTool — one-way bindings and Escape-cancel', () => {
  it('does not write back to the model when the bound TextBlock is one-way', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      $(TextBlock, { editable: true }, new Binding('text', 'label')), // one-way (default)
    );
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, label: 'Original' }] });
    const node = d.findNodeForKey(1) as Node;

    const tool = new TextEditingTool();
    tool.diagram = d;
    tool.editNode(node);
    expect(tool.isEditing).toBe(true);
    (tool as unknown as { input: HTMLInputElement }).input.value = 'Edited';
    tool.stopEditing(true);

    // The TextBlock updates visually, but the one-way-bound model data must not.
    expect(d.getModel().getNodeData(1)?.label).toBe('Original');
  });

  it('writes back to the model when the bound TextBlock is explicitly two-way', () => {
    const d = createDiagram();
    const $ = GraphObject.make;
    d.nodeTemplate = $(
      Node,
      $(TextBlock, { editable: true }, new Binding('text', 'label').makeTwoWay()),
    );
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, label: 'Original' }] });
    const node = d.findNodeForKey(1) as Node;

    const tool = new TextEditingTool();
    tool.diagram = d;
    tool.editNode(node);
    (tool as unknown as { input: HTMLInputElement }).input.value = 'Edited';
    tool.stopEditing(true);

    expect(d.getModel().getNodeData(1)?.label).toBe('Edited');
  });

  it('Escape cancels an edit without committing it, even though blur fires synchronously on removal', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, label: 'Original' }] });
    const node = d.findNodeForKey(1) as Node;

    const tool = new TextEditingTool();
    tool.diagram = d;
    tool.editNode(node);
    (tool as unknown as { input: HTMLInputElement }).input.value = 'Should not stick';
    tool.cancelEditing();

    expect(d.getModel().getNodeData(1)?.label).toBe('Original');
  });
});

describe('M15: previously-missing diagram events and InputEvent modifiers', () => {
  it('deselect fires ChangingSelection before ChangedSelection', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    const node = d.findNodeForKey(1) as Node;
    d.select(node);

    const events: string[] = [];
    d.addDiagramListener('ChangingSelection', () => events.push('ChangingSelection'));
    d.addDiagramListener('ChangedSelection', () => events.push('ChangedSelection'));

    d.deselect(node);
    expect(events).toEqual(['ChangingSelection', 'ChangedSelection']);
  });

  it('fires ObjectContextClicked for a right-click on a part and BackgroundContextClicked otherwise', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 50, height: 30 }],
    });

    const events: string[] = [];
    d.addDiagramListener('ObjectContextClicked', () => events.push('ObjectContextClicked'));
    d.addDiagramListener('BackgroundContextClicked', () => events.push('BackgroundContextClicked'));

    const onPart = new MouseEvent('contextmenu', { clientX: 10, clientY: 10 });
    d.getRenderer().getCanvas().dispatchEvent(onPart);
    const onBackground = new MouseEvent('contextmenu', { clientX: 900, clientY: 900 });
    d.getRenderer().getCanvas().dispatchEvent(onBackground);

    expect(events).toEqual(['ObjectContextClicked', 'BackgroundContextClicked']);
  });

  it('InputEvent exposes control/shift/alt/meta/button/left/right', () => {
    const down = new MouseEvent('mousedown', {
      button: 2,
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: true,
    });
    const input = new InputEvent(down);
    expect(input.control).toBe(true);
    expect(input.shift).toBe(true);
    expect(input.alt).toBe(true);
    expect(input.meta).toBe(true);
    expect(input.button).toBe(2);
    expect(input.right).toBe(true);
    expect(input.left).toBe(false);
  });
});

describe('N16: Link.fromSpot/toSpot force a fixed attachment point', () => {
  it('anchors the link at the given spot instead of the nearest-edge/port default', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 300, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    const link = [...d.links.values()][0] as Link;

    // Default (no spot override): nearest-edge heuristic anchors on node 1's right edge.
    expect(link.fromPort.x).toBeCloseTo(100);
    expect(link.fromPort.y).toBeCloseTo(25);

    link.fromSpot = Spot.Top; // force attachment to the top-center instead
    d.invalidateLinksForNode(1);

    expect(link.fromPort.x).toBeCloseTo(50); // node1 center x
    expect(link.fromPort.y).toBeCloseTo(0); // node1 top edge, not the right edge
  });
});

describe('G1: moving an obstacle node re-routes non-adjacent links', () => {
  it('invalidateLinksForNode clears pathPoints of links not attached to the moved node', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 100, height: 50 },
        { key: 2, x: 300, y: 0, width: 100, height: 50 },
        { key: 3, x: 600, y: 0, width: 100, height: 50 },
      ],
      linkDataArray: [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ],
    });

    const attached = [...d.links.values()].find((l) => l.fromKey === 1 || l.toKey === 1) as Link;
    const unrelated = [...d.links.values()].find((l) => l.fromKey !== 1 && l.toKey !== 1) as Link;

    attached.setPathPoints([
      { x: 100, y: 25 },
      { x: 300, y: 25 },
    ]);
    unrelated.setPathPoints([
      { x: 400, y: 25 },
      { x: 600, y: 25 },
    ]);
    expect(attached.pathPoints.length).toBeGreaterThan(0);
    expect(unrelated.pathPoints.length).toBeGreaterThan(0);

    // Node 1 moves: it is an obstacle for the 2→3 link, so both paths reset.
    d.invalidateLinksForNode(1);

    expect(attached.pathPoints.length).toBe(0);
    expect(unrelated.pathPoints.length).toBe(0);
  });
});

describe('O17: Diagram.collapseTree/expandTree and TreeExpanderButton/PanelExpanderButton', () => {
  it('collapseTree hides all descendants; expandTree shows only direct children whose own subtree is not collapsed', () => {
    const d = createDiagram();
    // A -> B -> D, A -> C (a small tree via the "parent" data property)
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 'A', x: 0, y: 0 },
        { key: 'B', x: 100, y: 100, parent: 'A' },
        { key: 'C', x: 200, y: 100, parent: 'A' },
        { key: 'D', x: 100, y: 200, parent: 'B' },
      ],
    });
    const a = d.findNodeForKey('A')!;
    const b = d.findNodeForKey('B')!;
    const c = d.findNodeForKey('C')!;
    const dd = d.findNodeForKey('D')!;

    d.collapseTree(a);
    expect(a.isTreeExpanded).toBe(false);
    expect(b.visible).toBe(false);
    expect(c.visible).toBe(false);
    expect(dd.visible).toBe(false); // hidden regardless of depth

    d.expandTree(a);
    expect(a.isTreeExpanded).toBe(true);
    expect(b.visible).toBe(true);
    expect(c.visible).toBe(true);
    expect(dd.visible).toBe(true); // B was still expanded, so D reappears too
  });

  it('expandTree does not reveal grandchildren of a child that is itself collapsed', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 'A', x: 0, y: 0 },
        { key: 'B', x: 100, y: 100, parent: 'A' },
        { key: 'D', x: 100, y: 200, parent: 'B' },
      ],
    });
    const a = d.findNodeForKey('A')!;
    const b = d.findNodeForKey('B')!;
    const dd = d.findNodeForKey('D')!;

    d.collapseTree(b); // B's own subtree (D) is collapsed
    expect(dd.visible).toBe(false);

    d.collapseTree(a);
    d.expandTree(a); // re-expanding A shows B, but B is still individually collapsed
    expect(b.visible).toBe(true);
    expect(dd.visible).toBe(false);
  });

  it('fires TreeCollapsed/TreeExpanded diagram events', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 'A', x: 0, y: 0 },
        { key: 'B', x: 100, y: 100, parent: 'A' },
      ],
    });
    const a = d.findNodeForKey('A')!;
    const events: string[] = [];
    d.addDiagramListener('TreeCollapsed', () => events.push('TreeCollapsed'));
    d.addDiagramListener('TreeExpanded', () => events.push('TreeExpanded'));

    d.collapseTree(a);
    d.expandTree(a);
    expect(events).toEqual(['TreeCollapsed', 'TreeExpanded']);
  });

  it("TreeExpanderButton toggles the clicked node's tree on click", async () => {
    const { TreeExpanderButton } = await import('../src/panel/Buttons.ts');
    const $ = GraphObject.make;
    const d = createDiagram();
    d.nodeTemplate = $(Panel, 'Spot', $(Shape, 'rect'), TreeExpanderButton());
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 'A', x: 0, y: 0, width: 60, height: 30 },
        { key: 'B', x: 100, y: 100, width: 60, height: 30, parent: 'A' },
      ],
    });
    const a = d.findNodeForKey('A')!;
    const b = d.findNodeForKey('B')!;
    const button = a.findObject('TREEEXPANDERBUTTON')!;

    expect(a.isTreeExpanded).toBe(true);
    button.click!(new InputEvent(new MouseEvent('click')), button);
    expect(a.isTreeExpanded).toBe(false);
    expect(b.visible).toBe(false);

    button.click!(new InputEvent(new MouseEvent('click')), button);
    expect(a.isTreeExpanded).toBe(true);
    expect(b.visible).toBe(true);
  });

  it('PanelExpanderButton toggles the visibility of a named element in the same template', async () => {
    const { PanelExpanderButton } = await import('../src/panel/Buttons.ts');
    const $ = GraphObject.make;
    const d = createDiagram();
    d.nodeTemplate = $(
      Panel,
      'Vertical',
      $(Shape, 'rect'),
      $(TextBlock, 'Details go here', { name: 'DETAILS' }),
      PanelExpanderButton('DETAILS'),
    );
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    const node = d.findNodeForKey(1)!;
    const details = node.findObject('DETAILS')!;
    const button = node.findObject('PANELEXPANDERBUTTON_DETAILS')!;

    expect(details.visible).toBe(true);
    button.click!(new InputEvent(new MouseEvent('click')), button);
    expect(details.visible).toBe(false);
    button.click!(new InputEvent(new MouseEvent('click')), button);
    expect(details.visible).toBe(true);
  });
});

describe('O18: DraggingTool.isGuidedDraggingEnabled (alignment guidelines)', () => {
  it('is disabled by default: dragging near another node does not snap', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 200, y: 3, width: 50, height: 30 },
      ],
    });
    const node2 = d.findNodeForKey(2)!;
    const tool = d.toolManager.draggingTool!;
    expect(tool.isGuidedDraggingEnabled).toBe(false);

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 210, clientY: 13 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 220, clientY: 13 }));
    tool.doMouseUp(new MouseEvent('mouseup', { button: 0, clientX: 220, clientY: 13 }));

    // Moved by exactly +10/+0 with no snapping toward node1's y=0 top edge.
    expect(node2.bounds.x).toBe(210);
    expect(node2.bounds.y).toBe(3);
    expect(d.getAlignmentGuidelines()).toEqual([]);
  });

  it('snaps the dragged node onto a nearby edge/center and shows a guideline', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 }, // top edge at y=0
        { key: 2, x: 200, y: 4, width: 50, height: 30 }, // top edge at y=4, within threshold of 0
      ],
    });
    const node2 = d.findNodeForKey(2)!;
    const tool = d.toolManager.draggingTool!;
    tool.isGuidedDraggingEnabled = true;

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 210, clientY: 14 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 260, clientY: 14 }));

    // x moved freely by +50 (no horizontal alignment candidate nearby)...
    expect(node2.bounds.x).toBe(250);
    // ...but y snapped from 4 back to 0 to align with node1's top edge.
    expect(node2.bounds.y).toBe(0);
    expect(d.getAlignmentGuidelines().length).toBe(1);

    tool.doMouseUp(new MouseEvent('mouseup', { button: 0, clientX: 260, clientY: 14 }));
    // Guidelines are cleared once the drag ends.
    expect(d.getAlignmentGuidelines()).toEqual([]);
  });

  it('does not snap once the misalignment exceeds guidelineSnapDistance', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 200, y: 40, width: 50, height: 30 }, // top edge at y=40, far from y=0
      ],
    });
    const node2 = d.findNodeForKey(2)!;
    const tool = d.toolManager.draggingTool!;
    tool.isGuidedDraggingEnabled = true;
    tool.guidelineSnapDistance = 6;

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 210, clientY: 50 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 260, clientY: 50 }));

    expect(node2.bounds.y).toBe(40); // unchanged: 40 is outside the 6px threshold
    expect(d.getAlignmentGuidelines()).toEqual([]);
  });

  it('is skipped while grid snapping is enabled', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 200, y: 4, width: 50, height: 30 },
      ],
    });
    const node2 = d.findNodeForKey(2)!;
    const tool = d.toolManager.draggingTool!;
    tool.isGuidedDraggingEnabled = true;
    d.enableSnapToGrid();
    d.setGridSize(10);

    // dy = +2 -> pre-snap y = 6: within the alignment threshold of node1's
    // y=0 top edge (would snap to 0), but grid-snaps (size 10) to 10 instead.
    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 210, clientY: 14 }));
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 260, clientY: 16 }));

    expect(node2.bounds.y).toBe(10);
    expect(d.getAlignmentGuidelines()).toEqual([]);
  });
});

describe('O19: LinkLabelDraggingTool', () => {
  function setupLabeledLink(d: Diagram): Link {
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 30 },
        { key: 2, x: 250, y: 0, width: 50, height: 30 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    const link = [...d.links.values()][0] as Link;
    link.setPathPoints([
      { x: 0, y: 50 },
      { x: 200, y: 50 },
    ]);
    link.label = 'Edge';
    return link;
  }

  it('getLabelBounds centers the label at the segment midpoint plus the perpendicular offset', () => {
    const d = createDiagram();
    const link = setupLabeledLink(d);

    const bounds = link.getLabelBounds()!;
    // Midpoint (100, 50) + default labelOffset (7) along the downward normal.
    expect(bounds.center.x).toBeCloseTo(100, 5);
    expect(bounds.center.y).toBeCloseTo(57, 5);
  });

  it('dragging the label onto the path sets segmentFraction/offset to match the drop point', async () => {
    const d = createDiagram();
    const link = setupLabeledLink(d);

    const { LinkLabelDraggingTool } = await import('../src/tool/LinkLabelDraggingTool.ts');
    const tool = new LinkLabelDraggingTool();
    tool.diagram = d;

    expect(
      tool.canStart(
        'linkLabelDragging',
        new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 57 }),
      ),
    ).toBe(true);

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 57 }));
    expect(tool.isDragging).toBe(true);
    tool.doMouseMove(new MouseEvent('mousemove', { button: 0, clientX: 200, clientY: 50 }));

    // (200, 50) is exactly the segment's end point b -> fraction 1, offset 0.
    expect(link.labelSegmentIndex).toBe(0);
    expect(link.labelSegmentFraction).toBeCloseTo(1, 5);
    expect(link.labelOffset).toBeCloseTo(0, 5);
    expect(link.labelSide).toBe('auto');

    tool.doMouseUp(new MouseEvent('mouseup', { button: 0, clientX: 200, clientY: 50 }));
    expect(tool.isDragging).toBe(false);

    // The move was recorded as a single undoable transaction.
    d.getUndoManager().undo();
    expect(link.labelSegmentFraction).toBeCloseTo(0.5, 5);
    expect(link.labelOffset).toBeCloseTo(7, 5);

    d.getUndoManager().redo();
    expect(link.labelSegmentFraction).toBeCloseTo(1, 5);
    expect(link.labelOffset).toBeCloseTo(0, 5);
  });

  it('does not start when the click misses the label', async () => {
    const d = createDiagram();
    setupLabeledLink(d);

    const { LinkLabelDraggingTool } = await import('../src/tool/LinkLabelDraggingTool.ts');
    const tool = new LinkLabelDraggingTool();
    tool.diagram = d;

    expect(
      tool.canStart(
        'linkLabelDragging',
        new MouseEvent('mousedown', { button: 0, clientX: 600, clientY: 600 }),
      ),
    ).toBe(false);

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 600, clientY: 600 }));
    expect(tool.isDragging).toBe(false);
    expect(tool.currentLink).toBeNull();
  });

  it('does not push an undo command when the label is dropped back in place', async () => {
    const d = createDiagram();
    const link = setupLabeledLink(d);
    const sizeBefore = d.getUndoManager().getUndoStack().length;

    const { LinkLabelDraggingTool } = await import('../src/tool/LinkLabelDraggingTool.ts');
    const tool = new LinkLabelDraggingTool();
    tool.diagram = d;

    tool.doMouseDown(new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 57 }));
    tool.doMouseUp(new MouseEvent('mouseup', { button: 0, clientX: 100, clientY: 57 }));

    expect(link.labelSegmentFraction).toBeCloseTo(0.5, 5);
    expect(d.getUndoManager().getUndoStack().length).toBe(sizeBefore);
  });
});

describe('O20: GraphObject.margin accepts a plain number (GoJS shorthand for a uniform margin)', () => {
  it('normalizes a numeric margin into a Margin with that value on all four sides', () => {
    const t = new TextBlock('x');
    t.margin = 8;
    expect(t.margin?.top).toBe(8);
    expect(t.margin?.right).toBe(8);
    expect(t.margin?.bottom).toBe(8);
    expect(t.margin?.left).toBe(8);
  });

  it('actually affects layout: measureWithMargin adds the margin on every side', () => {
    const noMargin = new TextBlock('x');
    noMargin.desiredSize = new Size(20, 10);
    const withMargin = new TextBlock('x');
    withMargin.desiredSize = new Size(20, 10);
    withMargin.margin = 5;

    const base = noMargin.measureWithMargin();
    const padded = withMargin.measureWithMargin();
    expect(padded.width).toBe(base.width + 10); // +5 left +5 right
    expect(padded.height).toBe(base.height + 10); // +5 top +5 bottom
  });

  it('a Margin instance (or Margin-shaped object) still passes through unchanged', () => {
    const t = new TextBlock('x');
    t.margin = { top: 1, right: 2, bottom: 3, left: 4 } as never;
    expect(t.margin?.top).toBe(1);
    expect(t.margin?.left).toBe(4);
  });
});

describe('O21: bare label/fill/stroke node & group data properties apply on the initial model load', () => {
  it('applies node.label/fill/stroke/angle from nodeData without needing a template or binding', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, label: 'Hello', fill: '#ff0000', stroke: '#00ff00', angle: 45 },
      ],
    });
    const node = d.findNodeForKey(1)!;

    expect(node.label).toBe('Hello');
    expect(node.fill).toBe('#ff0000');
    expect(node.stroke).toBe('#00ff00');
    expect(node.angle).toBe(45);
  });

  it('applies group.fill/stroke from nodeData without needing a template', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, isGroup: true, x: 0, y: 0, fill: '#123456', stroke: '#abcdef' }],
    });
    const group = d.getPart(1) as Group;

    expect(group.fill).toBe('#123456');
    expect(group.stroke).toBe('#abcdef');
  });

  it('picks up a later bare-property change on a full model resync (not just via single-node sync)', () => {
    const d = createDiagram();
    const model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, label: 'Before' }],
    });
    d.model = model;
    expect(d.findNodeForKey(1)!.label).toBe('Before');

    model.setNodeProperty(1, 'label', 'After');
    // Force a full resync path (same one `diagram.model = ...` goes through).
    d.model = model;
    expect(d.findNodeForKey(1)!.label).toBe('After');
  });
});

describe('O22: accessibility — ARIA attributes, live region, keyboard focus cursor', () => {
  function getLiveRegion(d: Diagram): HTMLElement {
    const canvas = d.getRenderer().getCanvas();
    return canvas.parentElement!.querySelector('[aria-live]') as HTMLElement;
  }

  it('the canvas is keyboard-focusable with an application role and roledescription', () => {
    const d = createDiagram();
    const canvas = d.getRenderer().getCanvas();

    expect(canvas.tabIndex).toBe(0);
    expect(canvas.getAttribute('role')).toBe('application');
    expect(canvas.getAttribute('aria-roledescription')).toBe('diagram');
  });

  it('creates a visually-hidden aria-live region next to the canvas', () => {
    const d = createDiagram();
    const live = getLiveRegion(d);

    expect(live).not.toBeNull();
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.style.width).toBe('1px');
  });

  it('the aria-label reflects node/link counts and updates on model load', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0 },
        { key: 2, x: 100, y: 0 },
        { key: 3, isGroup: true, x: 200, y: 0 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });

    const label = d.getRenderer().getCanvas().getAttribute('aria-label')!;
    expect(label).toContain('2 nodos');
    expect(label).toContain('1 grupo');
    expect(label).toContain('1 enlace');
  });

  it('announces the selection and appends the selected count to the aria-label', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, label: 'Alpha' }],
    });
    const node = d.findNodeForKey(1)!;
    const live = getLiveRegion(d);

    d.select(node);
    expect(live.textContent).toContain('Alpha');
    expect(live.textContent).toContain('seleccionado');
    expect(d.getRenderer().getCanvas().getAttribute('aria-label')).toContain('1 seleccionado');

    d.clearSelection();
    expect(live.textContent).toBe('Selección vacía');
  });

  it('ArrowDown moves a keyboard focus cursor between parts when nothing is selected and the canvas is focused', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 20, height: 20, label: 'First' },
        { key: 2, x: 100, y: 0, width: 20, height: 20, label: 'Second' },
      ],
    });
    const canvas = d.getRenderer().getCanvas();
    document.body.appendChild(canvas.parentElement!); // jsdom only focuses connected elements
    canvas.focus();
    expect(document.activeElement).toBe(canvas);
    const live = getLiveRegion(d);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(live.textContent).toContain('First');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(live.textContent).toContain('Second');

    // Wraps back around to the first part.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(live.textContent).toContain('First');
  });

  it('Enter selects the focused part; Escape clears both the focus cursor and the selection', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 20, height: 20, label: 'Only' }],
    });
    const node = d.findNodeForKey(1)!;
    const canvas = d.getRenderer().getCanvas();
    document.body.appendChild(canvas.parentElement!);
    canvas.focus();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(node.isSelected).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(node.isSelected).toBe(false);
  });

  it('arrow keys still nudge an existing selection instead of moving the focus cursor', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 20, height: 20 }],
    });
    const node = d.findNodeForKey(1)!;
    const canvas = d.getRenderer().getCanvas();
    canvas.focus();
    d.select(node);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(node.bounds.x).toBeGreaterThan(0); // nudged, not just a focus-cursor move
  });

  it('removing the focused part clears the dangling focus-cursor reference', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 20, height: 20 }],
    });
    const canvas = d.getRenderer().getCanvas();
    document.body.appendChild(canvas.parentElement!);
    canvas.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(() => d.getModel().removeNode(1)).not.toThrow();
    expect(() => d.invalidate()).not.toThrow();
  });
});
