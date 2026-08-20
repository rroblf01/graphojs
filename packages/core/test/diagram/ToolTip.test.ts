// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { GraphObject } from '../../src/panel/GraphObject.ts';
import { Panel } from '../../src/panel/Panel.ts';
import { TextBlock } from '../../src/panel/TextBlock.ts';
import type { Node } from '../../src/parts/Node.ts';

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
    roundRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 40 })),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    font: '',
    textBaseline: '',
    textAlign: '',
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
});

function createDiagramWithNode(): { diagram: Diagram; node: Node } {
  const div = document.createElement('div');
  const diagram = new Diagram({ div });
  diagram.model = new GraphLinksModel({
    nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
  });
  const node = diagram.findNodeForKey(1) as Node;
  // Hit-test always resolves to this node, regardless of the dispatched
  // event's real coordinates — keeps the test independent of jsdom layout.
  diagram.findPartAt = () => node;
  return { diagram, node };
}

type ToolTipInternals = {
  handleToolTipMouseMove(e: MouseEvent): void;
  handleToolTipMouseLeave(): void;
  _toolTipEl: HTMLElement | null;
};

function moveOverCanvas(diagram: Diagram): void {
  (diagram as unknown as ToolTipInternals).handleToolTipMouseMove(
    new MouseEvent('mousemove', { clientX: 50, clientY: 50 }),
  );
}

function leaveCanvas(diagram: Diagram): void {
  (diagram as unknown as ToolTipInternals).handleToolTipMouseLeave();
}

function getToolTipEl(diagram: Diagram): HTMLElement | null {
  return (diagram as unknown as ToolTipInternals)._toolTipEl;
}

describe('Part.toolTip — GoJS-compatible hover tooltip (Panel template)', () => {
  it('shows the toolTip Panel after hovering a part, once toolTipDelay elapses', async () => {
    const { diagram, node } = createDiagramWithNode();
    diagram.toolTipDelay = 0;
    node.toolTip = GraphObject.make(Panel, 'Auto', GraphObject.make(TextBlock, 'Hi'));

    expect(getToolTipEl(diagram)).toBeNull();

    moveOverCanvas(diagram);
    await vi.waitFor(() => {
      expect(getToolTipEl(diagram)).not.toBeNull();
    });
    expect(getToolTipEl(diagram)?.querySelector('canvas')).not.toBeNull();

    diagram.destroy();
  });

  it('does nothing for a part with no toolTip', async () => {
    const { diagram } = createDiagramWithNode();
    diagram.toolTipDelay = 0;

    moveOverCanvas(diagram);
    await new Promise((r) => setTimeout(r, 10));

    expect(getToolTipEl(diagram)).toBeNull();
    diagram.destroy();
  });

  it('hides the toolTip when the mouse leaves the canvas', async () => {
    const { diagram, node } = createDiagramWithNode();
    diagram.toolTipDelay = 0;
    node.toolTip = GraphObject.make(Panel, 'Auto', GraphObject.make(TextBlock, 'Hi'));

    moveOverCanvas(diagram);
    await vi.waitFor(() => {
      expect(getToolTipEl(diagram)).not.toBeNull();
    });

    leaveCanvas(diagram);
    expect(getToolTipEl(diagram)).toBeNull();
    diagram.destroy();
  });

  it('hides the toolTip and stops the pending timer on destroy()', async () => {
    const { diagram, node } = createDiagramWithNode();
    diagram.toolTipDelay = 50;
    node.toolTip = GraphObject.make(Panel, 'Auto', GraphObject.make(TextBlock, 'Hi'));

    moveOverCanvas(diagram);
    diagram.destroy();

    await new Promise((r) => setTimeout(r, 80));
    expect(getToolTipEl(diagram)).toBeNull();
    expect(document.body.querySelector('canvas')).toBeNull();
  });
});
