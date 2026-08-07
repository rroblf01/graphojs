// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import {
  deserializeFromGraphML,
  exportToGraphMLFile,
  importFromGraphMLFile,
  serializeToGraphML,
} from '../../src/serialization/Serializer.ts';

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

const diagrams: Diagram[] = [];

function createDiagram(): Diagram {
  const d = new Diagram({ div: document.createElement('div') });
  diagrams.push(d);
  return d;
}

afterEach(() => {
  for (const d of diagrams) d.destroy();
  diagrams.length = 0;
});

describe('Serializer: GraphML export/import', () => {
  it('serializes nodes and edges with custom data as <key>/<data> elements', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, label: 'Start', isRoot: true },
        { key: 2, label: 'End' },
      ],
      linkDataArray: [{ from: 1, to: 2, label: 'goes to' }],
    });

    const xml = serializeToGraphML(d);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<graphml xmlns="http://graphml.graphdrawing.org/xmlns">');
    expect(xml).toContain('<key id="d0" for="node" attr.name="label" attr.type="string"/>');
    expect(xml).toContain('<key id="d1" for="node" attr.name="isRoot" attr.type="boolean"/>');
    expect(xml).toContain('<node id="1">');
    expect(xml).toContain('<data key="d0">Start</data>');
    expect(xml).toContain('<edge id="e0" source="1" target="2">');
    expect(xml).toContain('goes to');
    expect(xml).toContain('</graphml>');
  });

  it('escapes special XML characters in data values', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, label: 'A & B <tag> "quoted"' }],
    });

    const xml = serializeToGraphML(d);
    expect(xml).toContain('A &amp; B &lt;tag&gt; &quot;quoted&quot;');
    expect(xml).not.toContain('A & B <tag>');
  });

  it('round-trips numeric keys, numeric/boolean data, and edges through export + import', () => {
    const original = createDiagram();
    original.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, label: 'Alpha', weight: 3, active: true },
        { key: 2, label: 'Beta', weight: 1.5, active: false },
      ],
      linkDataArray: [{ from: 1, to: 2, strength: 7 }],
    });

    const xml = serializeToGraphML(original);

    const restored = createDiagram();
    deserializeFromGraphML(xml, restored);

    const nodeDataArray = restored.getModel().nodeDataArray;
    expect(nodeDataArray).toHaveLength(2);
    const alpha = nodeDataArray.find((n) => n.key === 1);
    expect(alpha).toBeDefined();
    expect(alpha?.label).toBe('Alpha');
    expect(alpha?.weight).toBe(3);
    expect(alpha?.active).toBe(true);
    const beta = nodeDataArray.find((n) => n.key === 2);
    expect(beta?.weight).toBe(1.5);
    expect(beta?.active).toBe(false);

    const linkDataArray = restored.getModel().linkDataArray;
    expect(linkDataArray).toHaveLength(1);
    expect(linkDataArray[0]?.from).toBe(1); // numeric, not the string "1"
    expect(linkDataArray[0]?.to).toBe(2);
    expect(linkDataArray[0]?.strength).toBe(7);
  });

  it('keeps non-numeric node keys as strings through the round trip', () => {
    const original = createDiagram();
    original.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 'alpha', label: 'A' },
        { key: 'beta', label: 'B' },
      ],
      linkDataArray: [{ from: 'alpha', to: 'beta' }],
    });

    const restored = createDiagram();
    deserializeFromGraphML(serializeToGraphML(original), restored);

    expect(restored.findNodeForKey('alpha')).not.toBeNull();
    const link = restored.getModel().linkDataArray[0];
    expect(link?.from).toBe('alpha');
    expect(link?.to).toBe('beta');
  });

  it('throws on malformed XML', () => {
    const d = createDiagram();
    expect(() => deserializeFromGraphML('<graphml><node id="1"></graphml>', d)).toThrow();
  });

  it('exportToGraphMLFile triggers a file download', () => {
    const d = createDiagram();
    d.model = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });

    const clickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((tag: string) => {
        if (tag === 'a') {
          return { click: clickSpy, href: '', download: '' } as unknown as HTMLAnchorElement;
        }
        return originalCreateElement(tag);
      });
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    exportToGraphMLFile(d, 'graph.graphml');

    expect(clickSpy).toHaveBeenCalled();
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock');

    createElementSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('importFromGraphMLFile resolves without loading a model when no file is chosen', async () => {
    const d = createDiagram();
    const input = { type: '', accept: '', onchange: null as unknown, click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValueOnce(input as unknown as HTMLInputElement);

    const promise = importFromGraphMLFile(d);
    (input.onchange as (e: Event) => void)({ target: { files: [] } } as unknown as Event);
    await expect(promise).resolves.toBeUndefined();

    vi.restoreAllMocks();
  });
});
