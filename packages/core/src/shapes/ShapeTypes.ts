/**
 * Predefined shape types for nodes.
 */
export type ShapeType =
  | 'rect'
  | 'ellipse'
  | 'roundedRect'
  | 'diamond'
  | 'hexagon'
  | 'octagon'
  | 'star'
  | 'triangle'
  | 'cross'
  | 'arrow'
  | 'cloud'
  | 'parallelogram'
  | 'trapezoid'
  | 'pentagon'
  | 'heart'
  | 'cylinder'
  | 'process'
  | 'document'
  | 'predefinedProcess'
  | 'decision'
  | 'start'
  | 'end'
  | 'io'
  | 'card'
  | 'display'
  | 'delay'
  | 'manualOperation'
  | 'merge'
  | 'extract'
  | 'or'
  | 'summingJunction';

/**
 * Shape definition with drawing instructions.
 */
export interface ShapeDefinition {
  /** The shape type identifier. */
  type: ShapeType;
  /** Display name. */
  name: string;
  /** Default width. */
  defaultWidth: number;
  /** Default height. */
  defaultHeight: number;
  /** Whether the shape can be resized. */
  resizable: boolean;
  /** Whether the shape has ports. */
  hasPorts: boolean;
}

/**
 * Registry of all available shapes.
 */
export const SHAPES: Record<ShapeType, ShapeDefinition> = {
  rect: {
    type: 'rect',
    name: 'Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  ellipse: {
    type: 'ellipse',
    name: 'Ellipse',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  roundedRect: {
    type: 'roundedRect',
    name: 'Rounded Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  diamond: {
    type: 'diamond',
    name: 'Diamond',
    defaultWidth: 100,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  hexagon: {
    type: 'hexagon',
    name: 'Hexagon',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  octagon: {
    type: 'octagon',
    name: 'Octagon',
    defaultWidth: 100,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  star: {
    type: 'star',
    name: 'Star',
    defaultWidth: 100,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  triangle: {
    type: 'triangle',
    name: 'Triangle',
    defaultWidth: 100,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  cross: {
    type: 'cross',
    name: 'Cross',
    defaultWidth: 80,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  arrow: {
    type: 'arrow',
    name: 'Arrow',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  cloud: {
    type: 'cloud',
    name: 'Cloud',
    defaultWidth: 120,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  parallelogram: {
    type: 'parallelogram',
    name: 'Parallelogram',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  trapezoid: {
    type: 'trapezoid',
    name: 'Trapezoid',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  pentagon: {
    type: 'pentagon',
    name: 'Pentagon',
    defaultWidth: 100,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  heart: {
    type: 'heart',
    name: 'Heart',
    defaultWidth: 100,
    defaultHeight: 100,
    resizable: false,
    hasPorts: true,
  },
  cylinder: {
    type: 'cylinder',
    name: 'Cylinder',
    defaultWidth: 80,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  process: {
    type: 'process',
    name: 'Process',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  document: {
    type: 'document',
    name: 'Document',
    defaultWidth: 100,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  predefinedProcess: {
    type: 'predefinedProcess',
    name: 'Predefined Process',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  decision: {
    type: 'decision',
    name: 'Decision',
    defaultWidth: 100,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  start: {
    type: 'start',
    name: 'Start',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: false,
    hasPorts: true,
  },
  end: {
    type: 'end',
    name: 'End',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: false,
    hasPorts: true,
  },
  io: {
    type: 'io',
    name: 'Input/Output',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  card: {
    type: 'card',
    name: 'Card',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  display: {
    type: 'display',
    name: 'Display',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  delay: {
    type: 'delay',
    name: 'Delay',
    defaultWidth: 80,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  manualOperation: {
    type: 'manualOperation',
    name: 'Manual Operation',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  merge: {
    type: 'merge',
    name: 'Merge',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: false,
    hasPorts: true,
  },
  extract: {
    type: 'extract',
    name: 'Extract',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: false,
    hasPorts: true,
  },
  or: {
    type: 'or',
    name: 'Or',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: false,
    hasPorts: true,
  },
  summingJunction: {
    type: 'summingJunction',
    name: 'Summing Junction',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: false,
    hasPorts: true,
  },
};

/**
 * Get a shape definition by type.
 */
export function getShapeDefinition(type: ShapeType): ShapeDefinition {
  return SHAPES[type];
}

/**
 * Get all available shape types.
 */
export function getAllShapeTypes(): ShapeType[] {
  return Object.keys(SHAPES) as ShapeType[];
}

/**
 * Get shapes by category.
 */
export function getShapesByCategory(category: string): ShapeDefinition[] {
  const flowchartShapes: ShapeType[] = [
    'process',
    'decision',
    'start',
    'end',
    'io',
    'document',
    'predefinedProcess',
    'merge',
  ];

  const basicShapes: ShapeType[] = [
    'rect',
    'ellipse',
    'roundedRect',
    'diamond',
    'hexagon',
    'octagon',
    'star',
    'triangle',
    'pentagon',
  ];

  const flowchart: ShapeDefinition[] = flowchartShapes.map((s) => SHAPES[s]);
  const basic: ShapeDefinition[] = basicShapes.map((s) => SHAPES[s]);

  if (category === 'flowchart') return flowchart;
  if (category === 'basic') return basic;
  return Object.values(SHAPES);
}

/**
 * Normalize a GoJS-style figure name (e.g. "RoundedRectangle", "ManualOperation")
 * or an existing ShapeType into a valid ShapeType.
 * Falls back to 'rect' for unknown names.
 */
export function normalizeShapeType(value: string): ShapeType {
  if ((SHAPES as Record<string, ShapeDefinition>)[value]) {
    return value as ShapeType;
  }
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const alias = GOJS_FIGURE_ALIASES[normalized];
  if (alias) return alias;
  for (const type of Object.keys(SHAPES)) {
    const key = type.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (key === normalized) {
      return type as ShapeType;
    }
  }
  return 'rect';
}

/** GoJS figure names that don't match our internal keys exactly. */
const GOJS_FIGURE_ALIASES: Record<string, ShapeType> = {
  rectangle: 'rect',
  roundedrectangle: 'roundedRect',
  roundedrect: 'roundedRect',
  circle: 'ellipse',
  ellipsis: 'ellipse',
  oval: 'ellipse',
  line: 'rect',
  triangleup: 'triangle',
  triangledown: 'triangle',
  diamond: 'diamond',
  hexagon: 'hexagon',
  octagon: 'octagon',
  star: 'star',
  cross: 'cross',
  arrow: 'arrow',
  cloud: 'cloud',
  parallelogram: 'parallelogram',
  trapezoid: 'trapezoid',
  pentagon: 'pentagon',
  heart: 'heart',
  cylinder: 'cylinder',
  process: 'process',
  document: 'document',
  predefinedprocess: 'predefinedProcess',
  decision: 'decision',
  start: 'start',
  end: 'end',
  io: 'io',
  card: 'card',
  display: 'display',
  delay: 'delay',
  manualoperation: 'manualOperation',
  merge: 'merge',
  extract: 'extract',
  or: 'or',
  summingjunction: 'summingJunction',
};
