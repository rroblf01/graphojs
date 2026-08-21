// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { HTMLInfo } from '../../src/panel/HTMLInfo.ts';
import type { Node } from '../../src/parts/Node.ts';

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

describe('HTMLInfo', () => {
  it('constructs from a partial init bag', () => {
    const el = document.createElement('div');
    const info = new HTMLInfo({ mainElement: el });
    expect(info.mainElement).toBe(el);
    expect(info.show).toBeNull();
  });

  it('invokeShow calls the show callback with (part, diagram, tool)', () => {
    const show = vi.fn();
    const info = new HTMLInfo({ show });
    const div = document.createElement('div');
    const d = new Diagram({ div });
    info.invokeShow(null, d, null);
    expect(show).toHaveBeenCalledWith(null, d, null);
    d.destroy();
  });

  it('invokeHide calls the hide callback when set', () => {
    const hide = vi.fn();
    const info = new HTMLInfo({ hide });
    const div = document.createElement('div');
    const d = new Diagram({ div });
    info.invokeHide(d, null);
    expect(hide).toHaveBeenCalledWith(d, null);
    d.destroy();
  });

  it('invokeHide falls back to hiding mainElement when hide is unset', () => {
    const el = document.createElement('div');
    const info = new HTMLInfo({ mainElement: el });
    const div = document.createElement('div');
    const d = new Diagram({ div });
    info.invokeHide(d, null);
    expect(el.style.display).toBe('none');
    d.destroy();
  });
});

describe('Diagram context menu / toolTip accept an HTMLInfo', () => {
  it('right-click shows an HTMLInfo context menu via its show callback', () => {
    const div = document.createElement('div');
    const d = new Diagram({ div });
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const node = d.findNodeForKey(1) as Node;
    const show = vi.fn();
    const hide = vi.fn();
    node.contextMenu = new HTMLInfo({ show, hide });

    d.findPartAt = () => node;
    (d as unknown as { handleContextMenu(e: MouseEvent): void }).handleContextMenu(
      new MouseEvent('contextmenu', { clientX: 10, clientY: 10 }),
    );

    expect(show).toHaveBeenCalledTimes(1);
    expect(show.mock.calls[0]?.[0]).toBe(node);

    d.hideContextMenu();
    expect(hide).toHaveBeenCalledTimes(1);
    d.destroy();
  });

  it('hover shows an HTMLInfo tooltip via its show callback', async () => {
    const div = document.createElement('div');
    const d = new Diagram({ div });
    d.toolTipDelay = 0;
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const node = d.findNodeForKey(1) as Node;
    const show = vi.fn();
    node.toolTip = new HTMLInfo({ show });
    d.findPartAt = () => node;

    (d as unknown as { handleToolTipMouseMove(e: MouseEvent): void }).handleToolTipMouseMove(
      new MouseEvent('mousemove', { clientX: 10, clientY: 10 }),
    );
    await vi.waitFor(() => {
      expect(show).toHaveBeenCalledTimes(1);
    });
    expect(show.mock.calls[0]?.[0]).toBe(node);
    d.destroy();
  });
});
