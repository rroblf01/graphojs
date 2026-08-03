// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { LinkingTool } from '../../src/tool/LinkingTool.ts';
import { RelinkingTool } from '../../src/tool/RelinkingTool.ts';
import { Node } from '../../src/parts/Node.ts';
import { Link } from '../../src/parts/Link.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { UndoManager } from '../../src/undo/UndoManager.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(): Diagram {
  const model = new GraphLinksModel();
  const undoManager = new UndoManager();
  model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
  model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
  model.addNode({ key: 3, x: 200, y: 200, width: 100, height: 50 });

  const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
  const node2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
  const node3 = Node.fromPosAndSize(3, 200, 200, 100, 50);
  const nodes = [node1, node2, node3];
  const links: Link[] = [];

  return {
    getModel: () => model,
    getUndoManager: () => undoManager,
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    findPartAt: (x: number, y: number) => {
      for (const n of nodes) {
        if (n.containsPoint({ x, y })) return n;
      }
      for (const l of links) {
        if (l.containsPoint({ x, y })) return l;
      }
      return null;
    },
    getPart: (key: string | number) =>
      nodes.find((n) => n.key === key) ?? links.find((l) => l.key === key),
    showTempLink: vi.fn(),
    hideTempLink: vi.fn(),
    getTempLink: () => null,
  } as unknown as Diagram;
}

describe('LinkingTool', () => {
  it('should create with defaults', () => {
    const tool = new LinkingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isLinking).toBe(false);
    expect(tool.sourceNode).toBeNull();
    expect(tool.targetNode).toBeNull();
  });

  it('should start linking on node mousedown', () => {
    const diagram = createMockDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;

    const event = new MouseEvent('mousedown', { button: 0, clientX: 0, clientY: 0 });
    tool.doMouseDown(event);

    expect(tool.isLinking).toBe(true);
    expect(tool.sourceNode).not.toBeNull();
    expect(diagram.showTempLink).toHaveBeenCalled();
  });

  it('should not start linking on empty area', () => {
    const diagram = createMockDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;
    // Override findPartAt to return null
    const original = diagram.findPartAt;
    diagram.findPartAt = () => null;

    const event = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(event);
    expect(tool.isLinking).toBe(false);

    diagram.findPartAt = original;
  });

  it('should not start linking on right click', () => {
    const diagram = createMockDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;

    const event = new MouseEvent('mousedown', { button: 2 });
    tool.doMouseDown(event);
    expect(tool.isLinking).toBe(false);
  });

  it('should create a link between nodes', () => {
    const diagram = createMockDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;

    const node1 = diagram.getPart(1) as Node;
    const node2 = diagram.getPart(2) as Node;

    expect(tool.createLink(node1, node2)).toBe(true);
    const model = diagram.getModel();
    expect(model.getLinkCount()).toBe(1);
    expect(model.containsLink(1, 2)).toBe(true);
  });

  it('should not create duplicate links when disallowed', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    model.allowsDuplicateLinks = false;
    model.addLink({ from: 1, to: 2 });

    const tool = new LinkingTool();
    tool.diagram = diagram;
    const node1 = diagram.getPart(1) as Node;
    const node2 = diagram.getPart(2) as Node;

    expect(tool.createLink(node1, node2)).toBe(false);
    expect(model.getLinkCount()).toBe(1);
  });

  it('should not create link with invalid node', () => {
    const diagram = createMockDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;
    const ghost = Node.fromPosAndSize(99, 0, 0, 10, 10);

    expect(tool.createLink(ghost, diagram.getPart(2) as Node)).toBe(false);
  });
});

describe('RelinkingTool', () => {
  it('should create with defaults', () => {
    const tool = new RelinkingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isRelinking).toBe(false);
    expect(tool.link).toBeNull();
    expect(tool.end).toBe('to');
  });

  it('should start relinking on link mousedown', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    model.addLink({ key: 100, from: 1, to: 2 });

    // Create a Link part and register it for hit-testing
    const link = new Link(100, 1, 2);
    link.fromPort = { x: 50, y: 25 };
    link.toPort = { x: 250, y: 25 };
    link.setPathPoints([
      { x: 50, y: 25 },
      { x: 250, y: 25 },
    ]);
    const originalFind = diagram.findPartAt;
    diagram.findPartAt = (x: number, y: number) => {
      const n = (diagram.getPart as (k: string | number) => Node | Link | undefined)(1);
      if (n instanceof Node && n.containsPoint({ x, y })) return n;
      if (link.containsPoint({ x, y })) return link;
      return null;
    };
    // Mouse over the middle of the link (point on link path)
    const originalGetPoint = diagram.getDiagramPoint;
    diagram.getDiagramPoint = () => ({ x: 150, y: 25 });

    const tool = new RelinkingTool();
    tool.diagram = diagram;
    const event = new MouseEvent('mousedown', { button: 0 });
    tool.doMouseDown(event);

    expect(tool.isRelinking).toBe(true);
    expect(tool.link).toBe(link);

    diagram.findPartAt = originalFind;
    diagram.getDiagramPoint = originalGetPoint;
  });

  it('should reconnect a link endpoint', () => {
    const diagram = createMockDiagram();
    const model = diagram.getModel();
    model.addLink({ key: 100, from: 1, to: 2 });

    const link = new Link(100, 1, 2);
    const tool = new RelinkingTool();
    tool.diagram = diagram;

    const node3 = diagram.getPart(3) as Node;
    // Force 'to' end
    (tool as unknown as { _end: 'from' | 'to' })._end = 'to';

    expect(tool.reconnectLink(link, node3)).toBe(true);
    const linkData = model.getLinkData(100);
    expect(linkData?.to).toBe(3);
  });
});

describe('LinkingTool cycle prevention', () => {
  function createChainDiagram(): Diagram {
    const model = new GraphLinksModel();
    const undoManager = new UndoManager();
    model.addNode({ key: 1, x: 0, y: 0, width: 100, height: 50 });
    model.addNode({ key: 2, x: 200, y: 0, width: 100, height: 50 });
    model.addNode({ key: 3, x: 400, y: 0, width: 100, height: 50 });
    model.addLink({ key: 100, from: 1, to: 2 });
    model.addLink({ key: 101, from: 2, to: 3 });

    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
    const node3 = Node.fromPosAndSize(3, 400, 0, 100, 50);
    const nodes = [node1, node2, node3];
    const links: Link[] = [];

    return {
      getModel: () => model,
      getUndoManager: () => undoManager,
      getDiagramPoint: () => ({ x: 0, y: 0 }),
      getPart: (key: string | number) =>
        nodes.find((n) => n.key === key) ?? links.find((l) => l.key === key),
      findPartAt: () => null,
      showTempLink: vi.fn(),
      hideTempLink: vi.fn(),
      getTempLink: () => null,
      getSelectedParts: () => [],
    } as unknown as Diagram;
  }

  it('should be disabled by default', () => {
    const tool = new LinkingTool();
    expect(tool.preventCycles).toBe(false);
  });

  it('should allow normal links when cycles allowed', () => {
    const diagram = createChainDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;
    const model = diagram.getModel();

    expect(tool.createLink(diagram.getPart(3) as Node, diagram.getPart(1) as Node)).toBe(true);
    expect(model.getLinkCount()).toBe(3);
  });

  it('should prevent cycles when enabled', () => {
    const diagram = createChainDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;
    tool.preventCycles = true;
    const model = diagram.getModel();

    // 1 -> 2 -> 3, so linking 3 -> 1 would create a cycle
    expect(tool.createLink(diagram.getPart(3) as Node, diagram.getPart(1) as Node)).toBe(false);
    expect(model.getLinkCount()).toBe(2);

    // Linking 3 -> 2 also creates a cycle
    expect(tool.createLink(diagram.getPart(3) as Node, diagram.getPart(2) as Node)).toBe(false);

    // Linking a node to itself is prevented
    expect(tool.createLink(diagram.getPart(1) as Node, diagram.getPart(1) as Node)).toBe(false);
  });

  it('should allow non-cycle links when enabled', () => {
    const diagram = createChainDiagram();
    const tool = new LinkingTool();
    tool.diagram = diagram;
    tool.preventCycles = true;
    const model = diagram.getModel();

    // Linking 1 -> 3 is fine (no cycle)
    expect(tool.createLink(diagram.getPart(1) as Node, diagram.getPart(3) as Node)).toBe(true);
    expect(model.getLinkCount()).toBe(3);
  });
});
