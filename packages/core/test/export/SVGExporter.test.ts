import { describe, expect, it, vi } from 'vitest';
import { createSVGExporter, exportToSVG, SVGExporter } from '../../src/export/SVGExporter.ts';
import { Layer } from '../../src/layer/Layer.ts';
import { Panel, shape } from '../../src/panel/Panel.ts';
import { Group } from '../../src/parts/Group.ts';
import { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';

const noopCtx = {
  save: vi.fn(),
  restore: vi.fn(),
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
} as unknown as CanvasRenderingContext2D;

vi.stubGlobal('btoa', (str: string) => Buffer.from(str).toString('base64'));

class MockDiagram {
  private layers: Layer[] = [];
  private renderer = {
    getCanvas: () => ({
      style: { backgroundColor: '#ffffff' },
    }),
  };

  constructor() {
    const defaultLayer = new Layer('Default', 0);
    this.layers.push(defaultLayer);
  }

  getLayers() {
    return this.layers;
  }

  getRenderer() {
    return this.renderer;
  }

  addPart(part: Node | Link | Group) {
    const layer = this.layers[0];
    if (layer) {
      part.layer = layer;
    }
  }
}

describe('SVGExporter', () => {
  it('should export empty diagram', () => {
    const diagram = new MockDiagram() as unknown as Parameters<SVGExporter['export']>[0];
    const exporter = new SVGExporter();
    const svg = exporter.export(diagram);

    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('</svg>');
  });

  it('should export a node', () => {
    const diagram = new MockDiagram();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = 'Test';
    diagram.addPart(node);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('<rect');
    expect(svg).toContain('x="0"');
    expect(svg).toContain('y="0"');
    expect(svg).toContain('width="100"');
    expect(svg).toContain('height="50"');
    expect(svg).toContain('<text');
    expect(svg).toContain('Test');
  });

  it('should export an ellipse node', () => {
    const diagram = new MockDiagram();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'ellipse';
    diagram.addPart(node);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('<ellipse');
    expect(svg).toContain('cx="50"');
    expect(svg).toContain('cy="25"');
  });

  it('should export a rounded rect node', () => {
    const diagram = new MockDiagram();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.shape = 'roundedRect';
    node.cornerRadius = 10;
    diagram.addPart(node);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('rx="10"');
    expect(svg).toContain('ry="10"');
  });

  it('should export a node with a template panel at its own bounds, not offset again', () => {
    // Regression test: `el.position` set during layout is already absolute
    // (it comes from `panel.draw(ctx, node.bounds.x, node.bounds.y, ...)`),
    // so the exporter must use it as-is — adding node.bounds on top used to
    // double-count the offset and render every templated node shifted down
    // and to the right of its real position.
    const diagram = new MockDiagram();
    const node = Node.fromPosAndSize(1, 40, 40, 100, 50);
    const panel = new Panel('Auto');
    const bg = shape('roundedRect');
    bg.fill = '#e8f5e9';
    panel.add(bg);
    node.panel = panel;
    panel.draw(noopCtx, node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);
    diagram.addPart(node);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('x="40"');
    expect(svg).toContain('y="40"');
    expect(svg).not.toContain('x="80"');
    expect(svg).not.toContain('y="80"');
  });

  it('should export a link', () => {
    const diagram = new MockDiagram();
    const node1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
    diagram.addPart(node1);
    diagram.addPart(node2);

    const link = new Link(100, 1, 2);
    link.fromPort = node1.center;
    link.toPort = node2.center;
    diagram.addPart(link);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('<line');
    expect(svg).toContain('x1=');
    expect(svg).toContain('y1=');
    expect(svg).toContain('x2=');
    expect(svg).toContain('y2=');
  });

  it('should export a group', () => {
    const diagram = new MockDiagram();
    const group = new Group(1);
    group.fill = '#f0f0f0';
    diagram.addPart(group);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('<rect');
    expect(svg).toContain('fill="#f0f0f0"');
  });

  it('should include opacity for parts with opacity < 1', () => {
    const diagram = new MockDiagram();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.opacity = 0.5;
    diagram.addPart(node);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).toContain('opacity="0.5"');
  });

  it('should escape XML in labels', () => {
    const diagram = new MockDiagram();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = '<script>alert("xss")</script>';
    diagram.addPart(node);

    const exporter = new SVGExporter();
    const svg = exporter.export(diagram as unknown as Parameters<SVGExporter['export']>[0]);

    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;');
  });

  it('should export to data URL', () => {
    const diagram = new MockDiagram() as unknown as Parameters<SVGExporter['exportToDataURL']>[0];
    const exporter = new SVGExporter();
    const dataUrl = exporter.exportToDataURL(diagram);

    expect(dataUrl).toContain('data:image/svg+xml;base64,');
  });
});

describe('createSVGExporter', () => {
  it('should create exporter with default options', () => {
    const exporter = createSVGExporter();
    expect(exporter).toBeInstanceOf(SVGExporter);
  });

  it('should create exporter with custom options', () => {
    const exporter = createSVGExporter({ indent: '    ', padding: 50 });
    expect(exporter).toBeInstanceOf(SVGExporter);
  });
});

describe('exportToSVG', () => {
  it('should export diagram to SVG string', () => {
    const diagram = new MockDiagram() as unknown as Parameters<typeof exportToSVG>[0];
    const svg = exportToSVG(diagram);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });
});
