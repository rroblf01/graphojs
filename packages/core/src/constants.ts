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
