import { describe, it, expect, vi } from 'vitest';
import { SVGExporter, createSVGExporter, exportToSVG } from '../../src/export/SVGExporter.ts';
import { Node } from '../../src/parts/Node.ts';
import { Link } from '../../src/parts/Link.ts';
import { Group } from '../../src/parts/Group.ts';
import { Layer } from '../../src/layer/Layer.ts';

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
