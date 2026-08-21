// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { createPNGExporter, exportToPNG, PNGExporter } from '../../src/export/PNGExporter.ts';
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
  const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
  node1.label = 'A';
  const node2 = Node.fromPosAndSize(2, 200, 100, 100, 50);
  layer.add(node1);
  layer.add(node2);

  return {
    getLayers: () => [layer],
    getViewport: () => ({ x: 0, y: 0, scale: 1 }),
  } as unknown as Diagram;
}

describe('PNGExporter', () => {
  it('should create canvas with content bounds', () => {
    const diagram = createMockDiagram();
    const exporter = new PNGExporter({ padding: 10 });
    const canvas = exporter.makeCanvas(diagram);

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.width).toBeGreaterThan(200);
    expect(canvas.height).toBeGreaterThan(100);
  });

  it('should create data URL', () => {
    const diagram = createMockDiagram();
    const exporter = new PNGExporter();
    const dataUrl = exporter.makeDataURL(diagram);
    expect(dataUrl).toContain('data:image/png;base64,');
  });

  it('should handle empty diagram', () => {
    const diagram = {
      getLayers: () => [new Layer(LayerNames.Default, 0)],
      getViewport: () => ({ x: 0, y: 0, scale: 1 }),
    } as unknown as Diagram;
    const exporter = new PNGExporter();
    const canvas = exporter.makeCanvas(diagram);
    expect(canvas.width).toBeGreaterThan(0);
  });

  it('should respect scale option', () => {
    const diagram = createMockDiagram();
    const exporter = new PNGExporter({ scale: 2 });
    const canvas = exporter.makeCanvas(diagram);
    expect(canvas.width).toBeGreaterThan(200);
  });

  it('should create via factory', () => {
    const exporter = createPNGExporter({ padding: 5 });
    expect(exporter).toBeInstanceOf(PNGExporter);
  });

  it('should export to PNG via helper', () => {
    const diagram = createMockDiagram();
    const dataUrl = exportToPNG(diagram);
    expect(dataUrl).toContain('data:image/png;base64,');
  });
});
