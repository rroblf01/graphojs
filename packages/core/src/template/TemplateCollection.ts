import type { Template } from './Template.ts';

/**
 * Basic shapes templates.
 */
export const basicShapes: Template[] = [
  {
    id: 'basic-rectangle',
    name: 'Rectangle',
    category: 'basic',
    shape: 'rect',
    width: 100,
    height: 60,
    fill: '#e3f2fd',
    stroke: '#1976d2',
    strokeWidth: 2,
    label: 'Rectangle',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'basic-ellipse',
    name: 'Ellipse',
    category: 'basic',
    shape: 'ellipse',
    width: 100,
    height: 60,
    fill: '#e8f5e9',
    stroke: '#388e3c',
    strokeWidth: 2,
    label: 'Ellipse',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'basic-rounded-rect',
    name: 'Rounded Rectangle',
    category: 'basic',
    shape: 'roundedRect',
    width: 100,
    height: 60,
    fill: '#fff3e0',
    stroke: '#f57c00',
    strokeWidth: 2,
    label: 'Rounded',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
    cornerRadius: 10,
  },
  {
    id: 'basic-diamond',
    name: 'Diamond',
    category: 'basic',
    shape: 'diamond',
    width: 100,
    height: 80,
    fill: '#fce4ec',
    stroke: '#c2185b',
    strokeWidth: 2,
    label: 'Diamond',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'basic-hexagon',
    name: 'Hexagon',
    category: 'basic',
    shape: 'hexagon',
    width: 100,
    height: 80,
    fill: '#f3e5f5',
    stroke: '#7b1fa2',
    strokeWidth: 2,
    label: 'Hexagon',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'basic-triangle',
    name: 'Triangle',
    category: 'basic',
    shape: 'triangle',
    width: 100,
    height: 80,
    fill: '#e0f7fa',
    stroke: '#00838f',
    strokeWidth: 2,
    label: 'Triangle',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'basic-star',
    name: 'Star',
    category: 'basic',
    shape: 'star',
    width: 100,
    height: 100,
    fill: '#fffde7',
    stroke: '#f9a825',
    strokeWidth: 2,
    label: 'Star',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'basic-cross',
    name: 'Cross',
    category: 'basic',
    shape: 'cross',
    width: 80,
    height: 80,
    fill: '#ffebee',
    stroke: '#d32f2f',
    strokeWidth: 2,
    label: '',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
];

/**
 * Flowchart templates.
 */
export const flowchartShapes: Template[] = [
  {
    id: 'flow-start',
    name: 'Start',
    category: 'flowchart',
    shape: 'ellipse',
    width: 60,
    height: 60,
    fill: '#c8e6c9',
    stroke: '#2e7d32',
    strokeWidth: 2,
    label: 'Start',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-end',
    name: 'End',
    category: 'flowchart',
    shape: 'ellipse',
    width: 60,
    height: 60,
    fill: '#ffcdd2',
    stroke: '#c62828',
    strokeWidth: 2,
    label: 'End',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-process',
    name: 'Process',
    category: 'flowchart',
    shape: 'rect',
    width: 120,
    height: 60,
    fill: '#e3f2fd',
    stroke: '#1565c0',
    strokeWidth: 2,
    label: 'Process',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-decision',
    name: 'Decision',
    category: 'flowchart',
    shape: 'diamond',
    width: 100,
    height: 80,
    fill: '#fff9c4',
    stroke: '#f9a825',
    strokeWidth: 2,
    label: 'Decision',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-io',
    name: 'Input/Output',
    category: 'flowchart',
    shape: 'parallelogram',
    width: 120,
    height: 60,
    fill: '#e1f5fe',
    stroke: '#0288d1',
    strokeWidth: 2,
    label: 'I/O',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-document',
    name: 'Document',
    category: 'flowchart',
    shape: 'document',
    width: 100,
    height: 80,
    fill: '#f1f8e9',
    stroke: '#558b2f',
    strokeWidth: 2,
    label: 'Document',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-predefined',
    name: 'Predefined Process',
    category: 'flowchart',
    shape: 'predefinedProcess',
    width: 120,
    height: 60,
    fill: '#ede7f6',
    stroke: '#5e35b1',
    strokeWidth: 2,
    label: 'Subroutine',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'flow-merge',
    name: 'Merge',
    category: 'flowchart',
    shape: 'diamond',
    width: 60,
    height: 60,
    fill: '#e0f2f1',
    stroke: '#00796b',
    strokeWidth: 2,
    label: '',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
];

/**
 * Data flow templates.
 */
export const dataFlowShapes: Template[] = [
  {
    id: 'data-entity',
    name: 'Entity',
    category: 'dataflow',
    shape: 'rect',
    width: 100,
    height: 60,
    fill: '#fff8e1',
    stroke: '#ff8f00',
    strokeWidth: 2,
    label: 'Entity',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'data-store',
    name: 'Data Store',
    category: 'dataflow',
    shape: 'roundedRect',
    width: 100,
    height: 60,
    fill: '#e8eaf6',
    stroke: '#3949ab',
    strokeWidth: 2,
    label: 'Store',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
  {
    id: 'data-process',
    name: 'Process',
    category: 'dataflow',
    shape: 'ellipse',
    width: 60,
    height: 60,
    fill: '#e8f5e9',
    stroke: '#2e7d32',
    strokeWidth: 2,
    label: 'P',
    labelColor: '#000000',
    labelFont: '14px sans-serif',
  },
];

/**
 * Get all predefined templates.
 */
export function getAllTemplates(): Template[] {
  return [...basicShapes, ...flowchartShapes, ...dataFlowShapes];
}

/**
 * Get templates by category.
 */
export function getTemplatesByCategory(category: string): Template[] {
  return getAllTemplates().filter((t) => t.category === category);
}

/**
 * Get a template by ID.
 */
export function getTemplateById(id: string): Template | undefined {
  return getAllTemplates().find((t) => t.id === id);
}

/**
 * Get all template categories.
 */
export function getTemplateCategories(): string[] {
  const categories = new Set(getAllTemplates().map((t) => t.category));
  return Array.from(categories);
}
