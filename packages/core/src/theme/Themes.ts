import { Margin } from '../geometry/Margin.ts';
import type { Theme } from './Theme.ts';

/**
 * GoJS-compatible: the two predefined `Theme`s used by `ThemeManager` by
 * default, reproduced verbatim from GoJS's own documented `Light`/`Dark`
 * definitions.
 */
// biome-ignore lint/complexity/noStaticOnlyClass: mirrors GoJS's own `go.Themes.Light`/`.Dark` API shape
export class Themes {
  static readonly Light: Theme = {
    colors: {
      text: '#0a0a0a',
      comment: '#ca8a04',
      link: '#0a0a0a',
      group: '#a3a3a344',
      outline: '#a3a3a3',
      selection: '#0ea5e9',
      div: '#fff',
      gridMinor: '#e5e5e5',
      gridMajor: '#a3a3a3',
      overviewBox: '#c026d3',
      tempLink: '#2563eb',
      tempPort: '#c026d3',
      adornmentFill: '#0ea5e9',
      adornmentStroke: '#1e40af',
      dragSelect: '#c026d3',
    },
    fonts: {
      normal: '10pt sans-serif',
      bold: 'bold 12pt sans-serif',
    },
    numbers: {
      group: 1,
      selection: 3,
    },
    margins: {
      group: new Margin(5, 5, 5, 5),
    },
    arrowheads: {
      toArrow: 'Standard',
    },
  };

  static readonly Dark: Theme = {
    colors: {
      text: '#f5f5f5',
      comment: '#facc15',
      link: '#f5f5f5',
      group: '#a3a3a388',
      outline: '#a3a3a3',
      selection: '#38bdf8',
      div: '#171717',
      gridMinor: '#262626',
      gridMajor: '#404040',
      overviewBox: '#e879f9',
      tempLink: '#60a5fa',
      tempPort: '#e879f9',
      adornmentFill: '#38bdf8',
      adornmentStroke: '#2563eb',
      dragSelect: '#e879f9',
    },
    fonts: {
      normal: '10pt sans-serif',
      bold: 'bold 12pt sans-serif',
    },
    numbers: {
      group: 1,
      selection: 3,
    },
    margins: {
      group: new Margin(5, 5, 5, 5),
    },
    arrowheads: {
      toArrow: 'Standard',
    },
  };
}
