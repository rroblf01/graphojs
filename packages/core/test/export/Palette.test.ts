// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { createDefaultPalette, Palette } from '../../src/export/Palette.ts';
import { basicShapes } from '../../src/template/TemplateCollection.ts';

function createMockDiagram(): Diagram {
  const nodeDataArray: Array<Record<string, unknown>> = [];
  const model = {
    generateKey: () => nodeDataArray.length + 1,
    addNode: (data: Record<string, unknown>) => {
      nodeDataArray.push(data);
      return data.key;
    },
    getNodeDataArray: () => nodeDataArray,
  };
  const diagram = {
    getModel: () => model,
    getRenderer: () => ({
      getCanvas: () => ({ getBoundingClientRect: () => ({ left: 0, top: 0 }) }),
    }),
    getViewport: () => ({ x: 0, y: 0, scale: 1 }),
    commit: (fn: (d: Diagram) => void) => fn(diagram as unknown as Diagram),
  };
  return diagram as unknown as Diagram;
}

describe('Palette', () => {
  it('should create and append element to container', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);

    expect(container.children).toHaveLength(1);
    expect(palette.getElement()).toBe(container.children[0]);
    expect(palette.getElement().className).toContain('graphojs-palette');
  });

  it('should render template items', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);

    const items = palette.getElement().querySelectorAll('[data-template-id]');
    expect(items).toHaveLength(basicShapes.length);
  });

  it('should render category headers', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);

    const text = palette.getElement().textContent ?? '';
    expect(text).toContain('Basic');
  });

  it('should not render category headers when disabled', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes, { showCategories: false });

    const text = palette.getElement().textContent ?? '';
    expect(text).not.toContain('Basic');
  });

  it('should set templates', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);
    const first = basicShapes[0];
    if (!first) throw new Error('No basic shapes');
    const single = [first];
    palette.setTemplates(single);

    const items = palette.getElement().querySelectorAll('[data-template-id]');
    expect(items).toHaveLength(1);
  });

  it('should handle drop on diagram and add node', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);

    const result = palette.handleDropOnDiagram('basic-rectangle', 10, 20);
    expect(result).not.toBeNull();
    expect(result?.key).toBe(1);
    expect(result?.x).toBe(10);
    expect(result?.y).toBe(20);
    expect(result?.shape).toBe('rect');
    expect(diagram.getModel().getNodeDataArray()).toHaveLength(1);
  });

  it('should return null for unknown template', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);

    const result = palette.handleDropOnDiagram('unknown-template', 0, 0);
    expect(result).toBeNull();
  });

  it('should get diagram', () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = new Palette(container, diagram, basicShapes);

    expect(palette.getDiagram()).toBe(diagram);
  });
});

describe('createDefaultPalette', () => {
  it('should create palette with all templates', async () => {
    const container = document.createElement('div');
    const diagram = createMockDiagram();
    const palette = await createDefaultPalette(container, diagram);

    const items = palette.getElement().querySelectorAll('[data-template-id]');
    expect(items.length).toBeGreaterThan(basicShapes.length);
  });
});
