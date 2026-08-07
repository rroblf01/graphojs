// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { printDiagram } from '../../src/export/PrintExporter.ts';
import { Layer, LayerNames } from '../../src/layer/Layer.ts';
import { Node } from '../../src/parts/Node.ts';

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
  HTMLCanvasElement.prototype.toDataURL = vi.fn(
    () => 'data:image/png;base64,AAAA',
  ) as unknown as typeof HTMLCanvasElement.prototype.toDataURL;
});

function createMockDiagram(): Diagram {
  const layer = new Layer(LayerNames.Default, 0);
  const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
  layer.add(node);
  return {
    getLayers: () => [layer],
    getRenderer: () => ({
      getCanvas: () => ({ style: { backgroundColor: '' } }),
    }),
  } as unknown as Diagram;
}

describe('printDiagram', () => {
  it('embeds a vector <svg> by default', () => {
    const diagram = createMockDiagram();
    const win = {
      document: {
        write: vi.fn(),
        close: vi.fn(),
      },
      onload: null,
      print: vi.fn(),
      close: vi.fn(),
    };
    const openSpy = vi.fn(() => win);
    vi.stubGlobal('open', openSpy);

    printDiagram(diagram, { title: 'My Diagram' });

    expect(openSpy).toHaveBeenCalled();
    expect(win.document.write).toHaveBeenCalled();
    const html = (win.document.write as ReturnType<typeof vi.fn>).mock.calls[0]?.[0] as string;
    expect(html).toContain('My Diagram');
    expect(html).toContain('<svg ');
    expect(html).toContain('</svg>');
    expect(html).not.toContain('<img');
    expect(html).toContain('</html>');

    // Trigger onload
    if (win.onload) {
      (win.onload as () => void)();
    }
    vi.unstubAllGlobals();
  });

  it('embeds a raster <img> with format: "png"', () => {
    const diagram = createMockDiagram();
    const win = {
      document: { write: vi.fn(), close: vi.fn() },
      onload: null,
      print: vi.fn(),
      close: vi.fn(),
    };
    vi.stubGlobal(
      'open',
      vi.fn(() => win),
    );

    printDiagram(diagram, { title: 'My Diagram', format: 'png' });

    const html = (win.document.write as ReturnType<typeof vi.fn>).mock.calls[0]?.[0] as string;
    expect(html).toContain('<img src="data:image/png;base64,');
    expect(html).not.toContain('<svg ');
    vi.unstubAllGlobals();
  });

  it('should escape title', () => {
    const diagram = createMockDiagram();
    const win = {
      document: { write: vi.fn(), close: vi.fn() },
      onload: null,
      print: vi.fn(),
      close: vi.fn(),
    };
    vi.stubGlobal(
      'open',
      vi.fn(() => win),
    );

    printDiagram(diagram, { title: '<script>alert("x")</script>' });
    const html = (win.document.write as ReturnType<typeof vi.fn>).mock.calls[0]?.[0] as string;
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    vi.unstubAllGlobals();
  });
});
