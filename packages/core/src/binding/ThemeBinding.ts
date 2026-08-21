import type { NodeData } from '../model/Model.ts';
import { Binding, type BindingTarget } from './Binding.ts';

/** How a {@link ThemeBinding} resolves the key to look up in the Theme. */
type ThemeKeyMode = 'literal' | 'data' | 'model';

/**
 * GoJS-compatible: a `Binding` whose source value comes from the target's
 * Diagram's `ThemeManager` instead of the model data — created by
 * `GraphObject.theme()` (a literal theme key), `themeData()` (a data
 * property's value names the theme key), or `themeModel()`. Always
 * one-way (theme → target); `applyToModel` is a no-op.
 *
 * graphojs has no `Model.modelData` (a shared, model-wide data object) —
 * `themeModel()` falls back to the same per-part data lookup `themeData()`
 * uses, rather than real GoJS's model-wide source.
 */
export class ThemeBinding extends Binding {
  private _themeSource = '';
  private _themeConverter: ((value: unknown, target: BindingTarget) => unknown) | null = null;
  private _keyMode: ThemeKeyMode = 'literal';

  constructor(
    targetprop = '',
    sourceprop?: string,
    themeSource?: string | null,
    conv?: (value: unknown, data: NodeData) => unknown,
    themeConverter?: (value: unknown, target: BindingTarget) => unknown,
  ) {
    super(targetprop, sourceprop, conv);
    this._themeSource = themeSource ?? '';
    this._themeConverter = themeConverter ?? null;
  }

  /** Switch this binding to resolve its theme key from a data property's value (used by `GraphObject.themeData`). */
  ofData(): this {
    this._keyMode = 'data';
    return this;
  }

  /** Switch this binding to resolve its theme key from model-wide data (used by `GraphObject.themeModel`). */
  ofModel(): this {
    this._keyMode = 'model';
    return this;
  }

  get themeSource(): string {
    return this._themeSource;
  }

  set themeSource(value: string) {
    this._themeSource = value;
  }

  get themeConverter(): ((value: unknown, target: BindingTarget) => unknown) | null {
    return this._themeConverter;
  }

  set themeConverter(value: ((value: unknown, target: BindingTarget) => unknown) | null) {
    this._themeConverter = value;
  }

  override getSourceValue(nodeData: NodeData, target?: BindingTarget): unknown {
    const diagram = target ? findDiagram(target) : null;
    const themeManager = diagram?.themeManager;
    if (!themeManager) return undefined;

    // For 'literal' mode, sourceProperty itself is the theme key — don't
    // resolve it against data at all. For 'data'/'model', let the base
    // class resolve sourceProperty (+ its converter) against nodeData
    // first, and use *that value* as the theme key.
    const key =
      this._keyMode === 'literal' ? this.sourceProperty : super.getSourceValue(nodeData, target);
    const value = themeManager.findValue(
      key as string | string[] | number,
      this._themeSource || undefined,
      this.targetProperty,
    );
    return this._themeConverter ? this._themeConverter(value, target as BindingTarget) : value;
  }

  override applyToModel(): boolean {
    return false; // ThemeBindings are always one-way.
  }

  override copy(): ThemeBinding {
    const cloned = new ThemeBinding(
      this.targetProperty,
      this.sourceProperty,
      this._themeSource,
      undefined,
      this._themeConverter ?? undefined,
    );
    cloned._keyMode = this._keyMode;
    return cloned;
  }
}

function findDiagram(target: BindingTarget): import('../diagram/Diagram.ts').Diagram | null {
  const asPart = target as unknown as { diagram?: unknown };
  if (asPart.diagram) return asPart.diagram as import('../diagram/Diagram.ts').Diagram;
  const asGraphObject = target as unknown as { part?: { diagram?: unknown } | null };
  return (asGraphObject.part?.diagram as import('../diagram/Diagram.ts').Diagram) ?? null;
}
