/**
 * GoJS-compatible constant objects and enums.
 * GoJS exposes these as namespace properties (e.g. go.BindingMode.OneWay,
 * go.Position.TopLeft, go.Alignment.Center, go.Object.Panel).
 */

/** GoJS-compatible: The mode of a Binding. */
export const BindingMode = {
  /** OneWay: model data changes update the target. */
  OneWay: 0,
  /** TwoWay: the target property is also written back to the model. */
  TwoWay: 1,
} as const;

/** GoJS-compatible: The position of a part relative to the viewport. */
export const Position = {
  None: -1,
  TopLeft: 0,
  TopCenter: 1,
  TopRight: 2,
  MiddleLeft: 3,
  MiddleCenter: 4,
  MiddleRight: 5,
  BottomLeft: 6,
  BottomCenter: 7,
  BottomRight: 8,
} as const;

/** GoJS-compatible: The alignment of a GraphObject within its panel. */
export const Alignment = {
  None: -1,
  Top: 0,
  TopLeft: 0,
  Left: 1,
  Center: 2,
  Middle: 2,
  Right: 3,
  Bottom: 4,
  BottomRight: 5,
  Spot: 6,
} as const;

/** GoJS-compatible: The kind of object built by GraphObject.make. */
// biome-ignore lint/suspicious/noShadowRestrictedNames: GoJS API exports a namespace named Object
export const Object = {
  Panel: 0,
  Part: 1,
  Shape: 2,
  TextBlock: 3,
  Picture: 4,
  Binding: 5,
} as const;

/** GoJS-compatible: Diagram.AutoScale options. */
export const AutoScale = {
  None: 0,
  Uniform: 1,
  Fit: 2,
} as const;

/** GoJS-compatible: Diagram.scrollBehavior options. */
export const ScrollBehavior = {
  ScrollBars: 0,
  ScrollVisible: 0,
  ScrollOverflow: 1,
  NoScrollbars: 2,
  DocumentBounds: 3,
} as const;

/**
 * GoJS-compatible (`@since 4.0` in real GoJS): typed constants for built-in
 * figure names, for use with `Shape.figure`/`Shape.shape`. These are the
 * same strings `normalizeShapeType`/the `SHAPES` registry already accept —
 * this object exists so `go.Figures.RoundedRectangle` autocompletes instead
 * of requiring a raw string literal.
 */
export const Figures = {
  None: 'None',
  Rectangle: 'Rectangle',
  Square: 'Square',
  RoundedRectangle: 'RoundedRectangle',
  Border: 'Border',
  RoundedTopRectangle: 'RoundedTopRectangle',
  RoundedBottomRectangle: 'RoundedBottomRectangle',
  RoundedLeftRectangle: 'RoundedLeftRectangle',
  RoundedRightRectangle: 'RoundedRightRectangle',
  Ellipse: 'Ellipse',
  Circle: 'Circle',
  TriangleRight: 'TriangleRight',
  TriangleDown: 'TriangleDown',
  TriangleLeft: 'TriangleLeft',
  TriangleUp: 'TriangleUp',
  Triangle: 'Triangle',
  Diamond: 'Diamond',
  LineH: 'LineH',
  LineV: 'LineV',
  BarH: 'BarH',
  BarV: 'BarV',
  MinusLine: 'MinusLine',
  PlusLine: 'PlusLine',
  XLine: 'XLine',
  LineRight: 'LineRight',
  LineDown: 'LineDown',
  LineLeft: 'LineLeft',
  LineUp: 'LineUp',
  Capsule: 'Capsule',
  Borders: 'Borders',
} as const;

/**
 * GoJS-compatible (`@since 4.0`): typed constants for `Shape.toArrow`/
 * `fromArrow`. graphojs approximates the full ~75-name GoJS arrowhead
 * catalog down to 5 rendered styles (triangle/openArrow/diamond/circle/none,
 * see `Diagram.mapArrowhead`) — every name below is accepted and mapped to
 * the closest of those 5, but most don't render as a visually distinct
 * arrowhead the way they do in real GoJS.
 */
export const Arrowheads = {
  Standard: 'Standard',
  Backward: 'Backward',
  Triangle: 'Triangle',
  BackwardTriangle: 'BackwardTriangle',
  Boomerang: 'Boomerang',
  BackwardBoomerang: 'BackwardBoomerang',
  SidewaysV: 'SidewaysV',
  BackwardV: 'BackwardV',
  OpenTriangle: 'OpenTriangle',
  BackwardOpenTriangle: 'BackwardOpenTriangle',
  OpenTriangleLine: 'OpenTriangleLine',
  BackwardOpenTriangleLine: 'BackwardOpenTriangleLine',
  OpenTriangleTop: 'OpenTriangleTop',
  BackwardOpenTriangleTop: 'BackwardOpenTriangleTop',
  OpenTriangleBottom: 'OpenTriangleBottom',
  BackwardOpenTriangleBottom: 'BackwardOpenTriangleBottom',
  HalfTriangleTop: 'HalfTriangleTop',
  BackwardHalfTriangleTop: 'BackwardHalfTriangleTop',
  HalfTriangleBottom: 'HalfTriangleBottom',
  BackwardHalfTriangleBottom: 'BackwardHalfTriangleBottom',
  ForwardSemiCircle: 'ForwardSemiCircle',
  BackwardSemiCircle: 'BackwardSemiCircle',
  Feather: 'Feather',
  BackwardFeather: 'BackwardFeather',
  DoubleFeathers: 'DoubleFeathers',
  BackwardDoubleFeathers: 'BackwardDoubleFeathers',
  TripleFeathers: 'TripleFeathers',
  BackwardTripleFeathers: 'BackwardTripleFeathers',
  ForwardSlash: 'ForwardSlash',
  BackSlash: 'BackSlash',
  DoubleForwardSlash: 'DoubleForwardSlash',
  DoubleBackSlash: 'DoubleBackSlash',
  TripleForwardSlash: 'TripleForwardSlash',
  TripleBackSlash: 'TripleBackSlash',
  Fork: 'Fork',
  BackwardFork: 'BackwardFork',
  LineFork: 'LineFork',
  BackwardLineFork: 'BackwardLineFork',
  CircleFork: 'CircleFork',
  BackwardCircleFork: 'BackwardCircleFork',
  CircleLineFork: 'CircleLineFork',
  BackwardCircleLineFork: 'BackwardCircleLineFork',
  Circle: 'Circle',
  Block: 'Block',
  StretchedDiamond: 'StretchedDiamond',
  Diamond: 'Diamond',
  Chevron: 'Chevron',
  StretchedChevron: 'StretchedChevron',
  NormalArrow: 'NormalArrow',
  X: 'X',
  TailedNormalArrow: 'TailedNormalArrow',
  DoubleTriangle: 'DoubleTriangle',
  BigEndArrow: 'BigEndArrow',
  ConcaveTailArrow: 'ConcaveTailArrow',
  RoundedTriangle: 'RoundedTriangle',
  SimpleArrow: 'SimpleArrow',
  AccelerationArrow: 'AccelerationArrow',
  BoxArrow: 'BoxArrow',
  TriangleLine: 'TriangleLine',
  CircleEndedArrow: 'CircleEndedArrow',
  DynamicWidthArrow: 'DynamicWidthArrow',
  EquilibriumArrow: 'EquilibriumArrow',
  FastForward: 'FastForward',
  Kite: 'Kite',
  HalfArrowTop: 'HalfArrowTop',
  HalfArrowBottom: 'HalfArrowBottom',
  OpposingDirectionDoubleArrow: 'OpposingDirectionDoubleArrow',
  PartialDoubleTriangle: 'PartialDoubleTriangle',
  LineCircle: 'LineCircle',
  DoubleLineCircle: 'DoubleLineCircle',
  TripleLineCircle: 'TripleLineCircle',
  CircleLine: 'CircleLine',
  DiamondCircle: 'DiamondCircle',
  PlusCircle: 'PlusCircle',
  OpenRightTriangleTop: 'OpenRightTriangleTop',
  OpenRightTriangleBottom: 'OpenRightTriangleBottom',
  Line: 'Line',
  DoubleLine: 'DoubleLine',
  TripleLine: 'TripleLine',
  PentagonArrow: 'PentagonArrow',
} as const;

/** GoJS-compatible (`@since 4.0`): typed constants for `Panel.type`/the `Panel` constructor. */
export const PanelTypes = {
  Position: 'Position',
  Horizontal: 'Horizontal',
  Vertical: 'Vertical',
  Spot: 'Spot',
  Auto: 'Auto',
  Table: 'Table',
  Viewbox: 'Viewbox',
  Grid: 'Grid',
} as const;

/** GoJS-compatible (`@since 4.0`): typed constants for `ToolManager.findTool`/`replaceTool`. */
export const ToolNames = {
  Relinking: 'Relinking',
  LinkReshaping: 'LinkReshaping',
  Rotating: 'Rotating',
  Resizing: 'Resizing',
  Linking: 'Linking',
  Dragging: 'Dragging',
  DragSelecting: 'DragSelecting',
  Panning: 'Panning',
  ContextMenu: 'ContextMenu',
  TextEditing: 'TextEditing',
  ClickCreating: 'ClickCreating',
  ClickSelecting: 'ClickSelecting',
} as const;

/**
 * GoJS-compatible (`@since 4.0`): typed constants for the string names
 * passed to `GraphObject.make`/`build` to construct a pre-fab widget, e.g.
 * `GraphObject.make(Builders.Button, ...)`.
 */
export const Builders = {
  Button: 'Button',
  TreeExpanderButton: 'TreeExpanderButton',
  PanelExpanderButton: 'PanelExpanderButton',
  ToolTip: 'ToolTip',
  ContextMenu: 'ContextMenu',
  ContextMenuButton: 'ContextMenuButton',
  CheckBoxButton: 'CheckBoxButton',
  CheckBox: 'CheckBox',
  AutoRepeatButton: 'AutoRepeatButton',
  ToggleSwitch: 'ToggleSwitch',
  Toggle: 'Toggle',
} as const;
