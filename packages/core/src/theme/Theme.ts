import type { Margin } from '../geometry/Margin.ts';
import type { Point } from '../geometry/Point.ts';
import type { Rect } from '../geometry/Rect.ts';
import type { Size } from '../geometry/Size.ts';
import type { Spot } from '../geometry/Spot.ts';

/** GoJS-compatible: an object with string keys and values of a given type, used by {@link Theme}. */
export interface ThemeValues<T> {
  [index: string]: T;
}

/** GoJS-compatible: the color values a {@link Theme} defines. */
export interface ThemeColors {
  [index: string]: string | undefined;
  text?: string;
  comment?: string;
  link?: string;
  group?: string;
  outline?: string;
  selection?: string;
  div?: string;
  gridMinor?: string;
  gridMajor?: string;
  overviewBox?: string;
  tempLink?: string;
  tempPort?: string;
  adornmentFill?: string;
  adornmentStroke?: string;
  dragSelect?: string;
}

/**
 * GoJS-compatible: a named collection of theme values (colors, fonts,
 * numbers, etc.) that `ThemeBinding`/`GraphObject.theme()` look values up
 * from.
 */
export interface Theme {
  colors?: ThemeColors;
  fonts?: ThemeValues<string>;
  numbers?: ThemeValues<number>;
  points?: ThemeValues<Point>;
  sizes?: ThemeValues<Size>;
  rects?: ThemeValues<Rect>;
  margins?: ThemeValues<Margin>;
  spots?: ThemeValues<Spot>;
  arrowheads?: ThemeValues<string>;
  /** Maps a GraphObject target property name (e.g. `"fill"`) to the Theme sub-object to search (e.g. `"colors"`). */
  targetPropertyMap?: globalThis.Map<string, string>;
  [index: string]: ThemeValues<unknown> | globalThis.Map<string, string> | undefined;
}

/** The default `targetPropertyMap` used when a `Theme` doesn't define its own. */
export const DEFAULT_TARGET_PROPERTY_MAP: ReadonlyMap<string, string> = new globalThis.Map([
  ['fill', 'colors'],
  ['stroke', 'colors'],
  ['background', 'colors'],
  ['color', 'colors'],
  ['text', 'colors'],
  ['font', 'fonts'],
  ['strokeWidth', 'numbers'],
  ['opacity', 'numbers'],
  ['margin', 'margins'],
  ['padding', 'margins'],
  ['alignment', 'spots'],
  ['locationSpot', 'spots'],
  ['toArrow', 'arrowheads'],
  ['fromArrow', 'arrowheads'],
]);
