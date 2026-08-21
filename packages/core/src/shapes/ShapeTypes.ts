/**
 * Predefined shape types for nodes.
 */
export type ShapeType =
  | 'none'
  | 'rect'
  | 'ellipse'
  | 'roundedRect'
  | 'roundedTopRect'
  | 'roundedBottomRect'
  | 'roundedLeftRect'
  | 'roundedRightRect'
  | 'capsule'
  | 'barH'
  | 'barV'
  | 'lineRight'
  | 'lineLeft'
  | 'lineUp'
  | 'lineDown'
  | 'diamond'
  | 'hexagon'
  | 'octagon'
  | 'star'
  | 'triangle'
  | 'triangleDown'
  | 'triangleLeft'
  | 'triangleRight'
  | 'square'
  | 'junction'
  | 'multiDocument'
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
  | 'summingJunction'
  | 'x'
  | 'plus'
  | 'minus'
  | 'line'
  | 'lineH'
  | 'lineV'
  | 'circle'
  | 'doubleArrow'
  | 'person'
  | 'ring'
  | 'rhombus'
  | 'kite'
  | 'club'
  | 'spade'
  | 'piePiece'
  | 'file'
  | 'folder'
  | 'terminator'
  | 'planner'
  | 'internalStorage'
  | 'externalStorage'
  | 'sequentialAccessStorage'
  | 'directAccessStorage'
  | 'collate'
  | 'manualInput'
  | 'preparation'
  | 'loopLimit'
  | 'database'
  | 'subroutine'
  | 'sort'
  | 'doubleChevron'
  | 'halfCircle'
  | 'rightTriangle'
  | 'plus2'
  | 'rect2'
  | 'tabbedRectangle'
  | 'component'
  | 'gatewayExclusive'
  | 'gatewayParallel'
  | 'callout'
  | 'bracket'
  | 'flag'
  | 'chevron'
  | 'tape'
  | 'shield'
  | 'bolt';

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
  none: {
    type: 'none',
    name: 'None',
    defaultWidth: 1,
    defaultHeight: 1,
    resizable: true,
    hasPorts: false,
  },
  rect: {
    type: 'rect',
    name: 'Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  roundedTopRect: {
    type: 'roundedTopRect',
    name: 'Rounded Top Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  roundedBottomRect: {
    type: 'roundedBottomRect',
    name: 'Rounded Bottom Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  roundedLeftRect: {
    type: 'roundedLeftRect',
    name: 'Rounded Left Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  roundedRightRect: {
    type: 'roundedRightRect',
    name: 'Rounded Right Rectangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  capsule: {
    type: 'capsule',
    name: 'Capsule',
    defaultWidth: 100,
    defaultHeight: 50,
    resizable: true,
    hasPorts: true,
  },
  barH: {
    type: 'barH',
    name: 'Horizontal Bar',
    defaultWidth: 100,
    defaultHeight: 20,
    resizable: true,
    hasPorts: false,
  },
  barV: {
    type: 'barV',
    name: 'Vertical Bar',
    defaultWidth: 20,
    defaultHeight: 100,
    resizable: true,
    hasPorts: false,
  },
  lineRight: {
    type: 'lineRight',
    name: 'Line Right',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: false,
  },
  lineLeft: {
    type: 'lineLeft',
    name: 'Line Left',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: false,
  },
  lineUp: {
    type: 'lineUp',
    name: 'Line Up',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: false,
  },
  lineDown: {
    type: 'lineDown',
    name: 'Line Down',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: false,
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
  triangleDown: {
    type: 'triangleDown',
    name: 'Triangle Down',
    defaultWidth: 100,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  triangleLeft: {
    type: 'triangleLeft',
    name: 'Triangle Left',
    defaultWidth: 80,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  triangleRight: {
    type: 'triangleRight',
    name: 'Triangle Right',
    defaultWidth: 80,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  square: {
    type: 'square',
    name: 'Square',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  junction: {
    type: 'junction',
    name: 'Junction',
    defaultWidth: 12,
    defaultHeight: 12,
    resizable: false,
    hasPorts: false,
  },
  multiDocument: {
    type: 'multiDocument',
    name: 'Multi-Document',
    defaultWidth: 100,
    defaultHeight: 70,
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
  x: { type: 'x', name: 'X', defaultWidth: 60, defaultHeight: 60, resizable: true, hasPorts: true },
  plus: {
    type: 'plus',
    name: 'Plus',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  minus: {
    type: 'minus',
    name: 'Minus',
    defaultWidth: 80,
    defaultHeight: 40,
    resizable: true,
    hasPorts: true,
  },
  line: {
    type: 'line',
    name: 'Line',
    defaultWidth: 100,
    defaultHeight: 2,
    resizable: true,
    hasPorts: false,
  },
  lineH: {
    type: 'lineH',
    name: 'Horizontal Line',
    defaultWidth: 100,
    defaultHeight: 2,
    resizable: true,
    hasPorts: false,
  },
  lineV: {
    type: 'lineV',
    name: 'Vertical Line',
    defaultWidth: 2,
    defaultHeight: 100,
    resizable: true,
    hasPorts: false,
  },
  circle: {
    type: 'circle',
    name: 'Circle',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  doubleArrow: {
    type: 'doubleArrow',
    name: 'Double Arrow',
    defaultWidth: 120,
    defaultHeight: 40,
    resizable: true,
    hasPorts: false,
  },
  person: {
    type: 'person',
    name: 'Person',
    defaultWidth: 60,
    defaultHeight: 70,
    resizable: true,
    hasPorts: false,
  },
  ring: {
    type: 'ring',
    name: 'Ring',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  rhombus: {
    type: 'rhombus',
    name: 'Rhombus',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  kite: {
    type: 'kite',
    name: 'Kite',
    defaultWidth: 80,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  club: {
    type: 'club',
    name: 'Club',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  spade: {
    type: 'spade',
    name: 'Spade',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  piePiece: {
    type: 'piePiece',
    name: 'Pie Piece',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  file: {
    type: 'file',
    name: 'File',
    defaultWidth: 80,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  folder: {
    type: 'folder',
    name: 'Folder',
    defaultWidth: 120,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  terminator: {
    type: 'terminator',
    name: 'Terminator',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  planner: {
    type: 'planner',
    name: 'Planner',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  internalStorage: {
    type: 'internalStorage',
    name: 'Internal Storage',
    defaultWidth: 60,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  externalStorage: {
    type: 'externalStorage',
    name: 'External Storage',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  sequentialAccessStorage: {
    type: 'sequentialAccessStorage',
    name: 'Sequential Access Storage',
    defaultWidth: 60,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  directAccessStorage: {
    type: 'directAccessStorage',
    name: 'Direct Access Storage',
    defaultWidth: 60,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  collate: {
    type: 'collate',
    name: 'Collate',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  manualInput: {
    type: 'manualInput',
    name: 'Manual Input',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  preparation: {
    type: 'preparation',
    name: 'Preparation',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  loopLimit: {
    type: 'loopLimit',
    name: 'Loop Limit',
    defaultWidth: 100,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  database: {
    type: 'database',
    name: 'Database',
    defaultWidth: 80,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  subroutine: {
    type: 'subroutine',
    name: 'Subroutine',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  sort: {
    type: 'sort',
    name: 'Sort',
    defaultWidth: 60,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  doubleChevron: {
    type: 'doubleChevron',
    name: 'Double Chevron',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  halfCircle: {
    type: 'halfCircle',
    name: 'Half Circle',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  rightTriangle: {
    type: 'rightTriangle',
    name: 'Right Triangle',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  plus2: {
    type: 'plus2',
    name: 'Plus 2',
    defaultWidth: 60,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  rect2: {
    type: 'rect2',
    name: 'Rect 2',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  tabbedRectangle: {
    type: 'tabbedRectangle',
    name: 'Tabbed Rectangle',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  component: {
    type: 'component',
    name: 'UML Component',
    defaultWidth: 120,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  gatewayExclusive: {
    type: 'gatewayExclusive',
    name: 'BPMN Exclusive Gateway',
    defaultWidth: 80,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  gatewayParallel: {
    type: 'gatewayParallel',
    name: 'BPMN Parallel Gateway',
    defaultWidth: 80,
    defaultHeight: 80,
    resizable: true,
    hasPorts: true,
  },
  callout: {
    type: 'callout',
    name: 'Callout',
    defaultWidth: 120,
    defaultHeight: 90,
    resizable: true,
    hasPorts: true,
  },
  bracket: {
    type: 'bracket',
    name: 'Annotation Bracket',
    defaultWidth: 40,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  flag: {
    type: 'flag',
    name: 'Flag',
    defaultWidth: 80,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  chevron: {
    type: 'chevron',
    name: 'Chevron',
    defaultWidth: 100,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  tape: {
    type: 'tape',
    name: 'Tape',
    defaultWidth: 120,
    defaultHeight: 60,
    resizable: true,
    hasPorts: true,
  },
  shield: {
    type: 'shield',
    name: 'Shield',
    defaultWidth: 90,
    defaultHeight: 100,
    resizable: true,
    hasPorts: true,
  },
  bolt: {
    type: 'bolt',
    name: 'Lightning Bolt',
    defaultWidth: 60,
    defaultHeight: 100,
    resizable: true,
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
    'multiDocument',
    'predefinedProcess',
    'merge',
    'junction',
  ];

  const basicShapes: ShapeType[] = [
    'rect',
    'square',
    'ellipse',
    'roundedRect',
    'diamond',
    'hexagon',
    'octagon',
    'star',
    'triangle',
    'triangleDown',
    'triangleLeft',
    'triangleRight',
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
  none: 'none',
  rectangle: 'rect',
  border: 'rect',
  borders: 'rect',
  roundedtoprectangle: 'roundedTopRect',
  roundedbottomrectangle: 'roundedBottomRect',
  roundedleftrectangle: 'roundedLeftRect',
  roundedrightrectangle: 'roundedRightRect',
  capsule: 'capsule',
  barh: 'barH',
  barv: 'barV',
  lineright: 'lineRight',
  lineleft: 'lineLeft',
  lineup: 'lineUp',
  linedown: 'lineDown',
  minusline: 'minus',
  plusline: 'plus',
  xline: 'x',
  roundedrectangle: 'roundedRect',
  roundedrect: 'roundedRect',
  ellipsis: 'ellipse',
  oval: 'ellipse',
  triangleup: 'triangle',
  triangledown: 'triangleDown',
  triangleleft: 'triangleLeft',
  triangleright: 'triangleRight',
  square: 'square',
  junction: 'junction',
  multidocument: 'multiDocument',
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
  x: 'x',
  plus: 'plus',
  minus: 'minus',
  line: 'line',
  lineh: 'lineH',
  linev: 'lineV',
  circle: 'circle',
  doublearrow: 'doubleArrow',
  person: 'person',
  ring: 'ring',
  rhombus: 'rhombus',
  kite: 'kite',
  club: 'club',
  spade: 'spade',
  piepiece: 'piePiece',
  file: 'file',
  folder: 'folder',
  terminator: 'terminator',
  planner: 'planner',
  internalstorage: 'internalStorage',
  externalstorage: 'externalStorage',
  sequentialaccessstorage: 'sequentialAccessStorage',
  directaccessstorage: 'directAccessStorage',
  collate: 'collate',
  manualinput: 'manualInput',
  preparation: 'preparation',
  looplimit: 'loopLimit',
  database: 'database',
  subroutine: 'subroutine',
  sort: 'sort',
  doublechevron: 'doubleChevron',
  halfcircle: 'halfCircle',
  righttriangle: 'rightTriangle',
  plus2: 'plus2',
  rect2: 'rect2',
  tabbedrectangle: 'tabbedRectangle',
};
