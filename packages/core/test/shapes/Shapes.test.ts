import { describe, it, expect } from 'vitest';
import {
  SHAPES,
  getShapeDefinition,
  getAllShapeTypes,
  getShapesByCategory,
} from '../../src/shapes/ShapeTypes.ts';
import {
  getAllTemplates,
  getTemplatesByCategory,
  getTemplateById,
  getTemplateCategories,
} from '../../src/template/TemplateCollection.ts';
import { templateToNodeData } from '../../src/template/Template.ts';
import type { Template } from '../../src/template/Template.ts';

describe('ShapeTypes', () => {
  it('should have all shape definitions', () => {
    const shapeTypes = getAllShapeTypes();
    expect(shapeTypes.length).toBeGreaterThan(0);
    expect(shapeTypes).toContain('rect');
    expect(shapeTypes).toContain('ellipse');
    expect(shapeTypes).toContain('diamond');
  });

  it('should get shape definition by type', () => {
    const rect = getShapeDefinition('rect');
    expect(rect.type).toBe('rect');
    expect(rect.name).toBe('Rectangle');
    expect(rect.defaultWidth).toBe(100);
    expect(rect.defaultHeight).toBe(60);
  });

  it('should have default dimensions for all shapes', () => {
    const shapeTypes = getAllShapeTypes();
    for (const type of shapeTypes) {
      const shape = getShapeDefinition(type);
      expect(shape.defaultWidth).toBeGreaterThan(0);
      expect(shape.defaultHeight).toBeGreaterThan(0);
    }
  });

  it('should get shapes by category', () => {
    const basic = getShapesByCategory('basic');
    expect(basic.length).toBeGreaterThan(0);
    expect(basic.some((s) => s.type === 'rect')).toBe(true);
    expect(basic.some((s) => s.type === 'ellipse')).toBe(true);

    const flowchart = getShapesByCategory('flowchart');
    expect(flowchart.length).toBeGreaterThan(0);
    expect(flowchart.some((s) => s.type === 'process')).toBe(true);
    expect(flowchart.some((s) => s.type === 'decision')).toBe(true);
  });

  it('should get all shapes for unknown category', () => {
    const all = getShapesByCategory('unknown');
    expect(all.length).toBe(Object.keys(SHAPES).length);
  });
});

describe('Templates', () => {
  it('should have predefined templates', () => {
    const templates = getAllTemplates();
    expect(templates.length).toBeGreaterThan(0);
  });

  it('should have basic shape templates', () => {
    const templates = getTemplatesByCategory('basic');
    expect(templates.length).toBeGreaterThan(0);
    expect(templates.some((t) => t.shape === 'rect')).toBe(true);
    expect(templates.some((t) => t.shape === 'ellipse')).toBe(true);
    expect(templates.some((t) => t.shape === 'diamond')).toBe(true);
  });

  it('should have flowchart templates', () => {
    const templates = getTemplatesByCategory('flowchart');
    expect(templates.length).toBeGreaterThan(0);
    expect(templates.some((t) => t.shape === 'diamond')).toBe(true);
    expect(templates.some((t) => t.shape === 'parallelogram')).toBe(true);
  });

  it('should get template by ID', () => {
    const template = getTemplateById('basic-rectangle');
    expect(template).toBeDefined();
    expect(template?.name).toBe('Rectangle');
    expect(template?.shape).toBe('rect');
  });

  it('should return undefined for unknown template ID', () => {
    const template = getTemplateById('nonexistent');
    expect(template).toBeUndefined();
  });

  it('should get all categories', () => {
    const categories = getTemplateCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('basic');
    expect(categories).toContain('flowchart');
  });

  it('should convert template to node data', () => {
    const template: Template = {
      id: 'test',
      name: 'Test',
      category: 'test',
      shape: 'rect',
      width: 100,
      height: 60,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 1,
      label: 'Test Node',
      labelColor: '#000000',
      labelFont: '14px sans-serif',
    };

    const nodeData = templateToNodeData(template, 1, 50, 100);

    expect(nodeData.key).toBe(1);
    expect(nodeData.x).toBe(50);
    expect(nodeData.y).toBe(100);
    expect(nodeData.width).toBe(100);
    expect(nodeData.height).toBe(60);
    expect(nodeData.shape).toBe('rect');
    expect(nodeData.fill).toBe('#ffffff');
    expect(nodeData.label).toBe('Test Node');
  });

  it('should include additional properties', () => {
    const template: Template = {
      id: 'test',
      name: 'Test',
      category: 'test',
      shape: 'rect',
      width: 100,
      height: 60,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 1,
      label: '',
      labelColor: '#000000',
      labelFont: '14px sans-serif',
      cornerRadius: 5,
      properties: {
        customProp: 'value',
      },
    };

    const nodeData = templateToNodeData(template, 1, 0, 0);

    expect(nodeData.cornerRadius).toBe(5);
    expect(nodeData.customProp).toBe('value');
  });
});
