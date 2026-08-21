// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { Point } from '../../src/geometry/Point.ts';
import { Size } from '../../src/geometry/Size.ts';
import { PositionArray } from '../../src/layout/PositionArray.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { Panel } from '../../src/panel/Panel.ts';
import { RowColumnDefinition } from '../../src/panel/RowColumnDefinition.ts';
import { Shape } from '../../src/panel/Shape.ts';
import type { Node } from '../../src/parts/Node.ts';
import { ActionTool } from '../../src/tool/ActionTool.ts';
import { DraggingInfo, DraggingOptions } from '../../src/tool/DraggingOptions.ts';

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(
    () =>
      ({
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
        rect: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        setLineDash: vi.fn(),
        drawImage: vi.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        globalAlpha: 1,
      }) as unknown as CanvasRenderingContext2D,
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
});

describe('DraggingInfo', () => {
  it('defaults point to (0,0) and round-trips a given Point', () => {
    const info = new DraggingInfo();
    expect(info.point.x).toBe(0);
    expect(info.point.y).toBe(0);
    const p = new Point(5, 10);
    const info2 = new DraggingInfo(p);
    expect(info2.point).toBe(p);
    info2.point = new Point(1, 2);
    expect(info2.point.x).toBe(1);
  });
});

describe('DraggingOptions', () => {
  it('has GoJS-documented defaults', () => {
    const opts = new DraggingOptions();
    expect(opts.isGridSnapEnabled).toBe(false);
    expect(opts.isGridSnapRealtime).toBe(true);
    expect(opts.dragsLink).toBe(false);
    expect(opts.groupsAlwaysMove).toBe(true);
    expect(Number.isNaN(opts.gridSnapCellSize.width)).toBe(true);
  });

  it('accepts a partial init override', () => {
    const opts = new DraggingOptions({ isGridSnapEnabled: true, dragsTree: true });
    expect(opts.isGridSnapEnabled).toBe(true);
    expect(opts.dragsTree).toBe(true);
    expect(opts.isGridSnapRealtime).toBe(true); // untouched default
  });
});

describe('RowColumnDefinition', () => {
  it('the {row} shorthand sets isRow=true and index', () => {
    const def = new RowColumnDefinition({ row: 2, height: 40 });
    expect(def.isRow).toBe(true);
    expect(def.index).toBe(2);
    expect(def.height).toBe(40);
  });

  it('the {column} shorthand sets isRow=false and index', () => {
    const def = new RowColumnDefinition({ column: 1, width: 80 });
    expect(def.isRow).toBe(false);
    expect(def.index).toBe(1);
    expect(def.width).toBe(80);
  });

  it('panel is null until explicitly assigned', () => {
    const def = new RowColumnDefinition();
    expect(def.panel).toBeNull();
  });

  it('computeEffectiveSpacing includes strokeWidth and padding*2', () => {
    const def = new RowColumnDefinition();
    def.separatorStrokeWidth = 2;
    def.separatorPadding = 3;
    expect(def.computeEffectiveSpacing()).toBe(2 + 3 * 2);
  });
});

describe('PositionArray', () => {
  it('cells start unoccupied', () => {
    const arr = new PositionArray(new Size(10, 10));
    expect(arr.isUnoccupied(0, 0, 20, 20)).toBe(true);
  });

  it('occupy() marks cells, isUnoccupied() reflects it', () => {
    const arr = new PositionArray(new Size(10, 10));
    arr.occupy(0, 0, 20, 10);
    expect(arr.isUnoccupied(0, 0, 20, 10)).toBe(false);
    expect(arr.isUnoccupied(30, 0, 10, 10)).toBe(true);
  });

  it('bounds covers exactly the occupied cell range', () => {
    const arr = new PositionArray(new Size(10, 10));
    arr.occupy(10, 20, 10, 10);
    const b = arr.bounds;
    expect(b.x).toBe(10);
    expect(b.y).toBe(20);
    expect(b.width).toBe(10);
    expect(b.height).toBe(10);
  });

  it('maxAvoidsLinksSpaceH finds the widest free horizontal run', () => {
    const arr = new PositionArray(new Size(10, 10));
    arr.occupy(20, 0, 10, 10); // blocks the column at x=20..30
    const space = arr.maxAvoidsLinksSpaceH(0, 50, 0, 10);
    expect(space).toBeGreaterThan(0);
    expect(space).toBeLessThan(50);
  });

  it('cellWidth/cellHeight are settable', () => {
    const arr = new PositionArray(new Size(10, 10));
    arr.cellWidth = 5;
    arr.cellHeight = 5;
    expect(arr.cellWidth).toBe(5);
    expect(arr.cellHeight).toBe(5);
  });
});

describe('ActionTool', () => {
  function createDiagramWithActionableNode(): { diagram: Diagram; node: Node; shape: Shape } {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const templateShape = new Shape('rect');
    templateShape.name = 'actionShape';
    templateShape.isActionable = true;
    diagram.nodeTemplate = new Panel('Auto').add(templateShape);
    diagram.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const node = diagram.findNodeForKey(1) as Node;
    // The template is cloned per node — mutate/inspect the live clone, not templateShape.
    const shape = node.findObject('actionShape') as Shape;
    diagram.findPartAt = () => node;
    return { diagram, node, shape };
  }

  it('canStart is true only when the hit GraphObject is isActionable', () => {
    const { diagram, shape } = createDiagramWithActionableNode();
    const tool = new ActionTool();
    tool.diagram = diagram;
    const e = new MouseEvent('mousedown');
    expect(tool.canStart('action', e)).toBe(true);

    shape.isActionable = false;
    expect(tool.canStart('action', e)).toBe(false);
    diagram.destroy();
  });

  it('dispatches actionDown/actionMove/actionUp on the actionable object', () => {
    const { diagram, shape } = createDiagramWithActionableNode();
    const calls: string[] = [];
    shape.actionDown = () => calls.push('down');
    shape.actionMove = () => calls.push('move');
    shape.actionUp = () => calls.push('up');

    const tool = new ActionTool();
    tool.diagram = diagram;
    tool.doMouseDown(new MouseEvent('mousedown'));
    tool.doMouseMove(new MouseEvent('mousemove'));
    tool.doMouseUp(new MouseEvent('mouseup'));

    expect(calls).toEqual(['down', 'move', 'up']);
    diagram.destroy();
  });

  it('doCancel fires actionCancel and clears the target', () => {
    const { diagram, shape } = createDiagramWithActionableNode();
    let cancelled = false;
    shape.actionCancel = () => {
      cancelled = true;
    };
    const tool = new ActionTool();
    tool.diagram = diagram;
    tool.doMouseDown(new MouseEvent('mousedown'));
    tool.doCancel();
    expect(cancelled).toBe(true);
    diagram.destroy();
  });

  it('accepts a partial init bag', () => {
    const tool = new ActionTool({ name: 'myActionTool' });
    expect(tool.name).toBe('myActionTool');
  });
});
