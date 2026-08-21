import type { Diagram } from '../diagram/Diagram.ts';
import type { Theme } from './Theme.ts';
import { DEFAULT_TARGET_PROPERTY_MAP } from './Theme.ts';
import { Themes } from './Themes.ts';

/**
 * GoJS-compatible: manages a Diagram's (or several Diagrams') set of named
 * `Theme`s and which one is active. Templates read theme values via
 * `GraphObject.theme()`/`themeData()`/`themeModel()` (which attach a
 * `ThemeBinding`), or by calling `findValue`/`getValue` directly.
 */
export class ThemeManager {
  private _themeMap: globalThis.Map<string, Theme>;
  private _defaultTheme = 'light';
  private _currentTheme = 'light';
  changesDivBackground = false;
  usesSystemCssVariables = false;
  private diagrams = new globalThis.Set<Diagram>();

  constructor(init?: Partial<ThemeManager>) {
    this._themeMap = new globalThis.Map([
      ['light', { ...Themes.Light }],
      ['dark', { ...Themes.Dark }],
    ]);
    if (init) {
      const { themeMap, ...rest } = init as Record<string, unknown>;
      if (themeMap instanceof globalThis.Map)
        this._themeMap = themeMap as globalThis.Map<string, Theme>;
      Object.assign(this, rest);
    }
  }

  get themeMap(): globalThis.Map<string, Theme> {
    return this._themeMap;
  }

  set themeMap(value: globalThis.Map<string, Theme>) {
    this._themeMap = value;
  }

  get defaultTheme(): string {
    return this._defaultTheme;
  }

  set defaultTheme(value: string) {
    this._defaultTheme = value;
  }

  get currentTheme(): string {
    return this._currentTheme;
  }

  set currentTheme(value: string) {
    if (this._currentTheme === value) return;
    this._currentTheme = value;
    this.updateAllThemes();
  }

  /** Associate a Diagram with this ThemeManager, so `currentTheme` changes refresh its theme bindings. */
  addDiagram(diagram: Diagram): this {
    this.diagrams.add(diagram);
    return this;
  }

  /** Disassociate a Diagram from this ThemeManager. */
  removeDiagram(diagram: Diagram): this {
    this.diagrams.delete(diagram);
    return this;
  }

  /** Merge `props` into the named theme (or create it if it doesn't yet exist), then refresh theme bindings. */
  set(themeName: string, props: Partial<Theme>): this {
    const name = themeName || this._defaultTheme;
    const existing = this._themeMap.get(name) ?? {};
    this._themeMap.set(name, { ...existing, ...props });
    this.updateAllThemes();
    return this;
  }

  /**
   * Find the named theme, resolving `"system"` to the browser's preferred
   * `light`/`dark` color scheme.
   */
  findTheme(themeName: string): Theme | null {
    let name = themeName;
    if (name === 'system') {
      const prefersDark =
        typeof globalThis.matchMedia === 'function' &&
        globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
      name = prefersDark ? 'dark' : 'light';
    }
    return this._themeMap.get(name) ?? null;
  }

  /**
   * Look up `prop` in `currentTheme`, falling back to `defaultTheme` if
   * not found there.
   */
  findValue(prop: string | string[] | number, source?: string | string[], tprop?: string): unknown {
    const primary = this.getValue(this.findTheme(this._currentTheme), prop, source, tprop);
    if (primary !== undefined) return primary;
    return this.getValue(this.findTheme(this._defaultTheme), prop, source, tprop);
  }

  /** Look up `prop` (optionally under `source`) within the given Theme. */
  getValue(
    theme: Theme | null,
    prop: string | string[] | number,
    source?: string | string[],
    tprop?: string,
  ): unknown {
    if (!theme) return undefined;

    const path: (string | number)[] =
      typeof prop === 'number'
        ? [prop]
        : Array.isArray(prop)
          ? prop
          : prop.includes('.')
            ? prop.split('.')
            : [prop];

    let root: unknown;
    if (source !== undefined) {
      const sourcePath = Array.isArray(source) ? source : source.split('.').filter(Boolean);
      root =
        sourcePath.length === 0 ? theme : getPath(theme as Record<string, unknown>, sourcePath);
    } else {
      const targetPropertyMap = theme.targetPropertyMap ?? DEFAULT_TARGET_PROPERTY_MAP;
      const bucket = tprop ? targetPropertyMap.get(tprop) : undefined;
      if (bucket && (theme as Record<string, unknown>)[bucket] !== undefined) {
        root = (theme as Record<string, unknown>)[bucket];
      } else {
        root = theme;
      }
    }
    return getPath(root as Record<string, unknown> | undefined, path);
  }

  /** Re-apply every ThemeBinding on every associated Diagram (called automatically when `currentTheme`/a theme's contents change). */
  updateAllThemes(): void {
    for (const diagram of this.diagrams) {
      diagram.updateThemeBindings?.();
      if (this.changesDivBackground) {
        const theme = this.findTheme(this._currentTheme) ?? this.findTheme(this._defaultTheme);
        const divColor = theme?.colors?.div;
        if (divColor && diagram.div) diagram.div.style.backgroundColor = divColor;
      }
    }
  }
}

function getPath(obj: Record<string, unknown> | undefined, path: (string | number)[]): unknown {
  let current: unknown = obj;
  for (const key of path) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string | number, unknown>)[key];
  }
  return current;
}
